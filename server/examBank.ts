export type ExamQuestion = { id:string; grade:string; track:string; subject:string; chapter:string; topic:string; difficulty:string; prompt:string; options:string[]; correctIndex:number; explanation:string };
export const curriculumCatalog = [
{track:"تجربی",grade:"دهم تا دوازدهم",subject:"زیست‌شناسی",chapters:["سلول","ژنتیک","فیزیولوژی"]},
{track:"تجربی",grade:"دهم تا دوازدهم",subject:"شیمی",chapters:["ساختار اتم","استوکیومتری","محلول‌ها"]},
{track:"ریاضی",grade:"دهم تا دوازدهم",subject:"ریاضی",chapters:["تابع","معادله","احتمال"]},
{track:"ریاضی",grade:"دهم تا دوازدهم",subject:"فیزیک",chapters:["حرکت‌شناسی","دینامیک","انرژی"]},
{track:"انسانی",grade:"دهم تا دوازدهم",subject:"جامعه‌شناسی",chapters:["کنش اجتماعی","فرهنگ"]},
{track:"انسانی",grade:"دهم تا دوازدهم",subject:"فلسفه و منطق",chapters:["مفهوم و مصداق","استدلال"]},
{track:"عمومی",grade:"دهم تا دوازدهم",subject:"فارسی و نگارش",chapters:["واژگان","آرایه‌های ادبی","دستور زبان"]},
{track:"عمومی",grade:"دهم تا دوازدهم",subject:"عربی",chapters:["ترجمه","قواعد"]},
{track:"عمومی",grade:"دهم تا دوازدهم",subject:"زبان انگلیسی",chapters:["واژگان","دستور زبان"]},
{track:"عمومی",grade:"دهم تا دوازدهم",subject:"دین و زندگی",chapters:["پیام آیات","مفهوم درس"]}
] as const;
export const examQuestions:ExamQuestion[]=[
{id:"bio-cell-01",grade:"دهم",track:"تجربی",subject:"زیست‌شناسی",chapter:"سلول",topic:"غشای سلولی",difficulty:"آسان",prompt:"انتشار ساده در غشا معمولاً در چه جهتی رخ می‌دهد؟",options:["خلاف شیب غلظت","در جهت شیب غلظت","فقط با ATP","فقط با وزیکول"],correctIndex:1,explanation:"انتشار ساده فرایندی غیرفعال و در جهت شیب غلظت است."},
{id:"math-eq-10",grade:"دهم",track:"ریاضی",subject:"ریاضی",chapter:"معادله",topic:"معادله خطی",difficulty:"آسان",prompt:"اگر ۳x−۵=۱۰ باشد، x چند است؟",options:["۳","۴","۵","۶"],correctIndex:2,explanation:"با افزودن ۵ به دو طرف، ۳x=۱۵ و x=۵."},
{id:"hum-soc-10",grade:"دهم",track:"انسانی",subject:"جامعه‌شناسی",chapter:"کنش اجتماعی",topic:"کنش",difficulty:"آسان",prompt:"چه چیزی کنش را اجتماعی می‌کند؟",options:["انجام در تنهایی","معناداری با توجه به دیگران","نتیجه اقتصادی","تکرار طبیعی"],correctIndex:1,explanation:"کنش اجتماعی با توجه به رفتار یا انتظار دیگران معنا پیدا می‌کند."},
{id:"gen-en-10",grade:"دهم",track:"عمومی",subject:"زبان انگلیسی",chapter:"واژگان",topic:"Vocabulary",difficulty:"آسان",prompt:"Choose the closest meaning of “rapid”.",options:["slow","quick","weak","late"],correctIndex:1,explanation:"Rapid means fast or quick."}
{id:"phy-motion-10",grade:"دهم",track:"ریاضی",subject:"فیزیک",chapter:"حرکت‌شناسی",topic:"سرعت متوسط",difficulty:"آسان",prompt:"جسمی در ۴ ثانیه ۲۰ متر جابه‌جا می‌شود. سرعت متوسط چقدر است؟",options:["۴ m/s","۵ m/s","۱۶ m/s","۸۰ m/s"],correctIndex:1,explanation:"سرعت متوسط برابر جابه‌جایی تقسیم بر زمان، یعنی ۵ متر بر ثانیه است."},
{id:"chem-atom-10",grade:"دهم",track:"تجربی",subject:"شیمی",chapter:"ساختار اتم",topic:"عدد اتمی",difficulty:"آسان",prompt:"عدد اتمی برابر تعداد کدام ذره است؟",options:["نوترون","پروتون","پروتون و نوترون","الکترون ظرفیت"],correctIndex:1,explanation:"عدد اتمی تعداد پروتون‌های هسته است."},
{id:"gen-ar-11",grade:"یازدهم",track:"عمومی",subject:"عربی",chapter:"ترجمه",topic:"ترجمه",difficulty:"متوسط",prompt:"معنای «الطلاب یکتبون الدرس» کدام است؟",options:["دانش‌آموزان درس را می‌نویسند","دانش‌آموز درس را نوشت","معلمان درس را می‌خوانند","دانش‌آموزان درس را خواهند خواند"],correctIndex:0,explanation:"فعل مضارع جمع است: دانش‌آموزان درس را می‌نویسند."}
];