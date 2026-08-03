-- Additive: third configurable flat-fee add-on.
-- Existing rows are backfilled by the column defaults (0 / '').
ALTER TABLE "PricingProfile" ADD COLUMN IF NOT EXISTS "addon3Fee" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "WidgetSettings" ADD COLUMN IF NOT EXISTS "addon3Label" TEXT NOT NULL DEFAULT '';
