import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس دهم «بانگ جرس»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۸۸ تا ۸۹ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی برای بازبینی پاسخ‌ها: https://www.daneshchi.ir/پاسخ-سوالات-درس-دهم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson10: ExamQuestion[] = [
  {
    id: "grade11-persian2-bang-jaras-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "بانگ جرس",
    topic: "واژگان", difficulty: "آسان",
    prompt: "واژهٔ «جرس» در متن درس «بانگ جرس» چه معنایی دارد؟",
    options: ["زنگ","کوچ","پرچم","راه"],
    correctIndex: 0,
    explanation: "«جرس» به معنای زنگ است و با مفهوم بانگ یا صدای زنگ ارتباط دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-bang-jaras-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "بانگ جرس",
    topic: "واژگان", difficulty: "متوسط",
    prompt: "در مصراع «زان‌جا به جولان تا خط لبنان برانیم»، واژهٔ «جولان» در چه معنایی به کار رفته است؟",
    options: ["آرام گرفتن","اسب تاختن و تاخت‌وتاز کردن","بازگشتن از سفر","پنهان شدن"],
    correctIndex: 1,
    explanation: "در بافت این مصراع، «جولان» به معنای اسب تاختن و حرکت پرشتاب است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-bang-jaras-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "بانگ جرس",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در درس «بانگ جرس»، کاربرد واژهٔ «جولان» با دو معنای نام سرزمینی در سوریه و تاخت‌وتاز، نمونهٔ کدام آرایه است؟",
    options: ["جناس همسان (تام)","جناس ناهمسان","واج‌آرایی","تضمین"],
    correctIndex: 0,
    explanation: "یک صورت واژگانی با دو معنای متفاوت به کار رفته است؛ بنابراین جناس همسان یا تام است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-bang-jaras-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "بانگ جرس",
    topic: "کنایه", difficulty: "آسان",
    prompt: "مفهوم کنایهٔ «برگ سفر بر باره بستن» چیست؟",
    options: ["از سفر منصرف شدن","آمادهٔ سفر و حرکت شدن","از کسی پوزش خواستن","به مقصد رسیدن"],
    correctIndex: 1,
    explanation: "این ترکیب کنایه از آماده شدن برای سفر و حرکت است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-bang-jaras-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "بانگ جرس",
    topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "در بیت «وادی پر از فرعونیان و قبطیان است / موسی جلودار است و نیل اندر میان است»، کدام تطبیق با تفسیر ارائه‌شده در کارگاه درس هماهنگ است؟",
    options: ["فرعونیان: مظلومان؛ موسی: سپاه دشمن","فرعونیان: صهیونیست‌ها؛ قبطیان: حامیان آنان؛ موسی: امام خمینی(ره)","فرعونیان: ایرانیان؛ قبطیان: یاران موسی؛ موسی: فرعون","فرعونیان: مردم مصر؛ قبطیان: بنی‌اسرائیل؛ موسی: شاعر"],
    correctIndex: 1,
    explanation: "در پاسخ کارگاه متن‌پژوهی، فرعونیان به صهیونیست‌ها، قبطیان به حامیان آنان و موسی به امام خمینی(ره) اشاره دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
