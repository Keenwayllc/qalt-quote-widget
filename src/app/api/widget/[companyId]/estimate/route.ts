import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import type { EstimateExtras } from "@/lib/calculator";
import { computeAuthoritativeQuote } from "@/lib/serverQuotePricing";

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const { origin, destination, pickupZip, dropoffZip, clientDistance, extras, formId, vehicleCount } = await req.json();

    const startLocation = origin || pickupZip;
    const endLocation = destination || dropoffZip;

    // Shared server pricing. The estimate is a preview, so a client-supplied
    // distance may be used as a fallback when routing is unavailable.
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
      clientDistanceFallback: typeof clientDistance === "number" ? clientDistance : null,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const { total, distance, durationMinutes, breakdown } = result.quote;
    return NextResponse.json({ estimate: total, distance, durationMinutes, breakdown });
  } catch (error) {
    console.error("Estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
