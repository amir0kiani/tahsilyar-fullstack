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
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۰، صفحهٔ ۲ دفترچه.",
  },
  {
    id: "upload-maaz-math11-calculus-radical-parameter-11",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "معادلهٔ رادیکالی و مجموع ریشه‌ها",
    difficulty: "دشوار",
    prompt: "معادلهٔ √(x²−۲x+۱) = x/۲ + k دو جواب دارد که مجموع آن‌ها برابر ۴ است. مقدار k کدام است؟",
    options: ["۱", "۲", "۱/۲", "۳/۲"],
    correctIndex: 0,
    explanation: "با توجه به √((x−۱)²)=|x−۱)، دو شاخهٔ x≥۱ و x<۱ به‌ترتیب ریشه‌های ۲k+۲ و ۲(۱−k)/۳ را می‌دهند. از شرط مجموع ۴، k=۱ به‌دست می‌آید و دو ریشهٔ ۴ و ۰ هستند.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۱", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۱، صفحهٔ ۳ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-speed-distance-12",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "حل مسئله با معادلهٔ گویا",
    difficulty: "متوسط",
    prompt: "شخصی از شهر A به شهر B می‌رود و پس از ۲ ساعت توقف، از همان مسیر برمی‌گردد. مدت کل سفر ۱۶ ساعت است. اگر سرعت رفت ۲ کیلومتر بر ساعت از سرعت برگشت کمتر و فاصلهٔ دو شهر ۴۸ کیلومتر باشد، سرعت رفت چقدر است؟",
    options: ["۸", "۶", "۷", "۹"],
    correctIndex: 1,
    explanation: "اگر سرعت رفت v باشد، سرعت برگشت v+۲ است. از ۴۸/v + ۴۸/(v+۲) + ۲ = ۱۶، ریشهٔ مثبت v=۶ به‌دست می‌آید.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۲", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۲، صفحهٔ ۳ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-absolute-function-roots-13",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "تابع", topic: "تعداد جواب‌های معادلهٔ قدرمطلق تابع درجه دوم",
    difficulty: "دشوار",
    prompt: "تابع f(x)=x²−۴x+k مفروض است. به‌ازای کدام مقدار k، معادلهٔ |f(x)|=۲ سه جواب متمایز دارد؟",
    options: ["۱", "۲", "−۲", "−۱"],
    correctIndex: 1,
    explanation: "برای k=۲، سهمی f کمینهٔ −۲ را در رأس دارد؛ معادلهٔ f(x)=−۲ یک جواب و f(x)=۲ دو جواب متمایز می‌دهد، پس در مجموع سه جواب داریم.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۳", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۳، صفحهٔ ۳ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-absolute-area-14",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "تابع", topic: "مساحت ناحیهٔ محدود بین نمودارها",
    difficulty: "دشوار",
    prompt: "مساحت ناحیهٔ محدود به نمودار تابع f(x)=|x+۱|+|x−۲| و خط y=x+۴ چقدر است؟",
    options: ["۹", "۸", "۱۲", "۶"],
    correctIndex: 0,
    explanation: "تابع در بازه‌های x≤−۱، −۱≤x≤۲ و x≥۲ به‌ترتیب −۲x+۱، ۳ و ۲x−۱ است. خط در x=−۱ و x=۵ با نمودار برخورد می‌کند؛ انتگرال اختلاف در دو بازهٔ میانی و راست به‌ترتیب ۹/۲ و ۹/۲ است، پس مساحت کل ۹ می‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۴", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۴، صفحهٔ ۳ دفترچه."
  },
  {
    id: "upload-maaz-math11-calculus-absolute-inequality-15",
    grade: "یازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "جبر و معادله", topic: "نامعادلهٔ قدرمطلق و شمارش جواب‌های صحیح",
    difficulty: "متوسط",
    prompt: "مجموعهٔ جواب نامعادلهٔ |۲x+۱|+|x−۲|≤|x+۳| شامل چند عدد صحیح مثبت است؟",
    options: ["۴", "۲", "۳", "بی‌شمار"],
    correctIndex: 1,
    explanation: "برای ۰<x<۲ نامعادله به تساوی تبدیل می‌شود و عدد صحیح مثبت ۱ جواب است. برای x≥۲، شرط به x≤۲ می‌رسد و عدد ۲ نیز جواب است؛ پس دو عدد صحیح مثبت وجود دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۵", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۵، صفحهٔ ۳ دفترچه."
  },
  {
    id: "upload-maaz-math11-geometry-tangent-chord-16",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "زاویه‌های حاصل از مماس‌ها و وترها",
    difficulty: "دشوار",
    prompt: "در شکل، ضلع‌های زاویه‌های B و C بر دایره‌ای به شعاع R مماس‌اند. اگر طول وتر MQ برابر R باشد، اندازهٔ زاویهٔ PQN چند درجه است؟",
    options: ["۶۵°", "۳۰°", "۳۲/۵°", "۳۵°"],
    correctIndex: 3,
    explanation: "زاویهٔ بین دو مماس در B برابر ۷۰° و در C برابر ۶۰° است؛ پس کمان‌های QP و MN به‌ترتیب ۱۱۰° و ۱۲۰° هستند. چون MQ=R، زاویهٔ مرکزی متناظر با کمان MQ برابر ۶۰° است. کمان PN برابر ۷۰° و زاویهٔ محاطی PQN نصف آن، یعنی ۳۵° است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۶", verifiedAt,
    reviewerNote: reviewNote + " شکل و داده‌ها با صفحهٔ ۳ دفترچه بررسی شد؛ پاسخ با روابط مماس، وتر و زاویهٔ محاطی حل شد."
  },


  {
    id: "upload-maaz-math11-geometry-external-tangent-circles-17",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "مماس خارجی دو دایره",
    difficulty: "متوسط",
    prompt: "دو دایرهٔ C(O,m+۲) و C′(O′,m−۲) از بیرون بر یکدیگر مماس‌اند. اگر OO′=۳m−۱۲ باشد، مقدار m/۳+۱ کدام است؟",
    options: ["۱۲", "۵", "۶", "۸"],
    correctIndex: 1,
    explanation: "در مماس خارجی، فاصلهٔ مراکز برابر مجموع شعاع‌هاست؛ پس ۳m−۱۲=(m+۲)+(m−۲)=۲m و m=۱۲. بنابراین m/۳+۱=۵.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۷", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۷، صفحهٔ ۴ دفترچه؛ پاسخ با شرط مماس خارجی حل شد."
  },
  {
    id: "upload-maaz-math11-geometry-semicircle-area-18",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "مساحت ناحیهٔ بین دو نیم‌دایره",
    difficulty: "متوسط",
    prompt: "دو نیم‌دایره هم‌مرکزند. وتر AB به طول ۸ از نیم‌دایرهٔ بزرگ‌تر، بر نیم‌دایرهٔ کوچک‌تر مماس است و با قطر CD موازی است. مساحت ناحیهٔ بین دو نیم‌دایره چقدر است؟",
    options: ["۸π", "۱۶π", "۴π", "۱۰π"],
    correctIndex: 0,
    explanation: "فاصلهٔ مرکز تا وتر برابر شعاع نیم‌دایرهٔ کوچک است. با نصف وتر برابر ۴، از مثلث قائم‌الزاویه R²−r²=۴²=۱۶ به‌دست می‌آید. اختلاف مساحت دو نیم‌دایره برابر (π/۲)(R²−r²)=۸π است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۸", verifiedAt,
    reviewerNote: reviewNote + " شکل و داده‌ها با صفحهٔ ۴ دفترچه تطبیق داده شد؛ مساحت با رابطهٔ وتر و شعاع محاسبه شد."
  },
  {
    id: "upload-maaz-math11-geometry-tangent-length-19",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "طول مماس‌های رسم‌شده از نقطهٔ بیرون دایره",
    difficulty: "متوسط",
    prompt: "از نقطهٔ A بیرون دایره‌ای به مرکز O و شعاع ۲√۳، دو مماس بر دایره رسم شده است. اگر زاویهٔ بین دو مماس ۶۰ درجه باشد، طول هر مماس چقدر است؟",
    options: ["۲√۳", "۶", "۴", "۳√۳"],
    correctIndex: 1,
    explanation: "خط واصل مرکز به A نیمساز زاویهٔ بین دو مماس است؛ پس در مثلث قائم‌الزاویه OAT زاویهٔ A برابر ۳۰ درجه و OT=۲√۳ است. بنابراین AT=OT/tan۳۰°=۶.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۱۹", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۱۹، صفحهٔ ۴ دفترچه؛ پاسخ با مثلث قائم‌الزاویه و نیمساز زاویه حل شد."
  },


  {
    id: "upload-maaz-math11-statistics-truth-table-24",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "جدول ارزش گزاره‌های مرکب",
    difficulty: "آسان",
    prompt: "در چند سطر از جدول ارزش گزاره‌ها، ارزش گزارهٔ p ⇒ (q ∨ ¬r) درست است؟",
    options: ["صفر", "۶", "۷", "۴"],
    correctIndex: 2,
    explanation: "گزارهٔ شرطی فقط وقتی نادرست است که p درست و q∨¬r نادرست باشد؛ این حالت فقط با q نادرست و r درست رخ می‌دهد. از ۸ حالت، یک حالت نادرست و ۷ حالت درست است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۴", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۲۴، صفحهٔ ۵ دفترچه؛ جدول ارزش به‌صورت مستقل بررسی شد."
  },


  {
    id: "upload-maaz-math11-statistics-equivalent-proposition-25",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "هم‌ارزی گزاره‌های مرکب",
    difficulty: "متوسط",
    prompt: "گزارهٔ ¬(p ∧ q) ⇒ (q ∧ ¬r) با کدام گزاره هم‌ارز است؟",
    options: [
      "p ⇒ (q ⇒ r)",
      "q ∨ (p ⇒ r)",
      "q ∧ (r ⇒ p)",
      "q ∨ (r ⇒ p)"
    ],
    correctIndex: 2,
    explanation: "با هم‌ارزی شرطی، گزاره برابر (p∧q)∨(q∧¬r) می‌شود. با خارج کردن q، عبارت q∧(p∨¬r)=q∧(r⇒p) به‌دست می‌آید.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۵", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۲۵، صفحهٔ ۶ دفترچه؛ هم‌ارزی با قوانین گزاره‌ها حل شد."
  },
  {
    id: "upload-maaz-math11-statistics-negation-28",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "نقیض گزاره‌های مرکب",
    difficulty: "متوسط",
    prompt: "اگر p گزاره‌ای نادرست، q گزاره‌ای درست و r گزاره‌ای دلخواه باشد، نقیض گزارهٔ (q ⇒ r) ⇒ (r ⇒ p) هم‌ارز کدام است؟",
    options: ["درست (T)", "نادرست (F)", "r", "¬r"],
    correctIndex: 2,
    explanation: "با جای‌گذاری q درست و p نادرست، گزارهٔ داخلی اول r و گزارهٔ داخلی دوم ¬r می‌شود؛ پس گزارهٔ اصلی r⇒¬r، یعنی ¬r است و نقیض آن r خواهد بود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۸", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۲۸، صفحهٔ ۶ دفترچه؛ ارزش گزاره با جای‌گذاری مستقیم محاسبه شد."
  },
  {
    id: "upload-maaz-math11-statistics-quantifier-negation-29",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "نقیض گزاره‌های دارای سور",
    difficulty: "متوسط",
    prompt: "نقیض گزارهٔ «برای هر n طبیعی، عدد طبیعی m وجود دارد به‌طوری‌که n≥m» کدام است؟",
    options: [
      "عددی طبیعی n وجود دارد که برای هر m طبیعی، n≥m باشد.",
      "عددی طبیعی n وجود دارد که برای هر m طبیعی، n<m باشد.",
      "اعداد طبیعی n و m وجود دارند که n≥m باشد.",
      "اعداد طبیعی n و m وجود دارند که n<m باشد."
    ],
    correctIndex: 1,
    explanation: "نقیض سور همگانی، سور وجودی و نقیض سور وجودی، سور همگانی است؛ همچنین نقیض n≥m برابر n<m است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۹", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۲۹، صفحهٔ ۶ دفترچه؛ سورها و رابطهٔ نامساوی به‌صورت مستقل وارونه شدند."
  },
  {
    id: "upload-maaz-math11-statistics-proposition-value-30",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "استنتاج ارزش گزاره از چند شرط",
    difficulty: "دشوار",
    prompt: "اگر هر دو گزارهٔ (p ⇒ q) ⇒ r و q ∨ (p ⇒ r) درست باشند، ارزش r با کدام گزینه هم‌ارز است؟",
    options: ["p", "درست (T)", "نادرست (F)", "q"],
    correctIndex: 1,
    explanation: "اگر r نادرست باشد، درست بودن گزارهٔ اول مستلزم p درست و q نادرست است؛ اما در این حالت گزارهٔ دوم نادرست می‌شود. پس r ناگزیر درست است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۳۰", verifiedAt,
    reviewerNote: reviewNote + " شمارهٔ سؤال ۳۰، صفحهٔ ۶ دفترچه؛ ناسازگاری فرض r نادرست بررسی شد."
  },


  {
    id: "upload-maaz-math11-geometry-semicircle-tangent-20",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "مماس بودن دو نیم‌دایره",
    difficulty: "دشوار",
    prompt: "نیم‌دایره‌ای با قطر CD در نقطهٔ E بر نیم‌دایره‌ای با قطر AB مماس است. اگر AE=۱۰ و EB=۱۵ باشد، اندازهٔ AD کدام است؟",
    options: ["۵", "√۱۵", "√۱۰", "۳"],
    correctIndex: 0,
    explanation: "با قرار دادن A=(۰،۰)، E=(۱۰،۰) و B=(۲۵،۰)، مرکز نیم‌دایرهٔ کوچک روی AC و روی خط قائم گذرنده از E قرار می‌گیرد. اگر θ زاویهٔ AC با AB باشد، از شرط قرار گرفتن C روی نیم‌دایرهٔ بزرگ به sinθ=۳/۵ و tanθ=۳/۴ می‌رسیم. در نتیجه فاصلهٔ مرکز نیم‌دایرهٔ کوچک از A برابر ۱۲٫۵ و شعاع آن ۷٫۵ است؛ پس AD=۱۲٫۵−۷٫۵=۵.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۰", verifiedAt,
    reviewerNote: reviewNote + " شکل و داده‌ها با صفحهٔ ۴ دفترچه بررسی شد؛ پاسخ با مدل مختصاتی و شرط مماس بودن به‌دست آمد."
  },
  {
    id: "upload-maaz-math11-geometry-power-of-point-square-21",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "توان نقطه و مربع درون دایره",
    difficulty: "دشوار",
    prompt: "در دایره‌ای به مرکز O، چهارضلعی OBPE مربع است. اگر AB=۹۰، BC=۲۰ و DE=۶۰ باشد، EF کدام است؟",
    options: ["۳۵", "۲۵", "۳۰", "۴۰"],
    correctIndex: 2,
    explanation: "قطر مربع OP برابر شعاع دایره R است؛ پس OB=OE=R/√۲. از توان نقطهٔ B روی وتر AC داریم AB×BC=R²−OB²=R²/۲، بنابراین R²/۲=۹۰×۲۰=۱۸۰۰. برای نقطهٔ E نیز DE×EF=R²−OE²=۱۸۰۰؛ با DE=۶۰، مقدار EF=۳۰ است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۱", verifiedAt,
    reviewerNote: reviewNote + " شکل و داده‌ها با صفحهٔ ۵ دفترچه بررسی شد؛ از توان نقطه برای B و E استفاده شد."
  },
  {
    id: "upload-maaz-math11-geometry-internal-tangency-count-22",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "شرط مماس بودن درونی دو دایره",
    difficulty: "متوسط",
    prompt: "طول خط‌المرکزین دو دایرهٔ C(O,۶m−۱) و C′(O′,m²−۲) برابر ۶ است. اگر دو دایره مماس درونی باشند، چند مقدار برای m یافت می‌شود؟",
    options: ["۳", "۲", "۴", "۱"],
    correctIndex: 1,
    explanation: "در مماس درونی، قدرمطلق تفاضل شعاع‌ها برابر ۶ است: |(۶m−۱)−(m²−۲)|=۶. حل دو حالت، mهای ۱،۵،۷ و −۱ را می‌دهد؛ با شرط مثبت بودن هر دو شعاع، فقط m=۵ و m=۷ مجازند. پس دو مقدار معتبر وجود دارد.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۲", verifiedAt,
    reviewerNote: reviewNote + " صورت سؤال با صفحهٔ ۵ دفترچه تطبیق داده شد؛ شرط مثبت بودن شعاع‌ها نیز در شمارش لحاظ شد."
  },
  {
    id: "upload-maaz-math11-geometry-tangent-secant-arc-23",
    grade: "یازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "دایره", topic: "زاویهٔ مماس و قاطع و طول کمان",
    difficulty: "دشوار",
    prompt: "پاره‌خط AB بر دایره‌ای به شعاع ۳۶/π مماس است. اگر زاویهٔ A برابر ۳۵ درجه و زاویهٔ ABD برابر ۴۰ درجه باشد، طول کمان CD کدام است؟",
    options: ["۱۳", "۲۴", "۱۶", "۲۶"],
    correctIndex: 3,
    explanation: "در مثلث ABD، زاویهٔ ADB برابر ۱۰۵ درجه است؛ پس زاویهٔ BDC برابر ۷۵ درجه و کمان BC برابر ۱۵۰ درجه می‌شود. از قضیهٔ زاویهٔ بین مماس و قاطع، اختلاف کمان‌های BC و BD برابر ۷۰ درجه است؛ بنابراین کمان BD برابر ۸۰ و کمان CD برابر ۱۳۰ درجه است. محیط دایره ۷۲ است و طول کمان CD برابر (۱۳۰/۳۶۰)×۷۲=۲۶ می‌شود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۳", verifiedAt,
    reviewerNote: "شکل و داده‌ها با صفحهٔ ۵ دفترچه بررسی شد؛ حل مستقل با استفاده از زاویهٔ مماس و قاطع و زاویهٔ محاطی انجام شد."
  },
  {
    id: "upload-maaz-math11-statistics-quantified-set-26",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "گزاره‌های سور‌دار و دامنهٔ متغیر",
    difficulty: "متوسط",
    prompt: "اگر مجموعهٔ A={x∈N | ۳x<۳۹} دامنهٔ متغیر x باشد، ارزش کدام گزاره درست است؟",
    options: [
      "برای هر x∈A، ۲x²+۱<۱۹",
      "برای هر x∈A، x²−x>۰",
      "وجود دارد x∈A به‌طوری‌که x+۳>۵x",
      "وجود دارد x∈A به‌طوری‌که ۱/(x+۵)>۱/(۲x)"
    ],
    correctIndex: 3,
    explanation: "با فرض N={۱،۲،۳،…}، دامنه A شامل اعداد طبیعی ۱ تا ۱۲ است. گزینهٔ ۱ در x=۳ نادرست است؛ گزینهٔ ۲ در x=۱ نادرست است؛ گزینهٔ ۳ به شرط x<۳/۴ نیاز دارد و در A شاهدی ندارد. در گزینهٔ ۴، برای هر x>۵ نامساوی برقرار است؛ مثلاً x=۶، پس گزارهٔ وجودی درست است.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۶", verifiedAt,
    reviewerNote: "متن و گزینه‌ها با صفحهٔ ۶ دفترچهٔ ماز تطبیق داده شد؛ حل مستقل با دامنهٔ طبیعی و بررسی هر چهار گزاره انجام شد."
  },
  {
    id: "upload-maaz-math11-statistics-contrapositive-27",
    grade: "یازدهم", track: "ریاضی", subject: "آمار و احتمال",
    chapter: "آشنایی با منطق ریاضی", topic: "عکس نقیض و ارزش گزارهٔ شرطی",
    difficulty: "متوسط",
    prompt: "اگر r گزاره‌ای دلخواه و عکس نقیض گزارهٔ «نقیض q آنگاه p» نادرست باشد، کدام گزاره همواره درست است؟",
    options: ["r⇒q", "¬r⇒q", "¬p⇒r", "q⇒r"],
    correctIndex: 3,
    explanation: "عکس نقیض گزارهٔ ¬q⇒p برابر ¬p⇒q است. نادرست بودن آن یعنی ¬p درست و q نادرست است؛ بنابراین گزارهٔ q⇒r با مقدم نادرست، برای هر r درست خواهد بود.",
    sourceStatus: "reviewed", sourceTitle, sourceQuestionNumber: "۲۷", verifiedAt,
    reviewerNote: "صورت سؤال و گزینه‌ها با صفحهٔ ۶ دفترچه بررسی شد؛ عکس نقیض و حالت نادرستی گزارهٔ شرطی به‌صورت مستقل ارزیابی شد."
  },

];
