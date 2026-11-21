import type { ExamQuestion } from "./examBank";

// Original textbook-grounded practice questions for Grade 12 Biology, Chapter 4.
// These are not presented as verbatim or adapted official-exam questions.
// Content and answer keys were checked against the official Biology 3 textbook,
// Chapter 4, pp. 48–60 (mutation, allele-frequency change, and speciation).
const verifiedAt = new Date("2026-11-21T00:00:00.000Z");
const sourceTitle = "زیست‌شناسی (۳)، پایه دوازدهم، کد 112216، فصل چهارم: تغییر در اطلاعات وراثتی، چاپ ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Zist-Tajrobi-12_Daneshchi.iR.pdf";

export const verifiedGrade12BiologyChapter4: ExamQuestion[] = [
  {
    id: "verified-bio3-ch4-substitution-textbook-001",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "جهش جانشینی", difficulty: "آسان",
    prompt: "در بخشی از یک ژن، یک نوکلئوتید با نوکلئوتید دیگری جایگزین شده است. این تغییر در کدام گروه از جهش‌های کوچک قرار می‌گیرد؟",
    options: ["جهش جانشینی", "جهش حذف", "جهش اضافه", "وارونگی فام‌تنی"],
    correctIndex: 0,
    explanation: "در جهش جانشینی، یک نوکلئوتید جایگزین نوکلئوتید دیگری می‌شود. حذف و اضافه به‌ترتیب از دست رفتن یا واردشدن نوکلئوتید و وارونگی، تغییر در آرایش بخشی از فام‌تن است.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۴۸؛ سؤال تألیفی و مبتنی بر کتاب درسی است، نه سؤال رسمی کنکور."
  },
  {
    id: "verified-bio3-ch4-inversion-textbook-002",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "واژگونی فام‌تنی", difficulty: "متوسط",
    prompt: "در یک ناهنجاری ساختاری فامتن، جهت قرارگیری بخشی از فامتن در محل خود معکوس می‌شود. این تغییر چه نام دارد؟",
    options: ["حذف", "مضاعف‌شدگی", "واژگونی", "جابه‌جایی"],
    correctIndex: 2,
    explanation: "در واژگونی، جهت قرارگیری بخشی از فامتن در همان فامتن معکوس می‌شود؛ این تغییر یکی از ناهنجاری‌های ساختاری فامتن است.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۵۸؛ تعریف ناهنجاری ساختاری واژگونی."
  },
  {
    id: "verified-bio3-ch4-regulatory-mutation-textbook-003",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "جهش در توالی تنظیمی", difficulty: "متوسط",
    prompt: "اگر جهشی در راه‌انداز یک ژن رخ دهد، کدام پیامد می‌تواند مستقیماً ایجاد شود؟",
    options: ["تغییر در میزان رونویسی و مقدار محصول ژن", "تغییر در تعداد فامتن‌های یاخته", "تبدیل همهٔ دگره‌های جمعیت به یک دگره", "توقف قطعی همهٔ فرایندهای یاخته"],
    correctIndex: 0,
    explanation: "راه‌انداز و افزاینده از توالی‌های تنظیمی‌اند؛ جهش در آن‌ها می‌تواند میزان رونویسی و در نتیجه مقدار محصول ژن را افزایش یا کاهش دهد.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحه‌های ۵۷ و ۵۸؛ اثر جهش در توالی‌های تنظیمی بر مقدار محصول ژن."
  },
  {
    id: "verified-bio3-ch4-drift-textbook-004",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "رانش دگره‌ای", difficulty: "متوسط",
    prompt: "پس از یک حادثهٔ طبیعی، جمعیت کوچکی از یک گونه باقی می‌ماند و فراوانی برخی دگره‌ها در نسل بعد تغییر می‌کند؛ این تغییر الزاماً با سازگاری بیشتر آن دگره‌ها ارتباطی ندارد. این وضعیت نمونهٔ کدام فرایند است؟",
    options: ["انتخاب طبیعی", "شارش ژن", "رانش دگره‌ای", "نوترکیبی"],
    correctIndex: 2,
    explanation: "رانش دگره‌ای تغییر تصادفی فراوانی دگره‌ها بر اثر رویدادهای اتفاقی است و برخلاف انتخاب طبیعی لزوماً به سازش بیشتر منجر نمی‌شود. اثر آن در جمعیت‌های کوچک بیشتر است.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحه‌های ۵۴ و ۵۵؛ مثال کاهش شدید اندازهٔ جمعیت و پیامد آن."
  },
  {
    id: "verified-bio3-ch4-allopatric-textbook-005",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "گونه‌زایی دگرمیهنی", difficulty: "متوسط",
    prompt: "ایجاد یک سد جغرافیایی، جمعیتی را به دو بخش جدا تقسیم می‌کند. اگر ارتباط ژنی میان دو بخش قطع شود و در گذر زمان جدایی تولیدمثلی نیز شکل بگیرد، این فرایند با کدام نوع گونه‌زایی سازگار است؟",
    options: ["گونه‌زایی هم‌میهنی", "گونه‌زایی دگرمیهنی", "رانش دگره‌ای بدون جدایی جمعیت", "آمیزش غیرتصادفی در یک جمعیت واحد"],
    correctIndex: 1,
    explanation: "در گونه‌زایی دگرمیهنی، جدایی جغرافیایی ارتباط و شارش ژن میان بخش‌های جمعیت را قطع می‌کند. تفاوت‌های ژنتیکی می‌توانند در گذر زمان افزایش یابند و به جدایی تولیدمثلی بینجامند.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۶۰؛ تعریف گونه‌زایی دگرمیهنی و نقش قطع شارش ژن."
  }
];
