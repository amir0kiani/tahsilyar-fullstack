import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-09T00:00:00.000Z");
const sourceTitle = "آزمون نهایی تاریخ (۲) پایه یازدهم انسانی – خرداد ۱۴۰۴ (دفترچه و راهنمای نمره‌گذاری)";
const sourceUrl = "https://dl.novinkonkor.com/nahaye/11/ensani/1404/khordad/tarikh_2.pdf";
const reviewerNote = "سؤال به‌صورت چهارگزینه‌ای مستقل از محتوای سؤال تشریحی امتحان نهایی بازنویسی شده است؛ پاسخ با راهنمای نمره‌گذاری رسمی همان آزمون تطبیق داده شد.";

export const verifiedGrade11HumanitiesFinalHistoryBatch1: ExamQuestion[] = [
  {
    id: "final-human11-history-seljuk-manzikert-01",
    grade: "یازدهم", track: "انسانی", subject: "تاریخ",
    chapter: "ایران در دوران غزنوی، سلجوقی و خوارزمشاهی", topic: "نبرد ملازگرد",
    difficulty: "متوسط",
    prompt: "در نبرد ملازگرد، سپاه سلجوقی به فرماندهی کدام فرمانروا سپاه امپراتوری روم شرقی را شکست داد؟",
    options: ["آلپ ارسلان", "طغرل", "ملکشاه", "سنجر"],
    correctIndex: 0,
    explanation: "پیروزی سلجوقیان در نبرد ملازگرد در زمان آلپ ارسلان رخ داد؛ طغرل فرمانروای این نبرد نبود.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴", sourceQuestionNumber: "۱-ج", verifiedAt, reviewerNote
  },
  {
    id: "final-human11-history-seljuk-urban-class-02",
    grade: "یازدهم", track: "انسانی", subject: "تاریخ",
    chapter: "ایران در دوران غزنوی، سلجوقی و خوارزمشاهی", topic: "ساختار اجتماعی شهر در دوره سلجوقی",
    difficulty: "آسان",
    prompt: "بر اساس محتوای تاریخ یازدهم، در دوره سلجوقی کدام گروه اجتماعی به یکی از مهم‌ترین گروه‌های جامعهٔ شهری تبدیل شد؟",
    options: ["بازرگانان", "بردگان درباری", "دهقانان روستایی", "سپاهیان مرزنشین"],
    correctIndex: 0,
    explanation: "راهنمای نمره‌گذاری آزمون نهایی خرداد ۱۴۰۴، بازرگانان را پاسخ این پرسش معرفی می‌کند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴", sourceQuestionNumber: "۵-ب", verifiedAt, reviewerNote
  },
  {
    id: "final-human11-history-seljuk-iqta-03",
    grade: "یازدهم", track: "انسانی", subject: "تاریخ",
    chapter: "ایران در دوران غزنوی، سلجوقی و خوارزمشاهی", topic: "نظام اقطاع",
    difficulty: "متوسط",
    prompt: "در دورهٔ سلجوقی، اصطلاح «اقطاع» به کدام مفهوم اشاره داشت؟",
    options: [
      "واگذاری زمین یا درآمد آن به افراد نظامی و صاحبان برخی مشاغل دیوانی",
      "معافیت همگانی کشاورزان از پرداخت مالیات",
      "تقسیم اراضی وقفی میان بازرگانان",
      "واگذاری حق انتخاب وزیر به بزرگان شهر"
    ],
    correctIndex: 0,
    explanation: "در راهنمای نمره‌گذاری آزمون نهایی، اقطاع در عصر سلجوقی نوعی واگذاری زمین به افراد نظامی یا صاحبان مشاغل دیوانی تعریف شده است.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴", sourceQuestionNumber: "۶-ب", verifiedAt, reviewerNote
  },
  {
    id: "final-human11-history-seljuk-khwarazmian-ministry-04",
    grade: "یازدهم", track: "انسانی", subject: "تاریخ",
    chapter: "ایران در دوران غزنوی، سلجوقی و خوارزمشاهی", topic: "دیوان وزارت و جایگاه وزیر",
    difficulty: "متوسط",
    prompt: "کدام گزینه تفاوت جایگاه وزیر و دیوان وزارت را در دورهٔ سلجوقی و خوارزمشاهی درست بیان می‌کند؟",
    options: [
      "در دورهٔ سلجوقی دیوان وزارت جایگاه برجسته‌ای داشت؛ در دورهٔ خوارزمشاهی قدرت و نقش وزیر کاهش یافت و گاهی این منصب حذف شد.",
      "در هر دو دوره، وزیر هیچ نقشی در ادارهٔ حکومت نداشت.",
      "در دورهٔ خوارزمشاهی قدرت وزیر بیشتر از دورهٔ سلجوقی بود.",
      "در دورهٔ سلجوقی منصب وزارت حذف شد، اما در دورهٔ خوارزمشاهی به اوج قدرت رسید."
    ],
    correctIndex: 0,
    explanation: "طبق راهنمای نمره‌گذاری، دیوان وزارت در عصر سلجوقی به جایگاه مهمی رسید؛ اما در عصر خوارزمشاهی نقش وزیر به‌شدت کاهش یافت و در مواردی منصب او حذف شد.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴", sourceQuestionNumber: "۷-ب", verifiedAt, reviewerNote
  },
  {
    id: "final-human11-history-ghaznavid-india-campaign-05",
    grade: "یازدهم", track: "انسانی", subject: "تاریخ",
    chapter: "ایران در دوران غزنوی، سلجوقی و خوارزمشاهی", topic: "انگیزهٔ حمله‌های محمود غزنوی به هند",
    difficulty: "متوسط",
    prompt: "بر اساس راهنمای نمره‌گذاری امتحان نهایی خرداد ۱۴۰۴، کدام مورد از هدف‌های حملهٔ محمود غزنوی به هند بود؟",
    options: [
      "دستیابی به ثروت هند و غارت معابد و پرستشگاه‌های آن سرزمین",
      "گسترش کشاورزی آبی در شمال هند",
      "انتقال پایتخت غزنویان به دهلی",
      "ایجاد اتحادیهٔ بازرگانی با امپراتوری روم شرقی"
    ],
    correctIndex: 0,
    explanation: "راهنمای نمره‌گذاری، دستیابی به ثروت فراوان هند و غارت معابد و پرستشگاه‌های آن سرزمین را از هدف‌های این حمله‌ها می‌داند.",
    sourceStatus: "official-exam-adapted", sourceTitle, sourceUrl, sourceYear: "۱۴۰۴", sourceQuestionNumber: "۱۱", verifiedAt, reviewerNote
  }
];
