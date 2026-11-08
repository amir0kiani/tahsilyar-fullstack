import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-08T00:00:00.000Z");
const sourceTitle = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – یازدهم انسانی (فایل ارسالی کاربر)";

export const verifiedGrade11HumanitiesKankchiBatch1: ExamQuestion[] = [
  {
    id: "upload-kankchi-human11-math-logic-01",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "ترکیب گزاره‌های شرطی",
    difficulty: "متوسط",
    prompt: "گزارهٔ p درست، گزارهٔ q نادرست و r گزاره‌ای دلخواه است. کدام ترکیب شرطی همواره درست است؟",
    options: [
      "(p ∧ q) ⇒ ¬r",
      "(p ∧ r) ⇒ q",
      "(¬p ∨ r) ⇒ q",
      "(q ∨ r) ⇒ ¬p"
    ],
    correctIndex: 0,
    explanation: "چون q نادرست است، ترکیب p ∧ q در هر حال نادرست می‌شود؛ گزارهٔ شرطی با مقدم نادرست همواره درست است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۴ دفترچهٔ قلم‌چی و کلید گزینهٔ ۱ با صفحهٔ ۲ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-02",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "هم‌ارزی گزاره‌های شرطی",
    difficulty: "متوسط",
    prompt: "کدام‌یک از گزاره‌های زیر نادرست است؟",
    options: [
      "اگر ۳ عددی اول باشد، آنگاه ۲۵ عددی مرکب است و برعکس.",
      "x بر ۳ بخش‌پذیر است اگر و تنها اگر مجموع رقم‌هایش بر ۳ بخش‌پذیر باشد.",
      "اگر x = ۴ باشد، آنگاه x² = ۱۶ است و برعکس.",
      "شرط لازم و کافی برای صفر بودن حاصل‌ضرب دو عدد، صفر بودن دست‌کم یکی از آن دو عدد است."
    ],
    correctIndex: 2,
    explanation: "جهت نخست درست است، اما عکس آن لزوماً درست نیست؛ از x² = ۱۶ می‌توان به x = ۴ یا x = −۴ رسید.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۴ دفترچهٔ قلم‌چی و کلید گزینهٔ ۳ با صفحهٔ ۲ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-03",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "ارزش گزاره‌های مرکب",
    difficulty: "آسان",
    prompt: "فرض کنید p: «عدد ۷ یک عدد اول است»، q: «مجموع دو عدد فرد، عددی زوج است» و r: «عدد ۱۵ بر ۴ بخش‌پذیر است». با توجه به ارزش این گزاره‌ها، ارزش گزارهٔ مرکب ¬(p ∧ q) ∨ r کدام است؟",
    options: ["درست", "نادرست", "هم‌ارز p است", "هم‌ارز ¬r است"],
    correctIndex: 1,
    explanation: "p و q درست و r نادرست‌اند؛ بنابراین ¬(درست ∧ درست) ∨ نادرست برابر نادرست است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۳", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۴ دفترچهٔ قلم‌چی و کلید گزینهٔ ۲ با صفحهٔ ۲ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-04",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "ارزش گزاره‌های شرطی",
    difficulty: "دشوار",
    prompt: "ارزش گزارهٔ ((r ⇒ (p ∨ ¬q)) ⇒ r) به انتفای مقدم درست است. کدام گزینه ارزش p، q و r را به‌ترتیب از راست به چپ نشان می‌دهد؟",
    options: [
      "نادرست، نادرست، درست",
      "نادرست، درست، درست",
      "نادرست، درست، نادرست",
      "درست، نادرست، نادرست"
    ],
    correctIndex: 1,
    explanation: "برای نادرست بودن گزارهٔ شرطی داخلی، r باید درست و p ∨ ¬q باید نادرست باشد؛ پس p نادرست و q درست است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۴", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۴ دفترچهٔ قلم‌چی و کلید گزینهٔ ۲ با صفحهٔ ۲ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-05",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "ارزش همواره نادرست",
    difficulty: "متوسط",
    prompt: "اگر p گزاره‌ای درست، q گزاره‌ای نادرست و r گزاره‌ای دلخواه باشد، ارزش کدام گزاره همواره نادرست است؟",
    options: [
      "(p ∨ q) ⇒ ¬r",
      "(p ∧ q) ⇒ r",
      "(p ∨ q) ⇒ r",
      "(p ⇒ q) ∧ r"
    ],
    correctIndex: 3,
    explanation: "با درست بودن p و نادرست بودن q، گزارهٔ p ⇒ q نادرست است؛ پس عطف آن با هر گزارهٔ r همواره نادرست می‌ماند.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۵", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۴ دفترچهٔ قلم‌چی و کلید گزینهٔ ۴ با صفحهٔ ۳ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-06",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "هم‌ارزی منطقی",
    difficulty: "دشوار",
    prompt: "اگر p گزاره‌ای درست، q گزاره‌ای نادرست و r گزاره‌ای دلخواه باشد، کدام گزاره با r هم‌ارز منطقی است؟",
    options: [
      "[q ⇒ (q ∧ r)] ∧ (¬p ⇒ r)",
      "[p ⇒ (q ∧ r)] ∧ (q ⇒ ¬r)",
      "[q ⇒ (p ∨ ¬r)] ∧ (p ⇒ r)",
      "[(p ∧ q) ⇒ r] ∧ (¬q ⇒ ¬r)"
    ],
    correctIndex: 2,
    explanation: "با جای‌گذاری p درست و q نادرست، بخش نخست گزینهٔ ۳ همواره درست و بخش دوم برابر r می‌شود؛ پس کل گزاره با r هم‌ارز است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۶", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۵ دفترچهٔ قلم‌چی و کلید گزینهٔ ۳ با صفحهٔ ۳ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-07",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "وابستگی ارزش گزاره به متغیر",
    difficulty: "دشوار",
    prompt: "اگر p درست و q نادرست باشد، کدام تعداد از پنج عبارت زیر مستقل از r هستند؟ الف) (q implies r) implies not q؛ ب) (not p implies r) implies r؛ ج) (r implies p) implies q؛ د) (r implies not q) implies not p؛ هـ) (p implies r) implies q.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    explanation: "گزاره‌های (الف)، (ج) و (د) مستقل از r هستند؛ گزاره‌های (ب) و (ه) با تغییر r تغییر می‌کنند. بنابراین سه گزاره به r وابسته نیستند.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۷", verifiedAt,
    reviewerNote: "پنج گزارهٔ الف تا ه‍ و گزینه‌های تعداد با صفحهٔ ۵ دفترچهٔ قلم‌چی و کلید گزینهٔ ۳ با صفحهٔ ۳ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-08",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "جدول ارزش گزاره‌های مرکب",
    difficulty: "متوسط",
    prompt: "ستون آخر جدول ارزش گزارهٔ (¬(p ⇔ q) ∧ p) ⇒ ¬q کدام است؟ ترتیب سطرها به‌ترتیب (درست، درست)، (درست، نادرست)، (نادرست، درست) و (نادرست، نادرست) است.",
    options: [
      "نادرست، درست، نادرست، نادرست",
      "درست، درست، درست، درست",
      "نادرست، درست، درست، درست",
      "درست، نادرست، نادرست، درست"
    ],
    correctIndex: 1,
    explanation: "در هر چهار حالت، گزارهٔ شرطی درست است؛ یا مقدم نادرست است یا در حالتی که مقدم درست می‌شود، تالی نیز درست خواهد بود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۸", verifiedAt,
    reviewerNote: "صورت جدول و گزینه‌ها با صفحهٔ ۵ دفترچهٔ قلم‌چی و کلید گزینهٔ ۲ با صفحهٔ ۳ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-09",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "عکس نقیض گزاره",
    difficulty: "متوسط",
    prompt: "عکس نقیض گزارهٔ p ⇒ (q ⇒ r) کدام است؟",
    options: [
      "¬p ⇒ (¬q ⇒ ¬r)",
      "¬r ⇒ (¬q ⇒ ¬p)",
      "(q ∧ ¬r) ⇒ ¬p",
      "(¬r ⇒ ¬q) ⇒ ¬p"
    ],
    correctIndex: 2,
    explanation: "عکس نقیض گزارهٔ p ⇒ (q ⇒ r)، برابر ¬(q ⇒ r) ⇒ ¬p است و ¬(q ⇒ r) با q ∧ ¬r هم‌ارز است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۹", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۵ دفترچهٔ قلم‌چی و کلید گزینهٔ ۳ با صفحهٔ ۳ پاسخنامه تطبیق داده شد."
  },
  {
    id: "upload-kankchi-human11-math-logic-10",
    grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "استنتاج از گزاره‌های مرکب",
    difficulty: "دشوار",
    prompt: "اگر گزارهٔ ((¬q ⇒ r) ∨ ¬p) ∧ ¬p درست باشد، ارزش کدام گزاره حتماً درست است؟",
    options: [
      "p ⇔ q",
      "p ⇒ (q ∨ r)",
      "¬q ⇒ (p ∨ r)",
      "r ⇔ ¬p"
    ],
    correctIndex: 1,
    explanation: "درست بودن عطف مستلزم درست بودن ¬p است؛ پس p نادرست است و گزارهٔ شرطی p ⇒ (q ∨ r) با مقدم نادرست همواره درست خواهد بود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۰", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۵ دفترچهٔ قلم‌چی و کلید گزینهٔ ۲ با صفحهٔ ۳ پاسخنامه تطبیق داده شد."
  }
];
