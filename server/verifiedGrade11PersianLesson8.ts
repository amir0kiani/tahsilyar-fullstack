import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس هشتم «در کوی عاشقان»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۷۲ تا ۷۴ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی: https://www.daneshchi.ir/پاسخ-سوالات-درس-هشتم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson8: ExamQuestion[] = [
  {
    id: "grade11-persian2-dar-kouye-asheghan-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در کوی عاشقان",
    topic: "واژگان", difficulty: "آسان",
    prompt: "واژهٔ «مرشد» در متن درس «در کوی عاشقان» به چه معناست؟",
    options: ["راهنما و هدایت‌کننده", "شاعر و سراینده", "مسافر و رهگذر", "شاگرد و نوآموز"],
    correctIndex: 0,
    explanation: "مرشد به معنای راهنما، هدایت‌کننده و رهبر است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-dar-kouye-asheghan-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در کوی عاشقان",
    topic: "آرایه‌های ادبی و تضمین", difficulty: "متوسط",
    prompt: "در سرودهٔ شفیعی کدکنی، آوردن مصراع «رو سر بنه به بالین، تنها مرا رها کن» از سروده‌ای دیگر، نمونهٔ کدام آرایه است؟",
    options: ["تضمین", "تلمیح", "حسن تعلیل", "ایهام"],
    correctIndex: 0,
    explanation: "استفاده از بیت یا مصراع شاعر دیگر در شعر خود، تضمین نام دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-dar-kouye-asheghan-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در کوی عاشقان",
    topic: "حس‌آمیزی", difficulty: "متوسط",
    prompt: "در ترکیب‌هایی مانند «غزل‌های گرم» و «ترانه‌های شیرین» کدام آرایه به‌کار رفته است؟",
    options: ["تشبیه", "حس‌آمیزی", "تضاد", "اغراق"],
    correctIndex: 1,
    explanation: "در این ترکیب‌ها ویژگی‌های حسی یک حوزه به حوزه‌ای دیگر نسبت داده شده است؛ مانند گرم‌بودن یا شیرین‌بودن برای غزل و ترانه، پس حس‌آمیزی است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-dar-kouye-asheghan-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در کوی عاشقان",
    topic: "قلمرو فکری و اندیشه", difficulty: "متوسط",
    prompt: "بیت «کدام دانه فرو رفت در زمین که نرُست؟ / چرا به دانهٔ انسانت این گمان باشد؟» بیانگر کدام اندیشه است؟",
    options: ["ناممکن‌بودن دگرگونی انسان", "رستاخیز و زنده‌شدن دوبارهٔ انسان", "برتری زندگی دنیوی بر زندگی اخروی", "بی‌ارزش‌بودن تلاش"],
    correctIndex: 1,
    explanation: "مولانا با مثال روییدن دانه در خاک، امکان رستاخیز و زنده‌شدن دوبارهٔ انسان را یادآوری می‌کند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-dar-kouye-asheghan-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در کوی عاشقان",
    topic: "مفهوم متن و شخصیت‌پردازی", difficulty: "متوسط",
    prompt: "بر اساس متن درس، مولانا برای هدایت دیگران به راه حقیقت بیشتر به کدام شیوه گرایش داشت؟",
    options: ["سرزنش تند و پاسخ تلخ", "نرمی، بردباری و خوش‌خویی", "کناره‌گیری از مردم", "وادارکردن دیگران به پذیرش بی‌چون‌وچرا"],
    correctIndex: 1,
    explanation: "متن، مولانا را در برخورد با دیگران اهل صلح و سازش و بردبار معرفی می‌کند که با نرمی و حسن خلق آنان را به راه راست هدایت می‌کرد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
