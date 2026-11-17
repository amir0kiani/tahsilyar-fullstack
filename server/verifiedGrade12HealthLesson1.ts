import type { ExamQuestion } from "./examBank";

// Original textbook-grounded practice questions for Grade 12 Health and Hygiene, Lesson 1.
// These are not verbatim or adapted official-exam questions.
// Answer keys were checked against the official textbook, Lesson 1, printed pages 4–10.
const verifiedAt = new Date("2026-11-17T00:00:00.000Z");
const sourceTitle = "سلامت و بهداشت ـ پایه دوازدهم، کد ۱۱۲۲۶۸، چاپ هشتم ۱۴۰۴، سازمان پژوهش و برنامه‌ریزی آموزشی";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Salamat-12_Daneshchi.iR.pdf";

export const verifiedGrade12HealthLesson1: ExamQuestion[] = [
  {
    id: "verified-health12-lesson1-who-definition-001",
    grade: "دوازدهم", track: "عمومی", subject: "سلامت و بهداشت",
    chapter: "سلامت چیست؟",
    topic: "تعریف سلامت از دیدگاه سازمان جهانی بهداشت", difficulty: "آسان",
    prompt: "کدام گزینه تعریف سازمان جهانی بهداشت از سلامت را دقیق‌تر بازتاب می‌دهد؟",
    options: [
      "برخورداری از رفاه جسمی، روانی و اجتماعی، نه صرفاً نبود بیماری یا نقص عضو",
      "نبود بیماری جسمی، حتی اگر فرد از رفاه روانی و اجتماعی برخوردار نباشد",
      "تعادل مزاج‌های چهارگانه و نداشتن درد در اندام‌ها",
      "توانایی انجام فعالیت‌های روزانه بدون نیاز به کمک دیگران"
    ],
    correctIndex: 0,
    explanation: "در تعریف سازمان جهانی بهداشت، سلامت برخورداری از رفاه جسمی، روانی و اجتماعی است و فقط به نبود بیماری یا نقص عضو محدود نمی‌شود.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل از آزمون منتشرشده؛ تطبیق با درس اول، صفحهٔ ۴ کتاب درسی."
  },
  {
    id: "verified-health12-lesson1-comprehensive-dimensions-002",
    grade: "دوازدهم", track: "عمومی", subject: "سلامت و بهداشت",
    chapter: "سلامت چیست؟",
    topic: "ابعاد تعریف جامع سلامت", difficulty: "متوسط",
    prompt: "در تعریف جامع سلامت ارائه‌شده در کتاب، کدام مجموعه از ابعاد به‌درستی کنار هم قرار گرفته‌اند؟",
    options: [
      "جسمی، روانی ـ عاطفی، خانوادگی ـ اجتماعی و معنوی",
      "جسمی، اقتصادی، سیاسی و تحصیلی",
      "روانی، شغلی، فرهنگی و اقتصادی",
      "جسمی، پزشکی، ورزشی و تغذیه‌ای"
    ],
    correctIndex: 0,
    explanation: "کتاب در تعریف جامع سلامت چهار بُعد جسمی، روانی ـ عاطفی، خانوادگی ـ اجتماعی و معنوی را در نظر می‌گیرد.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل از آزمون منتشرشده؛ تطبیق با درس اول، صفحهٔ ۵ کتاب درسی."
  },
  {
    id: "verified-health12-lesson1-hygiene-definition-003",
    grade: "دوازدهم", track: "عمومی", subject: "سلامت و بهداشت",
    chapter: "سلامت چیست؟",
    topic: "تعریف بهداشت", difficulty: "آسان",
    prompt: "کدام عبارت، مفهوم «بهداشت» را مطابق تعریف کتاب بیان می‌کند؟",
    options: [
      "درمان بیماری پس از آشکار شدن نشانه‌های آن",
      "فقط جلوگیری از ابتلا به بیماری‌های واگیر",
      "تأمین، حفظ و بالا بردن سطح سلامت",
      "مراقبت از سلامت جسمانی بدون توجه به ابعاد دیگر"
    ],
    correctIndex: 2,
    explanation: "کتاب بهداشت را تأمین، حفظ و بالا بردن سطح سلامت تعریف می‌کند؛ بنابراین بهداشت به پیشگیری و درمان محدود به یک مورد نیست.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل از آزمون منتشرشده؛ تطبیق با درس اول، صفحهٔ ۶ کتاب درسی."
  },
  {
    id: "verified-health12-lesson1-prevention-priority-004",
    grade: "دوازدهم", track: "عمومی", subject: "سلامت و بهداشت",
    chapter: "سلامت چیست؟",
    topic: "اولویت پیشگیری بر درمان", difficulty: "متوسط",
    prompt: "کدام گزینه یکی از دلایل تقدم پیشگیری بر درمان را مطابق کتاب توضیح می‌دهد؟",
    options: [
      "پیشگیری همواره به تجهیزات تخصصی و هزینهٔ بیشتری نیاز دارد.",
      "اقدام پیشگیرانه معمولاً آسان‌تر و کم‌هزینه‌تر است و می‌تواند از رنج و پیامدهای بیماری بکاهد.",
      "درمان هیچ‌گاه نمی‌تواند سلامت فرد را بهبود دهد.",
      "پیشگیری فقط برای افرادی کاربرد دارد که قبلاً بیمار شده‌اند."
    ],
    correctIndex: 1,
    explanation: "کتاب تأکید می‌کند که پیشگیری معمولاً آسان‌تر، کم‌هزینه‌تر و اطمینان‌بخش‌تر است و از درد، رنج و بخشی از پیامدهای درمان می‌کاهد.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل از آزمون منتشرشده؛ تطبیق با درس اول، صفحه‌های ۶ و ۷ کتاب درسی."
  },
  {
    id: "verified-health12-lesson1-spiritual-health-005",
    grade: "دوازدهم", track: "عمومی", subject: "سلامت و بهداشت",
    chapter: "سلامت چیست؟",
    topic: "نشانه‌های سلامت معنوی", difficulty: "متوسط",
    prompt: "فردی برای زندگی خود هدف‌های اساسی دارد، به معنویت و معاد باور دارد، امیدوار و متعهد است و می‌کوشد آرامش خود را به دیگران نیز منتقل کند. این توصیف بیش از همه با کدام بُعد سلامت سازگار است؟",
    options: [
      "سلامت جسمانی",
      "سلامت اجتماعی",
      "سلامت روانی ـ عاطفی",
      "سلامت معنوی"
    ],
    correctIndex: 3,
    explanation: "هدف داشتن، امیدواری، ایمان، تعهد و پایبندی به معنویت از نشانه‌هایی هستند که کتاب برای سلامت معنوی برمی‌شمارد.",
    sourceStatus: "curriculum-verified", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل از آزمون منتشرشده؛ تطبیق با درس اول، صفحهٔ ۹ کتاب درسی."
  }
];
