import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس درس قاضی بُست، کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن، گزینه‌ها و پاسخ با متن درس قاضی بُست، کارگاه متن‌پژوهی و واژه‌نامهٔ صفحات ۱۶ تا ۲۱ کتاب رسمی چاپ دهم ۱۴۰۵ تطبیق داده شده‌اند.";

export const verifiedGrade11PersianLesson2: ExamQuestion[] = [
  {
    id: "grade11-persian2-qazi-bost-authored-01",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "قاضی بُست",
    topic: "درک متن و انگیزهٔ شخصیت",
    difficulty: "متوسط",
    prompt: "چرا قاضی بوبکر و پسرش پولی را که امیر مسعود برای آنان فرستاده بود نپذیرفتند؟",
    options: [
      "آن پول را برای لشکر لازم داشتند.",
      "خود را بی‌نیاز می‌دانستند و از مسئولیت و حساب‌وکتاب مالِ مشکوک پرهیز می‌کردند.",
      "امیر دستور داده بود پول بازگردانده شود.",
      "پول در راه گم شده بود."
    ],
    correctIndex: 1,
    explanation: "قاضی می‌گوید به دارایی حلال خود قانع است، نیاز بیشتری ندارد و نمی‌خواهد مسئولیت مالی را بپذیرد که دربارهٔ منشأ آن اطمینان ندارد.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-qazi-bost-authored-02",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "قاضی بُست",
    topic: "ویژگی شخصیتی",
    difficulty: "آسان",
    prompt: "کدام ویژگی اخلاقی قاضی بُست در گفت‌وگو با بونصر برجسته‌تر است؟",
    options: [
      "طمع‌ورزی و علاقه به مال‌اندوزی",
      "قناعت و پرهیز از پذیرفتن مالِ شبهه‌ناک",
      "ترس از مسئولیت و فرار از پاسخ‌گویی",
      "بی‌اعتنایی به نیازمندان"
    ],
    correctIndex: 1,
    explanation: "قاضی با قناعت به دارایی حلال خود و نگرانی از مسئولیت اخرویِ مالِ مشکوک، پاک‌دستی و استقلال رأی نشان می‌دهد.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-qazi-bost-authored-03",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "قاضی بُست",
    topic: "دستور زبان: جملهٔ مجهول",
    difficulty: "متوسط",
    prompt: "در کارگاه متن‌پژوهی، صورت مجهول جملهٔ معلومِ «مریم کتاب می‌خواند» کدام است؟",
    options: [
      "کتاب مریم می‌خواند.",
      "کتاب خوانده می‌شود.",
      "مریم خوانده می‌شود.",
      "کتاب می‌خواند."
    ],
    correctIndex: 1,
    explanation: "در ساخت مجهول، مفعول جملهٔ معلوم به جایگاه نهاد می‌آید و فعل با ساخت مناسبِ «شدن» ساخته می‌شود؛ نمونهٔ کتاب «کتاب خوانده می‌شود» است.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-qazi-bost-authored-04",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "قاضی بُست",
    topic: "معنای واژه در بافت",
    difficulty: "متوسط",
    prompt: "در عبارت «از مردم محجوب گشت»، واژهٔ «محجوب» چه معنایی دارد؟",
    options: [
      "پنهان و دور از دید مردم",
      "بخشنده و دست‌ودل‌باز",
      "دلیر و بی‌باک",
      "ناتوان و درمانده"
    ],
    correctIndex: 0,
    explanation: "در این بافت، «محجوب گشت» به معنای از دید مردم پنهان و دور شد؛ معنای واژه باید با توجه به کاربرد آن در جمله تعیین شود.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  },
  {
    id: "grade11-persian2-qazi-bost-authored-05",
    grade: "یازدهم",
    track: "عمومی",
    subject: "فارسی",
    chapter: "قاضی بُست",
    topic: "شناخت مأخذ متن",
    difficulty: "آسان",
    prompt: "متن درس «قاضی بُست» از کدام اثر ادبی ـ تاریخی برگرفته شده است؟",
    options: [
      "تاریخ بیهقی",
      "گلستان سعدی",
      "بوستان سعدی",
      "قابوس‌نامه"
    ],
    correctIndex: 0,
    explanation: "در پایان متن درس، مأخذ آن «تاریخ بیهقی» و نویسندهٔ آن ابوالفضل بیهقی معرفی شده است.",
    sourceStatus: "reviewed",
    sourceTitle,
    sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote
  }
];
