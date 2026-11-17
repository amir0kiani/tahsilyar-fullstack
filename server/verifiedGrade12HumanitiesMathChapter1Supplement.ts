import type { ExamQuestion } from "./examBank";

// Original textbook-grounded question for Chapter 1, Lesson 3.
// It is not a verbatim or adapted official-exam item.
const verifiedAt = new Date("2026-11-17T00:00:00.000Z");

export const verifiedGrade12HumanitiesMathChapter1Supplement: ExamQuestion[] = [
  {
    id: "verified-human12-math3-curriculum-statistical-cycle-001",
    grade: "دوازدهم",
    track: "انسانی",
    subject: "ریاضی و آمار",
    chapter: "آمار و احتمال",
    topic: "چرخه آمار در حل مسائل",
    difficulty: "متوسط",
    prompt: "کدام گزینه ترتیب درست پنج گام چرخهٔ آمار در حل مسائل را نشان می‌دهد؟",
    options: [
      "بیان مسئله ← طرح و برنامه‌ریزی ← گردآوری و پاکسازی داده‌ها ← تحلیل داده‌ها ← بحث و نتیجه‌گیری",
      "طرح و برنامه‌ریزی ← بیان مسئله ← تحلیل داده‌ها ← گردآوری داده‌ها ← بحث و نتیجه‌گیری",
      "بیان مسئله ← گردآوری داده‌ها ← طرح و برنامه‌ریزی ← بحث و نتیجه‌گیری ← تحلیل داده‌ها",
      "گردآوری داده‌ها ← بیان مسئله ← طرح و برنامه‌ریزی ← تحلیل داده‌ها ← بحث و نتیجه‌گیری"
    ],
    correctIndex: 0,
    explanation: "طبق کتاب، چرخه با بیان دقیق مسئله آغاز می‌شود؛ سپس برنامه‌ریزی، گردآوری و پاکسازی داده‌ها، تحلیل داده‌ها و در پایان بحث و نتیجه‌گیری انجام می‌شود.",
    sourceStatus: "curriculum-verified",
    sourceTitle: "ریاضی و آمار (۳)، پایه دوازدهم علوم انسانی، کد ۱۱۲۲۱۲، چاپ چهارم ۱۴۰۰، سازمان پژوهش و برنامه‌ریزی آموزشی",
    sourceUrl: "https://dl.daneshchi.ir/file/chap-school/Amar-EM-12_Daneshchi.iR.pdf",
    sourceYear: "۱۴۰۰",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل از آزمون رسمی؛ با کتاب رسمی کد ۱۱۲۲۱۲، فصل اول، درس سوم «چرخه آمار در حل مسائل»، صفحات چاپی ۳۱ و ۳۲ تطبیق شد. نسخهٔ PDF بررسی‌شده چاپ چهارم ۱۴۰۰ است؛ صفحهٔ معرفی کتاب برای سال تحصیلی ۱۴۰۴–۱۴۰۵ همین کد و ساختار سه‌فصلی را فهرست می‌کند، اما شمارهٔ چاپ جدیدتر در PDF قابل تأیید نبود."
  }
];
