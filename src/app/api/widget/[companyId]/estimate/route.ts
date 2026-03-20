import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { estimatePrice } from "@/lib/calculator";
import { calculateDrivingDistance } from "@/lib/google-maps";

type PricingProfileShape = {
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
};

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const { origin, destination, pickupZip, dropoffZip, clientDistance, extras, formId } = await req.json();

    const startLocation = origin || pickupZip;
    const endLocation = destination || dropoffZip;

    if (!startLocation || !endLocation) {
      return NextResponse.json({ error: "Missing location data" }, { status: 400 });
    }

    // Resolve pricing: prefer form-specific, fall back to company default
    let pricingProfile: PricingProfileShape | null = null;

    if (formId) {
      const formProfile = await prisma.pricingProfile.findUnique({
        where: { widgetSettingsId: formId },
      });
      if (formProfile) pricingProfile = formProfile as unknown as PricingProfileShape;
    }

    if (!pricingProfile) {
      const defaultProfile = await prisma.pricingProfile.findFirst({
        where: { companyId, widgetSettingsId: null },
      });
      if (defaultProfile) pricingProfile = defaultProfile as unknown as PricingProfileShape;
    }

    if (!pricingProfile) {
      return NextResponse.json({ error: "Pricing not configured" }, { status: 404 });
    }

    // Try server-side distance first, fall back to client-provided distance
    let distance = await calculateDrivingDistance(startLocation, endLocation);
    if (distance === null && typeof clientDistance === "number" && clientDistance > 0) {
      distance = clientDistance;
    }
    if (distance === null) {
      return NextResponse.json({ error: "Could not calculate distance. Please check your addresses." }, { status: 400 });
    }

    const estimate = estimatePrice(distance, pricingProfile, extras);

    return NextResponse.json({ estimate, distance });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
