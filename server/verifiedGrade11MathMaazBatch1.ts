import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-08T00:00:00.000Z");
const sourceTitle = "آزمون ماز ۱۵ آبان ۱۴۰۵ – یازدهم ریاضی (فایل ارسالی کاربر)";
const reviewNote = "دفترچهٔ ماز پاسخنامهٔ کلیدی ندارد؛ پاسخ با حل مستقل ریاضی و بازبینی دامنه و محاسبات تعیین شده است.";

export const verifiedGrade11MathMaazBatch1: ExamQuestion[] = [
  {
    id: "upload-maaz-math11-calculus-sequence-01",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "دنبالهٔ هندسی و مجموع جمله‌ها",
    difficulty: "متوسط",
    prompt: "فرض کنید aₙ جملهٔ عمومی یک دنباله و aₙ₊₁ − 2aₙ = 0 باشد. اگر مجموع هشت جملهٔ اول دنباله برابر ۵۱۰ باشد، مقدار a₁ کدام است؟",
    options: ["۲", "۱", "۱/۲", "۳/۲"],
    correctIndex: 0,
    explanation: "رابطه نشان می‌دهد دنباله هندسی با قدرنسبت ۲ است. بنابراین S₈ = a₁(۲⁸−۱) = ۲۵۵a₁؛ از ۲۵۵a₁=۵۱۰ نتیجه می‌شود a₁=۲.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱، صفحهٔ ۱ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-quadratic-tangent-02",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "مماس بودن سهمی بر محور x",
    difficulty: "متوسط",
    prompt: "به‌ازای کدام مقدار a، نمودار سهمی y = a(۲x−۱)² + (۲x+۱)² − ۳ بر محور xها مماس است؟",
    options: ["۶", "۳", "−۳", "−۶"],
    correctIndex: 1,
    explanation: "پس از بسط، ضرایب سهمی به‌ترتیب ۴(a+۱)، ۴(۱−a) و a−۲ هستند. شرط مماس بودن، صفر شدن ممیّز است: Δ=۱۶(۳−a)=۰؛ پس a=۳.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۲، صفحهٔ ۱ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-quadratic-roots-difference-03",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "مجموع و حاصل‌ضرب ریشه‌های معادلهٔ درجه دوم",
    difficulty: "دشوار",
    prompt: "مجموع ریشه‌های معادلهٔ ۲x² + mx + ۳m − ۲ = ۰، از حاصل‌ضرب ریشه‌های آن ۱۳ واحد بیشتر است. اختلاف ریشه‌های معادله چقدر است؟",
    options: ["۵", "۲", "۳", "۷"],
    correctIndex: 3,
    explanation: "با رابطه‌های ویتا، −m/۲ = (۳m−۲)/۲ + ۱۳ و در نتیجه m=−۶. ممیّز برابر ۱۹۶ است؛ اختلاف دو ریشه برابر √۱۹۶/۲ = ۷ می‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۳", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۳، صفحهٔ ۱ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-arithmetic-series-04",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "مجموع جمله‌های دنبالهٔ حسابی",
    difficulty: "متوسط",
    prompt: "در یک دنبالهٔ حسابی مجموع چهار جملهٔ اول برابر ۸ و مجموع هشت جملهٔ اول برابر ۲۴ است. مجموع دوازده جملهٔ اول این دنباله چقدر است؟",
    options: ["۵۶", "۴۰", "۳۶", "۴۸"],
    correctIndex: 3,
    explanation: "از S₄=۸ و S₈=۲۴ به‌ترتیب ۲a₁+۳d=۴ و ۲a₁+۷d=۶ به‌دست می‌آید؛ پس d=۱/۲ و a₁=۵/۴. بنابراین S₁₂=۴۸.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۴", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۴، صفحهٔ ۱ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-positive-roots-05",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "شرط داشتن دو ریشهٔ مثبت و متمایز",
    difficulty: "دشوار",
    prompt: "معادلهٔ ۳x² − ۲mx + ۳m + ۱۲ = ۰ دارای دو ریشهٔ حقیقی مثبت و متمایز است. حدود m کدام است؟",
    options: ["m<−۴", "−۴<m<−۳", "m>۱۲", "۰<m<۱۲"],
    correctIndex: 2,
    explanation: "مثبت بودن مجموع ریشه‌ها m>۰ را می‌دهد. شرط ممیّز مثبت، (m−۱۲)(m+۳)>۰ است؛ با m>۰ فقط بازهٔ m>۱۲ باقی می‌ماند.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۵", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۵، صفحهٔ ۱ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-absolute-function-graph-06",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "تابع", topic: "نمودار تابع منفی قدرمطلق",
    difficulty: "متوسط",
    prompt: "نمودار تابع f به‌صورت زیر توصیف شده است: یک پاره‌خط صعودی از ناحیهٔ زیر محور x عبور می‌کند و به مقدار مثبت می‌رسد؛ سپس بخشی افقی بالای محور x و در پایان پاره‌خطی صعودی دارد. نمودار y = −|f(x)| کدام شکل است؟",
    options: [
      "نموداری با یک قله روی محور x در سمت راست و بخش افقی در سمت چپ",
      "نموداری با دو قله روی محور x و یک بخش افقی زیر محور x میان آن‌ها",
      "نموداری که از یک قله روی محور x در سمت چپ پایین می‌آید، به بخش افقی زیر محور x می‌رسد و سپس دوباره نزولی می‌شود",
      "نموداری با یک بخش افقی زیر محور x و دو شاخهٔ نزولی در دو طرف، بدون رسیدن به محور x"
    ],
    correctIndex: 2,
    explanation: "در بخش‌هایی که f منفی است، −|f| با خود f برابر می‌شود؛ در بخش‌های مثبت، نمودار f نسبت به محور x قرینه می‌شود. در نتیجه فقط ریشهٔ سمت چپ باقی می‌ماند و بخش افقی و شاخهٔ پایانی زیر محور قرار می‌گیرند.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۶", verifiedAt,
    reviewerNote: reviewNote + " نمودار و گزینهٔ ۳ با تصویر شمارهٔ ۲ دفترچه بررسی شد؛ شکل اصلی در رکورد به توصیف متنی تبدیل شده است."
  },
  {
    id: "upload-maaz-math11-calculus-sharing-cake-07",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "تشکیل معادله از مسئلهٔ کلامی",
    difficulty: "متوسط",
    prompt: "یک کیک را ابتدا بین افراد حاضر در مهمانی به‌طور مساوی تقسیم می‌کنیم. سپس ۴ نفر مهمانی را ترک می‌کنند و کیک دیگری به همان اندازه را بین افراد باقی‌مانده تقسیم می‌کنیم؛ در این حالت سهم هر نفر ۴/۳ برابر حالت قبل است. اگر نصف یک کیک را بین افراد اولیه تقسیم می‌کردیم، سهم هر نفر چقدر می‌شد؟",
    options: ["۱/۳۶", "۱/۱۶", "۱/۲۴", "۱/۳۲"],
    correctIndex: 3,
    explanation: "اگر تعداد اولیه n باشد، ۱/(n−۴) = (۴/۳)(۱/n)، پس n=۱۶. سهم هر نفر از نصف کیک برابر (۱/۲)/۱۶ = ۱/۳۲ است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۷", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۷، صفحهٔ ۲ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-radical-equation-08",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "معادله‌های رادیکالی",
    difficulty: "متوسط",
    prompt: "اگر α و β ریشه‌های معادلهٔ √(۳x−۲) − √(x−۱) = ۱ باشند، حاصل β/α + α/β کدام است؟",
    options: ["۱۰/۳", "۵/۲", "۲۵/۴", "۲"],
    correctIndex: 1,
    explanation: "با انتقال و مجذورگیری مجاز، معادله به x−۱=√(x−۱) می‌رسد. با t=√(x−۱)، t²=t و t≥۰؛ پس t=۰ یا ۱ و ریشه‌ها x=۱ و x=۲ هستند. مقدار خواسته‌شده ۲+۱/۲=۵/۲ است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۸", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۸، صفحهٔ ۲ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-absolute-inequalities-09",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "نامعادله‌های قدرمطلق",
    difficulty: "دشوار",
    prompt: "مجموعهٔ جواب دو نامعادلهٔ |۳x−۲| < x و |۲x−a| < b یکسان است. مقدار b/a کدام است؟",
    options: ["۱/۳", "۳", "۱/۴", "۴"],
    correctIndex: 0,
    explanation: "نامعادلهٔ اول بازهٔ (۱/۲،۱) را می‌دهد. برای نامعادلهٔ دوم، بازهٔ ((a−b)/۲،(a+b)/۲) است؛ با برابر گرفتن کران‌ها a=۳/۲ و b=۱/۲، پس b/a=۱/۳.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۹", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۹، صفحهٔ ۲ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-radical-equation-count-10",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "تعداد جواب معادلهٔ رادیکالی",
    difficulty: "دشوار",
    prompt: "معادلهٔ ۲ − ۳/√(x+۲) = ۱/√(x−۲) چند جواب دارد؟",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 0,
    explanation: "دامنه x>۲ است. تابع ۲−۳/√(x+۲)−۱/√(x−۲) اکیداً صعودی است، از منفی بی‌نهایت در نزدیکی ۲ شروع می‌شود و به ۲ میل می‌کند؛ پس دقیقاً یک بار صفر می‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۰", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۰، صفحهٔ ۲ دفترچه."
  }
];
