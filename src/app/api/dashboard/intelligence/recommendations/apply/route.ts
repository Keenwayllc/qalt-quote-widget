import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { loadMerchantIntelligence } from "@/lib/merchant-intelligence-data";

const PRIVATE = { "Cache-Control": "private, no-store" };

/**
 * Applies one pricing proposal after explicit merchant confirmation. The
 * proposal is recomputed on the server; the client only names it and echoes
 * the value it confirmed, so a stale or edited request changes nothing.
 * Only new quotes use the new rate: saved quotes keep their stored price and
 * Stripe checkout charges that stored price.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (body?.confirm !== true || typeof body?.recommendationId !== "string") {
      return NextResponse.json({ error: "Confirm the change before saving" }, { status: 400, headers: PRIVATE });
    }
    const data = await loadMerchantIntelligence();
    const proposal = data.recommendations.find((r) => r.id === body.recommendationId)?.proposal;
    if (!proposal) {
      return NextResponse.json({ error: "This recommendation is no longer available. Refresh to see the latest." }, { status: 409, headers: PRIVATE });
    }
    if (Number(body.proposed) !== proposal.proposed) {
      return NextResponse.json({ error: "The suggested value changed. Review it again before saving." }, { status: 409, headers: PRIVATE });
    }
    const result = await prisma.pricingProfile.updateMany({
      where: { id: proposal.profileId, companyId: data.companyId, widgetSettingsId: null },
      data: { [proposal.field]: proposal.proposed },
    });
    if (result.count !== 1) {
      return NextResponse.json({ error: "Pricing profile not found" }, { status: 404, headers: PRIVATE });
    }
    return NextResponse.json({ ok: true, field: proposal.field, value: proposal.proposed }, { headers: PRIVATE });
  } catch (error) {
    console.error("[intelligence] apply recommendation failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not save the change. Nothing was updated." }, { status: 500, headers: PRIVATE });
  }
}
