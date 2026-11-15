import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس سوم «در امواج سند»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن، گزینه‌ها و پاسخ با شعر «در امواج سند» و کارگاه متن‌پژوهی صفحات ۲۸ تا ۳۲ کتاب و پاسخ‌های آموزشی درس تطبیق داده شده‌اند. منبع کمکی: https://www.daneshchi.ir/پاسخ-سوالات-درس-سوم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson3: ExamQuestion[] = [
  {
    id: "grade11-persian2-amvaj-sand-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در امواج سند",
    topic: "واژگان در متن", difficulty: "آسان",
    prompt: "در شعر «در امواج سند»، واژهٔ «باره» در معنای کدام واژه به کار رفته است؟",
    options: ["اسب", "شمشیر", "پرچم", "رود"],
    correctIndex: 0,
    explanation: "در واژه‌نامه و کارگاه متن‌پژوهی درس، «باره» و «بادپا» در معنای اسب آمده‌اند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-amvaj-sand-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در امواج سند",
    topic: "آرایهٔ ادبی و استعاره", difficulty: "متوسط",
    prompt: "در بیت دوازدهم شعر «در امواج سند»، ترکیب «دریای خون» به چه چیزی اشاره دارد؟",
    options: ["غروب سرخ‌رنگ خورشید", "میدان نبرد و خون‌ریزی فراوان", "رود سند در هنگام غروب", "اندوه جلال‌الدین پس از شکست"],
    correctIndex: 1,
    explanation: "در توضیح کارگاه متن‌پژوهی، «دریای خون» در بیت دوازدهم استعاره از میدان نبردی است که خون فراوانی در آن ریخته شده است؛ در بیت هشتم کاربرد آن متفاوت و ناظر به غروب سرخ‌رنگ خورشید است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-amvaj-sand-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در امواج سند",
    topic: "درک مفهوم و شخصیت‌پردازی", difficulty: "متوسط",
    prompt: "در بیت‌هایی که از ترشدن مژگان به خون دیده و یورش چون آتش به سپاه دشمن سخن می‌رود، کدام ویژگی جلال‌الدین خوارزمشاه برجسته می‌شود؟",
    options: ["میل به کناره‌گیری از جنگ", "دغدغهٔ دفاع از وطن و دلاوری در برابر دشمن", "بی‌اعتنایی به سرنوشت مردم", "تمایل به سازش و تسلیم"],
    correctIndex: 1,
    explanation: "این تصویرها جلال‌الدین را فرمانده‌ای نگران سرنوشت وطن و مردم و در عین حال شجاع و مهاجم در برابر سپاه دشمن نشان می‌دهند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-amvaj-sand-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در امواج سند",
    topic: "کنایه و مفهوم عبارت", difficulty: "متوسط",
    prompt: "عبارت «بنای زندگی بر آب می‌دید» در شعر، بیانگر کدام مفهوم است؟",
    options: ["امید فراوان به آینده", "قطع امید از زندگی و احساس بی‌پناهی", "آغاز زندگی در کنار رود", "آرامش پس از پیروزی"],
    correctIndex: 1,
    explanation: "در کارگاه متن‌پژوهی، این عبارت کنایه از نداشتن امید به زندگی و قطع امید معرفی شده است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-amvaj-sand-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "در امواج سند",
    topic: "قلمرو فکری و مضمون", difficulty: "متوسط",
    prompt: "پیوند اصلی بیت «در ره عشق وطن از سر جان خاسته‌ایم...» با شعر «در امواج سند» چیست؟",
    options: ["ستایش آسایش و دوری از خطر", "عشق به وطن و آمادگی برای فداکاری در راه دفاع از آن", "برتری ثروت بر شجاعت", "بی‌ارزش‌بودن تلاش فردی در جنگ"],
    correctIndex: 1,
    explanation: "هر دو متن بر میهن‌دوستی و دفاع از سرزمین در برابر تجاوز بیگانگان تأکید دارند و این راه را نیازمند دلاوری و گذشت از جان می‌دانند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
