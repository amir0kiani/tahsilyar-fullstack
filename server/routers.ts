import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { addConversationMessage, createStudyPlan, getLatestStudyPlan, getOrCreateConversation, getRecentConversationMessages, getStudentProfile, getDb, upsertStudentProfile } from "./db";

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

const curriculumByTrack: Record<string, string[]> = {
  انسانی: ["فارسی و نگارش", "عربی", "دین و زندگی", "زبان انگلیسی", "علوم و فنون ادبی", "جامعه‌شناسی", "روان‌شناسی", "فلسفه و منطق", "تاریخ", "جغرافیا", "اقتصاد", "ریاضی و آمار"],
  ریاضی: ["فارسی و نگارش", "عربی", "دین و زندگی", "زبان انگلیسی", "ریاضی", "هندسه", "حسابان", "آمار و احتمال", "گسسته", "فیزیک", "شیمی"],
  تجربی: ["فارسی و نگارش", "عربی", "دین و زندگی", "زبان انگلیسی", "زیست‌شناسی", "شیمی", "فیزیک", "ریاضی", "زمین‌شناسی"],
};

const curriculumFor = (track: string) => curriculumByTrack[Object.keys(curriculumByTrack).find((key) => track.includes(key)) ?? "تجربی"];

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
  profile: router({
    me: protectedProcedure.query(async ({ ctx }) => (await getStudentProfile(ctx.user.id)) ?? null),
  }),
  study: router({
    latestPlan: protectedProcedure.query(async ({ ctx }) => (await getLatestStudyPlan(ctx.user.id)) ?? null),
    chatHistory: protectedProcedure.query(async ({ ctx }) => {
      const conversation = await getOrCreateConversation(ctx.user.id);
      if (!conversation) return [];
      return getRecentConversationMessages(ctx.user.id, conversation.id, 40);
    }),
    chat: protectedProcedure
      .input(z.object({
        message: z.string().min(1).max(1400),
        history: z.array(chatMessageSchema).max(12).optional(),
        profile: z.string().max(500).optional(),
        deviceDate: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const profile = await getStudentProfile(ctx.user.id);
        if (!profile) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "اطلاعات تحصیلی کاربر هنوز ثبت نشده است." });
        const conversation = await getOrCreateConversation(ctx.user.id);
        const storedHistory = conversation ? await getRecentConversationMessages(ctx.user.id, conversation.id) : [];
        if (conversation) await addConversationMessage({ conversationId: conversation.id, userId: ctx.user.id, role: "user", content: input.message });
        const history = storedHistory.map((message) => ({ role: message.role, content: message.content }));
        const profileContext = Object.entries(profile.answers as Record<string, string>).map(([key, value]) => `${key}: ${value}`).join("؛ ");
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `تو «همراه تحصیل‌یار» هستی؛ یک مشاور آموزشی فارسی‌زبان، دقیق، مهربان و واقع‌گرا. فقط از اطلاعات ذخیره‌شدهٔ کاربر استفاده کن و هیچ نام، درس، هدف، زمان، سابقه یا عددی را حدس نزن. اگر اطلاعات برای پاسخ کافی نیست، دقیقاً بگو چه اطلاعاتی لازم است. پاسخ‌ها را فارسی و کاربردی بده. تاریخ دستگاه: ${cleanContext(input.deviceDate, 100)}. منطقه زمانی دستگاه: ${cleanContext(input.timezone, 100)}. پروفایل ذخیره‌شدهٔ کاربر: ${cleanContext(profileContext, 1200)}.`,
            },
            ...history,
            { role: "user", content: input.message },
          ],
          maxTokens: 1000,
        });
        const text = extractText(response.choices[0]?.message.content).trim();
        const assistantText = text || "برای پاسخ دقیق، اطلاعات بیشتری از خودت ثبت کن.";
        if (conversation) await addConversationMessage({ conversationId: conversation.id, userId: ctx.user.id, role: "assistant", content: assistantText });
        return { text: assistantText, model: response.model };
      }),
    generatePlan: protectedProcedure
      .input(z.object({
        answers: completeAnswersSchema,
        deviceDate: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
        profile: z.string().max(500).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await upsertStudentProfile({ userId: ctx.user.id, name: ctx.user.name ?? undefined, email: ctx.user.email ?? undefined, answers: input.answers });
        const answers = Object.entries(input.answers).map(([step, answer]) => `${step}: ${answer}`).join("\n");
        const track = Object.values(input.answers).find((answer) => /انسانی|ریاضی|تجربی/.test(answer)) ?? "تجربی";
        const curriculum = curriculumFor(track);
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `تو برنامه‌ریز درسی تحصیل‌یار هستی. فقط از پاسخ‌های واقعی دانش‌آموز استفاده کن و هیچ داده‌ای را از خودت اضافه نکن. خروجی باید فقط JSON مطابق schema باشد. برای هر جلسه، روز هفته را در فیلد day با یکی از شنبه تا جمعه تعیین کن تا برنامه در تقویم هفتگی نمایش داده شود. اگر پاسخ‌ها برای ساخت برنامه کافی نیستند، sessions را خالی برگردان و در summary بگو کدام اطلاعات باید تکمیل شود. برنامه را واقع‌بینانه، متعادل و فارسی بساز و بین جلسه‌ها استراحت کوتاه بگذار. فهرست معتبر کل دروس رشتهٔ انتخاب‌شده این است: ${curriculum.join("، ")}. فقط از همین فهرست برای subject استفاده کن. مقدار «دروس اولویت‌دار» فقط اولویت است، نه فهرست محدودکننده؛ بنابراین از همهٔ دروس معتبر برنامه‌ریزی کن و دروس اولویت‌دار را با تکرار یا سهم بیشتر در برنامه لحاظ کن. هیچ درس خارج از این فهرست نساز.`,
            },
            {
              role: "user",
              content: `پاسخ‌های واقعی دانش‌آموز:\n${answers}\nکل دروس مجاز رشته: ${curriculum.join("، ")}\nتاریخ محلی دستگاه: ${cleanContext(input.deviceDate, 100)}\nمنطقه زمانی: ${cleanContext(input.timezone, 100)}\nپروفایل حساب: ${cleanContext(input.profile, 500)}\nفقط بر اساس همین داده‌ها برنامه بساز و دروس اولویت‌دار را فقط به‌عنوان اولویت استفاده کن، نه حذف سایر دروس.`,
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
          const plan = JSON.parse(raw);
          const db = await getDb();
          if (db && plan?.title && Array.isArray(plan.sessions)) {
            await createStudyPlan({ userId: ctx.user.id, title: plan.title, summary: plan.summary ?? "", focusTip: plan.focusTip ?? "", inputSnapshot: input.answers, sessions: plan.sessions });
          }
          return plan;
        } catch {
          return { title: "", summary: "اطلاعات برای ساخت برنامه کافی نیست.", sessions: [], focusTip: "" };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
