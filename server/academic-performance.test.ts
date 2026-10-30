import { describe, expect, it } from "vitest";
import { buildPerformanceContext, summarizeSubjectPerformance } from "./academic-performance";

const item = (correctAnswers: number, totalQuestions: number, day: number) => ({
  subject: "زیست‌شناسی",
  correctAnswers,
  totalQuestions,
  assessedAt: new Date(`2026-10-${String(day).padStart(2, "0")}T09:00:00.000Z`),
});

describe("academic performance summaries", () => {
  it("does not invent a trend when there is no recorded assessment", () => {
    expect(buildPerformanceContext([])).toContain("هیچ ارزیابی یا نمره‌ای ثبت نشده");
  });

  it("treats one assessment as an early signal rather than stable mastery", () => {
    const summary = summarizeSubjectPerformance([item(7, 10, 10)]);
    expect(summary[0].averagePercent).toBe(70);
    expect(summary[0].trendDelta).toBeNull();
    expect(buildPerformanceContext([item(7, 10, 10)])).toContain("فقط یک نشانهٔ اولیه");
  });

  it("calculates a downward trend only from at least three assessments", () => {
    const summary = summarizeSubjectPerformance([item(18, 20, 10), item(14, 20, 15), item(10, 20, 20)]);
    expect(summary[0].averagePercent).toBe(70);
    expect(summary[0].trendDelta).toBe(-40);
    expect(buildPerformanceContext([item(18, 20, 10), item(14, 20, 15), item(10, 20, 20)])).toContain("روند نزولی 40 واحد درصد");
  });

  it("ignores invalid or impossible records", () => {
    const summary = summarizeSubjectPerformance([
      item(7, 10, 10),
      { subject: "ریاضی", correctAnswers: 12, totalQuestions: 10, assessedAt: new Date("2026-10-11T09:00:00Z") },
    ]);
    expect(summary).toHaveLength(1);
    expect(summary[0].subject).toBe("زیست‌شناسی");
  });
});
