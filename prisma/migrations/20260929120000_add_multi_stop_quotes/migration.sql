-- Additive multi-stop quoting fields. Existing quotes remain pickup-to-drop-off
-- routes, and existing pricing profiles receive the documented default fee.
ALTER TABLE "PricingProfile"
ADD COLUMN IF NOT EXISTS "additionalStopFee" DOUBLE PRECISION NOT NULL DEFAULT 10.00;

ALTER TABLE "QuoteRequest"
ADD COLUMN IF NOT EXISTS "intermediateStops" JSONB NOT NULL DEFAULT '[]';

-- This legacy recovery table is created on demand outside Prisma. Upgrade it
-- when present; its runtime creator also includes this column for new installs.
ALTER TABLE IF EXISTS "AbandonedQuote"
ADD COLUMN IF NOT EXISTS "intermediateStops" JSONB NOT NULL DEFAULT '[]';
