CREATE TABLE "WidgetInstallation" (
  "id" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "formId" TEXT NOT NULL,
  "domain" TEXT NOT NULL,
  "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "loadCount" INTEGER NOT NULL DEFAULT 1,
  CONSTRAINT "WidgetInstallation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "WidgetInstallation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "WidgetInstallation_formId_fkey" FOREIGN KEY ("formId") REFERENCES "WidgetSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "WidgetInstallation_companyId_formId_domain_key" ON "WidgetInstallation"("companyId", "formId", "domain");
CREATE INDEX "WidgetInstallation_companyId_lastSeenAt_idx" ON "WidgetInstallation"("companyId", "lastSeenAt");
