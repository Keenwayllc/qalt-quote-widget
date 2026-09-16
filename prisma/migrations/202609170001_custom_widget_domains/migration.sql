ALTER TABLE "Company"
  ADD COLUMN IF NOT EXISTS "customWidgetDomain" TEXT,
  ADD COLUMN IF NOT EXISTS "customWidgetDomainVerified" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "customWidgetDomainVerification" JSONB;

CREATE UNIQUE INDEX IF NOT EXISTS "Company_customWidgetDomain_key"
  ON "Company"("customWidgetDomain")
  WHERE "customWidgetDomain" IS NOT NULL;
