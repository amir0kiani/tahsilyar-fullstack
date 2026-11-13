import { describe, expect, it } from "vitest";
import { verifiedQuestions } from "./verifiedQuestionBank";
import { verifiedGrade11DiniSharedLesson3 } from "./verifiedGrade11DiniSharedLesson3";
import { verifiedGrade11DiniSharedLesson4 } from "./verifiedGrade11DiniSharedLesson4";
import { verifiedGrade11DiniSharedLesson5 } from "./verifiedGrade11DiniSharedLesson5";
import { verifiedGrade11DiniSharedLesson6 } from "./verifiedGrade11DiniSharedLesson6";

describe("Grade 11 shared Dini lessons 3–6", () => {
  const batches = [
    ["معجزه جاویدان", verifiedGrade11DiniSharedLesson3],
    ["مسئولیت‌های پیامبر (ص)", verifiedGrade11DiniSharedLesson4],
    ["امامت، تداوم رسالت", verifiedGrade11DiniSharedLesson5],
    ["پیشوای اسوه", verifiedGrade11DiniSharedLesson6],
  ] as const;

  it("adds exactly five reviewed original questions per shared lesson", () => {
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
        q.reviewerNote?.includes("صفحه‌های") &&
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

  it("uses unique question IDs across the four batches", () => {
    const ids = batches.flatMap(([, batch]) => batch.map((q) => q.id));
    expect(new Set(ids).size).toBe(20);
  });
});
