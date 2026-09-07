import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1400),
});

const completeAnswersSchema = z.record(z.string(), z.string()).refine(
  (answers) => Object.keys(answers).length >= 7,
  "Complete user study information is required before generating a plan",
);

const planSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    summary: { type: "string" },
    sessions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subject: { type: "string" },
          topic: { type: "string" },
          day: { type: "string", enum: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"] },
          start: { type: "string" },
          end: { type: "string" },
          duration: { type: "string" },
          reason: { type: "string" },
        },
        required: ["subject", "topic", "day", "start", "end", "duration", "reason"],
        additionalProperties: false,
      },
    },
    focusTip: { type: "string" },
  },
  required: ["title", "summary", "sessions", "focusTip"],
  additionalProperties: false,
} as const;

const extractText = (content: unknown) => {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((part): part is { type: "text"; text: string } =>
        typeof part === "object" && part !== null && "type" in part && part.type === "text" && "text" in part,
      )
      .map((part) => part.text)
      .join("\n");
  }
  return "";
};

const cleanContext = (value: string | undefined, max = 400) => (value ?? "").trim().slice(0, max);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  study: router({
    chat: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(1400),
        history: z.array(chatMessageSchema).max(12).default([]),
        profile: z.string().min(1).max(500),
        deviceDate: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
      }))
      .mutation(async ({ input }) => {
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `تو «همراه تحصیل‌یار» هستی؛ یک مشاور آموزشی فارسی‌زبان، دقیق، مهربان و واقع‌گرا. فقط از اطلاعات واقعی داخل پروفایل استفاده کن و هیچ نام، درس، هدف، زمان، سابقه یا عددی را حدس نزن. اگر اطلاعات برای پاسخ کافی نیست، به‌جای ساختن پاسخ یا برنامه، دقیقاً بگو چه اطلاعاتی لازم است. پاسخ‌ها را فارسی و کاربردی بده. تاریخ دستگاه: ${cleanContext(input.deviceDate, 100)}. منطقه زمانی دستگاه: ${cleanContext(input.timezone, 100)}. پروفایل واقعی کاربر: ${cleanContext(input.profile, 500)}.`,
            },
            ...input.history.map((message) => ({ role: message.role, content: message.content })),
            { role: "user", content: input.message },
          ],
          maxTokens: 1000,
        });
        const text = extractText(response.choices[0]?.message.content).trim();
        return { text: text || "برای پاسخ دقیق، اطلاعات بیشتری از خودت ثبت کن.", model: response.model };
      }),
    generatePlan: publicProcedure
      .input(z.object({
        answers: completeAnswersSchema,
        deviceDate: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
        profile: z.string().max(500).optional(),
      }))
      .mutation(async ({ input }) => {
        const answers = Object.entries(input.answers).map(([step, answer]) => `${step}: ${answer}`).join("\n");
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: "تو برنامه‌ریز درسی تحصیل‌یار هستی. فقط از پاسخ‌های واقعی دانش‌آموز استفاده کن و هیچ داده‌ای را از خودت اضافه نکن. خروجی باید فقط JSON مطابق schema باشد. برای هر جلسه، روز هفته را در فیلد day با یکی از شنبه تا جمعه تعیین کن تا برنامه در تقویم هفتگی نمایش داده شود. اگر پاسخ‌ها برای ساخت برنامه کافی نیستند، sessions را خالی برگردان و در summary بگو کدام اطلاعات باید تکمیل شود. برنامه را واقع‌بینانه، متعادل و فارسی بساز و بین جلسه‌ها استراحت کوتاه بگذار.",
            },
            {
              role: "user",
              content: `پاسخ‌های واقعی دانش‌آموز:\n${answers}\nتاریخ محلی دستگاه: ${cleanContext(input.deviceDate, 100)}\nمنطقه زمانی: ${cleanContext(input.timezone, 100)}\nپروفایل حساب: ${cleanContext(input.profile, 500)}\nفقط بر اساس همین داده‌ها برنامه بساز.`,
            },
          ],
          responseFormat: {
            type: "json_schema",
            json_schema: { name: "personal_study_plan", strict: true, schema: planSchema },
          },
          maxTokens: 2200,
        });
        const raw = extractText(response.choices[0]?.message.content);
        try {
          return JSON.parse(raw);
        } catch {
          return { title: "", summary: "اطلاعات برای ساخت برنامه کافی نیست.", sessions: [], focusTip: "" };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
