import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { estimatePrice } from "@/lib/calculator";
import { calculateDrivingDistance } from "@/lib/google-maps";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const { origin, destination, pickupZip, dropoffZip, extras } = await req.json();

    const startLocation = origin || pickupZip;
    const endLocation = destination || dropoffZip;

    if (!startLocation || !endLocation) {
      return NextResponse.json({ error: "Missing location data" }, { status: 400 });
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: { pricingProfile: true }
    });

    if (!company || !company.pricingProfile) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const distance = await calculateDrivingDistance(startLocation, endLocation);
    if (distance === null) {
      return NextResponse.json({ error: "Could not calculate distance. Please check your addresses." }, { status: 400 });
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
      businessHoursStart?: string;
      businessHoursEnd?: string;
      businessDays?: string;
      largeItemsEnabled?: boolean;
      largeItemCategories?: Array<{ name: string; price: number }>;
    }, extras);

    return NextResponse.json({ estimate, distance });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
