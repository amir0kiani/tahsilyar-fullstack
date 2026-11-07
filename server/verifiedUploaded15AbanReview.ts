import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-07T00:00:00.000Z");
const maazTitle = "آزمون ماز ۱۵ آبان ۱۴۰۵ – دهم انسانی (فایل ارسالی کاربر)";
const kanoonTitle = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – دوازدهم تجربی (فایل ارسالی کاربر)";

const reviewed = (input: Omit<ExamQuestion, "sourceStatus" | "sourceTitle" | "verifiedAt" | "reviewerNote"> & {
  sourceTitle: string;
  sourceQuestionNumber: string;
  reviewerNote: string;
}): ExamQuestion => ({ ...input, sourceStatus: "reviewed", verifiedAt });

export const verifiedUploaded15AbanReview: ExamQuestion[] = [
  {
    id: "upload-maz-d10-humanities-math-quadratic-05", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "ریشه‌های معادلهٔ درجه دوم و جایگذاری پارامتر", difficulty: "متوسط",
    prompt: "اگر یکی از جواب‌های معادلهٔ x²/5 = kx برابر x = 5 باشد، جواب‌های معادلهٔ x² − 6x − k + 9 = 0 کدام‌اند؟",
    options: ["−۳ و −۱", "۱ و ۳", "۲ و ۴", "−۲ و −۴"], correctIndex: 2,
    explanation: "با جای‌گذاری x=۵ در معادلهٔ نخست، k=۱ به دست می‌آید. معادلهٔ دوم به x²−۶x+۸=۰ تبدیل می‌شود و تجزیهٔ آن (x−۲)(x−۴)=۰ است؛ پس ریشه‌ها ۲ و ۴ هستند.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۵", verifiedAt,
    reviewerNote: "متن، ترتیب گزینه‌ها و پاسخ «گزینهٔ ۳» با تصویر صفحهٔ ۳۸ فایل PDF تطبیق داده شد؛ صورت سؤال و گزینه‌ها بدون وابستگی به شکل هستند."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-07", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "ساخت معادله از روی ریشه‌ها", difficulty: "سخت",
    prompt: "کدام معادله دارای جواب‌های x = ۱/۲ و x = −۱/۳ است؟",
    options: ["۶x² − x − ۱ = ۰", "۶x² + x + ۱ = ۰", "۶x² − ۲x + ۳ = ۰", "۶x² + ۴x − ۳ = ۰"], correctIndex: 0,
    explanation: "معادله‌ای با ریشه‌های ۱/۲ و ۱/۳− متناسب با (x−۱/۲)(x+۱/۳)=۰ است. با حذف مخرج‌ها به ۶x²−x−۱=۰ می‌رسیم.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۷", verifiedAt,
    reviewerNote: "متن، چهار گزینه و پاسخ «گزینهٔ ۱» با تصویر صفحهٔ ۳۹ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-08", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "اختلاف ریشه‌های معادلهٔ درجه دوم", difficulty: "متوسط",
    prompt: "اختلاف جواب‌های معادلهٔ (۲x + ۳)² = ۴/۲۵ کدام است؟",
    options: ["۳/۵", "۲/۵", "۱", "۲"], correctIndex: 1,
    explanation: "از رابطهٔ داده‌شده، ۲x+۳ برابر ۲/۵ یا ۲/۵− می‌شود؛ بنابراین دو ریشه به‌ترتیب ۱۳/۱۰− و ۱۷/۱۰− هستند و اختلاف آن‌ها ۲/۵ است.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۸", verifiedAt,
    reviewerNote: "متن، ترتیب گزینه‌ها و پاسخ «گزینهٔ ۲» با تصویر صفحهٔ ۳۹ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-09", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "تکمیل مربع و مقایسهٔ ضرایب", difficulty: "سخت",
    prompt: "در حل معادلهٔ درجهٔ دوم x² + bx + ۳ = ۰ به روش مربع کامل، به تساوی (x − ۳)² = k می‌رسیم. مقدار b + k کدام است؟",
    options: ["۶", "۹", "صفر", "۱۲"], correctIndex: 2,
    explanation: "با بسط (x−۳)²=k داریم x²−۶x+۹−k=۰. مقایسه با x²+bx+۳=۰ نشان می‌دهد b=−۶ و k=۶؛ بنابراین b+k=۰.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۹", verifiedAt,
    reviewerNote: "متن، چهار گزینه و پاسخ «گزینهٔ ۳» با تصویر صفحهٔ ۴۰ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-10", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "ریشهٔ مضاعف", difficulty: "متوسط",
    prompt: "معادلهٔ (۲x + m)² = ۲m − ۱ دارای ریشهٔ مضاعف است. مقدار این ریشهٔ مضاعف کدام است؟",
    options: ["۱/۲", "−۱/۲", "۱/۴", "−۱/۴"], correctIndex: 3,
    explanation: "برای ریشهٔ مضاعف باید ۲m−۱=۰ باشد؛ پس m=۱/۲. در نتیجه ۲x+۱/۲=۰ و ریشهٔ مضاعف x=−۱/۴ است.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۱۰", verifiedAt,
    reviewerNote: "متن، ترتیب گزینه‌ها و پاسخ «گزینهٔ ۴» با تصویر صفحهٔ ۴۱ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-11", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "بزرگ‌ترین ریشهٔ معادلهٔ درجه دوم", difficulty: "متوسط",
    prompt: "ریشهٔ بزرگ‌تر معادلهٔ −۵x² + ۲x + ۳ = ۰ کدام است؟",
    options: ["−۱", "−۳/۵", "۳/۵", "۱"], correctIndex: 3,
    explanation: "با تغییر علامت معادله، ۵x²−۲x−۳=۰ به دست می‌آید که به (۵x+۳)(x−۱)=۰ تجزیه می‌شود. ریشه‌ها ۱ و ۳/۵− هستند؛ بنابراین ریشهٔ بزرگ‌تر ۱ است.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۱۱", verifiedAt,
    reviewerNote: "متن، چهار گزینه و پاسخ «گزینهٔ ۴» با تصویر صفحهٔ ۴۲ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-12", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "شرط نداشتن ریشهٔ حقیقی", difficulty: "متوسط",
    prompt: "اگر معادلهٔ ۳x² + ۲x − ۲k = ۰ فاقد ریشهٔ حقیقی باشد، محدودهٔ k کدام است؟",
    options: ["k > ۰", "k < ۰", "k < −۱/۶", "k > −۱/۶"], correctIndex: 2,
    explanation: "برای نداشتن ریشهٔ حقیقی باید Δ<۰ باشد. بنابراین ۴+۲۴k<۰ و در نتیجه k<−۱/۶.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۱۲", verifiedAt,
    reviewerNote: "متن، چهار گزینه و پاسخ «گزینهٔ ۳» با تصویر صفحهٔ ۴۳ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-13", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "تکمیل مربع", difficulty: "آسان",
    prompt: "در حل معادلهٔ درجهٔ دوم ۲x² + ۴x − ۱ = ۰ به روش مربع کامل، کدام مقدار را باید به طرفین تساوی اضافه کنیم؟",
    options: ["۱", "۴", "۹", "۱۶"], correctIndex: 0,
    explanation: "با انتقال عدد ثابت و تقسیم طرفین بر ۲، x²+۲x=۱/۲ می‌شود. برای کامل کردن مربع باید مربع نصف ضریب x، یعنی (۲/۲)²=۱، به هر دو طرف اضافه شود.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۱۳", verifiedAt,
    reviewerNote: "متن، چهار گزینه و پاسخ «گزینهٔ ۱» با تصویر صفحهٔ ۴۳ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-14", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "ریشهٔ مضاعف و پارامتر", difficulty: "سخت",
    prompt: "اگر معادلهٔ ۲x² + (m − ۱)x + ۸ = ۰ دارای ریشهٔ مضاعف باشد، مجموع مقدار مثبت m و ریشهٔ مضاعف کدام است؟",
    options: ["۵", "۷", "۹", "۱۱"], correctIndex: 1,
    explanation: "شرط ریشهٔ مضاعف Δ=۰ است؛ پس (m−۱)²−۶۴=۰ و با توجه به مثبت بودن m، مقدار m=۹ می‌شود. ریشهٔ مضاعف برابر −b/(۲a)=−۲ است؛ بنابراین مجموع برابر ۷ است.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۱۴", verifiedAt,
    reviewerNote: "متن، چهار گزینه و پاسخ «گزینهٔ ۲» با تصویر صفحهٔ ۴۴ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-math-quadratic-15", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "تجزیه با عامل مشترک", difficulty: "آسان",
    prompt: "کدام معادلهٔ زیر را می‌توان به روش فاکتورگیری از عامل مشترک x حل کرد؟",
    options: ["x² + ۶x + ۸ = ۰", "۳x² + (۹/۴)x = ۰", "x² + ۳x = ۱", "x² − ۱۶ = ۰"], correctIndex: 1,
    explanation: "در گزینهٔ دوم، x عامل مشترک دو جمله است و معادله به صورت x(۳x+۹/۴)=۰ تجزیه می‌شود.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۱۵", verifiedAt,
    reviewerNote: "متن، ترتیب گزینه‌ها و پاسخ «گزینهٔ ۲» با تصویر صفحهٔ ۴۵ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-kanoon-d12e-physics-motion-61", grade: "دوازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "حرکت بر خط راست", topic: "حرکت با سرعت ثابت و تعیین زمان", difficulty: "متوسط",
    prompt: "دونده‌ای با سرعت ثابت در جهت محور x حرکت می‌کند. در لحظه‌های t₁=۰ s و t₂=۱۲ s به‌ترتیب از مکان‌های x₁=−۶ m و x₂=۴۸ m می‌گذرد. این دونده در لحظهٔ t′ در مکان x=۷۵ m قرار دارد. t′ چقدر است؟",
    options: ["۱۸ s", "۴ s", "۲۴ s", "۱۲ s"], correctIndex: 0,
    explanation: "سرعت ثابت دونده برابر (۴۸−(−۶))/۱۲=۴٫۵ متر بر ثانیه است. از رابطهٔ x=−۶+۴٫۵t و با قرار دادن x=۷۵، زمان t=۱۸ ثانیه به دست می‌آید.",
    sourceStatus: "reviewed", sourceTitle: kanoonTitle, sourceQuestionNumber: "۶۱", verifiedAt,
    reviewerNote: "متن، چهار گزینه و نشانگر پاسخ «گزینهٔ ۱» با تصویر صفحهٔ ۱۹۳ فایل PDF تطبیق داده شد؛ سؤال وابسته به نمودار یا شکل نیست."
  }
];
