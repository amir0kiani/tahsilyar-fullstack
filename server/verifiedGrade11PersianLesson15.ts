import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس پانزدهم «کبوتر طوق‌دار»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال‌ها مستقل و تألیفی‌اند و از آزمون منتشرشده کپی نشده‌اند؛ متن درس و کارگاه متن‌پژوهی صفحات ۱۱۷ تا ۱۲۱ نسخهٔ رسمی چاپ دهم ۱۴۰۵ با منبع کمکی بازبینی پاسخ تطبیق داده شده است: https://magerta.ir/culture/literature/answer-text-study-workshop-lesson-fifteenth-eleventh-persian/";

export const verifiedGrade11PersianLesson15: ExamQuestion[] = [
  {
    id: "grade11-persian2-lesson15-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کبوتر طوق‌دار",
    topic: "واژگان", difficulty: "متوسط",
    prompt: "در جملهٔ «گرازان به تگ ایستاد»، فعل «ایستاد» چه معنایی دارد؟",
    options: ["متوقف شد","با شتاب شروع به دویدن کرد","به انتظار ایستاد","به زمین افتاد"],
    correctIndex: 1,
    explanation: "در این بافت، «ایستاد» به معنای آغازیدن و شروع به دویدن است، نه توقف کردن.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson15-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کبوتر طوق‌دار",
    topic: "واژگان", difficulty: "متوسط",
    prompt: "در متن «کبوتر طوق‌دار»، واژهٔ «مظاهرت» به چه معناست؟",
    options: ["پشتیبانی و یاری","سرزنش و نکوهش","شکار و صید","آزادی و رهایی"],
    correctIndex: 0,
    explanation: "«مظاهرت» به معنای پشتیبانی و یاری‌رسانی است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson15-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کبوتر طوق‌دار",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در عبارت «زه‌آب دیدگان بگشاد و بر رخسار جوی‌ها براند»، واژهٔ «جوی‌ها» چه مفهومی را به‌صورت استعاری می‌رساند؟",
    options: ["رودهای واقعی","اشک فراوان","باران بهاری","جویبارهای باغ"],
    correctIndex: 1,
    explanation: "«جوی‌ها» استعاره از اشک بسیار است؛ اشک‌ها به جویبار تشبیه شده‌اند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson15-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کبوتر طوق‌دار",
    topic: "کنایه", difficulty: "آسان",
    prompt: "کدام عبارت در متن درس، کنایه از انسان باتجربه است؟",
    options: ["دل از ما برنگیرد","گرم و سرد روزگار دیده","در بند بلا بسته","سر خویش گرفت"],
    correctIndex: 1,
    explanation: "«گرم و سرد روزگار دیده» کنایه از فرد باتجربه و آزموده است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson15-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "کبوتر طوق‌دار",
    topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "کبوتر طوق‌دار برای رهایی گروه از دام چه راهکاری پیشنهاد می‌کند؟",
    options: ["هر کبوتر جداگانه برای رهایی تلاش کند","کبوتران با همکاری یکدیگر دام را از جای برکنند","تا آمدن صیاد بی‌حرکت بمانند","تنها کبوتر طوق‌دار از دام خارج شود"],
    correctIndex: 1,
    explanation: "او اختلاف و تلاش فردی را کنار می‌گذارد و با همکاری جمعی، همهٔ کبوتران دام را با هم از جا می‌کنند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
