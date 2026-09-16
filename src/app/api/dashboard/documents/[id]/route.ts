import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import prisma from "@/lib/prisma";
import { renderCustomerDocumentPdf } from "@/lib/customer-document-pdf";
import { renderPaidInvoiceDocumentPdf } from "@/lib/customer-invoice-pdf";
import { getCustomerFacingContact } from "@/lib/customer-contact";
import { decoratePdfWithCustomerContact } from "@/lib/customer-contact-pdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVATE_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function safeFilename(input: string, fallback: string): string {
  const cleaned = (input || "").replace(/[^A-Za-z0-9._-]/g, "");
  return cleaned.length > 0 ? cleaned : fallback;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const company = await getCurrentCompany();
    const { id } = await params;

    const document = await prisma.customerDocument.findFirst({
      where: { id, companyId: company.id },
    });

    if (!document) {
      return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    }

    if (document.type === "QUOTE" && document.status !== "ISSUED" && document.status !== "PAID") {
      return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    }
    if (document.type === "INVOICE" && document.status !== "PAID") {
      return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
    }

    const basePdf = document.type === "INVOICE"
      ? await renderPaidInvoiceDocumentPdf(document)
      : await renderCustomerDocumentPdf(document);
    const contact = await getCustomerFacingContact(company.id);
    const pdf = await decoratePdfWithCustomerContact(basePdf, contact);

    const fallback = document.type === "INVOICE" ? "invoice" : "quote";
    const filename = `${safeFilename(document.number, fallback)}.pdf`;

    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": String(pdf.byteLength),
        ...PRIVATE_HEADERS,
      },
    });
  } catch (error: unknown) {
    console.error("Dashboard document preview failed:", error instanceof Error ? error.message : String(error));
    return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  }
}
