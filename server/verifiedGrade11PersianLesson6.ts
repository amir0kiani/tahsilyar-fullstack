import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس ششم «پروردهٔ عشق»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۵۲ تا ۵۶ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی: https://www.daneshchi.ir/پاسخ-سوالات-درس-ششم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson6: ExamQuestion[] = [
  {
    id: "grade11-persian2-parvarde-eshgh-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "پروردهٔ عشق",
    topic: "قالب‌های شعری و ادبیات داستانی", difficulty: "متوسط",
    prompt: "مهم‌ترین دلیل کاربرد فراوان قالب مثنوی در منظومه‌های داستانی چیست؟",
    options: ["ثابت‌بودن تعداد بیت‌ها و یکسان‌بودن قافیه", "نداشتن محدودیت تعداد ابیات و داشتن قافیهٔ مستقل در هر بیت", "نداشتن وزن عروضی", "ضرورت کوتاه‌بودن روایت"],
    correctIndex: 1,
    explanation: "در مثنوی تعداد ابیات محدود نیست و هر بیت قافیهٔ مستقل دارد؛ بنابراین شاعر می‌تواند داستانی بلند را بدون محدودیت قافیه‌پردازی روایت کند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-parvarde-eshgh-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "پروردهٔ عشق",
    topic: "واژگان", difficulty: "آسان",
    prompt: "در بیت «جهد بر توست و بر خدا توفیق»، واژهٔ «جهد» چه معنایی دارد؟",
    options: ["آسایش", "کوشش و تلاش", "پاداش", "سرنوشت"],
    correctIndex: 1,
    explanation: "«جهد» در این بیت به معنای سعی و کوشش است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-parvarde-eshgh-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "پروردهٔ عشق",
    topic: "دستور زبان و نقش ضمیر پیوسته", difficulty: "متوسط",
    prompt: "در واژهٔ «سرشتم» در مصراع «پروردهٔ عشق شد سرشتم»، ضمیر پیوستهٔ «ـم» چه نقشی دارد؟",
    options: ["مفعول", "نهاد", "مضاف‌الیه", "متمم"],
    correctIndex: 2,
    explanation: "«سرشتم» به معنی «سرشتِ من» است؛ بنابراین ضمیر پیوستهٔ «ـم» نقش مضاف‌الیه دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-parvarde-eshgh-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "پروردهٔ عشق",
    topic: "کنایه", difficulty: "متوسط",
    prompt: "در تعبیر «حلقه در گوش نهادن» در شعر درس، کدام مفهوم اراده شده است؟",
    options: ["آراستن ظاهر", "اطاعت و فرمان‌برداری", "آغاز سفر", "شهرت‌یافتن"],
    correctIndex: 1,
    explanation: "حلقه در گوش نهادن کنایه از پذیرفتن فرمان و اطاعت‌کردن است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-parvarde-eshgh-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "پروردهٔ عشق",
    topic: "کنایه و مفهوم", difficulty: "متوسط",
    prompt: "در ترکیب «آسمان‌گیر» در بیت «چون رایت عشق آن جهان‌گیر / شد چون مه لیلی آسمان‌گیر»، کدام مفهوم کنایی برجسته است؟",
    options: ["پنهان و ناشناخته‌شدن", "مشهور و فراگیرشدن", "آرام و خاموش‌شدن", "از یاد رفتن"],
    correctIndex: 1,
    explanation: "«آسمان‌گیر» در این بیت کنایه از معروف و مشهورشدن و گسترش‌یافتن آوازه است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
