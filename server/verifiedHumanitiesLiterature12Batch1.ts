import type { ExamQuestion } from "./examBank";

const questionUrl = "https://dl.novinkonkor.com/nahaye/12/moaref/1405/soal-oloom-fonon-12-m-1405.pdf";
const answerUrl = "https://dl.novinkonkor.com/nahaye/12/ensani/moshtarak/1405/tir/javab-oloom-fonon-12-1405-tir-e-m.pdf";
const sourceTitle = "آزمون نهایی علوم و فنون ادبی ۳ دوازدهم انسانی ـ ۱۲ مرداد ۱۴۰۵، مرکز ارزشیابی و تضمین کیفیت نظام آموزش و پرورش";
const reviewerNote = "صورت سؤال به‌صورت تمرین چهارگزینه‌ای مستقل بازنویسی شده و عین متن آزمون نیست. پاسخ با راهنمای رسمی نمره‌گذاری همان آزمون تطبیق داده شده است.";
const verifiedAt = new Date("2026-11-15T00:00:00.000Z");

type QuestionSeed = Omit<ExamQuestion, "sourceStatus" | "sourceTitle" | "sourceUrl" | "sourceAnswerUrl" | "sourceYear" | "verifiedAt" | "reviewerNote">;

const questionSeeds: QuestionSeed[] = [
  {
    id: "verified-human12-literature-1405-20century-newspaper-01",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تاریخ ادبیات قرن چهاردهم (دوره معاصر و انقلاب اسلامی)",
    topic: "روزنامه‌نگاری دوره معاصر", difficulty: "آسان",
    prompt: "روزنامهٔ «قرن بیستم» را چه کسی منتشر می‌کرد؟",
    options: ["میرزاده عشقی", "علی‌اکبر دهخدا", "ملک‌الشعرای بهار", "فرخی یزدی"], correctIndex: 0,
    explanation: "روزنامهٔ «قرن بیستم» به میرزاده عشقی تعلق داشت؛ پاسخ‌نامهٔ رسمی «عشقی» یا «عشقی میرزا» را می‌پذیرد.",
    sourceQuestionNumber: "۱"
  },
  {
    id: "verified-human12-literature-1405-farrokhi-influences-02",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تاریخ ادبیات قرن چهاردهم (دوره معاصر و انقلاب اسلامی)",
    topic: "تأثیرپذیری شاعران معاصر", difficulty: "متوسط",
    prompt: "فرخی یزدی در میان شاعران گذشته، به‌ویژه از کدام دو شاعر تأثیر پذیرفته بود؟",
    options: ["حافظ و انوری", "سعدی و مسعود سعد", "فردوسی و نظامی", "مولوی و عطار"], correctIndex: 1,
    explanation: "طبق راهنمای تصحیح رسمی، پاسخ درست «سعدی و مسعود سعد» است.",
    sourceQuestionNumber: "۲"
  },
  {
    id: "verified-human12-literature-1405-zero-degree-period-03",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تاریخ ادبیات قرن چهاردهم (دوره معاصر و انقلاب اسلامی)",
    topic: "دورهٔ ادبی رمان‌های معاصر", difficulty: "متوسط",
    prompt: "رمان «مدار صفر درجه» اثر احمد محمود، در کدام دورهٔ ادبی قرار می‌گیرد؟",
    options: ["دورهٔ بیداری", "دورهٔ انقلاب اسلامی", "دورهٔ بازگشت ادبی", "دورهٔ سبک خراسانی"], correctIndex: 1,
    explanation: "راهنمای تصحیح آزمون، گزینهٔ «انقلاب اسلامی» را برای این بخش تأیید می‌کند.",
    sourceQuestionNumber: "۳ ـ بخش الف"
  },
  {
    id: "verified-human12-literature-1405-sovashun-04",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تاریخ ادبیات قرن چهاردهم (دوره معاصر و انقلاب اسلامی)",
    topic: "شناخت آثار داستانی معاصر", difficulty: "آسان",
    prompt: "کدام رمان، زندگی زری و یوسف و اوضاع اجتماعی مردم فارس را در خلال جنگ جهانی دوم روایت می‌کند؟",
    options: ["مدار صفر درجه", "سووشون", "کلیدر", "همسایه‌ها"], correctIndex: 1,
    explanation: "اثر موردنظر «سووشون» نوشتهٔ سیمین دانشور است؛ پاسخ‌نامهٔ رسمی همین عنوان را تأیید می‌کند.",
    sourceQuestionNumber: "۳ ـ بخش ب"
  },
  {
    id: "verified-human12-literature-1405-iraaj-mirza-style-05",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تاریخ ادبیات قرن چهاردهم (دوره معاصر و انقلاب اسلامی)",
    topic: "ویژگی‌های سبک شاعران معاصر", difficulty: "متوسط",
    prompt: "کدام شاعر در به‌کارگیری تعبیرهای عامیانه، سرودن شعرهای ساده و روان و طنز و هزل مهارت داشت؟",
    options: ["ایرج میرزا", "مهدی اخوان ثالث", "صبای کاشانی", "شهریار"], correctIndex: 0,
    explanation: "در راهنمای تصحیح رسمی، ویژگی‌های یادشده به ایرج میرزا نسبت داده شده است.",
    sourceQuestionNumber: "۵ ـ بخش الف"
  },
  {
    id: "verified-human12-literature-1405-translation-bidari-06",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "تاریخ ادبیات قرن‌های دوازدهم و سیزدهم (دوره بازگشت و بیداری)",
    topic: "ترجمه در دورهٔ بیداری", difficulty: "متوسط",
    prompt: "کدام گزاره دربارهٔ ترجمه در دورهٔ بیداری نادرست است؟",
    options: [
      "ترجمهٔ آثار اروپایی در رشد آگاهی و تحول اندیشهٔ ایرانیان پیش از مشروطه مؤثر بود.",
      "ترجمه در ایران با تأسیس چاپخانه در زمان فتحعلی‌شاه آغاز شد.",
      "«تاریخ بیداری ایرانیان» اثر جیمز موریه است.",
      "هر سه گزارهٔ بالا درست‌اند."
    ], correctIndex: 2,
    explanation: "گزارهٔ سوم نادرست است: «تاریخ بیداری ایرانیان» اثر ناظم‌الاسلام کرمانی است؛ جیمز موریه نویسندهٔ «سرگذشت حاجی‌بابای اصفهانی» است. راهنمای تصحیح رسمی گزینهٔ «ج» را پاسخ می‌داند.",
    sourceQuestionNumber: "۴"
  }
];

export const verifiedHumanitiesLiterature12Batch1: ExamQuestion[] = questionSeeds.map((question) => ({
  ...question,
  sourceStatus: "official-exam-adapted",
  sourceTitle,
  sourceUrl: questionUrl,
  sourceAnswerUrl: answerUrl,
  sourceYear: "۱۴۰۵",
  verifiedAt,
  reviewerNote
}));
