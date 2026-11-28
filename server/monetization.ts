import { and, eq, gt, sql } from "drizzle-orm";
import {
  aiUsageDaily,
  aiUsageMonthly,
  freeDailyClaims,
  freeDailyCycles,
  planEntitlements,
  userSubscriptions,
} from "../drizzle/schema";
import { getDb } from "./db";

export const FREE_MONTHLY_CLAIM_LIMIT = 7;
export const FREE_DAILY_LIMITS = {
  chat_message: 20,
  plan_generate: 2,
  plan_update: 2,
  progress_analysis: 1,
} as const;

/**
 * Initial Plus limits. These are intentionally explicit and finite; the
 * database entitlements seeded by migration 0002 are the runtime source.
 */
export const PLUS_MONTHLY_LIMITS = {
  chat_message: 600,
  plan_generate: 30,
  plan_update: 60,
  progress_analysis: 30,
} as const;

export type FreeFeatureKey = keyof typeof FREE_DAILY_LIMITS;
export type FeatureKey = FreeFeatureKey;

export function getTehranJalaliDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    date: `${values.year}-${values.month}-${values.day}`,
    periodKey: `${values.year}-${values.month}`,
  };
}

export async function claimFreeDailyCredits(userId: number, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const { date, periodKey } = getTehranJalaliDate(now);

  return db.transaction(async (tx) => {
    await tx.insert(freeDailyCycles).values({ userId, periodKey, claimedDays: 0, status: "active" })
      .onDuplicateKeyUpdate({ set: { userId } });
    const [cycle] = await tx.select().from(freeDailyCycles)
      .where(and(eq(freeDailyCycles.userId, userId), eq(freeDailyCycles.periodKey, periodKey)))
      .limit(1).for("update");
    if (!cycle || cycle.status !== "active") {
      return { claimed: false, reason: "upgraded" as const, claimedDays: cycle?.claimedDays ?? 0, remainingClaims: 0, date, periodKey };
    }
    const [existing] = await tx.select().from(freeDailyClaims)
      .where(and(eq(freeDailyClaims.userId, userId), eq(freeDailyClaims.claimDate, date))).limit(1);
    if (existing) {
      return { claimed: false, reason: "already_claimed" as const, claimedDays: cycle.claimedDays, remainingClaims: Math.max(0, FREE_MONTHLY_CLAIM_LIMIT - cycle.claimedDays), date, periodKey };
    }
    if (cycle.claimedDays >= FREE_MONTHLY_CLAIM_LIMIT) {
      return { claimed: false, reason: "monthly_limit" as const, claimedDays: cycle.claimedDays, remainingClaims: 0, date, periodKey };
    }
    await tx.insert(freeDailyClaims).values({ userId, periodKey, claimDate: date });
    await tx.update(freeDailyCycles).set({ claimedDays: cycle.claimedDays + 1 }).where(eq(freeDailyCycles.id, cycle.id));
    return { claimed: true, reason: "claimed" as const, claimedDays: cycle.claimedDays + 1, remainingClaims: FREE_MONTHLY_CLAIM_LIMIT - cycle.claimedDays - 1, date, periodKey };
  });
}

export async function consumeFreeDailyQuota(userId: number, featureKey: FeatureKey, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const claim = await claimFreeDailyCredits(userId, now);
  if (claim.reason === "upgraded") return { allowed: false, reason: "upgraded" as const, remaining: 0 };
  if (claim.reason === "monthly_limit") return { allowed: false, reason: "monthly_limit" as const, remaining: 0 };
  const limit = FREE_DAILY_LIMITS[featureKey];
  const { date, periodKey } = getTehranJalaliDate(now);

  return db.transaction(async (tx) => {
    const [cycle] = await tx.select().from(freeDailyCycles)
      .where(and(eq(freeDailyCycles.userId, userId), eq(freeDailyCycles.periodKey, periodKey)))
      .limit(1).for("update");
    if (!cycle || cycle.status !== "active" || cycle.claimedDays < 1) {
      return { allowed: false, reason: cycle?.status === "upgraded" ? "upgraded" as const : "no_credit_today" as const, remaining: 0 };
    }
    const [todayClaim] = await tx.select().from(freeDailyClaims)
      .where(and(eq(freeDailyClaims.userId, userId), eq(freeDailyClaims.claimDate, date))).limit(1);
    if (!todayClaim) return { allowed: false, reason: "no_credit_today" as const, remaining: 0 };
    const [row] = await tx.select().from(aiUsageDaily)
      .where(and(eq(aiUsageDaily.userId, userId), eq(aiUsageDaily.featureKey, featureKey), eq(aiUsageDaily.usageDate, date)))
      .limit(1).for("update");
    if (!row) {
      await tx.insert(aiUsageDaily).values({ userId, featureKey, usageDate: date, usedCount: 1 });
      return { allowed: true, reason: "ok" as const, remaining: limit - 1 };
    }
    if (row.usedCount >= limit) return { allowed: false, reason: "daily_limit" as const, remaining: 0 };
    await tx.update(aiUsageDaily).set({ usedCount: row.usedCount + 1 })
      .where(eq(aiUsageDaily.id, row.id));
    return { allowed: true, reason: "ok" as const, remaining: limit - row.usedCount - 1 };
  });
}

export async function getFreeDailyCreditStatus(userId: number, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const { date, periodKey } = getTehranJalaliDate(now);
  const [cycle] = await db.select().from(freeDailyCycles)
    .where(and(eq(freeDailyCycles.userId, userId), eq(freeDailyCycles.periodKey, periodKey))).limit(1);
  const [paid] = await db.select({ id: userSubscriptions.id, planId: userSubscriptions.planId }).from(userSubscriptions)
    .where(and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.status, "active"), gt(userSubscriptions.endsAt, now))).limit(1);
  const [claim] = await db.select().from(freeDailyClaims)
    .where(and(eq(freeDailyClaims.userId, userId), eq(freeDailyClaims.claimDate, date))).limit(1);
  const usage = await db.select().from(aiUsageDaily)
    .where(and(eq(aiUsageDaily.userId, userId), eq(aiUsageDaily.usageDate, date)));
  const used = Object.fromEntries(usage.map((item) => [item.featureKey, item.usedCount]));
  const active = cycle?.status !== "upgraded";
  const claimedDays = cycle?.claimedDays ?? 0;

  let plusQuotas: Record<string, { limit: number; used: number; remaining: number }> = {};
  if (paid) {
    const [entitlements, monthlyUsage] = await Promise.all([
      db.select().from(planEntitlements).where(and(eq(planEntitlements.planId, paid.planId), eq(planEntitlements.enabled, 1))),
      db.select().from(aiUsageMonthly).where(and(eq(aiUsageMonthly.userId, userId), eq(aiUsageMonthly.periodKey, periodKey))),
    ]);
    const monthlyUsed = Object.fromEntries(monthlyUsage.map((item) => [item.featureKey, item.usedCount]));
    plusQuotas = Object.fromEntries(entitlements.filter((item) => item.monthlyLimit !== null).map((item) => {
      const limit = item.monthlyLimit as number;
      const count = monthlyUsed[item.featureKey] ?? 0;
      return [item.featureKey, { limit, used: count, remaining: Math.max(0, limit - count) }];
    }));
  }

  return {
    date, periodKey, isPaid: Boolean(paid), claimedDays,
    remainingClaims: paid ? 0 : active ? Math.max(0, FREE_MONTHLY_CLAIM_LIMIT - claimedDays) : 0,
    claimedToday: Boolean(claim),
    canClaimToday: !paid && active && !claim && claimedDays < FREE_MONTHLY_CLAIM_LIMIT,
    status: cycle?.status ?? "not_started",
    quotas: Object.fromEntries(Object.entries(FREE_DAILY_LIMITS).map(([key, limit]) => [key, {
      limit, used: used[key] ?? 0, remaining: claim ? Math.max(0, limit - (used[key] ?? 0)) : 0,
    }])),
    plusQuotas,
  };
}

export async function markFreeCycleUpgraded(userId: number, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const { periodKey } = getTehranJalaliDate(now);
  await db.update(freeDailyCycles).set({ status: "upgraded", upgradedAt: now })
    .where(and(eq(freeDailyCycles.userId, userId), eq(freeDailyCycles.periodKey, periodKey), eq(freeDailyCycles.status, "active")));
}

/**
 * Atomically reserve one operation against the active plan's monthly
 * entitlement. Unknown/missing entitlements fail closed to avoid unmetered AI.
 */
export async function consumeQuotaForUser(userId: number, featureKey: FeatureKey, now = new Date()) {
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");
  const [paid] = await db.select({ id: userSubscriptions.id, planId: userSubscriptions.planId }).from(userSubscriptions)
    .where(and(eq(userSubscriptions.userId, userId), eq(userSubscriptions.status, "active"), gt(userSubscriptions.endsAt, now)))
    .orderBy(userSubscriptions.endsAt).limit(1);
  if (!paid) {
    const result = await consumeFreeDailyQuota(userId, featureKey, now);
    return { ...result, paid: false as const };
  }

  const [entitlement] = await db.select().from(planEntitlements)
    .where(and(
      eq(planEntitlements.planId, paid.planId),
      eq(planEntitlements.featureKey, featureKey),
      eq(planEntitlements.enabled, 1),
    )).limit(1);
  if (!entitlement || entitlement.monthlyLimit === null) {
    return { allowed: false, paid: true as const, reason: "entitlement_unavailable" as const, remaining: 0 };
  }

  const { periodKey } = getTehranJalaliDate(now);
  return db.transaction(async (tx) => {
    await tx.insert(aiUsageMonthly).values({ userId, featureKey, periodKey, usedCount: 0 })
      .onDuplicateKeyUpdate({ set: { userId } });
    const [row] = await tx.select().from(aiUsageMonthly)
      .where(and(
        eq(aiUsageMonthly.userId, userId),
        eq(aiUsageMonthly.featureKey, featureKey),
        eq(aiUsageMonthly.periodKey, periodKey),
      )).limit(1).for("update");
    const limit = entitlement.monthlyLimit as number;
    if (!row || row.usedCount >= limit) {
      return { allowed: false, paid: true as const, reason: "monthly_limit" as const, remaining: 0, limit, used: row?.usedCount ?? 0 };
    }
    const usedCount = row.usedCount + 1;
    await tx.update(aiUsageMonthly).set({ usedCount }).where(eq(aiUsageMonthly.id, row.id));
    return { allowed: true, paid: true as const, reason: "ok" as const, remaining: limit - usedCount, limit, used: usedCount };
  });
}

/** Return a reserved operation to the appropriate monthly or daily counter. */
export async function refundQuotaForUser(userId: number, featureKey: FeatureKey, paid: boolean, now = new Date()) {
  const db = await getDb();
  if (!db) return;
  if (paid) {
    const { periodKey } = getTehranJalaliDate(now);
    await db.update(aiUsageMonthly)
      .set({ usedCount: sql`${aiUsageMonthly.usedCount} - 1` })
      .where(and(
        eq(aiUsageMonthly.userId, userId),
        eq(aiUsageMonthly.featureKey, featureKey),
        eq(aiUsageMonthly.periodKey, periodKey),
        sql`${aiUsageMonthly.usedCount} > 0`,
      ));
    return;
  }
  const { date } = getTehranJalaliDate(now);
  await db.update(aiUsageDaily)
    .set({ usedCount: sql`${aiUsageDaily.usedCount} - 1` })
    .where(and(
      eq(aiUsageDaily.userId, userId),
      eq(aiUsageDaily.featureKey, featureKey),
      eq(aiUsageDaily.usageDate, date),
      sql`${aiUsageDaily.usedCount} > 0`,
    ));
}

/** Backwards-compatible helper for older call sites/tests. */
export async function refundFreeDailyQuota(userId: number, featureKey: FeatureKey, now = new Date()) {
  return refundQuotaForUser(userId, featureKey, false, now);
}
