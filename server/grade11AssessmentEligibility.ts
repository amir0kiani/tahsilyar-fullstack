/**
 * Grade 11 assessment eligibility for the 1406 national entrance-exam cycle.
 *
 * This is deliberately an assessment allowlist, not a complete curriculum list.
 * A Grade 11 subject is eligible only when it appears in either:
 * 1) the official Grade 11 transcript/final-exam subjects for that track, or
 * 2) the official 1406 national entrance-exam textbook sources for that track.
 *
 * Official Sanjesh sources:
 * - Grade 11 transcript subjects and coefficients (1406):
 *   https://www.sanjesh.org/_sanjesh/documents/1406/shora/anavin1406.pdf
 * - 1406 policy amendments:
 *   https://www.sanjesh.org/_sanjesh/documents/1406/shora/eslahat1406.pdf
 * - 1406 entrance-exam textbook sources:
 *   https://www.sanjesh.org/_sanjesh/documents/فهرست%20دروس%20آزمون%20سراسری%20سال%2014061406.pdf
 *
 * The 1406 Sanjesh notice (1405/07/01; resolution 927) explicitly lists six
 * Grade 11 transcript subjects per diploma. It supersedes preliminary 1404
 * statements that had described all Grade 11 subjects as final exams.
 */

export const grade11AssessmentYear = "۱۴۰۶";

export const grade11FinalExamSubjectsByTrack = {
  "انسانی": [
    "فارسی",
    "زبان انگلیسی",
    "دین و زندگی",
    "عربی",
    "تاریخ",
    "جامعه‌شناسی",
  ],
  "ریاضی": [
    "فارسی",
    "زبان انگلیسی",
    "دین و زندگی",
    "عربی",
    "هندسه",
    "فیزیک",
  ],
  "تجربی": [
    "فارسی",
    "زبان انگلیسی",
    "دین و زندگی",
    "عربی",
    "زیست‌شناسی",
    "شیمی",
  ],
} as const;

export const grade11EntranceExamSubjectsByTrack = {
  "انسانی": [
    "ریاضی و آمار",
    "علوم و فنون ادبی",
    "عربی",
    "تاریخ",
    "جغرافیا",
    "جامعه‌شناسی",
    "فلسفه",
    "روان‌شناسی",
  ],
  "ریاضی": [
    "هندسه",
    "آمار و احتمال",
    "حسابان",
    "فیزیک",
    "شیمی",
  ],
  "تجربی": [
    "زمین‌شناسی",
    "ریاضی",
    "زیست‌شناسی",
    "فیزیک",
    "شیمی",
  ],
} as const;

export const grade11DiniSharedChapters = ["هدایت الهی","تداوم هدایت","معجزه جاویدان","مسئولیت‌های پیامبر (ص)","امامت، تداوم رسالت","پیشوای اسوه","وضعیت فرهنگی، اجتماعی و سیاسی مسلمانان، پس از رحلت رسول خدا","احیای ارزش‌های راستین","عصر غیبت","مرجعیت و ولایت فقیه","عزت نفس","پیوند مقدس"] as const;
export const grade11HumanitiesDiniExclusiveChapters = ["آخرین پیامبر","جان و جانشین پیامبر (ص)","جهاد در راستای ولایت ظاهری","در انتظار ظهور","رهبری و مردم","زمینه‌های پیوند"] as const;
const commonFinalExamSubjects = ["فارسی", "زبان انگلیسی"] as const;

// The math/experimental shared track is allowed only for books with the same
// Grade 11 textbook edition in both tracks. Physics is intentionally excluded:
// its Grade 11 textbook codes and chapter maps differ between the two tracks.
const sharedMathScienceSubjects = ["عربی", "دین و زندگی", "شیمی"] as const;

const subjectsForTrack = {
  "انسانی": new Set<string>([
    ...grade11FinalExamSubjectsByTrack["انسانی"],
    ...grade11EntranceExamSubjectsByTrack["انسانی"],
  ]),
  "ریاضی": new Set<string>([
    ...grade11FinalExamSubjectsByTrack["ریاضی"],
    ...grade11EntranceExamSubjectsByTrack["ریاضی"],
  ]),
  "تجربی": new Set<string>([
    ...grade11FinalExamSubjectsByTrack["تجربی"],
    ...grade11EntranceExamSubjectsByTrack["تجربی"],
  ]),
};

const grade11SubjectAliases: Record<string, string> = {
  "عربی، زبان قرآن": "عربی",
  "عربی زبان قرآن": "عربی",
  "عربی، زبان قرآن (۲)": "عربی",
  "عربی، زبان قرآن ۲": "عربی",
  "عربی ۲ (زبان تخصصی رشته)": "عربی",
  "فارسی (۲)": "فارسی",
  "فارسی ۲": "فارسی",
  "زبان خارجی (۲)": "زبان انگلیسی",
  "زبان خارجی ۲": "زبان انگلیسی",
  "تعلیمات دینی ۲": "دین و زندگی",
  "تعلیمات دینی ۲ (دینی، اخلاق و قرآن)": "دین و زندگی",
  "جامعه شناسی (۲)": "جامعه‌شناسی",
  "جامعه‌شناسی (۲)": "جامعه‌شناسی",
  "تاریخ (۲)": "تاریخ",
  "تاریخ ۲": "تاریخ",
};

export function canonicalizeGrade11AssessmentSubject(subject: string): string {
  return grade11SubjectAliases[subject.trim()] ?? subject.trim();
}

export function canonicalizeGrade11AssessmentQuestion<T extends {
  grade: string;
  track: string;
  subject: string;
}>(question: T): T {
  if (question.grade !== "یازدهم") return question;
  const subject = canonicalizeGrade11AssessmentSubject(question.subject);
  return subject === question.subject ? question : { ...question, subject };
}

export function isGrade11AssessmentSubjectEligible(track: string, subject: string): boolean {
  const canonicalSubject = canonicalizeGrade11AssessmentSubject(subject);

  if (track === "عمومی") {
    return (commonFinalExamSubjects as readonly string[]).includes(canonicalSubject);
  }

  if (track === "ریاضی و تجربی") {
    return (sharedMathScienceSubjects as readonly string[]).includes(canonicalSubject);
  }

  return subjectsForTrack[track as keyof typeof subjectsForTrack]?.has(canonicalSubject) ?? false;
}

const diniChapterAliases: Record<string,string> = {"معجزۀ جاودان":"معجزه جاویدان","پیشوایان اسوه":"پیشوای اسوه","وضعیت فرهنگی، اجتماعی و سیاسی مسلمانان، پس از رحلت رسول خدا (ص)":"وضعیت فرهنگی، اجتماعی و سیاسی مسلمانان، پس از رحلت رسول خدا","احیای ارزش های راستین":"احیای ارزش‌های راستین","عصر غیبت امام زمان (ع)":"عصر غیبت","عزّت نفس":"عزت نفس","پیوند مقدّس":"پیوند مقدس","جان و جانشینی پیامبر (ص)":"جان و جانشین پیامبر (ص)","مرجعیت و ولایت‌فقیه":"مرجعیت و ولایت فقیه"};
export function canonicalizeGrade11AssessmentChapter(track:string,subject:string,chapter:string):string {
  return subject === "دین و زندگی" ? (diniChapterAliases[chapter.trim()] ?? chapter.trim()) : chapter.trim();
}
export function isGrade11AssessmentQuestionEligible(question: {grade:string;track:string;subject:string;chapter?:string}):boolean {
  if(question.grade!=="یازدهم") return true;
  const subject=canonicalizeGrade11AssessmentSubject(question.subject);
  if(question.track==="عمومی" && subject==="دین و زندگی") {
    return (grade11DiniSharedChapters as readonly string[]).includes(canonicalizeGrade11AssessmentChapter(question.track,subject,question.chapter??""));
  }
  return isGrade11AssessmentSubjectEligible(question.track,subject);
}

// Explicit, conservative mapping from existing question topics to official Grade 11
// Physics 2 sub-lessons. Topics that cannot be tied unambiguously remain unmapped.
const grade11PhysicsLessonByTopic: Record<string, string> = {
  "ریاضی::الکتریسیتهٔ ساکن::اصل برهم‌نهی نیروی الکتریکی": "قانون کولن",
  "ریاضی::الکتریسیتهٔ ساکن::پایستگی و کوانتیده بودن بار الکتریکی": "پایستگی و کوانتیده بودن بار الکتریکی",
  "ریاضی::الکتریسیتهٔ ساکن::قانون کولن": "قانون کولن",
  "ریاضی::الکتریسیتهٔ ساکن::میدان الکتریکی": "میدان الکتریکی",
  "ریاضی::الکتریسیتهٔ ساکن::خطوط میدان الکتریکی": "خطوط میدان الکتریکی",
  "ریاضی::الکتریسیتهٔ ساکن::میدان الکتریکی درون رسانا": "میدان الکتریکی در داخل رساناها",
  "ریاضی::الکتریسیتهٔ ساکن::تعادل قطرهٔ باردار در میدان الکتریکی": "میدان الکتریکی",
  "ریاضی::الکتریسیتهٔ ساکن::چگالی سطحی بار و تعداد الکترون": "پایستگی و کوانتیده بودن بار الکتریکی",
  "ریاضی::الکتریسیتهٔ ساکن::خازن جداشده از باتری": "خازن",
  "ریاضی::جریان الکتریکی و مدارهای جریان مستقیم::مقاومت نوری": "عوامل مؤثر بر مقاومت الکتریکی",
  "ریاضی::القای الکترومغناطیسی و جریان متناوب::محاسبهٔ میدان از شار مغناطیسی": "پدیدهٔ القای الکترومغناطیسی",
  "تجربی::الکتریسیتهٔ ساکن::اختلاف پتانسیل و انرژی پتانسیل": "پتانسیل الکتریکی",
  "ریاضی::جریان الکتریکی و مدارهای جریان مستقیم::رابطهٔ مقاومت و سطح مقطع": "عوامل مؤثر بر مقاومت الکتریکی",
  "ریاضی::جریان الکتریکی و مدارهای جریان مستقیم::ظرفیت باتری و زمان تخلیه": "نیروی محرکهٔ الکتریکی و مدارها",
  "ریاضی::جریان الکتریکی و مدارهای جریان مستقیم::وابستگی مقاومت به دما": "عوامل مؤثر بر مقاومت الکتریکی",
  "ریاضی::جریان الکتریکی و مدارهای جریان مستقیم::مقاومت داخلی باتری": "نیروی محرکهٔ الکتریکی و مدارها",
  "ریاضی::مغناطیس::نیروی بین دو سیم موازی": "میدان مغناطیسی حاصل از جریان الکتریکی",
  "ریاضی::مغناطیس::نیروی مغناطیسی وارد بر بار متحرک": "نیروی مغناطیسی وارد بر ذرّهٔ باردار متحرک در میدان مغناطیسی",
  "ریاضی::مغناطیس::میدان مغناطیسی مرکز پیچه": "میدان مغناطیسی حاصل از جریان الکتریکی",
  "ریاضی::مغناطیس::مواد فرومغناطیسی نرم": "ویژگی‌های مغناطیسی مواد",
  "ریاضی::مغناطیس::نیروی مغناطیسی بر سیم حامل جریان": "نیروی مغناطیسی وارد بر سیم حامل جریان",
  "ریاضی::القای الکترومغناطیسی و جریان متناوب::نیروی محرکهٔ القایی متوسط": "قانون القای الکترومغناطیسی فاراده",
  "ریاضی::القای الکترومغناطیسی و جریان متناوب::جهت جریان القایی": "قانون لنز",
  "ریاضی::القای الکترومغناطیسی و جریان متناوب::انرژی ذخیره‌شده در القاگر": "القاگرها",
  "ریاضی::القای الکترومغناطیسی و جریان متناوب::معادلهٔ جریان متناوب": "جریان متناوب",

  "تجربی::الکتریسیتهٔ ساکن::قانون کولن": "قانون کولن",
  "تجربی::الکتریسیتهٔ ساکن::میدان الکتریکی": "میدان الکتریکی",
  "تجربی::الکتریسیتهٔ ساکن::جهت میدان الکتریکی": "میدان الکتریکی",
  "تجربی::الکتریسیتهٔ ساکن::میدان بار نقطه‌ای": "میدان الکتریکی حاصل از یک ذرهٔ باردار",
  "تجربی::الکتریسیتهٔ ساکن::انرژی خازن": "انرژی خازن",
  "تجربی::الکتریسیتهٔ ساکن::تعادل الکتروستاتیکی رسانا": "توزیع بار الکتریکی در اجسام رسانا",
  "تجربی::الکتریسیتهٔ ساکن::پایستگی بار الکتریکی": "پایستگی و کوانتیده بودن بار الکتریکی",
  "تجربی::الکتریسیتهٔ ساکن::پتانسیل الکتریکی": "پتانسیل الکتریکی",
  "تجربی::جریان الکتریکی و مدارهای جریان مستقیم::قانون اهم": "مقاومت الکتریکی و قانون اهم",
  "تجربی::جریان الکتریکی و مدارهای جریان مستقیم::مقاومت‌های متوالی": "ترکیب مقاومت‌ها",
  "تجربی::جریان الکتریکی و مدارهای جریان مستقیم::مقاومت‌های موازی": "ترکیب مقاومت‌ها",
  "تجربی::جریان الکتریکی و مدارهای جریان مستقیم::ترکیب مقاومت‌ها": "ترکیب مقاومت‌ها",
  "تجربی::جریان الکتریکی و مدارهای جریان مستقیم::مقاومت درونی مولد": "نیروی محرکهٔ الکتریکی و مدارها",
  "تجربی::جریان الکتریکی و مدارهای جریان مستقیم::توان الکتریکی": "توان در مدارهای الکتریکی",
  "تجربی::مغناطیس و القای الکترومغناطیسی::میدان مغناطیسی سیم‌لوله": "میدان مغناطیسی ایجادشده به وسیلهٔ جریان الکتریکی",
  "تجربی::مغناطیس و القای الکترومغناطیسی::نیروی مغناطیسی بر بار متحرک": "نیروی مغناطیسی وارد بر ذرّهٔ باردار متحرک در میدان مغناطیسی",
  "تجربی::مغناطیس و القای الکترومغناطیسی::نیروی وارد بر سیم حامل جریان": "نیروی مغناطیسی وارد بر سیم حامل جریان",
  "تجربی::مغناطیس و القای الکترومغناطیسی::قانون لنز": "قانون لنز",
  "تجربی::مغناطیس و القای الکترومغناطیسی::قانون فاراده": "قانون القای الکترومغناطیسی فاراده",
};

export function canonicalizeGrade11PhysicsLesson(
  track: string,
  chapter: string,
  topic?: string
): string | undefined {
  if (!topic) return undefined;
  return grade11PhysicsLessonByTopic[`${track}::${chapter.trim()}::${topic.trim()}`];
}
