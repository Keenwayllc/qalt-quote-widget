import "server-only";
import { randomUUID } from "crypto";
import prisma from "@/lib/prisma";
import type { EstimateExtras, PriceLineItem } from "@/lib/calculator";

export type BookingRecord = {
  id: string;
  companyId: string;
  quoteRequestId: string;
  scheduledDate: Date | null;
  driverName: string | null;
  vehicle: string | null;
  notes: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  customerName?: string;
  customerEmail?: string;
  estimatedPrice?: number;
};

export type PricingRuleRecord = {
  id: string;
  companyId: string;
  name: string;
  active: boolean;
  conditionType: string;
  threshold: number;
  adjustmentType: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

let tablesReady = false;
export async function ensureGrowthTables() {
  if (tablesReady) return;
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "QuoteFollowUp" (
    "id" TEXT PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "quoteRequestId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuoteFollowUp_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuoteFollowUp_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "QuoteFollowUp_quote_kind_key" ON "QuoteFollowUp"("quoteRequestId", "kind")`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "QuoteBooking" (
    "id" TEXT PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "quoteRequestId" TEXT NOT NULL UNIQUE,
    "scheduledDate" TIMESTAMP(3),
    "driverName" TEXT,
    "vehicle" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UNSCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuoteBooking_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuoteBooking_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "QuoteBooking_company_status_idx" ON "QuoteBooking"("companyId", "status")`);
  await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "PricingRule" (
    "id" TEXT PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT TRUE,
    "conditionType" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "adjustmentType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PricingRule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE
  )`);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "PricingRule_company_active_idx" ON "PricingRule"("companyId", "active")`);
  tablesReady = true;
}

export async function hasFollowUp(quoteRequestId: string, kind: string) {
  await ensureGrowthTables();
  const rows = await prisma.$queryRawUnsafe<Array<{ id: string }>>(
    `SELECT "id" FROM "QuoteFollowUp" WHERE "quoteRequestId"=$1 AND "kind"=$2 LIMIT 1`,
    quoteRequestId,
    kind
  );
  return rows.length > 0;
}

export async function logFollowUp(companyId: string, quoteRequestId: string, kind: string) {
  await ensureGrowthTables();
  await prisma.$executeRawUnsafe(
    `INSERT INTO "QuoteFollowUp" ("id","companyId","quoteRequestId","kind") VALUES ($1,$2,$3,$4) ON CONFLICT ("quoteRequestId","kind") DO NOTHING`,
    randomUUID(), companyId, quoteRequestId, kind
  );
}

export async function getFunnelMetrics(companyId: string, days = 30) {
  await ensureGrowthTables();
  const since = new Date(Date.now() - days * 86400000);
  const [quotes, confirmed, paid, won, revenue, abandonedRows] = await Promise.all([
    prisma.quoteRequest.count({ where: { companyId, deletedAt: null, createdAt: { gte: since } } }),
    prisma.quoteRequest.count({ where: { companyId, deletedAt: null, createdAt: { gte: since }, status: { in: ["CONFIRMED", "WON", "PAID"] } } }),
    prisma.quoteRequest.count({ where: { companyId, deletedAt: null, createdAt: { gte: since }, paymentStatus: "PAID" } }),
    prisma.quoteRequest.count({ where: { companyId, deletedAt: null, createdAt: { gte: since }, status: "WON" } }),
    prisma.quoteRequest.aggregate({ where: { companyId, deletedAt: null, createdAt: { gte: since }, OR: [{ paymentStatus: "PAID" }, { status: "WON" }] }, _sum: { estimatedPrice: true } }),
    prisma.$queryRawUnsafe<Array<{ count: bigint }>>(`SELECT COUNT(*)::bigint AS count FROM "AbandonedQuote" WHERE "companyId"=$1 AND "createdAt">=$2`, companyId, since),
  ]);
  const abandoned = Number(abandonedRows[0]?.count ?? 0);
  const starts = quotes + abandoned;
  return {
    days,
    starts,
    abandoned,
    quotes,
    confirmed,
    paid,
    won,
    booked: Math.max(confirmed, paid + won),
    revenue: revenue._sum.estimatedPrice ?? 0,
    quoteConversion: starts ? (quotes / starts) * 100 : 0,
    bookingConversion: quotes ? (Math.max(confirmed, paid + won) / quotes) * 100 : 0,
  };
}

export async function ensureBookingForQuote(companyId: string, quoteRequestId: string) {
  await ensureGrowthTables();
  const quote = await prisma.quoteRequest.findFirst({ where: { id: quoteRequestId, companyId, deletedAt: null }, select: { id: true } });
  if (!quote) return null;
  await prisma.$executeRawUnsafe(
    `INSERT INTO "QuoteBooking" ("id","companyId","quoteRequestId") VALUES ($1,$2,$3) ON CONFLICT ("quoteRequestId") DO NOTHING`,
    randomUUID(), companyId, quoteRequestId
  );
  return quote.id;
}

export async function listBookings(companyId: string): Promise<BookingRecord[]> {
  await ensureGrowthTables();
  return prisma.$queryRawUnsafe<BookingRecord[]>(`SELECT b.*, q."customerName", q."customerEmail", q."estimatedPrice" FROM "QuoteBooking" b JOIN "QuoteRequest" q ON q."id"=b."quoteRequestId" WHERE b."companyId"=$1 ORDER BY COALESCE(b."scheduledDate", b."createdAt") ASC`, companyId);
}

export async function updateBooking(companyId: string, input: { id: string; scheduledDate?: Date | null; driverName?: string | null; vehicle?: string | null; notes?: string | null; status?: string | null }) {
  await ensureGrowthTables();
  const allowed = new Set(["UNSCHEDULED", "SCHEDULED", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);
  const status = input.status && allowed.has(input.status) ? input.status : "UNSCHEDULED";
  await prisma.$executeRawUnsafe(
    `UPDATE "QuoteBooking" SET "scheduledDate"=$1,"driverName"=$2,"vehicle"=$3,"notes"=$4,"status"=$5,"updatedAt"=CURRENT_TIMESTAMP WHERE "id"=$6 AND "companyId"=$7`,
    input.scheduledDate ?? null,
    input.driverName || null,
    input.vehicle || null,
    input.notes || null,
    status,
    input.id,
    companyId
  );
}

export async function listPricingRules(companyId: string): Promise<PricingRuleRecord[]> {
  await ensureGrowthTables();
  return prisma.$queryRawUnsafe<PricingRuleRecord[]>(`SELECT * FROM "PricingRule" WHERE "companyId"=$1 ORDER BY "createdAt" ASC`, companyId);
}

export async function createPricingRule(companyId: string, input: { name: string; conditionType: string; threshold: number; adjustmentType: string; amount: number }) {
  await ensureGrowthTables();
  const conditions = new Set(["DISTANCE_GT", "WEIGHT_GT", "ITEMS_GT"]);
  const adjustments = new Set(["FLAT", "PERCENT"]);
  if (!conditions.has(input.conditionType) || !adjustments.has(input.adjustmentType)) throw new Error("Invalid pricing rule");
  await prisma.$executeRawUnsafe(
    `INSERT INTO "PricingRule" ("id","companyId","name","conditionType","threshold","adjustmentType","amount") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    randomUUID(), companyId, input.name.slice(0, 120), input.conditionType, Math.max(0, input.threshold), input.adjustmentType, Math.max(0, input.amount)
  );
}

export async function setPricingRuleActive(companyId: string, id: string, active: boolean) {
  await ensureGrowthTables();
  await prisma.$executeRawUnsafe(`UPDATE "PricingRule" SET "active"=$1,"updatedAt"=CURRENT_TIMESTAMP WHERE "id"=$2 AND "companyId"=$3`, active, id, companyId);
}

export async function deletePricingRule(companyId: string, id: string) {
  await ensureGrowthTables();
  await prisma.$executeRawUnsafe(`DELETE FROM "PricingRule" WHERE "id"=$1 AND "companyId"=$2`, id, companyId);
}

export async function applyPricingRules(companyId: string, distance: number, extras: EstimateExtras, startingTotal: number): Promise<{ total: number; lineItems: PriceLineItem[] }> {
  const rules = (await listPricingRules(companyId)).filter((r) => r.active);
  let total = startingTotal;
  const lineItems: PriceLineItem[] = [];
  for (const rule of rules) {
    const value = rule.conditionType === "DISTANCE_GT"
      ? distance
      : rule.conditionType === "WEIGHT_GT"
        ? Number(extras.packageWeight || 0)
        : Number(extras.itemCount || 0);
    if (!(value > rule.threshold)) continue;
    const amount = rule.adjustmentType === "PERCENT" ? total * (rule.amount / 100) : rule.amount;
    if (amount <= 0) continue;
    total += amount;
    lineItems.push({ key: `rule:${rule.id}`, label: rule.name, amount, detail: rule.adjustmentType === "PERCENT" ? `${rule.amount}% pricing rule` : "Pricing rule" });
  }
  return { total, lineItems };
}
