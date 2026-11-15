import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس نهم «ذوق لطیف»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۷۹ تا ۸۵ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی: https://www.daneshchi.ir/پاسخ-سوالات-درس-نهم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson9: ExamQuestion[] = [
  {
    id: "grade11-persian2-zough-latif-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "ذوق لطیف",
    topic: "واژگان", difficulty: "آسان",
    prompt: "واژهٔ «مفاتیح» در متن درس به چه معناست؟",
    options: ["قفل‌ها", "کلیدها", "گنج‌ها", "درها"],
    correctIndex: 1,
    explanation: "«مفاتیح» جمع «مفتاح» و به معنای کلیدهاست.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-zough-latif-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "ذوق لطیف",
    topic: "سبک‌شناسی", difficulty: "متوسط",
    prompt: "کدام عبارت درس، ویژگی «سهل ممتنع» بودن سبک سعدی را بیان می‌کند؟",
    options: ["سخن او دشوار و دور از زبان مردم است", "سخنش به سخن همه شبیه است، اما به هیچ‌کس شبیه نیست", "همهٔ آثارش فقط به زبان محاوره نوشته شده‌اند", "در شعر او هیچ آرایه‌ای دیده نمی‌شود"],
    correctIndex: 1,
    explanation: "این عبارت به ظاهر ساده و آشنا بودن سخن سعدی و در عین حال دشواربودن همانندآوری آن اشاره دارد؛ ویژگی سهل ممتنع.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-zough-latif-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "ذوق لطیف",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در مصراع «بیا که یاد تو آرامشی است طوفانی»، ترکیب «آرامشی طوفانی» نمونهٔ کدام آرایه است؟",
    options: ["تضاد ساده", "متناقض‌نما", "واج‌آرایی", "تلمیح"],
    correctIndex: 1,
    explanation: "آرامش و طوفان در ظاهر ناسازگارند، اما در کنار هم معنایی تازه می‌سازند؛ این ترکیب متناقض‌نماست.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-zough-latif-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "ذوق لطیف",
    topic: "قلمرو فکری و معنی عبارت", difficulty: "متوسط",
    prompt: "در متن درس، عبارت «سراچهٔ ذهنم آماس می‌کرد» چه مفهومی دارد؟",
    options: ["ذهنم از یادآوری خاطرات خسته می‌شد", "بر معلومات و دانسته‌های ذهنم افزوده می‌شد", "از فکرکردن ناتوان می‌شدم", "ذهنم از نگرانی آشفته می‌شد"],
    correctIndex: 1,
    explanation: "در پاسخ فعالیت درس، این عبارت به افزوده‌شدن معلومات ذهن اشاره دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-zough-latif-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "ذوق لطیف",
    topic: "دستور زبان و نقش‌های دستوری", difficulty: "متوسط",
    prompt: "در جملهٔ «خوب و بد را به عنوان مشیت الهی می‌پذیرفت»، نقش دستوری گروه «خوب و بد» چیست؟",
    options: ["نهاد", "مفعول", "متمم", "مسند"],
    correctIndex: 1,
    explanation: "«خوب و بد» چیزی است که پذیرفته می‌شود؛ بنابراین مفعول فعل «می‌پذیرفت» است. نهاد در جمله به قرینهٔ متن حذف شده است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
