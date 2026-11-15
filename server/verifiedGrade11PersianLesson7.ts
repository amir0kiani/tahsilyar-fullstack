import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس هفتم «باران محبّت»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۶۰ تا ۶۳ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی: https://www.daneshchi.ir/پاسخ-سوالات-درس-هفتم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson7: ExamQuestion[] = [
  {
    id: "grade11-persian2-baran-mohabbat-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "باران محبت",
    topic: "واژگان", difficulty: "آسان",
    prompt: "در متن درس، واژهٔ «رغبت» به چه معناست؟",
    options: ["میل و خواست", "خواری و پستی", "توانگری", "پیشگاه"],
    correctIndex: 0,
    explanation: "«رغبت» به معنای میل، اراده و آرزو است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-baran-mohabbat-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "باران محبت",
    topic: "واژگان", difficulty: "آسان",
    prompt: "معنای واژهٔ «مذلّت» در بیت سعدیِ آمده در کارگاه متن‌پژوهی چیست؟",
    options: ["بزرگواری", "خواری و پستی", "آرزو و میل", "جایگاه و مقام"],
    correctIndex: 1,
    explanation: "«مذلّت» به معنای خواری و پستی است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-baran-mohabbat-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "باران محبت",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در عبارت «از ابرِ کرم، بارانِ محبّت بر خاک آدم بارید»، کدام گزینه آرایهٔ به‌کاررفته در ترکیب‌های «ابر کرم» و «باران محبت» را درست مشخص می‌کند؟",
    options: ["اضافهٔ تشبیهی", "اضافهٔ استعاری", "تضمین", "اغراق"],
    correctIndex: 0,
    explanation: "در پاسخ کارگاه متن‌پژوهی، «ابر کرم» و «باران محبت» اضافهٔ تشبیهی معرفی شده‌اند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-baran-mohabbat-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "باران محبت",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در عبارت «در گِل از گِل، دل کرد»، میان واژه‌های «گِل» و «دل» چه آرایه‌ای دیده می‌شود؟",
    options: ["تلمیح", "جناس", "واج‌آرایی", "حسن تعلیل"],
    correctIndex: 1,
    explanation: "«گِل» و «دل» از نظر آوایی و نوشتاری تفاوت اندکی دارند و در این عبارت جناس پدید آورده‌اند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-baran-mohabbat-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "باران محبت",
    topic: "قلمرو فکری و مفهوم آیات", difficulty: "متوسط",
    prompt: "بر اساس متن درس و آیهٔ «إِنّا عَرَضْنَا الْأَمانَةَ... وَحَمَلَهَا الْإِنْسانُ»، کدام مفهوم دربارهٔ انسان بیان می‌شود؟",
    options: ["انسان از پذیرش هرگونه مسئولیت ناتوان است", "امانت محبت و معرفت بر انسان عرضه شد و انسان شایستگی پذیرش آن را یافت", "انسان تنها از راه ثروت به کمال می‌رسد", "فرشتگان مالک انحصاری معرفت‌اند"],
    correctIndex: 1,
    explanation: "در متن درس، گوهر محبت در صدف امانت معرفت توصیف می‌شود و دل آدم شایستهٔ نگهداری آن دانسته می‌شود؛ این مضمون با آیهٔ امانت تناسب دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
