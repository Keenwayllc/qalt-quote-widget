import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import type { EstimateExtras } from "@/lib/calculator";
import { computeAuthoritativeQuote } from "@/lib/serverQuotePricing";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const { origin, destination, pickupZip, dropoffZip, clientDistance, extras, formId, vehicleCount, vehicleType, serviceType } = await req.json();

    const startLocation = origin || pickupZip;
    const endLocation = destination || dropoffZip;

    const normalizedStart = typeof startLocation === "string" ? startLocation.trim().toLowerCase() : "";
    const normalizedEnd = typeof endLocation === "string" ? endLocation.trim().toLowerCase() : "";

    if (normalizedStart && normalizedEnd && normalizedStart === normalizedEnd) {
      return NextResponse.json(
        { error: "Pickup and dropoff addresses must be different." },
        { status: 400 }
      );
    }

    const result = await computeAuthoritativeQuote({
      companyId,
      formId: formId ?? null,
      startLocation,
      endLocation,
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

    const { total, distance, durationMinutes, breakdown, serviceType: resolvedServiceType, vehicleType: resolvedVehicleType } = result.quote;
    return NextResponse.json({ estimate: total, distance, durationMinutes, breakdown, serviceType: resolvedServiceType, vehicleType: resolvedVehicleType });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
