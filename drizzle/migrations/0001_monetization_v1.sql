CREATE TABLE IF NOT EXISTS subscription_plans (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  title VARCHAR(100) NOT NULL,
  durationMonths INT NOT NULL,
  priceRials INT NOT NULL,
  isActive INT NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS plan_entitlements (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  planId INT NOT NULL,
  featureKey VARCHAR(80) NOT NULL,
  monthlyLimit INT NULL,
  enabled INT NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY plan_entitlements_plan_feature_unique (planId, featureKey),
  KEY plan_entitlements_plan_idx (planId)
);

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  planId INT NOT NULL,
  status ENUM('pending','active','expired','cancelled','suspended') NOT NULL DEFAULT 'pending',
  startsAt TIMESTAMP NULL,
  endsAt TIMESTAMP NULL,
  cancelledAt TIMESTAMP NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY user_subscriptions_user_status_idx (userId, status),
  KEY user_subscriptions_ends_at_idx (endsAt)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  subscriptionId INT NULL,
  planId INT NOT NULL,
  provider VARCHAR(32) NOT NULL DEFAULT 'zarinpal',
  amountRials INT NOT NULL,
  status ENUM('pending','succeeded','failed','refunded') NOT NULL DEFAULT 'pending',
  authority VARCHAR(128) NULL UNIQUE,
  refId VARCHAR(128) NULL,
  requestId VARCHAR(128) NULL,
  callbackPayload JSON NULL,
  verifiedAt TIMESTAMP NULL,
  failureReason TEXT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY payments_user_created_idx (userId, createdAt),
  KEY payments_status_idx (status)
);

CREATE TABLE IF NOT EXISTS ai_usage_monthly (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  featureKey VARCHAR(80) NOT NULL,
  periodKey VARCHAR(7) NOT NULL,
  usedCount INT NOT NULL DEFAULT 0,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY ai_usage_user_feature_period_unique (userId, featureKey, periodKey),
  KEY ai_usage_period_idx (periodKey)
);

CREATE TABLE IF NOT EXISTS ai_usage_logs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  featureKey VARCHAR(80) NOT NULL,
  periodKey VARCHAR(7) NOT NULL,
  model VARCHAR(128) NULL,
  inputTokens INT NOT NULL DEFAULT 0,
  outputTokens INT NOT NULL DEFAULT 0,
  units INT NOT NULL DEFAULT 1,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ai_usage_logs_user_period_idx (userId, periodKey),
  KEY ai_usage_logs_feature_idx (featureKey)
);

CREATE TABLE IF NOT EXISTS payment_webhook_events (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  provider VARCHAR(32) NOT NULL,
  eventKey VARCHAR(160) NOT NULL,
  paymentId INT NULL,
  processedAt TIMESTAMP NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY payment_webhook_provider_event_unique (provider, eventKey)
);

CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  adminUserId INT NOT NULL,
  targetUserId INT NULL,
  action VARCHAR(100) NOT NULL,
  entityType VARCHAR(80) NOT NULL,
  entityId VARCHAR(80) NULL,
  reason TEXT NULL,
  beforeData JSON NULL,
  afterData JSON NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY admin_audit_admin_created_idx (adminUserId, createdAt),
  KEY admin_audit_target_idx (targetUserId)
);

INSERT INTO subscription_plans (code, title, durationMonths, priceRials, isActive)
VALUES
  ('free', 'رایگان', 0, 0, 1),
  ('plus_monthly', 'پلاس ماهانه', 1, 1490000, 1),
  ('plus_quarterly', 'پلاس سه‌ماهه', 3, 3990000, 1)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  durationMonths = VALUES(durationMonths),
  priceRials = VALUES(priceRials),
  isActive = VALUES(isActive);
