import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-15T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال‌ها مستقل و تألیفی‌اند و از آزمون منتشرشده کپی نشده‌اند؛ متن درس هفدهم در صفحات ۱۳۹ تا ۱۴۰ و کارگاه متن‌پژوهی در صفحات ۱۴۱ تا ۱۴۲ نسخه رسمی چاپ دهم ۱۴۰۵، با تمرکز بر قلمروهای زبانی، ادبی و فکری، بازبینی شده است. AUTHORED/ORIGINAL.";

export const verifiedGrade11PersianLesson17: ExamQuestion[] = [
  {
    id: "grade11-persian2-lesson17-authored-01", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خاموشی دریا", topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "در بند نخست شعر «خاموشی دریا»، «چراغدان» نماد چه کسانی است؟",
    options: ["افرادی که بی‌سروصدا و در پشت صحنه زمینه روشنایی و موفقیت دیگران را فراهم می‌کنند", "کسانی که تنها به دنبال شهرت و دیده‌شدن‌اند", "افرادی که مانع پیشرفت دیگران می‌شوند", "کسانی که از دانش و تجربه بی‌بهره‌اند"],
    correctIndex: 0,
    explanation: "چراغدان در سایه می‌ایستد اما امکان روشنایی را فراهم می‌کند؛ نمادی از افراد پشتیبان و اثرگذاری است که ممکن است کمتر دیده شوند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson17-authored-02", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خاموشی دریا", topic: "آرایه ادبی", difficulty: "متوسط",
    prompt: "در عبارت «ممکن از ناممکن می‌پرسد»، کدام آرایه ادبی برجسته‌تر است؟",
    options: ["تشخیص", "واج‌آرایی", "جناس تام", "تلمیح"],
    correctIndex: 0,
    explanation: "پرسیدن، کنشی انسانی است که به دو مفهوم انتزاعی «ممکن» و «ناممکن» نسبت داده شده؛ بنابراین تشخیص به کار رفته است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson17-authored-03", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خاموشی دریا", topic: "قلمرو زبانی", difficulty: "متوسط",
    prompt: "در بند سوم شعر، واژه «واو» در ترکیب «خاموشی دریا و هیاهوی خاک و موسیقی آسمان» چه نقشی دارد؟",
    options: ["واو عطف؛ برای پیوند دادن گروه‌های اسمی هم‌پایه", "واو ربط؛ برای پیوند دادن دو جمله مستقل", "واو استیناف؛ برای آغاز جمله‌ای تازه", "واو قسم؛ برای سوگند خوردن"],
    correctIndex: 0,
    explanation: "در این ترکیب، واو میان سه گروه اسمی هم‌پایه آمده و آن‌ها را به یکدیگر پیوند داده است؛ پس واو عطف است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson17-authored-04", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خاموشی دریا", topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "مفهوم اصلی بند سوم شعر، درباره انسان چیست؟",
    options: ["انسان فقط به یکی از قلمروهای طبیعت تعلق دارد", "انسان مجموعه‌ای از جلوه‌های گوناگون هستی و طبیعت را در خود دارد", "انسان باید از سکوت و حرکت دوری کند", "انسان از جهان طبیعی کاملاً جدا و بی‌ارتباط است"],
    correctIndex: 1,
    explanation: "شاعر دریا، خاک و آسمان را با سکوت، هیاهو و موسیقی پیوند می‌دهد و می‌گوید انسان همه این جلوه‌ها را در وجود خود دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson17-authored-05", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خاموشی دریا", topic: "قلمرو فکری", difficulty: "آسان",
    prompt: "در بند «هنگامی که در فروتنی بزرگ باشیم»، چه نسبتی میان فروتنی و نزدیکی به «آن بزرگ» برقرار شده است؟",
    options: ["فروتنی و دوری از خودبزرگ‌بینی", "ثروت و جایگاه اجتماعی", "شهرت و برتری‌جویی", "قدرت جسمانی و غلبه بر دیگران"],
    correctIndex: 0,
    explanation: "در این بند، فروتنی سبب نزدیک‌شدن بیشتر انسان به «آن بزرگ» دانسته شده است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
