import { int, index, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const studentProfiles = mysqlTable("student_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  answers: json("answers").notNull(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ userIdIdx: index("student_profiles_user_id_idx").on(table.userId) }));

export const academicGoals = mysqlTable("academic_goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  target: text("target").notNull(),
  deadline: timestamp("deadline"),
  status: mysqlEnum("status", ["active", "completed", "cancelled"]).default("active").notNull(),
  priority: int("priority").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ userIdIdx: index("academic_goals_user_id_idx").on(table.userId) }));

export const studyPlans = mysqlTable("study_plans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  focusTip: text("focusTip").notNull(),
  inputSnapshot: json("inputSnapshot").notNull(),
  status: mysqlEnum("status", ["draft", "active", "completed", "archived"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ userIdIdx: index("study_plans_user_id_idx").on(table.userId) }));

export const studySessions = mysqlTable("study_sessions", {
  id: int("id").autoincrement().primaryKey(),
  planId: int("planId").notNull(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  topic: text("topic").notNull(),
  day: varchar("day", { length: 32 }).notNull(),
  start: varchar("start", { length: 16 }).notNull(),
  end: varchar("end", { length: 16 }).notNull(),
  duration: varchar("duration", { length: 32 }).notNull(),
  reason: text("reason").notNull(),
  completed: int("completed").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ userIdIdx: index("study_sessions_user_id_idx").on(table.userId), planIdIdx: index("study_sessions_plan_id_idx").on(table.planId) }));

export const studyAssessments = mysqlTable("study_assessments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  topic: text("topic").notNull(),
  assessmentType: mysqlEnum("assessmentType", ["practice", "mock", "school_exam"]).default("practice").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  totalQuestions: int("totalQuestions").notNull(),
  assessedAt: timestamp("assessedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userAssessedIdx: index("study_assessments_user_assessed_idx").on(table.userId, table.assessedAt),
  userSubjectIdx: index("study_assessments_user_subject_idx").on(table.userId, table.subject),
}));

export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).default("گفت‌وگوی تحصیلی").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ userIdIdx: index("conversations_user_id_idx").on(table.userId) }));

export const conversationMessages = mysqlTable("conversation_messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  userId: int("userId").notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ conversationIdx: index("conversation_messages_conversation_idx").on(table.conversationId), userIdIdx: index("conversation_messages_user_id_idx").on(table.userId) }));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type StudentProfile = typeof studentProfiles.$inferSelect;
export type AcademicGoal = typeof academicGoals.$inferSelect;
export type StudyPlan = typeof studyPlans.$inferSelect;
export type StudySession = typeof studySessions.$inferSelect;
export type StudyAssessment = typeof studyAssessments.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type ConversationMessage = typeof conversationMessages.$inferSelect;

// All feature rows are scoped by userId and are queried only through authenticated procedures.
// Foreign-key constraints are intentionally managed by the application migration for TiDB compatibility.
