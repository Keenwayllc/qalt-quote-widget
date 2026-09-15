import { NextResponse } from "next/server";
import { getPublicCustomerDocument } from "@/lib/customer-document-access";
import { renderCustomerDocumentPdf } from "@/lib/customer-document-pdf";
import { renderPaidInvoiceDocumentPdf } from "@/lib/customer-invoice-pdf";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVACY_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function notFound(): NextResponse {
  return new NextResponse("Not found", { status: 404, headers: PRIVACY_HEADERS });
}

function safeFilename(input: string, fallback: string): string {
  const cleaned = (input || "").replace(/[^A-Za-z0-9._-]/g, "");
  return cleaned.length > 0 ? cleaned : fallback;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
): Promise<NextResponse> {
  try {
    const { token } = await params;
    const document = await getPublicCustomerDocument(token);
    if (!document) return notFound();

    let pdf: Uint8Array;
    try {
      pdf = document.type === "INVOICE"
        ? await renderPaidInvoiceDocumentPdf(document)
        : await renderCustomerDocumentPdf(document);
    } catch {
      return notFound();
    }

    const fallback = document.type === "INVOICE" ? "invoice" : "quote";
    const filename = `${safeFilename(document.number, fallback)}.pdf`;
    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Content-Length": String(pdf.byteLength),
        ...PRIVACY_HEADERS,
      },
    });
  } catch {
    return notFound();
  }
}
