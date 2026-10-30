import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  academicGoals,
  conversationMessages,
  conversations,
  InsertUser,
  studentProfiles,
  studyPlans,
  studySessions,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

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
