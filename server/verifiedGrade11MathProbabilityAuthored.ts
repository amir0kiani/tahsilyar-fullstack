import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-11T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب رسمی آمار و احتمال یازدهم رشته ریاضی و فیزیک، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Amar-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون؛ مفاهیم، صورت سؤال، گزینه‌ها، محاسبات و پاسخ با متن کتاب رسمی چاپ دهم ۱۴۰۵ بازبینی شده‌اند.";

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
  // درس «مبانی احتمال» — صفحات ۳۹ تا ۴۲
  {
    id: "sample-space-two-dice-01", chapter: "مبانی احتمال", topic: "فضای نمونهٔ آزمایش مرکب",
    difficulty: "آسان",
    prompt: "دو تاس متمایز را هم‌زمان پرتاب می‌کنیم و نتیجهٔ هر تاس را جداگانه ثبت می‌کنیم. فضای نمونه چند عضو دارد؟",
    options: ["۶", "۱۲", "۳۶", "۳۲"],
    correctIndex: 2,
    explanation: "هر تاس ۶ نتیجهٔ ممکن دارد. چون نتیجهٔ تاس اول و دوم به‌ترتیب مشخص می‌شود، فضای نمونه حاصل‌ضرب دکارتی دو مجموعهٔ ۶ عضوی است و ۶×۶=۳۶ عضو دارد.",
    page: "۴۰"
  },
  {
    id: "event-even-die-02", chapter: "مبانی احتمال", topic: "توصیف پیشامد به‌صورت زیرمجموعه",
    difficulty: "آسان",
    prompt: "در پرتاب یک تاس سالم، پیشامد «ظاهرشدن عددی زوج» کدام زیرمجموعه از فضای نمونه است؟",
    options: ["{۱،۳،۵}", "{۲،۴،۶}", "{۲،۳،۵}", "{۱،۲،۳}"],
    correctIndex: 1,
    explanation: "فضای نمونهٔ پرتاب تاس {۱،۲،۳،۴،۵،۶} است. پیشامد زوج‌آمدن شامل تمام و فقط برآمدهای زوج یعنی ۲،۴ و ۶ است.",
    page: "۳۹ تا ۴۰"
  },
  {
    id: "complement-probability-03", chapter: "مبانی احتمال", topic: "احتمال پیشامد متمم",
    difficulty: "آسان",
    prompt: "اگر احتمال رخداد پیشامد A برابر ۰٫۳۷ باشد، احتمال رخ‌ندادن آن چقدر است؟",
    options: ["۰٫۳۷", "۰٫۶۳", "۰٫۷۳", "۱٫۳۷"],
    correctIndex: 1,
    explanation: "پیشامد A و متمم آن ناسازگارند و اجتماعشان کل فضای نمونه است؛ بنابراین P(A′)=۱−P(A)=۱−۰٫۳۷=۰٫۶۳.",
    page: "۴۱ تا ۴۲"
  },
  {
    id: "mutually-exclusive-union-04", chapter: "مبانی احتمال", topic: "جمع احتمال پیشامدهای ناسازگار",
    difficulty: "متوسط",
    prompt: "دو پیشامد A و B ناسازگارند. اگر P(A)=۰٫۲۰ و P(B)=۰٫۳۵ باشد، احتمال رخ‌دادن A یا B چقدر است؟",
    options: ["۰٫۱۵", "۰٫۵۵", "۰٫۷۰", "۰٫۰۷"],
    correctIndex: 1,
    explanation: "ناسازگار بودن یعنی A∩B=∅. طبق اصل جمع برای دو پیشامد ناسازگار، P(A∪B)=P(A)+P(B)=۰٫۲۰+۰٫۳۵=۰٫۵۵.",
    page: "۴۱ تا ۴۲"
  },
  {
    id: "general-union-probability-05", chapter: "مبانی احتمال", topic: "احتمال اجتماع دو پیشامد",
    difficulty: "متوسط",
    prompt: "برای دو پیشامد A و B داریم P(A)=۰٫۷، P(B)=۰٫۶ و P(A∩B)=۰٫۴. مقدار P(A∪B) کدام است؟",
    options: ["۰٫۹", "۱٫۳", "۰٫۷", "۰٫۴"],
    correctIndex: 0,
    explanation: "برای پیشامدهای دلخواه باید اشتراک دوبارشماری‌شده را کم کنیم: P(A∪B)=P(A)+P(B)−P(A∩B)=۰٫۷+۰٫۶−۰٫۴=۰٫۹.",
    page: "۴۲"
  },

  // درس «احتمال غیرهم‌شانس» — صفحات ۴۴ تا ۴۶
  {
    id: "weighted-die-even-01", chapter: "احتمال غیرهم‌شانس", topic: "احتمال برآمدهای نابرابر",
    difficulty: "متوسط",
    prompt: "تاسی طوری ساخته شده است که احتمال مشاهدهٔ هر عدد زوج، سه برابر احتمال مشاهدهٔ هر عدد فرد باشد. اگر این تاس را پرتاب کنیم، احتمال مشاهدهٔ عددی زوج چقدر است؟",
    options: ["۱/۴", "۱/۲", "۳/۴", "۵/۶"],
    correctIndex: 2,
    explanation: "اگر احتمال هر عدد فرد را x بگیریم، احتمال هر عدد زوج ۳x است. سه عدد فرد و سه عدد زوج داریم؛ پس ۳x+۹x=۱ و x=۱/۱۲. احتمال عدد زوج برابر ۳×۳x=۹/۱۲=۳/۴ است.",
    page: "۵۱"
  },
  {
    id: "biased-coin-complement-02", chapter: "احتمال غیرهم‌شانس", topic: "احتمال متمم در سکهٔ ناسالم",
    difficulty: "آسان",
    prompt: "در پرتاب یک سکهٔ ناسالم، احتمال آمدن «رو» برابر ۲/۳ است. احتمال آمدن «پشت» چقدر است؟",
    options: ["۲/۳", "۱/۳", "۱/۲", "۳/۲"],
    correctIndex: 1,
    explanation: "دو برآمد رو و پشت متمم یکدیگرند و مجموع احتمال آن‌ها ۱ است؛ بنابراین احتمال پشت برابر ۱−۲/۳=۱/۳ خواهد بود.",
    page: "۵۲"
  },
  {
    id: "weighted-teams-ratio-03", chapter: "احتمال غیرهم‌شانس", topic: "تعیین احتمال از نسبت برآمدها",
    difficulty: "متوسط",
    prompt: "در مسابقه‌ای چهار تیم A، B، C و D شرکت دارند. احتمال قهرمانی هر یک از سه تیم A، B و C برابر x و احتمال قهرمانی تیم D برابر ۲x است. احتمال قهرمانی تیم D چقدر است؟",
    options: ["۱/۵", "۲/۵", "۱/۲", "۲/۳"],
    correctIndex: 1,
    explanation: "مجموع احتمال همهٔ برآمدهای فضای نمونه برابر ۱ است؛ پس x+x+x+۲x=۱ و x=۱/۵. بنابراین احتمال قهرمانی D برابر ۲x=۲/۵ است.",
    page: "۴۵ تا ۴۶"
  },
  {
    id: "weighted-three-outcomes-04", chapter: "احتمال غیرهم‌شانس", topic: "استخراج احتمال برآمدهای ساده",
    difficulty: "متوسط",
    prompt: "فضای نمونهٔ آزمایشی S={x,y,z} است. اگر P({x,y})=۲/۳ و P({x,z})=۱/۲ باشد، احتمال برآمد y کدام است؟",
    options: ["۱/۳", "۱/۲", "۲/۳", "۵/۶"],
    correctIndex: 1,
    explanation: "اگر احتمال x، y و z را به‌ترتیب p، q و r بگیریم، p+q=۲/۳، p+r=۱/۲ و p+q+r=۱ است. از این روابط p=۱/۶ و در نتیجه q=۲/۳−۱/۶=۱/۲ به‌دست می‌آید.",
    page: "۴۶"
  },
  {
    id: "weighted-dart-zones-05", chapter: "احتمال غیرهم‌شانس", topic: "احتمال متناسب با وزن ناحیه‌ها",
    difficulty: "دشوار",
    prompt: "صفحه‌ای به پنج ناحیه تقسیم شده است. احتمال برخورد یک دارت به ناحیهٔ kام برابر (۲k−۱)x است. احتمال برخورد دارت به ناحیهٔ سوم یا چهارم چقدر است؟",
    options: ["۱۲/۲۵", "۷/۲۵", "۳/۵", "۱۴/۲۵"],
    correctIndex: 0,
    explanation: "مجموع احتمال پنج ناحیه برابر ۱ است؛ پس (۱+۳+۵+۷+۹)x=۲۵x=۱ و x=۱/۲۵. دو ناحیهٔ سوم و چهارم ناسازگارند؛ بنابراین احتمال مجموع آن‌ها (۵x+۷x)=۱۲/۲۵ است.",
    page: "۵۲"
  }
];

export const verifiedGrade11MathProbabilityAuthored: ExamQuestion[] = items.map((item) => ({
  id: `authored-grade11-math-probability-${item.id}`,
  grade: "یازدهم",
  track: "ریاضی",
  subject: "آمار و احتمال",
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
