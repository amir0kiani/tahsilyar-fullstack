import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const invokeLLMMock = vi.hoisted(() => vi.fn());
const dbMocks = vi.hoisted(() => ({
  getStudentProfile: vi.fn(),
  getOrCreateConversation: vi.fn(),
  getRecentConversationMessages: vi.fn(),
  addConversationMessage: vi.fn(),
  upsertStudentProfile: vi.fn(),
  createStudyPlan: vi.fn(),
  getDb: vi.fn(),
}));

vi.mock("./_core/llm", () => ({ invokeLLM: invokeLLMMock }));
vi.mock("./db", () => dbMocks);

const authenticatedUser = {
  id: 42,
  openId: "test-user",
  name: "کاربر آزمایشی",
  email: "test@example.com",
  loginMethod: "test",
  role: "user" as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastSignedIn: new Date(),
};

const createContext = (user = authenticatedUser): TrpcContext => ({
  user,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("study AI procedures", () => {
  beforeEach(() => {
    invokeLLMMock.mockReset();
    dbMocks.getStudentProfile.mockResolvedValue({ userId: 42, answers: { "پایه و رشته": "دوازدهم تجربی" } });
    dbMocks.getOrCreateConversation.mockResolvedValue({ id: 7, userId: 42 });
    dbMocks.getRecentConversationMessages.mockResolvedValue([]);
    dbMocks.addConversationMessage.mockResolvedValue(undefined);
    dbMocks.upsertStudentProfile.mockResolvedValue(undefined);
    dbMocks.createStudyPlan.mockResolvedValue(undefined);
    dbMocks.getDb.mockResolvedValue(null);
  });

  it("rejects chat and plan generation for unauthenticated users", async () => {
    const caller = appRouter.createCaller(createContext(null));
    await expect(caller.study.chat({ message: "سلام" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.study.generatePlan({ answers: { "بازهٔ زمانی": "۲ تا ۴ ساعت" } })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    expect(invokeLLMMock).not.toHaveBeenCalled();
  });

  it("returns a Persian assistant response using the stored profile and database history", async () => {
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: "بر اساس اطلاعات ثبت‌شده، ابتدا زیست‌شناسی را مرور کن." } }],
    });
    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.chat({ message: "امروز از کجا شروع کنم؟", deviceDate: "تاریخ دستگاه", timezone: "Asia/Tehran" });
    expect(result.text).toContain("زیست‌شناسی");
    expect(invokeLLMMock).toHaveBeenCalledOnce();
    const request = invokeLLMMock.mock.calls[0][0];
    expect(request.messages[0].content).toContain("Asia/Tehran");
    expect(request.messages[0].content).toContain("دوازدهم تجربی");
    expect(dbMocks.addConversationMessage).toHaveBeenCalledTimes(2);
  });

  it("rejects plan generation until all required user answers exist", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.study.generatePlan({ answers: { "بازهٔ زمانی": "۲ تا ۴ ساعت" } })).rejects.toThrow();
    expect(invokeLLMMock).not.toHaveBeenCalled();
  });

  it("parses and persists a structured plan for the authenticated user", async () => {
    dbMocks.getDb.mockResolvedValue({});
    dbMocks.createStudyPlan.mockRejectedValue(new Error("temporary database failure"));
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: `\`\`\`json\n${JSON.stringify({
        title: "برنامهٔ ثبت‌شدهٔ امروز",
        summary: "برنامه بر اساس پاسخ‌های ثبت‌شده ساخته شد.",
        sessions: [{ subject: "زیست‌شناسی", topic: "مبحث ثبت‌شده", day: "شنبه", start: "۱۶:۰۰", end: "۱۷:۰۰", duration: "۶۰ دقیقه", reason: "بر اساس پاسخ کاربر" }],
        focusTip: "نکته فقط از داده‌های ثبت‌شده استخراج شد.",
      })}\n\`\`\`` } }],
    });
    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.generatePlan({
      answers: {
        "بازهٔ زمانی": "۲ تا ۴ ساعت",
        "زمان مطالعه": "صبح‌ها",
        "پایه و رشته": "دوازدهم تجربی",
        "امتحان پیشرو": "کنکور سراسری",
        "دروس اولویت‌دار": "زیست‌شناسی، شیمی",
        "دروس حذفی": "فعلاً هیچ‌کدام",
        "سطح انرژی": "معمولی",
      },
      deviceDate: "تاریخ دستگاه",
      timezone: "Asia/Tehran",
    });
    expect(result.title).toBe("برنامهٔ ثبت‌شدهٔ امروز");
    expect(result.sessions[0].subject).toBe("BIO-01|زیست‌شناسی");
    expect(dbMocks.upsertStudentProfile).toHaveBeenCalledWith(expect.objectContaining({ userId: 42 }));
    expect(requestForPlan()).toBeDefined();
  });

  function requestForPlan() {
    return invokeLLMMock.mock.calls[0]?.[0];
  }
});
