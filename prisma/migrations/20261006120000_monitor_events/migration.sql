-- Shared ledger for the error alert cap and AI triage budget. Additive only.
CREATE TABLE IF NOT EXISTS "MonitorEvent" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "errorId" TEXT,
    "detail" TEXT,
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MonitorEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "MonitorEvent_kind_createdAt_idx" ON "MonitorEvent"("kind", "createdAt");

-- Server-only table: keep it off the Supabase Data API. Prisma's owner role bypasses RLS.
ALTER TABLE "MonitorEvent" ENABLE ROW LEVEL SECURITY;
