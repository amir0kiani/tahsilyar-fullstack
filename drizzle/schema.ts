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
export type Conversation = typeof conversations.$inferSelect;
export type ConversationMessage = typeof conversationMessages.$inferSelect;

// All feature rows are scoped by userId and are queried only through authenticated procedures.
// Foreign-key constraints are intentionally managed by the application migration for TiDB compatibility.


export const examAttempts = mysqlTable("exam_attempts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  grade: varchar("grade", { length: 32 }).notNull(),
  track: varchar("track", { length: 32 }).notNull(),
  subject: varchar("subject", { length: 128 }).notNull(),
  chapter: varchar("chapter", { length: 128 }).notNull(),
  questionCount: int("questionCount").notNull(),
  correctCount: int("correctCount").notNull(),
  scorePercent: int("scorePercent").notNull(),
  responses: json("responses").notNull(),
  topicAnalysis: json("topicAnalysis").notNull(),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("exam_attempts_user_id_idx").on(table.userId),
  userSubjectIdx: index("exam_attempts_user_subject_idx").on(table.userId, table.subject),
  userChapterIdx: index("exam_attempts_user_chapter_idx").on(table.userId, table.chapter),
}));

export type ExamAttempt = typeof examAttempts.$inferSelect;


export const curriculumChapters = mysqlTable("curriculum_chapters", {
  id: int("id").autoincrement().primaryKey(),
  track: varchar("track", { length: 64 }).notNull(),
  grade: varchar("grade", { length: 32 }).notNull(),
  subject: varchar("subject", { length: 128 }).notNull(),
  chapter: varchar("chapter", { length: 128 }).notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  subjectChapterIdx: index("curriculum_subject_chapter_idx").on(table.subject, table.chapter),
  trackGradeIdx: index("curriculum_track_grade_idx").on(table.track, table.grade),
}));

export const examQuestions = mysqlTable("exam_questions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  grade: varchar("grade", { length: 32 }).notNull(),
  track: varchar("track", { length: 64 }).notNull(),
  subject: varchar("subject", { length: 128 }).notNull(),
  chapter: varchar("chapter", { length: 128 }).notNull(),
  topic: varchar("topic", { length: 128 }).notNull(),
  difficulty: varchar("difficulty", { length: 32 }).notNull(),
  prompt: text("prompt").notNull(),
  options: json("options").$type<string[]>().notNull(),
  correctIndex: int("correctIndex").notNull(),
  explanation: text("explanation").notNull(),
  sourceStatus: varchar("sourceStatus", { length: 32 }).default("sample-authored").notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  subjectChapterIdx: index("exam_questions_subject_chapter_idx").on(table.subject, table.chapter),
  gradeTrackIdx: index("exam_questions_grade_track_idx").on(table.grade, table.track),
  difficultyIdx: index("exam_questions_difficulty_idx").on(table.difficulty),
}));
