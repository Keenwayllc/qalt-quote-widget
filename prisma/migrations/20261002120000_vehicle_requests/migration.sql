-- Merchant requests for vehicles missing from the shared catalog. Additive only.
CREATE TABLE IF NOT EXISTS "VehicleRequest" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "referenceUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VehicleRequest_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "VehicleRequest_companyId_createdAt_idx" ON "VehicleRequest"("companyId", "createdAt");
CREATE INDEX IF NOT EXISTS "VehicleRequest_status_createdAt_idx" ON "VehicleRequest"("status", "createdAt");

DO $$ BEGIN
  ALTER TABLE "VehicleRequest" ADD CONSTRAINT "VehicleRequest_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
