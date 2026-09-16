CREATE TABLE IF NOT EXISTS "AbandonedQuote" (
  "id" TEXT PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "formId" TEXT,
  "sessionId" TEXT NOT NULL,
  "customerName" TEXT,
  "customerEmail" TEXT,
  "customerPhone" TEXT,
  "pickupAddress" TEXT,
  "dropoffAddress" TEXT,
  "pickupZip" TEXT,
  "dropoffZip" TEXT,
  "estimatedPrice" DOUBLE PRECISION,
  "distanceMiles" DOUBLE PRECISION,
  "stage" TEXT NOT NULL DEFAULT 'STARTED',
  "status" TEXT NOT NULL DEFAULT 'OPEN',
  "quoteRequestId" TEXT,
  "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AbandonedQuote_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "AbandonedQuote_companyId_sessionId_key" ON "AbandonedQuote"("companyId", "sessionId");
CREATE INDEX IF NOT EXISTS "AbandonedQuote_companyId_status_lastActivityAt_idx" ON "AbandonedQuote"("companyId", "status", "lastActivityAt");
CREATE INDEX IF NOT EXISTS "AbandonedQuote_quoteRequestId_idx" ON "AbandonedQuote"("quoteRequestId");