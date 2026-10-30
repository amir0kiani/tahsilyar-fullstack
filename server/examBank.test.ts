import { describe, expect, it } from "vitest";
import { examQuestions } from "./examBank";
import { curriculumCatalog } from "./curriculumCatalog";
import { verifiedQuestions } from "./verifiedQuestionBank";

const allQuestions = [...examQuestions, ...verifiedQuestions];

describe("curriculum and assessment question bank", () => {
  it("has unique IDs and valid four-choice answer keys across all bundled questions", () => {
    expect(new Set(allQuestions.map((question) => question.id)).size).toBe(allQuestions.length);
    for (const question of allQuestions) {
      expect(question.options).toHaveLength(4);
      expect(question.correctIndex).toBeGreaterThanOrEqual(0);
      expect(question.correctIndex).toBeLessThan(4);
      expect(question.explanation.length).toBeGreaterThan(5);
      expect(question.prompt.length).toBeGreaterThan(8);
    }
  });

  it("keeps the original sample-authored bank clearly separate", () => {
    expect(examQuestions.length).toBeGreaterThanOrEqual(50);
    expect(examQuestions.every((question) => question.sourceStatus === "sample-authored")).toBe(true);
  });

  it("records traceable provenance for every question adapted from a published official exam", () => {
    expect(verifiedQuestions.length).toBeGreaterThanOrEqual(18);
    for (const question of verifiedQuestions) {
      expect(question.sourceStatus).toBe("official-exam-adapted");
      expect(question.sourceTitle).toBeTruthy();
      expect(question.sourceUrl).toMatch(/^https:\/\//);
      expect(question.sourceYear).toBeTruthy();
      expect(question.verifiedAt).toBeInstanceOf(Date);
      expect(question.reviewerNote).toBeTruthy();
    }
  });

  it("does not label rewritten practice items as verbatim official exam questions", () => {
    expect(verifiedQuestions.every((question) => question.sourceStatus !== "official-exam")).toBe(true);
    expect(verifiedQuestions.every((question) => question.sourceStatus === "official-exam-adapted")).toBe(true);
  });

  it("lists grade-specific books for all three main tracks", () => {
    for (const grade of ["دهم", "یازدهم", "دوازدهم"]) {
      expect(curriculumCatalog.some((book) => book.grade === grade && book.track === "تجربی")).toBe(true);
      expect(curriculumCatalog.some((book) => book.grade === grade && book.track === "ریاضی")).toBe(true);
      expect(curriculumCatalog.some((book) => book.grade === grade && book.track === "انسانی")).toBe(true);
    }
    expect(curriculumCatalog.every((book) => book.chapters.length > 0)).toBe(true);
  });

  it("keeps every curriculum catalogue entry grade- and track-specific", () => {
    expect(curriculumCatalog.every((book) => ["دهم", "یازدهم", "دوازدهم"].includes(book.grade))).toBe(true);
    expect(curriculumCatalog.every((book) => ["عمومی", "تجربی", "ریاضی", "انسانی"].includes(book.track))).toBe(true);
  });
});
