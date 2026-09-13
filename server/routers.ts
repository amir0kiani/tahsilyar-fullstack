import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { addConversationMessage, createStudyPlan, getLatestStudyPlan, getOrCreateConversation, getRecentConversationMessages, getStudentProfile, getDb, setStudySessionCompleted, upsertStudentProfile } from "./db";

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
    save: protectedProcedure.input(z.object({
      name: z.string().trim().min(2).max(255),
      email: z.string().email().optional(),
      answers: z.record(z.string(), z.string()).default({}),
    })).mutation(async ({ ctx, input }) => upsertStudentProfile({ userId: ctx.user.id, name: input.name, email: input.email ?? ctx.user.email ?? undefined, answers: input.answers })),
  }),
  study: router({
    latestPlan: protectedProcedure.query(async ({ ctx }) => (await getLatestStudyPlan(ctx.user.id)) ?? null),
    setSessionCompleted: protectedProcedure.input(z.object({ sessionId: z.number().int().positive(), completed: z.boolean() })).mutation(({ ctx, input }) => setStudySessionCompleted({ userId: ctx.user.id, ...input })),
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
          maxTokens: 2200,
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
        try {
          const existingProfile = await getStudentProfile(ctx.user.id);
          await upsertStudentProfile({ userId: ctx.user.id, name: input.answers["نام"]?.trim() || existingProfile?.name || ctx.user.name || undefined, email: existingProfile?.email ?? ctx.user.email ?? undefined, answers: input.answers });
        } catch (error) {
          console.error("[Study] Could not persist profile before planning; continuing with request:", error);
        }
        const answers = Object.entries(input.answers).map(([step, answer]) => `${step}: ${answer}`).join("\n");
        const track = Object.values(input.answers).find((answer) => /انسانی|ریاضی|تجربی/.test(answer)) ?? "تجربی";
        const curriculum = curriculumFor(track);
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `تو مشاور و برنامه‌ریز تحصیلی تحصیل‌یار هستی، نه یک تأییدکنندهٔ صرف. فقط از پاسخ‌های واقعی دانش‌آموز استفاده کن و هیچ داده‌ای را حدس نزن. خروجی باید فقط JSON مطابق schema باشد. برای هر جلسه روز هفته را در فیلد day تعیین کن. اگر پاسخ‌ها کافی نیستند sessions را خالی برگردان و در summary سؤال لازم را توضیح بده. برنامه باید کل ساعات مطالعهٔ روز را پوشش دهد و بازهٔ تمرکز ترجیحی را فقط برای درس‌های مهم‌تر استفاده کند. هدف کلی را جدی بگیر: برنامهٔ دانش‌آموزی که رتبهٔ ۱۰۰۰۰ می‌خواهد باید با برنامهٔ دانش‌آموزی که هدفش قبولی پزشکی است متفاوت باشد؛ برای هدف‌های رقابتی‌تر سهم درس‌های کلیدی، تست زمان‌دار و مرور را متناسب افزایش بده. اگر هدف، زمان مطالعه یا درس‌های انتخابی با هم ناسازگارند، در summary و focusTip محترمانه مخالفت کن، محدودیت را توضیح بده و اولویت واقع‌بینانه پیشنهاد کن؛ صرفاً خواستهٔ غیرواقعی را تأیید نکن. فهرست معتبر کل دروس رشتهٔ انتخاب‌شده: ${curriculum.join("، ")}. فقط از این فهرست برای subject استفاده کن و دروس اولویت‌دار را با سهم بیشتر، نه به‌عنوان فهرست محدودکننده، به کار ببر.`,
            },
            {
              role: "user",
              content: `پاسخ‌های واقعی دانش‌آموز:\n${answers}\nکل دروس مجاز رشته: ${curriculum.join("، ")}\nتاریخ محلی دستگاه: ${cleanContext(input.deviceDate, 100)}\nمنطقه زمانی: ${cleanContext(input.timezone, 100)}\nپروفایل حساب: ${cleanContext(input.profile, 500)}\nامتحان نزدیک و هدف آزمون را در اولویت‌بندی لحاظ کن. هدف قبولی را با میزان رقابت آن مقایسه کن؛ بین هدف رتبهٔ ۱۰۰۰۰ و قبولی پزشکی تفاوت واقعی در توزیع زمان و سختی برنامه ایجاد کن. اگر خواستهٔ دانش‌آموز با ساعات مطالعه یا مهلت امتحان شدنی نیست، در summary شفاف و محترمانه مخالفت کن و راه جایگزین بده.`,
            },
          ],
          responseFormat: {
            type: "json_schema",
            json_schema: { name: "personal_study_plan", strict: true, schema: planSchema },
          },
          maxTokens: 2200,
        });
        const raw = extractText(response.choices[0]?.message.content);
        const normalizedRaw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
        let plan: { title: string; summary: string; sessions: Array<{ subject: string; topic: string; day: string; start: string; end: string; duration: string; reason: string }>; focusTip: string };
        try {
          const parsed = JSON.parse(normalizedRaw);
          if (!parsed?.title || !Array.isArray(parsed.sessions)) throw new Error("AI returned an invalid study plan shape");
          plan = parsed;
        } catch {
          console.error("[Study] AI returned invalid plan JSON:", raw.slice(0, 500));
          return { title: "", summary: "پاسخ برنامه‌ریز قابل پردازش نبود؛ دوباره تلاش کن.", sessions: [], focusTip: "" };
        }
        try {
          const db = await getDb();
          if (db) {
            await createStudyPlan({ userId: ctx.user.id, title: plan.title, summary: plan.summary ?? "", focusTip: plan.focusTip ?? "", inputSnapshot: input.answers, sessions: plan.sessions });
            return (await getLatestStudyPlan(ctx.user.id)) ?? plan;
          }
        } catch (error) {
          console.error("[Study] Plan generated but persistence failed:", error);
        }
        return plan;
      }),
  }),
});

export type AppRouter = typeof appRouter;
