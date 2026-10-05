-- Grouped application errors for monitoring and AI triage. Additive only.
CREATE TABLE IF NOT EXISTS "AppError" (
    "id" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "path" TEXT,
    "userAgent" TEXT,
    "companyId" TEXT,
    "count" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "severity" TEXT,
    "aiSummary" TEXT,
    "aiCause" TEXT,
    "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AppError_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "AppError_fingerprint_key" ON "AppError"("fingerprint");
CREATE INDEX IF NOT EXISTS "AppError_status_lastSeen_idx" ON "AppError"("status", "lastSeen");
