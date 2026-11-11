import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-11T00:00:00.000Z");
const sourceTitle = "سؤال تألیفی تحصیل‌یار بر اساس کتاب آمار و احتمال یازدهم رشته ریاضی و فیزیک، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Amar-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون؛ فصل، تعریف‌ها، نمادگذاری مجموعه‌ای و پاسخ با کتاب رسمی چاپ دهم ۱۴۰۵ بازبینی شده‌اند.";

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
  // درس «مجموعه و زیرمجموعه» — صفحات ۱۶ تا ۲۰
  {
    id: "subset-count-01", chapter: "مجموعه و زیرمجموعه", topic: "تعداد زیرمجموعه‌ها",
    difficulty: "آسان",
    prompt: "یک مجموعهٔ ۳ عضوی چند زیرمجموعه دارد؟",
    options: ["۳", "۶", "۸", "۹"],
    correctIndex: 2,
    explanation: "هر عضو یا در زیرمجموعه قرار می‌گیرد یا قرار نمی‌گیرد؛ بنابراین تعداد زیرمجموعه‌ها برابر ۲ به توان تعداد اعضاست: ۲³=۸.",
    page: "۱۶ تا ۱۷"
  },
  {
    id: "proper-subset-count-02", chapter: "مجموعه و زیرمجموعه", topic: "تعداد زیرمجموعه‌های سره",
    difficulty: "متوسط",
    prompt: "اگر مجموعهٔ A چهار عضو داشته باشد، چند زیرمجموعهٔ سره دارد؟",
    options: ["۸", "۱۲", "۱۵", "۱۶"],
    correctIndex: 2,
    explanation: "مجموعهٔ چهارعضوی ۲⁴=۱۶ زیرمجموعه دارد. زیرمجموعهٔ سره خود مجموعه نیست؛ پس ۱۶−۱=۱۵ زیرمجموعهٔ سره دارد.",
    page: "۱۶ تا ۱۷"
  },
  {
    id: "set-builder-03", chapter: "مجموعه و زیرمجموعه", topic: "نمایش مجموعه با عضوگیری",
    difficulty: "آسان",
    prompt: "اگر A={x∈N | ۱≤x<۵} باشد، کدام گزینه نمایش فهرستی A است؟",
    options: ["{۰،۱،۲،۳،۴}", "{۱،۲،۳،۴}", "{۱،۲،۳،۴،۵}", "{۲،۳،۴}"],
    correctIndex: 1,
    explanation: "عدد طبیعی باید هم‌زمان شرط ۱≤x و x<۵ را داشته باشد؛ پس اعضا ۱،۲،۳ و ۴ هستند.",
    page: "۱۷ تا ۱۸"
  },
  {
    id: "equal-sets-04", chapter: "مجموعه و زیرمجموعه", topic: "برابری دو مجموعه",
    difficulty: "متوسط",
    prompt: "اگر A={۱،۲،۳} و B={x∈N | ۰<x<۴} باشند، کدام رابطه درست است؟",
    options: ["A⊂B و B⊂A", "A=B", "A∩B=∅", "A⊂B ولی B⊄A"],
    correctIndex: 1,
    explanation: "هر دو مجموعه دقیقاً اعضای ۱،۲ و ۳ را دارند؛ ترتیب نوشتن اعضا اهمیتی ندارد، پس دو مجموعه برابرند.",
    page: "۱۸ تا ۲۰"
  },
  {
    id: "subset-relation-05", chapter: "مجموعه و زیرمجموعه", topic: "تشخیص رابطهٔ زیرمجموعه",
    difficulty: "آسان",
    prompt: "اگر A={۱،۳} و B={۱،۲،۳،۴} باشد، کدام گزاره درست است؟",
    options: ["A⊆B", "B⊆A", "A=B", "A∩B=∅"],
    correctIndex: 0,
    explanation: "تمام اعضای A یعنی ۱ و ۳ در B وجود دارند؛ بنابراین A زیرمجموعهٔ B است، اما B زیرمجموعهٔ A نیست.",
    page: "۱۷ تا ۲۰"
  },

  // درس «قوانین و اعمال بین مجموعه‌ها» — صفحات ۲۱ تا ۳۴
  {
    id: "set-difference-01", chapter: "قوانین و اعمال بین مجموعه‌ها", topic: "تفاضل دو مجموعه",
    difficulty: "آسان",
    prompt: "اگر A={۱،۲،۳،۴} و B={۳،۴،۵} باشد، A\B کدام است؟",
    options: ["{۳،۴}", "{۱،۲}", "{۱،۲،۵}", "{۱،۲،۳،۴،۵}"],
    correctIndex: 1,
    explanation: "تفاضل A\B شامل اعضایی از A است که در B نیستند؛ پس ۱ و ۲ باقی می‌مانند.",
    page: "۲۱ تا ۲۶"
  },
  {
    id: "de-morgan-union-02", chapter: "قوانین و اعمال بین مجموعه‌ها", topic: "قانون دمورگان اجتماع",
    difficulty: "متوسط",
    prompt: "متمم اجتماع دو مجموعهٔ A و B نسبت به مجموعهٔ مرجع U با کدام عبارت برابر است؟",
    options: ["Aᶜ∪Bᶜ", "Aᶜ∩Bᶜ", "A∩B", "A∪B"],
    correctIndex: 1,
    explanation: "طبق قانون دمورگان، متمم اجتماع برابر اشتراک متمم‌هاست: (A∪B)ᶜ=Aᶜ∩Bᶜ.",
    page: "۲۷ تا ۲۹"
  },
  {
    id: "de-morgan-intersection-03", chapter: "قوانین و اعمال بین مجموعه‌ها", topic: "قانون دمورگان اشتراک",
    difficulty: "متوسط",
    prompt: "طبق قانون دمورگان، متمم اشتراک A و B کدام است؟",
    options: ["Aᶜ∩Bᶜ", "Aᶜ∪Bᶜ", "A∩B", "A∪B"],
    correctIndex: 1,
    explanation: "متمم اشتراک برابر اجتماع متمم‌هاست: (A∩B)ᶜ=Aᶜ∪Bᶜ.",
    page: "۲۷ تا ۲۹"
  },
  {
    id: "cartesian-cardinality-04", chapter: "قوانین و اعمال بین مجموعه‌ها", topic: "تعداد اعضای ضرب دکارتی",
    difficulty: "آسان",
    prompt: "اگر A سه عضو و B دو عضو داشته باشد، مجموعهٔ A×B چند عضو دارد؟",
    options: ["۵", "۶", "۸", "۹"],
    correctIndex: 1,
    explanation: "در ضرب دکارتی، هر عضو A با هر عضو B یک زوج مرتب می‌سازد؛ بنابراین |A×B|=|A|×|B|=۳×۲=۶.",
    page: "۳۰ تا ۳۴"
  },
  {
    id: "cartesian-order-05", chapter: "قوانین و اعمال بین مجموعه‌ها", topic: "ترتیب در زوج مرتب",
    difficulty: "متوسط",
    prompt: "اگر A={۱،۲} و B={a،b} باشد، کدام زوج مرتب عضو A×B است؟",
    options: ["(a،۱)", "(۲،b)", "(b،۱)", "(a،۲)"],
    correctIndex: 1,
    explanation: "در هر زوج مرتب A×B، مؤلفهٔ اول باید از A و مؤلفهٔ دوم از B باشد؛ بنابراین (۲،b) عضو A×B است.",
    page: "۳۰ تا ۳۴"
  }
];

export const verifiedGrade11MathStatisticsAuthored: ExamQuestion[] = items.map((item) => ({
  id: `authored-grade11-math-statistics-${item.id}`,
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
