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
export const examQuestions:ExamQuestion[]=[];
