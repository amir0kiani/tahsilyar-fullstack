import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-09T00:00:00.000Z");
const sourceTitle = "تمرین تألیفی تحصیل‌یار بر پایهٔ کتاب درسی یازدهم (بازبینی علمی مستقل)";
const sourceUrl = "https://chap.sch.ir/";
const reviewerNote = "سؤال تألیفی است و عین سؤال آزمون قلم‌چی یا ماز نیست؛ پاسخ و توضیح به‌صورت مستقل بازبینی شده است.";

export const verifiedGrade11ExperimentalGapBatch1: ExamQuestion[] = [
  {
    id: "authored-experimental11-biology-neural-control-synapse-01",
    grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تنظیم عصبی", topic: "انتقال پیام در محل اتصال یاخته‌های عصبی",
    difficulty: "متوسط",
    prompt: "در یک سیناپس شیمیایی، کدام رویداد به‌طور مستقیم موجب آزاد شدن ناقل عصبی از پایانهٔ آکسونی می‌شود؟",
    options: [
      "ورود یون کلسیم به پایانهٔ پیش‌سیناپسی",
      "خروج یون سدیم از یاختهٔ پس‌سیناپسی",
      "تجزیهٔ ناقل عصبی در شکاف سیناپسی",
      "باز شدن کانال‌های پتاسیمی در جسم یاخته"
    ],
    correctIndex: 0,
    explanation: "رسیدن پیام عصبی به پایانهٔ آکسونی، کانال‌های کلسیمی وابسته به ولتاژ را باز می‌کند. ورود کلسیم، هم‌جوشی وزیکول‌ها با غشای پیش‌سیناپسی و رهاسازی ناقل عصبی را تحریک می‌کند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt, reviewerNote
  },
  {
    id: "authored-experimental11-biology-neural-control-reflex-02",
    grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تنظیم عصبی", topic: "قوس انعکاسی",
    difficulty: "آسان",
    prompt: "در یک انعکاس نخاعی ساده، ترتیب درست عبور پیام عصبی کدام است؟",
    options: [
      "گیرندهٔ حسی ← نورون حرکتی ← نخاع ← نورون حسی ← اندام پاسخ‌دهنده",
      "گیرندهٔ حسی ← نورون حسی ← مرکز عصبی ← نورون حرکتی ← اندام پاسخ‌دهنده",
      "اندام پاسخ‌دهنده ← نورون حسی ← مغز ← نورون حرکتی ← گیرنده",
      "گیرندهٔ حسی ← نورون رابط ← نورون حسی ← اندام پاسخ‌دهنده"
    ],
    correctIndex: 1,
    explanation: "در مسیر انعکاسی، گیرنده محرک را دریافت می‌کند؛ پیام از راه نورون حسی به مرکز عصبی می‌رسد و سپس از راه نورون حرکتی به اندام پاسخ‌دهنده منتقل می‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt, reviewerNote
  },
  {
    id: "authored-experimental11-physics-dc-series-parallel-03",
    grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "جریان الکتریکی و مدارهای جریان مستقیم", topic: "ترکیب مقاومت‌ها",
    difficulty: "متوسط",
    prompt: "دو مقاومت ۶ و ۳ اهمی به‌صورت موازی به یکدیگر وصل شده‌اند. مقاومت معادل این ترکیب چند اهم است؟",
    options: ["۲", "۳", "۶", "۹"],
    correctIndex: 0,
    explanation: "برای اتصال موازی، معکوس مقاومت معادل برابر مجموع معکوس مقاومت‌هاست: ۱/R=۱/۶+۱/۳=۳/۶؛ بنابراین R=۲ اهم.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt, reviewerNote
  },
  {
    id: "authored-experimental11-chemistry-polymer-04",
    grade: "یازدهم", track: "تجربی", subject: "شیمی",
    chapter: "پوشاک، نیازی پایان‌ناپذیر", topic: "پلیمرهای مصنوعی و واحد تکرارشونده",
    difficulty: "متوسط",
    prompt: "کدام عبارت دربارهٔ تشکیل یک پلیمر افزایشی از مونومرهای دارای پیوند دوگانه درست است؟",
    options: [
      "در هر مرحله الزاماً یک مولکول آب جدا می‌شود.",
      "پیوند دوگانهٔ مونومر باز می‌شود و واحدها به زنجیر متصل می‌شوند.",
      "پلیمر فقط از واکنش دو نوع مونومر متفاوت تشکیل می‌شود.",
      "جرم مولی پلیمر همیشه از مجموع جرم مونومرها کمتر است."
    ],
    correctIndex: 1,
    explanation: "در پلیمری‌شدن افزایشی، پیوند دوگانهٔ کربن-کربن باز می‌شود و مونومرها بدون جدا شدن مولکول کوچکی مانند آب به زنجیر پلیمری می‌پیوندند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt, reviewerNote
  },
  {
    id: "authored-experimental11-math-logarithm-domain-05",
    grade: "یازدهم", track: "تجربی", subject: "ریاضی",
    chapter: "توابع نمایی و لگاریتمی", topic: "دامنهٔ تابع لگاریتمی",
    difficulty: "آسان",
    prompt: "دامنهٔ تابع f(x)=log₂(x−۳) کدام است؟",
    options: ["x≥۳", "x>۳", "x<۳", "تمام اعداد حقیقی"],
    correctIndex: 1,
    explanation: "عبارت داخل لگاریتم باید مثبت باشد؛ بنابراین x−۳>۰ و در نتیجه x>۳.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵", verifiedAt, reviewerNote
  }
];
