import type { ExamQuestion } from "./examBank";

// Adapted from the Kānun Grade 11 Mathematics mock exam dated 21 Aban 1400.
// Q91 adapts only the quantization concept; its new numeric answer is calculated independently.
// Q92, Q96 and Q97 are checked against the printed explanatory key on page 17.
const verifiedAt = new Date("2026-11-18T00:00:00.000Z");
const sourceTitle = "آزمون آزمایشی قلم‌چی پایه یازدهم ریاضی، ۲۱ آبان ۱۴۰۰";
const sourceUrl = "https://abadgaranedu.ir/wp-content/uploads/2021/11/kanoon-Sal11-Riazi-21Aban1400-konkur.in_.pdf";
const reviewerNote = "سؤال از مبحث و سؤال مشخص‌شده در دفترچه قلم‌چی اقتباس و برای تحصیل‌یار بازنویسی شده است؛ صورت و گزینه‌ها در موارد لازم تغییر کرده‌اند. پاسخ عددی/مفهومی با پاسخ تشریحی همان دفترچه کنترل شده است.";

function adapted(
  id: string,
  topic: string,
  sourceQuestionNumber: string,
  prompt: string,
  options: [string, string, string, string],
  correctIndex: number,
  explanation: string,
  difficulty: "آسان" | "متوسط" | "دشوار" = "متوسط",
  reviewerNoteOverride?: string
): ExamQuestion {
  return {
    id: `mock-adapted-grade11-math-physics-kanoon-1400-${id}`,
    grade: "یازدهم",
    track: "ریاضی",
    subject: "فیزیک",
    chapter: "الکتریسیتهٔ ساکن",
    topic,
    difficulty,
    prompt,
    options,
    correctIndex,
    explanation,
    sourceStatus: "mock-exam-adapted",
    sourceTitle,
    sourceUrl,
    sourceAnswerUrl: sourceUrl,
    sourceYear: "۱۴۰۰",
    sourceQuestionNumber,
    verifiedAt,
    reviewerNote: reviewerNoteOverride ?? reviewerNote,
  };
}

export const verifiedGrade11MathPhysicsKanoonAban1400: ExamQuestion[] = [
  adapted(
    "quantized-charge-91",
    "کوانتیده بودن بار الکتریکی",
    "۹۱؛ پاسخ تشریحی صفحهٔ ۱۶",
    "جسمی خنثی با از دست دادن ۳ الکترون باردار می‌شود. بار نهایی جسم با فرض e=۱٫۶×۱۰⁻¹⁹ کولن کدام است؟",
    ["−۴٫۸×۱۰⁻¹⁹ C", "+۴٫۸×۱۰⁻¹⁹ C", "+۱٫۶×۱۰⁻¹⁹ C", "−۱٫۶×۱۰⁻¹⁹ C"],
    1,
    "با از دست دادن الکترون، جسم بار مثبت پیدا می‌کند. اندازهٔ بار برابر ne است: ۳×۱٫۶×۱۰⁻¹⁹=۴٫۸×۱۰⁻¹⁹ کولن؛ پس بار نهایی مثبت است.",
    "آسان",
    "مبحث و اصل کوانتیده‌بودن بار از سؤال ۹۱ قلم‌چی اقتباس شده، اما صورت و داده‌های عددی این نسخه مستقل بازنویسی شده‌اند؛ پاسخ +۴٫۸×۱۰⁻¹⁹ کولن مستقیماً از رابطهٔ q=ne محاسبه شده و عدد پاسخ سؤال اصلی نقل نشده است. پاسخ تشریحی صفحهٔ ۱۶ برای تطبیق اصل کوانتیده‌بودن بار بررسی شد."
  ),
  adapted(
    "charge-transfer-coulomb-92",
    "قانون کولن و انتقال بار",
    "۹۲؛ پاسخ تشریحی صفحهٔ ۱۷",
    "دو بار نقطه‌ای هم‌اندازه و هم‌نام در فاصلهٔ ۳۰ سانتی‌متر، یکدیگر را با نیروی ۰٫۱ نیوتون دفع می‌کنند. اگر ۱٫۲۵×۱۰¹³ الکترون از یکی برداشته و به دیگری منتقل شود، نیروی جدید چه اندازه و از چه نوع است؟ (k=۹×۱۰⁹ و e=۱٫۶×۱۰⁻¹⁹)",
    ["۰٫۱ N جاذبه", "۰٫۳ N جاذبه", "۰٫۱ N دافعه", "۰٫۳ N دافعه"],
    1,
    "از قانون کولن، اندازهٔ هر بار اولیه ۱ میکروکولن به دست می‌آید. بار منتقل‌شده ne=۲ میکروکولن است؛ بنابراین بارهای نهایی از نظر علامت مخالف و اندازه‌هایشان ۱ و ۳ میکروکولن است. پس F=k|q₁q₂|/r²=۰٫۳ نیوتون و نیرو جاذبه است.",
    "دشوار"
  ),
  adapted(
    "electric-force-acceleration-96",
    "نیروی الکتریکی و شتاب ذره",
    "۹۶؛ پاسخ تشریحی صفحهٔ ۱۷",
    "ذره‌ای با جرم ۲ گرم و بار مثبت ۲ میکروکولن در میدان الکتریکی یکنواختی به بزرگی ۴×۱۰⁴ نیوتون بر کولن قرار دارد. بزرگی شتاب ناشی از نیروی الکتریکی چقدر است؟ اثر سایر نیروها را نادیده بگیرید.",
    ["۲۰ m/s²", "۴۰ m/s²", "۶۰ m/s²", "۸۰ m/s²"],
    1,
    "نیروی الکتریکی qE=۲×۱۰⁻⁶×۴×۱۰⁴=۰٫۰۸ نیوتون است. جرم ۲ گرم برابر ۰٫۰۰۲ کیلوگرم است؛ بنابراین a=F/m=۰٫۰۸/۰٫۰۰۲=۴۰ متر بر مجذور ثانیه.",
    "متوسط"
  ),
  adapted(
    "field-lines-potential-97",
    "تراکم خطوط میدان و پتانسیل",
    "۹۷؛ پاسخ تشریحی صفحهٔ ۱۷",
    "خطوط میدان الکتریکی در راستای A به C هستند. تراکم خطوط در ناحیهٔ B از C و در C از A بیشتر است. کدام مقایسه درست است؟",
    ["V_A<V_B<V_C و E_A>E_B>E_C", "V_A>V_B>V_C و E_B>E_C>E_A", "V_B>V_C>V_A و E_B>E_C>E_A", "V_C>V_B>V_A و E_C>E_B>E_A"],
    1,
    "پتانسیل در جهت میدان الکتریکی کاهش می‌یابد؛ پس V_A>V_B>V_C است. بزرگی میدان با تراکم خطوط میدان متناسب است؛ بنابراین E_B>E_C>E_A خواهد بود.",
    "متوسط"
  ),

];
