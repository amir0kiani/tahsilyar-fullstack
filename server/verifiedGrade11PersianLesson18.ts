import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-15T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال‌ها مستقل و تألیفی‌اند و از آزمون منتشرشده کپی نشده‌اند؛ متن شعر «خوان عدل» در صفحات ۱۴۴ تا ۱۴۵ و کارگاه متن‌پژوهی در صفحات ۱۴۶ تا ۱۴۷ نسخه رسمی چاپ دهم ۱۴۰۵، با تطبیق واژگان و مفاهیم متن، بازبینی شده است. AUTHORED/ORIGINAL.";

export const verifiedGrade11PersianLesson18: ExamQuestion[] = [
  {
    id: "grade11-persian2-lesson18-authored-01", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خوان عدل", topic: "واژگان", difficulty: "آسان",
    prompt: "واژه «خوان» در عنوان و متن شعر «خوان عدل» به چه معناست؟",
    options: ["سفره گسترده", "کتاب و دفتر", "راه و مسیر", "میدان نبرد"],
    correctIndex: 0,
    explanation: "«خوان» در این کاربرد به معنای سفره گسترده است؛ «خوان عدل» تصویری از گستردگی عدالت الهی برای همگان می‌سازد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson18-authored-02", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خوان عدل", topic: "قلمرو فکری", difficulty: "آسان",
    prompt: "در بند نخست شعر، اشاره به شرق، غرب، شمال و جنوب چه مفهومی را برجسته می‌کند؟",
    options: ["گستردگی فرمانروایی و احاطه خداوند بر سراسر جهان", "برتری یک سرزمین بر سرزمین‌های دیگر", "تقسیم جهان به چهار قلمرو مستقل", "تغییر مسیر حرکت خورشید"],
    correctIndex: 0,
    explanation: "یادکردن از همه جهت‌های جغرافیایی نشان می‌دهد که سراسر جهان در قلمرو قدرت و تدبیر خداوند قرار دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson18-authored-03", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خوان عدل", topic: "قلمرو ادبی", difficulty: "متوسط",
    prompt: "ترکیب «عدل خوان گسترده بر همگان» بر کدام تصویر ادبی تکیه دارد؟",
    options: ["تصویر عدالت الهی به‌صورت خوانی گسترده برای همگان نمایش داده شده است", "عدالت به شمشیری برای مجازات تشبیه شده است", "جهان به زندانی تاریک تشبیه شده است", "انسان به داوری نشسته بر تخت تشبیه شده است"],
    correctIndex: 0,
    explanation: "«خوان» به معنای سفره است؛ گسترده‌شدن خوان عدل برای همگان، تصویری از فراگیری و همگانی‌بودن عدالت الهی می‌سازد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson18-authored-04", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خوان عدل", topic: "قلمرو زبانی", difficulty: "متوسط",
    prompt: "در عبارت «هر نفسی را دو نعمت است: دم فرودادن و برآمدنش»، دو نعمت مورد اشاره کدام‌اند؟",
    options: ["دم فروبردن و بیرون‌دادن آن", "خوابیدن و بیدارشدن", "خوردن و آشامیدن", "دیدن و شنیدن"],
    correctIndex: 0,
    explanation: "شاعر دو مرحله دم و بازدم را دو نعمت می‌شمارد و به ارزش هر لحظه از زندگی توجه می‌دهد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-lesson18-authored-05", grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "خوان عدل", topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "مفهوم بیت «تو شکر خدا کن به هنگام رنج / و شکر او کن به وقت رستن از رنج» چیست؟",
    options: ["سپاسگزاری از خداوند هم در دشواری و هم هنگام رهایی از آن", "سپاسگزاری فقط پس از رسیدن به آسایش", "پرهیز از تلاش برای رهایی از دشواری‌ها", "نادیده‌گرفتن نعمت‌ها در روزهای سخت"],
    correctIndex: 0,
    explanation: "شاعر شکرگزاری را به زمان آسایش محدود نمی‌کند و سپاس در هنگام رنج و هنگام رهایی از آن را یادآور می‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
