import prisma from "@/lib/prisma";
import { Prisma, type CustomerDocument } from "@/generated/prisma/client";
import { createCustomerDocument, issueQuoteDocument } from "@/lib/customer-documents";
import { parseQuoteSnapshot, type QuoteSnapshotV1 } from "@/lib/customer-document-snapshots";

// Server-only: creates immutable paid invoice records from a Stripe-confirmed quote.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-invoice-documents.ts is server-only and must not be imported into client code."
  );
}

export interface InvoiceSnapshotV1 {
  version: 1;
  documentType: "INVOICE";
  merchant: QuoteSnapshotV1["merchant"];
  document: {
    number: string;
    issuedAt: string;
    paidAt: string;
  };
  customer: QuoteSnapshotV1["customer"];
  route: QuoteSnapshotV1["route"];
  shipment: QuoteSnapshotV1["shipment"];
  pricing: QuoteSnapshotV1["pricing"];
  payment: {
    status: "PAID";
  };
}

export class PaidInvoiceError extends Error {
  constructor(
    public readonly code: "QUOTE_NOT_FOUND" | "QUOTE_NOT_PAID" | "PAYMENT_MISMATCH",
    message: string
  ) {
    super(message);
    this.name = "PaidInvoiceError";
  }
}

export interface IssuePaidInvoiceDocumentInput {
  /** Trusted company id from the already-verified Stripe/tenant binding. */
  companyId: string;
  quoteRequestId: string;
  /** Stripe PaymentIntent that was verified against this quote by the webhook. */
  stripePaymentIntentId: string;
  /** Stable payment time supplied by the webhook. Persisted quote.paidAt wins when present. */
  paidAt?: Date;
}

/**
 * Create or return the immutable PAID invoice for a paid quote.
 *
 * Security / consistency rules:
 * - tenant-scoped quote lookup ({ id, companyId })
 * - quote must already be PAID
 * - persisted PaymentIntent id must match the verified Stripe event
 * - at most one INVOICE per quote (Phase 14 unique constraint + helper idempotency)
 * - invoice body is cloned from the immutable QUOTE snapshot, never recalculated
 * - existing invoice is returned unchanged on webhook retries
 */
export async function issuePaidInvoiceDocument(
  input: IssuePaidInvoiceDocumentInput
): Promise<CustomerDocument> {
  const quote = await prisma.quoteRequest.findFirst({
    where: { id: input.quoteRequestId, companyId: input.companyId },
    select: {
      id: true,
      paymentStatus: true,
      stripePaymentIntentId: true,
      paidAt: true,
    },
  });

  if (!quote) {
    throw new PaidInvoiceError("QUOTE_NOT_FOUND", "Quote not found for this company.");
  }
  if (quote.paymentStatus !== "PAID") {
    throw new PaidInvoiceError("QUOTE_NOT_PAID", "Quote is not paid.");
  }
  if (
    !quote.stripePaymentIntentId ||
    quote.stripePaymentIntentId !== input.stripePaymentIntentId
  ) {
    throw new PaidInvoiceError(
      "PAYMENT_MISMATCH",
      "Payment intent does not match the paid quote."
    );
  }

  // Idempotent fast path: never rebuild or rewrite an already-issued invoice.
  const existing = await prisma.customerDocument.findUnique({
    where: {
      quoteRequestId_type: { quoteRequestId: quote.id, type: "INVOICE" },
    },
  });
  if (existing) return existing;

  const paidAt = quote.paidAt ?? input.paidAt ?? new Date();

  // Ensure there is a canonical immutable quote snapshot to copy. If Phase 17 or
  // a dashboard action already issued it, this returns it unchanged. Otherwise it
  // is created from the persisted historical quote values exactly once.
  const quoteDocument = await issueQuoteDocument({
    companyId: input.companyId,
    quoteRequestId: quote.id,
    now: paidAt,
  });
  const quoteSnapshot = parseQuoteSnapshot(quoteDocument.snapshot);

  const preliminary: InvoiceSnapshotV1 = {
    version: 1,
    documentType: "INVOICE",
    merchant: quoteSnapshot.merchant,
    document: {
      number: "",
      issuedAt: paidAt.toISOString(),
      paidAt: paidAt.toISOString(),
    },
    customer: quoteSnapshot.customer,
    route: quoteSnapshot.route,
    shipment: quoteSnapshot.shipment,
    pricing: quoteSnapshot.pricing,
    payment: { status: "PAID" },
  };

  const created = await createCustomerDocument({
    companyId: input.companyId,
    quoteRequestId: quote.id,
    type: "INVOICE",
    snapshot: preliminary as unknown as Prisma.InputJsonValue,
    status: "PAID",
    issuedAt: paidAt,
    paidAt,
    now: paidAt,
  });

  // Finalize the allocated invoice number once. A concurrent webhook delivery may
  // have won the race and already finalized the same invoice; in that case reuse it.
  const stored = created.snapshot as unknown as InvoiceSnapshotV1 | null;
  const alreadyFinalized =
    !!stored &&
    typeof stored === "object" &&
    stored.documentType === "INVOICE" &&
    stored.document?.number === created.number;
  if (alreadyFinalized) return created;

  const base: InvoiceSnapshotV1 =
    stored &&
    typeof stored === "object" &&
    stored.version === 1 &&
    stored.documentType === "INVOICE"
      ? stored
      : preliminary;

  const finalized: InvoiceSnapshotV1 = {
    ...base,
    document: {
      number: created.number,
      issuedAt: base.document.issuedAt || paidAt.toISOString(),
      paidAt: base.document.paidAt || paidAt.toISOString(),
    },
  };

  return prisma.customerDocument.update({
    where: { id: created.id },
    data: { snapshot: finalized as unknown as Prisma.InputJsonValue },
  });
}
