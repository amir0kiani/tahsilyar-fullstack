import { describe, expect, it } from "vitest";
import { FREE_DAILY_LIMITS, FREE_MONTHLY_CLAIM_LIMIT, getTehranJalaliDate } from "./monetization";

describe("free daily credit policy", () => {
  it("uses Tehran local Jalali date rather than UTC date", () => {
    const result = getTehranJalaliDate(new Date("2026-11-28T21:00:00.000Z"));
    expect(result.date).toBe("1405-09-08");
    expect(result.periodKey).toBe("1405-09");
  });

  it("switches Jalali month at Tehran midnight", () => {
    const before = getTehranJalaliDate(new Date("2026-11-21T20:29:59.000Z"));
    const after = getTehranJalaliDate(new Date("2026-11-21T20:30:00.000Z"));
    expect(before.periodKey).not.toBe(after.periodKey);
    expect(after.date).toBe("1405-09-01");
  });

  it("keeps the approved daily operation limits and seven monthly claims", () => {
    expect(FREE_MONTHLY_CLAIM_LIMIT).toBe(7);
    expect(FREE_DAILY_LIMITS).toEqual({
      chat_message: 20,
      plan_generate: 2,
      plan_update: 2,
      progress_analysis: 1,
    });
  });
});
