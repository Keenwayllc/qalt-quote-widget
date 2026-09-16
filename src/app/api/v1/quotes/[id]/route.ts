import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticateIntegration, writeIntegrationAudit } from "@/lib/integration-auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const connection = await authenticateIntegration(request, "quotes:read");
  if (!connection) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const quote = await prisma.quoteRequest.findFirst({
    where: { id, companyId: connection.companyId, deletedAt: null },
    select: {
      id: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      pickupZip: true,
      dropoffZip: true,
      pickupAddress: true,
      dropoffAddress: true,
      distanceMiles: true,
      estimatedPrice: true,
      pricingBreakdown: true,
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
    resource: `quotes/${id}`,
    metadata: { found: !!quote },
  });

  if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  return NextResponse.json({ data: quote });
}
