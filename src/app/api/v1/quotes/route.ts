import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateIntegration, writeIntegrationAudit } from "@/lib/integration-auth";

export async function GET(request: Request) {
  const connection = await authenticateIntegration(request, "quotes:read");
  if (!connection) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const status = url.searchParams.get("status")?.trim().toUpperCase() || undefined;
  const requestedLimit = Number(url.searchParams.get("limit") || "20");
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(Math.floor(requestedLimit), 1), 50) : 20;

  const quotes = await prisma.quoteRequest.findMany({
    where: {
      companyId: connection.companyId,
      deletedAt: null,
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      customerName: true,
      customerEmail: true,
      pickupZip: true,
      dropoffZip: true,
      distanceMiles: true,
      estimatedPrice: true,
      status: true,
      serviceType: true,
      paymentStatus: true,
      createdAt: true,
    },
  });

  await writeIntegrationAudit({
    companyId: connection.companyId,
    connectionId: connection.id,
    action: "api.read",
    resource: "quotes",
    metadata: { status: status ?? null, limit },
  });

  return NextResponse.json({ data: quotes });
}
