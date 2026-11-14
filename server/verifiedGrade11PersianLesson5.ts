import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس پنجم «آغازگری تنها»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ محتوای درس، کارگاه متن‌پژوهی و روان‌خوانی همراه با پاسخ‌های آموزشی دبیر فارسی تطبیق داده شده‌اند. منبع کمکی: https://www.daneshchi.ir/پاسخ-سوالات-درس-پنجم-فارسی-یازدهم/ و https://www.jafarisaeed.ir/فارسی/فارسی2/آموزه-پنجم-آغازگری-تنها/.";

export const verifiedGrade11PersianLesson5: ExamQuestion[] = [
  {
    id: "grade11-persian2-aghazgari-tanha-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "آغازگری تنها",
    topic: "نوع ادبی و موضوع متن", difficulty: "آسان",
    prompt: "متن «آغازگری تنها» با توجه به بازنمایی مقاومت ایرانیان در برابر هجوم بیگانگان، در کدام حوزهٔ ادبی قرار می‌گیرد؟",
    options: ["ادبیات غنایی", "ادبیات پایداری", "ادبیات تعلیمی", "ادبیات طنز"],
    correctIndex: 1,
    explanation: "موضوع متن، مقاومت و ایستادگی ایرانیان در برابر تجاوز بیگانگان و دفاع از سرزمین است؛ ازاین‌رو در قلمرو ادبیات پایداری قرار می‌گیرد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-aghazgari-tanha-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "آغازگری تنها",
    topic: "درک متن و شخصیت‌پردازی", difficulty: "متوسط",
    prompt: "در متن «آغازگری تنها»، کدام عامل عباس‌میرزا را برای تحقق آرمان‌های ملی استوارتر و امیدوارتر می‌کرد؟",
    options: ["پشتیبانی مالی دربار روسیه", "حضور نیروهای داوطلب و شجاعی که از عشق به میهن برای دفاع گرد آمده بودند", "کناره‌گیری مردم از نبرد", "پیشنهاد تسلیم فوری شهرهای مرزی"],
    correctIndex: 1,
    explanation: "در پاسخ فعالیت درس، گردآمدن نیروهای آماده بدون فرمان و سفارش حاکمان و خان‌ها و از روی عشق به میهن و دفاع از هم‌وطنان، عامل امیدواری عباس‌میرزا معرفی شده است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-aghazgari-tanha-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "آغازگری تنها",
    topic: "آرایه‌های ادبی در نثر", difficulty: "متوسط",
    prompt: "در عبارت «در ایران آن روز، دو دربار بود! دربار بزم و دربار رزم؛ بزم پدر، رزم پسر!» کدام آرایه در تقابل «بزم» و «رزم» برجسته است؟",
    options: ["تضاد", "تلمیح", "اغراق", "حسن تعلیل"],
    correctIndex: 0,
    explanation: "«بزم» به معنای مجلس شادی و آسایش و «رزم» به معنای جنگ و نبرد است؛ تقابل معنایی این دو واژه آرایهٔ تضاد می‌سازد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-aghazgari-tanha-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "آغازگری تنها",
    topic: "نماد و مفهوم", difficulty: "متوسط",
    prompt: "در تحلیل نمادین متن، ترکیب «خانه‌های تاریک و بی‌دریچه» به چه مفهومی اشاره می‌کند؟",
    options: ["اندیشه‌های نو و ارتباط گسترده با جهان", "جامعهٔ بسته و محدود و سنت‌های کهنه و دست‌وپاگیر", "آرامش و امنیت خانه", "شکوه معماری ایرانی"],
    correctIndex: 1,
    explanation: "در توضیح آموزشی متن، خانه‌های تاریک و بی‌دریچه به جامعهٔ بسته و محدود و سنت‌های دست‌وپاگیر و کهنه اشاره دارند؛ پنجره‌های باز و نورگیر نماد ارتباط با دنیای بیرون، پیشرفت و شکوفایی‌اند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-aghazgari-tanha-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "آغازگری تنها",
    topic: "واژگان و هم‌آواها", difficulty: "آسان",
    prompt: "هم‌آوای واژهٔ «صفیر» کدام است؟",
    options: ["سفیر", "سفید", "سفله", "سفینه"],
    correctIndex: 0,
    explanation: "«صفیر» و «سفیر» هم‌آوا هستند، اما از نظر نوشتار و معنا تفاوت دارند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
