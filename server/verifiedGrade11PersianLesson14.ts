import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس چهاردهم «حملهٔ حیدری»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال‌ها مستقل و تألیفی‌اند و از آزمون منتشرشده کپی نشده‌اند؛ متن درس و کارگاه متن‌پژوهی صفحات ۱۱۰ تا ۱۱۴ نسخهٔ رسمی چاپ دهم ۱۴۰۵ با منبع کمکی بازبینی پاسخ تطبیق داده شده است: https://www.daneshchi.ir/پاسخ-سوالات-درس-چهاردهم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson14: ExamQuestion[] = [
  {
    id: "grade11-persian2-lesson14-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "حملهٔ حیدری",
    topic: "واژگان", difficulty: "آسان",
    prompt: "در متن درس «حملهٔ حیدری»، واژهٔ «ابرش» در برابر کدام واژه به کار رفته است؟",
    options: ["اسب","شمشیر","زره","سپاه"],
    correctIndex: 0,
    explanation: "در کارگاه متن‌پژوهی، «ابرش» معادل واژهٔ «اسب» معرفی شده است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson14-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "حملهٔ حیدری",
    topic: "واژگان", difficulty: "آسان",
    prompt: "واژهٔ «رخصت» در متن درس به چه معناست؟",
    options: ["اجازه","پیروزی","خشم","پایداری"],
    correctIndex: 0,
    explanation: "«رخصت» به معنای اجازه و دستور است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson14-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "حملهٔ حیدری",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در ترکیب «شیر خدا» که در وصف حضرت علی(ع) آمده است، چه آرایه‌ای دیده می‌شود؟",
    options: ["تشبیه","استعاره","کنایه","جناس"],
    correctIndex: 1,
    explanation: "«شیر خدا» استعاره از حضرت علی(ع) است و شجاعت ایشان را برجسته می‌کند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson14-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "حملهٔ حیدری",
    topic: "کنایه", difficulty: "آسان",
    prompt: "مفهوم کنایهٔ «دندان به دندان خاییدن» در متن درس چیست؟",
    options: ["اندوهگین شدن","خشمگین و عصبانی شدن","پشیمان شدن","شتاب کردن"],
    correctIndex: 1,
    explanation: "این کنایه به معنای شدت خشم و عصبانیت است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson14-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "حملهٔ حیدری",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در بیت «چو آن آهنین‌کوه آمد به دشت / همه رزمگه کوه فولاد گشت»، کدام ویژگی ادبی برجسته است؟",
    options: ["اغراق در توصیف صحنهٔ نبرد","واج‌آرایی در سراسر بیت","جناس میان آهنین و فولاد","حس‌آمیزی"],
    correctIndex: 0,
    explanation: "تبدیل میدان نبرد به «کوه فولاد» تصویری اغراق‌آمیز از شدت و عظمت نبرد می‌سازد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
