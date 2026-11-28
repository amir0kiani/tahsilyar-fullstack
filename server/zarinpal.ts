import { and, eq, gt } from "drizzle-orm";
import type { Express, Request, Response } from "express";
import {
  freeDailyCycles,
  payments,
  paymentWebhookEvents,
  subscriptionPlans,
  userSubscriptions,
} from "../drizzle/schema";
import { getDb } from "./db";

const ZARINPAL_API_BASE = (process.env.ZARINPAL_API_BASE_URL ?? "https://payment.zarinpal.com/pg/v4").replace(/\/$/, "");
const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID ?? "";
const APP_BASE_URL = (process.env.APP_BASE_URL ?? "").replace(/\/$/, "");
const PAYMENT_PAGE_BASE = (process.env.ZARINPAL_PAYMENT_PAGE_BASE_URL ?? "https://payment.zarinpal.com/pg/StartPay").replace(/\/$/, "");

type PaidPlanCode = "plus_monthly" | "plus_quarterly";

function addCalendarMonths(from: Date, months: number) {
  const result = new Date(from);
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(day, lastDay));
  return result;
}

async function zarinpalRequest<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${ZARINPAL_API_BASE}/${path}.json`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Zarinpal HTTP ${response.status}`);
  return await response.json() as T;
}

type ZarinpalRequestResponse = {
  data?: { code?: number; authority?: string; message?: string };
  errors?: unknown;
};
type ZarinpalVerifyResponse = {
  data?: { code?: number; ref_id?: number | string; message?: string };
  errors?: unknown;
};

export async function createZarinpalCheckout(userId: number, planCode: PaidPlanCode) {
  if (!MERCHANT_ID) throw new Error("درگاه پرداخت هنوز پیکربندی نشده است.");
  if (!APP_BASE_URL) throw new Error("نشانی عمومی برنامه (APP_BASE_URL) تنظیم نشده است.");
  const db = await getDb();
  if (!db) throw new Error("Database is not configured");

  const [plan] = await db.select().from(subscriptionPlans)
    .where(and(eq(subscriptionPlans.code, planCode), eq(subscriptionPlans.isActive, 1))).limit(1);
  if (!plan || plan.priceRials <= 0 || plan.durationMonths <= 0) {
    throw new Error("طرح اشتراک انتخاب‌شده در دسترس نیست.");
  }

  const [inserted] = await db.insert(payments).values({
    userId,
    planId: plan.id,
    provider: "zarinpal",
    amountRials: plan.priceRials,
    status: "pending",
  });
  const paymentId = Number(inserted.insertId);
  const callbackUrl = `${APP_BASE_URL}/api/payments/zarinpal/callback`;

  try {
    const result = await zarinpalRequest<ZarinpalRequestResponse>("payment/request", {
      merchant_id: MERCHANT_ID,
      amount: plan.priceRials,
      currency: "IRR",
      description: `خرید اشتراک ${plan.title} تحصیل‌یار`,
      callback_url: callbackUrl,
      metadata: { order_id: String(paymentId), user_id: String(userId) },
    });
    const authority = result.data?.authority;
    if (result.data?.code !== 100 || !authority) {
      throw new Error(result.data?.message || "درخواست پرداخت از طرف زرین‌پال پذیرفته نشد.");
    }
    await db.update(payments).set({ authority, requestId: String(paymentId) })
      .where(eq(payments.id, paymentId));
    return { paymentId, redirectUrl: `${PAYMENT_PAGE_BASE}/${encodeURIComponent(authority)}` };
  } catch (error) {
    await db.update(payments).set({
      status: "failed",
      failureReason: error instanceof Error ? error.message.slice(0, 1000) : "Zarinpal request failed",
    }).where(eq(payments.id, paymentId));
    throw error;
  }
}

function redirectPaymentResult(res: Response, result: "success" | "failed") {
  const target = APP_BASE_URL ? `${APP_BASE_URL}/?payment=${result}` : `/?payment=${result}`;
  res.redirect(302, target);
}

export function registerZarinpalRoutes(app: Express) {
  app.get("/api/payments/zarinpal/callback", async (req: Request, res: Response) => {
    const authority = typeof req.query.Authority === "string" ? req.query.Authority : "";
    const status = typeof req.query.Status === "string" ? req.query.Status.toUpperCase() : "";
    if (!authority) {
      res.status(400).send("شناسه پرداخت نامعتبر است.");
      return;
    }

    try {
      const db = await getDb();
      if (!db) throw new Error("Database is not configured");
      const [payment] = await db.select().from(payments)
        .where(and(eq(payments.authority, authority), eq(payments.provider, "zarinpal"))).limit(1);
      if (!payment) {
        res.status(404).send("پرداخت موردنظر پیدا نشد.");
        return;
      }
      if (payment.status === "succeeded") {
        redirectPaymentResult(res, "success");
        return;
      }
      if (payment.status !== "pending" || status !== "OK") {
        await db.update(payments).set({
          status: "failed",
          callbackPayload: { authority, status },
          failureReason: status === "OK" ? "Payment is not pending" : "User cancelled or payment was not completed",
        }).where(and(eq(payments.id, payment.id), eq(payments.status, "pending")));
        redirectPaymentResult(res, "failed");
        return;
      }
      if (!MERCHANT_ID) throw new Error("Zarinpal merchant ID is not configured");

      const verified = await zarinpalRequest<ZarinpalVerifyResponse>("payment/verify", {
        merchant_id: MERCHANT_ID,
        amount: payment.amountRials,
        authority,
      });
      const verifyCode = verified.data?.code;
      const refId = verified.data?.ref_id;
      if (verifyCode !== 100 || refId === undefined || refId === null) {
        // Code 101 means the authority was already verified elsewhere. It is only
        // accepted above when this exact local payment has already been recorded as succeeded.
        await db.update(payments).set({
          status: "failed",
          callbackPayload: { authority, status, verifyCode: verifyCode ?? null },
          failureReason: verified.data?.message || `Zarinpal verification failed (code: ${verifyCode ?? "unknown"})`,
        }).where(and(eq(payments.id, payment.id), eq(payments.status, "pending")));
        redirectPaymentResult(res, "failed");
        return;
      }

      await db.transaction(async (tx) => {
        const [lockedPayment] = await tx.select().from(payments)
          .where(eq(payments.id, payment.id)).limit(1).for("update");
        if (!lockedPayment) throw new Error("Payment record disappeared");
        if (lockedPayment.status === "succeeded") return;
        if (lockedPayment.status !== "pending") throw new Error("Payment is no longer pending");

        const now = new Date();
        const [plan] = await tx.select().from(subscriptionPlans)
          .where(eq(subscriptionPlans.id, lockedPayment.planId)).limit(1);
        if (!plan || plan.durationMonths < 1) throw new Error("Paid subscription plan is invalid");

        const [activeSubscription] = await tx.select().from(userSubscriptions)
          .where(and(
            eq(userSubscriptions.userId, lockedPayment.userId),
            eq(userSubscriptions.status, "active"),
            gt(userSubscriptions.endsAt, now),
          )).orderBy(userSubscriptions.endsAt).limit(1).for("update");

        const startsAt = activeSubscription?.startsAt ?? now;
        const extensionBase = activeSubscription?.endsAt && activeSubscription.endsAt > now
          ? activeSubscription.endsAt
          : now;
        const endsAt = addCalendarMonths(extensionBase, plan.durationMonths);
        let subscriptionId: number;

        if (activeSubscription) {
          subscriptionId = activeSubscription.id;
          await tx.update(userSubscriptions).set({
            planId: plan.id,
            status: "active",
            startsAt,
            endsAt,
            updatedAt: now,
          }).where(eq(userSubscriptions.id, activeSubscription.id));
        } else {
          const [created] = await tx.insert(userSubscriptions).values({
            userId: lockedPayment.userId,
            planId: plan.id,
            status: "active",
            startsAt: now,
            endsAt,
          });
          subscriptionId = Number(created.insertId);
        }

        await tx.update(payments).set({
          status: "succeeded",
          subscriptionId,
          refId: String(refId),
          verifiedAt: now,
          callbackPayload: { authority, status, verifyCode, refId: String(refId) },
          failureReason: null,
        }).where(eq(payments.id, lockedPayment.id));

        const jalaliParts = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
          timeZone: "Asia/Tehran", year: "numeric", month: "2-digit",
        }).formatToParts(now);
        const values = Object.fromEntries(jalaliParts.map((part) => [part.type, part.value]));
        const periodKey = `${values.year}-${values.month}`;
        await tx.update(freeDailyCycles).set({ status: "upgraded", upgradedAt: now })
          .where(and(
            eq(freeDailyCycles.userId, lockedPayment.userId),
            eq(freeDailyCycles.periodKey, periodKey),
            eq(freeDailyCycles.status, "active"),
          ));

        await tx.insert(paymentWebhookEvents).values({
          provider: "zarinpal",
          eventKey: `verified:${authority}`,
          paymentId: lockedPayment.id,
          processedAt: now,
        }).onDuplicateKeyUpdate({ set: { paymentId: lockedPayment.id, processedAt: now } });
      });

      redirectPaymentResult(res, "success");
    } catch (error) {
      console.error("[Zarinpal] Callback processing failed:", error);
      redirectPaymentResult(res, "failed");
    }
  });
}
