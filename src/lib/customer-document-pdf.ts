import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { sanitizeHex, DEFAULT_BRAND } from "@/lib/color";
import {
  parseQuoteSnapshot,
  type QuoteSnapshotV1,
  type QuoteSnapshotLineItem,
} from "@/lib/customer-document-snapshots";
import type { CustomerDocument } from "@/generated/prisma/client";

// Server-only: pdf-lib is a heavy dependency that must never ship to the browser,
// and rendering is a server responsibility. Replace with `import "server-only"` if
// that package is ever added.
if (typeof window !== "undefined") {
  throw new Error(
    "customer-document-pdf.ts is server-only and must not be imported into client code."
  );
}

// US Letter, in PDF points.
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_LIMIT = 78; // content stops above the footer

const INK = rgb(0.07, 0.086, 0.145);
const MUTED = rgb(0.42, 0.45, 0.5);
const RULE = rgb(0.85, 0.87, 0.9);

const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatUSD(n: number): string {
  return usdFormatter.format(Number.isFinite(n) ? n : 0);
}

function formatIssuedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function formatShipDate(value: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(d);
    }
  }
  return value;
}

// Restrict to WinAnsi-safe characters: the 14 standard PDF fonts throw on any
// glyph they cannot encode. Common smart punctuation is folded to ASCII; anything
// outside printable ASCII / Latin-1 becomes "?". Char-code iteration (not a regex)
// keeps this clear of control-character lint rules.
function winAnsi(text: string): string {
  const normalized = text
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...");
  let out = "";
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    const printable = (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff);
    out += printable ? normalized[i] : " ";
  }
  return out;
}

function hexToColor(hex: string) {
  const h = sanitizeHex(hex) ?? DEFAULT_BRAND;
  return rgb(
    parseInt(h.slice(1, 3), 16) / 255,
    parseInt(h.slice(3, 5), 16) / 255,
    parseInt(h.slice(5, 7), 16) / 255
  );
}

interface Ctx {
  doc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  accent: ReturnType<typeof rgb>;
  y: number;
  pageIndex: number;
  docNumber: string;
}

/** Break text into lines fitting `maxWidth`, hard-breaking any single over-long token. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = winAnsi(text).split(/\s+/).filter((w) => w.length > 0);
  if (words.length === 0) return [""];
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
      continue;
    }
    if (line) {
      lines.push(line);
      line = "";
    }
    if (font.widthOfTextAtSize(w, size) <= maxWidth) {
      line = w;
      continue;
    }
    let chunk = "";
    for (const ch of w) {
      if (font.widthOfTextAtSize(chunk + ch, size) <= maxWidth) {
        chunk += ch;
      } else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    line = chunk;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawFooter(ctx: Ctx): void {
  const size = 8;
  const y = 34;
  ctx.page.drawText(winAnsi(ctx.docNumber || "Quote"), { x: MARGIN, y, size, font: ctx.font, color: MUTED });
  const label = `Page ${ctx.pageIndex}`;
  const w = ctx.font.widthOfTextAtSize(label, size);
  ctx.page.drawText(label, { x: PAGE_W - MARGIN - w, y, size, font: ctx.font, color: MUTED });
}

function addPage(ctx: Ctx): void {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.pageIndex += 1;
  ctx.y = PAGE_H - MARGIN;
  drawFooter(ctx);
}

function ensureSpace(ctx: Ctx, needed: number): void {
  if (ctx.y - needed < BOTTOM_LIMIT) addPage(ctx);
}

function sectionTitle(ctx: Ctx, title: string): void {
  ctx.y -= 12;
  ensureSpace(ctx, 24);
  ctx.page.drawText(winAnsi(title), { x: MARGIN, y: ctx.y - 12, size: 12, font: ctx.bold, color: ctx.accent });
  ctx.y -= 16;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y + 4, width: CONTENT_W, height: 0.8, color: RULE });
  ctx.y -= 8;
}

function keyValue(ctx: Ctx, label: string, value: string | number | null): void {
  if (value === null || value === "") return;
  const text = typeof value === "number" ? String(value) : value;
  const labelSize = 8.5;
  const valueSize = 10.5;
  const gap = 4;
  const valueX = MARGIN + 100;
  const valueMaxW = CONTENT_W - 100;
  const lines = wrapText(text, ctx.font, valueSize, valueMaxW);
  ensureSpace(ctx, lines.length * (valueSize + gap) + 3);
  ctx.page.drawText(winAnsi(label.toUpperCase()), {
    x: MARGIN,
    y: ctx.y - valueSize,
    size: labelSize,
    font: ctx.bold,
    color: MUTED,
  });
  for (const ln of lines) {
    ctx.page.drawText(ln, { x: valueX, y: ctx.y - valueSize, size: valueSize, font: ctx.font, color: INK });
    ctx.y -= valueSize + gap;
  }
  ctx.y -= 3;
}

function priceHeader(ctx: Ctx): void {
  const size = 8.5;
  ensureSpace(ctx, size + 8);
  ctx.page.drawText("DESCRIPTION", { x: MARGIN, y: ctx.y - size, size, font: ctx.bold, color: MUTED });
  const aw = ctx.bold.widthOfTextAtSize("AMOUNT", size);
  ctx.page.drawText("AMOUNT", { x: PAGE_W - MARGIN - aw, y: ctx.y - size, size, font: ctx.bold, color: MUTED });
  ctx.y -= size + 6;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y + 3, width: CONTENT_W, height: 0.8, color: RULE });
  ctx.y -= 6;
}

function priceRow(ctx: Ctx, item: QuoteSnapshotLineItem): void {
  const size = 10.5;
  const gap = 4;
  const amountStr = formatUSD(item.amount);
  const amountW = ctx.font.widthOfTextAtSize(amountStr, size);
  const descMaxW = CONTENT_W - 90;
  const descLines = wrapText(item.description, ctx.font, size, descMaxW);
  const detailLines = item.detail ? wrapText(item.detail, ctx.font, 9, descMaxW) : [];
  const blockH = descLines.length * (size + gap) + detailLines.length * (9 + 2) + 5;
  ensureSpace(ctx, blockH);
  const topBaseline = ctx.y - size;
  for (const ln of descLines) {
    ctx.page.drawText(ln, { x: MARGIN, y: ctx.y - size, size, font: ctx.font, color: INK });
    ctx.y -= size + gap;
  }
  for (const ln of detailLines) {
    ctx.page.drawText(ln, { x: MARGIN, y: ctx.y - 9, size: 9, font: ctx.font, color: MUTED });
    ctx.y -= 9 + 2;
  }
  ctx.page.drawText(amountStr, { x: PAGE_W - MARGIN - amountW, y: topBaseline, size, font: ctx.font, color: INK });
  ctx.y -= 5;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y + 2, width: CONTENT_W, height: 0.4, color: RULE });
}

function totalRow(ctx: Ctx, total: number): void {
  const size = 13;
  ensureSpace(ctx, size + 14);
  ctx.y -= 8;
  const amountStr = formatUSD(total);
  const amountW = ctx.bold.widthOfTextAtSize(amountStr, size);
  ctx.page.drawText("Total", { x: MARGIN, y: ctx.y - size, size, font: ctx.bold, color: ctx.accent });
  ctx.page.drawText(amountStr, { x: PAGE_W - MARGIN - amountW, y: ctx.y - size, size, font: ctx.bold, color: ctx.accent });
  ctx.y -= size + 6;
}

function drawHeader(ctx: Ctx, snap: QuoteSnapshotV1): void {
  const topY = PAGE_H - MARGIN;
  const nameSize = 18;
  ctx.page.drawText(winAnsi(snap.merchant.name || "Quote"), {
    x: MARGIN,
    y: topY - nameSize,
    size: nameSize,
    font: ctx.bold,
    color: INK,
  });

  const qlSize = 26;
  const qlW = ctx.bold.widthOfTextAtSize("QUOTE", qlSize);
  ctx.page.drawText("QUOTE", { x: PAGE_W - MARGIN - qlW, y: topY - qlSize, size: qlSize, font: ctx.bold, color: ctx.accent });

  const num = winAnsi(snap.document.number || "");
  if (num.trim()) {
    const nSize = 10;
    const nW = ctx.font.widthOfTextAtSize(num, nSize);
    ctx.page.drawText(num, { x: PAGE_W - MARGIN - nW, y: topY - qlSize - 16, size: nSize, font: ctx.font, color: MUTED });
  }

  if (snap.document.issuedAt) {
    const issued = winAnsi(`Issued ${formatIssuedDate(snap.document.issuedAt)}`);
    const iSize = 9;
    const iW = ctx.font.widthOfTextAtSize(issued, iSize);
    ctx.page.drawText(issued, { x: PAGE_W - MARGIN - iW, y: topY - qlSize - 30, size: iSize, font: ctx.font, color: MUTED });
  }

  ctx.page.drawRectangle({ x: MARGIN, y: topY - nameSize - 12, width: CONTENT_W, height: 2.5, color: ctx.accent });
  ctx.y = topY - nameSize - 40;
}

/**
 * Render a branded QUOTE PDF from an immutable snapshot. Accepts a CustomerDocument
 * (its `snapshot` is used) or a snapshot object directly. Reads ONLY the snapshot —
 * no Company / QuoteRequest database access — so the output can never drift from
 * what was issued. Deterministic: identical snapshot in, identical document out.
 * Returns a Uint8Array suitable for a later download route.
 */
export async function renderQuoteDocumentPdf(
  input: CustomerDocument | QuoteSnapshotV1 | { snapshot: unknown }
): Promise<Uint8Array> {
  const raw: unknown =
    input && typeof input === "object" && "snapshot" in input
      ? (input as { snapshot: unknown }).snapshot
      : input;
  const snap = parseQuoteSnapshot(raw);

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  // Deterministic metadata: dates come from the snapshot, never the wall clock.
  const issued = new Date(snap.document.issuedAt);
  const stamp = Number.isNaN(issued.getTime()) ? new Date(0) : issued;
  doc.setTitle(`Quote ${snap.document.number}`.trim());
  doc.setProducer("Qalt");
  doc.setCreator("Qalt");
  doc.setCreationDate(stamp);
  doc.setModificationDate(stamp);

  const page = doc.addPage([PAGE_W, PAGE_H]);
  const ctx: Ctx = {
    doc,
    page,
    font,
    bold,
    accent: hexToColor(snap.merchant.brandColor),
    y: PAGE_H - MARGIN,
    pageIndex: 1,
    docNumber: snap.document.number,
  };

  drawFooter(ctx);
  drawHeader(ctx, snap);

  sectionTitle(ctx, "Quote for");
  keyValue(ctx, "Name", snap.customer.name);
  keyValue(ctx, "Email", snap.customer.email);
  keyValue(ctx, "Phone", snap.customer.phone);

  sectionTitle(ctx, "Route");
  keyValue(ctx, "Pickup", snap.route.pickupAddress);
  keyValue(ctx, "Dropoff", snap.route.dropoffAddress);
  if (snap.route.distanceMiles !== null) keyValue(ctx, "Distance", `${snap.route.distanceMiles} mi`);

  sectionTitle(ctx, "Shipment details");
  keyValue(ctx, "Service", snap.shipment.serviceType);
  if (snap.shipment.itemCount !== null) keyValue(ctx, "Items", snap.shipment.itemCount);
  if (snap.shipment.weight) keyValue(ctx, "Weight", `${snap.shipment.weight} lb`);
  if (snap.shipment.vehicleCount !== null && snap.shipment.vehicleCount > 0) {
    keyValue(ctx, "Vehicles", snap.shipment.vehicleCount);
  }
  if (snap.shipment.date) keyValue(ctx, "Pickup date", formatShipDate(snap.shipment.date));
  if (snap.shipment.time) keyValue(ctx, "Pickup time", snap.shipment.time);
  if (snap.shipment.addOns.length) keyValue(ctx, "Add-ons", snap.shipment.addOns.join(", "));

  sectionTitle(ctx, "Pricing");
  if (snap.pricing.lineItems.length) {
    priceHeader(ctx);
    for (const li of snap.pricing.lineItems) priceRow(ctx, li);
  }
  totalRow(ctx, snap.pricing.total);

  ctx.y -= 10;
  const note =
    "This is a price quote and not a tax invoice. Pricing reflects the details captured at the time of the quote.";
  ensureSpace(ctx, 24);
  for (const ln of wrapText(note, font, 8.5, CONTENT_W)) {
    ctx.page.drawText(ln, { x: MARGIN, y: ctx.y - 8.5, size: 8.5, font, color: MUTED });
    ctx.y -= 8.5 + 3;
  }

  return doc.save();
}

/**
 * Convenience dispatcher matching the generic "render a customer document" name.
 * Only QUOTE is supported in this phase.
 */
export async function renderCustomerDocumentPdf(document: CustomerDocument): Promise<Uint8Array> {
  if (document.type !== "QUOTE") {
    throw new Error(`Unsupported document type for PDF rendering: ${document.type}`);
  }
  return renderQuoteDocumentPdf(document);
}
