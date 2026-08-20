-- Additive: soft-delete (archive) for quote requests.
ALTER TABLE "QuoteRequest" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
