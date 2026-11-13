import { describe, expect, it } from "vitest";
import { verifiedQuestions } from "./verifiedQuestionBank";
import { verifiedGrade11DiniSharedLesson7 } from "./verifiedGrade11DiniSharedLesson7";
import { verifiedGrade11DiniSharedLesson8 } from "./verifiedGrade11DiniSharedLesson8";
import { verifiedGrade11DiniSharedLesson9 } from "./verifiedGrade11DiniSharedLesson9";
import { verifiedGrade11DiniSharedLesson10 } from "./verifiedGrade11DiniSharedLesson10";

describe("Grade 11 shared Dini lessons 7–10", () => {
  const batches = [
    ["وضعیت فرهنگی، اجتماعی و سیاسی مسلمانان، پس از رحلت رسول خدا", verifiedGrade11DiniSharedLesson7],
    ["احیای ارزش‌های راستین", verifiedGrade11DiniSharedLesson8],
    ["عصر غیبت", verifiedGrade11DiniSharedLesson9],
    ["مرجعیت و ولایت فقیه", verifiedGrade11DiniSharedLesson10],
  ] as const;

  it("adds exactly five reviewed authored questions to each shared lesson", () => {
    for (const [chapter, batch] of batches) {
      expect(batch, chapter).toHaveLength(5);
      expect(batch.every((q) =>
        q.grade === "یازدهم" &&
        q.track === "عمومی" &&
        q.subject === "دین و زندگی" &&
        q.chapter === chapter &&
        q.sourceStatus === "reviewed" &&
        q.sourceTitle?.includes("سؤال تألیفی تحصیل‌یار") &&
        q.reviewerNote?.includes("AUTHORED/ORIGINAL") &&
        q.reviewerNote?.includes("صفحات مرجع") &&
        q.options.length === 4 &&
        q.correctIndex >= 0 &&
        q.correctIndex < 4 &&
        q.explanation.length > 20
      )).toBe(true);
      expect(verifiedQuestions.filter((q) =>
        q.grade === "یازدهم" && q.track === "عمومی" &&
        q.subject === "دین و زندگی" && q.chapter === chapter
      )).toHaveLength(5);
    }
  });

  it("uses unique question IDs across all 20 new questions", () => {
    const ids = batches.flatMap(([, batch]) => batch.map((q) => q.id));
    expect(ids).toHaveLength(20);
    expect(new Set(ids).size).toBe(20);
  });
});
