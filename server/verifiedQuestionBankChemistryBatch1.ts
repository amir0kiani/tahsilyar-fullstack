import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-10-30T00:00:00.000Z");
const officialSanjeshExamUrl = "https://www.sanjesh.org/fa-IR/sanjesh/4936/news/view/14591/13759/Staging";

export const verifiedChemistryBatch1: ExamQuestion[] = [
  {
    id: "verified-chem1-equation-1405-077",
    grade: "دهم", track: "تجربی", subject: "شیمی", chapter: "ردّ پای گازها در زندگی",
    topic: "معادلهٔ نمادی واکنش شیمیایی", difficulty: "آسان",
    prompt: "کدام گزاره دربارهٔ معادلهٔ نمادی یک واکنش شیمیایی درست است؟",
    options: [
      "در هر معادلهٔ موازنه‌شده، شمار مولکول‌ها در دو طرف الزاماً برابر است.",
      "ضرایب معادله، تعداد اتم‌های یک عنصر را در یک مولکول تغییر می‌دهند.",
      "فرمول مواد و در صورت درج، حالت فیزیکی آن‌ها در معادله نمایش داده می‌شود.",
      "هر معادله بدون درج اطلاعات اضافی، فشار و دمای دقیق واکنش را مشخص می‌کند."
    ],
    correctIndex: 2,
    explanation: "معادلهٔ نمادی فرمول مواد و در صورت درج، حالت فیزیکی آن‌ها را نشان می‌دهد. موازنه، شمار اتم‌های هر عنصر را برابر می‌کند؛ نه الزاماً شمار مولکول‌ها را.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۷۷", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۷۷ شیمی کنکور تجربی ۱۴۰۵؛ صورت سؤال و گزینه‌ها بازنویسی شده‌اند."
  },
  {
    id: "verified-chem1-ion-ratio-1405-079",
    grade: "دهم", track: "تجربی", subject: "شیمی", chapter: "آب، آهنگ زندگی",
    topic: "فرمول ترکیب‌های یونی و نسبت یون‌ها", difficulty: "متوسط",
    prompt: "در کدام جفت ترکیب یونی، نسبت شمار کاتیون به آنیون در هر دو ترکیب برابر ۱ به ۱ است؟",
    options: [
      "MgCl₂ و Na₂O",
      "AlPO₄ و FeCO₃",
      "CaF₂ و K₂S",
      "Al₂O₃ و NaCl"
    ],
    correctIndex: 1,
    explanation: "در AlPO₄، یک یون Al³⁺ با یک یون PO₄³⁻ و در FeCO₃، یک یون Fe²⁺ با یک یون CO₃²⁻ ترکیب می‌شود؛ پس نسبت کاتیون به آنیون در هر دو ۱:۱ است.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۷۹", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۷۹ شیمی کنکور تجربی ۱۴۰۵ دربارهٔ نسبت یون‌ها؛ گزینه‌ها بازطراحی شده‌اند."
  },
  {
    id: "verified-chem1-isotope-1405-109",
    grade: "دهم", track: "تجربی", subject: "شیمی", chapter: "کیهان، زادگاه الفبای هستی",
    topic: "عدد اتمی، عدد جرمی و یون", difficulty: "متوسط",
    prompt: "یون X³⁻ از ایزوتوپی با عدد جرمی ۳۱، دارای ۱۸ الکترون است. عدد اتمی X چند است؟",
    options: ["۱۳", "۱۴", "۱۵", "۱۶"],
    correctIndex: 2,
    explanation: "یون ۳− سه الکترون بیش از اتم خنثی دارد؛ بنابراین اتم خنثی ۱۵ الکترون و عدد اتمی ۱۵ دارد. عدد جرمی برای تعیین عدد اتمی لازم نیست، اما برای یافتن نوترون‌ها کاربرد دارد.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۱۰۹", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۱۰۹ شیمی کنکور تجربی ۱۴۰۵؛ اعداد و صورت سؤال بازنویسی شده‌اند."
  },
  {
    id: "verified-chem1-electron-config-1405-110",
    grade: "دهم", track: "تجربی", subject: "شیمی", chapter: "کیهان، زادگاه الفبای هستی",
    topic: "تشکیل یون پایدار و آرایش الکترونی", difficulty: "آسان",
    prompt: "عنصری از دورهٔ سوم، یون پایدار X³⁺ می‌سازد. اگر این یون ۱۰ الکترون داشته باشد، X کدام عنصر است؟",
    options: ["سدیم", "منیزیم", "آلومینیم", "کلر"],
    correctIndex: 2,
    explanation: "یون X³⁺ سه الکترون کمتر از اتم خنثی دارد؛ پس اتم خنثی ۱۳ الکترون دارد. عدد اتمی ۱۳ مربوط به آلومینیم است.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۱۱۰", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۱۱۰ شیمی کنکور تجربی ۱۴۰۵ دربارهٔ یون‌های پایدار؛ صورت سؤال ساده‌سازی شده است."
  },
  {
    id: "verified-chem2-distillation-1405-083",
    grade: "یازدهم", track: "تجربی", subject: "شیمی", chapter: "قدر هدایای زمینی را بدانیم",
    topic: "تقطیر جزءبه‌جزء نفت خام", difficulty: "آسان",
    prompt: "در برج تقطیر جزءبه‌جزء نفت خام، با حرکت از بخش بالایی برج به بخش‌های پایین‌تر، کدام روند معمولاً رخ می‌دهد؟",
    options: [
      "نقطهٔ جوش برش‌ها کاهش می‌یابد و فرّاریت بیشتر می‌شود.",
      "نقطهٔ جوش برش‌ها افزایش و فرّاریت کاهش می‌یابد.",
      "همهٔ برش‌ها به ترکیب شیمیایی یکسان تبدیل می‌شوند.",
      "جرم مولی همهٔ هیدروکربن‌ها ثابت می‌ماند."
    ],
    correctIndex: 1,
    explanation: "در بخش‌های پایین‌تر برج، دما بالاتر است و معمولاً برش‌های سنگین‌تر با نقطهٔ جوش بالاتر و فرّاریت کمتر جمع‌آوری می‌شوند.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۸۳", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۸۳ شیمی کنکور تجربی ۱۴۰۵؛ گزینه‌ها و عبارت‌بندی بازنویسی شده‌اند."
  },
  {
    id: "verified-chem2-yield-1405-084",
    grade: "یازدهم", track: "تجربی", subject: "شیمی", chapter: "قدر هدایای زمینی را بدانیم",
    topic: "استوکیومتری و بازده درصدی", difficulty: "متوسط",
    prompt: "در واکنش 4CuO → 2Cu₂O + O₂، از ۱۶ گرم CuO با بازده ۸۰ درصد چند مول O₂ به دست می‌آید؟ جرم مولی CuO را ۸۰ گرم بر مول بگیرید.",
    options: ["۰٫۰۲ مول", "۰٫۰۴ مول", "۰٫۰۵ مول", "۰٫۱۰ مول"],
    correctIndex: 1,
    explanation: "۱۶ گرم CuO برابر ۰٫۲ مول است. طبق نسبت واکنش، مقدار نظری O₂ برابر ۰٫۲÷۴=۰٫۰۵ مول است؛ با بازده ۸۰ درصد، مقدار واقعی ۰٫۰۵×۰٫۸=۰٫۰۴ مول می‌شود.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۸۴", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۸۴ شیمی کنکور تجربی ۱۴۰۵؛ داده‌های عددی برای یک مسئلهٔ تازه تغییر کرده‌اند."
  },
  {
    id: "verified-chem2-bromine-1405-085",
    grade: "یازدهم", track: "تجربی", subject: "شیمی", chapter: "قدر هدایای زمینی را بدانیم",
    topic: "هیدروکربن‌های سیرنشده و آزمون برم", difficulty: "متوسط",
    prompt: "کدام ترکیب در شرایط معمول آزمایش، محلول برم را به علت داشتن پیوند دوگانهٔ کربن–کربن بی‌رنگ می‌کند؟",
    options: ["سیکلوهگزان", "هگزان", "هگز-۱-اِن", "آب"],
    correctIndex: 2,
    explanation: "هگز-۱-اِن دارای پیوند دوگانهٔ C=C است و در واکنش افزایشی با برم، رنگ محلول برم را از بین می‌برد. آلکان‌ها و سیکلوآلکان‌های سیرشده در شرایط معمول این آزمون چنین واکنشی نمی‌دهند.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۸۵", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۸۵ شیمی کنکور تجربی ۱۴۰۵ دربارهٔ هیدروکربن‌ها و آزمون برم؛ صورت سؤال جدید است."
  },
  {
    id: "verified-chem2-reaction-ratio-1405-092",
    grade: "یازدهم", track: "تجربی", subject: "شیمی", chapter: "در پی غذای سالم",
    topic: "نسبت مولی در واکنش شیمیایی", difficulty: "آسان",
    prompt: "در واکنش CO + 2H₂ → CH₃OH، اگر ۰٫۳۰ مول CO به‌طور کامل واکنش دهد و هیدروژن به مقدار کافی باشد، چند مول H₂ مصرف می‌شود؟",
    options: ["۰٫۱۵ مول", "۰٫۳۰ مول", "۰٫۶۰ مول", "۰٫۹۰ مول"],
    correctIndex: 2,
    explanation: "ضرایب معادله نشان می‌دهند به ازای مصرف هر ۱ مول CO، مقدار ۲ مول H₂ مصرف می‌شود؛ پس برای ۰٫۳۰ مول CO، مقدار H₂ برابر ۰٫۶۰ مول است.",
    sourceStatus: "official-exam-adapted",
    sourceTitle: "کنکور سراسری ۱۴۰۵ – گروه علوم تجربی، دفترچه شیمی",
    sourceUrl: officialSanjeshExamUrl, sourceYear: "۱۴۰۵", sourceQuestionNumber: "۹۲", verifiedAt,
    reviewerNote: "تمرین مستقل از سؤال ۹۲ شیمی کنکور تجربی ۱۴۰۵؛ داده‌ها و صورت سؤال برای تمرین پایه بازنویسی شده‌اند."
  }
];
