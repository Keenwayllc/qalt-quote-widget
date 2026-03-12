import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { calculateDistance, estimatePrice } from "@/lib/calculator";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const { pickupZip, dropoffZip, extras } = await req.json();

    if (!pickupZip || !dropoffZip) {
      return NextResponse.json({ error: "Missing ZIP codes" }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: { pricingProfile: true }
    });

    if (!company || !company.pricingProfile) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const distance = calculateDistance(pickupZip, dropoffZip);
    if (distance === null) {
      return NextResponse.json({ error: "Invalid ZIP code(s)" }, { status: 400 });
    }

    const estimate = estimatePrice(distance, (company.pricingProfile as unknown) as {
      baseRatePerMile: number;
      minimumCharge: number;
      useMinimumCharge: boolean;
      minMilesThreshold: number;
      weightFee: number;
      itemCountFee: number;
      stairsFee: number;
      insideDeliveryFee: number;
      afterHoursFee: number;
      largeItemFee: number;
    }, extras);

    return NextResponse.json({ estimate, distance });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
