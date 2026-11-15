import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس شانزدهم «قصهٔ عینکم»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال‌ها مستقل و تألیفی‌اند و از آزمون منتشرشده کپی نشده‌اند؛ متن درس و کارگاه متن‌پژوهی صفحات ۱۲۴ تا ۱۳۱ نسخهٔ رسمی چاپ دهم ۱۴۰۵ با منبع کمکی بازبینی پاسخ تطبیق داده شده است: https://magerta.ir/culture/literature/answer-text-study-workshop-lesson-sixteenth-eleventh-persian/";

export const verifiedGrade11PersianLesson16: ExamQuestion[] = [
  {
    id: "grade11-persian2-lesson16-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "قصهٔ عینکم",
    topic: "واژگان", difficulty: "آسان",
    prompt: "در عبارت «به دیدن تو چنان خیره‌ام که نشناسم»، واژهٔ «خیره» در چه معنایی به کار رفته است؟",
    options: ["با حیرت و سرگشتگی","با خشم و نفرت","با بی‌حوصلگی","با دقت و تمرکز"],
    correctIndex: 0,
    explanation: "در این بافت، «خیره» به معنای حیران و سرگشته است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson16-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "قصهٔ عینکم",
    topic: "کنایه", difficulty: "آسان",
    prompt: "مفهوم کنایهٔ «افسارگسیخته بودن» در متن داستان چیست؟",
    options: ["بسیار شجاع بودن","مهارنشدنی و بی‌انضباط بودن","بسیار آرام بودن","دچار فراموشی شدن"],
    correctIndex: 1,
    explanation: "«افسارگسیخته» برای توصیف رفتار مهارنشدنی و بی‌انضباط به کار رفته است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson16-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "قصهٔ عینکم",
    topic: "عناصر داستان", difficulty: "متوسط",
    prompt: "زاویهٔ دید روایت در داستان «قصهٔ عینکم» کدام است؟",
    options: ["اول‌شخص","دوم‌شخص","سوم‌شخص دانای کل","سوم‌شخص محدود"],
    correctIndex: 0,
    explanation: "راوی ماجرا را از تجربه و نگاه شخصی خود بازگو می‌کند؛ بنابراین زاویهٔ دید اول‌شخص است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson16-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "قصهٔ عینکم",
    topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "راوی در آغاز داستان، عینک را نشانهٔ چه چیزی می‌پنداشت؟",
    options: ["ضعف و بیماری","تمدن و تجدد، مانند کراوات و کارد و چنگال","مقام و ثروت","دانش و تخصص پزشکی"],
    correctIndex: 1,
    explanation: "راوی تحت تأثیر تصور نادرست خود، عینک را وسیله‌ای برای شیک و متمدن به نظر رسیدن می‌دانست.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson16-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "قصهٔ عینکم",
    topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "چرا خانواده و اطرافیان، رفتارهای ناشی از مشکل بینایی را در راوی به‌درستی تفسیر نمی‌کردند؟",
    options: ["از مشکل بینایی او آگاه نبودند و آن رفتارها را به بی‌استعدادی و بی‌انضباطی نسبت می‌دادند","راوی عمداً از دیدن اشیا خودداری می‌کرد","خانواده می‌دانستند او عینک دارد اما اجازهٔ استفاده نمی‌دادند","مشکل اصلی راوی ضعف شنوایی بود"],
    correctIndex: 0,
    explanation: "اطرافیان از ضعف بینایی راوی خبر نداشتند و پیامدهای آن را به تنبلی، بی‌استعدادی و بی‌انضباطی نسبت می‌دادند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
