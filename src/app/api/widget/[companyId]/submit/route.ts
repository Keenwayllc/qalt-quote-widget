import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const data = await req.json();

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { subscriptionPlan: true }
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found." }, { status: 404 });
    }

    if (company.subscriptionPlan === "STARTER") {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const quoteCount = await prisma.quoteRequest.count({
        where: {
          companyId,
          createdAt: { gte: startOfMonth }
        }
      });

      if (quoteCount >= 50) {
        return NextResponse.json(
          { error: "Monthly quote limit reached for this plan." },
          { status: 403 }
        );
      }
    }

    const quote = await prisma.quoteRequest.create({
      data: {
        companyId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone || null,
        pickupZip: data.pickupZip,
        dropoffZip: data.dropoffZip,
        distanceMiles: data.distanceMiles,
        estimatedPrice: data.estimatedPrice,
        serviceType: data.isLargeItem ? "Large Item Delivery" : "Standard Delivery",
        status: "PENDING",
        packageWeight: data.packageWeight ? String(data.packageWeight) : null,
        selectedExtras: JSON.stringify({
          hasStairs: data.hasStairs,
          needsInsideDelivery: data.needsInsideDelivery,
          isAfterHours: data.isAfterHours,
        })
      },
    });

    return NextResponse.json({ success: true, quoteId: quote.id });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
