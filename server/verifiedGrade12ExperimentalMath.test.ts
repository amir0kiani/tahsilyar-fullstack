import { describe, expect, it } from "vitest";
import { curriculumCatalog } from "./curriculumCatalog";
import { isGrade12AssessmentQuestionEligible } from "./grade12AssessmentEligibility";
import { verifiedQuestions } from "./verifiedQuestionBank";
import { verifiedGrade12ExperimentalMath } from "./verifiedGrade12ExperimentalMath";

const chapters = [
  "تابع",
  "مثلثات",
  "حد بی‌نهایت و حد در بی‌نهایت",
  "مشتق",
  "کاربرد مشتق",
  "هندسه",
  "احتمال"
];

describe("Grade 12 Experimental Mathematics 3 verified question bank", () => {
  it("matches the eligible textbook map and reaches five questions in each of seven chapters", () => {
    const book = curriculumCatalog.find(
      (item) =>
        item.grade === "دوازدهم" &&
        item.track === "تجربی" &&
        item.subject === "ریاضی" &&
        item.bookCode === "112211"
    );

    expect(book).toBeDefined();
    expect(book?.chapters).toEqual(chapters);
    expect(verifiedGrade12ExperimentalMath).toHaveLength(35);

    for (const chapter of chapters) {
      const matching = verifiedGrade12ExperimentalMath.filter(
        (question) => question.chapter === chapter
      );
      expect(matching).toHaveLength(5);
      for (const question of matching) {
        expect(question.grade).toBe("دوازدهم");
        expect(question.track).toBe("تجربی");
        expect(question.subject).toBe("ریاضی");
        expect(question.sourceStatus).toBe("curriculum-verified");
        expect(question.sourceUrl).toContain("Rizai-Tajrobi-12");
        expect(question.options).toHaveLength(4);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(4);
        expect(question.explanation.trim().length).toBeGreaterThan(0);
        expect(isGrade12AssessmentQuestionEligible(question)).toBe(true);
      }
    }
  });

  it("registers the 35 questions exactly once in the consolidated bank", () => {
    const matching = verifiedQuestions.filter(
      (question) =>
        question.grade === "دوازدهم" &&
        question.track === "تجربی" &&
        question.subject === "ریاضی"
    );
    const ids = matching.map((question) => question.id);
    expect(matching).toHaveLength(35);
    expect(new Set(ids).size).toBe(35);
  });
});
