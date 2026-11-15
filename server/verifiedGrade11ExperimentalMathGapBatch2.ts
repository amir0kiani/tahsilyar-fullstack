import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-11T00:00:00.000Z");
const sourceTitle = "کتاب ریاضی (۲)، پایه یازدهم رشته علوم تجربی، سازمان پژوهش و برنامه‌ریزی آموزشی، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Rizai-Tajrobi-11_Daneshchi.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون؛ محتوای فصل، گزینه‌ها و پاسخ با متن کتاب رسمی چاپ دهم ۱۴۰۵ و محاسبهٔ مستقل بازبینی شده است.";

type Item = {
  id: string;
  chapter: string;
  topic: string;
  difficulty: "آسان" | "متوسط" | "دشوار";
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  page: string;
};

const items: Item[] = [
  // فصل ۶: حد و پیوستگی — صفحات ۱۱۹ تا ۱۴۲
  {
    id: "limit-polynomial-01", chapter: "حد و پیوستگی", topic: "حد تابع چندجمله‌ای",
    difficulty: "آسان",
    prompt: "مقدار حد lim(x→۲)(x²+۳x−۱) کدام است؟",
    options: ["۷", "۸", "۹", "۱۰"],
    correctIndex: 2,
    explanation: "تابع چندجمله‌ای در همهٔ نقاط پیوسته است؛ با جای‌گذاری x=۲ داریم ۴+۶−۱=۹.",
    page: "۱۲۰ تا ۱۲۷"
  },
  {
    id: "limit-factorization-02", chapter: "حد و پیوستگی", topic: "رفع ابهام صفر بر صفر با تجزیه",
    difficulty: "متوسط",
    prompt: "حد lim(x→۳)(x²−۹)/(x−۳) برابر کدام است؟",
    options: ["۳", "۶", "۹", "وجود ندارد"],
    correctIndex: 1,
    explanation: "صورت را به (x−۳)(x+۳) تجزیه می‌کنیم. برای x≠۳ عبارت برابر x+۳ است و حد آن در x=۳ برابر ۶ می‌شود.",
    page: "۱۲۸ تا ۱۳۶"
  },
  {
    id: "limit-one-sided-03", chapter: "حد و پیوستگی", topic: "حدهای یک‌طرفهٔ تابع جزءصحیح",
    difficulty: "متوسط",
    prompt: "اگر f(x)=[x] باشد، حد چپ f در x=۲ کدام است؟",
    options: ["۰", "۱", "۲", "وجود ندارد"],
    correctIndex: 1,
    explanation: "برای xهایی که از چپ به ۲ نزدیک می‌شوند و از ۲ کوچک‌ترند، جزءصحیح برابر ۱ است؛ بنابراین حد چپ ۱ می‌شود.",
    page: "۱۳۷ تا ۱۴۰"
  },
  {
    id: "continuity-parameter-04", chapter: "حد و پیوستگی", topic: "شرط پیوستگی تابع چندضابطه‌ای",
    difficulty: "دشوار",
    prompt: "تابع f به‌صورت f(x)=ax+۱ برای x<۲ و f(x)=x²−۱ برای x≥۲ تعریف شده است. برای پیوستگی f در x=۲، مقدار a باید چند باشد؟",
    options: ["۰", "۱", "۲", "۳"],
    correctIndex: 1,
    explanation: "مقدار تابع در ۲ برابر ۳ است. حد چپ نیز باید ۲a+۱ و برابر ۳ باشد؛ پس ۲a=۲ و a=۱.",
    page: "۱۳۹ تا ۱۴۲"
  },
  {
    id: "limit-rational-05", chapter: "حد و پیوستگی", topic: "حد تابع کسری",
    difficulty: "متوسط",
    prompt: "مقدار حد lim(x→∞)(۳x²−۲x+۱)/(x²+۴) کدام است؟",
    options: ["۰", "۱", "۲", "۳"],
    correctIndex: 3,
    explanation: "با تقسیم صورت و مخرج بر x²، جمله‌های دارای ۱/x و ۱/x² به صفر میل می‌کنند و نسبت ضرایب جملات درجهٔ دوم، یعنی ۳/۱، باقی می‌ماند.",
    page: "۱۲۸ تا ۱۳۷"
  },

  // فصل ۷: آمار و احتمال — صفحات ۱۴۳ تا ۱۵۹
  {
    id: "conditional-probability-01", chapter: "آمار و احتمال", topic: "احتمال شرطی",
    difficulty: "متوسط",
    prompt: "اگر P(A∩B)=۰٫۲۴ و P(B)=۰٫۶ باشد، احتمال شرطی P(A|B) کدام است؟",
    options: ["۰٫۲", "۰٫۳", "۰٫۴", "۰٫۸"],
    correctIndex: 2,
    explanation: "طبق رابطهٔ احتمال شرطی، P(A|B)=P(A∩B)/P(B)=۰٫۲۴/۰٫۶=۰٫۴.",
    page: "۱۴۴ تا ۱۴۶"
  },
  {
    id: "independent-events-02", chapter: "آمار و احتمال", topic: "پیشامدهای مستقل",
    difficulty: "آسان",
    prompt: "دو پیشامد A و B مستقل‌اند. اگر P(A)=۰٫۴ و P(B)=۰٫۵ باشد، P(A∩B) چقدر است؟",
    options: ["۰٫۱", "۰٫۲", "۰٫۴", "۰٫۹"],
    correctIndex: 1,
    explanation: "برای دو پیشامد مستقل، احتمال اشتراک برابر حاصل‌ضرب احتمال‌های آن‌هاست؛ پس ۰٫۴×۰٫۵=۰٫۲.",
    page: "۱۴۶ تا ۱۴۸"
  },
  {
    id: "descriptive-mean-03", chapter: "آمار و احتمال", topic: "میانگین داده‌ها",
    difficulty: "آسان",
    prompt: "میانگین داده‌های ۴، ۵، ۵، ۶ و ۱۰ کدام است؟",
    options: ["۵", "۶", "۷", "۸"],
    correctIndex: 1,
    explanation: "مجموع داده‌ها ۳۰ و تعداد آن‌ها ۵ است؛ بنابراین میانگین برابر ۳۰÷۵=۶ می‌شود.",
    page: "۱۵۳ تا ۱۵۵"
  },
  {
    id: "descriptive-range-04", chapter: "آمار و احتمال", topic: "دامنهٔ تغییرات",
    difficulty: "آسان",
    prompt: "دامنهٔ تغییرات داده‌های ۸، ۹، ۱۰، ۱۴ و ۱۵ چقدر است؟",
    options: ["۵", "۶", "۷", "۸"],
    correctIndex: 2,
    explanation: "دامنهٔ تغییرات برابر بزرگ‌ترین داده منهای کوچک‌ترین داده است؛ ۱۵−۸=۷.",
    page: "۱۵۵ تا ۱۵۷"
  },
  {
    id: "descriptive-variance-05", chapter: "آمار و احتمال", topic: "واریانس داده‌ها",
    difficulty: "دشوار",
    prompt: "واریانس مجموعهٔ داده‌های ۲، ۴ و ۶، با تقسیم مجموع مجذور انحراف‌ها بر تعداد داده‌ها، کدام است؟",
    options: ["۲", "۸/۳", "۴", "۸"],
    correctIndex: 1,
    explanation: "میانگین داده‌ها ۴ است. مجذور انحراف‌ها برابر ۴، صفر و ۴ هستند؛ مجموع ۸ و واریانس ۸÷۳ می‌شود.",
    page: "۱۵۷ تا ۱۵۹"
  }
];

export const verifiedGrade11ExperimentalMathGapBatch2: ExamQuestion[] = items.map((item) => ({
  id: `grade11-experimental-math-gap-${item.id}`,
  grade: "یازدهم",
  track: "تجربی",
  subject: "ریاضی",
  chapter: item.chapter,
  topic: item.topic,
  difficulty: item.difficulty,
  prompt: item.prompt,
  options: item.options,
  correctIndex: item.correctIndex,
  explanation: item.explanation,
  sourceStatus: "reviewed",
  sourceTitle,
  sourceUrl,
  sourceYear: "۱۴۰۵",
  verifiedAt,
  reviewerNote: `${reviewerNote} ارجاع محتوایی: صفحات ${item.page} کتاب.`
}));
