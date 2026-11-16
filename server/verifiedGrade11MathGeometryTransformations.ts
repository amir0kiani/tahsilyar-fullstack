import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-16T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی هندسه (۲) پایه یازدهم، چاپ ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Hendese-Riazi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی است، نه استخراج‌شده از آزمون؛ صورت، گزینه‌ها، پاسخ و استدلال ریاضی بازبینی شده و با مبحث درس و صفحات ارجاعی کتاب تطبیق داده شده است.";

export const verifiedGrade11MathGeometryTransformations: ExamQuestion[] = [
  {
    id: "authored-grade11-geometry-transformations-lesson1-01",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس اول: تبدیل‌های هندسی — انتقال",
    difficulty: "آسان",
    prompt: "نقطهٔ A با مختصات (−۲، ۳) تحت انتقالی با بردار (۴، −۱) به کدام نقطه منتقل می‌شود؟",
    options: ["(۲، ۲)", "(−۶، ۴)", "(۲، ۴)", "(−۲، ۲)"],
    correctIndex: 0,
    explanation: "در انتقال، مؤلفه‌های بردار انتقال به مختصات نقطه افزوده می‌شوند: (−۲+۴، ۳−۱) = (۲، ۲).",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس اول، مبحث انتقال؛ صفحات ۳۳ تا ۴۶."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson1-02",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس اول: تبدیل‌های هندسی — دوران",
    difficulty: "متوسط",
    prompt: "نقطهٔ P(۳، −۲) را ۹۰ درجه پادساعت‌گرد حول مبدأ مختصات دوران می‌دهیم. تصویر آن کدام است؟",
    options: ["(۲، ۳)", "(−۲، −۳)", "(−۳، ۲)", "(۳، ۲)"],
    correctIndex: 0,
    explanation: "دوران ۹۰ درجه پادساعت‌گرد حول مبدأ، هر نقطهٔ (x،y) را به (−y،x) می‌برد؛ بنابراین تصویر P برابر (۲،۳) است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس اول، مبحث دوران؛ صفحات ۳۳ تا ۴۶."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson1-03",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس اول: تبدیل‌های هندسی — تجانس",
    difficulty: "متوسط",
    prompt: "در تجانسی با مرکز O و نسبت −۳، نقطهٔ P(۲، −۱) به کدام نقطه تبدیل می‌شود؟",
    options: ["(۶، −۳)", "(−۶، ۳)", "(−۲، ۱)", "(۶، ۳)"],
    correctIndex: 1,
    explanation: "در تجانس با مرکز مبدأ، بردار مکان نقطه در نسبت تجانس ضرب می‌شود: −۳(۲،−۱) = (−۶،۳). علامت منفی تصویر را در سوی مقابل مرکز قرار می‌دهد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس اول، مبحث تجانس؛ صفحات ۳۳ تا ۴۶."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson1-04",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس اول: تبدیل‌های هندسی — پایستگی فاصله",
    difficulty: "آسان",
    prompt: "کدام ویژگی در هر یک از انتقال، دوران و بازتاب حفظ می‌شود؟",
    options: ["طول پاره‌خط‌ها و اندازهٔ زاویه‌ها", "مساحت فقط در تجانس", "مختصات همهٔ نقطه‌ها", "جهت‌گیری شکل در همهٔ تبدیل‌ها"],
    correctIndex: 0,
    explanation: "انتقال، دوران و بازتاب از تبدیل‌های هم‌نهشتی‌اند؛ بنابراین فاصله‌ها و اندازهٔ زاویه‌ها را حفظ می‌کنند. جهت‌گیری در بازتاب الزاماً حفظ نمی‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس اول، ویژگی‌های تبدیل‌های هندسی؛ صفحات ۳۳ تا ۴۶."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson1-05",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس اول: تبدیل‌های هندسی — ترکیب انتقال‌ها",
    difficulty: "متوسط",
    prompt: "ابتدا شکلی را با بردار (۳، −۲) و سپس با بردار (−۵، ۴) انتقال می‌دهیم. انتقال حاصل با کدام بردار معادل است؟",
    options: ["(۸، −۶)", "(−۲، ۲)", "(۲، −۲)", "(−۸، ۶)"],
    correctIndex: 1,
    explanation: "ترکیب دو انتقال، انتقالی با بردار مجموع آن‌هاست: (۳،−۲)+(−۵،۴)=(−۲،۲).",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس اول، ترکیب و اجرای تبدیل‌ها؛ صفحات ۳۳ تا ۴۶."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson2-01",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس دوم: کاربرد تبدیل‌ها — تقارن محوری",
    difficulty: "آسان",
    prompt: "تصویر نقطهٔ A(−۴، ۳) نسبت به محور y کدام است؟",
    options: ["(۴، ۳)", "(−۴، −۳)", "(۳، −۴)", "(۴، −۳)"],
    correctIndex: 0,
    explanation: "در بازتاب نسبت به محور y، مؤلفهٔ x قرینه و مؤلفهٔ y ثابت می‌ماند؛ پس تصویر (۴،۳) است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس دوم، کاربرد تقارن محوری؛ صفحات ۴۷ تا ۵۸."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson2-02",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس دوم: کاربرد تبدیل‌ها — تقارن مرکزی",
    difficulty: "متوسط",
    prompt: "تصویر نقطهٔ P(۵، −۲) در تقارن مرکزی با مرکز مبدأ مختصات کدام است؟",
    options: ["(−۵، ۲)", "(۵، ۲)", "(−۵، −۲)", "(۲، −۵)"],
    correctIndex: 0,
    explanation: "تقارن مرکزی با مرکز مبدأ معادل دوران ۱۸۰ درجه است؛ بنابراین هر دو مؤلفهٔ مختصات تغییر علامت می‌دهند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس دوم، تقارن مرکزی و دوران نیم‌دور؛ صفحات ۴۷ تا ۵۸."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson2-03",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس دوم: کاربرد تبدیل‌ها — تقارن دورانی مربع",
    difficulty: "آسان",
    prompt: "مربع حول مرکز خود با کوچک‌ترین زاویهٔ مثبت چند درجه بر خودش منطبق می‌شود؟",
    options: ["۴۵ درجه", "۶۰ درجه", "۹۰ درجه", "۱۸۰ درجه"],
    correctIndex: 2,
    explanation: "مربع چهار تقارن دورانی هم‌فاصله در یک دور کامل دارد؛ کوچک‌ترین زاویهٔ مثبت برابر ۳۶۰÷۴=۹۰ درجه است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس دوم، تقارن‌های دورانی چندضلعی‌ها؛ صفحات ۴۷ تا ۵۸."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson2-04",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس دوم: کاربرد تبدیل‌ها — تقارن دورانی شش‌ضلعی منتظم",
    difficulty: "متوسط",
    prompt: "کوچک‌ترین زاویهٔ مثبت دوران که یک شش‌ضلعی منتظم را بر خودش منطبق می‌کند، کدام است؟",
    options: ["۳۰ درجه", "۴۵ درجه", "۶۰ درجه", "۱۲۰ درجه"],
    correctIndex: 2,
    explanation: "شش‌ضلعی منتظم شش تقارن دورانی هم‌فاصله دارد؛ پس کوچک‌ترین زاویهٔ مثبت ۳۶۰÷۶=۶۰ درجه است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس دوم، تقارن دورانی چندضلعی منتظم؛ صفحات ۴۷ تا ۵۸."
  },
  {
    id: "authored-grade11-geometry-transformations-lesson2-05",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "تبدیل‌های هندسی و کاربردها",
    topic: "درس دوم: کاربرد تبدیل‌ها — تقارن‌های مستطیل",
    difficulty: "متوسط",
    prompt: "یک مستطیل غیرمربع، چند محور تقارن و چند تقارن دورانی (با احتساب دوران صفر درجه) دارد؟",
    options: ["۲ محور و ۲ تقارن دورانی", "۴ محور و ۴ تقارن دورانی", "۲ محور و ۴ تقارن دورانی", "۱ محور و ۲ تقارن دورانی"],
    correctIndex: 0,
    explanation: "مستطیل غیرمربع دو محور تقارن از وسط ضلع‌های روبه‌رو دارد. همچنین با دوران صفر و ۱۸۰ درجه بر خودش منطبق می‌شود؛ بنابراین دو تقارن دورانی دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt,
    reviewerNote: reviewerNote + " ارجاع محتوایی: فصل دوم، درس دوم، تقارن‌های محوری و دورانی مستطیل؛ صفحات ۴۷ تا ۵۸."
  }
];
