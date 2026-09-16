import { PDFDocument, StandardFonts, rgb, type PDFImage, type PDFFont, type PDFPage } from "pdf-lib";
import { sanitizeHex, DEFAULT_BRAND } from "@/lib/color";
import { parseQuoteSnapshot, type QuoteSnapshotV1 } from "@/lib/customer-document-snapshots";
import { getCustomerFacingContact, type CustomerFacingContact } from "@/lib/customer-contact";
import type { CustomerDocument } from "@/generated/prisma/client";

if (typeof window !== "undefined") {
  throw new Error("customer-document-pdf.ts is server-only and must not be imported into client code.");
}

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM = 58;

const INK = rgb(0.08, 0.08, 0.09);
const BODY = rgb(0.18, 0.19, 0.21);
const MUTED = rgb(0.43, 0.45, 0.49);
const LIGHT = rgb(0.90, 0.91, 0.93);
const SOFT = rgb(0.975, 0.977, 0.98);
const WHITE = rgb(1, 1, 1);

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function money(value: number) {
  return usd.format(Number.isFinite(value) ? value : 0);
}

function safeText(text: string | null | undefined): string {
  const normalized = String(text ?? "")
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...");
  let out = "";
  for (let i = 0; i < normalized.length; i += 1) {
    const code = normalized.charCodeAt(i);
    out += (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) ? normalized[i] : " ";
  }
  return out;
}

function brandColor(hex: string) {
  const h = sanitizeHex(hex) ?? DEFAULT_BRAND;
  return rgb(
    parseInt(h.slice(1, 3), 16) / 255,
    parseInt(h.slice(3, 5), 16) / 255,
    parseInt(h.slice(5, 7), 16) / 255
  );
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function formatShipDate(value: string | null): string | null {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const d = new Date(`${value}T00:00:00Z`);
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

function wrap(text: string | null | undefined, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = safeText(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  return lines;
}

function centerText(page: PDFPage, text: string, y: number, font: PDFFont, size: number, color = BODY) {
  const safe = safeText(text);
  const width = font.widthOfTextAtSize(safe, size);
  page.drawText(safe, { x: (PAGE_W - width) / 2, y, size, font, color });
}

async function embedLogo(doc: PDFDocument, url: string | null): Promise<PDFImage | null> {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    const response = await fetch(parsed.toString(), { cache: "force-cache" });
    if (!response.ok) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!bytes.length || bytes.length > 2_500_000) return null;
    const png = bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const jpg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (png) return doc.embedPng(bytes);
    if (jpg) return doc.embedJpg(bytes);
  } catch {
    return null;
  }
  return null;
}

type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  accent: ReturnType<typeof rgb>;
  y: number;
  pageNo: number;
  number: string;
};

function footer(ctx: Ctx) {
  ctx.page.drawLine({ start: { x: MARGIN, y: 45 }, end: { x: PAGE_W - MARGIN, y: 45 }, thickness: 0.6, color: LIGHT });
  ctx.page.drawText(safeText(`Generated securely with Qalt  |  ${ctx.number}`), {
    x: MARGIN,
    y: 29,
    size: 7.5,
    font: ctx.font,
    color: MUTED,
  });
  const p = `Page ${ctx.pageNo}`;
  const pw = ctx.font.widthOfTextAtSize(p, 7.5);
  ctx.page.drawText(p, { x: PAGE_W - MARGIN - pw, y: 29, size: 7.5, font: ctx.font, color: MUTED });
}

function addPage(ctx: Ctx) {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.pageNo += 1;
  ctx.y = PAGE_H - 64;
  footer(ctx);
  ctx.page.drawText("QUOTE CONTINUED", { x: MARGIN, y: ctx.y, size: 9, font: ctx.bold, color: MUTED });
  ctx.page.drawText(safeText(ctx.number), { x: PAGE_W - MARGIN - ctx.font.widthOfTextAtSize(ctx.number, 9), y: ctx.y, size: 9, font: ctx.font, color: MUTED });
  ctx.y -= 28;
}

function ensure(ctx: Ctx, height: number) {
  if (ctx.y - height < BOTTOM) addPage(ctx);
}

function drawHeader(ctx: Ctx, snap: QuoteSnapshotV1, logo: PDFImage | null) {
  let y = PAGE_H - 72;
  if (logo) {
    const maxW = 150;
    const maxH = 48;
    const scale = Math.min(maxW / logo.width, maxH / logo.height, 1);
    const w = logo.width * scale;
    const h = logo.height * scale;
    ctx.page.drawImage(logo, { x: (PAGE_W - w) / 2, y: y - h + 10, width: w, height: h });
    y -= h + 14;
  } else {
    centerText(ctx.page, snap.merchant.name || "Delivery Quote", y - 4, ctx.bold, 22, INK);
    y -= 32;
  }

  ctx.page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 2.2, color: ctx.accent });
  y -= 27;
  centerText(ctx.page, "DELIVERY QUOTE", y, ctx.bold, 12, INK);
  y -= 18;
  centerText(ctx.page, `${snap.document.number}  |  Issued ${formatDate(snap.document.issuedAt)}`, y, ctx.font, 9.5, MUTED);
  y -= 24;

  // Keep the document header merchant-focused. Customer identity belongs in the
  // dedicated CUSTOMER section below and must never be confused with the Qalt
  // account owner, an admin user, or an optional document preparer.
  ctx.page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.8, color: LIGHT });
  ctx.y = y - 26;
}

function drawRoute(ctx: Ctx, snap: QuoteSnapshotV1) {
  ensure(ctx, 112);
  ctx.page.drawText("ROUTE", { x: MARGIN, y: ctx.y, size: 8, font: ctx.bold, color: MUTED });
  ctx.y -= 24;

  const xDot = MARGIN + 9;
  const xText = MARGIN + 31;
  const pickupY = ctx.y;
  const pickupLines = wrap(snap.route.pickupAddress || "Pickup location", ctx.font, 10.5, CONTENT_W - 45).slice(0, 2);
  ctx.page.drawCircle({ x: xDot, y: pickupY + 2, size: 6, borderColor: INK, borderWidth: 1.2, color: WHITE });
  pickupLines.forEach((line, i) => ctx.page.drawText(line, { x: xText, y: pickupY - i * 13, size: 10.5, font: ctx.font, color: INK }));

  const dropY = pickupY - 47;
  ctx.page.drawLine({ start: { x: xDot, y: pickupY - 4 }, end: { x: xDot, y: dropY + 7 }, thickness: 1.1, color: INK });
  ctx.page.drawCircle({ x: xDot, y: dropY + 2, size: 6, color: INK });
  const dropLines = wrap(snap.route.dropoffAddress || "Drop-off location", ctx.font, 10.5, CONTENT_W - 45).slice(0, 2);
  dropLines.forEach((line, i) => ctx.page.drawText(line, { x: xText, y: dropY - i * 13, size: 10.5, font: ctx.font, color: INK }));

  if (snap.route.distanceMiles !== null) {
    const dist = `${snap.route.distanceMiles.toFixed(1)} miles`;
    const dw = ctx.font.widthOfTextAtSize(dist, 9);
    ctx.page.drawText(dist, { x: PAGE_W - MARGIN - dw, y: dropY - 2, size: 9, font: ctx.font, color: MUTED });
  }

  ctx.y = dropY - Math.max(28, dropLines.length * 13 + 13);
  ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y }, end: { x: PAGE_W - MARGIN, y: ctx.y }, thickness: 0.7, color: LIGHT });
  ctx.y -= 22;
}

function drawSummary(ctx: Ctx, snap: QuoteSnapshotV1) {
  const rows: Array<[string, string | null]> = [
    ["Service", snap.shipment.serviceType],
    ["Pickup", [formatShipDate(snap.shipment.date), snap.shipment.time].filter(Boolean).join(" at ") || null],
    ["Items", snap.shipment.itemCount !== null ? String(snap.shipment.itemCount) : null],
    ["Weight", snap.shipment.weight ? `${snap.shipment.weight} lb` : null],
    ["Vehicles", snap.shipment.vehicleCount !== null && snap.shipment.vehicleCount > 0 ? String(snap.shipment.vehicleCount) : null],
    ["Add-ons", snap.shipment.addOns.length ? snap.shipment.addOns.join(", ") : null],
  ];

  const visibleRows = rows.filter((row) => typeof row[1] === "string" && row[1].length > 0);
  if (!visibleRows.length) return;
  ensure(ctx, visibleRows.length * 19 + 34);
  ctx.page.drawText("DETAILS", { x: MARGIN, y: ctx.y, size: 8, font: ctx.bold, color: MUTED });
  ctx.y -= 21;
  for (const [label, value] of visibleRows) {
    ctx.page.drawText(label, { x: MARGIN, y: ctx.y, size: 9.5, font: ctx.font, color: MUTED });
    const max = 310;
    const val = wrap(value, ctx.font, 9.5, max)[0] || "";
    const vw = ctx.font.widthOfTextAtSize(val, 9.5);
    ctx.page.drawText(val, { x: PAGE_W - MARGIN - vw, y: ctx.y, size: 9.5, font: ctx.font, color: BODY });
    ctx.y -= 19;
  }
  ctx.y -= 2;
  ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y }, end: { x: PAGE_W - MARGIN, y: ctx.y }, thickness: 0.7, color: LIGHT });
  ctx.y -= 22;
}

function drawCustomer(ctx: Ctx, snap: QuoteSnapshotV1) {
  const values = [snap.customer.email, snap.customer.phone].filter(Boolean) as string[];
  if (!values.length) return;
  ensure(ctx, 52);
  ctx.page.drawText("CUSTOMER", { x: MARGIN, y: ctx.y, size: 8, font: ctx.bold, color: MUTED });
  ctx.y -= 19;
  if (snap.customer.name) {
    ctx.page.drawText(safeText(snap.customer.name), { x: MARGIN, y: ctx.y, size: 10, font: ctx.bold, color: BODY });
    ctx.y -= 15;
  }
  ctx.page.drawText(safeText(values.join("  |  ")), { x: MARGIN, y: ctx.y, size: 8.8, font: ctx.font, color: MUTED });
  ctx.y -= 23;
  ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y }, end: { x: PAGE_W - MARGIN, y: ctx.y }, thickness: 0.7, color: LIGHT });
  ctx.y -= 22;
}

function drawCharges(ctx: Ctx, snap: QuoteSnapshotV1) {
  ctx.page.drawText("PRICE SUMMARY", { x: MARGIN, y: ctx.y, size: 8, font: ctx.bold, color: MUTED });
  ctx.y -= 23;
  const items = snap.pricing.lineItems.length
    ? snap.pricing.lineItems
    : [{ description: "Delivery service", detail: null, amount: snap.pricing.total }];

  for (const item of items) {
    const descLines = wrap(item.description, ctx.font, 10, CONTENT_W - 110).slice(0, 2);
    const detailLines = item.detail ? wrap(item.detail, ctx.font, 8.3, CONTENT_W - 110).slice(0, 1) : [];
    const rowH = Math.max(26, descLines.length * 13 + detailLines.length * 11 + 7);
    ensure(ctx, rowH + 2);
    const top = ctx.y;
    descLines.forEach((line, i) => ctx.page.drawText(line, { x: MARGIN + 2, y: top - i * 13, size: 10, font: ctx.font, color: BODY }));
    detailLines.forEach((line) => ctx.page.drawText(line, { x: MARGIN + 2, y: top - descLines.length * 13, size: 8.3, font: ctx.font, color: MUTED }));
    const amount = money(item.amount);
    const aw = ctx.font.widthOfTextAtSize(amount, 10);
    ctx.page.drawText(amount, { x: PAGE_W - MARGIN - aw, y: top, size: 10, font: ctx.font, color: BODY });
    ctx.y -= rowH;
  }

  ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y + 4 }, end: { x: PAGE_W - MARGIN, y: ctx.y + 4 }, thickness: 1, color: INK });
  ctx.y -= 15;
  ensure(ctx, 42);
  ctx.page.drawText("TOTAL", { x: MARGIN + 2, y: ctx.y, size: 13, font: ctx.bold, color: INK });
  const total = money(snap.pricing.total);
  const tw = ctx.bold.widthOfTextAtSize(total, 16);
  ctx.page.drawText(total, { x: PAGE_W - MARGIN - tw, y: ctx.y - 1, size: 16, font: ctx.bold, color: INK });
  ctx.y -= 31;
  ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y }, end: { x: PAGE_W - MARGIN, y: ctx.y }, thickness: 0.7, color: LIGHT });
  ctx.y -= 20;
}

function drawContactAndTerms(ctx: Ctx, merchantName: string, contact?: CustomerFacingContact | null) {
  const terms = "This quote is based on the route, shipment details, timing, access, and services shown above. Changes may affect the final price. This document is a quote and is not a tax invoice.";
  const termLines = wrap(terms, ctx.font, 8.2, CONTENT_W - 24);
  const contactBits = contact
    ? [contact.department, contact.email, contact.phone, contact.hours].filter(Boolean) as string[]
    : [];
  const contactLines = contactBits.length ? wrap(contactBits.join("  |  "), ctx.font, 8.2, CONTENT_W - 24) : [];
  const h = 28 + termLines.length * 10 + (contactLines.length ? 24 + contactLines.length * 10 : 0);
  ensure(ctx, h + 8);
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y - h, width: CONTENT_W, height: h, color: SOFT, borderColor: LIGHT, borderWidth: 0.7 });
  let y = ctx.y - 16;
  ctx.page.drawText("QUOTE NOTES", { x: MARGIN + 12, y, size: 7, font: ctx.bold, color: MUTED });
  y -= 14;
  for (const line of termLines) {
    ctx.page.drawText(line, { x: MARGIN + 12, y, size: 8.2, font: ctx.font, color: MUTED });
    y -= 10;
  }
  if (contactLines.length) {
    y -= 7;
    ctx.page.drawText("NEED HELP?", { x: MARGIN + 12, y, size: 7, font: ctx.bold, color: MUTED });
    y -= 14;
    for (const line of contactLines) {
      ctx.page.drawText(line, { x: MARGIN + 12, y, size: 8.2, font: ctx.font, color: BODY });
      y -= 10;
    }
  } else {
    y -= 7;
    ctx.page.drawText(safeText(`Questions about this quote? Contact ${merchantName}.`), { x: MARGIN + 12, y, size: 8.2, font: ctx.font, color: BODY });
  }
  ctx.y -= h + 8;
}

export async function renderQuoteDocumentPdf(
  input: CustomerDocument | QuoteSnapshotV1 | { snapshot: unknown },
  contact?: CustomerFacingContact | null
): Promise<Uint8Array> {
  const raw: unknown = input && typeof input === "object" && "snapshot" in input
    ? (input as { snapshot: unknown }).snapshot
    : input;
  const snap = parseQuoteSnapshot(raw);

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await embedLogo(doc, snap.merchant.logoUrl);
  const issued = new Date(snap.document.issuedAt);
  const stamp = Number.isNaN(issued.getTime()) ? new Date(0) : issued;

  doc.setTitle(`Quote ${snap.document.number}`.trim());
  doc.setSubject(`Delivery quote from ${snap.merchant.name || "merchant"}`);
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
    accent: brandColor(snap.merchant.brandColor),
    y: PAGE_H - MARGIN,
    pageNo: 1,
    number: snap.document.number,
  };
  footer(ctx);
  drawHeader(ctx, snap, logo);
  drawRoute(ctx, snap);
  drawSummary(ctx, snap);
  drawCustomer(ctx, snap);
  drawCharges(ctx, snap);
  drawContactAndTerms(ctx, snap.merchant.name || "the delivery provider", contact);

  return doc.save();
}

export async function renderCustomerDocumentPdf(document: CustomerDocument): Promise<Uint8Array> {
  if (document.type !== "QUOTE") {
    throw new Error(`Unsupported document type for PDF rendering: ${document.type}`);
  }
  let contact: CustomerFacingContact | null = null;
  try {
    contact = await getCustomerFacingContact(document.companyId);
  } catch {
    contact = null;
  }
  return renderQuoteDocumentPdf(document, contact);
}
