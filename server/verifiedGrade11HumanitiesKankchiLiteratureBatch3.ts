import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-08T00:00:00.000Z");
const sourceTitle = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – یازدهم انسانی (فایل ارسالی کاربر)";

export const verifiedGrade11HumanitiesKankchiLiteratureBatch3: ExamQuestion[] = [
  {
    id: "upload-kankchi-human11-literature-prosody-pattern-16",
    grade: "یازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "پایه‌های آوایی", topic: "تکمیل الگوی وزن شعر",
    difficulty: "دشوار",
    prompt: "با توجه به وزن بیت زیر، پایه‌های آوایی کدام گزینه می‌تواند به‌ترتیب در جاهای خالی قرار بگیرد؟ «سعدیا چو جور می‌بری، ... دیگر مروای بی‌بصرا ... او می‌کشد قلاب را»",
    options: [
      "در آسمان، تشنه‌ام",
      "در بند اویی، زحمت بود",
      "پنداشتم، من رفتم",
      "بیش از این، من ندانستم"
    ],
    correctIndex: 2,
    explanation: "با تقطیع وزن مصراع و تطبیق الگوی هجاها، گزینهٔ ۳ جای خالی‌ها را درست کامل می‌کند.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۶", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۷ دفترچهٔ قلم‌چی و کلید گزینهٔ ۳ با صفحهٔ ۵ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-literature-poetic-concepts-19",
    grade: "یازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "مفاهیم ادبی و قرابت معنایی", topic: "تشخیص مفهوم ابیات",
    difficulty: "دشوار",
    prompt: "هر یک از مفاهیم «توصیف صحنهٔ نبرد، ابراز بی‌نیازی، درخواست بخشش از خداوند، توصیف طبیعت، توصیه به خوش‌باشی به دلیل گذر روزگار» به‌ترتیب در کدام گزینه آمده‌اند؟",
    options: [
      "ب، پ، الف، ت، ث",
      "ت، ث، الف، ب، پ",
      "ج، ب، الف، ت، د",
      "ت، ب، الف، د، پ"
    ],
    correctIndex: 1,
    explanation: "با تطبیق مضمون هر پنج بیت با مفهوم خواسته‌شده، ترتیب درست مطابق گزینهٔ ۲ است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۹", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۷ دفترچهٔ قلم‌چی و کلید گزینهٔ ۲ با صفحهٔ ۵ پاسخنامه تطبیق داده شد."
  }
];
