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
  },
  {
    id: "upload-maz-d10-humanities-sociology-social-phenomena-41", grade: "دهم", track: "انسانی", subject: "جامعه‌شناسی",
    chapter: "پدیده‌های اجتماعی", topic: "هنجار اجتماعی، کنش اجتماعی و کنش‌های درونی",
    difficulty: "متوسط",
    prompt: "به ترتیب درستی یا نادرستی هر یک از عبارت‌های زیر در کدام گزینه بیان شده است؟ الف) شیوه‌های معین احوال‌پرسی از دیگران، نمونه‌ای از هنجارهای اجتماعی است. ب) خردترین پدیدهٔ اجتماعی، کنش اجتماعی است. ج) کسانی که کنشگران با توجه به آن‌ها دست به کنش می‌زنند، کم‌وبیش یکسان‌اند. د) گویش، پدیده‌ای اجتماعی و غم و غصه، کنش درونی و ذهنی است.",
    options: ["درست ـ درست ـ نادرست ـ درست", "نادرست ـ نادرست ـ درست ـ نادرست", "درست ـ نادرست ـ درست ـ نادرست", "نادرست ـ درست ـ نادرست ـ درست"],
    correctIndex: 0,
    explanation: "عبارت‌های الف، ب و د درست‌اند و فقط عبارت ج نادرست است؛ زیرا کسانی که کنشگران با توجه به آن‌ها کنش می‌کنند، لزوماً یکسان نیستند.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۴۱", verifiedAt,
    reviewerNote: "متن، ترتیب چهار گزینه و کلید «گزینهٔ ۱» با تصویر صفحهٔ ۵۸ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-sociology-actions-consequences-42", grade: "دهم", track: "انسانی", subject: "جامعه‌شناسی",
    chapter: "کنش‌های ما", topic: "پیامدهای ارادی و غیرارادی کنش",
    difficulty: "متوسط",
    prompt: "به ترتیب، در عبارت‌های زیر پیامدهای کنش کدام‌اند؟ «حسام بدون نرمش کافی شروع به انجام حرکت‌های سخت کشتی می‌کند. متأسفانه در همان ابتدای کار گردن او دچار آسیب می‌شود. مربی او که اتفاقاً از کنار او می‌گذشت، بهت‌زده او را توبیخ می‌کند. دوستان دیگرش نیز به او نگاه معناداری می‌کنند.»",
    options: [
      "پیامد ارادی وابسته به ارادهٔ کنشگر ـ پیامد ارادی وابسته به ارادهٔ افراد دیگر ـ پیامد غیرارادی",
      "پیامد غیرارادی ـ پیامد ارادی وابسته به ارادهٔ افراد دیگر ـ پیامد ارادی وابسته به ارادهٔ افراد دیگر",
      "پیامد غیرارادی ـ پیامد ارادی وابسته به ارادهٔ افراد دیگر ـ پیامد طبیعی",
      "پیامد غیرطبیعی ـ پیامد ارادی وابسته به ارادهٔ کنشگر ـ پیامد طبیعی"
    ],
    correctIndex: 1,
    explanation: "آسیب‌دیدن گردن پیامد طبیعی یا غیرارادی است؛ توبیخ مربی و نگاه معنادار دوستان، پیامدهای ارادی وابسته به ارادهٔ افراد دیگرند.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۴۲", verifiedAt,
    reviewerNote: "متن، ترتیب چهار گزینه و کلید «گزینهٔ ۲» با تصویر صفحهٔ ۵۹ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-sociology-actions-consequences-43", grade: "دهم", track: "انسانی", subject: "جامعه‌شناسی",
    chapter: "کنش‌های ما", topic: "تعریف پیامدهای ارادی کنش",
    difficulty: "متوسط",
    prompt: "کدام گزینه به توضیح دقیقی دربارهٔ علت نام‌گذاری پیامدهای ارادی کنش به این نام اشاره دارد؟",
    options: [
      "این نوع از پیامدهای کنش احتمالی هستند؛ یعنی ممکن است انجام شوند یا نشوند.",
      "به ارادهٔ افراد انسانی، یعنی خود کنشگر یا افراد دیگر، وابسته هستند.",
      "انسان‌ها تنها با توجه به این دسته از پیامدها، کنش‌های خود را انجام می‌دهند.",
      "این دسته از پیامدها، خود نوعی کنش محسوب می‌شوند."
    ],
    correctIndex: 1,
    explanation: "به این پیامدها ارادی گفته می‌شود، زیرا به ارادهٔ انسان‌ها، یعنی خود کنشگر یا افراد دیگر، وابسته‌اند.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۴۳", verifiedAt,
    reviewerNote: "استخراج متنی گزینه‌ها خالی بود؛ هر چهار گزینه و کلید «گزینهٔ ۲» به‌صورت مستقیم از تصویر صفحهٔ ۵۹ خوانده و تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-sociology-social-phenomena-44", grade: "دهم", track: "انسانی", subject: "جامعه‌شناسی",
    chapter: "پدیده‌های اجتماعی", topic: "پیامدهای کنش، دیگران و معناداری پدیده‌های اجتماعی",
    difficulty: "متوسط",
    prompt: "به ترتیب پاسخ هر یک از سؤال‌های زیر در کدام گزینه آمده است؟ الف) عموماً افراد کنش‌های خود را با توجه به چه چیزی انجام می‌دهند؟ ب) بیشتر اندیشیدن در مفهوم «دیگران» چه نتیجه‌ای در پی دارد؟ ج) چرا پدیده‌های اجتماعی معنادار هستند؟",
    options: [
      "پیامدهای نامطلوب کنش ـ تشخیص کنش اجتماعی از غیر اجتماعی ـ زیرا افراد انسانی با آگاهی، اراده و هدف عمل می‌کنند",
      "پیامدهای ارادی و غیرارادی ـ تشخیص کنش اجتماعی از غیر اجتماعی ـ زیرا پدیده‌های اجتماعی را انسان‌ها در ارتباط با یکدیگر به وجود می‌آورند",
      "پیامدهای نامطلوب کنش ـ شناخت عمیق‌تر کنش اجتماعی ـ زیرا پدیده‌های اجتماعی را انسان‌ها در ارتباط با یکدیگر به وجود می‌آورند",
      "پیامدهای ارادی و غیرارادی ـ شناخت عمیق‌تر کنش اجتماعی ـ زیرا افراد انسانی با آگاهی، اراده و هدف عمل می‌کنند"
    ],
    correctIndex: 3,
    explanation: "پاسخ‌ها به‌ترتیب پیامدهای ارادی و غیرارادی، شناخت عمیق‌تر کنش اجتماعی و آگاهی، اراده و هدف‌مندی انسان‌ها هستند.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۴۴", verifiedAt,
    reviewerNote: "متن، ترتیب چهار گزینه و کلید «گزینهٔ ۴» با تصویر صفحهٔ ۶۰ فایل PDF تطبیق داده شد."
  },
  {
    id: "upload-maz-d10-humanities-sociology-social-world-45", grade: "دهم", track: "انسانی", subject: "جامعه‌شناسی",
    chapter: "جهان اجتماعی", topic: "مقایسهٔ پدیده‌های ناشناخته با پدیده‌های آشنا",
    difficulty: "متوسط",
    prompt: "به ترتیب، در ارتباط با مقایسهٔ پدیده‌های ناشناخته با پدیده‌های آشنا، پاسخ صحیح کدام گزینه است؟ الف) این مقایسه‌ها با چه هدفی انجام می‌شود؟ ب) در این مقایسه‌ها چه چیزهایی آشکار می‌شود؟ ج) در شعر «بنی‌آدم اعضای یک پیکرند» سعدی، مقایسهٔ چه چیزهایی است؟",
    options: [
      "بهتر شناختن جهان اجتماعی ـ نقاط ضعف و قوت پدیده‌ها ـ پدیده‌های اجتماعی با جهان اجتماعی",
      "بهتر شناختن جهان اجتماعی ـ شباهت‌ها و تفاوت‌های پدیده‌ها ـ جهان اجتماعی با موجودات زنده",
      "شناخت پدیده‌های ناشناخته ـ نقاط ضعف و قوت پدیده‌ها ـ پدیده‌های اجتماعی با جهان اجتماعی",
      "شناخت پدیده‌های ناشناخته ـ شباهت‌ها و تفاوت‌های پدیده‌ها ـ جهان اجتماعی با موجودات زنده"
    ],
    correctIndex: 3,
    explanation: "مقایسهٔ پدیده‌های ناشناخته با پدیده‌های آشنا برای شناخت پدیده‌های ناشناخته انجام می‌شود؛ شباهت‌ها و تفاوت‌ها را آشکار می‌کند و در بیت سعدی، جهان اجتماعی به موجود زنده تشبیه شده است.",
    sourceStatus: "reviewed", sourceTitle: maazTitle, sourceQuestionNumber: "۴۵", verifiedAt,
    reviewerNote: "متن، ترتیب چهار گزینه و کلید «گزینهٔ ۴» با تصویر صفحهٔ ۶۰ فایل PDF تطبیق داده شد."
  },

];
