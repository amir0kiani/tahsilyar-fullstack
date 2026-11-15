import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، چاپ دهم ۱۴۰۵، سازمان پژوهش و برنامه‌ریزی آموزشی";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن، مفهوم، گزینه‌ها و پاسخ با درس «نیکی» و کارگاه متن‌پژوهی و گنج حکمت صفحات ۱۲ تا ۱۵ کتاب رسمی چاپ دهم ۱۴۰۵ تطبیق داده شده‌اند.";

export const verifiedGrade11PersianLesson1: ExamQuestion[] = [
  {
    id: "grade11-persian2-niki-authored-01",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "نیکی",
    topic: "پیام و مفهوم درس",
    difficulty: "متوسط",
    prompt: "پیام محوری درس «نیکی» کدام است؟",
    options: [
      "انسان باید تنها به آسایش خود بیندیشد.",
      "نیکی زمانی ارزشمند است که به سود و آسایش دیگران بینجامد.",
      "کمک‌کردن فقط در برابر دریافت پاداش درست است.",
      "توان جسمی از همت و نیکوکاری مهم‌تر است."
    ],
    correctIndex: 1,
    explanation: "حکایت و بیت پایانی درس، ارزش نیکی را در سودرساندن به مردم و آسایش‌بخشیدن به دیگران نشان می‌دهد.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-niki-authored-02",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "نیکی",
    topic: "درک مفهوم بیت",
    difficulty: "متوسط",
    prompt: "مفهوم بیت «خدا را به آن بنده بخشایش است / که خلق از وجودش در آسایش است» کدام است؟",
    options: [
      "ارزش انسان فقط به دارایی او وابسته است.",
      "شایستگی انسان در آن است که دیگران از وجود او آسوده و بهره‌مند باشند.",
      "آسایش فردی بر آسایش دیگران مقدم است.",
      "نیکی باید بدون توجه به نیاز دیگران انجام شود."
    ],
    correctIndex: 1,
    explanation: "بیت، نیکوکاری را با سودرساندن به مردم و فراهم‌کردن آسایش برای آنان پیوند می‌دهد.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-niki-authored-03",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "نیکی",
    topic: "واژگان",
    difficulty: "آسان",
    prompt: "در واژه‌نامهٔ درس «نیکی»، واژهٔ «شَل» به چه معناست؟",
    options: [
      "تند و چابک",
      "ازکارافتاده و ناتوان در دست‌وپا",
      "خشمگین و درنده",
      "اندوهگین و نگران"
    ],
    correctIndex: 1,
    explanation: "در واژه‌نامهٔ همین درس، «شَل» به کسی گفته می‌شود که دست و پایش از کار افتاده باشد.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-niki-authored-04",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "نیکی",
    topic: "گنج حکمت: همت",
    difficulty: "متوسط",
    prompt: "حکایت «همت» با تصویر مورچه‌ای که باری سنگین را می‌برد، بر کدام نکته تأکید می‌کند؟",
    options: [
      "کار دشوار فقط با نیروی جسم انجام می‌شود.",
      "همت و اراده می‌تواند بر دشواری غلبه کند و از نیروی بدنی فراتر رود.",
      "ارزش تلاش به اندازهٔ بار وابسته است.",
      "برای رسیدن به هدف باید از کوشش فردی پرهیز کرد."
    ],
    correctIndex: 1,
    explanation: "نتیجهٔ حکایت این است که بارهای بزرگ با نیروی همت برداشته می‌شوند، نه صرفاً با قوت تن.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-niki-authored-05",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "نیکی",
    topic: "آرایهٔ جناس",
    difficulty: "متوسط",
    prompt: "در عبارت «گوش بر چنگ است و دل در چنگ نیست»، تکرار واژهٔ «چنگ» با دو معنای متفاوت چه آرایه‌ای پدید می‌آورد؟",
    options: [
      "جناس تام",
      "تضاد",
      "تشبیه",
      "مراعات نظیر"
    ],
    correctIndex: 0,
    explanation: "«چنگ» در کاربرد نخست به ساز و در کاربرد دوم به دست یا پنجه اشاره دارد؛ یکسانی لفظ و تفاوت معنا جناس تام می‌سازد.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  }
];
