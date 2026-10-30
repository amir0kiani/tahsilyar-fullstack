import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  academicGoals,
  examAttempts,
  curriculumChapters as curriculumChapterRows,
  examQuestions as examQuestionRows,
  conversationMessages,
  conversations,
  InsertUser,
  studentProfiles,
  studyPlans,
  studySessions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";
import { examQuestions as starterQuestions } from "./examBank";
import { curriculumCatalog } from "./curriculumCatalog";
import { verifiedQuestions } from "./verifiedQuestionBank";

const allStarterQuestions = [...starterQuestions, ...verifiedQuestions];

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); }
    catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  for (const field of textFields) {
    if (user[field] !== undefined) { values[field] = user[field] ?? null; updateSet[field] = user[field] ?? null; }
  }
  values.lastSignedIn = user.lastSignedIn ?? new Date();
  updateSet.lastSignedIn = values.lastSignedIn;
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function upsertStudentProfile(input: { userId: number; name?: string; email?: string; answers: Record<string, string> }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  await db.insert(studentProfiles).values(input).onDuplicateKeyUpdate({ set: { name: input.name, email: input.email, answers: input.answers, updatedAt: new Date() } });
  const rows = await db.select().from(studentProfiles).where(eq(studentProfiles.userId, input.userId)).limit(1);
  return rows[0];
}

export async function getStudentProfile(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(studentProfiles).where(eq(studentProfiles.userId, userId)).limit(1);
  return rows[0];
}

export async function createStudyPlan(input: { userId: number; title: string; summary: string; focusTip: string; inputSnapshot: Record<string, unknown>; sessions: Array<{ subject: string; topic: string; day: string; start: string; end: string; duration: string; reason: string }> }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  return db.transaction(async (tx) => {
    const planResult = await tx.insert(studyPlans).values({ userId: input.userId, title: input.title, summary: input.summary, focusTip: input.focusTip, inputSnapshot: input.inputSnapshot });
    const planId = Number(planResult[0].insertId);
    if (input.sessions.length) {
      await tx.insert(studySessions).values(input.sessions.map((session) => ({ ...session, planId, userId: input.userId })));
    }
    return { planId, ...input, createdAt: new Date() };
  });
}

export async function getLatestStudyPlan(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const plans = await db.select().from(studyPlans).where(eq(studyPlans.userId, userId)).orderBy(desc(studyPlans.createdAt)).limit(1);
  const plan = plans[0];
  if (!plan) return undefined;
  const sessions = await db.select().from(studySessions).where(and(eq(studySessions.planId, plan.id), eq(studySessions.userId, userId)));
  return { ...plan, sessions };
}

export async function setStudySessionCompleted(input: { userId: number; sessionId: number; completed: boolean }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  await db.update(studySessions).set({ completed: input.completed ? 1 : 0 }).where(and(eq(studySessions.id, input.sessionId), eq(studySessions.userId, input.userId)));
  const rows = await db.select().from(studySessions).where(and(eq(studySessions.id, input.sessionId), eq(studySessions.userId, input.userId))).limit(1);
  return rows[0] ?? null;
}

export async function getOrCreateConversation(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const rows = await db.select().from(conversations).where(eq(conversations.userId, userId)).orderBy(desc(conversations.updatedAt)).limit(1);
  if (rows[0]) return rows[0];
  const result = await db.insert(conversations).values({ userId });
  const created = await db.select().from(conversations).where(eq(conversations.id, Number(result[0].insertId))).limit(1);
  return created[0];
}

export async function clearConversation(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const rows = await db.select().from(conversations).where(eq(conversations.userId, userId)).limit(20);
  for (const conversation of rows) {
    await db.delete(conversationMessages).where(and(eq(conversationMessages.conversationId, conversation.id), eq(conversationMessages.userId, userId)));
    await db.delete(conversations).where(and(eq(conversations.id, conversation.id), eq(conversations.userId, userId)));
  }
  return { success: true } as const;
}

export async function getRecentConversationMessages(userId: number, conversationId: number, limit = 12) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(conversationMessages).where(and(eq(conversationMessages.userId, userId), eq(conversationMessages.conversationId, conversationId))).orderBy(desc(conversationMessages.createdAt)).limit(limit);
  return rows.reverse();
}

export async function addConversationMessage(input: { conversationId: number; userId: number; role: "user" | "assistant"; content: string }) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  await db.insert(conversationMessages).values(input);
  await db.update(conversations).set({ updatedAt: new Date() }).where(and(eq(conversations.id, input.conversationId), eq(conversations.userId, input.userId)));
}


export async function saveExamAttempt(input: {
  userId: number; grade: string; track: string; subject: string; chapter: string;
  questionCount: number; correctCount: number; scorePercent: number;
  responses: Array<{ questionId: string; selectedIndex: number; correctIndex: number; isCorrect: boolean; subject: string; chapter: string; topic: string; difficulty: string }>;
  topicAnalysis: Array<{ topic: string; total: number; correct: number; accuracy: number }>;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const result = await db.insert(examAttempts).values(input);
  const rows = await db.select().from(examAttempts).where(and(eq(examAttempts.id, Number(result[0].insertId)), eq(examAttempts.userId, input.userId))).limit(1);
  return rows[0] ?? null;
}

export async function getExamHistory(userId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(examAttempts).where(eq(examAttempts.userId, userId)).orderBy(desc(examAttempts.completedAt)).limit(limit);
}

export async function getAcademicMastery(userId: number) {
  const attempts = await getExamHistory(userId, 100);
  const byTopic = new Map<string, { subject: string; chapter: string; topic: string; attempts: number; questions: number; correct: number; latestAt: Date }>();
  for (const attempt of attempts) {
    const analysis = (attempt.topicAnalysis ?? []) as Array<{ topic: string; total: number; correct: number; accuracy: number }>;
    for (const item of analysis) {
      const key = [attempt.subject, attempt.chapter, item.topic].join("::");
      const existing = byTopic.get(key);
      if (existing) { existing.attempts += 1; existing.questions += item.total; existing.correct += item.correct; }
      else byTopic.set(key, { subject: attempt.subject, chapter: attempt.chapter, topic: item.topic, attempts: 1, questions: item.total, correct: item.correct, latestAt: attempt.completedAt });
    }
  }
  return Array.from(byTopic.values()).map((item) => ({
    ...item,
    accuracy: item.questions ? Math.round((item.correct / item.questions) * 100) : 0,
    status: item.questions < 3 ? "دادهٔ ناکافی" : item.correct / item.questions >= 0.8 ? "نسبتاً مسلط" : item.correct / item.questions >= 0.5 ? "نیازمند مرور" : "اولویت تمرین",
  })).sort((a, b) => a.accuracy - b.accuracy);
}


type AssessmentFilters = {
  subject?: string; chapter?: string; grade?: string; track?: string;
  difficulty?: string; ids?: string[]; limit?: number;
};
let assessmentSeedPromise: Promise<void> | null = null;

function matchesAssessmentTrack(questionTrack: string, selectedTrack?: string) {
  if (!selectedTrack) return true;
  if (questionTrack === selectedTrack || questionTrack === "عمومی") return true;
  if (questionTrack === "ریاضی و تجربی" && ["ریاضی", "تجربی"].includes(selectedTrack)) return true;
  if (selectedTrack === "ریاضی و تجربی" && ["ریاضی", "تجربی"].includes(questionTrack)) return true;
  return false;
}

function matchesAssessmentQuestion(question: typeof allStarterQuestions[number], filters: AssessmentFilters) {
  return (!filters.subject || question.subject === filters.subject) &&
    (!filters.chapter || filters.chapter === "کل کتاب" || question.chapter === filters.chapter) &&
    (!filters.grade || question.grade === filters.grade) &&
    matchesAssessmentTrack(question.track, filters.track) &&
    (!filters.difficulty || question.difficulty === filters.difficulty) &&
    (!filters.ids || filters.ids.includes(question.id));
}

async function ensureAssessmentBankSeeded(db: NonNullable<Awaited<ReturnType<typeof getDb>>>) {
  if (!assessmentSeedPromise) {
    assessmentSeedPromise = (async () => {
      const [existingQuestionRows, existingChapterRows] = await Promise.all([
        db.select({ id: examQuestionRows.id }).from(examQuestionRows),
        db.select({ id: curriculumChapterRows.id, track: curriculumChapterRows.track, grade: curriculumChapterRows.grade, subject: curriculumChapterRows.subject, chapter: curriculumChapterRows.chapter }).from(curriculumChapterRows),
      ]);
      const existingIds = new Set(existingQuestionRows.map((row) => row.id));
      const missingQuestions = allStarterQuestions.filter((question) => !existingIds.has(question.id));
      for (let offset = 0; offset < missingQuestions.length; offset += 100) {
        const chunk = missingQuestions.slice(offset, offset + 100);
        await db.insert(examQuestionRows).values(chunk.map((question) => ({
          ...question, sourceStatus: question.sourceStatus ?? "sample-authored", isActive: 1,
        })));
      }
      const chapterKeys = new Set(existingChapterRows.map((row) => [row.track, row.grade, row.subject, row.chapter].join("::")));
      const missingChapters = curriculumCatalog.flatMap((item) => item.chapters
        .filter((chapter) => !chapterKeys.has([item.track, item.grade, item.subject, chapter].join("::")))
        .map((chapter) => ({ track: item.track, grade: item.grade, subject: item.subject, chapter, isActive: 1 })));
      for (let offset = 0; offset < missingChapters.length; offset += 100) {
        await db.insert(curriculumChapterRows).values(missingChapters.slice(offset, offset + 100));
      }
    })();
  }
  try { await assessmentSeedPromise; }
  catch (error) { assessmentSeedPromise = null; throw error; }
}

function filterBundledQuestions(filters: AssessmentFilters) {
  return allStarterQuestions.filter((question) => matchesAssessmentQuestion(question, filters))
    .slice(0, filters.limit ?? 20);
}

export async function getAssessmentQuestions(filters: AssessmentFilters = {}) {
  const db = await getDb();
  if (!db) return filterBundledQuestions(filters);
  try {
    await ensureAssessmentBankSeeded(db);
    const rows = await db.select().from(examQuestionRows).where(eq(examQuestionRows.isActive, 1));
    return rows.filter((question) => matchesAssessmentQuestion(question as typeof allStarterQuestions[number], filters))
      .slice(0, filters.limit ?? 20);
  } catch (error) {
    console.warn("[Assessment] Persistent bank unavailable; using bundled question data:", error);
    return filterBundledQuestions(filters);
  }
}

export async function getAssessmentCatalog() {
  const db = await getDb();
  if (!db) return curriculumCatalog;
  try {
    await ensureAssessmentBankSeeded(db);
    const [chapterRows, questionRows] = await Promise.all([
      db.select().from(curriculumChapterRows).where(eq(curriculumChapterRows.isActive, 1)),
      db.select({ track: examQuestionRows.track, grade: examQuestionRows.grade, subject: examQuestionRows.subject, chapter: examQuestionRows.chapter })
        .from(examQuestionRows).where(eq(examQuestionRows.isActive, 1)),
    ]);
    const grouped = new Map<string, { track: string; grade: string; subject: string; chapters: string[] }>();
    for (const row of [...chapterRows, ...questionRows]) {
      // Ignore legacy aggregate catalog rows; grade-specific entries are seeded above.
      if (row.grade === "دهم تا دوازدهم") continue;
      const key = [row.track, row.grade, row.subject].join("::");
      const current = grouped.get(key) ?? { track: row.track, grade: row.grade, subject: row.subject, chapters: [] };
      if (!current.chapters.includes(row.chapter)) current.chapters.push(row.chapter);
      grouped.set(key, current);
    }
    return Array.from(grouped.values()).sort((a, b) =>
      a.grade.localeCompare(b.grade, "fa") || a.track.localeCompare(b.track, "fa") || a.subject.localeCompare(b.subject, "fa")
    );
  } catch (error) {
    console.warn("[Assessment] Curriculum unavailable; using bundled grade-specific catalog:", error);
    return curriculumCatalog;
  }
}
