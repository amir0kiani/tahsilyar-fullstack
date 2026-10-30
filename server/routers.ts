import { z } from "zod";
import { curriculumCatalog, examQuestions } from "./examBank";
import { invokeLLM } from "./_core/llm";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { addConversationMessage, createStudyPlan, getLatestStudyPlan, getOrCreateConversation, getRecentConversationMessages, getStudentProfile, getDb, setStudySessionCompleted, upsertStudentProfile, clearConversation, saveExamAttempt, getExamHistory, getAcademicMastery } from "./db";

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

const lessonCodes: Record<string, string> = {
  "فارسی و نگارش": "FA-01", "عربی": "AR-01", "دین و زندگی": "REL-01", "زبان انگلیسی": "EN-01",
  "علوم و فنون ادبی": "LIT-01", "جامعه‌شناسی": "SOC-01", "روان‌شناسی": "PSY-01", "فلسفه و منطق": "PHI-01",
  "تاریخ": "HIS-01", "جغرافیا": "GEO-01", "اقتصاد": "ECO-01", "ریاضی و آمار": "MATH-01",
  "ریاضی": "MATH-02", "هندسه": "GEO-02", "حسابان": "CAL-01", "آمار و احتمال": "STAT-01", "گسسته": "DISC-01",
  "فیزیک": "PHY-01", "شیمی": "CHEM-01", "زیست‌شناسی": "BIO-01", "زمین‌شناسی": "GEO-03",
};
const canonicalDay = (raw: string) => {
  const value = raw.trim().replace("‌", "");
  const days = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
  return days.find((day) => value.includes(day.replace("‌", ""))) ?? days.find((day) => value.includes(day)) ?? days[0];
};
const canonicalLesson = (raw: string, curriculum: string[]) => {
  const value = raw.trim();
  const subject = curriculum.find((item) => value.includes(item) || item.includes(value)) ?? curriculum[0] ?? value;
  return { code: lessonCodes[subject] ?? "GEN-00", name: subject };
};
const normalizePlanSessions = (sessions: Array<{ subject: string; topic: string; day: string; start: string; end: string; duration: string; reason: string }>, curriculum: string[]) => sessions.map((session) => {
  const lesson = canonicalLesson(session.subject, curriculum);
  return { ...session, day: canonicalDay(session.day), subject: `${lesson.code}|${lesson.name}`, reason: `${session.reason} · کد درس: ${lesson.code}` };
});

export const appRouter = router({
  exams: router({
    catalog: protectedProcedure.query(() => curriculumCatalog),
    questions: protectedProcedure.input(z.object({ subject: z.string().optional(), chapter: z.string().optional(), grade: z.string().optional(), track: z.string().optional(), difficulty: z.enum(["آسان","متوسط","سخت"]).optional(), limit: z.number().int().min(1).max(20).default(10) })).query(({ input }) =>
      examQuestions.filter(q => (!input.subject || q.subject === input.subject) && (!input.chapter || q.chapter === input.chapter) && (!input.grade || q.grade === input.grade) && (!input.track || q.track === input.track) && (!input.difficulty || q.difficulty === input.difficulty))
        .slice(0, input.limit).map(({ correctIndex, explanation, ...question }) => question)
    ),
    submit: protectedProcedure.input(z.object({ subject:z.string(), chapter:z.string(), grade:z.string().optional(), track:z.string().optional(), answers:z.array(z.object({ questionId:z.string(), selectedIndex:z.number().int().min(0).max(3) })).min(1).max(20) })).mutation(async ({ctx,input})=>{
      const ids=new Set(input.answers.map(a=>a.questionId));
      const qs=examQuestions.filter(q=>ids.has(q.id)&&q.subject===input.subject&&q.chapter===input.chapter&&(!input.grade||q.grade===input.grade)&&(!input.track||q.track===input.track));
      if(ids.size!==input.answers.length||qs.length!==input.answers.length) throw new TRPCError({code:"BAD_REQUEST",message:"سؤال نامعتبر است."});
      const selected=new Map(input.answers.map(a=>[a.questionId,a.selectedIndex]));
      const responses=qs.map(q=>({questionId:q.id,selectedIndex:selected.get(q.id)!,correctIndex:q.correctIndex,isCorrect:selected.get(q.id)===q.correctIndex,subject:q.subject,chapter:q.chapter,topic:q.topic,difficulty:q.difficulty}));
      const correctCount=responses.filter(r=>r.isCorrect).length, scorePercent=Math.round(correctCount/qs.length*100);
      const topicAnalysis=qs.map(q=>({topic:q.topic,total:1,correct:selected.get(q.id)===q.correctIndex?1:0,accuracy:selected.get(q.id)===q.correctIndex?100:0}));
      const saved=await saveExamAttempt({userId:ctx.user.id,grade:input.grade??"همه پایه‌ها",track:input.track??"همه رشته‌ها",subject:input.subject,chapter:input.chapter,questionCount:qs.length,correctCount,scorePercent,responses,topicAnalysis});
      return {attemptId:saved?.id,questionCount:qs.length,correctCount,scorePercent,responses:responses.map(r=>({...r,prompt:qs.find(q=>q.id===r.questionId)!.prompt,options:qs.find(q=>q.id===r.questionId)!.options,explanation:qs.find(q=>q.id===r.questionId)!.explanation})),topicAnalysis};
    }),
    history: protectedProcedure.query(({ctx})=>getExamHistory(ctx.user.id,50)),
    academicDNA: protectedProcedure.query(async ({ctx})=>({mastery:await getAcademicMastery(ctx.user.id),history:await getExamHistory(ctx.user.id,50)})),
  }),
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
    clearChat: protectedProcedure.mutation(async ({ ctx }) => clearConversation(ctx.user.id)),
    chat: protectedProcedure
      .input(z.object({
        message: z.string().min(1).max(1400),
        history: z.array(chatMessageSchema).max(12).optional(),
        profile: z.string().max(500).optional(),
        answers: z.record(z.string(), z.string()).optional(),
        deviceDate: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
        planRange: z.enum(["today", "tomorrow", "week"]).default("today"),
      }))
      .mutation(async ({ input, ctx }) => {
        const profile = await getStudentProfile(ctx.user.id);
        const profileAnswers = (profile?.answers as Record<string, string> | undefined) ?? input.answers ?? {};
        if (!profile && Object.keys(profileAnswers).length >= 7) {
          try {
            await upsertStudentProfile({ userId: ctx.user.id, name: ctx.user.name ?? undefined, email: ctx.user.email ?? undefined, answers: profileAnswers });
          } catch (error) {
            console.warn("[Study] Could not persist profile from chat:", error);
          }
        }
        const conversation = await getOrCreateConversation(ctx.user.id);
        const storedHistory = conversation ? await getRecentConversationMessages(ctx.user.id, conversation.id) : [];
        if (conversation) await addConversationMessage({ conversationId: conversation.id, userId: ctx.user.id, role: "user", content: input.message });
        const history = storedHistory.map((message) => ({ role: message.role, content: message.content }));
        const profileContext = Object.entries(profileAnswers).map(([key, value]) => `${key}: ${value}`).join("؛ ");
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `تو «همراه تحصیل‌یار» هستی؛ یک مشاور آموزشی فارسی‌زبان، دقیق، مهربان و واقع‌گرا. فقط از اطلاعات ذخیره‌شدهٔ کاربر استفاده کن و هیچ نام، درس، هدف، زمان، سابقه یا عددی را حدس نزن. اگر اطلاعات برای پاسخ کافی نیست، دقیقاً بگو چه اطلاعاتی لازم است. پاسخ‌ها را فارسی و کاربردی بده. بازهٔ برنامه: ${input.planRange === "week" ? "هفتگی" : input.planRange === "tomorrow" ? "فردا" : "امروز"}. بازهٔ برنامه: ${input.planRange === "week" ? "هفتگی" : input.planRange === "tomorrow" ? "فردا" : "امروز"}. تاریخ دستگاه: ${cleanContext(input.deviceDate, 100)}. منطقه زمانی دستگاه: ${cleanContext(input.timezone, 100)}. پروفایل ذخیره‌شدهٔ کاربر: ${cleanContext(profileContext, 1200)}.`,
            },
            ...history,
            { role: "user", content: input.message },
          ],
          maxTokens: 5000,
        });
        const text = extractText(response.choices[0]?.message.content).trim();
        const assistantText = text || "برای پاسخ دقیق، اطلاعات بیشتری از خودت ثبت کن.";
        let updatedPlan: unknown = undefined;
        const wantsPlanUpdate = /برنامه|جلسه|درس|زمان مطالعه|تغییر|جابه.?جا|اضافه|حذف/.test(input.message);
        if (wantsPlanUpdate) {
          const planResponse = await invokeLLM({
            model: "gemini-3-flash-preview",
            messages: [
              { role: "system", content: "تو برنامه‌ریز تحصیلی تحصیل‌یار هستی. بر اساس پروفایل ذخیره‌شده و درخواست جدید کاربر، برنامهٔ اصلاح‌شده تولید کن. همهٔ دروس رشته را در نظر بگیر، اما دروس اولویت‌دار کاربر سهم بیشتری داشته باشند. فقط JSON مطابق schema برگردان." },
              { role: "user", content: `پروفایل ذخیره‌شده: ${cleanContext(profileContext, 1800)}
درخواست تغییر برنامه: ${input.message}
بازهٔ برنامه: ${input.planRange}
فهرست دروس رشته: ${curriculumFor(profileContext).join("، ")}` },
            ],
            responseFormat: { type: "json_schema", json_schema: { name: "updated_study_plan", strict: true, schema: planSchema } },
            maxTokens: 2200,
          });
          try {
            const parsed = JSON.parse(extractText(planResponse.choices[0]?.message.content).replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim());
            if (parsed?.title && Array.isArray(parsed.sessions)) {
              const db = await getDb();
              if (db) {
                await createStudyPlan({ userId: ctx.user.id, title: parsed.title, summary: parsed.summary ?? "", focusTip: parsed.focusTip ?? "", inputSnapshot: profileAnswers, sessions: parsed.sessions });
                updatedPlan = (await getLatestStudyPlan(ctx.user.id)) ?? parsed;
              } else updatedPlan = parsed;
            }
          } catch (error) { console.warn("[Study] Chat plan update was not valid JSON:", error); }
        }
        if (conversation) await addConversationMessage({ conversationId: conversation.id, userId: ctx.user.id, role: "assistant", content: assistantText });
        return { text: assistantText, model: response.model, plan: updatedPlan };
      }),
    generatePlan: protectedProcedure
      .input(z.object({
        answers: completeAnswersSchema,
        deviceDate: z.string().max(100).optional(),
        timezone: z.string().max(100).optional(),
        profile: z.string().max(500).optional(),
        planRange: z.enum(["today", "tomorrow", "week"]).default("today"),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          const existingProfile = await getStudentProfile(ctx.user.id);
          await upsertStudentProfile({ userId: ctx.user.id, name: input.answers["نام"]?.trim() || existingProfile?.name || ctx.user.name || undefined, email: existingProfile?.email ?? ctx.user.email ?? undefined, answers: input.answers });
        } catch (error) {
          console.error("[Study] Could not persist profile before planning:", error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "ذخیرهٔ اطلاعات تحصیلی انجام نشد؛ لطفاً دوباره تلاش کن." });
        }
        const answers = Object.entries(input.answers).map(([step, answer]) => `${step}: ${answer}`).join("\n");
        const track = Object.values(input.answers).find((answer) => /انسانی|ریاضی|تجربی/.test(answer)) ?? "تجربی";
        const curriculum = curriculumFor(track);
        const response = await invokeLLM({
          model: "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `تو مشاور و برنامه‌ریز تحصیلی تحصیل‌یار هستی، نه یک تأییدکنندهٔ صرف. فقط از پاسخ‌های واقعی دانش‌آموز استفاده کن و هیچ داده‌ای را حدس نزن. خروجی باید فقط JSON مطابق schema باشد. برای هر جلسه روز هفته را در فیلد day تعیین کن. اگر پاسخ‌ها کافی نیستند sessions را خالی برگردان و در summary سؤال لازم را توضیح بده. برنامه باید کل ساعات مطالعهٔ روز را پوشش دهد و بازهٔ تمرکز ترجیحی را فقط برای درس‌های مهم‌تر استفاده کند. هدف کلی را جدی بگیر: برنامهٔ دانش‌آموزی که رتبهٔ ۱۰۰۰۰ می‌خواهد باید با برنامهٔ دانش‌آموزی که هدفش قبولی پزشکی است متفاوت باشد؛ برای هدف‌های رقابتی‌تر سهم درس‌های کلیدی، تست زمان‌دار و مرور را متناسب افزایش بده. اگر هدف، زمان مطالعه یا درس‌های انتخابی با هم ناسازگارند، در summary و focusTip محترمانه مخالفت کن، محدودیت را توضیح بده و اولویت واقع‌بینانه پیشنهاد کن؛ صرفاً خواستهٔ غیرواقعی را تأیید نکن. فهرست معتبر کل دروس رشتهٔ انتخاب‌شده: ${curriculum.join("، ")}. فقط از این فهرست برای subject استفاده کن و دروس اولویت‌دار را با سهم بیشتر، نه به‌عنوان فهرست محدودکننده، به کار ببر. در بازهٔ امروز یا فردا فقط جلسه‌های همان روز را بساز؛ در بازهٔ هفتگی دقیقاً برای هر هفت روز حداقل یک جلسه بساز و روزها را با نام‌های دقیق شنبه، یکشنبه، دوشنبه، سه‌شنبه، چهارشنبه، پنجشنبه، جمعه ثبت کن. summary حداکثر ۲۵۰ کلمه باشد و خروجی را کامل و معتبر JSON نگه دار.`,
            },
            {
              role: "user",
              content: `پاسخ‌های واقعی دانش‌آموز:\n${answers}\nکل دروس مجاز رشته: ${curriculum.join("، ")}\nبازهٔ برنامه: ${input.planRange === "week" ? "هفتگی" : input.planRange === "tomorrow" ? "فردا" : "امروز"}
بازهٔ برنامه: ${input.planRange === "week" ? "هفتگی" : input.planRange === "tomorrow" ? "فردا" : "امروز"}
تاریخ محلی دستگاه: ${cleanContext(input.deviceDate, 100)}\nمنطقه زمانی: ${cleanContext(input.timezone, 100)}\nپروفایل حساب: ${cleanContext(input.profile, 500)}\nامتحان نزدیک و هدف آزمون را در اولویت‌بندی لحاظ کن. هدف قبولی را با میزان رقابت آن مقایسه کن؛ بین هدف رتبهٔ ۱۰۰۰۰ و قبولی پزشکی تفاوت واقعی در توزیع زمان و سختی برنامه ایجاد کن. اگر خواستهٔ دانش‌آموز با ساعات مطالعه یا مهلت امتحان شدنی نیست، در summary شفاف و محترمانه مخالفت کن و راه جایگزین بده.`,
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
          plan.sessions = normalizePlanSessions(plan.sessions, curriculum);
          if (input.planRange === "week") {
            const weekDays = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
            const existingDays = new Set(plan.sessions.map((session) => session.day));
            const priority = (input.answers["دروس اولویت‌دار"] ?? input.answers["دروس امروز"] ?? "").split(/[،,]/).map((item) => item.trim()).filter(Boolean);
            const subjects = [...priority, ...curriculum.filter((subject) => !priority.includes(subject))];
            weekDays.forEach((day, index) => {
              if (!existingDays.has(day)) {
                const lesson = canonicalLesson(subjects[index % subjects.length] ?? curriculum[0] ?? "مطالعه", curriculum);
                plan.sessions.push({ subject: `${lesson.code}|${lesson.name}`, topic: "مطالعه و مرور برنامه‌ریزی‌شده", day, start: "۱۶:۰۰", end: "۱۷:۰۰", duration: "۶۰ دقیقه", reason: `پوشش اجباری روز هفتگی · کد درس: ${lesson.code}` });
              }
            });
            if (!plan.title.includes("هفت")) plan.title = `برنامهٔ هفتگی · ${plan.title}`;
          }
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

// Router reload marker: clearChat procedure available

// Assessment router integration is being prepared.
