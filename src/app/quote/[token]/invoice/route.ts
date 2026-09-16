import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getPublicQuoteDocument } from "@/lib/customer-document-access";
import { renderPaidInvoiceDocumentPdf } from "@/lib/customer-invoice-pdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVATE_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function notFound() {
  return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
}

function safeFilename(input: string) {
  const cleaned = input.replace(/[^A-Za-z0-9._-]/g, "");
  return cleaned || "paid-invoice";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const quoteDocument = await getPublicQuoteDocument(token);
    if (!quoteDocument) return notFound();

    const invoice = await prisma.customerDocument.findFirst({
      where: {
        quoteRequestId: quoteDocument.quoteRequestId,
        companyId: quoteDocument.companyId,
        type: "INVOICE",
        status: "PAID",
      },
    });
    if (!invoice) return notFound();

    const pdf = await renderPaidInvoiceDocumentPdf(invoice);
    const filename = `${safeFilename(invoice.number)}.pdf`;
    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": String(pdf.byteLength),
        ...PRIVATE_HEADERS,
      },
    });
  } catch {
    return notFound();
  }
}
