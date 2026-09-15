import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { fireWebhooks } from "@/lib/webhooks";
import { issueQuoteDocument } from "@/lib/customer-documents";
import { createPublicDocumentAccess } from "@/lib/customer-document-access";
import { sendQuoteDocumentEmail } from "@/lib/customer-document-email";
import type { CustomerDocument } from "@/generated/prisma/client";

function documentDto(document: CustomerDocument) {
  return {
    id: document.id,
    type: document.type,
    number: document.number,
    status: document.status,
    issuedAt: document.issuedAt,
    paidAt: document.paidAt,
    lastEmailedAt: document.lastEmailedAt,
    lastViewedAt: document.lastViewedAt,
  };
}

async function getOwnedQuote(companyId: string, quoteId: string) {
  return prisma.quoteRequest.findFirst({
    where: { id: quoteId, companyId, deletedAt: null },
    select: { id: true, companyId: true },
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const quote = await getOwnedQuote(company.id, id);
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const documents = await prisma.customerDocument.findMany({
      where: { quoteRequestId: quote.id, companyId: company.id },
      orderBy: { createdAt: "asc" },
    });

    documents.sort((a, b) => {
      if (a.type === b.type) return 0;
      if (a.type === "QUOTE") return -1;
      if (b.type === "QUOTE") return 1;
      return 0;
    });

    return NextResponse.json({ documents: documents.map(documentDto) });
  } catch (error: unknown) {
    console.error("Error loading quote documents:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Could not load documents" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;
    const quote = await getOwnedQuote(company.id, id);
    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    const body = (await request.json()) as { action?: string };
    const action = body.action;

    if (action === "issue_quote") {
      const document = await issueQuoteDocument({
        companyId: company.id,
        quoteRequestId: quote.id,
      });
      return NextResponse.json({ document: documentDto(document) });
    }

    if (action === "view_quote") {
      const document = await issueQuoteDocument({
        companyId: company.id,
        quoteRequestId: quote.id,
      });
      const access = await createPublicDocumentAccess({
        companyId: company.id,
        documentId: document.id,
      });
      // Only the one-time plaintext bearer token is returned. The database stores
      // only its SHA-256 hash. Creating a fresh view link invalidates an older one.
      return NextResponse.json({ url: `/documents/${access.token}` });
    }

    if (action === "email_quote") {
      const result = await sendQuoteDocumentEmail({
        companyId: company.id,
        quoteRequestId: quote.id,
      });
      return NextResponse.json({
        success: true,
        lastEmailedAt: result.document.lastEmailedAt,
      });
    }

    if (action === "view_invoice") {
      // Phase 18 creates the immutable paid invoice record, but the current public
      // renderer is quote-only. Do not pretend the invoice is downloadable yet.
      return NextResponse.json({ error: "Invoice PDF coming next" }, { status: 409 });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error: unknown) {
    console.error("Quote document action failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Document action could not be completed" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const resolvedParams = await params;
    const body = await request.json();

    // Ensure the quote belongs to the company
    const existingQuote = await prisma.quoteRequest.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!existingQuote || existingQuote.companyId !== company.id) {
      return NextResponse.json({ error: "Quote not found or unauthorized" }, { status: 404 });
    }

    const { status, internalNotes } = body;
    const updateData: Record<string, unknown> = {};

    if (status !== undefined) {
      const validStatuses = ["PENDING", "CONFIRMED", "WON", "LOST", "CANCELLED", "PAID"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updateData.status = status;
    }

    if (internalNotes !== undefined) {
      updateData.internalNotes = internalNotes;
    }

    const updatedQuote = await prisma.quoteRequest.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });

    if (status !== undefined && status !== existingQuote.status) {
      fireWebhooks(company.id, "quote.status_changed", {
        quote: { ...updatedQuote, previousStatus: existingQuote.status },
      });
    }

    return NextResponse.json(updatedQuote);
  } catch (error: unknown) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}

// Soft-delete (archive) a quote: hide it from the merchant's views without
// erasing the record or breaking any linked Job.
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const company = await getCurrentCompany();
    const resolvedParams = await params;

    const existingQuote = await prisma.quoteRequest.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!existingQuote || existingQuote.companyId !== company.id) {
      return NextResponse.json({ error: "Quote not found or unauthorized" }, { status: 404 });
    }

    await prisma.quoteRequest.update({
      where: { id: resolvedParams.id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}
