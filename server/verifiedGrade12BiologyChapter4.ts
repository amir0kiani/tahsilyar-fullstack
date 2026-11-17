import type { ExamQuestion } from "./examBank";

// Original textbook-grounded practice questions for Grade 12 Biology, Chapter 4.
// These are not presented as verbatim or adapted official-exam questions.
// Content and answer keys were checked against the official Biology 3 textbook,
// Chapter 4, pp. 48–60 (mutation, allele-frequency change, and speciation).
const verifiedAt = new Date("2026-11-16T00:00:00.000Z");
const sourceTitle = "زیست‌شناسی (۳)، پایه دوازدهم، فصل چهارم: تغییر در اطلاعات وراثتی";
const sourceUrl = "https://iranestekhdam.ir/storage/medias/2025-09-15/1757923687_%D8%B2%DB%8C%D8%B3%D8%AA-3.pdf";

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
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۴۸؛ سؤال تألیفی و مبتنی بر کتاب درسی است، نه سؤال رسمی کنکور."
  },
  {
    id: "verified-bio3-ch4-silent-mutation-textbook-002",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "جهش خاموش", difficulty: "متوسط",
    prompt: "در اثر یک جهش جانشینی، رمز یک آمینواسید به رمزی دیگر تبدیل می‌شود، اما آمینواسید متناظر با رمز جدید همان آمینواسید قبلی است. پیامد مستقیم این جهش چیست؟",
    options: ["تغییر چارچوب خواندن", "کوتاه‌شدن قطعی زنجیرهٔ پلی‌پپتیدی", "ثابت‌ماندن توالی آمینواسیدها", "حذف یک نوکلئوتید از دنا"],
    correctIndex: 2,
    explanation: "در جهش خاموش، با وجود تغییر در رمز، آمینواسید حاصل تغییر نمی‌کند؛ بنابراین توالی آمینواسیدهای زنجیرهٔ پلی‌پپتیدی ثابت می‌ماند.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۴۹؛ تمایز جهش خاموش از جهش دگرمعنا."
  },
  {
    id: "verified-bio3-ch4-frameshift-textbook-003",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تغییر در اطلاعات وراثتی",
    topic: "تغییر چارچوب خواندن", difficulty: "متوسط",
    prompt: "در یک توالی رمزکننده، دو نوکلئوتید درون ناحیهٔ خوانده‌شونده حذف می‌شود. با فرض آنکه حذف درون چارچوب ترجمه رخ داده باشد، کدام پیامد محتمل‌تر است؟",
    options: ["چارچوب خواندن تغییر نمی‌کند، چون حذف کمتر از سه نوکلئوتید است.", "چارچوب خواندن از محل حذف به بعد تغییر می‌کند.", "فقط یک آمینواسید حذف می‌شود و همهٔ رمزهای بعدی ثابت می‌مانند.", "حتماً هیچ تغییری در پروتئین رخ نمی‌دهد."],
    correctIndex: 1,
    explanation: "حذف یا اضافهٔ تعداد نوکلئوتیدهایی که مضرب سه نیست، می‌تواند چارچوب خواندن را تغییر دهد؛ در این مثال حذف دو نوکلئوتید، گروه‌بندی سه‌تایی رمزها را از محل حذف به بعد جابه‌جا می‌کند.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۴۹؛ کتاب تصریح می‌کند که حذف/اضافهٔ غیرمضرب سه می‌تواند چارچوب خواندن را تغییر دهد."
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
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
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
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی؛ راستی‌آزمایی با متن فصل ۴، صفحهٔ ۶۰؛ تعریف گونه‌زایی دگرمیهنی و نقش قطع شارش ژن."
  }
];
