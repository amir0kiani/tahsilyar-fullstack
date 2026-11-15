import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس دوازدهم «کاوهٔ دادخواه»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۱۰۴ تا ۱۰۷ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی برای بازبینی پاسخ‌ها: https://www.daneshchi.ir/پاسخ-سوالات-درس-دوازدهم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson12: ExamQuestion[] = [
  {
    id: "grade11-persian2-kaveh-dadkhah-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کاوهٔ دادخواه",
    topic: "واژگان", difficulty: "آسان",
    prompt: "واژهٔ «درای» در متن درس «کاوهٔ دادخواه» به چه معناست؟",
    options: ["زره","پُتک آهنگران","کلاه‌خود","پرچم"],
    correctIndex: 1,
    explanation: "«درای» در این درس به معنای پتک آهنگران است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-kaveh-dadkhah-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کاوهٔ دادخواه",
    topic: "واژگان", difficulty: "متوسط",
    prompt: "در متن درس، واژهٔ «محضر» در چه معنایی به کار رفته است؟",
    options: ["جایگاه عبادت","گواهی‌نامه یا استشهادنامه","محل دادوستد","جایگاه پادشاهی"],
    correctIndex: 1,
    explanation: "در بافت درس، «محضر» به معنای گواهی‌نامه یا استشهادنامه است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-kaveh-dadkhah-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کاوهٔ دادخواه",
    topic: "دستور و واژگان", difficulty: "متوسط",
    prompt: "در بیت «تو شاهی و گر اژدهاپیکری / بباید زدن داستان، آوری»، واژهٔ «گر» چه معنایی دارد؟",
    options: ["اگر","زیرا","یا","پس"],
    correctIndex: 2,
    explanation: "در این بیت، «گر» به معنای «یا» به کار رفته است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-kaveh-dadkhah-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کاوهٔ دادخواه",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در بیت «روز و شب به نام کسی لب گشادن»، ترکیب «روز و شب» و کنایهٔ «به نام کسی لب گشادن» به‌ترتیب چه مفهومی دارند؟",
    options: ["تضاد؛ پیوسته به یاد کسی بودن","مراعات نظیر؛ آشکارا سخن گفتن","جناس؛ خاموش ماندن","تشبیه؛ ستایش کردن"],
    correctIndex: 0,
    explanation: "«روز و شب» تضاد دارد و «به نام کسی لب گشادن» کنایه از پیوسته به یاد او بودن است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-kaveh-dadkhah-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کاوهٔ دادخواه",
    topic: "قلمرو فکری و نماد", difficulty: "متوسط",
    prompt: "در درس «کاوهٔ دادخواه»، انگیزهٔ اصلی قیام کاوه علیه ضحاک چیست؟",
    options: ["به دست آوردن مقام پادشاهی","پایان دادن به ستم ضحاک و برقراری عدالت برای مردم","گسترش قلمرو سرزمینی","انتقام‌گیری از بازرگانان"],
    correctIndex: 1,
    explanation: "کاوه برای پایان دادن به ستم ضحاک و نجات مردم از بیدادگری او قیام می‌کند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
