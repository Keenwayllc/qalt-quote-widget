import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { fireWebhooks } from "@/lib/webhooks";

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
    const updateData: any = {};

    if (status !== undefined) {
      const validStatuses = ["PENDING", "CONFIRMED", "WON", "LOST", "CANCELLED", "PAID"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      updateData.status = status;
    }

    if (internalNotes !== undefined) {
      updateData.internalNotes = internalNotes;
    } // Wait, I need to check if internalNotes exists in prisma schema.

    // Update the quote
    const updatedQuote = await prisma.quoteRequest.update({
      where: { id: resolvedParams.id },
      data: updateData,
    });

    // Fire webhook if status changed (non-blocking)
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

    // Ensure the quote belongs to the company
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
