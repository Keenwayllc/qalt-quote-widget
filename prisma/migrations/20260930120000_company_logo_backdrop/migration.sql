-- Merchant override for logo contrast treatment. Additive with a safe default.
ALTER TABLE "Company" ADD COLUMN IF NOT EXISTS "logoBackdrop" TEXT NOT NULL DEFAULT 'auto';
