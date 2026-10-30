import type { ExamQuestion } from "./examBank";

// Rewritten practice questions mapped to specific questions in the published 1405
// experimental-sciences entrance exam. They are not verbatim reproductions.
// Source question numbers refer to the official exam paper; each item below has
// been independently reworded and its answer/explanation checked against the
// relevant curriculum concept and published key.
const verifiedAt = new Date("2026-10-30T00:00:00.000Z");
const officialSanjeshExamUrl = "https://www.sanjesh.org/fa-IR/sanjesh/4936/news/view/14591/13759/Staging";
const sourceTitle = "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه زیست‌شناسی";

export const verifiedBiologyBatch2: ExamQuestion[] = [
  {
    id: "verified-bio1-stomata-1405-003",
    grade: "دهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "از یاخته تا گیاه",
    topic: "کنترل باز و بسته‌شدن روزنه", difficulty: "آسان",
    prompt: "تغییر کدام ویژگی یاخته‌های نگهبان، مستقیماً باز و بسته‌شدن روزنهٔ برگ را کنترل می‌کند؟",
    options: ["تغییر فشار تورژسانس آن‌ها", "تغییر تعداد کروموزوم‌ها", "ساخت دیوارهٔ ثانویه در همهٔ آن‌ها", "تبدیل‌شدن آن‌ها به آوند چوبی"],
    correctIndex: 0,
    explanation: "ورود و خروج آب از یاخته‌های نگهبان فشار تورژسانس آن‌ها را تغییر می‌دهد و در نتیجه روزنه باز یا بسته می‌شود.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۳", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث ساختار برگ خرزهره در سؤال مرجع؛ متن و گزینه‌ها عین دفترچه نیستند."
  },
  {
    id: "verified-bio1-nitrogen-1405-039",
    grade: "دهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "جذب و انتقال مواد در گیاهان",
    topic: "چرخهٔ نیتروژن و تثبیت نیتروژن", difficulty: "متوسط",
    prompt: "کدام گزاره دربارهٔ ورود نیتروژن جو به چرخهٔ مواد زیستی درست‌تر است؟",
    options: ["همهٔ گیاهان مستقیماً نیتروژن جو را جذب می‌کنند.", "برخی پروکاریوت‌ها می‌توانند نیتروژن جو را تثبیت کنند.", "جانوران نیتروژن جو را مستقیماً به آمینواسید تبدیل می‌کنند.", "تثبیت نیتروژن فقط در سلول‌های جانوری رخ می‌دهد."],
    correctIndex: 1,
    explanation: "برخی پروکاریوت‌ها نیتروژن مولکولی جو را به ترکیبات قابل‌استفاده در چرخهٔ زیستی تبدیل می‌کنند؛ گیاهان معمولاً نیتروژن را به شکل ترکیبات معدنی جذب می‌کنند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۳۹", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث جذب نیتروژن از خاک در سؤال مرجع؛ متن و گزینه‌ها بازنویسی شده‌اند."
  },
  {
    id: "verified-bio2-embryo-1405-014",
    grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "تولیدمثل",
    topic: "تقسیم‌های آغازین رویان", difficulty: "متوسط",
    prompt: "در تقسیم‌های آغازین یاختهٔ تخم انسان، کدام توصیف دربارهٔ تودهٔ یاخته‌ای حاصل درست است؟",
    options: ["با هر تقسیم، حجم کل رویان الزاماً دو برابر می‌شود.", "تقسیم‌ها بدون افزایش متناسب اندازهٔ کلی رویان انجام می‌شوند.", "پیش از نخستین تقسیم، همهٔ یاخته‌های بدن بالغ تشکیل می‌شوند.", "در این مرحله، همهٔ یاخته‌ها از نظر بیان ژن کاملاً متمایزند."],
    correctIndex: 1,
    explanation: "در مراحل آغازین رشد، تقسیم‌های پیاپی یاختهٔ تخم تعداد یاخته‌ها را افزایش می‌دهند، اما اندازهٔ کلی رویان به همان نسبت افزایش نمی‌یابد.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۱۴", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال مرجع دربارهٔ وقایع پس از لقاح؛ عبارت‌بندی جدید است."
  },
  {
    id: "verified-bio2-thyroid-feedback-1405-019",
    grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "تنظیم شیمیایی",
    topic: "بازخورد منفی هورمون‌های تیروئیدی", difficulty: "متوسط",
    prompt: "اگر غلظت هورمون‌های تیروئیدی در خون برای مدتی طولانی افزایش یابد، در حالت معمول ترشح هورمون محرک تیروئید چه تغییری می‌کند؟",
    options: ["افزایش می‌یابد تا غده بزرگ‌تر شود.", "کاهش می‌یابد، چون بازخورد منفی برقرار می‌شود.", "بدون هیچ سازوکاری همیشه ثابت می‌ماند.", "به‌طور کامل به ترشح انسولین تبدیل می‌شود."],
    correctIndex: 1,
    explanation: "افزایش هورمون‌های تیروئیدی از راه بازخورد منفی، ترشح هورمون محرک تیروئید از هیپوفیز را مهار می‌کند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۱۹", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث تنظیم شیمیایی در سؤال مرجع؛ متن و گزینه‌ها بازنویسی شده‌اند."
  },
  {
    id: "verified-bio2-sarcomere-1405-038",
    grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "دستگاه حرکتی",
    topic: "لغزش رشته‌ها در انقباض ماهیچه", difficulty: "متوسط",
    prompt: "هنگام انقباض سارکومر در ماهیچهٔ اسکلتی، کدام تغییر معمولاً رخ می‌دهد؟",
    options: ["طول نوار A افزایش می‌یابد.", "طول نوار I کاهش می‌یابد.", "طول رشته‌های اکتین و میوزین کم می‌شود.", "تعداد سارکومرها درون هر تارچه ناگهان نصف می‌شود."],
    correctIndex: 1,
    explanation: "در مدل لغزش رشته‌ها، رشته‌های اکتین و میوزین روی هم می‌لغزند و خودشان کوتاه نمی‌شوند؛ نوار I و ناحیهٔ H کوچک‌تر می‌شوند، در حالی که طول نوار A ثابت می‌ماند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۳۸", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال مرجع دربارهٔ ماهیچه؛ متن و گزینه‌ها عین دفترچه نیستند."
  },
  {
    id: "verified-bio2-sperm-pathway-1405-036",
    grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "تولیدمثل",
    topic: "مسیر و بلوغ اسپرم", difficulty: "آسان",
    prompt: "اسپرم‌ها پس از ساخته‌شدن در لوله‌های اسپرم‌ساز، پیش از ورود به مجرای وابران، در کدام ساختار ذخیره و بالغ‌تر می‌شوند؟",
    options: ["کیسهٔ منی", "اپیدیدیم", "غدهٔ پروستات", "مثانه"],
    correctIndex: 1,
    explanation: "اسپرم‌ها پس از ساخته‌شدن در لوله‌های اسپرم‌ساز، به اپیدیدیم منتقل می‌شوند و در آن‌جا مراحل بلوغ و ذخیره را می‌گذرانند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۳۶", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث دستگاه تولیدمثل مرد در سؤال مرجع؛ صورت سؤال بازنویسی شده است."
  },
  {
    id: "verified-bio3-xlinked-1405-011",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "انتقال اطلاعات در نسل‌ها",
    topic: "وراثت وابسته به X", difficulty: "متوسط",
    prompt: "اگر زنی ناقل یک صفت نهفتهٔ وابسته به X باشد و مردی برای آن صفت سالم باشد، با فرض احتمال یکسان تولد دو جنس، احتمال مبتلا بودن یک پسر به آن صفت چقدر است؟",
    options: ["صفر", "۲۵ درصد", "۵۰ درصد", "۱۰۰ درصد"],
    correctIndex: 2,
    explanation: "پسر کروموزوم X خود را از مادر می‌گیرد. مادر ناقل در نیمی از تخمک‌هایش آلل نهفته را دارد؛ بنابراین احتمال ابتلای یک پسر ۵۰ درصد است.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۱۱", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث صفات وابسته به X در سؤال مرجع؛ سناریو ساده‌سازی و بازنویسی شده است."
  },
  {
    id: "verified-bio3-transcription-1405-017",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "جریان اطلاعات در یاخته",
    topic: "رونویسی و ساخت RNA", difficulty: "آسان",
    prompt: "در فرایند رونویسی، کدام آنزیم با استفاده از یک رشتهٔ DNA، رشتهٔ RNA را می‌سازد؟",
    options: ["DNA پلی‌مراز", "RNA پلی‌مراز", "آمیلاز", "لیگاز"],
    correctIndex: 1,
    explanation: "RNA پلی‌مراز با خواندن رشتهٔ الگوی DNA، رشتهٔ RNA مکمل را در جهت مناسب می‌سازد.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۱۷", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث بیان اطلاعات ژنتیکی در سؤال مرجع؛ عبارت‌بندی جدید است."
  },
  {
    id: "verified-bio3-protein-folding-1405-025",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "مولکول‌های اطلاعاتی",
    topic: "ساختار دوم پروتئین", difficulty: "متوسط",
    prompt: "کدام برهم‌کنش نقش مهمی در پایدارشدن ساختارهای مارپیچی یا صفحه‌ای در ساختار دوم پروتئین دارد؟",
    options: ["پیوند هیدروژنی بین بخش‌های ستون فقرات زنجیرهٔ پلی‌پپتیدی", "پیوند فسفودی‌استر بین دو آمینواسید", "پیوند گلیکوزیدی بین دو گروه آمین", "جفت‌شدن بازهای نیتروژنی در همهٔ آمینواسیدها"],
    correctIndex: 0,
    explanation: "پیوندهای هیدروژنی میان گروه‌های کربونیل و آمیدی ستون فقرات پلی‌پپتید به پایداری ساختارهای دوم مانند مارپیچ آلفا و صفحهٔ بتا کمک می‌کنند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۲۵", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث ساختار دوم پروتئین در سؤال مرجع؛ متن و گزینه‌ها بازنویسی شده‌اند."
  },
  {
    id: "verified-bio3-uncoupling-1405-029",
    grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی", chapter: "از ماده به انرژی",
    topic: "شیب پروتونی و تولید ATP", difficulty: "سخت",
    prompt: "ماده‌ای غشای داخلی میتوکندری را برای عبور پروتون‌ها نفوذپذیر می‌کند و شیب پروتونی را از بین می‌برد. کدام فرایند مستقیماً بیش از همه آسیب می‌بیند؟",
    options: ["ساخت ATP به کمک ATP سنتاز", "ورود گلوکز به سیتوپلاسم", "رونویسی DNA هسته‌ای", "ساخت ریبوزوم در هستک"],
    correctIndex: 0,
    explanation: "ATP سنتاز از انرژی شیب الکتروشیمیایی پروتون‌ها برای ساخت ATP استفاده می‌کند؛ از بین رفتن این شیب، تولید ATP از راه فسفریلاسیون اکسیداتیو را مختل می‌کند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵",
    sourceQuestionNumber: "۲۹", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث تنفس یاخته‌ای در سؤال مرجع؛ پرسش و گزینه‌ها بازطراحی شده‌اند."
  }
];
