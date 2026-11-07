import type { ExamQuestion } from "./examBank";

const verifiedAt = new Date("2026-11-07T00:00:00.000Z");
const reviewNote = "بر اساس مبحث و الگوی پرسش‌های دفترچهٔ ۱۵ آبان ۱۴۰۵ در فایل ارسالی کاربر بازنویسی شده است. پاسخنامهٔ کلیدی در آرشیو نبود؛ پاسخ به‌صورت مستقل حل و توضیح داده شده است.";

function item(input: {
  id: string; grade: string; track: string; subject: string; chapter: string; topic: string;
  prompt: string; options: [string, string, string, string]; correctIndex: number;
  explanation: string; sourceTitle: string; sourceQuestionNumber: string;
  difficulty?: "آسان" | "متوسط" | "سخت";
}): ExamQuestion {
  return {
    ...input,
    difficulty: input.difficulty ?? "متوسط",
    sourceStatus: "mock-exam-adapted",
    verifiedAt,
    reviewerNote: reviewNote,
  };
}

const e10 = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – پایه دهم تجربی (فایل ارسالی کاربر)";
const e11 = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – پایه یازدهم تجربی (فایل ارسالی کاربر)";
const e12 = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – پایه دوازدهم تجربی (فایل ارسالی کاربر)";
const m10 = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – پایه دهم ریاضی (فایل ارسالی کاربر)";
const m11 = "آزمون ماز ۱۵ آبان ۱۴۰۵ – پایه یازدهم ریاضی (فایل ارسالی کاربر)";
const m12 = "آزمون قلم‌چی ۱۵ آبان ۱۴۰۵ – پایه دوازدهم ریاضی و فیزیک (فایل ارسالی کاربر)";

export const verifiedScienceMathBatch2: ExamQuestion[] = [
  item({
    id:"upload-exp10-biology-gastric-cell-01", grade:"دهم", track:"تجربی", subject:"زیست‌شناسی",
    chapter:"گوارش و جذب مواد", topic:"یاخته‌های غدد معده",
    prompt:"کدام یاختهٔ غدد معده با ترشح اسید کلریدریک، محیط اسیدی لازم برای فعالیت پپسین را فراهم می‌کند؟",
    options:["یاختهٔ اصلی","یاختهٔ کناری","یاختهٔ جامی","یاختهٔ پوششی روده"], correctIndex:1,
    explanation:"یاخته‌های کناری غدد معده اسید کلریدریک ترشح می‌کنند؛ این اسید به ایجاد محیط مناسب برای فعالیت پپسین کمک می‌کند.",
    sourceTitle:e10, sourceQuestionNumber:"زیست‌شناسی، مبحث گوارش و غدد معده"
  }),
  item({
    id:"upload-exp10-physics-energy-02", grade:"دهم", track:"تجربی", subject:"فیزیک",
    chapter:"کار، انرژی و توان", topic:"قضیه کار و انرژی جنبشی",
    prompt:"برآیند کار نیروهای وارد بر جسمی مثبت است. در این حالت انرژی جنبشی جسم چه تغییری می‌کند؟",
    options:["کاهش می‌یابد","افزایش می‌یابد","ثابت می‌ماند","الزاماً صفر می‌شود"], correctIndex:1,
    explanation:"طبق قضیهٔ کار و انرژی جنبشی، کار خالص برابر تغییر انرژی جنبشی است؛ کار خالص مثبت یعنی انرژی جنبشی افزایش می‌یابد.",
    sourceTitle:e10, sourceQuestionNumber:"فیزیک، مبحث کار و انرژی"
  }),
  item({
    id:"upload-exp10-chem-mole-03", grade:"دهم", track:"تجربی", subject:"شیمی",
    chapter:"ردّ پای گازها در زندگی", topic:"محاسبه تعداد مول",
    prompt:"در ۱۸ گرم آب، با جرم مولی ۱۸ گرم بر مول، چند مول مولکول آب وجود دارد؟",
    options:["۰٫۵ مول","۱ مول","۲ مول","۱۸ مول"], correctIndex:1,
    explanation:"تعداد مول از تقسیم جرم بر جرم مولی به دست می‌آید: n=18÷18=1 mol.",
    sourceTitle:e10, sourceQuestionNumber:"شیمی، مبحث مول و جرم مولی"
  }),
  item({
    id:"upload-exp10-math-quadratic-04", grade:"دهم", track:"تجربی", subject:"ریاضی",
    chapter:"معادله‌ها و نامعادله‌ها", topic:"حل معادله درجه دوم",
    prompt:"مجموع ریشه‌های معادلهٔ ۲x²−۵x+۳=۰ کدام است؟",
    options:["۳/۲","۵/۲","−۵/۲","۳"], correctIndex:1,
    explanation:"در ax²+bx+c=0 مجموع ریشه‌ها برابر −b/a است؛ بنابراین −(−5)/2=5/2.",
    sourceTitle:e10, sourceQuestionNumber:"ریاضی، مبحث معادله درجه دوم"
  }),
  item({
    id:"upload-exp11-bio-eye-05", grade:"یازدهم", track:"تجربی", subject:"زیست‌شناسی",
    chapter:"حواس", topic:"گیرنده‌های نوری شبکیه",
    prompt:"بیشترین تراکم یاخته‌های مخروطی و بالاترین دقت دید رنگی در کدام ناحیهٔ شبکیه دیده می‌شود؟",
    options:["نقطه کور","گودی مرکزی لکه زرد","عصب بینایی","مشیمیه"], correctIndex:1,
    explanation:"گودی مرکزی لکهٔ زرد بیشترین تراکم مخروط‌ها را دارد و برای دید دقیق و تشخیص جزئیات و رنگ‌ها اهمیت ویژه‌ای دارد.",
    sourceTitle:e11, sourceQuestionNumber:"زیست‌شناسی، مبحث چشم و گیرنده‌های نوری"
  }),
  item({
    id:"upload-exp11-chem-stoich-06", grade:"یازدهم", track:"تجربی", subject:"شیمی",
    chapter:"قدر هدایای زمینی را بدانیم", topic:"استوکیومتری واکنش",
    prompt:"در واکنشی با نسبت مولی A به B برابر ۱ به ۲، اگر ۰٫۳ مول A به‌طور کامل مصرف شود، چند مول B لازم است؟",
    options:["۰٫۱۵","۰٫۳","۰٫۶","۰٫۹"], correctIndex:2,
    explanation:"نسبت استوکیومتری نشان می‌دهد به ازای هر ۱ مول A، دو مول B لازم است؛ پس ۰٫۳×۲=۰٫۶ مول B نیاز داریم.",
    sourceTitle:e11, sourceQuestionNumber:"شیمی، مبحث استوکیومتری و واکنش‌نویسی"
  }),
  item({
    id:"upload-exp11-math-function-07", grade:"یازدهم", track:"تجربی", subject:"ریاضی",
    chapter:"تابع", topic:"دامنه تابع کسری",
    prompt:"دامنهٔ تابع f(x)=1/(x−4) کدام است؟",
    options:["همه اعداد حقیقی","همه اعداد حقیقی به‌جز ۴","x بزرگ‌تر از ۴","x کوچک‌تر از ۴"], correctIndex:1,
    explanation:"مخرج کسر نباید صفر شود؛ بنابراین x−4≠0 و x≠4. سایر اعداد حقیقی در دامنه قرار دارند.",
    sourceTitle:e11, sourceQuestionNumber:"ریاضی، مبحث تابع"
  }),
  item({
    id:"upload-exp12-bio-transcription-08", grade:"دوازدهم", track:"تجربی", subject:"زیست‌شناسی",
    chapter:"جریان اطلاعات در یاخته", topic:"رونویسی",
    prompt:"در فرایند رونویسی، رشتهٔ RNA تازه‌ساخته‌شده از نظر توالی بازها با کدام رشتهٔ DNA شباهت دارد، با این تفاوت که به‌جای تیمین دارای یوراسیل است؟",
    options:["رشته الگو","رشته مکمل الگو یا رشته رمزگذار","هر دو رشته DNA به‌طور کامل","هیچ‌یک از رشته‌های DNA"], correctIndex:1,
    explanation:"توالی RNA با رشتهٔ رمزگذار DNA یکسان است، با این تفاوت که در RNA باز U جایگزین T می‌شود؛ RNA در برابر رشتهٔ الگو ساخته می‌شود.",
    sourceTitle:e12, sourceQuestionNumber:"زیست‌شناسی ۳، مبحث رونویسی"
  }),
  item({
    id:"upload-exp12-bio-genetics-09", grade:"دوازدهم", track:"تجربی", subject:"زیست‌شناسی",
    chapter:"انتقال اطلاعات در نسل‌ها", topic:"تلاقی تک‌صفتی",
    prompt:"در تلاقی دو فرد هتروزیگوت Aa×Aa با غالبیت کامل، احتمال ظهور فنوتیپ مغلوب در فرزندان چقدر است؟",
    options:["۰","۱/۴","۱/۲","۳/۴"], correctIndex:1,
    explanation:"ژنوتیپ‌های حاصل AA، Aa، Aa و aa هستند؛ فقط یک حالت از چهار حالت ژنوتیپ مغلوب aa دارد، پس احتمال ۱/۴ است.",
    sourceTitle:e12, sourceQuestionNumber:"زیست‌شناسی، مبحث وراثت و تلاقی"
  }),
  item({
    id:"upload-exp12-bio-energy-10", grade:"دوازدهم", track:"تجربی", subject:"زیست‌شناسی",
    chapter:"از ماده به انرژی", topic:"تنفس یاخته‌ای",
    prompt:"در تنفس هوازی یاخته‌های یوکاریوتی، زنجیره انتقال الکترون و بخش عمدهٔ تولید ATP در کدام ساختار انجام می‌شود؟",
    options:["غشای خارجی هسته","غشای داخلی میتوکندری","دستگاه گلژی","شبکه آندوپلاسمی زبر"], correctIndex:1,
    explanation:"زنجیرهٔ انتقال الکترون و ATPساز در غشای داخلی میتوکندری قرار دارند و شیب پروتونی ایجادشده انرژی لازم برای ساخت بخش عمده ATP را فراهم می‌کند.",
    sourceTitle:e12, sourceQuestionNumber:"زیست‌شناسی، مبحث تنفس یاخته‌ای"
  }),
  item({
    id:"upload-math10-geometry-similarity-11", grade:"دهم", track:"ریاضی", subject:"هندسه",
    chapter:"قضیه تالس، تشابه و کاربردهای آن", topic:"نسبت اضلاع در مثلث‌های متشابه",
    prompt:"دو مثلث متشابه‌اند و نسبت تشابه ضلع‌های متناظر مثلث کوچک به بزرگ ۲ به ۳ است. اگر محیط مثلث کوچک ۲۰ باشد، محیط مثلث بزرگ چقدر است؟",
    options:["۲۵","۳۰","۳۵","۴۰"], correctIndex:1,
    explanation:"در مثلث‌های متشابه نسبت محیط‌ها برابر نسبت ضلع‌های متناظر است؛ پس محیط مثلث بزرگ 20×3/2=30 خواهد بود.",
    sourceTitle:m10, sourceQuestionNumber:"هندسه، مبحث تشابه"
  }),
  item({
    id:"upload-math10-physics-measurement-12", grade:"دهم", track:"ریاضی", subject:"فیزیک",
    chapter:"فیزیک و اندازه‌گیری", topic:"یکا و تبدیل واحد",
    prompt:"سرعت ۷۲ کیلومتر بر ساعت معادل چند متر بر ثانیه است؟",
    options:["۱۰","۱۵","۲۰","۲۵"], correctIndex:2,
    explanation:"برای تبدیل km/h به m/s عدد را بر ۳٫۶ تقسیم می‌کنیم: 72÷3.6=20 m/s.",
    sourceTitle:m10, sourceQuestionNumber:"فیزیک، مبحث اندازه‌گیری و یکاها"
  }),
  item({
    id:"upload-math10-chem-periodic-13", grade:"دهم", track:"ریاضی", subject:"شیمی",
    chapter:"کیهان، زادگاه الفبای هستی", topic:"ساختار اتم",
    prompt:"اتمی خنثی با عدد اتمی ۱۱ و عدد جرمی ۲۳ چند نوترون دارد؟",
    options:["۱۱","۱۲","۲۳","۳۴"], correctIndex:1,
    explanation:"عدد جرمی برابر مجموع پروتون‌ها و نوترون‌هاست. تعداد نوترون‌ها=23−11=12.",
    sourceTitle:m10, sourceQuestionNumber:"شیمی، مبحث ساختار اتم"
  }),
  item({
    id:"upload-math11-math-combination-14", grade:"یازدهم", track:"ریاضی", subject:"ریاضی",
    chapter:"آمار و احتمال", topic:"ترکیب",
    prompt:"از میان ۵ دانش‌آموز، چند گروه دونفرهٔ متفاوت می‌توان تشکیل داد؟",
    options:["۵","۱۰","۱۵","۲۰"], correctIndex:1,
    explanation:"ترتیب اعضای گروه مهم نیست؛ بنابراین تعداد انتخاب‌ها برابر C(5,2)=5×4÷2=10 است.",
    sourceTitle:m11, sourceQuestionNumber:"ریاضیات، مبحث شمارش و ترکیب"
  }),
  item({
    id:"upload-math11-geometry-circle-15", grade:"یازدهم", track:"ریاضی", subject:"هندسه",
    chapter:"دایره", topic:"عمودمنصف وتر",
    prompt:"عمودمنصف هر وترِ یک دایره از کدام نقطه می‌گذرد؟",
    options:["مرکز دایره","یکی از دو سر وتر","نقطه‌ای دلخواه روی محیط","نقطه تماس مماس با دایره"], correctIndex:0,
    explanation:"مرکز دایره از دو سر هر وتر فاصلهٔ برابر دارد؛ پس روی عمودمنصف آن وتر قرار می‌گیرد.",
    sourceTitle:m11, sourceQuestionNumber:"ریاضیات، مبحث دایره و عمودمنصف وتر"
  }),
  item({
    id:"upload-math11-physics-electrostatics-16", grade:"یازدهم", track:"ریاضی", subject:"فیزیک",
    chapter:"الکتریسیتهٔ ساکن", topic:"قانون کولن",
    prompt:"اگر فاصلهٔ دو بار نقطه‌ای در خلأ دو برابر شود و اندازهٔ بارها ثابت بماند، نیروی الکتریکی بین آن‌ها چه تغییری می‌کند؟",
    options:["دو برابر می‌شود","چهار برابر می‌شود","نصف می‌شود","یک‌چهارم می‌شود"], correctIndex:3,
    explanation:"طبق قانون کولن نیرو با مجذور فاصله نسبت وارون دارد؛ با دو برابرشدن فاصله، نیرو به یک‌چهارم مقدار اولیه می‌رسد.",
    sourceTitle:m11, sourceQuestionNumber:"ریاضیات، مبحث الکتریسیته ساکن"
  }),
  item({
    id:"upload-math12-calculus-derivative-17", grade:"دوازدهم", track:"ریاضی", subject:"حسابان",
    chapter:"مشتق", topic:"مشتق تابع چندجمله‌ای",
    prompt:"مشتق تابع f(x)=3x²−4x+7 کدام است؟",
    options:["3x−4","6x−4","6x²−4","3x²−4"], correctIndex:1,
    explanation:"با به‌کارگیری قاعدهٔ توان، مشتق 3x² برابر 6x، مشتق −4x برابر −4 و مشتق عدد ثابت ۷ برابر صفر است.",
    sourceTitle:m12, sourceQuestionNumber:"حسابان، مبحث مشتق"
  }),
  item({
    id:"upload-math12-geometry-matrix-18", grade:"دوازدهم", track:"ریاضی", subject:"هندسه",
    chapter:"ماتریس و کاربردها", topic:"دترمینان ماتریس ۲×۲",
    prompt:"دترمینان ماتریس [[2,1],[3,4]] چقدر است؟",
    options:["۵","۸","۱۱","۱۴"], correctIndex:0,
    explanation:"دترمینان ماتریس دو در دو برابر ad−bc است؛ بنابراین 2×4−1×3=8−3=5.",
    sourceTitle:m12, sourceQuestionNumber:"هندسه، مبحث ماتریس و دترمینان"
  }),
  item({
    id:"upload-math12-discrete-divisibility-19", grade:"دوازدهم", track:"ریاضی", subject:"ریاضیات گسسته",
    chapter:"آشنایی با نظریه اعداد", topic:"بخش‌پذیری",
    prompt:"کدام عدد بر ۳ بخش‌پذیر است؟",
    options:["۴۵۲","۵۱۷","۶۲۱","۷۰۴"], correctIndex:2,
    explanation:"عدد بر ۳ بخش‌پذیر است اگر مجموع رقم‌های آن بر ۳ بخش‌پذیر باشد. برای ۶۲۱، مجموع رقم‌ها ۹ است؛ پس بر ۳ بخش‌پذیر است.",
    sourceTitle:m12, sourceQuestionNumber:"ریاضیات گسسته، مبحث بخش‌پذیری"
  }),
];

