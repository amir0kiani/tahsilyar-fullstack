import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const invokeLLMMock = vi.hoisted(() => vi.fn());

vi.mock("./_core/llm", () => ({
  invokeLLM: invokeLLMMock,
}));

const createContext = (): TrpcContext => ({
  user: null,
  req: { protocol: "https", headers: {} } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("study AI procedures", () => {
  beforeEach(() => invokeLLMMock.mockReset());

  it("returns a Persian assistant response and forwards the real profile context", async () => {
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: "بر اساس اطلاعات ثبت‌شده، ابتدا زیست‌شناسی را مرور کن." } }],
    });

    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.chat({
      message: "امروز از کجا شروع کنم؟",
      history: [{ role: "user", content: "من اطلاعاتم را ثبت کرده‌ام." }],
      deviceDate: "تاریخ دستگاه",
      timezone: "Asia/Tehran",
      profile: "نام: کاربر؛ پایه و رشته: دوازدهم تجربی؛ هدف: کنکور",
    });

    expect(result.text).toContain("زیست‌شناسی");
    expect(invokeLLMMock).toHaveBeenCalledOnce();
    const request = invokeLLMMock.mock.calls[0][0];
    expect(request.model).toBe("gemini-3-flash-preview");
    expect(request.messages[0].content).toContain("Asia/Tehran");
    expect(request.messages[0].content).toContain("دوازدهم تجربی");
  });

  it("rejects plan generation until all required user answers exist", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.study.generatePlan({ answers: { "بازهٔ زمانی": "۲ تا ۴ ساعت" } })).rejects.toThrow();
    expect(invokeLLMMock).not.toHaveBeenCalled();
  });

  it("parses a structured plan made from the submitted answers", async () => {
    invokeLLMMock.mockResolvedValue({
      model: "gemini-3-flash-preview",
      choices: [{ message: { content: JSON.stringify({
        title: "برنامهٔ ثبت‌شدهٔ امروز",
        summary: "برنامه بر اساس پاسخ‌های ثبت‌شده ساخته شد.",
        sessions: [{ subject: "زیست‌شناسی", topic: "مبحث ثبت‌شده", start: "۱۶:۰۰", end: "۱۷:۰۰", duration: "۶۰ دقیقه", reason: "بر اساس پاسخ کاربر" }],
        focusTip: "نکته فقط از داده‌های ثبت‌شده استخراج شد.",
      }) } }],
    });

    const caller = appRouter.createCaller(createContext());
    const result = await caller.study.generatePlan({
      answers: {
        "بازهٔ زمانی": "۲ تا ۴ ساعت",
        "زمان مطالعه": "صبح‌ها",
        "پایه و رشته": "دوازدهم تجربی",
        "امتحان پیشرو": "کنکور سراسری",
        "دروس اجباری": "زیست و شیمی",
        "دروس حذفی": "فعلاً هیچ‌کدام",
        "سطح انرژی": "معمولی",
      },
      deviceDate: "تاریخ دستگاه",
      timezone: "Asia/Tehran",
      profile: "نام: کاربر",
    });

    expect(result.title).toBe("برنامهٔ ثبت‌شدهٔ امروز");
    expect(result.sessions[0].subject).toBe("زیست‌شناسی");
    expect(invokeLLMMock).toHaveBeenCalledOnce();
  });
});
