-- Finite monthly AI allowances for both paid Plus plans.
-- Values are per user and reset on the first day of each Jalali month.
-- Keep this migration additive so already-applied monetization migrations remain immutable.

INSERT INTO plan_entitlements (planId, featureKey, dailyLimit, monthlyLimit, enabled)
SELECT id, 'chat_message', NULL, 600, 1
FROM subscription_plans
WHERE code IN ('plus_monthly', 'plus_quarterly')
ON DUPLICATE KEY UPDATE
  dailyLimit = VALUES(dailyLimit),
  monthlyLimit = VALUES(monthlyLimit),
  enabled = VALUES(enabled);

INSERT INTO plan_entitlements (planId, featureKey, dailyLimit, monthlyLimit, enabled)
SELECT id, 'plan_generate', NULL, 30, 1
FROM subscription_plans
WHERE code IN ('plus_monthly', 'plus_quarterly')
ON DUPLICATE KEY UPDATE
  dailyLimit = VALUES(dailyLimit),
  monthlyLimit = VALUES(monthlyLimit),
  enabled = VALUES(enabled);

INSERT INTO plan_entitlements (planId, featureKey, dailyLimit, monthlyLimit, enabled)
SELECT id, 'plan_update', NULL, 60, 1
FROM subscription_plans
WHERE code IN ('plus_monthly', 'plus_quarterly')
ON DUPLICATE KEY UPDATE
  dailyLimit = VALUES(dailyLimit),
  monthlyLimit = VALUES(monthlyLimit),
  enabled = VALUES(enabled);

INSERT INTO plan_entitlements (planId, featureKey, dailyLimit, monthlyLimit, enabled)
SELECT id, 'progress_analysis', NULL, 30, 1
FROM subscription_plans
WHERE code IN ('plus_monthly', 'plus_quarterly')
ON DUPLICATE KEY UPDATE
  dailyLimit = VALUES(dailyLimit),
  monthlyLimit = VALUES(monthlyLimit),
  enabled = VALUES(enabled);
