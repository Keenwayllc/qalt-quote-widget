import { sanitizeHex, DEFAULT_BRAND } from "@/lib/color";

// Server-only: builds and validates the immutable JSON snapshot that backs a
// customer document. Kept out of client bundles (it encodes internal pricing
// structure). Replace with `import "server-only"` if that package is ever added.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-document-snapshots.ts is server-only and must not be imported into client code."
  );
}

/**
 * Versioned, JSON-serializable snapshot of a QUOTE at issue time. This is the
 * SINGLE source of truth for rendering: once stored on a CustomerDocument it must
 * never be recomputed from mutable pricing settings or re-geocoded. It deliberately
 * excludes auth/session data, Stripe identifiers, public tokens, and internal ids.
 */
export interface QuoteSnapshotLineItem {
  description: string;
  detail: string | null;
  amount: number;
}

export interface QuoteSnapshotV1 {
  version: 1;
  documentType: "QUOTE";
  merchant: {
    name: string;
    /** Validated #RRGGBB (never trusted raw; re-sanitized on parse). */
    brandColor: string;
    /** Stored for later phases; never server-fetched during rendering. */
    logoUrl: string | null;
  };
  document: {
    number: string;
    issuedAt: string; // ISO 8601
  };
  customer: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
  route: {
    pickupAddress: string | null;
    dropoffAddress: string | null;
    distanceMiles: number | null;
  };
  shipment: {
    itemCount: number | null;
    weight: string | null;
    serviceType: string | null;
    vehicleCount: number | null;
    date: string | null;
    time: string | null;
    addOns: string[];
  };
  pricing: {
    currency: "USD";
    lineItems: QuoteSnapshotLineItem[];
    total: number;
  };
}

/** Persisted QuoteRequest fields the snapshot is derived from (historical values only). */
export interface QuoteSnapshotQuoteSource {
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  pickupAddress: string | null;
  dropoffAddress: string | null;
  pickupZip: string;
  dropoffZip: string;
  distanceMiles: number;
  serviceType: string;
  packageWeight: string | null;
  itemCount: number | null;
  vehicleCount: number | null;
  selectedExtras: string | null;
  estimatedPrice: number;
  /** Persisted server-authoritative breakdown (Prisma JSON). Never recomputed. */
  pricingBreakdown: unknown;
}

/** Merchant branding captured at issue time (from Company + its widget settings). */
export interface QuoteSnapshotMerchantSource {
  name: string;
  logoUrl: string | null;
  brandColor: string | null;
}

// --- small coercion helpers (defensive; inputs may be persisted JSON) ---
const asRecord = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" ? (v as Record<string, unknown>) : {};
const str = (v: unknown): string | null =>
  typeof v === "string" && v.trim() ? v.trim() : null;
const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;
const round1 = (n: number): number => Math.round(n * 10) / 10;

interface ParsedExtras {
  hasStairs: boolean;
  stairsFlights: number;
  needsInsideDelivery: boolean;
  needsAddon3: boolean;
  pickupDateTime: string | null;
  selectedLargeItems: string[];
}

function parseSelectedExtras(raw: string | null): ParsedExtras {
  const empty: ParsedExtras = {
    hasStairs: false,
    stairsFlights: 0,
    needsInsideDelivery: false,
    needsAddon3: false,
    pickupDateTime: null,
    selectedLargeItems: [],
  };
  if (!raw) return empty;
  try {
    const o = asRecord(JSON.parse(raw));
    return {
      hasStairs: Boolean(o.hasStairs),
      stairsFlights: num(o.stairsFlights) ?? 0,
      needsInsideDelivery: Boolean(o.needsInsideDelivery),
      needsAddon3: Boolean(o.needsAddon3),
      pickupDateTime: str(o.pickupDateTime),
      selectedLargeItems: Array.isArray(o.selectedLargeItems)
        ? o.selectedLargeItems.filter((x): x is string => typeof x === "string" && x.trim() !== "")
        : [],
    };
  } catch {
    return empty;
  }
}

function splitDateTime(dt: string | null): { date: string | null; time: string | null } {
  if (!dt) return { date: null, time: null };
  const [datePart, timePart] = dt.split("T");
  return { date: datePart || null, time: timePart ? timePart.slice(0, 5) : null };
}

function buildAddOns(extras: ParsedExtras): string[] {
  const out: string[] = [];
  if (extras.hasStairs) {
    out.push(
      extras.stairsFlights > 0
        ? `Stairs (${extras.stairsFlights} flight${extras.stairsFlights === 1 ? "" : "s"})`
        : "Stairs"
    );
  }
  if (extras.needsInsideDelivery) out.push("Inside delivery");
  if (extras.needsAddon3) out.push("Additional service");
  for (const item of extras.selectedLargeItems) out.push(item);
  return out;
}

function extractPricing(breakdown: unknown, estimatedPrice: number): QuoteSnapshotV1["pricing"] {
  const b = asRecord(breakdown);
  const lineItems: QuoteSnapshotLineItem[] = Array.isArray(b.lineItems)
    ? b.lineItems
        .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
        .map((x) => ({
          description: str(x.label) ?? str(x.description) ?? str(x.key) ?? "Charge",
          detail: str(x.detail),
          amount: num(x.amount) ?? 0,
        }))
    : [];
  const total = num(b.total) ?? (Number.isFinite(estimatedPrice) ? estimatedPrice : 0);
  return { currency: "USD", lineItems, total };
}

function zipFallback(zip: string): string | null {
  const z = str(zip);
  return z ? `ZIP ${z}` : null;
}

/**
 * Build the immutable quote snapshot from persisted values only. Does NOT geocode,
 * recalculate pricing, or read mutable pricing settings — the historical
 * QuoteRequest.pricingBreakdown / estimatedPrice is the authoritative source.
 */
export function buildQuoteSnapshot(
  quote: QuoteSnapshotQuoteSource,
  merchant: QuoteSnapshotMerchantSource,
  opts: { number: string; issuedAt: Date }
): QuoteSnapshotV1 {
  const extras = parseSelectedExtras(quote.selectedExtras);
  const { date, time } = splitDateTime(extras.pickupDateTime);
  const distance = num(quote.distanceMiles);

  return {
    version: 1,
    documentType: "QUOTE",
    merchant: {
      name: str(merchant.name) ?? "",
      brandColor: sanitizeHex(merchant.brandColor) ?? DEFAULT_BRAND,
      logoUrl: str(merchant.logoUrl),
    },
    document: {
      number: str(opts.number) ?? "",
      issuedAt: opts.issuedAt.toISOString(),
    },
    customer: {
      name: str(quote.customerName),
      email: str(quote.customerEmail),
      phone: str(quote.customerPhone),
    },
    route: {
      pickupAddress: str(quote.pickupAddress) ?? zipFallback(quote.pickupZip),
      dropoffAddress: str(quote.dropoffAddress) ?? zipFallback(quote.dropoffZip),
      distanceMiles: distance !== null ? round1(distance) : null,
    },
    shipment: {
      itemCount: num(quote.itemCount),
      weight: str(quote.packageWeight),
      serviceType: str(quote.serviceType),
      vehicleCount: num(quote.vehicleCount),
      date,
      time,
      addOns: buildAddOns(extras),
    },
    pricing: extractPricing(quote.pricingBreakdown, quote.estimatedPrice),
  };
}

/**
 * Validate and normalize a stored snapshot into a safe QuoteSnapshotV1 for
 * rendering. Coerces every field, drops anything unexpected, and RE-SANITIZES the
 * brand color (never trust an arbitrary color string from stored input). Throws
 * only when the input is not an object at all.
 */
export function parseQuoteSnapshot(raw: unknown): QuoteSnapshotV1 {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid quote snapshot: expected an object.");
  }
  const s = raw as Record<string, unknown>;
  const m = asRecord(s.merchant);
  const d = asRecord(s.document);
  const c = asRecord(s.customer);
  const r = asRecord(s.route);
  const sh = asRecord(s.shipment);
  const p = asRecord(s.pricing);

  const lineItems: QuoteSnapshotLineItem[] = Array.isArray(p.lineItems)
    ? p.lineItems
        .filter((x): x is Record<string, unknown> => !!x && typeof x === "object")
        .map((x) => ({
          description: str(x.description) ?? str(x.label) ?? "Charge",
          detail: str(x.detail),
          amount: num(x.amount) ?? 0,
        }))
    : [];

  return {
    version: 1,
    documentType: "QUOTE",
    merchant: {
      name: str(m.name) ?? "",
      brandColor: sanitizeHex(m.brandColor) ?? DEFAULT_BRAND,
      logoUrl: str(m.logoUrl),
    },
    document: {
      number: str(d.number) ?? "",
      issuedAt: str(d.issuedAt) ?? "",
    },
    customer: {
      name: str(c.name),
      email: str(c.email),
      phone: str(c.phone),
    },
    route: {
      pickupAddress: str(r.pickupAddress),
      dropoffAddress: str(r.dropoffAddress),
      distanceMiles: num(r.distanceMiles),
    },
    shipment: {
      itemCount: num(sh.itemCount),
      weight: str(sh.weight),
      serviceType: str(sh.serviceType),
      vehicleCount: num(sh.vehicleCount),
      date: str(sh.date),
      time: str(sh.time),
      addOns: Array.isArray(sh.addOns)
        ? sh.addOns.filter((a): a is string => typeof a === "string" && a.trim() !== "").map((a) => a.trim())
        : [],
    },
    pricing: {
      currency: "USD",
      lineItems,
      total: num(p.total) ?? 0,
    },
  };
}
