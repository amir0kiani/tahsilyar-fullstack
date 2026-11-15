import type { ExamQuestion } from "./examBank";

const source1405 = "https://dl.novinkonkor.com/nahaye/12/moaref/1405/soal-oloom-fonon-12-m-1405.pdf";
const answer1405 = "https://dl.novinkonkor.com/nahaye/12/ensani/moshtarak/1405/tir/javab-oloom-fonon-12-1405-tir-e-m.pdf";
const source1404 = "https://irantahsil.org/wp-content/uploads/2025/07/%D9%86%D9%85%D9%88%D9%86%D9%87-%D8%B3%D9%88%D8%A7%D9%84%D8%A7%D8%AA-%D8%B9%D9%84%D9%88%D9%85-%D9%88-%D9%81%D9%86%D9%88%D9%86-%D8%B1%D8%B4%D8%AA%D9%87-%D8%A7%D8%AF%D8%A8%DB%8C%D8%A7%D8%AA-%D9%88-%D8%A7%D9%86%D8%B3%D8%A7%D9%86%DB%8C-%D9%88-%D9%85%D8%B9%D8%A7%D8%B1%D9%81_unlocked.pdf";
const verifiedAt = new Date("2026-11-15T00:00:00.000Z");
const sourceTitle1405 = "آزمون نهایی علوم و فنون ادبی ۳ دوازدهم انسانی ـ ۱۲ مرداد ۱۴۰۵، مرکز ارزشیابی و تضمین کیفیت نظام آموزش و پرورش";
const sourceTitle1404 = "آزمون نهایی علوم و فنون ادبی ۳ دوازدهم انسانی ـ خرداد ۱۴۰۴، مرکز ارزشیابی و تضمین کیفیت نظام آموزش و پرورش";
const reviewerNote = "تمرین چهارگزینه‌ای مستقل و بازنویسی‌شده از سؤال آزمون؛ کلید و توضیح با راهنمای رسمی تصحیح همان آزمون تطبیق داده شده است.";

type Seed = Omit<ExamQuestion, "sourceStatus" | "sourceTitle" | "sourceUrl" | "sourceAnswerUrl" | "sourceYear" | "verifiedAt" | "reviewerNote">;
const seeds: Array<{ question: Seed; year: "۱۴۰۴" | "۱۴۰۵" }> = [
  // درس ۸: اختیارات شاعری ـ وزنی
  { year: "۱۴۰۵", question: {
    id: "verified-human12-literature-b4-1405-lesson8-final-syllable",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اختیارات شاعری ـ وزنی", topic: "بلند بودن هجای پایانی", difficulty: "متوسط",
    prompt: "در راهنمای رسمی آزمون مرداد ۱۴۰۵، اختیار وزنی مشترک دو بیت سؤال ۱۱ چه بود؟",
    options: ["بلند بودن هجای پایانی مصراع", "کوتاه تلفظ کردن مصوت بلند", "حذف همزه", "قلب"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۱، «بلند بودن هجای پایان مصراع» را پاسخ می‌داند.",
    sourceQuestionNumber: "۱۱"
  }},
  { year: "۱۴۰۵", question: {
    id: "verified-human12-literature-b4-1405-lesson8-ghalb",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اختیارات شاعری ـ وزنی", topic: "قلب", difficulty: "متوسط",
    prompt: "در بیت «یک سخن از من بدان مرد سخندان برد / کیست که پیغام من به شهر شروان برد؟» کدام اختیار وزنی در راهنمای تصحیح سؤال ۱۹ ثبت شده است؟",
    options: ["قلب", "ابدال", "تسکین", "تغییر کمیت مصوت‌ها"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۹، اختیار وزنی «قلب» را برای بیت موردنظر ذکر می‌کند.",
    sourceQuestionNumber: "۱۹"
  }},
  { year: "۱۴۰۵", question: {
    id: "verified-human12-literature-b4-1405-lesson8-ebdal",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اختیارات شاعری ـ وزنی", topic: "ابدال", difficulty: "متوسط",
    prompt: "در سؤال ۲۰ آزمون مرداد ۱۴۰۵، آوردن «فاعلاتن» به جای «فعلاتن» نمونه کدام اختیار وزنی معرفی شده است؟",
    options: ["ابدال", "قلب", "حذف همزه", "بلند بودن هجای پایانی"],
    correctIndex: 0,
    explanation: "در راهنمای رسمی سؤال ۲۰، این جابه‌جایی به‌عنوان اختیار وزنی پذیرفته شده و از مصادیق ابدال است.",
    sourceQuestionNumber: "۲۰ ـ بخش ب"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson8-ebdal-definition",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اختیارات شاعری ـ وزنی", topic: "تعریف ابدال", difficulty: "آسان",
    prompt: "طبق راهنمای تصحیح آزمون خرداد ۱۴۰۴، ابدال وزنی به چه معناست؟",
    options: ["آوردن یک هجای بلند به جای دو هجای کوتاه", "حذف همزه در میان دو واژه", "کوتاه تلفظ کردن مصوت بلند", "بلند تلفظ کردن هجای کوتاه"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۴، ابدال را «آوردن یک هجای بلند به جای دو هجای کوتاه» تعریف می‌کند.",
    sourceQuestionNumber: "۱۴"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson8-ghalb",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اختیارات شاعری ـ وزنی", topic: "قلب", difficulty: "متوسط",
    prompt: "در مصراع اول بیت «کیست که پیغام من به شهر شروان برد؟ / یک سخن از من بدان مرد سخندان برد» کدام اختیار وزنی وجود دارد؟",
    options: ["قلب", "ابدال", "تسکین", "تغییر کمیت مصوت‌ها"],
    correctIndex: 0,
    explanation: "در راهنمای تصحیح سؤال ۱۸ آزمون خرداد ۱۴۰۴، اختیار وزنی مصراع اول «قلب» ذکر شده است.",
    sourceQuestionNumber: "۱۸ ـ بخش ب"
  }},

  // درس ۹: اغراق، ایهام و ایهام تناسب
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson9-hyperbole",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اغراق، ایهام و ایهام تناسب", topic: "اغراق", difficulty: "آسان",
    prompt: "در کدام تصویر شعری، اغراق برای نشان‌دادن توان رزمی قهرمان به کار رفته است؟",
    options: ["به تنها یکی گور بریان کنی / هوا را به شمشیر گریان کنی", "بیا تا قدر یکدیگر بدانیم", "ز کوی یار می‌آید نسیم باد نوروزی", "چو گلستان خالی لب پنجره"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۲۳، بیت «به تنها یکی گور بریان کنی...» را نمونه اغراق در تصویرآفرینی حماسی می‌داند.",
    sourceQuestionNumber: "۲۳"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson9-ambiguity-baaghi",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اغراق، ایهام و ایهام تناسب", topic: "ایهام", difficulty: "متوسط",
    prompt: "در سؤال ۲۵ آزمون خرداد ۱۴۰۴، آرایه مشترک واژه‌های «باقی» و «عهد» در دو بیت چه بود؟",
    options: ["ایهام", "تلمیح", "تضمین", "حسن تعلیل"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۲۵، آرایه مشترک واژه‌های مشخص‌شده را ایهام اعلام می‌کند.",
    sourceQuestionNumber: "۲۵"
  }},
  { year: "۱۴۰۵", question: {
    id: "verified-human12-literature-b4-1405-lesson9-ambiguity-golestan",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اغراق، ایهام و ایهام تناسب", topic: "ایهام", difficulty: "متوسط",
    prompt: "در بیت «خانه زندان است و تنهایی و ضلال / چون که هر کس چون سعدی گلستانیش نیست»، کدام واژه در سؤال ۳۳ آزمون مرداد ۱۴۰۵ محل توجه به آرایه ایهام بود؟",
    options: ["گلستان", "زندان", "تنهایی", "سعدی"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۳، واژه «گلستان» را برای بخش الف مشخص می‌کند.",
    sourceQuestionNumber: "۳۳ ـ بخش الف"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson9-ambiguity-mehr",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اغراق، ایهام و ایهام تناسب", topic: "ایهام", difficulty: "متوسط",
    prompt: "در بیت «بی مهر رخت روز مرا نور نمانده‌است / وز عمر مرا جز شب دیجور نمانده‌است»، راهنمای تصحیح آزمون خرداد ۱۴۰۴ چه آرایه‌ای را برای بیت تعیین کرده است؟",
    options: ["ایهام", "ایهام تناسب", "اغراق", "تضاد"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۴ بخش ب، آرایه بیت را ایهام معرفی می‌کند.",
    sourceQuestionNumber: "۳۴ ـ بخش ب"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson9-ambiguity-tanasob",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "اغراق، ایهام و ایهام تناسب", topic: "ایهام تناسب", difficulty: "متوسط",
    prompt: "در بیت «گر هزار است بلبل این باغ / همه را نغمه و ترانه یکی است»، کدام آرایه در راهنمای رسمی سؤال ۳۴ آزمون خرداد ۱۴۰۴ ثبت شده است؟",
    options: ["ایهام تناسب", "ایهام", "لف و نشر", "متناقض‌نما"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۴ بخش ج، آرایه ایهام تناسب را برای این بیت می‌پذیرد.",
    sourceQuestionNumber: "۳۴ ـ بخش ج"
  }},

  // درس ۱۰: سبک‌شناسی دوره معاصر و انقلاب اسلامی
  { year: "۱۴۰۵", question: {
    id: "verified-human12-literature-b4-1405-lesson10-khorasani",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "سبک‌شناسی دوره معاصر و انقلاب اسلامی", topic: "ویژگی زبانی شعر انقلاب", difficulty: "متوسط",
    prompt: "طبق سؤال ۶ آزمون مرداد ۱۴۰۵، زبان و واژگان قصاید دوره انقلاب از نظر نزدیکی سبکی به کدام سبک نزدیک دانسته شده است؟",
    options: ["خراسانی", "عراقی", "هندی", "بازگشت"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۶ بخش الف، سبک خراسانی را پاسخ می‌داند.",
    sourceQuestionNumber: "۶ ـ بخش الف"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson10-simple-sentences",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "سبک‌شناسی دوره معاصر و انقلاب اسلامی", topic: "ویژگی زبانی شعر معاصر", difficulty: "آسان",
    prompt: "در سؤال ۱۰ آزمون خرداد ۱۴۰۴، کدام ویژگی به‌عنوان نشانه سطح زبانی شعر دوره معاصر تا انقلاب مطرح شد؟",
    options: ["چشم‌گیر بودن جمله‌بندی‌های ساده", "کاربرد فراوان واژگان دشوار", "پیچیدگی نحوی و تکلف", "غلبه واژگان بیگانه"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۰، چشم‌گیر بودن جمله‌بندی‌های ساده را پاسخ صحیح اعلام می‌کند.",
    sourceQuestionNumber: "۱۰"
  }},

  // درس ۱۱: وزن در شعر نیمایی
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson11-nima-rhythm",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "وزن در شعر نیمایی", topic: "وزن شعر نیمایی", difficulty: "متوسط",
    prompt: "در سؤال مربوط به شعر «می‌تراود مهتاب» در آزمون خرداد ۱۴۰۴، گزاره «این شعر در بحر رجز سروده شده است» چگونه ارزیابی شد؟",
    options: ["نادرست", "درست", "درست، به شرط تکرار کامل ارکان", "درست، فقط در مصراع‌های زوج"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۹ بخش الف، این گزاره را نادرست اعلام می‌کند.",
    sourceQuestionNumber: "۱۹ ـ بخش الف"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson11-nima-pattern",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "وزن در شعر نیمایی", topic: "وزن‌واژه شعر نیمایی", difficulty: "متوسط",
    prompt: "وزن‌واژه تکرارشونده در سروده «می‌تراود مهتاب» که در راهنمای تصحیح آزمون خرداد ۱۴۰۴ آمده است، کدام است؟",
    options: ["فَعَلان", "مفاعیلن", "فاعلاتن", "مستفعلن"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۹ بخش ب، وزن‌واژه «فعلان» را پاسخ می‌داند.",
    sourceQuestionNumber: "۱۹ ـ بخش ب"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson11-nima-license-faelat",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "وزن در شعر نیمایی", topic: "اختیار وزنی در شعر نیمایی", difficulty: "متوسط",
    prompt: "در مصراع سوم شعر «می‌تراود مهتاب»، کدام اختیار وزنی با آوردن «فاعلاتن» به جای «فعلان» ایجاد شده است؟",
    options: ["ابدال", "قلب", "تسکین", "حذف همزه"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۹ بخش ج، آوردن فاعلاتن به جای فعلان را یکی از اختیارهای وزنی این مصراع می‌داند.",
    sourceQuestionNumber: "۱۹ ـ بخش ج"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson11-nima-final-syllable",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "وزن در شعر نیمایی", topic: "اختیار وزنی در شعر نیمایی", difficulty: "متوسط",
    prompt: "بر اساس راهنمای رسمی سؤال ۱۹ آزمون خرداد ۱۴۰۴، کدام ویژگی هجایی نیز در مصراع سوم «می‌تراود مهتاب» به‌عنوان اختیار وزنی دیده می‌شود؟",
    options: ["بلند بودن هجای پایان مصراع", "کوتاه بودن هجای آغاز مصراع", "حذف هجای میانی", "تکرار دو هجای کوتاه"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۱۹ بخش ج، بلند بودن هجای پایان مصراع را دومین اختیار وزنی می‌داند.",
    sourceQuestionNumber: "۱۹ ـ بخش ج"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson11-nima-form",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "وزن در شعر نیمایی", topic: "شناخت شعر نیمایی", difficulty: "آسان",
    prompt: "سروده «می‌تراود مهتاب» از نیما یوشیج در کدام گونه شعر فارسی قرار می‌گیرد؟",
    options: ["شعر نیمایی", "غزل", "قصیده", "مثنوی"],
    correctIndex: 0,
    explanation: "«می‌تراود مهتاب» از سروده‌های شناخته‌شده نیما یوشیج و از نمونه‌های شعر نیمایی است؛ این تمرین با تکیه بر شعر مرجع سؤال ۱۹ بازنویسی شده است.",
    sourceQuestionNumber: "۱۹"
  }},

  // درس ۱۲: حسن تعلیل، حس‌آمیزی و اسلوب معادله
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson12-hosn-taalil",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "حسن تعلیل، حس‌آمیزی و اسلوب معادله", topic: "حسن تعلیل", difficulty: "آسان",
    prompt: "در بیت «ز نرگس همه رکوع کند در میان باغ / زیرا که کرد فاخته بر سرو مؤذنی»، علت شاعرانه خم‌شدن نرگس چیست؟",
    options: ["شنیدن اذان فاخته بر سرو", "وزش باد بهاری", "سنگینی شبنم بر گلبرگ", "تابش مستقیم خورشید"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۲۷، بیت مربوط به رکوع نرگس را نمونه حسن تعلیل می‌داند؛ شاعر برای خم‌شدن گل علتی خیال‌انگیز ساخته است.",
    sourceQuestionNumber: "۲۷"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson12-oslo-moadaleh",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "حسن تعلیل، حس‌آمیزی و اسلوب معادله", topic: "اسلوب معادله", difficulty: "متوسط",
    prompt: "در آزمون خرداد ۱۴۰۴، کدام بیت به‌عنوان نمونه اسلوب معادله معرفی شد؟",
    options: ["سپهر مردم دون را کند خریداری / بخیل سوی متاعی رود که ارزان است", "تویی بهانه آن ابرها که می‌گریند / بیا که صاف شود این هوای بارانی", "ز کوی یار می‌آید نسیم باد نوروزی", "باغ باران‌خورده می‌نوشید نور"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۰، بیت «سپهر مردم دون...» را پاسخ صحیح معرفی می‌کند.",
    sourceQuestionNumber: "۳۰"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson12-hessamizi-blue",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "حسن تعلیل، حس‌آمیزی و اسلوب معادله", topic: "حس‌آمیزی", difficulty: "متوسط",
    prompt: "در عبارت «آسمان، فریبی آبی‌رنگ شد»، همراهی واژه «فریب» با ویژگی دیداری «آبی‌رنگ» چه آرایه‌ای می‌سازد؟",
    options: ["حس‌آمیزی", "حسن تعلیل", "اسلوب معادله", "تضمین"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۱، ترکیب موردنظر را نمونه حسن‌آمیزی می‌داند.",
    sourceQuestionNumber: "۳۱"
  }},
  { year: "۱۴۰۴", question: {
    id: "verified-human12-literature-b4-1404-lesson12-hessamizi-light",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "حسن تعلیل، حس‌آمیزی و اسلوب معادله", topic: "حس‌آمیزی", difficulty: "متوسط",
    prompt: "در عبارت «باغ باران‌خورده می‌نوشید نور»، کدام ترکیب سبب خلق آرایه حس‌آمیزی شده است؟",
    options: ["نور می‌نوشید", "باغ باران‌خورده", "سبزه‌های تر", "لرزشی دوید"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۳، کاربرد «نور می‌نوشید» را نمونه حسن‌آمیزی می‌داند؛ نور دیدنی است اما نوشیدن با حس چشایی و عمل نوشیدن پیوند دارد.",
    sourceQuestionNumber: "۳۳"
  }},
  { year: "۱۴۰۵", question: {
    id: "verified-human12-literature-b4-1405-lesson12-hessamizi",
    grade: "دوازدهم", track: "انسانی", subject: "علوم و فنون ادبی",
    chapter: "حسن تعلیل، حس‌آمیزی و اسلوب معادله", topic: "حس‌آمیزی", difficulty: "متوسط",
    prompt: "در شعر سؤال ۳۳ آزمون مرداد ۱۴۰۵، ترکیب «نرم‌آوا» نمونه کدام آرایه است؟",
    options: ["حس‌آمیزی", "اسلوب معادله", "حسن تعلیل", "متناقض‌نما"],
    correctIndex: 0,
    explanation: "راهنمای رسمی سؤال ۳۳، ترکیب «نرم‌آوا» را از نمونه‌های حس‌آمیزی می‌داند.",
    sourceQuestionNumber: "۳۳ ـ بخش ب"
  }}
];

export const verifiedHumanitiesLiterature12Batch4: ExamQuestion[] = seeds.map(({ question, year }) => ({
  ...question,
  sourceStatus: "official-exam-adapted",
  sourceTitle: year === "۱۴۰۵" ? sourceTitle1405 : sourceTitle1404,
  sourceUrl: year === "۱۴۰۵" ? source1405 : source1404,
  sourceAnswerUrl: year === "۱۴۰۵" ? answer1405 : source1404,
  sourceYear: year,
  verifiedAt,
  reviewerNote
}));
