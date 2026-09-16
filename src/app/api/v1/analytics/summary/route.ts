import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateIntegration, writeIntegrationAudit } from "@/lib/integration-auth";

export async function GET(request: Request) {
  const connection = await authenticateIntegration(request, "analytics:read");
  if (!connection) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [total, pending, won, lost, aggregate] = await Promise.all([
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null } }),
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null, status: "PENDING" } }),
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null, status: "WON" } }),
    prisma.quoteRequest.count({ where: { companyId: connection.companyId, deletedAt: null, status: "LOST" } }),
    prisma.quoteRequest.aggregate({
      where: { companyId: connection.companyId, deletedAt: null },
      _avg: { estimatedPrice: true },
      _sum: { estimatedPrice: true },
    }),
  ]);

  const data = {
    totalQuotes: total,
    pendingQuotes: pending,
    wonQuotes: won,
    lostQuotes: lost,
    averageQuoteValue: aggregate._avg.estimatedPrice ?? 0,
    totalQuotedValue: aggregate._sum.estimatedPrice ?? 0,
  };

  await writeIntegrationAudit({
    companyId: connection.companyId,
    connectionId: connection.id,
    action: "api.read",
    resource: "analytics/summary",
  });

  return NextResponse.json({ data });
}
