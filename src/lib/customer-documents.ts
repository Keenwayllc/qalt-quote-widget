import prisma from "@/lib/prisma";
import { Prisma, type CustomerDocument } from "@/generated/prisma/client";
import { buildQuoteSnapshot, type QuoteSnapshotV1 } from "@/lib/customer-document-snapshots";

// Server-only guard: this module allocates document numbers and creates documents
// using a trusted, server-supplied companyId. It must never run in the browser.
// The `server-only` package (Next.js's build-time poison-import) isn't installed
// in this project and adding a dependency is out of scope for this phase, so we
// fail loudly at module load instead. Replace this with `import "server-only"` if
// that package is ever added.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-documents.ts is server-only and must not be imported into client code."
  );
}

/**
 * Customer-facing document kinds. Stored as a String on CustomerDocument.type
 * (project convention — the schema uses Strings, not Prisma enums). Only these
 * two values are supported in V1.
 */
export type DocumentType = "QUOTE" | "INVOICE";

/** Lifecycle of the document itself (distinct from the underlying QuoteRequest). */
export type DocumentStatus = "DRAFT" | "ISSUED" | "PAID";

const DOCUMENT_TYPES: readonly DocumentType[] = ["QUOTE", "INVOICE"];

export type DocumentErrorCode = "INVALID_TYPE" | "QUOTE_NOT_FOUND" | "ALLOCATION_FAILED";

/**
 * Internal domain error. Carries a stable `code` a future API layer can map to an
 * HTTP response, without leaking database internals to callers.
 */
export class DocumentError extends Error {
  readonly code: DocumentErrorCode;
  constructor(code: DocumentErrorCode, message: string) {
    super(message);
    this.name = "DocumentError";
    this.code = code;
  }
}

function assertDocumentType(type: DocumentType): void {
  if (!DOCUMENT_TYPES.includes(type)) {
    throw new DocumentError("INVALID_TYPE", `Unsupported document type: ${String(type)}`);
  }
}

/**
 * Human-readable document number.
 *   QUOTE   -> "Q-YYYY-NNNNN"   (e.g. Q-2026-00124)
 *   INVOICE -> "INV-YYYY-NNNNN" (e.g. INV-2026-00081)
 * The sequence is 5-digit zero-padded and independent per company, year and type.
 */
export function formatDocumentNumber(type: DocumentType, year: number, seq: number): string {
  const prefix = type === "INVOICE" ? "INV" : "Q";
  return `${prefix}-${year}-${String(seq).padStart(5, "0")}`;
}

/**
 * Atomically allocate the next document number for (companyId, year, type) and
 * return it formatted.
 *
 * MUST be called inside a transaction. A single INSERT ... ON CONFLICT DO UPDATE
 * ... RETURNING both creates the sequence row on first use and increments it under
 * a row lock, so two concurrent callers can never receive the same number. Because
 * the increment lives in the caller's transaction, a later failure in that
 * transaction (e.g. a duplicate-document violation) rolls the increment back and
 * no number is wasted.
 *
 * `nextNumber` means "the next number to allocate". A brand-new row is inserted
 * with nextNumber = 2 because we are simultaneously allocating 1; an existing row
 * is bumped by one. RETURNING (nextNumber - 1) is therefore the number just
 * allocated (1, 2, 3, ...).
 */
export async function allocateDocumentNumber(
  tx: Prisma.TransactionClient,
  companyId: string,
  type: DocumentType,
  year: number
): Promise<string> {
  assertDocumentType(type);

  const rows = await tx.$queryRaw<Array<{ allocated: number }>>`
    INSERT INTO "DocumentSequence" ("id", "companyId", "year", "type", "nextNumber", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, ${companyId}, ${year}, ${type}, 2, now(), now())
    ON CONFLICT ("companyId", "year", "type")
    DO UPDATE SET "nextNumber" = "DocumentSequence"."nextNumber" + 1, "updatedAt" = now()
    RETURNING ("nextNumber" - 1)::int AS allocated
  `;

  const seq = rows[0]?.allocated;
  if (typeof seq !== "number" || !Number.isFinite(seq) || seq < 1) {
    throw new DocumentError("ALLOCATION_FAILED", "Could not allocate a document number.");
  }
  return formatDocumentNumber(type, year, seq);
}

export interface CreateCustomerDocumentInput {
  /** Trusted, server-authenticated company id. Never a browser-supplied value. */
  companyId: string;
  quoteRequestId: string;
  type: DocumentType;
  /** Immutable snapshot — the source of truth for future rendering. */
  snapshot: Prisma.InputJsonValue;
  status?: DocumentStatus;
  issuedAt?: Date | null;
  paidAt?: Date | null;
  metadata?: Prisma.InputJsonValue | null;
  /** Overrides "now" for year derivation (tests). Defaults to the current date. */
  now?: Date;
}

/**
 * Create an immutable CustomerDocument for a quote the company owns, allocating a
 * tenant-scoped number in the same transaction.
 *
 * - Ownership: the QuoteRequest must satisfy { id: quoteRequestId, companyId }. A
 *   cross-tenant pairing throws DocumentError("QUOTE_NOT_FOUND") and creates
 *   nothing (the ownership check runs before any number is allocated).
 * - Idempotent per (quoteRequestId, type): if a document of that type already
 *   exists it is returned unchanged and no new number is consumed. The
 *   @@unique([quoteRequestId, type]) constraint is the concurrency backstop — a
 *   racing second create rolls back entirely (including its sequence increment)
 *   and the committed winner is returned.
 */
export async function createCustomerDocument(
  input: CreateCustomerDocumentInput
): Promise<CustomerDocument> {
  const { companyId, quoteRequestId, type } = input;
  assertDocumentType(type);
  const year = (input.now ?? new Date()).getUTCFullYear();

  try {
    return await prisma.$transaction(async (tx) => {
      // Tenant boundary: a browser-supplied id is an identifier, never authorization.
      const quote = await tx.quoteRequest.findFirst({
        where: { id: quoteRequestId, companyId },
        select: { id: true },
      });
      if (!quote) {
        throw new DocumentError("QUOTE_NOT_FOUND", "Quote not found for this company.");
      }

      // Idempotency fast path: reuse an existing document without burning a number.
      const existing = await tx.customerDocument.findUnique({
        where: { quoteRequestId_type: { quoteRequestId, type } },
      });
      if (existing) return existing;

      const number = await allocateDocumentNumber(tx, companyId, type, year);

      return await tx.customerDocument.create({
        data: {
          companyId,
          quoteRequestId,
          type,
          number,
          status: input.status ?? "DRAFT",
          snapshot: input.snapshot,
          issuedAt: input.issuedAt ?? null,
          paidAt: input.paidAt ?? null,
          metadata: input.metadata ?? undefined,
        },
      });
    });
  } catch (err) {
    // Concurrent create for the same (quoteRequestId, type): the loser's whole
    // transaction rolled back (no number consumed). Return the committed winner so
    // the call stays idempotent rather than surfacing a raw constraint error.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const winner = await prisma.customerDocument.findUnique({
        where: { quoteRequestId_type: { quoteRequestId, type } },
      });
      if (winner) return winner;
    }
    throw err;
  }
}

export interface IssueQuoteDocumentInput {
  /** Trusted, server-authenticated company id. Never a browser-supplied value. */
  companyId: string;
  quoteRequestId: string;
  /** Overrides issue time (tests). Defaults to now. */
  now?: Date;
}

/**
 * Issue (or return the already-issued) immutable QUOTE document for a quote the
 * company owns. Server-only, tenant-scoped, idempotent:
 *
 * - Ownership: the QuoteRequest must satisfy { id, companyId } or QUOTE_NOT_FOUND.
 * - Idempotent: an existing QUOTE document is returned UNCHANGED (never rebuilt),
 *   so later quote/branding edits can't alter an already-issued document.
 * - Otherwise it builds the immutable snapshot from persisted values only (no
 *   geocode, no pricing recompute), creates the CustomerDocument via
 *   createCustomerDocument (status ISSUED, issuedAt set, tenant-scoped number
 *   allocated atomically), then finalizes the snapshot with its allocated number.
 */
export async function issueQuoteDocument(
  input: IssueQuoteDocumentInput
): Promise<CustomerDocument> {
  const { companyId, quoteRequestId } = input;
  const issuedAt = input.now ?? new Date();

  // Ownership + load persisted historical values. A browser-supplied id is an
  // identifier, never authorization: the { id, companyId } filter is the boundary.
  const quote = await prisma.quoteRequest.findFirst({
    where: { id: quoteRequestId, companyId },
    select: {
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      pickupAddress: true,
      dropoffAddress: true,
      pickupZip: true,
      dropoffZip: true,
      distanceMiles: true,
      serviceType: true,
      packageWeight: true,
      itemCount: true,
      vehicleCount: true,
      selectedExtras: true,
      estimatedPrice: true,
      pricingBreakdown: true,
      company: {
        select: {
          name: true,
          logoUrl: true,
          widgetSettings: { take: 1, select: { primaryColor: true } },
        },
      },
    },
  });
  if (!quote) {
    throw new DocumentError("QUOTE_NOT_FOUND", "Quote not found for this company.");
  }

  // Idempotency: an already-issued QUOTE is returned unchanged (never rebuilt).
  const existing = await prisma.customerDocument.findUnique({
    where: { quoteRequestId_type: { quoteRequestId, type: "QUOTE" } },
  });
  if (existing) return existing;

  // Build from persisted values only (number filled in after allocation).
  const preliminary = buildQuoteSnapshot(
    quote,
    {
      name: quote.company.name,
      logoUrl: quote.company.logoUrl,
      brandColor: quote.company.widgetSettings[0]?.primaryColor ?? null,
    },
    { number: "", issuedAt }
  );

  const created = await createCustomerDocument({
    companyId,
    quoteRequestId,
    type: "QUOTE",
    snapshot: preliminary as unknown as Prisma.InputJsonValue,
    status: "ISSUED",
    issuedAt,
    now: issuedAt,
  });

  // Finalize once: embed the allocated number into the immutable snapshot. Skip if
  // a concurrent issuance already finalized this document (reuse, never rebuild).
  const stored = created.snapshot as unknown as QuoteSnapshotV1 | null;
  const alreadyFinalized =
    !!stored && typeof stored === "object" && stored.document?.number === created.number;
  if (alreadyFinalized) return created;

  const base: QuoteSnapshotV1 =
    stored && typeof stored === "object" && stored.version === 1 ? stored : preliminary;
  const finalized: QuoteSnapshotV1 = {
    ...base,
    document: {
      number: created.number,
      issuedAt: base.document.issuedAt || issuedAt.toISOString(),
    },
  };
  return prisma.customerDocument.update({
    where: { id: created.id },
    data: { snapshot: finalized as unknown as Prisma.InputJsonValue },
  });
}
