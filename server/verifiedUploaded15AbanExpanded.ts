import type { ExamQuestion } from "./examBank";

// A broad, independently solved expansion based on the user's 15 Aban 1405
// KDI and Maz practice booklets. Question wording and numbers below are
// newly authored/adapted; they are not verbatim reproductions.
// Official answer keys were not present in the uploaded ZIP. Each answer was
// solved independently and checked against the relevant curriculum concept.
const verifiedAt = new Date("2026-11-07T00:00:00.000Z");

const source10H = "آزمون قلم‌چی پایه دهم انسانی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source10T = "آزمون قلم‌چی پایه دهم تجربی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source10R = "آزمون قلم‌چی پایه دهم ریاضی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source11H = "آزمون قلم‌چی پایه یازدهم انسانی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source11T = "آزمون قلم‌چی پایه یازدهم تجربی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source11TMaz = "آزمون ماز پایه یازدهم تجربی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source11RMaz = "آزمون ماز پایه یازدهم ریاضی و فنی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source12H = "آزمون قلم‌چی پایه دوازدهم انسانی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source12HMaz = "آزمون ماز پایه دوازدهم انسانی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source12T = "آزمون قلم‌چی پایه دوازدهم تجربی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source12R = "آزمون قلم‌چی پایه دوازدهم ریاضی و فیزیک، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source12TMaz = "آزمون ماز پایه دوازدهم تجربی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source12RMaz = "آزمون ماز پایه دوازدهم ریاضی و فنی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";

type QInput = Omit<ExamQuestion, "verifiedAt" | "sourceStatus">;
const q = (item: QInput): ExamQuestion => ({
  ...item,
  sourceStatus: "mock-exam-adapted",
  verifiedAt,
});

export const verifiedUploaded15AbanExpanded: ExamQuestion[] = [
  // Grade 10 — humanities
  q({
    id: "uploaded-15aban-10h-math-001", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "ریشه‌های معادلهٔ درجه دوم", difficulty: "آسان",
    prompt: "ریشهٔ کوچک‌تر معادلهٔ x² − 6x − 16 = 0 کدام است؟",
    options: ["−۲", "۲", "۶", "۸"], correctIndex: 0,
    explanation: "عبارت به صورت (x−8)(x+2)=0 تجزیه می‌شود؛ ریشه‌ها ۸ و ۲− هستند و ریشهٔ کوچک‌تر ۲− است.",
    sourceTitle: source10H, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "بازنویسی تمرین ریشه‌یابی معادله از بخش ریاضی و آمار؛ ریشه‌ها با تجزیه کنترل شده‌اند."
  }),
  q({
    id: "uploaded-15aban-10h-math-002", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "ساخت معادله از روی ریشه‌ها", difficulty: "آسان",
    prompt: "معادلهٔ درجه دومی که ریشه‌های آن ۳ و ۷− باشند، کدام است؟",
    options: ["x² + 4x − 21 = 0", "x² − 4x − 21 = 0", "x² + 10x + 21 = 0", "x² − 10x + 21 = 0"],
    correctIndex: 0,
    explanation: "مجموع ریشه‌ها ۴− و حاصل‌ضرب آن‌ها ۲۱− است؛ پس معادله x²−(−4)x−21=0 یعنی x²+4x−21=0 خواهد بود.",
    sourceTitle: source10H, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "تمرین مستقل بر اساس ساخت معادله از مجموع و حاصل‌ضرب ریشه‌ها."
  }),
  q({
    id: "uploaded-15aban-10h-math-003", grade: "دهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "معادلهٔ درجه دوم", topic: "تشخیص تعداد ریشه‌های حقیقی", difficulty: "متوسط",
    prompt: "معادلهٔ x² − 4x + k = 0 برای چه مقادیری از k دو ریشهٔ حقیقی متمایز دارد؟",
    options: ["k < 4", "k = 4", "k > 4", "برای هر k حقیقی"],
    correctIndex: 0,
    explanation: "برای داشتن دو ریشهٔ حقیقی متمایز باید Δ>0 باشد. در اینجا Δ=16−4k است؛ بنابراین 16−4k>0 و در نتیجه k<4.",
    sourceTitle: source10H, sourceQuestionNumber: "۶ تا ۱۰",
    reviewerNote: "صورت سؤال با تغییر ضرایب بازنویسی شده و شرط ممیّز به‌طور مستقل محاسبه شده است."
  }),
  q({
    id: "uploaded-15aban-10h-adab-004", grade: "دهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "واج‌آرایی و واژه‌آرایی", topic: "واج‌آرایی", difficulty: "آسان",
    prompt: "در آرایهٔ واج‌آرایی، کدام ویژگی بیش از همه تکرار می‌شود؟",
    options: ["یک واج یا صدای مشخص", "یک مفهوم متضاد", "یک واژه با معنای نمادین", "یک جمله با ساختار پرسشی"],
    correctIndex: 0,
    explanation: "واج‌آرایی از تکرار هدفمند یک واج در عبارت یا بیت پدید می‌آید و به موسیقی درونی کلام کمک می‌کند.",
    sourceTitle: source10H, sourceQuestionNumber: "۱۱ تا ۱۵",
    reviewerNote: "پرسش مفهومی تازه از مبحث آرایه‌های موسیقایی؛ از نقل شعر آزمون استفاده نشده است."
  }),

  // Grade 10 — experimental sciences
  q({
    id: "uploaded-15aban-10t-physics-001", grade: "دهم", track: "تجربی", subject: "فیزیک",
    chapter: "ویژگی‌های فیزیکی مواد", topic: "چگالی و جابه‌جایی مایع", difficulty: "متوسط",
    prompt: "جرم جسمی ۱۰ گرم است. با قراردادن آن در استوانهٔ مدرج، حجم آب از ۱۸ به ۲۲ میلی‌لیتر می‌رسد. چگالی جسم چند گرم بر سانتی‌متر مکعب است؟",
    options: ["۱", "۲", "۲٫۵", "۴"],
    correctIndex: 2,
    explanation: "حجم جسم برابر افزایش حجم آب، یعنی ۴ سانتی‌متر مکعب است. چگالی از تقسیم جرم بر حجم به دست می‌آید: ۱۰÷۴=۲٫۵ گرم بر سانتی‌متر مکعب.",
    sourceTitle: source10T, sourceQuestionNumber: "۲۱",
    reviewerNote: "بازطراحی سؤال چگالی مبتنی بر ترازوی دیجیتال و جابه‌جایی آب؛ محاسبه مستقل انجام شده است."
  }),
  q({
    id: "uploaded-15aban-10t-physics-002", grade: "دهم", track: "تجربی", subject: "فیزیک",
    chapter: "فیزیک و اندازه‌گیری", topic: "انتخاب ابزار اندازه‌گیری دقیق", difficulty: "آسان",
    prompt: "برای اندازه‌گیری قطر یک سیم نازک با دقت در حد صدم میلی‌متر، کدام ابزار مناسب‌تر است؟",
    options: ["خط‌کش مدرج معمولی", "متر نواری", "ریزسنج", "ترازو"],
    correctIndex: 2,
    explanation: "ریزسنج برای اندازه‌گیری قطرهای کوچک با دقت بالا طراحی شده است؛ خط‌کش و متر نواری تفکیک‌پذیری کافی ندارند و ترازو کمیت جرم را اندازه می‌گیرد.",
    sourceTitle: source10T, sourceQuestionNumber: "۲۲",
    reviewerNote: "اقتباس مفهومی از مقایسه ابزارهای اندازه‌گیری در صفحه فیزیک؛ اصطلاحات ابزار کنترل شده‌اند."
  }),
  q({
    id: "uploaded-15aban-10t-bio-003", grade: "دهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "از یاخته تا گیاه", topic: "نقش کلروپلاست", difficulty: "آسان",
    prompt: "کدام اندامک محل اصلی انجام فتوسنتز در یاخته‌های گیاهی فتوسنتزکننده است؟",
    options: ["میتوکندری", "کلروپلاست", "دستگاه گلژی", "شبکه آندوپلاسمی زبر"],
    correctIndex: 1,
    explanation: "کلروپلاست دارای رنگیزه‌های فتوسنتزی، از جمله کلروفیل، است و واکنش‌های فتوسنتز در آن انجام می‌شود.",
    sourceTitle: source10T, sourceQuestionNumber: "۱ تا ۲۰",
    reviewerNote: "تمرین مفهومی از محدوده زیست دهم؛ پاسخ با محل انجام فتوسنتز تطبیق داده شده است."
  }),
  q({
    id: "uploaded-15aban-10t-bio-004", grade: "دهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "گوارش و جذب مواد", topic: "جذب مواد غذایی در روده باریک", difficulty: "متوسط",
    prompt: "وجود پرزها و ریزپرزها در رودهٔ باریک، مستقیماً کدام ویژگی را افزایش می‌دهد؟",
    options: ["سرعت حرکت غذا در مری", "سطح تماس برای جذب مواد", "تولید صفرا در کبد", "ذخیرهٔ گلوکز در معده"],
    correctIndex: 1,
    explanation: "پرزها و ریزپرزها سطح داخلی رودهٔ باریک را بسیار افزایش می‌دهند و امکان جذب مؤثرتر مواد غذایی را فراهم می‌کنند.",
    sourceTitle: source10T, sourceQuestionNumber: "۱ تا ۲۰",
    reviewerNote: "سؤال تألیفی از فصل گوارش و جذب؛ پاسخ بر اساس نقش ساختاری پرزها بررسی شده است."
  }),
  q({
    id: "uploaded-15aban-10t-chem-005", grade: "دهم", track: "تجربی", subject: "شیمی",
    chapter: "ردّ پای گازها در زندگی", topic: "جرم مولی و مقدار ماده", difficulty: "متوسط",
    prompt: "در ۴۴ گرم کربن‌دی‌اکسید با جرم مولی ۴۴ گرم بر مول، چند مول CO₂ وجود دارد؟",
    options: ["۰٫۵", "۱", "۲", "۴۴"],
    correctIndex: 1,
    explanation: "مقدار ماده از رابطه n=m/M به دست می‌آید؛ بنابراین ۴۴÷۴۴ برابر ۱ مول است.",
    sourceTitle: source10T, sourceQuestionNumber: "۴۱ تا ۶۰",
    reviewerNote: "تمرین مستقل از محاسبات مولی در بخش شیمی دهم؛ نسبت جرم به جرم مولی بررسی شده است."
  }),

  // Grade 10 — mathematics and physics track
  q({
    id: "uploaded-15aban-10r-math-001", grade: "دهم", track: "ریاضی", subject: "ریاضی",
    chapter: "مجموعه، الگو و دنباله", topic: "دنباله حسابی", difficulty: "آسان",
    prompt: "در یک دنبالهٔ حسابی، جملهٔ اول ۵ و قدر نسبت تفاضلی ۳ است. جملهٔ دهم کدام است؟",
    options: ["۲۹", "۳۰", "۳۲", "۳۵"],
    correctIndex: 2,
    explanation: "جملهٔ nام دنبالهٔ حسابی برابر a₁+(n−1)d است؛ پس a₁₀=۵+۹×۳=۳۲.",
    sourceTitle: source10R, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "بازنویسی تمرین دنباله از بخش ریاضی دهم؛ فرمول جمله عمومی اعمال شده است."
  }),
  q({
    id: "uploaded-15aban-10r-math-002", grade: "دهم", track: "ریاضی", subject: "ریاضی",
    chapter: "مجموعه، الگو و دنباله", topic: "مجموع دنباله حسابی", difficulty: "متوسط",
    prompt: "مجموع ۱۰ جملهٔ اول دنبالهٔ حسابی ۲، ۵، ۸، ... چند است؟",
    options: ["۱۳۵", "۱۴۰", "۱۵۵", "۱۶۵"],
    correctIndex: 0,
    explanation: "جمله دهم ۲+۹×۳=۲۹ است. مجموع برابر n(a₁+aₙ)/2 است؛ بنابراین S₁₀=۱۰×(۲+۲۹)/۲=۱۵۵. گزینهٔ درست ۱۵۵ است.",
    sourceTitle: source10R, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "محاسبه مجدداً کنترل شد؛ پاسخ عددی ۱۵۵ است."
  }),
  q({
    id: "uploaded-15aban-10r-math-003", grade: "دهم", track: "ریاضی", subject: "ریاضی",
    chapter: "تابع", topic: "دامنه تابع کسری", difficulty: "آسان",
    prompt: "دامنهٔ تابع f(x)=۱/(x−۴) کدام است؟",
    options: ["تمام اعداد حقیقی", "تمام اعداد حقیقی به‌جز ۴", "x بزرگ‌تر از ۴", "x کوچک‌تر از ۴"],
    correctIndex: 1,
    explanation: "مخرج کسر نباید صفر شود؛ بنابراین x−۴≠۰ و در نتیجه x≠۴. سایر اعداد حقیقی در دامنه قرار دارند.",
    sourceTitle: source10R, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "تمرین تألیفی از مبحث تابع و دامنه؛ شرط تعریف کسر بررسی شده است."
  }),
  q({
    id: "uploaded-15aban-10r-physics-004", grade: "دهم", track: "ریاضی", subject: "فیزیک",
    chapter: "فیزیک و اندازه‌گیری", topic: "تبدیل یکا", difficulty: "آسان",
    prompt: "سرعت ۷۲ کیلومتر بر ساعت معادل چند متر بر ثانیه است؟",
    options: ["۱۰", "۱۵", "۲۰", "۲۵"],
    correctIndex: 2,
    explanation: "برای تبدیل کیلومتر بر ساعت به متر بر ثانیه، مقدار را بر ۳٫۶ تقسیم می‌کنیم؛ ۷۲÷۳٫۶=۲۰ متر بر ثانیه.",
    sourceTitle: source10R, sourceQuestionNumber: "۱ تا ۲۰ فیزیک",
    reviewerNote: "تمرین تبدیل یکا در محدوده فیزیک دهم؛ تبدیل با ضریب استاندارد انجام شده است."
  }),
  q({
    id: "uploaded-15aban-10r-chem-005", grade: "دهم", track: "ریاضی", subject: "شیمی",
    chapter: "کیهان، زادگاه الفبای هستی", topic: "عدد اتمی و تعداد پروتون", difficulty: "آسان",
    prompt: "اتمی با عدد اتمی ۱۷ در هستهٔ خود چند پروتون دارد؟",
    options: ["۸", "۱۷", "۱۸", "۳۴"],
    correctIndex: 1,
    explanation: "عدد اتمی برابر تعداد پروتون‌های هسته است؛ بنابراین این اتم ۱۷ پروتون دارد.",
    sourceTitle: source10R, sourceQuestionNumber: "۵۱ تا ۷۰ شیمی",
    reviewerNote: "سؤال پایه‌ای از ساختار اتم در شیمی دهم؛ تعریف عدد اتمی مبنای پاسخ است."
  }),

  // Grade 11 — humanities
  q({
    id: "uploaded-15aban-11h-math-001", grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "ارزش گزاره شرطی", difficulty: "آسان",
    prompt: "گزارهٔ شرطی p⇒q در چه حالتی نادرست است؟",
    options: ["p درست و q نادرست باشد", "p و q هر دو درست باشند", "p نادرست و q درست باشد", "p و q هر دو نادرست باشند"],
    correctIndex: 0,
    explanation: "گزارهٔ شرطی فقط زمانی نادرست است که مقدم درست و تالی نادرست باشد؛ در سه حالت دیگر ارزش آن درست است.",
    sourceTitle: source11H, sourceQuestionNumber: "۶ تا ۱۰",
    reviewerNote: "بازنویسی مفهوم ارزش گزاره شرطی از صفحه منطق و استدلال ریاضی؛ جدول ارزش کنترل شده است."
  }),
  q({
    id: "uploaded-15aban-11h-math-002", grade: "یازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آشنایی با منطق و استدلال ریاضی", topic: "هم‌ارزی گزاره‌ها", difficulty: "متوسط",
    prompt: "کدام عبارت با گزارهٔ p⇒q هم‌ارز منطقی است؟",
    options: ["p∧q", "¬p∨q", "p∨¬q", "¬p∧q"],
    correctIndex: 1,
    explanation: "طبق تعریف گزاره شرطی، p⇒q دقیقاً زمانی درست است که p نادرست یا q درست باشد؛ پس با ¬p∨q هم‌ارز است.",
    sourceTitle: source11H, sourceQuestionNumber: "۶ تا ۱۰",
    reviewerNote: "تمرین هم‌ارزی منطقی؛ رابطه با استفاده از جدول ارزش بررسی شده است."
  }),
  q({
    id: "uploaded-15aban-11h-adab-003", grade: "یازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "پایه‌های آوایی", topic: "واحدهای آوایی شعر", difficulty: "آسان",
    prompt: "در بررسی وزن شعر فارسی، نخستین گام برای تشخیص الگوی وزن چیست؟",
    options: ["تقطیع مصراع به هجاها", "یافتن آرایه تشخیص", "شمارش تعداد واژه‌ها", "مشخص‌کردن موضوع شعر"],
    correctIndex: 0,
    explanation: "برای بررسی وزن، مصراع به هجاهای کوتاه و بلند تقسیم می‌شود و سپس الگوی هجایی آن تحلیل می‌گردد.",
    sourceTitle: source11H, sourceQuestionNumber: "۱۶ تا ۲۰",
    reviewerNote: "سؤال مستقل از مباحث پایه‌های آوایی؛ هیچ مصراع دارای حق نشر از منبع بازنشر نشده است."
  }),
  q({
    id: "uploaded-15aban-11h-adab-004", grade: "یازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تشبیه", topic: "ارکان تشبیه", difficulty: "آسان",
    prompt: "در تشبیه کامل، کدام مجموعه چهار رکن اصلی را تشکیل می‌دهد؟",
    options: ["مشبه، مشبه‌به، ادات تشبیه، وجه شبه", "قافیه، ردیف، وزن، قالب", "نهاد، گزاره، فعل، مفعول", "مجاز، کنایه، تضاد، تلمیح"],
    correctIndex: 0,
    explanation: "در تشبیه کامل، چیزی که به چیزی مانند می‌شود، چیزی که به آن مانند شده، ابزار تشبیه و ویژگی مشترک بیان می‌شوند.",
    sourceTitle: source11H, sourceQuestionNumber: "۲۱ تا ۲۵",
    reviewerNote: "بازنویسی مبحث تشبیه از بخش علوم و فنون ادبی؛ ارکان چهارگانه کنترل شده‌اند."
  }),
  q({
    id: "uploaded-15aban-11h-adab-005", grade: "یازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "استعاره", topic: "رابطه استعاره و تشبیه", difficulty: "متوسط",
    prompt: "کدام گزینه تعریف دقیق‌تری از استعاره ارائه می‌کند؟",
    options: ["تشبیهی که یکی از دو سوی اصلی آن حذف شده باشد", "تکرار یک واج در چند واژه", "تکرار واژه‌ای در پایان مصراع‌ها", "به‌کارگیری دو واژه متضاد در یک جمله"],
    correctIndex: 0,
    explanation: "استعاره بر پایه شباهت شکل می‌گیرد و در آن یکی از دو طرف تشبیه، معمولاً مشبه یا مشبه‌به، حذف می‌شود.",
    sourceTitle: source11H, sourceQuestionNumber: "۲۱ تا ۲۵",
    reviewerNote: "سؤال مفهومی بازنویسی‌شده درباره استعاره؛ با تعریف کتاب درسی تطبیق داده شده است."
  }),

  // Grade 11 — experimental (KDI and Maz)
  q({
    id: "uploaded-15aban-11t-bio-001", grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تنظیم عصبی", topic: "پتانسیل آرامش نورون", difficulty: "متوسط",
    prompt: "ورود یون سدیم از طریق کانال‌های نشتی به نورون در حالت آرامش، به‌تنهایی چه اثری بر بار درون یاخته دارد؟",
    options: ["آن را مثبت‌تر می‌کند", "آن را منفی‌تر می‌کند", "هیچ اثری بر بار ندارد", "باعث خروج پتاسیم از یاخته می‌شود"],
    correctIndex: 0,
    explanation: "سدیم یون مثبت است؛ ورود آن به درون نورون، بار مثبت داخل را افزایش می‌دهد. پمپ سدیم ـ پتاسیم و کانال‌های دیگر در حفظ پتانسیل آرامش نقش دارند.",
    sourceTitle: source11T, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "بازنویسی مفهوم انتقال یون در غشای نورون؛ جهت اثر ورود Na+ بررسی شده است."
  }),
  q({
    id: "uploaded-15aban-11t-bio-002", grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "حواس", topic: "گیرنده‌های نوری شبکیه", difficulty: "آسان",
    prompt: "کدام نوع گیرندهٔ نوری شبکیه در نور کم حساس‌تر است و در دید سیاه‌وسفید نقش مهم‌تری دارد؟",
    options: ["مخروطی", "استوانه‌ای", "گیرنده بویایی", "گیرنده شنوایی"],
    correctIndex: 1,
    explanation: "گیرنده‌های استوانه‌ای حساسیت بیشتری به نور کم دارند و در دید شبانه و تشخیص روشنایی و تاریکی نقش اصلی دارند؛ مخروطی‌ها برای دید رنگی و دقیق‌تر مناسب‌اند.",
    sourceTitle: source11TMaz, sourceQuestionNumber: "۱۷",
    reviewerNote: "تمرین مفهومی از مقایسه گیرنده‌های نوری در آزمون ماز؛ پاسخ با کارکرد استوانه‌ای‌ها تطبیق داده شده است."
  }),
  q({
    id: "uploaded-15aban-11t-bio-003", grade: "یازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "تنظیم عصبی", topic: "انتقال پیام در سیناپس", difficulty: "متوسط",
    prompt: "در یک سیناپس شیمیایی، آزادشدن ناقل عصبی از پایانهٔ آکسون معمولاً با کدام رویداد آغاز می‌شود؟",
    options: ["ورود یون کلسیم به پایانه پیش‌سیناپسی", "خروج DNA از هسته", "تجزیه مستقیم غلاف میلین", "ورود گلوکز به جسم یاخته"],
    correctIndex: 0,
    explanation: "رسیدن پیام عصبی به پایانه آکسون موجب بازشدن کانال‌های کلسیمی وابسته به ولتاژ می‌شود؛ ورود Ca²⁺ همجوشی وزیکول‌ها با غشا و آزادشدن ناقل عصبی را تحریک می‌کند.",
    sourceTitle: source11TMaz, sourceQuestionNumber: "۱ تا ۱۰",
    reviewerNote: "سؤال مستقل از مسیر انتقال پیام عصبی؛ سازوکار وابسته به کلسیم کنترل شده است."
  }),
  q({
    id: "uploaded-15aban-11t-physics-004", grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "قانون کولن", difficulty: "آسان",
    prompt: "اگر فاصلهٔ دو بار نقطه‌ای ثابت، دو برابر شود و مقدار بارها تغییر نکند، اندازهٔ نیروی الکتریکی چند برابر می‌شود؟",
    options: ["۴", "۲", "۱/۲", "۱/۴"],
    correctIndex: 3,
    explanation: "طبق قانون کولن نیرو با مجذور فاصله نسبت وارون دارد؛ دو برابر شدن فاصله، نیرو را به یک‌چهارم مقدار اولیه می‌رساند.",
    sourceTitle: source11T, sourceQuestionNumber: "بخش الکتریسیته ساکن",
    reviewerNote: "سؤال مفهومی تازه بر اساس قانون کولن در آزمون یازدهم؛ نسبت نیرو مستقل محاسبه شده است."
  }),
  q({
    id: "uploaded-15aban-11t-chem-005", grade: "یازدهم", track: "تجربی", subject: "شیمی",
    chapter: "قدر هدایای زمینی را بدانیم", topic: "غلظت مولی", difficulty: "متوسط",
    prompt: "برای تهیهٔ ۵۰۰ میلی‌لیتر محلول ۰٫۲ مولار NaCl، چند مول NaCl لازم است؟",
    options: ["۰٫۰۱", "۰٫۱", "۰٫۲", "۱"],
    correctIndex: 1,
    explanation: "غلظت مولی M=n/V است. حجم ۵۰۰ میلی‌لیتر برابر ۰٫۵ لیتر است؛ پس n=۰٫۲×۰٫۵=۰٫۱ مول.",
    sourceTitle: source11TMaz, sourceQuestionNumber: "۵۱ تا ۷۰",
    reviewerNote: "سؤال محاسباتی بازطراحی‌شده از مباحث شیمی یازدهم؛ واحد حجم به لیتر تبدیل شده است."
  }),

  // Grade 11 — mathematics and physics track
  q({
    id: "uploaded-15aban-11r-math-001", grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "دنباله هندسی", difficulty: "متوسط",
    prompt: "در دنباله‌ای هندسی، هر جمله دو برابر جمله پیشین است و مجموع هشت جمله نخست ۵۱۰ است. جمله اول چند است؟",
    options: ["۱", "۲", "۴", "۵"],
    correctIndex: 1,
    explanation: "مجموع هشت جمله دنباله هندسی با قدرنسبت ۲ برابر a₁(۲⁸−۱)/(۲−۱)=۲۵۵a₁ است. بنابراین ۲۵۵a₁=۵۱۰ و a₁=۲.",
    sourceTitle: source11RMaz, sourceQuestionNumber: "۱",
    reviewerNote: "بازنویسی سؤال دنباله هندسی آزمون ماز؛ فرمول مجموع و پاسخ عددی دوباره بررسی شده‌اند."
  }),
  q({
    id: "uploaded-15aban-11r-math-002", grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "مجموع دنباله هندسی", difficulty: "آسان",
    prompt: "مجموع پنج جملهٔ نخست دنبالهٔ هندسی ۳، ۶، ۱۲، ... کدام است؟",
    options: ["۴۵", "۶۳", "۷۲", "۹۳"],
    correctIndex: 3,
    explanation: "پنج جمله برابر ۳، ۶، ۱۲، ۲۴ و ۴۸ هستند؛ مجموع آن‌ها ۹۳ است.",
    sourceTitle: source11RMaz, sourceQuestionNumber: "۱ تا ۵",
    reviewerNote: "تمرین تازه از مباحث دنباله هندسی؛ جمله‌ها و مجموع مستقیماً محاسبه شده‌اند."
  }),
  q({
    id: "uploaded-15aban-11r-math-003", grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "ممیّز معادله درجه دوم", difficulty: "متوسط",
    prompt: "معادلهٔ x²−4x+m=0 برای چه مقدار m ریشهٔ مضاعف دارد؟",
    options: ["۲", "۴", "۸", "۱۶"],
    correctIndex: 1,
    explanation: "ریشه مضاعف زمانی رخ می‌دهد که ممیّز صفر باشد: Δ=۱۶−۴m=۰؛ بنابراین m=۴.",
    sourceTitle: source11RMaz, sourceQuestionNumber: "۲ تا ۱۵",
    reviewerNote: "تمرین مستقل از شرط مماس‌شدن سهمی و ریشه مضاعف؛ ممیّز صفر قرار داده شده است."
  }),
  q({
    id: "uploaded-15aban-11r-physics-004", grade: "یازدهم", track: "ریاضی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "میدان الکتریکی بار نقطه‌ای", difficulty: "متوسط",
    prompt: "اندازهٔ میدان الکتریکی یک بار نقطه‌ای در فاصلهٔ r برابر E است. در فاصلهٔ ۲r، میدان چه مقدار می‌شود؟",
    options: ["۲E", "E", "E/۲", "E/۴"],
    correctIndex: 3,
    explanation: "میدان بار نقطه‌ای با مجذور فاصله نسبت وارون دارد؛ پس در فاصله دو برابر، اندازه میدان به یک‌چهارم می‌رسد.",
    sourceTitle: source11RMaz, sourceQuestionNumber: "بخش فیزیک، الکتریسیته ساکن",
    reviewerNote: "سؤال مفهومی جدید از میدان بار نقطه‌ای؛ نسبت فاصله و میدان کنترل شده است."
  }),
  q({
    id: "uploaded-15aban-11r-geometry-005", grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "مماس و شعاع", difficulty: "آسان",
    prompt: "شعاعی که به نقطهٔ تماس دایره رسم می‌شود، چه زاویه‌ای با خط مماس می‌سازد؟",
    options: ["۳۰ درجه", "۴۵ درجه", "۶۰ درجه", "۹۰ درجه"],
    correctIndex: 3,
    explanation: "شعاعی که به نقطه تماس رسم می‌شود بر خط مماس در همان نقطه عمود است؛ بنابراین زاویه ۹۰ درجه است.",
    sourceTitle: source11RMaz, sourceQuestionNumber: "۱۷ تا ۲۴",
    reviewerNote: "تمرین مفهومی از بخش دایره آزمون ماز؛ قضیه عمود بودن شعاع بر مماس مبنای پاسخ است."
  }),

  // Grade 12 — humanities KDI
  q({
    id: "uploaded-15aban-12h-history-001", grade: "دوازدهم", track: "انسانی", subject: "تاریخ",
    chapter: "ایران و جهان در آستانه دوره معاصر", topic: "تحولات ایران در آستانه دوره معاصر", difficulty: "متوسط",
    prompt: "در بررسی تحولات ایران در آستانهٔ دورهٔ معاصر، کدام عامل از زمینه‌های مهم فشار بر حکومت قاجار به شمار می‌رفت؟",
    options: ["افزایش نفوذ و رقابت قدرت‌های خارجی", "حذف کامل ارتباط ایران با جهان", "نبود هرگونه مسئله مالی در حکومت", "یکپارچگی کامل همه نهادهای سیاسی و اجتماعی"],
    correctIndex: 0,
    explanation: "رقابت و مداخله قدرت‌های خارجی، همراه با مشکلات داخلی حکومت قاجار، از زمینه‌های مهم تحولات سیاسی و اجتماعی ایران در این دوره بود.",
    sourceTitle: source12H, sourceQuestionNumber: "بخش تاریخ، پرسش‌های درس دوم",
    reviewerNote: "سؤال مفهومی مستقل از بخش تاریخ دوازدهم؛ صورت‌بندی کلی و پاسخ با محتوای تاریخی کتاب تطبیق داده شده است."
  }),
  q({
    id: "uploaded-15aban-12h-geography-002", grade: "دوازدهم", track: "انسانی", subject: "جغرافیا",
    chapter: "مدیریت پایدار نواحی روستایی و شهری", topic: "مدیریت پایدار سکونتگاه‌ها", difficulty: "آسان",
    prompt: "کدام اقدام بیشترین سازگاری را با مدیریت پایدار نواحی شهری دارد؟",
    options: ["گسترش بی‌برنامه ساخت‌وساز در حریم شهر", "افزایش دسترسی به حمل‌ونقل عمومی و کاهش آلودگی", "حذف فضاهای سبز برای توسعه معابر", "تمرکز همه خدمات در یک نقطه دور از سکونتگاه‌ها"],
    correctIndex: 1,
    explanation: "حمل‌ونقل عمومی کارآمد می‌تواند ترافیک و آلودگی را کاهش دهد و دسترسی شهروندان را به خدمات بهبود بخشد؛ این اقدام با اصول پایداری شهری سازگار است.",
    sourceTitle: source12H, sourceQuestionNumber: "بخش جغرافیا، درس مدیریت شهر و روستا",
    reviewerNote: "تمرین کاربردی از مدیریت پایدار سکونتگاه‌ها؛ پاسخ با ابعاد زیست‌محیطی و دسترسی شهری سنجیده شده است."
  }),
  q({
    id: "uploaded-15aban-12h-philosophy-003", grade: "دوازدهم", track: "انسانی", subject: "فلسفه",
    chapter: "جهان ممکنات", topic: "ممکن‌الوجود و واجب‌الوجود", difficulty: "متوسط",
    prompt: "موجودی که ذات آن به‌تنهایی اقتضای وجود یا عدم ندارد و برای موجودشدن به علت نیازمند است، چه نامیده می‌شود؟",
    options: ["واجب‌الوجود", "ممکن‌الوجود", "ممتنع‌الوجود", "موجود محال"],
    correctIndex: 1,
    explanation: "ممکن‌الوجود نسبت به وجود و عدم ذاتاً بی‌تفاوت است و برای تحقق یافتن به علت نیاز دارد؛ واجب‌الوجود نیازمند علت نیست.",
    sourceTitle: source12H, sourceQuestionNumber: "بخش فلسفه دوازدهم، درس‌های ۲ و ۳",
    reviewerNote: "سؤال تعریفی مستقل از مباحث جهان ممکنات؛ تمایز امکان و وجوب کنترل شده است."
  }),

  // Grade 12 — humanities Maz (mathematics, literature, sociology, psychology)
  q({
    id: "uploaded-15aban-12h-math-001", grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آمار و احتمال", topic: "احتمال اجتماع دو پیشامد ناسازگار", difficulty: "آسان",
    prompt: "اگر A و B دو پیشامد ناسازگار باشند و P(A)=۰٫۳ و P(B)=۰٫۲ باشد، احتمال رخداد A یا B چقدر است؟",
    options: ["۰٫۱", "۰٫۵", "۰٫۶", "۰٫۹"],
    correctIndex: 1,
    explanation: "برای دو پیشامد ناسازگار، احتمال اجتماع برابر مجموع احتمال‌هاست؛ پس P(A∪B)=۰٫۳+۰٫۲=۰٫۵.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "۱۱ تا ۱۶",
    reviewerNote: "تمرین مستقل از مبحث پیشامدها در آزمون ماز؛ شرط ناسازگاری در فرمول لحاظ شده است."
  }),
  q({
    id: "uploaded-15aban-12h-math-002", grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آمار و احتمال", topic: "احتمال متمم", difficulty: "آسان",
    prompt: "احتمال بارش در یک روز ۰٫۲۵ است. احتمال بارش‌نداشتن در همان روز چقدر است؟",
    options: ["۰٫۲۵", "۰٫۵", "۰٫۷۵", "۱٫۲۵"],
    correctIndex: 2,
    explanation: "احتمال متمم برابر یک منهای احتمال پیشامد است؛ بنابراین ۱−۰٫۲۵=۰٫۷۵.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "۱۷ تا ۲۰",
    reviewerNote: "سؤال تألیفی متناسب با تمرین‌های احتمال؛ پاسخ با قاعده متمم محاسبه شده است."
  }),
  q({
    id: "uploaded-15aban-12h-math-003", grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار",
    chapter: "آمار و احتمال", topic: "اصل ضرب در شمارش", difficulty: "متوسط",
    prompt: "برای انتخاب یک لباس، ۳ پیراهن و ۴ شلوار در اختیار داریم. چند ترکیب متفاوت از یک پیراهن و یک شلوار می‌توان ساخت؟",
    options: ["۷", "۱۲", "۲۴", "۶۴"],
    correctIndex: 1,
    explanation: "برای هر یک از ۳ پیراهن، ۴ انتخاب شلوار وجود دارد؛ پس طبق اصل ضرب، ۳×۴=۱۲ ترکیب ممکن است.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "بخش ریاضی و آمار، شمارش و احتمال",
    reviewerNote: "تمرین تازه از شمارش؛ پاسخ با اصل ضرب محاسبه شده است."
  }),
  q({
    id: "uploaded-15aban-12h-soc-004", grade: "دوازدهم", track: "انسانی", subject: "جامعه‌شناسی",
    chapter: "نظم اجتماعی", topic: "هنجار اجتماعی", difficulty: "آسان",
    prompt: "هنجار اجتماعی به کدام مورد اشاره دارد؟",
    options: ["قاعده و انتظار پذیرفته‌شده برای رفتار اعضای جامعه", "ویژگی ژنتیکی مشترک همه افراد", "سلیقه کاملاً خصوصی یک فرد", "قانون طبیعی مستقل از زندگی اجتماعی"],
    correctIndex: 0,
    explanation: "هنجارها انتظارات و قواعد پذیرفته‌شده‌ای هستند که رفتار افراد را در موقعیت‌های اجتماعی هدایت و تنظیم می‌کنند.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "۴۱ تا ۶۰",
    reviewerNote: "تمرین مفهومی از مبحث نظم اجتماعی؛ تعریف هنجار از برداشت‌های فردی تفکیک شده است."
  }),
  q({
    id: "uploaded-15aban-12h-psych-005", grade: "یازدهم", track: "انسانی", subject: "روان‌شناسی",
    chapter: "روان‌شناسی رشد", topic: "رشد شناختی در نوجوانی", difficulty: "متوسط",
    prompt: "کدام توانایی شناختی معمولاً در دوره نوجوانی نسبت به کودکی رشد بیشتری پیدا می‌کند؟",
    options: ["تفکر انتزاعی و فرضیه‌سازی", "ازبین‌رفتن کامل حافظه", "ناتوانی در استدلال درباره امور فرضی", "وابستگی کامل تفکر به محرک حاضر"],
    correctIndex: 0,
    explanation: "در نوجوانی توانایی تفکر انتزاعی و بررسی فرضیه‌ها رشد می‌کند؛ فرد می‌تواند درباره موقعیت‌هایی فراتر از تجربه مستقیم فکر کند.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "۶۱ تا ۶۵",
    reviewerNote: "سؤال بازنویسی‌شده از مقایسه رشد شناختی کودکی و نوجوانی؛ پاسخ با ویژگی تفکر صوری تطبیق داده شده است."
  }),
  q({
    id: "uploaded-15aban-12h-adab-006", grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "پایه‌های آوایی ناهمسان", topic: "تقطیع هجایی", difficulty: "متوسط",
    prompt: "در تقطیع هجایی شعر فارسی، کدام نوع هجا از نظر کمیت زمانی کوتاه‌تر است؟",
    options: ["هجای کوتاه", "هجای بلند", "هجای کشیده", "همه هجاها از نظر کمیت برابرند"],
    correctIndex: 0,
    explanation: "هجای کوتاه از نظر زمانی کوتاه‌تر از هجای بلند و کشیده است و در الگوی وزن شعر با نشانه ویژه خود نمایش داده می‌شود.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "۳۳ تا ۳۹",
    reviewerNote: "تمرین مستقل از بخش تقطیع هجایی؛ متن شعر آزمون بازنشر نشده است."
  }),
  q({
    id: "uploaded-15aban-12h-philosophy-007", grade: "دوازدهم", track: "انسانی", subject: "فلسفه",
    chapter: "جهان ممکنات", topic: "رابطه علت و معلول", difficulty: "متوسط",
    prompt: "در یک رابطه علّی، اگر علت تامه تحقق یابد و مانعی وجود نداشته باشد، کدام نتیجه با اصل علیت سازگار است؟",
    options: ["تحقق معلول ضروری می‌شود", "معلول حتماً ناممکن می‌شود", "وجود معلول هیچ ارتباطی با علت ندارد", "علت تامه فقط احتمال معلول را افزایش می‌دهد"],
    correctIndex: 0,
    explanation: "در تحلیل فلسفی، با تحقق علت تامه و نبود مانع، معلول ضرورتاً تحقق پیدا می‌کند؛ علت تامه صرفاً احتمال را افزایش نمی‌دهد.",
    sourceTitle: source12HMaz, sourceQuestionNumber: "۱۱۳ تا ۱۲۴",
    reviewerNote: "سؤال مفهومی از فلسفه دوازدهم؛ ضرورت معلول نسبت به علت تامه مبنای پاسخ است."
  }),

  // Grade 12 — experimental KDI
  q({
    id: "uploaded-15aban-12t-bio-001", grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "جریان اطلاعات در یاخته", topic: "رونویسی", difficulty: "متوسط",
    prompt: "در فرایند رونویسی، کدام مولکول به‌عنوان الگو برای ساخت RNA به کار می‌رود؟",
    options: ["یک رشته از DNA", "مولکول پروتئین", "ریبوزوم", "مولکول ATP به‌تنهایی"],
    correctIndex: 0,
    explanation: "در رونویسی، یکی از رشته‌های DNA به‌عنوان الگو خوانده می‌شود و رشته RNA مکمل آن ساخته می‌شود؛ در RNA به‌جای تیمین، یوراسیل قرار می‌گیرد.",
    sourceTitle: source12T, sourceQuestionNumber: "۲ تا ۱۰",
    reviewerNote: "تمرین مفهومی از بخش رونویسی؛ نقش رشته الگو و تفاوت بازها کنترل شده است."
  }),
  q({
    id: "uploaded-15aban-12t-bio-002", grade: "دوازدهم", track: "تجربی", subject: "زیست‌شناسی",
    chapter: "جریان اطلاعات در یاخته", topic: "ترجمه و نقش tRNA", difficulty: "متوسط",
    prompt: "در فرایند ترجمه، کدام مولکول آمینواسید مناسب را به ریبوزوم می‌رساند؟",
    options: ["DNA", "RNA ناقل", "RNA رناتنی", "فسفولیپید"],
    correctIndex: 1,
    explanation: "RNA ناقل یا tRNA با آنتی‌کدون خود کدون مکمل mRNA را شناسایی می‌کند و آمینواسید متناظر را به ریبوزوم می‌آورد.",
    sourceTitle: source12T, sourceQuestionNumber: "۱ تا ۱۵",
    reviewerNote: "بازنویسی مفهوم ساخت پلی‌پپتید؛ نقش tRNA از نقش mRNA و rRNA جدا شده است."
  }),
  q({
    id: "uploaded-15aban-12t-physics-003", grade: "دوازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "حرکت بر خط راست", topic: "سقوط آزاد", difficulty: "متوسط",
    prompt: "سنگی از حالت سکون رها می‌شود. با فرض g=10 m/s² و صرف‌نظر از مقاومت هوا، سرعت آن پس از ۳ ثانیه چند متر بر ثانیه است؟",
    options: ["۱۰", "۲۰", "۳۰", "۴۰"],
    correctIndex: 2,
    explanation: "در سقوط آزاد از سکون، v=gt است؛ بنابراین v=۱۰×۳=۳۰ متر بر ثانیه.",
    sourceTitle: source12T, sourceQuestionNumber: "۴۶ تا ۶۵",
    reviewerNote: "تمرین تألیفی از حرکت سقوط آزاد؛ مقدار سرعت با رابطه سرعت-زمان محاسبه شده است."
  }),
  q({
    id: "uploaded-15aban-12t-chem-004", grade: "دوازدهم", track: "تجربی", subject: "شیمی",
    chapter: "مولکول‌ها در خدمت تندرستی", topic: "pH اسید و باز", difficulty: "آسان",
    prompt: "در دمای معمول، کدام محلول pH بزرگ‌تر از ۷ دارد؟",
    options: ["محلول HCl", "محلول NaOH", "محلول HNO₃", "محلول CH₃COOH"],
    correctIndex: 1,
    explanation: "سدیم هیدروکسید باز است و در آب یون OH⁻ تولید می‌کند؛ محلول‌های بازی در دمای معمول pH بزرگ‌تر از ۷ دارند.",
    sourceTitle: source12T, sourceQuestionNumber: "بخش شیمی، پرسش‌های ۷۱ تا ۸۰",
    reviewerNote: "تمرین مفهومی از مبحث اسید و باز؛ ماهیت محلول‌ها با فرمول شیمیایی بررسی شده است."
  }),

  // Grade 12 — mathematics and physics KDI
  q({
    id: "uploaded-15aban-12r-calc-001", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مشتق", topic: "مشتق تابع چندجمله‌ای", difficulty: "آسان",
    prompt: "مشتق تابع f(x)=۳x²−۵x+۲ کدام است؟",
    options: ["۶x−۵", "۳x−۵", "۶x+۲", "۳x²−۵"],
    correctIndex: 0,
    explanation: "با استفاده از قاعده توان، مشتق ۳x² برابر ۶x، مشتق ۵x برابر ۵ و مشتق عدد ثابت صفر است؛ پس f'(x)=۶x−۵.",
    sourceTitle: source12R, sourceQuestionNumber: "بخش حسابان، تابع و مشتق",
    reviewerNote: "سؤال تمرینی تازه از حسابان دوازدهم؛ مشتق جمله‌به‌جمله محاسبه شده است."
  }),
  q({
    id: "uploaded-15aban-12r-physics-002", grade: "دوازدهم", track: "ریاضی", subject: "فیزیک",
    chapter: "حرکت بر خط راست", topic: "شتاب متوسط", difficulty: "آسان",
    prompt: "سرعت متحرکی در ۴ ثانیه از ۲ به ۱۸ متر بر ثانیه می‌رسد. شتاب متوسط آن چند متر بر مجذور ثانیه است؟",
    options: ["۲", "۴", "۵", "۸"],
    correctIndex: 1,
    explanation: "شتاب متوسط برابر تغییر سرعت تقسیم بر زمان است: (۱۸−۲)÷۴=۴ متر بر مجذور ثانیه.",
    sourceTitle: source12R, sourceQuestionNumber: "بخش فیزیک، حرکت",
    reviewerNote: "تمرین بازطراحی‌شده از نمودارها و حرکت با شتاب؛ محاسبه مستقل انجام شده است."
  }),
  q({
    id: "uploaded-15aban-12r-chem-003", grade: "دوازدهم", track: "ریاضی", subject: "شیمی",
    chapter: "آسایش و رفاه در سایهٔ شیمی", topic: "اکسایش و کاهش", difficulty: "متوسط",
    prompt: "در یک واکنش اکسایش ـ کاهش، گونه‌ای که الکترون می‌گیرد چه تغییری می‌کند؟",
    options: ["اکسید می‌شود", "کاهش می‌یابد", "عدد اکسایش آن افزایش می‌یابد", "همواره به گاز تبدیل می‌شود"],
    correctIndex: 1,
    explanation: "گرفتن الکترون فرایند کاهش است و عدد اکسایش گونه را کاهش می‌دهد.",
    sourceTitle: source12R, sourceQuestionNumber: "بخش شیمی، پرسش‌های اکسایش و کاهش",
    reviewerNote: "سؤال مفهومی تازه از شیمی دوازدهم؛ تعریف اکسایش و کاهش از نظر الکترون کنترل شده است."
  }),

  // Grade 12 — experimental Maz
  q({
    id: "uploaded-15aban-12tmaz-physics-001", grade: "دوازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "حرکت بر خط راست", topic: "انرژی مکانیکی در سقوط آزاد", difficulty: "متوسط",
    prompt: "جسمی از ارتفاعی رها می‌شود. اگر مقاومت هوا ناچیز باشد، در طول سقوط کدام کمیت ثابت می‌ماند؟",
    options: ["انرژی جنبشی", "انرژی پتانسیل گرانشی", "انرژی مکانیکی کل", "تندی جسم"],
    correctIndex: 2,
    explanation: "در نبود نیروی مقاوم، انرژی پتانسیل گرانشی به انرژی جنبشی تبدیل می‌شود؛ مجموع این دو، یعنی انرژی مکانیکی، ثابت می‌ماند.",
    sourceTitle: source12TMaz, sourceQuestionNumber: "۶۶ تا ۷۰",
    reviewerNote: "تمرین مفهومی از پرسش‌های انرژی و پرتابه؛ پایستگی انرژی مکانیکی با فرض نبود مقاومت هوا لحاظ شده است."
  }),
  q({
    id: "uploaded-15aban-12tmaz-physics-002", grade: "دوازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "دینامیک", topic: "قانون دوم نیوتون", difficulty: "آسان",
    prompt: "نیروی خالص ۱۲ نیوتون به جسمی با جرم ۳ کیلوگرم وارد می‌شود. اندازه شتاب جسم چقدر است؟",
    options: ["۲", "۳", "۴", "۹"],
    correctIndex: 2,
    explanation: "طبق قانون دوم نیوتون F=ma است؛ بنابراین a=F/m=۱۲÷۳=۴ متر بر مجذور ثانیه.",
    sourceTitle: source12TMaz, sourceQuestionNumber: "۶۱ تا ۷۰",
    reviewerNote: "تمرین مستقل از مباحث حرکت و نیرو؛ رابطه قانون دوم نیوتون اعمال شده است."
  }),
  q({
    id: "uploaded-15aban-12tmaz-chem-003", grade: "دوازدهم", track: "تجربی", subject: "شیمی",
    chapter: "شیمی، جلوه‌ای از هنر، زیبایی و ماندگاری", topic: "ساختار و نام‌گذاری ترکیبات یونی", difficulty: "متوسط",
    prompt: "نام درست ترکیب یونی MgCl₂ کدام است؟",
    options: ["منیزیم دی‌کلرید", "منیزیم کلرید", "منگنز کلرید", "منیزیم کلرات"],
    correctIndex: 1,
    explanation: "در نام‌گذاری ترکیب یونی، نام کاتیون و سپس نام آنیون آورده می‌شود؛ بنابراین MgCl₂ منیزیم کلرید است.",
    sourceTitle: source12TMaz, sourceQuestionNumber: "۹۳ تا ۱۰۰",
    reviewerNote: "بازنویسی مبحث نام‌گذاری ترکیب‌ها؛ بار یون‌ها و فرمول ترکیب سازگارند."
  }),

  // Grade 12 — mathematics and physics Maz
  q({
    id: "uploaded-15aban-12rmaz-math-001", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "دوره تناوب تابع سینوسی", difficulty: "متوسط",
    prompt: "دورهٔ تناوب تابع f(x)=sin(۲x) کدام است؟",
    options: ["۲π", "π", "π/۲", "۴π"],
    correctIndex: 1,
    explanation: "دوره تناوب تابع sin(bx) برابر ۲π/|b| است؛ برای b=۲ دوره برابر π می‌شود.",
    sourceTitle: source12RMaz, sourceQuestionNumber: "۵ تا ۱۵",
    reviewerNote: "تمرین مستقل از پرسش‌های تناوب توابع مثلثاتی آزمون ماز؛ فرمول تناوب کنترل شده است."
  }),
  q({
    id: "uploaded-15aban-12rmaz-math-002", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "برد تابع مثلثاتی", difficulty: "آسان",
    prompt: "برد تابع f(x)=۳+۲cos x کدام بازه است؟",
    options: ["[−۲، ۲]", "[۱، ۵]", "[۳، ۵]", "[۰، ۶]"],
    correctIndex: 1,
    explanation: "چون cos x بین ۱− و ۱ است، ۲cos x بین ۲− و ۲ و در نتیجه ۳+۲cos x بین ۱ و ۵ قرار دارد.",
    sourceTitle: source12RMaz, sourceQuestionNumber: "۱ تا ۱۰",
    reviewerNote: "بازنویسی مبحث برد تابع مثلثاتی؛ کران‌های تابع محاسبه شده‌اند."
  }),
  q({
    id: "uploaded-15aban-12rmaz-math-003", grade: "دوازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "ماتریس و کاربردها", topic: "دترمینان ماتریس", difficulty: "آسان",
    prompt: "دترمینان ماتریس [[۳، ۲]، [۱، ۴]] برابر کدام است؟",
    options: ["۸", "۱۰", "۱۲", "۱۴"],
    correctIndex: 1,
    explanation: "دترمینان ماتریس دو در دو برابر حاصل‌ضرب درایه‌های قطر اصلی منهای حاصل‌ضرب قطر فرعی است: ۳×۴−۲×۱=۱۰.",
    sourceTitle: source12RMaz, sourceQuestionNumber: "بخش ماتریس و کاربردها",
    reviewerNote: "تمرین تازه از مبحث دترمینان؛ محاسبه با فرمول ماتریس دو در دو بررسی شده است."
  }),
];

