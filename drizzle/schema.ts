import { int, index, json, mysqlEnum, mysqlTable, text, timestamp, varchar, uniqueIndex } from "drizzle-orm/mysql-core";

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
  sourceTitle: varchar("sourceTitle", { length: 255 }),
  sourceUrl: text("sourceUrl"),
  sourceYear: varchar("sourceYear", { length: 16 }),
  sourceQuestionNumber: varchar("sourceQuestionNumber", { length: 64 }),
  verifiedAt: timestamp("verifiedAt"),
  reviewerNote: text("reviewerNote"),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  subjectChapterIdx: index("exam_questions_subject_chapter_idx").on(table.subject, table.chapter),
  gradeTrackIdx: index("exam_questions_grade_track_idx").on(table.grade, table.track),
  difficultyIdx: index("exam_questions_difficulty_idx").on(table.difficulty),
}));


export const studentLessonProgress = mysqlTable("student_lesson_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  grade: varchar("grade", { length: 32 }).notNull(),
  track: varchar("track", { length: 32 }).notNull(),
  subject: varchar("subject", { length: 128 }).notNull(),
  chapter: varchar("chapter", { length: 255 }).notNull(),
  isCompleted: int("isCompleted").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userLessonUnique: uniqueIndex("student_lesson_progress_user_lesson_unique").on(table.userId, table.grade, table.track, table.subject, table.chapter),
  userIdx: index("student_lesson_progress_user_idx").on(table.userId),
}));


// Monetization v1: prices are stored in Rials (integer); UI converts to Tomans.
export const subscriptionPlans = mysqlTable("subscription_plans", {
  id: int("id").autoincrement().primaryKey(),
  code: varchar("code", { length: 32 }).notNull().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  durationMonths: int("durationMonths").notNull(),
  priceRials: int("priceRials").notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const planEntitlements = mysqlTable("plan_entitlements", {
  id: int("id").autoincrement().primaryKey(),
  planId: int("planId").notNull(),
  featureKey: varchar("featureKey", { length: 80 }).notNull(),
  monthlyLimit: int("monthlyLimit"),
  enabled: int("enabled").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  planFeatureUnique: uniqueIndex("plan_entitlements_plan_feature_unique").on(table.planId, table.featureKey),
  planIdx: index("plan_entitlements_plan_idx").on(table.planId),
}));

export const userSubscriptions = mysqlTable("user_subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  planId: int("planId").notNull(),
  status: mysqlEnum("status", ["pending", "active", "expired", "cancelled", "suspended"]).default("pending").notNull(),
  startsAt: timestamp("startsAt"),
  endsAt: timestamp("endsAt"),
  cancelledAt: timestamp("cancelledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userStatusIdx: index("user_subscriptions_user_status_idx").on(table.userId, table.status),
  endsAtIdx: index("user_subscriptions_ends_at_idx").on(table.endsAt),
}));

export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subscriptionId: int("subscriptionId"),
  planId: int("planId").notNull(),
  provider: varchar("provider", { length: 32 }).default("zarinpal").notNull(),
  amountRials: int("amountRials").notNull(),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "refunded"]).default("pending").notNull(),
  authority: varchar("authority", { length: 128 }).unique(),
  refId: varchar("refId", { length: 128 }),
  requestId: varchar("requestId", { length: 128 }),
  callbackPayload: json("callbackPayload"),
  verifiedAt: timestamp("verifiedAt"),
  failureReason: text("failureReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userCreatedIdx: index("payments_user_created_idx").on(table.userId, table.createdAt),
  statusIdx: index("payments_status_idx").on(table.status),
}));

export const aiUsageMonthly = mysqlTable("ai_usage_monthly", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  featureKey: varchar("featureKey", { length: 80 }).notNull(),
  periodKey: varchar("periodKey", { length: 7 }).notNull(),
  usedCount: int("usedCount").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userFeaturePeriodUnique: uniqueIndex("ai_usage_user_feature_period_unique").on(table.userId, table.featureKey, table.periodKey),
  periodIdx: index("ai_usage_period_idx").on(table.periodKey),
}));

export const aiUsageLogs = mysqlTable("ai_usage_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  featureKey: varchar("featureKey", { length: 80 }).notNull(),
  periodKey: varchar("periodKey", { length: 7 }).notNull(),
  model: varchar("model", { length: 128 }),
  inputTokens: int("inputTokens").default(0).notNull(),
  outputTokens: int("outputTokens").default(0).notNull(),
  units: int("units").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  userPeriodIdx: index("ai_usage_logs_user_period_idx").on(table.userId, table.periodKey),
  featureIdx: index("ai_usage_logs_feature_idx").on(table.featureKey),
}));

export const paymentWebhookEvents = mysqlTable("payment_webhook_events", {
  id: int("id").autoincrement().primaryKey(),
  provider: varchar("provider", { length: 32 }).notNull(),
  eventKey: varchar("eventKey", { length: 160 }).notNull(),
  paymentId: int("paymentId"),
  processedAt: timestamp("processedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  providerEventUnique: uniqueIndex("payment_webhook_provider_event_unique").on(table.provider, table.eventKey),
}));

export const adminAuditLogs = mysqlTable("admin_audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  adminUserId: int("adminUserId").notNull(),
  targetUserId: int("targetUserId"),
  action: varchar("action", { length: 100 }).notNull(),
  entityType: varchar("entityType", { length: 80 }).notNull(),
  entityId: varchar("entityId", { length: 80 }),
  reason: text("reason"),
  beforeData: json("beforeData"),
  afterData: json("afterData"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  adminCreatedIdx: index("admin_audit_admin_created_idx").on(table.adminUserId, table.createdAt),
  targetIdx: index("admin_audit_target_idx").on(table.targetUserId),
}));
