import type { ExamQuestion } from "./examBank";

export type UploadedQuestionSeed = {
  topic: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  difficulty?: "آسان" | "متوسط" | "سخت";
};

export function buildUploadedLessonQuestions(input: {
  idPrefix: string;
  track: string;
  subject: string;
  chapter: string;
  lessonNumber: number;
  sourceTitle: string;
  rows: UploadedQuestionSeed[];
}): ExamQuestion[] {
  return input.rows.map((row, index) => ({
    id: input.idPrefix + "-q" + String(index + 1).padStart(2, "0"),
    grade: "دوازدهم",
    track: input.track,
    subject: input.subject,
    chapter: input.chapter,
    topic: row.topic,
    difficulty: row.difficulty ?? "متوسط",
    prompt: row.prompt,
    options: row.options,
    correctIndex: row.correctIndex,
    explanation: row.explanation,
    sourceStatus: "official-exam-adapted",
    sourceTitle: input.sourceTitle,
    sourceQuestionNumber: "درس " + input.lessonNumber + "؛ گزیده " + (index + 1) + " (شماره اصلی در فایل گردآوری‌شده مشخص نشده)",
    verifiedAt: new Date("2026-11-01T00:00:00.000Z"),
    reviewerNote: "صورت سؤال برای قالب چهارگزینه‌ای تحصیل‌یار بازنویسی شده است؛ مبنا، پرسش‌ها و پاسخ‌های بخش همین درس در فایل ارسالی کاربر است. متن عین سؤال رسمی نیست."
  }));
}
