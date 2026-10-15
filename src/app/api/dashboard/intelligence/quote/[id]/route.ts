import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { estimateProfit, type IntelQuote } from "@/lib/merchant-intelligence";
import { loadCostProfiles, QUOTE_SELECT } from "@/lib/merchant-intelligence-data";

const PRIVATE = { "Cache-Control": "private, no-store" };

/** Merchant-only profit estimate for one quote. Never part of a public response. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const [quote, costs] = await Promise.all([
      prisma.quoteRequest.findFirst({ where: { id, companyId: company.id, deletedAt: null }, select: QUOTE_SELECT }),
      loadCostProfiles(company.id),
    ]);
    if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404, headers: PRIVATE });
    return NextResponse.json(
      { estimate: estimateProfit(quote as IntelQuote, costs.profiles), costsReady: costs.available },
      { headers: PRIVATE },
    );
  } catch (error) {
    console.error("[intelligence] quote estimate failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not estimate this quote" }, { status: 500, headers: PRIVATE });
  }
}
