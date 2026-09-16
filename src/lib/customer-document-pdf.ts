import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFImage,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { sanitizeHex, DEFAULT_BRAND } from "@/lib/color";
import {
  parseQuoteSnapshot,
  type QuoteSnapshotV1,
  type QuoteSnapshotLineItem,
} from "@/lib/customer-document-snapshots";
import type { CustomerDocument } from "@/generated/prisma/client";

if (typeof window !== "undefined") {
  throw new Error("customer-document-pdf.ts is server-only and must not be imported into client code.");
}

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 42;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_Y = 28;
const BOTTOM_LIMIT = 58;

const INK = rgb(0.075, 0.082, 0.105);
const BODY = rgb(0.20, 0.23, 0.29);
const MUTED = rgb(0.43, 0.47, 0.54);
const FAINT = rgb(0.965, 0.97, 0.978);
const RULE = rgb(0.88, 0.895, 0.92);
const WHITE = rgb(1, 1, 1);

const usdFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function formatUSD(n: number): string {
  return usdFormatter.format(Number.isFinite(n) ? n : 0);
}

function formatIssuedDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
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

function winAnsi(text: string): string {
  const normalized = text
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...");
  let out = "";
  for (let i = 0; i < normalized.length; i += 1) {
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
  merchantName: string;
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = winAnsi(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
      continue;
    }
    if (line) lines.push(line);
    line = "";
    if (font.widthOfTextAtSize(word, size) <= maxWidth) {
      line = word;
      continue;
    }
    let chunk = "";
    for (const ch of word) {
      if (font.widthOfTextAtSize(chunk + ch, size) <= maxWidth) chunk += ch;
      else {
        if (chunk) lines.push(chunk);
        chunk = ch;
      }
    }
    line = chunk;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function truncateText(text: string, font: PDFFont, size: number, maxWidth: number): string {
  const safe = winAnsi(text);
  if (font.widthOfTextAtSize(safe, size) <= maxWidth) return safe;
  let out = safe;
  while (out.length && font.widthOfTextAtSize(`${out}...`, size) > maxWidth) out = out.slice(0, -1);
  return `${out.trim()}...`;
}

async function tryEmbedMerchantLogo(doc: PDFDocument, url: string | null): Promise<PDFImage | null> {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    const response = await fetch(parsed.toString(), { cache: "force-cache" });
    if (!response.ok) return null;
    const length = Number(response.headers.get("content-length") || 0);
    if (length > 2_500_000) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!bytes.length || bytes.length > 2_500_000) return null;

    const isPng = bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
    const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (isPng) return await doc.embedPng(bytes);
    if (isJpeg) return await doc.embedJpg(bytes);
    return null;
  } catch {
    return null;
  }
}

function drawFooter(ctx: Ctx): void {
  ctx.page.drawRectangle({ x: MARGIN, y: 44, width: CONTENT_W, height: 0.6, color: RULE });
  const left = winAnsi(`${ctx.merchantName || "Quote"}  •  ${ctx.docNumber || "Quote"}`);
  ctx.page.drawText(left, { x: MARGIN, y: FOOTER_Y, size: 7.6, font: ctx.font, color: MUTED });
  const right = `Page ${ctx.pageIndex}`;
  const rw = ctx.font.widthOfTextAtSize(right, 7.6);
  ctx.page.drawText(right, { x: PAGE_W - MARGIN - rw, y: FOOTER_Y, size: 7.6, font: ctx.font, color: MUTED });
}

function drawContinuationHeader(ctx: Ctx): void {
  ctx.page.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: INK });
  ctx.page.drawRectangle({ x: 0, y: PAGE_H - 72, width: PAGE_W, height: 4, color: ctx.accent });
  ctx.page.drawText(winAnsi(ctx.merchantName || "Quote"), {
    x: MARGIN,
    y: PAGE_H - 42,
    size: 15,
    font: ctx.bold,
    color: WHITE,
  });
  const label = `QUOTE  ${ctx.docNumber}`;
  const lw = ctx.bold.widthOfTextAtSize(label, 10);
  ctx.page.drawText(label, { x: PAGE_W - MARGIN - lw, y: PAGE_H - 40, size: 10, font: ctx.bold, color: WHITE });
  ctx.y = PAGE_H - 96;
}

function addPage(ctx: Ctx): void {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.pageIndex += 1;
  drawContinuationHeader(ctx);
  drawFooter(ctx);
}

function ensureSpace(ctx: Ctx, needed: number): void {
  if (ctx.y - needed < BOTTOM_LIMIT) addPage(ctx);
}

function drawSectionLabel(ctx: Ctx, title: string): void {
  ensureSpace(ctx, 24);
  ctx.page.drawText(winAnsi(title.toUpperCase()), {
    x: MARGIN,
    y: ctx.y,
    size: 8,
    font: ctx.bold,
    color: ctx.accent,
  });
  ctx.y -= 15;
}

function drawInfoCard(
  ctx: Ctx,
  title: string,
  rows: Array<{ label: string; value: string | number | null }>,
  x: number,
  yTop: number,
  width: number,
  height: number
): void {
  ctx.page.drawRectangle({ x, y: yTop - height, width, height, color: FAINT, borderColor: RULE, borderWidth: 0.7 });
  ctx.page.drawText(winAnsi(title.toUpperCase()), { x: x + 14, y: yTop - 19, size: 7.5, font: ctx.bold, color: MUTED });
  let y = yTop - 38;
  for (const row of rows) {
    if (row.value === null || row.value === "") continue;
    const value = typeof row.value === "number" ? String(row.value) : row.value;
    ctx.page.drawText(winAnsi(row.label), { x: x + 14, y, size: 7.4, font: ctx.bold, color: MUTED });
    const lines = wrapText(value, ctx.font, 9.1, width - 92).slice(0, 2);
    let lineY = y;
    for (const line of lines) {
      ctx.page.drawText(line, { x: x + 76, y: lineY, size: 9.1, font: ctx.font, color: BODY });
      lineY -= 11;
    }
    y -= Math.max(17, lines.length * 11 + 5);
  }
}

function drawHeader(ctx: Ctx, snap: QuoteSnapshotV1, logo: PDFImage | null): void {
  const headerH = 128;
  ctx.page.drawRectangle({ x: 0, y: PAGE_H - headerH, width: PAGE_W, height: headerH, color: INK });
  ctx.page.drawRectangle({ x: 0, y: PAGE_H - headerH - 5, width: PAGE_W, height: 5, color: ctx.accent });

  if (logo) {
    const maxW = 132;
    const maxH = 42;
    const scale = Math.min(maxW / logo.width, maxH / logo.height, 1);
    const w = logo.width * scale;
    const h = logo.height * scale;
    ctx.page.drawImage(logo, { x: MARGIN, y: PAGE_H - 48 - h / 2, width: w, height: h });
  } else {
    ctx.page.drawText(winAnsi(snap.merchant.name || "Quote"), {
      x: MARGIN,
      y: PAGE_H - 48,
      size: 18,
      font: ctx.bold,
      color: WHITE,
    });
  }

  ctx.page.drawText("DELIVERY QUOTE", {
    x: MARGIN,
    y: PAGE_H - 93,
    size: 9,
    font: ctx.bold,
    color: rgb(0.76, 0.79, 0.84),
  });
  ctx.page.drawText("Prepared for your delivery", {
    x: MARGIN,
    y: PAGE_H - 110,
    size: 8.5,
    font: ctx.font,
    color: rgb(0.62, 0.66, 0.72),
  });

  const quoteTitle = "QUOTE";
  const titleSize = 27;
  const titleW = ctx.bold.widthOfTextAtSize(quoteTitle, titleSize);
  ctx.page.drawText(quoteTitle, { x: PAGE_W - MARGIN - titleW, y: PAGE_H - 52, size: titleSize, font: ctx.bold, color: WHITE });

  const number = winAnsi(snap.document.number || "");
  const nw = ctx.bold.widthOfTextAtSize(number, 10);
  ctx.page.drawText(number, { x: PAGE_W - MARGIN - nw, y: PAGE_H - 73, size: 10, font: ctx.bold, color: ctx.accent });

  const issued = winAnsi(`Issued ${formatIssuedDate(snap.document.issuedAt)}`);
  const iw = ctx.font.widthOfTextAtSize(issued, 8.5);
  ctx.page.drawText(issued, { x: PAGE_W - MARGIN - iw, y: PAGE_H - 91, size: 8.5, font: ctx.font, color: rgb(0.7, 0.73, 0.78) });

  ctx.y = PAGE_H - headerH - 28;
}

function drawSummaryStrip(ctx: Ctx, snap: QuoteSnapshotV1): void {
  const top = ctx.y;
  const h = 64;
  ensureSpace(ctx, h);
  ctx.page.drawRectangle({ x: MARGIN, y: top - h, width: CONTENT_W, height: h, color: FAINT, borderColor: RULE, borderWidth: 0.7 });

  const customer = snap.customer.name || snap.customer.email || "Customer";
  ctx.page.drawText("PREPARED FOR", { x: MARGIN + 16, y: top - 20, size: 7.2, font: ctx.bold, color: MUTED });
  ctx.page.drawText(truncateText(customer, ctx.bold, 12, 205), { x: MARGIN + 16, y: top - 40, size: 12, font: ctx.bold, color: INK });
  if (snap.customer.email && snap.customer.name) {
    ctx.page.drawText(truncateText(snap.customer.email, ctx.font, 8.3, 205), { x: MARGIN + 16, y: top - 53, size: 8.3, font: ctx.font, color: MUTED });
  }

  const totalLabelX = PAGE_W - MARGIN - 178;
  ctx.page.drawText("QUOTED TOTAL", { x: totalLabelX, y: top - 20, size: 7.2, font: ctx.bold, color: MUTED });
  const total = formatUSD(snap.pricing.total);
  const tw = ctx.bold.widthOfTextAtSize(total, 21);
  ctx.page.drawText(total, { x: PAGE_W - MARGIN - 16 - tw, y: top - 45, size: 21, font: ctx.bold, color: ctx.accent });
  ctx.y = top - h - 22;
}

function drawDetailsGrid(ctx: Ctx, snap: QuoteSnapshotV1): void {
  drawSectionLabel(ctx, "Delivery details");
  const gap = 12;
  const cardW = (CONTENT_W - gap) / 2;
  const cardH = 116;
  const top = ctx.y;
  ensureSpace(ctx, cardH);

  const customerRows = [
    { label: "Name", value: snap.customer.name },
    { label: "Email", value: snap.customer.email },
    { label: "Phone", value: snap.customer.phone },
  ];
  drawInfoCard(ctx, "Customer", customerRows, MARGIN, top, cardW, cardH);

  const routeRows = [
    { label: "Pickup", value: snap.route.pickupAddress },
    { label: "Dropoff", value: snap.route.dropoffAddress },
    { label: "Distance", value: snap.route.distanceMiles !== null ? `${snap.route.distanceMiles} mi` : null },
  ];
  drawInfoCard(ctx, "Route", routeRows, MARGIN + cardW + gap, top, cardW, cardH);
  ctx.y = top - cardH - 22;
}

function drawShipmentStrip(ctx: Ctx, snap: QuoteSnapshotV1): void {
  drawSectionLabel(ctx, "Shipment summary");
  const values: Array<[string, string | null]> = [
    ["Service", snap.shipment.serviceType],
    ["Items", snap.shipment.itemCount !== null ? String(snap.shipment.itemCount) : null],
    ["Weight", snap.shipment.weight ? `${snap.shipment.weight} lb` : null],
    ["Vehicles", snap.shipment.vehicleCount !== null && snap.shipment.vehicleCount > 0 ? String(snap.shipment.vehicleCount) : null],
    ["Pickup", snap.shipment.date ? `${formatShipDate(snap.shipment.date)}${snap.shipment.time ? ` • ${snap.shipment.time}` : ""}` : snap.shipment.time],
    ["Add-ons", snap.shipment.addOns.length ? snap.shipment.addOns.join(", ") : null],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  if (!values.length) return;
  const cols = Math.min(3, values.length);
  const rows = Math.ceil(values.length / cols);
  const cellW = CONTENT_W / cols;
  const height = rows * 44 + 12;
  ensureSpace(ctx, height);
  const top = ctx.y;
  ctx.page.drawRectangle({ x: MARGIN, y: top - height, width: CONTENT_W, height, color: WHITE, borderColor: RULE, borderWidth: 0.7 });

  values.forEach(([label, value], index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = MARGIN + col * cellW + 13;
    const y = top - 21 - row * 44;
    ctx.page.drawText(winAnsi(label.toUpperCase()), { x, y, size: 6.9, font: ctx.bold, color: MUTED });
    ctx.page.drawText(truncateText(value, ctx.font, 9, cellW - 26), { x, y: y - 15, size: 9, font: ctx.font, color: BODY });
  });
  ctx.y = top - height - 22;
}

function priceHeader(ctx: Ctx): void {
  ensureSpace(ctx, 25);
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y - 24, width: CONTENT_W, height: 24, color: FAINT });
  ctx.page.drawText("DESCRIPTION", { x: MARGIN + 12, y: ctx.y - 16, size: 7.2, font: ctx.bold, color: MUTED });
  const amount = "AMOUNT";
  const aw = ctx.bold.widthOfTextAtSize(amount, 7.2);
  ctx.page.drawText(amount, { x: PAGE_W - MARGIN - 12 - aw, y: ctx.y - 16, size: 7.2, font: ctx.bold, color: MUTED });
  ctx.y -= 24;
}

function priceRow(ctx: Ctx, item: QuoteSnapshotLineItem): void {
  const descW = CONTENT_W - 118;
  const descLines = wrapText(item.description, ctx.font, 9, descW).slice(0, 2);
  const detailLines = item.detail ? wrapText(item.detail, ctx.font, 7.7, descW).slice(0, 1) : [];
  const rowH = Math.max(30, 10 + descLines.length * 11 + detailLines.length * 9);
  ensureSpace(ctx, rowH);
  const top = ctx.y;
  let y = top - 13;
  descLines.forEach((line) => {
    ctx.page.drawText(line, { x: MARGIN + 12, y, size: 9, font: ctx.font, color: BODY });
    y -= 11;
  });
  detailLines.forEach((line) => {
    ctx.page.drawText(line, { x: MARGIN + 12, y, size: 7.7, font: ctx.font, color: MUTED });
  });
  const amount = formatUSD(item.amount);
  const aw = ctx.font.widthOfTextAtSize(amount, 9);
  ctx.page.drawText(amount, { x: PAGE_W - MARGIN - 12 - aw, y: top - 13, size: 9, font: ctx.font, color: BODY });
  ctx.page.drawRectangle({ x: MARGIN, y: top - rowH, width: CONTENT_W, height: 0.5, color: RULE });
  ctx.y = top - rowH;
}

function drawTotal(ctx: Ctx, total: number): void {
  const h = 48;
  ensureSpace(ctx, h);
  const top = ctx.y;
  ctx.page.drawRectangle({ x: MARGIN, y: top - h, width: CONTENT_W, height: h, color: INK });
  ctx.page.drawText("QUOTED TOTAL", { x: MARGIN + 14, y: top - 29, size: 9, font: ctx.bold, color: WHITE });
  const amount = formatUSD(total);
  const aw = ctx.bold.widthOfTextAtSize(amount, 18);
  ctx.page.drawText(amount, { x: PAGE_W - MARGIN - 14 - aw, y: top - 32, size: 18, font: ctx.bold, color: WHITE });
  ctx.y = top - h;
}

function drawTerms(ctx: Ctx): void {
  const note = "This quote reflects the delivery details captured when it was issued. Changes to route, shipment details, timing, access, or requested services may change the final price. This is a price quote, not a tax invoice.";
  const lines = wrapText(note, ctx.font, 7.5, CONTENT_W - 24);
  const h = 18 + lines.length * 9;
  ensureSpace(ctx, h + 6);
  ctx.y -= 12;
  const top = ctx.y;
  ctx.page.drawRectangle({ x: MARGIN, y: top - h, width: CONTENT_W, height: h, color: FAINT });
  ctx.page.drawText("QUOTE NOTES", { x: MARGIN + 12, y: top - 14, size: 6.8, font: ctx.bold, color: MUTED });
  let y = top - 27;
  lines.forEach((line) => {
    ctx.page.drawText(line, { x: MARGIN + 12, y, size: 7.5, font: ctx.font, color: MUTED });
    y -= 9;
  });
  ctx.y = top - h;
}

export async function renderQuoteDocumentPdf(
  input: CustomerDocument | QuoteSnapshotV1 | { snapshot: unknown }
): Promise<Uint8Array> {
  const raw: unknown = input && typeof input === "object" && "snapshot" in input
    ? (input as { snapshot: unknown }).snapshot
    : input;
  const snap = parseQuoteSnapshot(raw);

  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const logo = await tryEmbedMerchantLogo(doc, snap.merchant.logoUrl);

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
    accent: hexToColor(snap.merchant.brandColor),
    y: PAGE_H - MARGIN,
    pageIndex: 1,
    docNumber: snap.document.number,
    merchantName: snap.merchant.name,
  };

  drawFooter(ctx);
  drawHeader(ctx, snap, logo);
  drawSummaryStrip(ctx, snap);
  drawDetailsGrid(ctx, snap);
  drawShipmentStrip(ctx, snap);

  drawSectionLabel(ctx, "Pricing");
  if (snap.pricing.lineItems.length) {
    priceHeader(ctx);
    for (const item of snap.pricing.lineItems) priceRow(ctx, item);
  } else {
    ensureSpace(ctx, 28);
    ctx.page.drawText("Delivery quote", { x: MARGIN + 12, y: ctx.y - 14, size: 9, font, color: BODY });
    ctx.y -= 28;
  }
  drawTotal(ctx, snap.pricing.total);
  drawTerms(ctx);

  return doc.save();
}

export async function renderCustomerDocumentPdf(document: CustomerDocument): Promise<Uint8Array> {
  if (document.type !== "QUOTE") {
    throw new Error(`Unsupported document type for PDF rendering: ${document.type}`);
  }
  return renderQuoteDocumentPdf(document);
}
