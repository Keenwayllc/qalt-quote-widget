import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import { deleteAbandonedQuote, getOpenAbandonedQuote } from "@/lib/abandoned-quotes";
import { sendAbandonedQuoteRecoveryEmail } from "@/lib/abandoned-quote-email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const lead = await getOpenAbandonedQuote(company.id, id);
    if (!lead) {
      return NextResponse.json({ error: "Abandoned quote not found" }, { status: 404 });
    }

    const body = (await request.json().catch(() => ({}))) as { action?: string };
    if (body.action !== "send_recovery") {
      return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
    }
    if (!lead.customerEmail) {
      return NextResponse.json({ error: "This lead has no email address" }, { status: 400 });
    }

    await sendAbandonedQuoteRecoveryEmail({ companyId: company.id, lead });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Abandoned quote action failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Recovery email could not be sent" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const deleted = await deleteAbandonedQuote(company.id, id);
    if (!deleted) {
      return NextResponse.json({ error: "Abandoned quote not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Abandoned quote delete failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Abandoned quote could not be deleted" }, { status: 500 });
  }
}
