ALTER TABLE "PricingProfile"
ADD COLUMN "serviceOptions" JSONB NOT NULL DEFAULT '[]'::jsonb;
