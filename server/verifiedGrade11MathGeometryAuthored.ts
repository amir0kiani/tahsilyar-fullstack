import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-11T00:00:00.000Z");
const sourceTitle = "کتاب هندسه (۲)، پایه یازدهم رشته ریاضی و فیزیک، سازمان پژوهش و برنامه‌ریزی آموزشی، چاپ دهم ۱۴۰۵";
const sourceUrl = "https://dl.daneshchi.ir/file/chap-school/Hendese-Riazi-11_Daneshchi.iR.pdf";
const reviewerNote = "سؤال تألیفی و مستقل از آزمون؛ متن، گزینه‌ها و پاسخ با محتوای کتاب رسمی و حل محاسباتی بازبینی شده‌اند.";

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
  // فصل ۲: تبدیل‌های هندسی و کاربردها — صفحات ۳۱ تا ۵۸
  {
    id: "reflection-01", chapter: "تبدیل‌های هندسی و کاربردها", topic: "بازتاب نسبت به محور مختصات",
    difficulty: "آسان",
    prompt: "تصویر نقطهٔ A(۲، ۳) در بازتاب نسبت به محور xها کدام است؟",
    options: ["(۲، ۳)", "(−۲، ۳)", "(۲، −۳)", "(−۲، −۳)"],
    correctIndex: 2,
    explanation: "در بازتاب نسبت به محور xها، مؤلفهٔ x ثابت می‌ماند و علامت مؤلفهٔ y عوض می‌شود؛ پس تصویر (۲، −۳) است.",
    page: "۳۵ تا ۳۷"
  },
  {
    id: "translation-02", chapter: "تبدیل‌های هندسی و کاربردها", topic: "انتقال با بردار",
    difficulty: "آسان",
    prompt: "نقطهٔ P(−۱، ۴) تحت انتقال با بردار v=(۳، −۲) به کدام نقطه می‌رود؟",
    options: ["(۲، ۲)", "(−۴، ۶)", "(۲، ۶)", "(−۲، ۲)"],
    correctIndex: 0,
    explanation: "بردار انتقال به مختصات نقطه افزوده می‌شود: (−۱+۳، ۴−۲)=(۲،۲).",
    page: "۳۸ تا ۳۹"
  },
  {
    id: "rotation-03", chapter: "تبدیل‌های هندسی و کاربردها", topic: "دوران حول مبدأ",
    difficulty: "متوسط",
    prompt: "تصویر نقطهٔ P(۳، ۰) در دوران ۹۰ درجه پادساعت‌گرد حول مبدأ کدام است؟",
    options: ["(۰، −۳)", "(۳، ۰)", "(−۳، ۰)", "(۰، ۳)"],
    correctIndex: 3,
    explanation: "در دوران ۹۰ درجه پادساعت‌گرد حول مبدأ، نقطهٔ روی نیم‌محور مثبت x به نقطه‌ای روی نیم‌محور مثبت y با همان فاصله از مبدأ منتقل می‌شود؛ پس تصویر (۰،۳) است.",
    page: "۳۹ تا ۴۱"
  },
  {
    id: "homothety-04", chapter: "تبدیل‌های هندسی و کاربردها", topic: "تجانس با نسبت منفی",
    difficulty: "متوسط",
    prompt: "در تجانس به مرکز مبدأ و نسبت k=−۲، تصویر نقطهٔ P(۱، −۳) کدام است؟",
    options: ["(۲، −۶)", "(−۲، ۶)", "(−۱/۲، ۳/۲)", "(−۲، −۶)"],
    correctIndex: 1,
    explanation: "در تجانس، بردار مکان تصویر برابر k برابر بردار مکان اولیه است؛ بنابراین (۱،−۳) در −۲ ضرب می‌شود و تصویر (−۲،۶) به‌دست می‌آید.",
    page: "۴۲ تا ۴۷"
  },
  {
    id: "symmetry-05", chapter: "تبدیل‌های هندسی و کاربردها", topic: "تقارن بازتابی مثلث متساوی‌الاضلاع",
    difficulty: "آسان",
    prompt: "یک مثلث متساوی‌الاضلاع چند محور تقارن بازتابی دارد؟",
    options: ["۱", "۲", "۳", "۶"],
    correctIndex: 2,
    explanation: "هر یک از سه رأس به وسط ضلع مقابل وصل می‌شود و یک محور تقارن می‌سازد؛ بنابراین سه محور تقارن بازتابی وجود دارد.",
    page: "۵۴ تا ۵۸"
  },

  // فصل ۳: روابط طولی در مثلث — صفحات ۵۹ تا ۷۸
  {
    id: "sine-rule-01", chapter: "روابط طولی در مثلث", topic: "قضیهٔ سینوس‌ها",
    difficulty: "متوسط",
    prompt: "در مثلث ABC، زاویهٔ A برابر ۳۰ درجه و زاویهٔ B برابر ۴۵ درجه است. اگر ضلع روبه‌روی زاویهٔ A برابر ۶ باشد، طول ضلع روبه‌روی زاویهٔ B چقدر است؟",
    options: ["۳√۲", "۶√۲", "۹√۲", "۱۲√۲"],
    correctIndex: 1,
    explanation: "طبق قضیهٔ سینوس‌ها، b/sin45°=6/sin30°؛ بنابراین b=6×(√۲/۲)/(۱/۲)=۶√۲.",
    page: "۶۰ تا ۶۳"
  },
  {
    id: "cosine-rule-02", chapter: "روابط طولی در مثلث", topic: "قضیهٔ کسینوس‌ها",
    difficulty: "متوسط",
    prompt: "در مثلثی، دو ضلع مجاور زاویهٔ A به‌ترتیب ۵ و ۷ هستند و A=۶۰ درجه است. طول ضلع روبه‌روی زاویهٔ A کدام است؟",
    options: ["√۲۹", "√۳۹", "√۴۹", "√۷۴"],
    correctIndex: 1,
    explanation: "طبق قضیهٔ کسینوس‌ها، a²=۵²+۷²−۲×۵×۷×cos60°=۲۵+۴۹−۳۵=۳۹؛ پس a=√۳۹.",
    page: "۶۴ تا ۶۶"
  },
  {
    id: "bisector-ratio-03", chapter: "روابط طولی در مثلث", topic: "قضیهٔ نیمساز داخلی",
    difficulty: "متوسط",
    prompt: "در مثلث ABC، نیمساز زاویهٔ A ضلع BC را در D قطع می‌کند. اگر AB=۶، AC=۹ و BC=۱۰ باشد، طول BD کدام است؟",
    options: ["۳", "۴", "۵", "۶"],
    correctIndex: 1,
    explanation: "طبق قضیهٔ نیمساز، BD/DC=AB/AC=۶/۹=۲/۳. چون BD+DC=۱۰ است، BD=۴ و DC=۶ می‌شود.",
    page: "۶۷ تا ۶۸"
  },
  {
    id: "bisector-length-04", chapter: "روابط طولی در مثلث", topic: "محاسبهٔ طول نیمساز",
    difficulty: "دشوار",
    prompt: "در مثلث ABC، نیمساز داخلی زاویهٔ A ضلع BC را به پاره‌خط‌های ۳ و ۵ تقسیم می‌کند. اگر AB=۶ و AC=۱۰ باشد، طول نیمساز AD چقدر است؟",
    options: ["۳√۳", "۳√۵", "۵√۳", "۵√۵"],
    correctIndex: 1,
    explanation: "رابطهٔ طول نیمساز می‌دهد AD²=AB×AC−BD×DC=۶×۱۰−۳×۵=۴۵؛ پس AD=√۴۵=۳√۵.",
    page: "۶۸ تا ۶۹"
  },
  {
    id: "heron-05", chapter: "روابط طولی در مثلث", topic: "قضیهٔ هرون و مساحت مثلث",
    difficulty: "متوسط",
    prompt: "مساحت مثلثی با ضلع‌های ۱۳، ۱۴ و ۱۵ واحد، با استفاده از قضیهٔ هرون چقدر است؟",
    options: ["۷۲", "۸۴", "۹۰", "۹۶"],
    correctIndex: 1,
    explanation: "نیم‌محیط s=(۱۳+۱۴+۱۵)/۲=۲۱ است. طبق قضیهٔ هرون، مساحت برابر √(۲۱×۸×۷×۶)=√۷۰۵۶=۸۴ واحد مربع می‌شود.",
    page: "۷۱ تا ۷۴"
  }
];

export const verifiedGrade11MathGeometryAuthored: ExamQuestion[] = items.map((item) => ({
  id: `authored-grade11-math-geometry-${item.id}`,
  grade: "یازدهم",
  track: "ریاضی",
  subject: "هندسه",
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
