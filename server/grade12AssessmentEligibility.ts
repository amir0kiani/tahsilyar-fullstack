/**
 * Grade 12 assessment scope for the 1406 cycle.
 *
 * Final-exam subjects use the latest published Grade 12 timetable available in
 * this run (Shahrivar 1405). That schedule is a coordinated nationwide exam
 * timetable, not a transcript-repair schedule. Entrance-exam subjects use the
 * official Sanjesh textbook-source notice for 1406. Recheck the final-exam
 * arrays when the official 1406 final-exam timetable is published.
 */
export const grade12AssessmentYear = "۱۴۰۶";
export const grade12FinalExamScheduleYear = "۱۴۰۵";

export const grade12AssessmentSources = {
  finalExamSchedule: "https://namnak.com/grade-12-september-exam-schedule-1405.p120612",
  entranceExamSources: "https://www.sanjesh.org/_sanjesh/documents/%D9%81%D9%87%D8%B1%D8%B3%D8%AA%20%D8%AF%D8%B1%D9%88%D8%B3%20%D8%A2%D8%B2%D9%85%D9%88%D9%86%20%D8%B3%D8%B1%D8%A7%D8%B3%D8%B1%DB%8C%20%D8%B3%D8%A7%D9%84%2014061406.pdf",
  englishBook: "https://www.roshd.ir/zaban/Content/%DA%A9%D8%AA%D8%A7%D8%A8-%D8%B2%D8%A8%D8%A7%D9%86-%D8%A7%D9%86%DA%AF%D9%84%DB%8C%D8%B3%DB%8C-%DB%B3-%D9%BE%D8%A7%DB%8C%D9%87-%D8%AF%D9%88%D8%A7%D8%B2%D8%AF%D9%87%D9%85",
  humanitiesArabicBook: "https://www.roshd.ir/quran/Content/%DA%A9%D8%AA%D8%A7%D8%A8-%D8%B9%D8%B1%D8%A8%DB%8C-%D8%B2%D8%A8%D8%A7%D9%86-%D9%82%D8%B1%D8%A2%D9%86-%DB%B3-%D9%BE%D8%A7%DB%8C%D9%87-%D8%AF%D9%88%D8%A7%D8%B2%D8%AF%D9%87%D9%85-%D8%B9%D9%84%D9%88%D9%85-%D8%A7%D9%86%D8%B3%D8%A7%D9%86%DB%8C",
  mathScienceArabicBook: "https://www.roshd.ir/quran/Content/%D8%B9%D8%B1%D8%A8%DB%8C-%D8%B2%D8%A8%D8%A7%D9%86-%D9%82%D8%B1%D8%A2%D9%86-3-%D9%BE%D8%A7%DB%8C%D9%87-%D8%AF%D9%88%D8%A7%D8%B2%D8%AF%D9%87%D9%85",
  socialIdentityBook: "https://dl.daneshchi.ir/file/chap-school/Hovyat-12_Daneshchi.iR.pdf",
  englishFinalExamQuestionAndKey: "https://azdars.com/%D8%B3%D8%A4%D8%A7%D9%84%D8%A7%D8%AA-%D9%88-%D9%BE%D8%A7%D8%B3%D8%AE%D9%86%D8%A7%D9%85%D9%87-%D8%A7%D9%85%D8%AA%D8%AD%D8%A7%D9%86-%D9%86%D9%87%D8%A7%DB%8C%DB%8C-%D8%AF%D8%B1%D8%B3-%D8%B2%D8%A8%D8%A7/",
} as const;

export const grade12English3Chapters = [
  "حس قدردانی (Sense of Appreciation)",
  "در فرهنگ لغت جست‌وجو کن (Look it Up)",
  "انرژی تجدیدپذیر (Renewable Energy)",
] as const;

export const grade12HumanitiesArabicChapters = [
  "من الأشعار المنسوبة إلى الإمام علي",
  "الوجه النافع والوجه المضر",
  "ثلاث قصص قصيرة",
  "نظام الطبيعة",
  "يا إلهي",
] as const;

export const grade12MathScienceArabicChapters = [
  "الدين والتدين",
  "مكة المكرمة والمدينة المنورة",
  "الكتب طعام الفكر",
  "الفرزدق",
] as const;

export const grade12SocialIdentityChapters = [
  "کنش‌های ما",
  "پدیده‌های اجتماعی",
  "جهان اجتماعی",
  "ارزیابی فرهنگ‌ها",
  "هویت",
  "بازتولید هویت اجتماعی",
  "تحولات هویتی جامعه",
  "بعد فرهنگی هویت ایران",
  "بعد سیاسی هویت ایران",
  "ابعاد جمعیتی و اقتصادی هویت ایران",
] as const;

export const grade12FinalExamSubjectsByTrack = {
  "انسانی": [
    "دین و زندگی",
    "ریاضی و آمار",
    "فارسی",
    "جغرافیا",
    "عربی",
    "جامعه‌شناسی",
    "علوم و فنون ادبی",
    "زبان انگلیسی",
    "تاریخ",
    "سلامت و بهداشت",
    "فلسفه",
  ],
  "ریاضی": [
    "دین و زندگی",
    "هندسه",
    "فارسی",
    "حسابان",
    "عربی",
    "هویت اجتماعی",
    "شیمی",
    "زبان انگلیسی",
    "فیزیک",
    "سلامت و بهداشت",
    "ریاضیات گسسته",
  ],
  "تجربی": [
    "دین و زندگی",
    "زیست‌شناسی",
    "فارسی",
    "ریاضی",
    "عربی",
    "هویت اجتماعی",
    "شیمی",
    "زبان انگلیسی",
    "فیزیک",
    "سلامت و بهداشت",
  ],
} as const;

export const grade12EntranceExamSubjectsByTrack = {
  "انسانی": [
    "ریاضی و آمار",
    "علوم و فنون ادبی",
    "عربی",
    "تاریخ",
    "جغرافیا",
    "جامعه‌شناسی",
    "فلسفه",
  ],
  "ریاضی": ["هندسه", "حسابان", "ریاضیات گسسته", "فیزیک", "شیمی"],
  "تجربی": ["ریاضی", "زیست‌شناسی", "فیزیک", "شیمی"],
} as const;

const commonGrade12FinalExamSubjects = [
  "فارسی",
  "دین و زندگی",
  "زبان انگلیسی",
  "سلامت و بهداشت",
] as const;

const sharedMathScienceGrade12Subjects = [
  ...commonGrade12FinalExamSubjects,
  "عربی",
  "هویت اجتماعی",
  "شیمی",
] as const;

const assessmentSubjectsByTrack = {
  "انسانی": new Set<string>([
    ...grade12FinalExamSubjectsByTrack["انسانی"],
    ...grade12EntranceExamSubjectsByTrack["انسانی"],
  ]),
  "ریاضی": new Set<string>([
    ...grade12FinalExamSubjectsByTrack["ریاضی"],
    ...grade12EntranceExamSubjectsByTrack["ریاضی"],
  ]),
  "تجربی": new Set<string>([
    ...grade12FinalExamSubjectsByTrack["تجربی"],
    ...grade12EntranceExamSubjectsByTrack["تجربی"],
  ]),
};

const grade12SubjectAliases: Record<string, string> = {
  "فارسی ۳": "فارسی",
  "فارسی (۳)": "فارسی",
  "دین و زندگی ۳": "دین و زندگی",
  "تعلیمات دینی ۳": "دین و زندگی",
  "زبان خارجی ۳": "زبان انگلیسی",
  "زبان انگلیسی ۳": "زبان انگلیسی",
  "انگلیسی ۳": "زبان انگلیسی",
  "عربی، زبان قرآن ۳": "عربی",
  "عربی زبان قرآن ۳": "عربی",
  "عربی ۳ (زبان تخصصی)": "عربی",
  "عربی ۳ (زبان تخصصی رشته)": "عربی",
  "هندسه ۳": "هندسه",
  "حسابان ۲": "حسابان",
  "ریاضیات گسسته ۳": "ریاضیات گسسته",
  "فیزیک ۳": "فیزیک",
  "شیمی ۳": "شیمی",
  "زیست‌شناسی ۳": "زیست‌شناسی",
  "زیست شناسی ۳": "زیست‌شناسی",
  "ریاضی ۳": "ریاضی",
  "ریاضی و آمار ۳": "ریاضی و آمار",
  "علوم و فنون ادبی ۳": "علوم و فنون ادبی",
  "تاریخ ۳": "تاریخ",
  "جغرافیا ۳": "جغرافیا",
  "جامعه‌شناسی ۳": "جامعه‌شناسی",
  "جامعه شناسی ۳": "جامعه‌شناسی",
  "فلسفه ۲": "فلسفه",
};

export function canonicalizeGrade12AssessmentSubject(subject: string): string {
  return grade12SubjectAliases[subject.trim()] ?? subject.trim();
}

export function canonicalizeGrade12AssessmentQuestion<
  T extends { grade: string; subject: string },
>(question: T): T {
  if (question.grade !== "دوازدهم") return question;
  const subject = canonicalizeGrade12AssessmentSubject(question.subject);
  return subject === question.subject ? question : { ...question, subject };
}

export function isGrade12AssessmentSubjectEligible(
  track: string,
  subject: string,
): boolean {
  const canonicalSubject = canonicalizeGrade12AssessmentSubject(subject);

  if (track === "عمومی") {
    return commonGrade12FinalExamSubjects.includes(
      canonicalSubject as (typeof commonGrade12FinalExamSubjects)[number],
    );
  }

  if (track === "ریاضی و تجربی") {
    return sharedMathScienceGrade12Subjects.includes(
      canonicalSubject as (typeof sharedMathScienceGrade12Subjects)[number],
    );
  }

  return (
    assessmentSubjectsByTrack[track as keyof typeof assessmentSubjectsByTrack]?.has(
      canonicalSubject,
    ) ?? false
  );
}

export function isGrade12AssessmentQuestionEligible<
  T extends { grade: string; track: string; subject: string },
>(question: T): boolean {
  if (question.grade !== "دوازدهم") return true;
  return isGrade12AssessmentSubjectEligible(question.track, question.subject);
}
