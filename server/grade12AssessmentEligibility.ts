/**
 * Grade 12 assessment eligibility for the 1406 national entrance-exam cycle.
 *
 * This is an assessment allowlist, not a complete curriculum list. A Grade 12
 * subject is eligible only when it appears in the official Grade 12 final-exam
 * subjects for that track or in the official 1406 entrance-exam textbook sources.
 *
 * Official Sanjesh references:
 * - 1406 subject titles and coefficients:
 *   https://www.sanjesh.org/_sanjesh/documents/1406/shora/anavin1406.pdf
 * - 1406 policy amendments:
 *   https://www.sanjesh.org/_sanjesh/documents/1406/shora/eslahat1406.pdf
 * - 1406 entrance-exam textbook sources:
 *   https://www.sanjesh.org/_sanjesh/documents/فهرست%20دروس%20آزمون%20سراسری%20سال%2014061406.pdf
 *
 * Track-specific editions are kept separate: Humanities Arabic is not the
 * same Grade 12 book as Math/Experimental Arabic; Hoviat Ejtemaei is shared
 * by Math/Experimental and is not the Humanities Sociology 3 textbook.
 */

export const grade12AssessmentYear = "۱۴۰۶";

export const grade12FinalExamSubjectsByTrack = {
  "انسانی": [
    "فارسی",
    "دین و زندگی",
    "زبان انگلیسی",
    "سلامت و بهداشت",
    "ریاضی و آمار",
    "علوم و فنون ادبی",
    "عربی",
    "تاریخ",
    "جغرافیا",
    "جامعه‌شناسی",
    "فلسفه",
  ],
  "ریاضی": [
    "فارسی",
    "دین و زندگی",
    "زبان انگلیسی",
    "سلامت و بهداشت",
    "عربی",
    "هویت اجتماعی",
    "حسابان",
    "هندسه",
    "ریاضیات گسسته",
    "فیزیک",
    "شیمی",
  ],
  "تجربی": [
    "فارسی",
    "دین و زندگی",
    "زبان انگلیسی",
    "سلامت و بهداشت",
    "عربی",
    "هویت اجتماعی",
    "ریاضی",
    "زیست‌شناسی",
    "فیزیک",
    "شیمی",
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
  "ریاضی": [
    "حسابان",
    "هندسه",
    "ریاضیات گسسته",
    "فیزیک",
    "شیمی",
  ],
  "تجربی": [
    "ریاضی",
    "زیست‌شناسی",
    "فیزیک",
    "شیمی",
  ],
} as const;

const commonFinalExamSubjects = [
  "فارسی",
  "دین و زندگی",
  "زبان انگلیسی",
  "سلامت و بهداشت",
] as const;

// Only books with the same Grade 12 edition in both tracks are shared.
// Physics and Mathematics are intentionally not shared because their textbook
// editions and chapter maps differ between Math and Experimental.
const sharedMathScienceSubjects = [
  "عربی",
  "هویت اجتماعی",
  "شیمی",
] as const;

const subjectsForTrack = {
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
  "فارسی (۳)": "فارسی",
  "فارسی ۳": "فارسی",
  "تعلیمات دینی ۳": "دین و زندگی",
  "تعلیمات دینی ۳ (دینی، اخلاق و قرآن)": "دین و زندگی",
  "دین و زندگی ۳": "دین و زندگی",
  "زبان خارجی (۳)": "زبان انگلیسی",
  "زبان خارجی ۳": "زبان انگلیسی",
  "انگلیسی ۳": "زبان انگلیسی",
  "عربی، زبان قرآن": "عربی",
  "عربی زبان قرآن": "عربی",
  "عربی، زبان قرآن (۳)": "عربی",
  "عربی، زبان قرآن ۳": "عربی",
  "عربی زبان قرآن ۳": "عربی",
  "عربی ۳": "عربی",
  "عربی ۳ تخصصی": "عربی",
  "عربی ۳ (زبان تخصصی رشته)": "عربی",
  "علوم اجتماعی": "هویت اجتماعی",
  "ریاضی و آمار (۳)": "ریاضی و آمار",
  "ریاضی و آمار ۳": "ریاضی و آمار",
  "علوم و فنون ادبی (۳)": "علوم و فنون ادبی",
  "علوم و فنون ادبی ۳": "علوم و فنون ادبی",
  "تاریخ (۳)": "تاریخ",
  "تاریخ ۳": "تاریخ",
  "جغرافیا (۳)": "جغرافیا",
  "جغرافیا ۳": "جغرافیا",
  "جامعه شناسی (۳)": "جامعه‌شناسی",
  "جامعه‌شناسی (۳)": "جامعه‌شناسی",
  "جامعه شناسی ۳": "جامعه‌شناسی",
  "جامعه‌شناسی ۳": "جامعه‌شناسی",
  "فلسفه (۲)": "فلسفه",
  "فلسفه ۲": "فلسفه",
  "حسابان (۲)": "حسابان",
  "حسابان ۲": "حسابان",
  "هندسه (۳)": "هندسه",
  "هندسه ۳": "هندسه",
  "فیزیک (۳)": "فیزیک",
  "فیزیک ۳": "فیزیک",
  "شیمی (۳)": "شیمی",
  "شیمی ۳": "شیمی",
  "ریاضی (۳)": "ریاضی",
  "ریاضی ۳": "ریاضی",
  "زیست شناسی ۳": "زیست‌شناسی",
  "زیست‌شناسی ۳": "زیست‌شناسی",
  "زیست‌شناسی (۳)": "زیست‌شناسی",
};

export function canonicalizeGrade12AssessmentSubject(subject: string): string {
  const normalized = subject.trim().replace(/\s+/g, " ").replace(/ي/g, "ی").replace(/ك/g, "ک");
  return grade12SubjectAliases[normalized] ?? normalized;
}

export function canonicalizeGrade12AssessmentQuestion<T extends {
  grade: string;
  subject: string;
}>(question: T): T {
  if (question.grade !== "دوازدهم") return question;
  const subject = canonicalizeGrade12AssessmentSubject(question.subject);
  return subject === question.subject ? question : { ...question, subject };
}

export function isGrade12AssessmentSubjectEligible(track: string, subject: string): boolean {
  const canonicalSubject = canonicalizeGrade12AssessmentSubject(subject);

  if (track === "عمومی") {
    return (commonFinalExamSubjects as readonly string[]).includes(canonicalSubject);
  }

  if (track === "ریاضی و تجربی") {
    return (sharedMathScienceSubjects as readonly string[]).includes(canonicalSubject);
  }

  return subjectsForTrack[track as keyof typeof subjectsForTrack]?.has(canonicalSubject) ?? false;
}

export function isGrade12AssessmentQuestionEligible(question: {
  grade: string;
  track: string;
  subject: string;
}): boolean {
  if (question.grade !== "دوازدهم") return true;
  return isGrade12AssessmentSubjectEligible(question.track, question.subject);
}
