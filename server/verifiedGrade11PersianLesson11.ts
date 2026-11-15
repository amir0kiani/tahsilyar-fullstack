import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-14T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی فارسی (۲) پایه یازدهم، کد 111201، درس یازدهم «یاران عاشق»، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Farsi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون منتشرشده؛ متن درس و کارگاه متن‌پژوهی صفحات ۹۲ تا ۹۴ کتاب با پاسخ‌نامهٔ آموزشی تطبیق داده شده‌اند. منبع کمکی برای بازبینی پاسخ‌ها: https://www.daneshchi.ir/پاسخ-سوالات-درس-یازدهم-فارسی-یازدهم/";

export const verifiedGrade11PersianLesson11: ExamQuestion[] = [
  {
    id: "grade11-persian2-yaran-ashegh-authored-01",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "یاران عاشق",
    topic: "واژگان", difficulty: "آسان",
    prompt: "واژهٔ «منکر» در بیت «منکر آیینه باشد چشم کور» به چه معناست؟",
    options: ["پذیرنده","انکارکننده و تکذیب‌کننده","تماشاگر","راهنما"],
    correctIndex: 1,
    explanation: "«منکر» به معنای انکارکننده و کسی است که چیزی را نمی‌پذیرد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-yaran-ashegh-authored-02",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "یاران عاشق",
    topic: "واژگان", difficulty: "متوسط",
    prompt: "واژهٔ «مدار» در عبارت «جز بر ارادت تو مسیر و مدار نیست» چه معنایی دارد؟",
    options: ["اندازه و معیار","مسیر گردش و چرخش","گفت‌وگو و مناظره","آرامش و سکون"],
    correctIndex: 1,
    explanation: "«مدار» در این بافت به معنای مسیر گردش و چرخش است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-yaran-ashegh-authored-03",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "یاران عاشق",
    topic: "آرایه‌های ادبی", difficulty: "متوسط",
    prompt: "در عبارت «بزن زخم، این مرهم عاشق است»، کدام ویژگی ادبی برجسته شده است؟",
    options: ["تشبیه","متناقض‌نما","واج‌آرایی","حسن تعلیل"],
    correctIndex: 1,
    explanation: "زخم که معمولاً آسیب‌زننده است، در کنار مرهم که درمان‌کننده است معنایی متناقض‌نما می‌سازد.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-yaran-ashegh-authored-04",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "یاران عاشق",
    topic: "قالب و مضمون", difficulty: "متوسط",
    prompt: "کدام گزینه مقایسهٔ درستی میان شعر «یاران عاشق» و «زاغ و کبک» ارائه می‌کند؟",
    options: ["هر دو غزل‌اند و موضوع هر دو عاشقانه است","هر دو مثنوی‌اند؛ زاغ و کبک تعلیمی و یاران عاشق دربارهٔ ایثار و فداکاری است","هر دو قصیده‌اند و موضوع هر دو طبیعت است","یاران عاشق مثنوی و زاغ و کبک رباعی است"],
    correctIndex: 1,
    explanation: "هر دو شعر در قالب مثنوی‌اند؛ اما «زاغ و کبک» تعلیمی و «یاران عاشق» در حوزهٔ ادبیات انقلاب اسلامی و ایثار است.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  },
  {
    id: "grade11-persian2-yaran-ashegh-authored-05",
    grade: "یازدهم", track: "عمومی", subject: "فارسی", chapter: "یاران عاشق",
    topic: "قلمرو فکری", difficulty: "متوسط",
    prompt: "مقصود اصلی از «یاران عاشق» در شعر درس چیست؟",
    options: ["سفرکنندگان و جهانگردان","شهیدانی که با ایثار و نثار جان، پیام مقاومت و امید به پیروزی می‌دهند","پهلوانان اسطوره‌ای ایران باستان","شاعران و هنرمندان دورهٔ مشروطه"],
    correctIndex: 1,
    explanation: "در پاسخ کارگاه، یاران عاشق به شهیدانی اشاره دارد که با فداکاری و مقاومت، امید و نوید پیروزی را منتقل می‌کنند.",
    sourceStatus: "reviewed", sourceTitle, sourceUrl, sourceYear: "۱۴۰۵–۱۴۰۶", verifiedAt, reviewerNote
  }
];
