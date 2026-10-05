import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import type { EstimateExtras } from "@/lib/calculator";
import { computeAuthoritativeQuote } from "@/lib/serverQuotePricing";
import { hasDuplicateConsecutiveLocations, normalizeIntermediateStops, routeLocations } from "@/lib/route-stops";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const { origin, destination, pickupZip, dropoffZip, intermediateStops: rawStops, clientDistance, extras, formId, vehicleCount, vehicleType, serviceType, compareServices, customAnswers } = await req.json();

    const startLocation = origin || pickupZip;
    const endLocation = destination || dropoffZip;

    const intermediateStops = normalizeIntermediateStops(rawStops);
    if (Array.isArray(rawStops) && intermediateStops.length !== rawStops.length) {
      return NextResponse.json({ error: "Each additional stop must be selected from the address suggestions." }, { status: 422 });
    }
    const locations = routeLocations(String(startLocation || ""), intermediateStops, String(endLocation || ""));

    if (hasDuplicateConsecutiveLocations(locations)) {
      return NextResponse.json(
        { error: "Consecutive route locations must be different." },
        { status: 400 }
      );
    }

    const result = await computeAuthoritativeQuote({
      companyId,
      compareServices: compareServices === true,
      customAnswers,
      formId: formId ?? null,
      startLocation,
      endLocation,
      intermediateStops,
      extras: (extras ?? {
        hasStairs: false,
        needsInsideDelivery: false,
        needsAddon3: false,
      }) as EstimateExtras,
      vehicleCount: typeof vehicleCount === "number" ? vehicleCount : parseInt(vehicleCount) || 0,
      vehicleType: typeof vehicleType === "string" ? vehicleType : null,
      clientDistanceFallback: typeof clientDistance === "number" ? clientDistance : null,
      serviceType: typeof serviceType === "string" ? serviceType : null,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { total, distance, durationMinutes, breakdown, serviceType: resolvedServiceType, vehicleType: resolvedVehicleType, serviceComparisons } = result.quote;
    return NextResponse.json({ estimate: total, distance, durationMinutes, breakdown, serviceType: resolvedServiceType, vehicleType: resolvedVehicleType, serviceComparisons });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
