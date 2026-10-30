import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-10-30T00:00:00.000Z");
const officialSanjeshExamUrl = "https://www.sanjesh.org/fa-IR/sanjesh/4936/news/view/14591/13759/Staging";

export const verifiedPhysicsBatch1: ExamQuestion[] = [
  {
    id: "verified-physics3-motion-1405-exp-048",
    grade: "دوازدهم", track: "تجربی", subject: "فیزیک", chapter: "حرکت بر خط راست",
    topic: "مسافت و تندی متوسط از نمودار مکان ـ زمان", difficulty: "متوسط",
    prompt: "مکان متحرکی در آغاز ۱۲ متر است. تا رأس نمودار مکان ـ زمان به ۲۰ متر می‌رسد و سپس در پایان ۴ ثانیه به مبدأ مکان بازمی‌گردد. اگر رأس نمودار در میانهٔ این بازه باشد، تندی متوسط در ۴ ثانیه چند متر بر ثانیه است؟",
    options: ["۵", "۶", "۷", "۸"],
    correctIndex: 2,
    explanation: "مسافت رفت از ۱۲ تا ۲۰ برابر ۸ متر و مسافت برگشت از ۲۰ تا صفر برابر ۲۰ متر است؛ پس مسافت کل ۲۸ متر و تندی متوسط ۲۸÷۴=۷ متر بر ثانیه است.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه فیزیک",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۴۸", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۴۸ فیزیک کنکور تجربی ۱۴۰۵ دربارهٔ خواندن نمودار مکان ـ زمان؛ داده‌ها و گزینه‌ها تغییر کرده‌اند."
  },
  {
    id: "verified-physics3-friction-1405-exp-051",
    grade: "دوازدهم", track: "تجربی", subject: "فیزیک", chapter: "دینامیک",
    topic: "اصطکاک جنبشی و حرکت با شتاب ثابت", difficulty: "متوسط",
    prompt: "جسمی با سرعت اولیهٔ ۵ متر بر ثانیه روی سطح افقی زبر حرکت می‌کند. ضریب اصطکاک جنبشی ۰٫۲۵ و g برابر ۱۰ متر بر مجذور ثانیه است. جسم پس از چند ثانیه می‌ایستد؟",
    options: ["۱ ثانیه", "۲ ثانیه", "۲٫۵ ثانیه", "۴ ثانیه"],
    correctIndex: 1,
    explanation: "شتاب ناشی از اصطکاک با اندازهٔ μg=۰٫۲۵×۱۰=۲٫۵ متر بر مجذور ثانیه و خلاف جهت حرکت است. زمان توقف از v=v₀−at به دست می‌آید: ۰=۵−۲٫۵t، پس t=۲ ثانیه.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه فیزیک",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۵۱", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۵۱ فیزیک کنکور تجربی ۱۴۰۵ دربارهٔ اصطکاک و توقف؛ اعداد بازطراحی شده‌اند."
  },
  {
    id: "verified-physics3-wave-speed-1405-exp-056",
    grade: "دوازدهم", track: "تجربی", subject: "فیزیک", chapter: "نوسان و موج",
    topic: "تندی ذره در حرکت هماهنگ ساده", difficulty: "متوسط",
    prompt: "ذره‌ای از ریسمان در یک موج سینوسی با دامنهٔ ۴ سانتی‌متر و بسامد ۵ هرتز، در لحظه‌ای از مکان تعادل می‌گذرد. تندی آن در این لحظه چقدر است؟",
    options: ["۰٫۲π متر بر ثانیه", "۰٫۴π متر بر ثانیه", "۰٫۸π متر بر ثانیه", "π متر بر ثانیه"],
    correctIndex: 1,
    explanation: "ذرهٔ ریسمان در مکان تعادل بیشترین تندی را دارد: v=ωA=2πfA. با A=۰٫۰۴ متر و f=۵ هرتز، v=۲π×۵×۰٫۰۴=۰٫۴π متر بر ثانیه است.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه فیزیک",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۵۶", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۵۶ فیزیک کنکور تجربی ۱۴۰۵ دربارهٔ تندی ذرهٔ موج؛ اعداد و صورت سؤال تغییر کرده‌اند."
  },
  {
    id: "verified-physics3-motion-1405-math-046",
    grade: "دوازدهم", track: "ریاضی", subject: "فیزیک", chapter: "حرکت بر خط راست",
    topic: "تندی متوسط در حرکت با تغییر جهت", difficulty: "متوسط",
    prompt: "متحرکی از مکان ۱۰ متر آغاز می‌کند، تا مکان ۱۸ متر پیش می‌رود و سپس در پایان ۴ ثانیه به مکان صفر می‌رسد. با فرض اینکه در میانهٔ بازه تغییر جهت دهد، تندی متوسط آن چقدر است؟",
    options: ["۵٫۵ متر بر ثانیه", "۶٫۵ متر بر ثانیه", "۷ متر بر ثانیه", "۸ متر بر ثانیه"],
    correctIndex: 1,
    explanation: "مسافت رفت ۱۸−۱۰=۸ متر و مسافت برگشت ۱۸ متر است؛ مسافت کل ۲۶ متر می‌شود. تندی متوسط ۲۶÷۴=۶٫۵ متر بر ثانیه است.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم ریاضی و فنی، دفترچه فیزیک",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۴۶", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۴۶ فیزیک کنکور ریاضی ۱۴۰۵ دربارهٔ تندی متوسط؛ داده‌ها و گزینه‌ها بازنویسی شده‌اند."
  },
  {
    id: "verified-physics3-braking-1405-math-047",
    grade: "دوازدهم", track: "ریاضی", subject: "فیزیک", chapter: "حرکت بر خط راست",
    topic: "ترمز و حرکت با شتاب ثابت", difficulty: "آسان",
    prompt: "خودرویی با سرعت ۲۰ متر بر ثانیه حرکت می‌کند و با شتاب ثابتِ خلاف جهت حرکت به اندازهٔ ۴ متر بر مجذور ثانیه ترمز می‌گیرد. تا توقف کامل چه مسافتی می‌پیماید؟",
    options: ["۲۵ متر", "۴۰ متر", "۵۰ متر", "۱۰۰ متر"],
    correctIndex: 2,
    explanation: "از رابطهٔ v²=v₀²+2aΔx استفاده می‌کنیم. در لحظهٔ توقف v=۰ و a=−۴ است؛ بنابراین ۰=۴۰۰−۸Δx و مسافت توقف Δx=۵۰ متر می‌شود.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم ریاضی و فنی، دفترچه فیزیک",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۴۷", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۴۷ فیزیک کنکور ریاضی ۱۴۰۵ در مبحث ترمز و حرکت؛ داده‌ها برای مسئله‌ای مستقل تغییر کرده‌اند."
  }
];
