import { describe, expect, it } from "vitest";
import {
  canonicalizeGrade12AssessmentSubject,
  grade12AssessmentYear,
  grade12EntranceExamSubjectsByTrack,
  grade12FinalExamSubjectsByTrack,
  isGrade12AssessmentQuestionEligible,
  isGrade12AssessmentSubjectEligible,
} from "./grade12AssessmentEligibility";

describe("Grade 12 assessment eligibility", () => {
  it("uses the 1406 cycle and includes Humanities final-exam and entrance-exam subjects", () => {
    expect(grade12AssessmentYear).toBe("۱۴۰۶");
    const eligible = new Set([
      ...grade12FinalExamSubjectsByTrack["انسانی"],
      ...grade12EntranceExamSubjectsByTrack["انسانی"],
    ]);
    for (const subject of eligible) {
      expect(isGrade12AssessmentSubjectEligible("انسانی", subject)).toBe(true);
    }
  });

  it("rejects Humanities Grade 12 subjects outside the final-exam and entrance-exam scope", () => {
    for (const subject of [
      "تحلیل فرهنگی",
      "نگارش",
      "مدیریت خانواده و سبک زندگی",
      "اقتصاد",
      "روان‌شناسی",
    ]) {
      expect(isGrade12AssessmentSubjectEligible("انسانی", subject)).toBe(false);
    }
  });

  it("keeps common and track-specific Grade 12 textbook editions separate", () => {
    expect(isGrade12AssessmentSubjectEligible("عمومی", "فارسی")).toBe(true);
    expect(isGrade12AssessmentSubjectEligible("عمومی", "دین و زندگی")).toBe(true);
    expect(isGrade12AssessmentSubjectEligible("عمومی", "عربی")).toBe(false);
    expect(isGrade12AssessmentSubjectEligible("انسانی", "عربی")).toBe(true);
    expect(isGrade12AssessmentSubjectEligible("ریاضی و تجربی", "عربی")).toBe(true);
    expect(isGrade12AssessmentSubjectEligible("عمومی", "هویت اجتماعی")).toBe(false);
    expect(isGrade12AssessmentSubjectEligible("ریاضی و تجربی", "هویت اجتماعی")).toBe(true);
    expect(isGrade12AssessmentSubjectEligible("انسانی", "هویت اجتماعی")).toBe(false);
  });

  it("canonicalizes common official book-title variants before eligibility checks", () => {
    expect(canonicalizeGrade12AssessmentSubject("عربی، زبان قرآن (۳)")).toBe("عربی");
    expect(canonicalizeGrade12AssessmentSubject("جامعه شناسی ۳")).toBe("جامعه‌شناسی");
    expect(canonicalizeGrade12AssessmentSubject("علوم اجتماعی")).toBe("هویت اجتماعی");
    expect(isGrade12AssessmentSubjectEligible("تجربی", "علوم اجتماعی")).toBe(true);
  });

  it("does not change eligibility decisions for questions from other grades", () => {
    expect(isGrade12AssessmentQuestionEligible({
      grade: "یازدهم",
      track: "انسانی",
      subject: "تحلیل فرهنگی",
    })).toBe(true);
  });
});
