import type { ExamQuestion } from "./examBank";

// Questions adapted from user-provided recent Iranian final-exam papers and answer keys.
// The items are rewritten into MCQ practice format; they are not verbatim reproductions.
// References point to the uploaded compiled PDFs and the exam session/question shown there.
const verifiedAt = new Date("2026-11-01T00:00:00.000Z");
const finalExamSource = (subject: string, session: string) => `امتحان نهایی ${subject} دوازدهم – ${session} (فایل ارسالی کاربر)`;

export const verifiedFinalExamBatch1: ExamQuestion[] = [
  // History – grade 12 humanities
  {
    id: "final-history12-modern-historiography-1404-khordad-02",
    grade: "دوازدهم", track: "انسانی", subject: "تاریخ", chapter: "درس اول",
    topic: "اصول تاریخ‌نگاری جدید", difficulty: "آسان",
    prompt: "کدام گزینه از اصول تاریخ‌نگاری جدید به شمار می‌رود؟",
    options: ["تمرکز انحصاری بر زندگی شاهان", "بهره‌گیری و نقد اسناد و مدارک معتبر", "شرح فتوحات بدون تحلیل", "اتکا به نوشته‌های مصنوع و غیرمستند"],
    correctIndex: 1,
    explanation: "تاریخ‌نگاری جدید از روش تحقیق علمی استفاده می‌کند و اسناد و مدارک معتبر را گزینش و نقد می‌کند.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("تاریخ", "خرداد ۱۴۰۴"),
    sourceYear: "۱۴۰۴", sourceQuestionNumber: "۲", verifiedAt,
    reviewerNote: "بازنویسی به قالب چهارگزینه‌ای از پرسش تشریحی اصول تاریخ‌نگاری جدید؛ پاسخ با کلید فایل ارسالی تطبیق داده شد (PDF تاریخ، صفحه ۲)."
  },
  {
    id: "final-history12-traditional-modern-1402-shahrivar-04",
    grade: "دوازدهم", track: "انسانی", subject: "تاریخ", chapter: "درس اول",
    topic: "تفاوت بینش تاریخ‌نگاری سنتی و جدید", difficulty: "آسان",
    prompt: "کدام عبارت تفاوت اصلی تاریخ‌نگاری سنتی و معاصر را درست بیان می‌کند؟",
    options: ["هر دو فقط به شرح جنگ‌ها می‌پردازند.", "تاریخ‌نگاری سنتی بر زندگی شاهان و فتوحات تأکید داشت؛ تاریخ‌نگاری جدید ابعاد گوناگون زندگی انسان را بررسی می‌کند.", "تاریخ‌نگاری جدید فقط به اقتصاد می‌پردازد.", "تاریخ‌نگاری سنتی بر اسناد علمی و نقد منابع استوار بود."],
    correctIndex: 1,
    explanation: "در تاریخ‌نگاری سنتی زندگی شاهان و شرح فتوحات برجسته بود؛ تاریخ‌نگاری جدید جنبه‌های سیاسی، نظامی، اقتصادی، فرهنگی و اجتماعی را نیز بررسی می‌کند.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("تاریخ", "شهریور ۱۴۰۲"),
    sourceYear: "۱۴۰۲", sourceQuestionNumber: "۴", verifiedAt,
    reviewerNote: "بازنویسی پرسش مقایسه‌ای؛ پاسخ مطابق کلید فایل ارسالی (PDF تاریخ، صفحه ۳)."
  },
  {
    id: "final-history12-oral-history-1405-tir-07",
    grade: "دوازدهم", track: "انسانی", subject: "تاریخ", chapter: "درس اول",
    topic: "تاریخ شفاهی", difficulty: "آسان",
    prompt: "تاریخ شفاهی بیشتر بر گردآوری کدام نوع اطلاعات تکیه دارد؟",
    options: ["اطلاعات حافظه افرادی که در رویدادها حضور داشته یا شاهد نزدیک آن بوده‌اند", "فقط کتیبه‌های باستانی", "تنها گزارش‌های رسمی دربار", "صرفاً داده‌های آماری اقتصادی"],
    correctIndex: 0,
    explanation: "تاریخ شفاهی روشی پژوهشی برای گردآوری و نگهداری اطلاعات تاریخی از حافظه افراد حاضر یا شاهد نزدیک رویدادهاست.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("تاریخ", "تیر و مرداد ۱۴۰۵"),
    sourceYear: "۱۴۰۵", sourceQuestionNumber: "۷", verifiedAt,
    reviewerNote: "بازنویسی تعریف تاریخ شفاهی؛ پاسخ مطابق متن پاسخنامهٔ فایل ارسالی (PDF تاریخ، صفحه ۴)."
  },
  {
    id: "final-history12-mirza-fathali-1404-khordad-10",
    grade: "دوازدهم", track: "انسانی", subject: "تاریخ", chapter: "درس اول",
    topic: "نقد تاریخ‌نگاری سنتی در دوره قاجار", difficulty: "متوسط",
    prompt: "کدام متفکر دوره قاجار تاریخ‌نویسی سنتی را به شیوه‌ای علمی نقد کرد؟",
    options: ["میرزا فتحعلی آخوندزاده", "خاوری شیرازی", "محمدحسن‌خان اعتمادالسلطنه", "زین‌العابدین مراغه‌ای"],
    correctIndex: 0,
    explanation: "در پاسخنامهٔ امتحان نهایی خرداد ۱۴۰۴، میرزا فتحعلی آخوندزاده به‌عنوان منتقد تاریخ‌نویسی سنتی معرفی شده است.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("تاریخ", "خرداد ۱۴۰۴"),
    sourceYear: "۱۴۰۴", sourceQuestionNumber: "۱۰", verifiedAt,
    reviewerNote: "تبدیل پرسش کوتاه‌پاسخ به چهارگزینه‌ای؛ پاسخ با کلید فایل ارسالی تطبیق داده شد (PDF تاریخ، صفحه ۴)."
  },
  {
    id: "final-history12-mashrouteh-1403-dey-11",
    grade: "دوازدهم", track: "انسانی", subject: "تاریخ", chapter: "درس اول",
    topic: "تأثیر انقلاب مشروطه بر تاریخ‌نگاری", difficulty: "آسان",
    prompt: "کدام رویداد بر توجه مورخان ایرانی به نقش مردم در رویدادهای تاریخی تأثیر عمیقی گذاشت؟",
    options: ["جنگ‌های ایران و روس", "انقلاب مشروطه", "تأسیس دارالفنون", "انتشار نخستین روزنامه"],
    correctIndex: 1,
    explanation: "بر اساس پاسخنامهٔ امتحان نهایی دی ۱۴۰۳، انقلاب مشروطه در تغییر بینش مورخان و توجه به نقش مردم اثرگذار بود.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("تاریخ", "دی ۱۴۰۳"),
    sourceYear: "۱۴۰۳", sourceQuestionNumber: "۱۱", verifiedAt,
    reviewerNote: "بازنویسی سؤال چهارگزینه‌ای؛ پاسخ مطابق کلید فایل ارسالی (PDF تاریخ، صفحه ۴)."
  },

  // Philosophy – grade 12 humanities
  {
    id: "final-philosophy12-existence-essence-1405-tir-03",
    grade: "دوازدهم", track: "انسانی", subject: "فلسفه", chapter: "درس اول",
    topic: "تفاوت وجود و ماهیت", difficulty: "متوسط",
    prompt: "چرا حمل «وجود» بر «گنجشک» نیازمند دلیل است، اما حمل «حیوان» بر آن نیازمند دلیل نیست؟",
    options: ["زیرا وجود از ذاتیات گنجشک است.", "زیرا حیوان بودن بخشی از ماهیت گنجشک است، اما وجود جزء تعریف آن نیست.", "زیرا گنجشک موجود نیست.", "زیرا حیوان و وجود دو واژه هم‌معنا هستند."],
    correctIndex: 1,
    explanation: "حیوان از اجزای ذاتی و تعریف‌کنندهٔ ماهیت گنجشک است؛ اما وجود در تعریف و چیستی آن قرار ندارد و حمل آن نیازمند دلیل است.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("فلسفه", "تیر و مرداد ۱۴۰۵"),
    sourceQuestionNumber: "۳ (شماره در فایل گردآوری‌شده)", verifiedAt,
    reviewerNote: "بازنویسی پرسش دو بخشی به قالب چهارگزینه‌ای؛ پاسخ بر اساس پاسخنامه (PDF فلسفه، صفحه ۲)."
  },
  {
    id: "final-philosophy12-child-essence-1404-shahrivar-06",
    grade: "دوازدهم", track: "انسانی", subject: "فلسفه", chapter: "درس اول",
    topic: "شناخت وجود و ماهیت", difficulty: "آسان",
    prompt: "در متن کتاب، استفاده کودک از واژه‌های «این» و «آن» نشانهٔ آگاهی او از کدام مفهوم دانسته شده است؟",
    options: ["ماهیت اشیا", "وجود اشیا", "علت غایی اشیا", "ذاتیات همه اشیا"],
    correctIndex: 1,
    explanation: "طبق پاسخنامهٔ امتحان نهایی شهریور ۱۴۰۴، کاربرد «این» و «آن» نشان‌دهندهٔ پی‌بردن کودک به وجود اشیاست، نه ماهیت آن‌ها.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("فلسفه", "شهریور ۱۴۰۴"),
    sourceYear: "۱۴۰۴", sourceQuestionNumber: "۶", verifiedAt,
    reviewerNote: "بازنویسی پرسش درست/نادرست به چهارگزینه‌ای؛ پاسخ مطابق فایل ارسالی (PDF فلسفه، صفحه ۳)."
  },
  {
    id: "final-philosophy12-existence-essence-meaning-1403-dey-09",
    grade: "دوازدهم", track: "انسانی", subject: "فلسفه", chapter: "درس اول",
    topic: "مغایرت وجود و ماهیت", difficulty: "متوسط",
    prompt: "مغایرت وجود و ماهیت به چه معناست؟",
    options: ["در خارج هر موجود دو شیء جداگانه به نام وجود و ماهیت دارد.", "از هر واقعیت واحد می‌توان دو مفهوم متفاوتِ چیستی و هستی به دست آورد.", "وجود و ماهیت در همه موارد یک مفهوم‌اند.", "ماهیت فقط به موجودات زنده اختصاص دارد."],
    correctIndex: 1,
    explanation: "وجود و ماهیت دو مفهوم متفاوت از یک موجودند؛ این مغایرت به معنای وجود دو امر جداگانه در عالم خارج نیست.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("فلسفه", "دی ۱۴۰۳"),
    sourceYear: "۱۴۰۳", sourceQuestionNumber: "۹", verifiedAt,
    reviewerNote: "بازنویسی سؤال تشریحی؛ پاسخ با پاسخنامهٔ فایل ارسالی تطبیق داده شد (PDF فلسفه، صفحه ۳)."
  },
  {
    id: "final-philosophy12-scientific-knowledge-1404-dey-05",
    grade: "دوازدهم", track: "انسانی", subject: "فلسفه", chapter: "درس اول",
    topic: "رابطه علیت و وجودبخشی", difficulty: "متوسط",
    prompt: "کدام گزاره دربارهٔ رابطهٔ علیت و وجودبخشی درست است؟",
    options: ["این دو رابطه هیچ تفاوتی ندارند.", "رابطهٔ علیت با رابطهٔ وجودبخشی میان علت و معلول تفاوت دارد.", "هر معلولی علت ندارد.", "وجودبخشی فقط دربارهٔ اشیای بی‌جان مطرح است."],
    correctIndex: 1,
    explanation: "در گزاره‌های پاسخنامهٔ دی ۱۴۰۴، یکسان‌دانستن رابطهٔ علیت و رابطهٔ وجودبخشی نادرست شمرده شده است.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("فلسفه", "دی ۱۴۰۴"),
    sourceYear: "۱۴۰۴", sourceQuestionNumber: "۵-ب", verifiedAt,
    reviewerNote: "تبدیل یکی از گزاره‌های درست/نادرست به چهارگزینه‌ای؛ مطابق کلید فایل ارسالی (PDF فلسفه، صفحه ۳)."
  },
  {
    id: "final-philosophy12-aquinas-avicenna-1401-shahrivar-19",
    grade: "دوازدهم", track: "انسانی", subject: "فلسفه", chapter: "درس اول",
    topic: "فیلسوفان نظریه مغایرت وجود و ماهیت", difficulty: "آسان",
    prompt: "کدام گزینه یک فیلسوف مسلمان و یک فیلسوف غربیِ مرتبط با استفاده از نظریهٔ مغایرت وجود و ماهیت در خداشناسی را درست نام می‌برد؟",
    options: ["فارابی و افلاطون", "ابن‌سینا و توماس آکویناس", "ابن‌رشد و ارسطو", "سهروردی و دکارت"],
    correctIndex: 1,
    explanation: "پاسخنامهٔ شهریور ۱۴۰۱، ابن‌سینا و توماس آکویناس را نام می‌برد.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("فلسفه", "شهریور ۱۴۰۱"),
    sourceYear: "۱۴۰۱", sourceQuestionNumber: "۱۹", verifiedAt,
    reviewerNote: "بازنویسی سؤال نام‌بری به چهارگزینه‌ای؛ پاسخ مطابق فایل ارسالی (PDF فلسفه، صفحه ۴)."
  },

  // Sociology – grade 12 humanities
  {
    id: "final-sociology12-indigenous-humanities-1404-dey-01",
    grade: "دوازدهم", track: "انسانی", subject: "جامعه‌شناسی", chapter: "درس اول",
    topic: "ویژگی علوم انسانی و اجتماعی بومی", difficulty: "آسان",
    prompt: "کدام گزینه با ایدهٔ علوم انسانی و اجتماعی بومی ایرانی ـ اسلامی سازگارتر است؟",
    options: ["همسویی با هویت فرهنگی جامعه و تلاش برای حل مسائل بومی", "بی‌توجهی به مسائل جامعهٔ خود", "محدودکردن دانش به ترجمهٔ نظریه‌های دیگران", "کنارگذاشتن گفت‌وگو با دانش جهانی"],
    correctIndex: 0,
    explanation: "علوم انسانی و اجتماعی بومی باید با هویت فرهنگی جامعه همسو و در حل مسائل آن کارآمد باشد و در عین حال بتواند با زبان و منطق جهان‌شمول مشارکت علمی کند.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("جامعه‌شناسی", "دی ۱۴۰۴"),
    sourceYear: "۱۴۰۴", sourceQuestionNumber: "۱", verifiedAt,
    reviewerNote: "بازنویسی سؤال تشریحی؛ پاسخ بر اساس پاسخنامهٔ فایل ارسالی (PDF جامعه‌شناسی، صفحه ۲)."
  },
  {
    id: "final-sociology12-scientific-knowledge-1403-shahrivar-03",
    grade: "دوازدهم", track: "انسانی", subject: "جامعه‌شناسی", chapter: "درس اول",
    topic: "ویژگی دانش علمی", difficulty: "آسان",
    prompt: "کدام عبارت دربارهٔ دانش علمی نادرست است؟",
    options: ["با تأمل در دانش عمومی شکل می‌گیرد.", "می‌تواند آسیب‌های دانش عمومی را شناسایی کند.", "دانش عمومی را غنی‌تر می‌کند.", "دربارهٔ آن کمتر می‌اندیشیم و بیشتر در زندگی روزمره از آن استفاده می‌کنیم."],
    correctIndex: 3,
    explanation: "عبارت گزینهٔ چهارم ویژگی دانش عمومی است، نه دانش علمی؛ دانش علمی با تأمل و اندیشه در دانش عمومی به دست می‌آید.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("جامعه‌شناسی", "شهریور ۱۴۰۳"),
    sourceYear: "۱۴۰۳", sourceQuestionNumber: "۳", verifiedAt,
    reviewerNote: "بازنویسی سؤال گزینه‌ای امتحان نهایی؛ پاسخ مطابق فایل ارسالی (PDF جامعه‌شناسی، صفحه ۲)."
  },
  {
    id: "final-sociology12-knowledge-conflict-1402-dey-06",
    grade: "دوازدهم", track: "انسانی", subject: "جامعه‌شناسی", chapter: "درس اول",
    topic: "تعارض دانش عمومی و علمی", difficulty: "متوسط",
    prompt: "کدام مورد یکی از راه‌های حل تعارض میان دانش عمومی و دانش علمی در یک جهان اجتماعی است؟",
    options: ["قطع همیشگی ارتباط میان دو نوع دانش", "رهاکردن بخشی از ذخیرهٔ دانشی به نفع بخش دیگر یا طرح ایده‌های جدید", "نادیده‌گرفتن همهٔ مسائل اجتماعی", "جایگزین‌کردن دانش عمومی با عادت‌های فردی"],
    correctIndex: 1,
    explanation: "طبق پاسخنامه، تعارض گاهی با ترجیح بخشی از ذخیرهٔ دانشی و گاهی با طرح ایده‌های جدید حل می‌شود.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("جامعه‌شناسی", "دی ۱۴۰۲"),
    sourceYear: "۱۴۰۲", sourceQuestionNumber: "۶", verifiedAt,
    reviewerNote: "بازنویسی سؤال تشریحی؛ پاسخ مطابق پاسخنامهٔ فایل ارسالی (PDF جامعه‌شناسی، صفحه ۳)."
  },
  {
    id: "final-sociology12-social-science-branches-1404-dey-24",
    grade: "دوازدهم", track: "انسانی", subject: "جامعه‌شناسی", chapter: "درس دوم",
    topic: "جامعه‌شناسی خرد و کلان", difficulty: "متوسط",
    prompt: "کدام دسته‌بندی دربارهٔ پدیده‌های اجتماعی درست است؟",
    options: ["روابط همسایگی: کلان؛ ریخت‌شناسی شهری: خرد", "روابط همسایگی: خرد؛ ریخت‌شناسی شهری: کلان", "کنش اجتماعی: کلان؛ ساختار اجتماعی: خرد", "همهٔ موارد فقط در جامعه‌شناسی کلان بررسی می‌شوند."],
    correctIndex: 1,
    explanation: "در پاسخنامهٔ امتحان نهایی دی ۱۴۰۴، روابط همسایگی و کنش اجتماعی در سطح خرد و ریخت‌شناسی شهری و ساختار اجتماعی در سطح کلان دسته‌بندی شده‌اند.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("جامعه‌شناسی", "دی ۱۴۰۴"),
    sourceYear: "۱۴۰۴", sourceQuestionNumber: "۲۴", verifiedAt,
    reviewerNote: "بازنویسی سؤال دسته‌بندی؛ پاسخ مطابق فایل ارسالی (PDF جامعه‌شناسی، صفحه ۶)."
  },
  {
    id: "final-sociology12-everyday-knowledge-1402-shahrivar-07",
    grade: "دوازدهم", track: "انسانی", subject: "جامعه‌شناسی", chapter: "درس اول",
    topic: "دانش عمومی و عادت", difficulty: "آسان",
    prompt: "چرا آگاهی و دانش به‌کاررفته در کنش‌های روزمره‌ای مانند راه‌رفتن و حرف‌زدن معمولاً از نظر ما پنهان می‌ماند؟",
    options: ["به دلیل عادت", "به دلیل نداشتن ذخیرهٔ دانشی", "به دلیل نبود جهان اجتماعی", "به دلیل علمی‌بودن همهٔ کنش‌ها"],
    correctIndex: 0,
    explanation: "پاسخنامهٔ شهریور ۱۴۰۲، عادت را علت پنهان‌ماندن دانش ضمنی در کنش‌های روزمره معرفی می‌کند.",
    sourceStatus: "official-exam-adapted" as const, sourceTitle: finalExamSource("جامعه‌شناسی", "شهریور ۱۴۰۲"),
    sourceYear: "۱۴۰۲", sourceQuestionNumber: "۷", verifiedAt,
    reviewerNote: "تبدیل سؤال کوتاه‌پاسخ به چهارگزینه‌ای؛ پاسخ مطابق فایل ارسالی (PDF جامعه‌شناسی، صفحه ۳)."
  },

  // Chemistry – grade 12, common to experimental and mathematics tracks
  ...(["تجربی", "ریاضی"] as const).flatMap((track) => [
    {
      id: `final-chemistry12-acid-strength-${track}-1405-tir-02`,
      grade: "دوازدهم", track, subject: "شیمی", chapter: "اسیدها و بازها",
      topic: "مقایسه pH و قدرت اسیدی", difficulty: "متوسط",
      prompt: "در دمای یکسان، دو محلول اسیدی AH و BH با غلظت مولی برابر بررسی شده‌اند. اگر pH محلول AH کمتر و ثابت یونش اسید BH بزرگ‌تر باشد، کدام نتیجه درست است؟",
      options: ["AH خاصیت اسیدی بیشتری دارد و BH اسید قوی‌تری است.", "BH هم خاصیت اسیدی بیشتری دارد و هم اسید قوی‌تری است.", "AH هم خاصیت اسیدی بیشتری دارد و هم اسید قوی‌تری است.", "هیچ مقایسه‌ای ممکن نیست."],
      correctIndex: 0,
      explanation: "pH کمتر به معنی غلظت بیشتر یون هیدرونیوم و خاصیت اسیدی بیشتر محلول است؛ ثابت یونش بزرگ‌تر نشان‌دهندهٔ قوی‌تر بودن اسید است.",
      sourceStatus: "official-exam-adapted" as const, sourceTitle: "مجموعه سؤالات و پاسخنامه امتحان نهایی شیمی دوازدهم (فایل ارسالی کاربر)",
      sourceQuestionNumber: "۲ (شماره در فایل گردآوری‌شده)", verifiedAt,
      reviewerNote: "بازنویسی مفهومی سؤال مقایسهٔ دو اسید؛ پاسخ مطابق پاسخنامهٔ فایل ارسالی (PDF شیمی، صفحه ۳)."
    },
    {
      id: `final-chemistry12-lithium-oxide-${track}-1405-tir-03`,
      grade: "دوازدهم", track, subject: "شیمی", chapter: "اسیدها و بازها",
      topic: "خاصیت بازی اکسید فلزی و رسانایی", difficulty: "متوسط",
      prompt: "با افزودن Li₂O به آب، محلولی بازی تشکیل می‌شود. در شرایط یکسان، چرا رسانایی محلول ۰٫۰۰۱ مولار Li₂O از محلول ۰٫۰۰۱ مولار Ba(OH)₂ بیشتر گزارش شده است؟",
      options: ["زیرا Li₂O در آب یون‌های بیشتری ایجاد می‌کند.", "زیرا Li₂O مولکولی و نارساناست.", "زیرا Ba(OH)₂ هیچ یونی تولید نمی‌کند.", "زیرا رسانایی فقط به جرم مولی وابسته است."],
      correctIndex: 0,
      explanation: "با درنظرگرفتن تفکیک کامل، هر واحد Li₂O در آب دو یون Li⁺ و دو یون OH⁻ ایجاد می‌کند؛ در مجموع چهار یون، در حالی که Ba(OH)₂ سه یون ایجاد می‌کند.",
      sourceStatus: "official-exam-adapted" as const, sourceTitle: "مجموعه سؤالات و پاسخنامه امتحان نهایی شیمی دوازدهم (فایل ارسالی کاربر)",
      sourceQuestionNumber: "۳ (شماره در فایل گردآوری‌شده)", verifiedAt,
      reviewerNote: "بازنویسی سؤال مقایسهٔ رسانایی؛ پاسخ مطابق پاسخنامهٔ فایل ارسالی (PDF شیمی، صفحه ۳)."
    },
    {
      id: `final-chemistry12-detergent-${track}-1405-tir-04`,
      grade: "دوازدهم", track, subject: "شیمی", chapter: "پاک‌کننده‌ها",
      topic: "ساختار پاک‌کننده و آب سخت", difficulty: "متوسط",
      prompt: "برای کاهش تشکیل رسوب و لکهٔ سفید ناشی از یون‌های کلسیم و منیزیم در آب سخت، افزودن کدام ماده به پاک‌کننده مناسب‌تر است؟",
      options: ["نمک‌های فسفات", "ترکیب‌های گوگرددار", "ترکیب‌های کلردار", "افزایش مقدار روغن"],
      correctIndex: 0,
      explanation: "نمک‌های فسفات با یون‌های کلسیم و منیزیم آب سخت واکنش می‌دهند و از تشکیل رسوب و لکه جلوگیری می‌کنند.",
      sourceStatus: "official-exam-adapted" as const, sourceTitle: "مجموعه سؤالات و پاسخنامه امتحان نهایی شیمی دوازدهم (فایل ارسالی کاربر)",
      sourceQuestionNumber: "۴ (شماره در فایل گردآوری‌شده)", verifiedAt,
      reviewerNote: "بازنویسی سؤال چندبخشی پاک‌کننده‌ها؛ پاسخ مطابق پاسخنامهٔ فایل ارسالی (PDF شیمی، صفحه ۴)."
    },
    {
      id: `final-chemistry12-ionization-${track}-1405-tir-05`,
      grade: "دوازدهم", track, subject: "شیمی", chapter: "اسیدها و بازها",
      topic: "درصد یونش اسید ضعیف", difficulty: "آسان",
      prompt: "در شکل ذره‌ای یک اسید ضعیف، از ۵ ذرهٔ اولیهٔ اسید، ۱ ذره یونیده شده است. درصد یونش اسید چقدر است؟",
      options: ["۱۰ درصد", "۲۰ درصد", "۴۰ درصد", "۸۰ درصد"],
      correctIndex: 1,
      explanation: "درصد یونش برابر نسبت شمار ذرات یونیده‌شده به شمار اولیه، ضرب‌در ۱۰۰ است: (۱÷۵)×۱۰۰=۲۰ درصد.",
      sourceStatus: "official-exam-adapted" as const, sourceTitle: "مجموعه سؤالات و پاسخنامه امتحان نهایی شیمی دوازدهم (فایل ارسالی کاربر)",
      sourceQuestionNumber: "۵ (شماره در فایل گردآوری‌شده)", verifiedAt,
      reviewerNote: "تبدیل سؤال شکل‌محور به متن و عدد؛ محاسبه با پاسخنامهٔ فایل ارسالی تطبیق داده شد (PDF شیمی، صفحه ۴)."
    },
    {
      id: `final-chemistry12-neutralization-${track}-1404-khordad-01`,
      grade: "دوازدهم", track, subject: "شیمی", chapter: "اسیدها و بازها",
      topic: "خنثی‌سازی اسید ضعیف و باز قوی", difficulty: "دشوار",
      prompt: "در محلولی از اسید ضعیف تک‌پروتونی HX، غلظت اولیهٔ اسید ۰٫۰۱۶ مولار است. برای خنثی‌کردن کامل ۲ لیتر از آن، با فرض واکنش ۱:۱، چند گرم NaOH لازم است؟ جرم مولی NaOH برابر ۴۰ گرم بر مول است.",
      options: ["۰٫۳۲ گرم", "۰٫۶۴ گرم", "۱٫۲۸ گرم", "۳٫۲۰ گرم"],
      correctIndex: 2,
      explanation: "مول اسید برابر ۰٫۰۱۶×۲=۰٫۰۳۲ است. نسبت واکنش HX و NaOH برابر ۱:۱ است؛ پس ۰٫۰۳۲ مول NaOH لازم است. جرم آن ۰٫۰۳۲×۴۰=۱٫۲۸ گرم می‌شود.",
      sourceStatus: "official-exam-adapted" as const, sourceTitle: "مجموعه سؤالات و پاسخنامه امتحان نهایی شیمی دوازدهم (فایل ارسالی کاربر)",
      sourceQuestionNumber: "۱ (شماره در فایل گردآوری‌شده)", verifiedAt,
      reviewerNote: "تمرین محاسباتی با داده‌های بازطراحی‌شده از سؤال آغازین فایل؛ تاریخ آزمون در صفحهٔ منبع مشخص نیست. محاسبهٔ مستقل: ۰٫۰۱۶×۲×۴۰=۱٫۲۸ گرم (گزینه ۳)."
    }
  ])
];
