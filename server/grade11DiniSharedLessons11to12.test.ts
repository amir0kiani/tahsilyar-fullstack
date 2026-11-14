import { describe, expect, it } from "vitest";
import { verifiedQuestions } from "./verifiedQuestionBank";
import { verifiedGrade11DiniSharedLesson11 } from "./verifiedGrade11DiniSharedLesson11";
import { verifiedGrade11DiniSharedLesson12 } from "./verifiedGrade11DiniSharedLesson12";

describe("Grade 11 shared Dini lessons 11–12", () => {
  const batches = [
    ["عزت نفس", verifiedGrade11DiniSharedLesson11],
    ["پیوند مقدس", verifiedGrade11DiniSharedLesson12],
  ] as const;

  it("adds exactly five reviewed authored questions to each shared lesson", () => {
    for (const [chapter, batch] of batches) {
      expect(batch, chapter).toHaveLength(5);
      expect(batch.every((q) =>
        q.grade === "یازدهم" && q.track === "عمومی" &&
        q.subject === "دین و زندگی" && q.chapter === chapter &&
        q.sourceStatus === "reviewed" &&
        q.sourceTitle?.includes("سؤال تألیفی تحصیل‌یار") &&
        q.reviewerNote?.includes("AUTHORED/ORIGINAL") &&
        q.reviewerNote?.includes("صفحات مرجع") &&
        q.options.length === 4 && q.correctIndex >= 0 &&
        q.correctIndex < 4 && q.explanation.length > 20
      )).toBe(true);
      expect(verifiedQuestions.filter((q) =>
        q.grade === "یازدهم" && q.track === "عمومی" &&
        q.subject === "دین و زندگی" && q.chapter === chapter
      )).toHaveLength(5);
    }
  });

  it("uses unique question IDs across both lessons", () => {
    const ids = batches.flatMap(([, batch]) => batch.map((q) => q.id));
    expect(ids).toHaveLength(10);
    expect(new Set(ids).size).toBe(10);
  });
});
