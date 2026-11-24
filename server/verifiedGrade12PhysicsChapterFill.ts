import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-24T00:00:00.000Z");

const experimentalBook = {
  sourceTitle: "تألیفی تحصیل‌یار بر اساس کتاب فیزیک (۳) دوازدهم تجربی، کد ۱۱۲۲۴۴، سال تحصیلی ۱۴۰۵–۱۴۰۶",
  sourceUrl: "https://dl.daneshchi.ir/file/chap-school/Physic-Tajrobi-12_Daneshchi.iR.pdf",
};

const mathematicsBook = {
  sourceTitle: "تألیفی تحصیل‌یار بر اساس کتاب فیزیک (۳) دوازدهم ریاضی، کد ۱۱۲۲۰۹، سال تحصیلی ۱۴۰۵–۱۴۰۶",
  sourceUrl: "https://dl.daneshchi.ir/file/chap-school/Physic-Riazi-12_Daneshchi.iR.pdf",
};

type PhysicsQuestionInput = {
  id: string;
  track: "تجربی" | "ریاضی";
  chapter: string;
  topic: string;
  difficulty: "آسان" | "متوسط" | "سخت";
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
};

function makeQuestion(input: PhysicsQuestionInput): ExamQuestion {
  const source = input.track === "تجربی" ? experimentalBook : mathematicsBook;
  return {
    ...input,
    grade: "دوازدهم",
    subject: "فیزیک",
    sourceStatus: "curriculum-verified",
    sourceTitle: source.sourceTitle,
    sourceUrl: source.sourceUrl,
    sourceYear: "۱۴۰۵–۱۴۰۶",
    verifiedAt,
    reviewerNote: "سؤال تألیفی و مستقل بر اساس محتوای فصل مشخص‌شده در کتاب درسی چاپ ۱۴۰۵–۱۴۰۶ است؛ به آزمون رسمی یا آزمون آزمایشی نسبت داده نشده است. کلید و توضیح با محاسبه یا استدلال مستقل بازبینی شده‌اند. کد و رشتهٔ کتاب با فهرست رسمی رشد تطبیق داده شده است.",
  };
}

export const verifiedGrade12PhysicsChapterFill: ExamQuestion[] = [
  // Experimental Sciences — Chapter 3: Oscillations and Waves.
  makeQuestion({
    id: "authored-grade12-physics-exp-wave-period-01",
    track: "تجربی",
    chapter: "نوسان و موج",
    topic: "بسامد و دورهٔ نوسان دوره‌ای",
    difficulty: "آسان",
    prompt: "نوسانگری در مدت ۲ ثانیه، ۵ نوسان کامل انجام می‌دهد. دوره و بسامد آن به‌ترتیب کدام است؟",
    options: ["۰٫۲ ثانیه و ۵ هرتز", "۰٫۴ ثانیه و ۲٫۵ هرتز", "۲٫۵ ثانیه و ۰٫۴ هرتز", "۵ ثانیه و ۲ هرتز"],
    correctIndex: 1,
    explanation: "بسامد برابر تعداد نوسان بر زمان است: f=5/2=2.5 Hz. دوره معکوس بسامد است؛ بنابراین T=1/2.5=0.4 s.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-exp-wave-equilibrium-02",
    track: "تجربی",
    chapter: "نوسان و موج",
    topic: "سرعت و شتاب در نقطهٔ تعادل حرکت هماهنگ ساده",
    difficulty: "متوسط",
    prompt: "ذره‌ای در حرکت هماهنگ ساده از نقطهٔ تعادل می‌گذرد. در همان لحظه، کدام وضعیت درست است؟",
    options: ["اندازهٔ سرعت صفر و اندازهٔ شتاب بیشینه است.", "اندازهٔ سرعت بیشینه و شتاب صفر است.", "اندازهٔ سرعت و شتاب هر دو صفرند.", "اندازهٔ سرعت و اندازهٔ شتاب هر دو بیشینه‌اند."],
    correctIndex: 1,
    explanation: "در نقطهٔ تعادل، جابه‌جایی از تعادل صفر است؛ پس طبق a=−ω²x شتاب صفر می‌شود. در حرکت هماهنگ ساده، تندی در همین نقطه بیشینه است.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-exp-wave-speed-03",
    track: "تجربی",
    chapter: "نوسان و موج",
    topic: "رابطهٔ تندی انتشار، بسامد و طول موج",
    difficulty: "آسان",
    prompt: "موجی با بسامد ۸ هرتز و طول موج ۰٫۷۵ متر در محیطی منتشر می‌شود. تندی انتشار موج چقدر است؟",
    options: ["۴ متر بر ثانیه", "۶ متر بر ثانیه", "۸ متر بر ثانیه", "۱۰ متر بر ثانیه"],
    correctIndex: 1,
    explanation: "تندی انتشار موج از رابطهٔ v=fλ به دست می‌آید؛ بنابراین v=8×0.75=6 m/s.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-exp-wave-refraction-04",
    track: "تجربی",
    chapter: "نوسان و موج",
    topic: "تغییر طول موج هنگام شکست موج",
    difficulty: "متوسط",
    prompt: "موجی از محیطی وارد محیط دیگری می‌شود که تندی انتشار در آن کمتر است. اگر بسامد منبع تغییر نکند، کدام کمیت در محیط دوم کاهش می‌یابد؟",
    options: ["بسامد موج", "طول موج", "دورهٔ موج", "تعداد نوسان‌های منبع در هر ثانیه"],
    correctIndex: 1,
    explanation: "بسامد و دوره را منبع تعیین می‌کند و هنگام عبور از مرز دو محیط ثابت می‌مانند. چون v=fλ و تندی در محیط دوم کمتر شده است، طول موج نیز کاهش می‌یابد.",
  }),

  // Mathematics — Chapter 2: Dynamics and Circular Motion.
  makeQuestion({
    id: "authored-grade12-physics-math-dynamics-net-force-01",
    track: "ریاضی",
    chapter: "دینامیک و حرکت دایره‌ای",
    topic: "قانون دوم نیوتون و شتاب جسم",
    difficulty: "آسان",
    prompt: "جسمی به جرم ۴ کیلوگرم روی سطح افقی بدون اصطکاک، تحت اثر نیروی خالص افقی ۱۲ نیوتون قرار می‌گیرد. شتاب جسم چقدر است؟",
    options: ["۲ متر بر مجذور ثانیه", "۳ متر بر مجذور ثانیه", "۴ متر بر مجذور ثانیه", "۴۸ متر بر مجذور ثانیه"],
    correctIndex: 1,
    explanation: "طبق قانون دوم نیوتون، a=F/m است؛ بنابراین a=12/4=3 m/s².",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-dynamics-centripetal-02",
    track: "ریاضی",
    chapter: "دینامیک و حرکت دایره‌ای",
    topic: "شتاب مرکزگرا در حرکت دایره‌ای یکنواخت",
    difficulty: "متوسط",
    prompt: "جسمی با تندی ثابت ۶ متر بر ثانیه در مسیر دایره‌ای به شعاع ۲ متر حرکت می‌کند. اندازهٔ شتاب مرکزگرای آن چقدر است؟",
    options: ["۳ متر بر مجذور ثانیه", "۱۲ متر بر مجذور ثانیه", "۱۸ متر بر مجذور ثانیه", "۳۶ متر بر مجذور ثانیه"],
    correctIndex: 2,
    explanation: "شتاب مرکزگرا از رابطهٔ a_c=v²/r به دست می‌آید؛ پس a_c=6²/2=18 m/s².",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-dynamics-friction-03",
    track: "ریاضی",
    chapter: "دینامیک و حرکت دایره‌ای",
    topic: "نیروی اصطکاک جنبشی",
    difficulty: "متوسط",
    prompt: "جسمی به جرم ۵ کیلوگرم روی سطح افقی در حال لغزش است. ضریب اصطکاک جنبشی سطح ۰٫۲ و شتاب گرانش ۱۰ متر بر مجذور ثانیه است. اندازهٔ نیروی اصطکاک جنبشی چقدر است؟",
    options: ["۵ نیوتون", "۱۰ نیوتون", "۲۰ نیوتون", "۲۵ نیوتون"],
    correctIndex: 1,
    explanation: "روی سطح افقی، نیروی عمودی سطح N=mg=50 N است. پس اصطکاک جنبشی برابر μ_kN=0.2×50=10 N می‌شود.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-dynamics-impulse-04",
    track: "ریاضی",
    chapter: "دینامیک و حرکت دایره‌ای",
    topic: "ضربه و تغییر تکانه",
    difficulty: "متوسط",
    prompt: "نیروی خالص ثابت ۱۵ نیوتون به مدت ۰٫۲ ثانیه بر جسمی به جرم ۱٫۵ کیلوگرم که ابتدا ساکن است وارد می‌شود. تندی نهایی جسم چقدر است؟",
    options: ["۱ متر بر ثانیه", "۲ متر بر ثانیه", "۳ متر بر ثانیه", "۴ متر بر ثانیه"],
    correctIndex: 1,
    explanation: "ضربهٔ نیروی خالص J=FΔt=15×0.2=3 N·s است و با تغییر تکانه برابر است. چون جسم از سکون آغاز می‌کند، mv=3؛ بنابراین v=3/1.5=2 m/s.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-dynamics-gravity-05",
    track: "ریاضی",
    chapter: "دینامیک و حرکت دایره‌ای",
    topic: "وابستگی نیروی گرانشی به فاصله از مرکز زمین",
    difficulty: "متوسط",
    prompt: "وزن جسمی در سطح زمین ۶۰۰ نیوتون است. اگر آن را به نقطه‌ای ببریم که فاصله‌اش از مرکز زمین دو برابر شعاع زمین باشد، وزن آن تقریباً چقدر می‌شود؟",
    options: ["۷۵ نیوتون", "۱۵۰ نیوتون", "۳۰۰ نیوتون", "۶۰۰ نیوتون"],
    correctIndex: 1,
    explanation: "نیروی گرانشی و در نتیجه وزن با مجذور فاصله از مرکز زمین نسبت وارون دارد. در فاصلهٔ 2R، وزن به یک‌چهارم مقدار سطح زمین می‌رسد: 600/4=150 N.",
  }),

  // Mathematics — Chapter 3: Oscillations and Waves.
  makeQuestion({
    id: "authored-grade12-physics-math-oscillation-spring-period-01",
    track: "ریاضی",
    chapter: "نوسان و موج",
    topic: "دورهٔ نوسانگر جرم و فنر",
    difficulty: "متوسط",
    prompt: "در یک نوسانگر جرم و فنر، اگر جرم متصل به فنر ۴ برابر شود و ثابت فنر تغییر نکند، دورهٔ نوسان چه تغییری می‌کند؟",
    options: ["نصف می‌شود.", "۲ برابر می‌شود.", "۴ برابر می‌شود.", "تغییر نمی‌کند."],
    correctIndex: 1,
    explanation: "دورهٔ نوسانگر جرم و فنر T=2π√(m/k) است. با چهار برابر شدن جرم، ریشهٔ دوم جرم ۲ برابر می‌شود؛ بنابراین دوره نیز ۲ برابر خواهد شد.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-oscillation-energy-02",
    track: "ریاضی",
    chapter: "نوسان و موج",
    topic: "تبدیل انرژی در حرکت هماهنگ ساده",
    difficulty: "متوسط",
    prompt: "در حرکت هماهنگ ساده‌ای با دامنهٔ A، انرژی مکانیکی کل E است. وقتی ذره در مکان x=A/2 قرار دارد، انرژی جنبشی آن چند برابر E است؟",
    options: ["۱/۴", "۱/۲", "۳/۴", "۱"],
    correctIndex: 2,
    explanation: "انرژی پتانسیل نوسانگر در مکان x برابر U=(1/2)kx² و انرژی کل E=(1/2)kA² است. در x=A/2، نسبت U/E برابر 1/4 می‌شود؛ پس K/E=1−1/4=3/4.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-oscillation-resonance-03",
    track: "ریاضی",
    chapter: "نوسان و موج",
    topic: "تشدید در نوسان اجباری",
    difficulty: "آسان",
    prompt: "در یک نوسان اجباری، بسامد نیروی محرک با بسامد طبیعی سامانه برابر می‌شود. این وضعیت چه نام دارد؟",
    options: ["بازتاب", "تشدید", "شکست", "میرایی"],
    correctIndex: 1,
    explanation: "برابری بسامد نیروی محرک و بسامد طبیعی سامانه، شرط وقوع تشدید است و در این وضعیت دامنهٔ نوسان می‌تواند به‌طور چشمگیری افزایش یابد.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-oscillation-wavelength-04",
    track: "ریاضی",
    chapter: "نوسان و موج",
    topic: "محاسبهٔ طول موج از تندی و بسامد",
    difficulty: "آسان",
    prompt: "موجی با بسامد ۲۰ هرتز و تندی انتشار ۶ متر بر ثانیه در محیطی منتشر می‌شود. طول موج آن چقدر است؟",
    options: ["۰٫۱ متر", "۰٫۲ متر", "۰٫۳ متر", "۱٫۲ متر"],
    correctIndex: 2,
    explanation: "از رابطهٔ v=fλ داریم λ=v/f=6/20=0.3 m.",
  }),
  makeQuestion({
    id: "authored-grade12-physics-math-oscillation-longitudinal-05",
    track: "ریاضی",
    chapter: "نوسان و موج",
    topic: "جهت نوسان ذرات در موج طولی",
    difficulty: "آسان",
    prompt: "در یک موج طولی، ذرات محیط نسبت به راستای انتشار موج چگونه نوسان می‌کنند؟",
    options: ["عمود بر راستای انتشار", "موازی با راستای انتشار", "روی مسیر دایره‌ای", "ذرات محیط نوسان نمی‌کنند"],
    correctIndex: 1,
    explanation: "در موج طولی، جابه‌جایی و نوسان ذرات محیط در راستای انتشار موج است؛ در موج عرضی این دو راستا بر هم عمودند.",
  }),
];
