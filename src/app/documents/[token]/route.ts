import { NextResponse } from "next/server";
import { getPublicQuoteDocument } from "@/lib/customer-document-access";
import { renderCustomerDocumentPdf } from "@/lib/customer-document-pdf";

// Bearer-secret document: never statically generated or CDN-cached, always Node
// runtime (pdf-lib + crypto).
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Applied to every response, including 404s: no caching, no indexing, no referrer.
const PRIVACY_HEADERS: Record<string, string> = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

/**
 * Intentionally boring, uncacheable 404. Indistinguishable across malformed /
 * unknown / revoked / non-public / corrupt-snapshot cases so nothing leaks about
 * whether a document exists.
 */
function notFound(): NextResponse {
  return new NextResponse("Not found", { status: 404, headers: PRIVACY_HEADERS });
}

/** Strip the document number down to filename-safe characters (never header-injectable). */
function safeFilename(input: string): string {
  const cleaned = (input || "").replace(/[^A-Za-z0-9._-]/g, "");
  return cleaned.length > 0 ? cleaned : "quote";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
): Promise<NextResponse> {
  try {
    const { token } = await params;

    // Shape-gate, hash, and tenant-agnostic lookup all happen inside the helper,
    // which returns null (never throws) for every bad path.
    const document = await getPublicQuoteDocument(token);
    if (!document) return notFound();

    let pdf: Uint8Array;
    try {
      // Renders ONLY from the immutable stored snapshot (no Company/QuoteRequest read).
      pdf = await renderCustomerDocumentPdf(document);
    } catch {
      // Corrupt/unsupported snapshot -> same generic 404, no internal detail exposed.
      return notFound();
    }

    const filename = `${safeFilename(document.number)}.pdf`;
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
    // Never surface Prisma errors, stack traces, or internal ids.
    return notFound();
  }
}
