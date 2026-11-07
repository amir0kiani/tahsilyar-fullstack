import type { ExamQuestion } from "./examBank";

// Independently authored practice items based on the lesson coverage in the
// user-provided 15 Aban 1405 Maz booklets for Grades 11 and 12.
const verifiedAt = new Date("2026-11-06T00:00:00.000Z");
const source12R = "آزمون ماز پایه دوازدهم ریاضی و فنی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";
const source11T = "آزمون ماز پایه یازدهم تجربی، ۱۵ آبان ۱۴۰۵ (فایل ارسالی کاربر)";

export const verifiedUploadedMathPhysics: ExamQuestion[] = [
  {
    id: "uploaded-math12-trig-001", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "رابطهٔ بنیادی مثلثاتی", difficulty: "آسان",
    prompt: "اگر زاویهٔ x حقیقی باشد، مقدار sin²x + cos²x همواره برابر کدام است؟",
    options: ["۰", "۱", "sin x", "cos x"],
    correctIndex: 1,
    explanation: "طبق اتحاد بنیادی مثلثاتی، برای هر x داریم sin²x + cos²x = 1.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش حسابان، پرسش‌های ۱ تا ۱۰", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث مثلثات در بودجه‌بندی آزمون؛ صورت سؤال و گزینه‌ها تألیفی‌اند."
  },
  {
    id: "uploaded-math12-trig-002", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "دورهٔ تناوب تابع سینوس", difficulty: "متوسط",
    prompt: "دورهٔ تناوب تابع f(x)=sin(3x) کدام است؟",
    options: ["۲π", "π", "۲π/۳", "π/۳"],
    correctIndex: 2,
    explanation: "دورهٔ تناوب sin(bx) برابر ۲π/|b| است؛ پس برای b=3 دوره ۲π/۳ می‌شود.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش حسابان، پرسش‌های ۱ تا ۱۰", verifiedAt,
    reviewerNote: "سؤال تألیفی برای سنجش تناوب تابع مثلثاتی؛ فرمول و پاسخ مستقل بررسی شده‌اند."
  },
  {
    id: "uploaded-math12-trig-003", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "برد تابع مثلثاتی", difficulty: "متوسط",
    prompt: "برد تابع f(x)=4−2sin x کدام بازه است؟",
    options: ["[−۲، ۲]", "[۲، ۶]", "[−۴، ۴]", "[۰، ۴]"],
    correctIndex: 1,
    explanation: "چون sin x بین ۱− و ۱ است، مقدار ۲sin x بین ۲− و ۲ و در نتیجه ۴−۲sin x بین ۲ و ۶ قرار می‌گیرد.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش حسابان، پرسش‌های ۱ تا ۱۰", verifiedAt,
    reviewerNote: "تمرین بازطراحی‌شده از مباحث تابع مثلثاتی و برد؛ محاسبهٔ بازه کنترل شده است."
  },
  {
    id: "uploaded-math12-trig-004", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "علامت نسبت‌های مثلثاتی در ربع‌ها", difficulty: "آسان",
    prompt: "اگر زاویهٔ θ در ربع دوم دایرهٔ مثلثاتی باشد، کدام گزاره درست است؟",
    options: ["sin θ مثبت و cos θ منفی است", "sin θ و cos θ هر دو مثبت‌اند", "sin θ منفی و cos θ مثبت است", "هر دو نسبت منفی‌اند"],
    correctIndex: 0,
    explanation: "در ربع دوم مختصات y مثبت و x منفی است؛ بنابراین سینوس مثبت و کسینوس منفی خواهد بود.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش حسابان، پرسش‌های ۱ تا ۱۰", verifiedAt,
    reviewerNote: "سؤال تألیفی بر پایهٔ دایرهٔ مثلثاتی و تعیین علامت نسبت‌ها."
  },
  {
    id: "uploaded-math12-trig-005", grade: "دوازدهم", track: "ریاضی", subject: "حسابان",
    chapter: "مثلثات", topic: "مقدار نسبت‌های زاویهٔ خاص", difficulty: "متوسط",
    prompt: "مقدار sin(π/6)+cos(π/3) کدام است؟",
    options: ["۰", "۱/۲", "۱", "√۳"],
    correctIndex: 2,
    explanation: "sin(π/6)=۱/۲ و cos(π/3)=۱/۲ است؛ مجموع آن‌ها برابر ۱ می‌شود.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش حسابان، پرسش‌های ۱ تا ۱۰", verifiedAt,
    reviewerNote: "تمرین مستقل از نسبت‌های زاویه‌های خاص؛ پاسخ با مقادیر استاندارد مثلثاتی تطبیق داده شده است."
  },

  {
    id: "uploaded-geometry12-matrix-001", grade: "دوازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "ماتریس و کاربردها", topic: "دترمینان ماتریس دو در دو", difficulty: "آسان",
    prompt: "دترمینان ماتریس [[۲، ۱]، [۳، ۴]] کدام است؟",
    options: ["۵", "۸", "۱۱", "۱۴"],
    correctIndex: 0,
    explanation: "دترمینان ماتریس دو در دو برابر ad−bc است؛ بنابراین ۲×۴−۱×۳=۵.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش هندسه، مبحث ماتریس", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث ماتریس؛ داده‌ها و صورت سؤال جدید هستند."
  },
  {
    id: "uploaded-geometry12-matrix-002", grade: "دوازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "ماتریس و کاربردها", topic: "جمع ماتریس‌ها", difficulty: "آسان",
    prompt: "اگر A=[[۱، ۲]، [۰، ۳]] و B=[[۲، ۱]، [۴، ۰]] باشد، درایهٔ سطر دوم و ستون اول A+B چند است؟",
    options: ["۰", "۳", "۴", "۵"],
    correctIndex: 2,
    explanation: "درایه‌های هم‌مکان با هم جمع می‌شوند؛ درایهٔ سطر دوم و ستون اول برابر ۰+۴=۴ است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش هندسه، مبحث ماتریس", verifiedAt,
    reviewerNote: "سؤال تألیفی برای جمع ماتریس‌ها؛ پاسخ با جمع درایه‌های هم‌مکان به دست می‌آید."
  },
  {
    id: "uploaded-geometry12-matrix-003", grade: "دوازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "ماتریس و کاربردها", topic: "ماتریس همانی", difficulty: "آسان",
    prompt: "اگر A ماتریسی مربعی باشد، کدام رابطه دربارهٔ ماتریس همانی I درست است؟",
    options: ["AI=A", "AI=۰", "AI=I فقط وقتی A=I", "AI=A²"],
    correctIndex: 0,
    explanation: "ماتریس همانی عنصر خنثی ضرب ماتریسی است؛ بنابراین ضرب A در I، خود ماتریس A را می‌دهد.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش هندسه، مبحث ماتریس", verifiedAt,
    reviewerNote: "تمرین مفهومی تألیفی دربارهٔ عنصر خنثی ضرب ماتریسی."
  },
  {
    id: "uploaded-geometry12-matrix-004", grade: "دوازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "ماتریس و کاربردها", topic: "وارون‌پذیری ماتریس", difficulty: "متوسط",
    prompt: "کدام شرط برای وارون‌پذیر بودن یک ماتریس مربعی ضروری است؟",
    options: ["دترمینان آن صفر نباشد", "همهٔ درایه‌های آن مثبت باشند", "همهٔ درایه‌های قطر اصلی برابر باشند", "مجموع درایه‌های آن یک باشد"],
    correctIndex: 0,
    explanation: "ماتریس مربعی زمانی وارون‌پذیر است که دترمینان آن ناصفر باشد.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش هندسه، مبحث ماتریس", verifiedAt,
    reviewerNote: "سؤال مستقل دربارهٔ شرط وارون‌پذیری؛ گزارهٔ ریاضی کنترل شده است."
  },
  {
    id: "uploaded-geometry12-matrix-005", grade: "دوازدهم", track: "ریاضی", subject: "هندسه",
    chapter: "ماتریس و کاربردها", topic: "ضرب ماتریس‌ها", difficulty: "متوسط",
    prompt: "اگر A از مرتبهٔ ۲×۳ و B از مرتبهٔ ۳×۴ باشد، حاصل‌ضرب AB چه مرتبه‌ای دارد؟",
    options: ["۳×۳", "۲×۴", "۴×۲", "۳×۴"],
    correctIndex: 1,
    explanation: "در ضرب ماتریسی، تعداد ستون‌های ماتریس اول باید با تعداد سطرهای ماتریس دوم برابر باشد؛ مرتبهٔ حاصل از تعداد سطرهای A و ستون‌های B یعنی ۲×۴ است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش هندسه، مبحث ماتریس", verifiedAt,
    reviewerNote: "تمرین تألیفی دربارهٔ شرط تعریف و مرتبهٔ حاصل‌ضرب ماتریس‌ها."
  },

  {
    id: "uploaded-discrete12-number-001", grade: "دوازدهم", track: "ریاضی", subject: "ریاضیات گسسته",
    chapter: "آشنایی با نظریه اعداد", topic: "بزرگ‌ترین مقسوم‌علیه مشترک", difficulty: "آسان",
    prompt: "بزرگ‌ترین مقسوم‌علیه مشترک ۴۸ و ۶۰ کدام است؟",
    options: ["۶", "۸", "۱۲", "۲۴"],
    correctIndex: 2,
    explanation: "مقسوم‌علیه‌های مشترک دو عدد تا ۱۲ ادامه دارند و ۱۲ بزرگ‌ترین آن‌هاست؛ بنابراین ب.م.م برابر ۱۲ است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش ریاضیات گسسته، نظریه اعداد", verifiedAt,
    reviewerNote: "تمرین مستقل از مبحث ب.م.م و بخش نظریه اعداد."
  },
  {
    id: "uploaded-discrete12-number-002", grade: "دوازدهم", track: "ریاضی", subject: "ریاضیات گسسته",
    chapter: "آشنایی با نظریه اعداد", topic: "عدد اول", difficulty: "آسان",
    prompt: "کدام عدد اول است؟",
    options: ["۲۱", "۲۷", "۲۹", "۳۳"],
    correctIndex: 2,
    explanation: "عدد ۲۹ فقط بر ۱ و خودش بخش‌پذیر است؛ سه گزینهٔ دیگر بر ۳ بخش‌پذیرند.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش ریاضیات گسسته، نظریه اعداد", verifiedAt,
    reviewerNote: "سؤال تألیفی برای تشخیص عدد اول؛ بخش‌پذیری گزینه‌ها بررسی شده است."
  },
  {
    id: "uploaded-discrete12-number-003", grade: "دوازدهم", track: "ریاضی", subject: "ریاضیات گسسته",
    chapter: "آشنایی با نظریه اعداد", topic: "باقی‌ماندهٔ تقسیم", difficulty: "متوسط",
    prompt: "باقی‌ماندهٔ تقسیم ۷۴ بر ۹ کدام است؟",
    options: ["۲", "۳", "۴", "۵"],
    correctIndex: 1,
    explanation: "۷۴=۹×۸+۲؛ پس باقی‌مانده ۲ است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش ریاضیات گسسته، نظریه اعداد", verifiedAt,
    reviewerNote: "تمرین محاسباتی مستقل دربارهٔ باقی‌ماندهٔ تقسیم."
  },
  {
    id: "uploaded-discrete12-number-004", grade: "دوازدهم", track: "ریاضی", subject: "ریاضیات گسسته",
    chapter: "آشنایی با نظریه اعداد", topic: "هم‌نهشتی", difficulty: "متوسط",
    prompt: "کدام عدد با ۲۳ به پیمانهٔ ۵ هم‌نهشت است؟",
    options: ["۲", "۳", "۴", "۵"],
    correctIndex: 1,
    explanation: "۲۳ هنگام تقسیم بر ۵ باقی‌ماندهٔ ۳ دارد؛ بنابراین هر عددی با باقی‌ماندهٔ ۳ به پیمانهٔ ۵ با آن هم‌نهشت است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش ریاضیات گسسته، نظریه اعداد", verifiedAt,
    reviewerNote: "سؤال تألیفی دربارهٔ هم‌نهشتی؛ محاسبهٔ باقی‌مانده کنترل شده است."
  },
  {
    id: "uploaded-discrete12-number-005", grade: "دوازدهم", track: "ریاضی", subject: "ریاضیات گسسته",
    chapter: "آشنایی با نظریه اعداد", topic: "الگوریتم اقلیدس", difficulty: "متوسط",
    prompt: "در الگوریتم اقلیدس برای محاسبهٔ ب.م.م دو عدد، پس از هر مرحله چه کاری انجام می‌شود؟",
    options: ["عدد بزرگ‌تر با مجموع دو عدد جایگزین می‌شود", "باقی‌ماندهٔ تقسیم قبلی در مرحلهٔ بعد به کار می‌رود", "هر دو عدد بر ۲ تقسیم می‌شوند", "عدد کوچک‌تر از عدد بزرگ‌تر کم می‌شود تا صفر شود"],
    correctIndex: 1,
    explanation: "در الگوریتم اقلیدس، ب.م.م(a,b)=ب.م.م(b,r) است که r باقی‌ماندهٔ تقسیم a بر b است؛ این روند تا باقی‌ماندهٔ صفر ادامه می‌یابد.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source12R, sourceQuestionNumber: "بخش ریاضیات گسسته، نظریه اعداد", verifiedAt,
    reviewerNote: "تمرین مفهومی مستقل از الگوریتم اقلیدس؛ رابطهٔ بازگشتی ب.م.م بررسی شده است."
  },

  {
    id: "uploaded-physics11-electrostatics-001", grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "قانون کولن", difficulty: "آسان",
    prompt: "اگر فاصلهٔ دو بار نقطه‌ای در خلأ دو برابر شود و مقدار بارها ثابت بماند، اندازهٔ نیروی الکتریکی چه تغییری می‌کند؟",
    options: ["دو برابر می‌شود", "نصف می‌شود", "یک‌چهارم می‌شود", "چهار برابر می‌شود"],
    correctIndex: 2,
    explanation: "طبق قانون کولن، نیرو با مجذور فاصله نسبت وارون دارد؛ دو برابر شدن فاصله، نیرو را به یک‌چهارم کاهش می‌دهد.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source11T, sourceQuestionNumber: "بخش فیزیک، الکتریسیتهٔ ساکن", verifiedAt,
    reviewerNote: "سؤال تألیفی بر اساس محدودهٔ الکتریسیتهٔ ساکن در بودجه‌بندی فایل؛ قانون کولن کنترل شده است."
  },
  {
    id: "uploaded-physics11-electrostatics-002", grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "جهت میدان الکتریکی", difficulty: "آسان",
    prompt: "جهت میدان الکتریکی در یک نقطه را با توجه به نیروی وارد بر کدام بار آزمایشی تعریف می‌کنند؟",
    options: ["بار مثبت", "بار منفی", "بار خنثی", "هر باری با جرم بیشتر"],
    correctIndex: 0,
    explanation: "جهت میدان الکتریکی، جهت نیروی وارد بر یک بار آزمایشی مثبت در آن نقطه تعریف می‌شود.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source11T, sourceQuestionNumber: "بخش فیزیک، الکتریسیتهٔ ساکن", verifiedAt,
    reviewerNote: "تمرین مفهومی مستقل دربارهٔ تعریف جهت میدان الکتریکی."
  },
  {
    id: "uploaded-physics11-electrostatics-003", grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "میدان بار نقطه‌ای", difficulty: "متوسط",
    prompt: "اندازهٔ میدان الکتریکی ناشی از یک بار نقطه‌ای در فاصلهٔ r با کدام رابطه متناسب است؟",
    options: ["r", "r²", "۱/r", "۱/r²"],
    correctIndex: 3,
    explanation: "میدان بار نقطه‌ای از رابطهٔ E=k|q|/r² به دست می‌آید؛ بنابراین با مجذور فاصله نسبت وارون دارد.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source11T, sourceQuestionNumber: "بخش فیزیک، الکتریسیتهٔ ساکن", verifiedAt,
    reviewerNote: "سؤال تألیفی برای سنجش وابستگی میدان به فاصله؛ رابطهٔ میدان بار نقطه‌ای بررسی شده است."
  },
  {
    id: "uploaded-physics11-electrostatics-004", grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "پایستگی بار الکتریکی", difficulty: "متوسط",
    prompt: "دو جسم خنثی در یک فرایند عایق از هم جدا می‌شوند و یکی از آن‌ها الکترون از دست می‌دهد. بار کل دو جسم پس از فرایند چه وضعی دارد؟",
    options: ["مثبت می‌شود", "منفی می‌شود", "همچنان صفر می‌ماند", "به مقدار جرم اجسام بستگی دارد"],
    correctIndex: 2,
    explanation: "در فرایند انتقال الکترون، بار از یک جسم به جسم دیگر منتقل می‌شود و بار کل یک دستگاه منزوی پایسته می‌ماند؛ پس مجموع بار دو جسم صفر است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source11T, sourceQuestionNumber: "بخش فیزیک، الکتریسیتهٔ ساکن", verifiedAt,
    reviewerNote: "تمرین مستقل دربارهٔ پایستگی بار؛ فرض منزوی‌بودن دستگاه در متن مشخص شده است."
  },
  {
    id: "uploaded-physics11-electrostatics-005", grade: "یازدهم", track: "تجربی", subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن", topic: "پتانسیل الکتریکی", difficulty: "متوسط",
    prompt: "اختلاف پتانسیل الکتریکی میان دو نقطه از نظر انرژی پتانسیل الکتریکی چه مفهومی دارد؟",
    options: ["انرژی پتانسیل به ازای واحد بار", "نیرو به ازای واحد جرم", "بار الکتریکی به ازای واحد زمان", "انرژی جنبشی به ازای واحد حجم"],
    correctIndex: 0,
    explanation: "اختلاف پتانسیل برابر تغییر انرژی پتانسیل الکتریکی به ازای واحد بار است؛ یکای آن ولت یا ژول بر کولن است.",
    sourceStatus: "mock-exam-adapted", sourceTitle: source11T, sourceQuestionNumber: "بخش فیزیک، الکتریسیتهٔ ساکن", verifiedAt,
    reviewerNote: "سؤال مستقل از ابتدای مبحث پتانسیل الکتریکی که در بودجه‌بندی فایل آمده است."
  }
];
