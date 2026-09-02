import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { estimatePriceDetailed, type PriceLineItem } from "@/lib/calculator";
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
  addon3Fee: number;
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
    const { origin, destination, pickupZip, dropoffZip, clientDistance, extras, formId, vehicleCount } = await req.json();

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
    const distanceResult = await calculateDrivingDistance(startLocation, endLocation);
    let distance: number;
    let durationMinutes: number | null = null;
    if (distanceResult !== null) {
      distance = distanceResult.distanceMiles;
      durationMinutes = distanceResult.durationMinutes;
    } else if (typeof clientDistance === "number" && clientDistance > 0) {
      distance = clientDistance;
    } else {
      return NextResponse.json({ error: "Could not calculate distance. Please check your addresses." }, { status: 400 });
    }

    const detailed = estimatePriceDetailed(distance, pricingProfile, extras);
    let estimate = detailed.total;
    const lineItems: PriceLineItem[] = [...detailed.lineItems];

    // Add vehicle fee if applicable — resolve widget settings same way as pricing profile.
    // Priced in the route (lives in widget settings, not the pricing profile), so the
    // vehicle line item is appended here in the same spot the fee is added to the total.
    if (vehicleCount && vehicleCount > 0) {
      let widgetSettings = null;
      if (formId) {
        widgetSettings = await prisma.widgetSettings.findUnique({ where: { id: formId } });
      }
      if (!widgetSettings) {
        widgetSettings = await prisma.widgetSettings.findFirst({ where: { companyId } });
      }
      if (widgetSettings?.showVehicles && widgetSettings.pricePerVehicle > 0) {
        const vehicleAmount = widgetSettings.pricePerVehicle * vehicleCount;
        estimate += vehicleAmount;
        lineItems.push({
          key: "vehicles",
          label: `Vehicles, ${vehicleCount}`,
          amount: vehicleAmount,
          detail: `${vehicleCount} × $${widgetSettings.pricePerVehicle.toFixed(2)}`,
        });
      }
    }

    const breakdown = {
      total: estimate,
      lineItems,
      distanceMiles: detailed.distanceMiles,
      freeMiles: detailed.freeMiles,
      billableMiles: detailed.billableMiles,
      minimumApplied: detailed.minimumApplied,
    };

    return NextResponse.json({ estimate, distance, durationMinutes, breakdown });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
