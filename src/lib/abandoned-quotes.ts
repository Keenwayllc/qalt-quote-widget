import crypto from "node:crypto";
import prisma from "@/lib/prisma";

export type AbandonedQuoteStage = "STARTED" | "ROUTE" | "QUOTE" | "CONTACT";

export interface AbandonedQuoteInput {
  companyId: string;
  formId?: string | null;
  sessionId: string;
  customerName?: string | null;
  customerEmail?: string | null;
  customerPhone?: string | null;
  pickupAddress?: string | null;
  dropoffAddress?: string | null;
  pickupZip?: string | null;
  dropoffZip?: string | null;
  estimatedPrice?: number | null;
  distanceMiles?: number | null;
  stage?: AbandonedQuoteStage;
}

export interface AbandonedQuoteRow {
  id: string;
  companyId: string;
  formId: string | null;
  sessionId: string;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  pickupAddress: string | null;
  dropoffAddress: string | null;
  pickupZip: string | null;
  dropoffZip: string | null;
  estimatedPrice: number | null;
  distanceMiles: number | null;
  stage: string;
  status: string;
  quoteRequestId: string | null;
  lastActivityAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

let ensured = false;

export async function ensureAbandonedQuoteTable() {
  if (ensured) return;
  await prisma.$executeRawUnsafe(`
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
    )
  `);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "AbandonedQuote_companyId_sessionId_key" ON "AbandonedQuote"("companyId", "sessionId")`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "AbandonedQuote_companyId_status_lastActivityAt_idx" ON "AbandonedQuote"("companyId", "status", "lastActivityAt")`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "AbandonedQuote_quoteRequestId_idx" ON "AbandonedQuote"("quoteRequestId")`);
  ensured = true;
}

const clean = (value: unknown, max = 320): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
};

const finiteOrNull = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

export async function upsertAbandonedQuote(input: AbandonedQuoteInput) {
  await ensureAbandonedQuoteTable();
  const id = crypto.randomUUID();
  const stage = input.stage ?? "STARTED";
  const customerName = clean(input.customerName, 160);
  const customerEmail = clean(input.customerEmail, 320);
  const customerPhone = clean(input.customerPhone, 80);
  const pickupAddress = clean(input.pickupAddress, 500);
  const dropoffAddress = clean(input.dropoffAddress, 500);
  const pickupZip = clean(input.pickupZip, 20);
  const dropoffZip = clean(input.dropoffZip, 20);
  const formId = clean(input.formId, 100);
  const estimatedPrice = finiteOrNull(input.estimatedPrice);
  const distanceMiles = finiteOrNull(input.distanceMiles);

  await prisma.$executeRaw`
    INSERT INTO "AbandonedQuote" (
      "id", "companyId", "formId", "sessionId", "customerName", "customerEmail", "customerPhone",
      "pickupAddress", "dropoffAddress", "pickupZip", "dropoffZip", "estimatedPrice", "distanceMiles",
      "stage", "status", "lastActivityAt", "createdAt", "updatedAt"
    ) VALUES (
      ${id}, ${input.companyId}, ${formId}, ${input.sessionId}, ${customerName}, ${customerEmail}, ${customerPhone},
      ${pickupAddress}, ${dropoffAddress}, ${pickupZip}, ${dropoffZip}, ${estimatedPrice}, ${distanceMiles},
      ${stage}, 'OPEN', NOW(), NOW(), NOW()
    )
    ON CONFLICT ("companyId", "sessionId") DO UPDATE SET
      "formId" = COALESCE(EXCLUDED."formId", "AbandonedQuote"."formId"),
      "customerName" = COALESCE(EXCLUDED."customerName", "AbandonedQuote"."customerName"),
      "customerEmail" = COALESCE(EXCLUDED."customerEmail", "AbandonedQuote"."customerEmail"),
      "customerPhone" = COALESCE(EXCLUDED."customerPhone", "AbandonedQuote"."customerPhone"),
      "pickupAddress" = COALESCE(EXCLUDED."pickupAddress", "AbandonedQuote"."pickupAddress"),
      "dropoffAddress" = COALESCE(EXCLUDED."dropoffAddress", "AbandonedQuote"."dropoffAddress"),
      "pickupZip" = COALESCE(EXCLUDED."pickupZip", "AbandonedQuote"."pickupZip"),
      "dropoffZip" = COALESCE(EXCLUDED."dropoffZip", "AbandonedQuote"."dropoffZip"),
      "estimatedPrice" = COALESCE(EXCLUDED."estimatedPrice", "AbandonedQuote"."estimatedPrice"),
      "distanceMiles" = COALESCE(EXCLUDED."distanceMiles", "AbandonedQuote"."distanceMiles"),
      "stage" = EXCLUDED."stage",
      "lastActivityAt" = NOW(),
      "updatedAt" = NOW()
  `;
}

export async function convertAbandonedQuote(companyId: string, sessionId: string, quoteRequestId?: string | null) {
  await ensureAbandonedQuoteTable();
  const quoteId = clean(quoteRequestId, 100);
  await prisma.$executeRaw`
    UPDATE "AbandonedQuote"
    SET "status" = 'CONVERTED', "quoteRequestId" = ${quoteId}, "lastActivityAt" = NOW(), "updatedAt" = NOW()
    WHERE "companyId" = ${companyId} AND "sessionId" = ${sessionId}
  `;
}

export async function listOpenAbandonedQuotes(companyId: string): Promise<AbandonedQuoteRow[]> {
  await ensureAbandonedQuoteTable();
  return prisma.$queryRaw<AbandonedQuoteRow[]>`
    SELECT * FROM "AbandonedQuote"
    WHERE "companyId" = ${companyId} AND "status" = 'OPEN'
    ORDER BY "lastActivityAt" DESC
    LIMIT 250
  `;
}

export async function getOpenAbandonedQuote(companyId: string, id: string): Promise<AbandonedQuoteRow | null> {
  await ensureAbandonedQuoteTable();
  const rows = await prisma.$queryRaw<AbandonedQuoteRow[]>`
    SELECT * FROM "AbandonedQuote"
    WHERE "id" = ${id} AND "companyId" = ${companyId} AND "status" = 'OPEN'
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function deleteAbandonedQuote(companyId: string, id: string): Promise<boolean> {
  await ensureAbandonedQuoteTable();
  const deleted = await prisma.$executeRaw`
    DELETE FROM "AbandonedQuote"
    WHERE "id" = ${id} AND "companyId" = ${companyId}
  `;
  return deleted > 0;
}
