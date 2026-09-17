ALTER TABLE "WidgetSettings" ADD COLUMN "vehicleOptions" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "QuoteRequest" ADD COLUMN "vehicleType" TEXT;
