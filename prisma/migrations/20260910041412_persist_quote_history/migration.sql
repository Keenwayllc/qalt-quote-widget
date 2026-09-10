-- Additive: preserve historical quote inputs for future Quote PDFs / Invoices.
-- All columns are nullable so existing QuoteRequest rows remain valid; no backfill.
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "pickupAddress" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "dropoffAddress" TEXT;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "itemCount" INTEGER;
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "pricingBreakdown" JSONB;
