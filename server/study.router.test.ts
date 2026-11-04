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
  getLatestStudyPlan: vi.fn(),
  getStudyPlanById: vi.fn(),
  getAcademicMastery: vi.fn(),
  getExamHistory: vi.fn(),
  saveExamAttempt: vi.fn(),
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

const completeAnswers = {
  "نام": "دانش‌آموز آزمایشی",
  "پایه و رشته": "دوازدهم تجربی",
  "بازهٔ زمانی": "۲ تا ۴ ساعت",
  "زمان مطالعه": "صبح‌ها",
  "دروس اولویت‌دار": "زیست‌شناسی، شیمی",
  "امتحان پیشرو": "کنکور سراسری",
  "سطح انرژی": "معمولی",
};

describe("study AI procedures", () => {
  beforeEach(() => {
    invokeLLMMock.mockReset();
    dbMocks.getStudentProfile.mockReset();
    dbMocks.getStudentProfile.mockResolvedValue({ userId: 42, answers: { "پایه و رشته": "دوازدهم تجربی" } });
    dbMocks.getOrCreateConversation.mockReset();
    dbMocks.getOrCreateConversation.mockResolvedValue({ id: 7, userId: 42 });
    dbMocks.getRecentConversationMessages.mockReset();
    dbMocks.getRecentConversationMessages.mockResolvedValue([]);
    dbMocks.addConversationMessage.mockReset();
    dbMocks.addConversationMessage.mockResolvedValue(undefined);
    dbMocks.upsertStudentProfile.mockReset();
    dbMocks.upsertStudentProfile.mockResolvedValue(undefined);
    dbMocks.createStudyPlan.mockReset();
    dbMocks.createStudyPlan.mockResolvedValue({ planId: 99 });
    dbMocks.getLatestStudyPlan.mockReset();
    dbMocks.getLatestStudyPlan.mockImplementation(async () => {
      const calls = dbMocks.createStudyPlan.mock.calls;
      const latest = calls[calls.length - 1]?.[0];
      if (!latest) return null;
      return {
        id: 99,
        title: latest.title,
        summary: latest.summary,
        focusTip: latest.focusTip,
        inputSnapshot: latest.inputSnapshot,
        sessions: latest.sessions.map((session: any, index: number) => ({ ...session, id: index + 1, completed: 0 })),
        createdAt: new Date(),
      };
    });
    dbMocks.getStudyPlanById.mockReset();
    dbMocks.getStudyPlanById.mockImplementation(async (_userId: number, _planId: number) => {
      const calls = dbMocks.createStudyPlan.mock.calls;
      const latest = calls[calls.length - 1]?.[0];
      if (!latest) return null;
      return {
        id: _planId,
        title: latest.title,
        summary: latest.summary,
        focusTip: latest.focusTip,
        inputSnapshot: latest.inputSnapshot,
        sessions: latest.sessions.map((session: any, index: number) => ({ ...session, id: index + 1, completed: 0 })),
        createdAt: new Date(),
      };
    });
    dbMocks.getAcademicMastery.mockReset();
    dbMocks.getAcademicMastery.mockResolvedValue([]);
    dbMocks.getExamHistory.mockReset();
    dbMocks.getExamHistory.mockResolvedValue([]);
    dbMocks.saveExamAttempt.mockReset();
    dbMocks.saveExamAttempt.mockResolvedValue({ id: 1 });
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

  it("persists a complete seven-day structured plan for the authenticated user", async () => {
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: JSON.stringify({
        title: "برنامهٔ هفتگی ثبت‌شده",
        summary: "برنامه بر اساس پاسخ‌های ثبت‌شده ساخته شد.",
        sessions: [{ subject: "زیست‌شناسی", topic: "مبحث ثبت‌شده", day: "شنبه", start: "۱۶:۰۰", end: "۱۷:۰۰", duration: "۶۰ دقیقه", reason: "بر اساس پاسخ کاربر" }],
        focusTip: "نکته فقط از داده‌های ثبت‌شده استخراج شد.",
      }) } }],
    });
    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.generatePlan({
      answers: completeAnswers,
      deviceDate: "تاریخ دستگاه",
      timezone: "Asia/Tehran",
      planRange: "week",
    });
    expect(result.title).toBe("برنامهٔ هفتگی ثبت‌شده");
    expect(result.sessions[0].subject).toBe("BIO-01|زیست‌شناسی");
    expect(new Set(result.sessions.map((session) => session.day)).size).toBe(7);
    expect(dbMocks.createStudyPlan).toHaveBeenCalledOnce();
    expect(dbMocks.upsertStudentProfile).toHaveBeenCalledWith(expect.objectContaining({ userId: 42 }));
    expect(invokeLLMMock.mock.calls[0][0].responseFormat).toBeDefined();
  });

  it("uses the persisted structured plan as the exact content of a weekly chat plan update", async () => {
    dbMocks.getStudentProfile.mockResolvedValue({ userId: 42, answers: completeAnswers });
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: JSON.stringify({
        title: "برنامهٔ هفتگی اصلاح‌شده",
        summary: "برنامه با حفظ تعادل مطالعه و مرور اصلاح شد.",
        sessions: [{ subject: "زیست‌شناسی", topic: "مرور فصل دوم", day: "شنبه", start: "۱۶:۰۰", end: "۱۷:۰۰", duration: "۶۰ دقیقه", reason: "اولویت دانش‌آموز" }],
        focusTip: "بین دو جلسه استراحت کوتاه داشته باش.",
      }) } }],
    });
    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.chat({
      message: "برنامه هفتگی‌ام را سبک‌تر کن و یک جلسه مرور اضافه کن",
      planRange: "today",
      deviceDate: "۱۴۰۵/۰۸/۱۳",
      timezone: "Asia/Tehran",
    });
    expect(invokeLLMMock).toHaveBeenCalledOnce();
    expect(result.plan).toBeDefined();
    expect(result.plan?.sessions).toHaveLength(7);
    expect(result.text).toContain("برنامهٔ هفتگی اصلاح‌شده");
    for (const day of ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"]) {
      expect(result.text).toContain(day);
    }
    expect(dbMocks.createStudyPlan).toHaveBeenCalledOnce();
    expect(dbMocks.addConversationMessage).toHaveBeenCalledTimes(2);
  });

  it("detects natural-language requests to move a subject between weekdays and persists the changed plan", async () => {
    dbMocks.getStudentProfile.mockResolvedValue({ userId: 42, answers: completeAnswers });
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: JSON.stringify({
        title: "برنامهٔ اصلاح‌شده",
        summary: "جلسهٔ زیست از شنبه به دوشنبه منتقل شد.",
        sessions: [{ subject: "زیست‌شناسی", topic: "مرور فصل دوم", day: "دوشنبه", start: "۱۶:۰۰", end: "۱۷:۰۰", duration: "۶۰ دقیقه", reason: "طبق درخواست دانش‌آموز" }],
        focusTip: "جلسهٔ منتقل‌شده را در زمان جدید انجام بده.",
      }) } }],
    });
    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.chat({
      message: "جلسهٔ زیست را از شنبه بردار و دوشنبه قرار بده",
      planRange: "week",
      deviceDate: "۱۴۰۵/۰۸/۱۳",
      timezone: "Asia/Tehran",
    });
    expect(invokeLLMMock).toHaveBeenCalledOnce();
    expect(result.plan).toBeDefined();
    expect(result.plan?.title).toBe("برنامهٔ اصلاح‌شده");
    expect(result.plan?.sessions.some((session) => session.day === "دوشنبه")).toBe(true);
    expect(dbMocks.createStudyPlan).toHaveBeenCalledOnce();
    expect(dbMocks.getStudyPlanById).toHaveBeenCalledWith(42, 99);
    expect(result.text).toContain("دوشنبه");
  });

  it("treats a short follow-up as a plan change when the recent conversation is about the schedule", async () => {
    dbMocks.getStudentProfile.mockResolvedValue({ userId: 42, answers: completeAnswers });
    dbMocks.getRecentConversationMessages.mockResolvedValue([
      { role: "assistant", content: "برنامهٔ هفتگی فعلی: دوشنبه زیست‌شناسی ساعت ۱۶." },
    ]);
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: JSON.stringify({
        title: "برنامهٔ هفتگی جدید",
        summary: "ساعت جلسه تغییر کرد.",
        sessions: [{ subject: "زیست‌شناسی", topic: "مرور", day: "دوشنبه", start: "۱۸:۰۰", end: "۱۹:۰۰", duration: "۶۰ دقیقه", reason: "طبق درخواست دانش‌آموز" }],
        focusTip: "در ساعت جدید شروع کن.",
      }) } }],
    });
    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.chat({
      message: "ساعتش رو ببر ۱۸",
      planRange: "week",
      deviceDate: "۱۴۰۵/۰۸/۱۳",
      timezone: "Asia/Tehran",
    });
    expect(result.plan).toBeDefined();
    expect(result.plan?.sessions[0].start).toBe("۱۸:۰۰");
    expect(dbMocks.getStudyPlanById).toHaveBeenCalledWith(42, 99);
  });
});
