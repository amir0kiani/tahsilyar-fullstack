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
    expect(verifiedQuestions.length).toBeGreaterThanOrEqual(29);
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


  it("has the first humanities book batch mapped to its official grade-12 book chapters", () => {
    const humanitiesMath3 = verifiedQuestions.filter((question) =>
      question.track === "انسانی" && question.grade === "دوازدهم" && question.subject === "ریاضی و آمار"
    );
    expect(humanitiesMath3).toHaveLength(5);
    expect(new Set(humanitiesMath3.map((question) => question.chapter))).toEqual(
      new Set(["آمار و احتمال", "الگوهای خطی", "الگوهای غیرخطی"])
    );
    expect(curriculumCatalog.find((book) =>
      book.track === "انسانی" && book.grade === "دوازدهم" && book.subject === "ریاضی و آمار"
    )?.bookCode).toBe("112212");
  });

  it("keeps biology source references mapped to each biology textbook grade", () => {
    expect(verifiedQuestions.some((question) => question.subject === "زیست‌شناسی" && question.grade === "دهم")).toBe(true);
    expect(verifiedQuestions.some((question) => question.subject === "زیست‌شناسی" && question.grade === "یازدهم")).toBe(true);
    expect(verifiedQuestions.some((question) => question.subject === "زیست‌شناسی" && question.grade === "دوازدهم")).toBe(true);
  });

  it("uses the five-question target for every grade-specific book", () => {
    expect(curriculumCatalog.every((book) => book.targetQuestionCount === 5)).toBe(true);
  });

  it("keeps every curriculum catalogue entry grade- and track-specific", () => {
    expect(curriculumCatalog.every((book) => ["دهم", "یازدهم", "دوازدهم"].includes(book.grade))).toBe(true);
    expect(curriculumCatalog.every((book) => ["عمومی", "تجربی", "ریاضی", "انسانی"].includes(book.track))).toBe(true);
  });
  it("reaches the five-question target for each grade-specific biology textbook", () => {
    for (const grade of ["دهم", "یازدهم", "دوازدهم"]) {
      const questions = verifiedQuestions.filter((question) =>
        question.track === "تجربی" && question.grade === grade && question.subject === "زیست‌شناسی"
      );
      expect(questions).toHaveLength(5);
      expect(questions.every((question) => question.sourceStatus === "official-exam-adapted")).toBe(true);
    }
  });

  it("links the new biology batch to the official Sanjesh exam publication", () => {
    const biologyBatch = verifiedQuestions.filter((question) => question.id.startsWith("verified-bio"));
    expect(biologyBatch.length).toBeGreaterThanOrEqual(15);
    expect(biologyBatch.filter((question) => question.sourceUrl?.includes("sanjesh.org")).length).toBeGreaterThanOrEqual(10);
  });

});
