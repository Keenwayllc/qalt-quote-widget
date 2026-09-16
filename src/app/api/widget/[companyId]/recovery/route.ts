import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { convertAbandonedQuote, upsertAbandonedQuote, type AbandonedQuoteStage } from "@/lib/abandoned-quotes";

export const dynamic = "force-dynamic";

const STAGES = new Set<AbandonedQuoteStage>(["STARTED", "ROUTE", "QUOTE", "CONTACT"]);

export async function POST(req: Request, { params }: { params: Promise<{ companyId: string }> }) {
  try {
    const { companyId } = await params;
    const body = await req.json();
    const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim().slice(0, 120) : "";
    if (!sessionId) return NextResponse.json({ error: "sessionId is required" }, { status: 400 });

    const company = await prisma.company.findUnique({ where: { id: companyId }, select: { id: true } });
    if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });

    const formId = typeof body.formId === "string" && body.formId ? body.formId : null;
    if (formId) {
      const form = await prisma.widgetSettings.findFirst({ where: { id: formId, companyId }, select: { id: true } });
      if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (body.action === "convert") {
      await convertAbandonedQuote(companyId, sessionId, typeof body.quoteRequestId === "string" ? body.quoteRequestId : null);
      return NextResponse.json({ success: true });
    }

    const email = typeof body.customerEmail === "string" ? body.customerEmail.trim() : "";
    const phone = typeof body.customerPhone === "string" ? body.customerPhone.trim() : "";
    if (!email && !phone) {
      return NextResponse.json({ success: true, skipped: true });
    }

    const stage = STAGES.has(body.stage as AbandonedQuoteStage) ? (body.stage as AbandonedQuoteStage) : "CONTACT";
    await upsertAbandonedQuote({
      companyId,
      formId,
      sessionId,
      customerName: body.customerName,
      customerEmail: email,
      customerPhone: phone,
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      pickupZip: body.pickupZip,
      dropoffZip: body.dropoffZip,
      estimatedPrice: body.estimatedPrice,
      distanceMiles: body.distanceMiles,
      stage,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Abandoned quote recovery error:", error);
    return NextResponse.json({ error: "Could not save recovery session" }, { status: 500 });
  }
}
