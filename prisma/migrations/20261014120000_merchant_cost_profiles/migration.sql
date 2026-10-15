-- Merchant-only cost assumptions used to estimate quote profitability.
-- Additive: one new table, no changes to existing tables. Profit estimates are
-- read-only and never feed customer pricing or Stripe amounts.
-- vehicleKey '' is the company-wide default row; other rows are per-vehicle
-- overrides where NULL means "inherit from the default row".
CREATE TABLE IF NOT EXISTS "MerchantCostProfile" (
  "id" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "vehicleKey" TEXT NOT NULL DEFAULT '',
  "label" TEXT NOT NULL DEFAULT 'All vehicles',
  "fuelPricePerGallon" DOUBLE PRECISION,
  "milesPerGallon" DOUBLE PRECISION,
  "driverHourlyCost" DOUBLE PRECISION,
  "averageSpeedMph" DOUBLE PRECISION,
  "handlingMinutes" DOUBLE PRECISION,
  "deadheadMiles" DOUBLE PRECISION,
  "tollsPerJob" DOUBLE PRECISION,
  "otherCostPerJob" DOUBLE PRECISION,
  "targetMarginPercent" DOUBLE PRECISION,
  "followUpAfterHours" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MerchantCostProfile_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "MerchantCostProfile_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "MerchantCostProfile_companyId_vehicleKey_key" ON "MerchantCostProfile"("companyId", "vehicleKey");

-- Every public table has RLS on with no policies; the app connects as owner.
ALTER TABLE "MerchantCostProfile" ENABLE ROW LEVEL SECURITY;
