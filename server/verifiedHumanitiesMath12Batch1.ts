import type { ExamQuestion } from "./examBank";

const questionUrl = "https://dl.novinkonkor.com/nahaye/12/ensani/1405/khordad/soal-riazi-amar-12-e-m-1405.pdf";
const answerUrl = "https://dl.novinkonkor.com/nahaye/12/ensani/1405/khordad/javab-riazi-amar-12-e-m-1405.pdf";
const sourceTitle = "آزمون نهایی ریاضی و آمار ۳ دوازدهم انسانی ـ ۲۸ تیر ۱۴۰۵، مرکز ارزشیابی و تضمین کیفیت نظام آموزش و پرورش";
const reviewerNote = "صورت سؤال به‌صورت تمرین چهارگزینه‌ای مستقل بازنویسی شده و عین متن آزمون نیست. محاسبه و گزینهٔ صحیح با راهنمای رسمی نمره‌گذاری همان آزمون تطبیق داده شده است.";
const verifiedAt = new Date("2026-11-15T00:00:00.000Z");

type QuestionSeed = Omit<ExamQuestion, "sourceStatus" | "sourceTitle" | "sourceUrl" | "sourceAnswerUrl" | "sourceYear" | "verifiedAt" | "reviewerNote">;

const questionSeeds: QuestionSeed[] = [
  {
    id: "verified-human12-math3-1405-counting-product-01",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "آمار و احتمال",
    topic: "اصل ضرب در شمارش", difficulty: "آسان",
    prompt: "مریم برای رفتن به مهمانی ۵ جفت کفش و ۴ کیف متفاوت دارد. اگر یک جفت کفش و یک کیف انتخاب کند، چند انتخاب متفاوت خواهد داشت؟",
    options: ["۹", "۲۰", "۲۵", "۴۵"], correctIndex: 1,
    explanation: "برای هر یک از ۵ انتخاب کفش، ۴ انتخاب کیف وجود دارد؛ بنابراین طبق اصل ضرب، تعداد انتخاب‌ها ۵×۴=۲۰ است.",
    sourceQuestionNumber: "۴ ـ بخش الف"
  },
  {
    id: "verified-human12-math3-1405-probability-complement-02",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "آمار و احتمال",
    topic: "احتمال متمم", difficulty: "آسان",
    prompt: "احتمال صعود یک تیم والیبال به مرحلهٔ بعد ۶/۱۱ است. احتمال صعودنکردن این تیم چقدر است؟",
    options: ["۵/۱۱", "۶/۱۱", "۱/۱۱", "۱"], correctIndex: 0,
    explanation: "صعودکردن و صعودنکردن دو پیشامد متمم‌اند؛ پس احتمال صعودنکردن برابر ۱−۶/۱۱=۵/۱۱ است.",
    sourceQuestionNumber: "۴ ـ بخش ب"
  },
  {
    id: "verified-human12-math3-1405-arithmetic-insert-03",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای خطی",
    topic: "ساخت دنبالهٔ حسابی", difficulty: "آسان",
    prompt: "سه عدد را بین ۶ و ۴۲ قرار می‌دهیم تا دنبالهٔ ۶، ...، ...، ...، ۴۲ حسابی شود. عدد دومِ قرارگرفته کدام است؟",
    options: ["۱۵", "۲۴", "۲۷", "۳۳"], correctIndex: 1,
    explanation: "بین جملهٔ اول و پنجم چهار فاصلهٔ مساوی وجود دارد؛ اختلاف مشترک برابر (۴۲−۶)÷۴=۹ است. دنباله ۶، ۱۵، ۲۴، ۳۳، ۴۲ می‌شود؛ پس عدد دومِ قرارگرفته ۲۴ است.",
    sourceQuestionNumber: "۹"
  },
  {
    id: "verified-human12-math3-1405-arithmetic-general-term-04",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای خطی",
    topic: "جملهٔ عمومی دنبالهٔ حسابی", difficulty: "متوسط",
    prompt: "در یک دنبالهٔ حسابی، جملهٔ چهارم ۱۵ و جملهٔ دهم ۳۹ است. جملهٔ پانزدهم کدام است؟",
    options: ["۵۵", "۵۷", "۵۹", "۶۳"], correctIndex: 2,
    explanation: "اختلاف مشترک d=(۳۹−۱۵)÷(۱۰−۴)=۴ است. از جملهٔ چهارم تا پانزدهم ۱۱ گام داریم؛ بنابراین a₁₅=۱۵+۱۱×۴=۵۹.",
    sourceQuestionNumber: "۱۰"
  },
  {
    id: "verified-human12-math3-1405-arithmetic-sum-05",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای خطی",
    topic: "مجموع جمله‌های دنبالهٔ حسابی", difficulty: "متوسط",
    prompt: "مجموع ۲۰ جملهٔ نخست دنبالهٔ حسابی ۲، ۷، ۱۲، ... چقدر است؟",
    options: ["۹۴۰", "۹۶۰", "۹۹۰", "۱۰۱۰"], correctIndex: 2,
    explanation: "اختلاف مشترک ۵ و جملهٔ بیستم برابر ۲+۱۹×۵=۹۷ است. پس S₂₀=(۲۰÷۲)×(۲+۹۷)=۱۰×۹۹=۹۹۰.",
    sourceQuestionNumber: "۱۱"
  },
  {
    id: "verified-human12-math3-1405-geometric-term-06",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای غیرخطی",
    topic: "جملهٔ عمومی دنبالهٔ هندسی", difficulty: "آسان",
    prompt: "جملهٔ عمومی یک دنبالهٔ هندسی به‌صورت aₙ=۵×۳^(n−۱) است. جملهٔ چهارم این دنباله کدام است؟",
    options: ["۴۵", "۸۱", "۱۳۵", "۲۴۳"], correctIndex: 2,
    explanation: "با قرار دادن n=۴ داریم a₄=۵×۳^(۴−۱)=۵×۲۷=۱۳۵.",
    sourceQuestionNumber: "۱۲ ـ بخش الف"
  },
  {
    id: "verified-human12-math3-1405-geometric-sum-07",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای غیرخطی",
    topic: "مجموع دنبالهٔ هندسی", difficulty: "متوسط",
    prompt: "در یک دنبالهٔ هندسی، جملهٔ اول ۱۸ و نسبت مشترک ۳ است. مجموع چهار جملهٔ نخست چقدر است؟",
    options: ["۳۶۰", "۵۴۰", "۷۲۰", "۸۱۰"], correctIndex: 2,
    explanation: "چهار جملهٔ نخست ۱۸، ۵۴، ۱۶۲ و ۴۸۶ هستند؛ مجموع آن‌ها ۱۸+۵۴+۱۶۲+۴۸۶=۷۲۰ است.",
    sourceQuestionNumber: "۱۳"
  },
  {
    id: "verified-human12-math3-1405-exponential-function-08",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای غیرخطی",
    topic: "ویژگی‌های تابع نمایی", difficulty: "متوسط",
    prompt: "تابع f(x)=۵^x را در نظر بگیرید. کدام گزاره دربارهٔ نمودار آن درست است؟",
    options: ["نمودار محور xها را قطع می‌کند", "دامنهٔ تابع فقط اعداد مثبت است", "نمودار محور yها را در نقطهٔ (۰،۱) قطع می‌کند", "مقدار تابع در x=۲ برابر ۱۰ است"], correctIndex: 2,
    explanation: "f(۰)=۵⁰=۱ است؛ بنابراین نمودار محور yها را در (۰،۱) قطع می‌کند. همچنین دامنه همهٔ اعداد حقیقی است، تابع هیچ‌گاه صفر نمی‌شود و f(۲)=۲۵ است.",
    sourceQuestionNumber: "۱۶"
  },
  {
    id: "verified-human12-math3-1405-exponential-decay-09",
    grade: "دوازدهم", track: "انسانی", subject: "ریاضی و آمار", chapter: "الگوهای غیرخطی",
    topic: "کاهش نمایی", difficulty: "متوسط",
    prompt: "جمعیت کشوری ۲۰ میلیون نفر است و هر سال با نرخ ثابت ۱۰ درصد کاهش می‌یابد. جمعیت پس از دو سال تقریباً چند نفر خواهد بود؟",
    options: ["۱۶٫۲ میلیون", "۱۷ میلیون", "۱۸ میلیون", "۱۸٫۲ میلیون"], correctIndex: 0,
    explanation: "پس از هر سال ۹۰ درصد جمعیت باقی می‌ماند. پس از دو سال: ۲۰×۰٫۹×۰٫۹=۱۶٫۲ میلیون نفر.",
    sourceQuestionNumber: "۱۷"
  }
];

export const verifiedHumanitiesMath12Batch1: ExamQuestion[] = questionSeeds.map((question) => ({
  ...question,
  sourceStatus: "official-exam-adapted",
  sourceTitle,
  sourceUrl: questionUrl,
  sourceAnswerUrl: answerUrl,
  sourceYear: "۱۴۰۵",
  verifiedAt,
  reviewerNote
}));
