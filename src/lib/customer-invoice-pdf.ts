import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { sanitizeHex, DEFAULT_BRAND } from "@/lib/color";
import type { CustomerDocument } from "@/generated/prisma/client";
import type { QuoteSnapshotLineItem } from "@/lib/customer-document-snapshots";
import type { InvoiceSnapshotV1 } from "@/lib/customer-invoice-documents";

if (typeof window !== "undefined") {
  throw new Error("customer-invoice-pdf.ts is server-only and must not be imported into client code.");
}

const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_LIMIT = 78;
const INK = rgb(0.07, 0.086, 0.145);
const MUTED = rgb(0.42, 0.45, 0.5);
const RULE = rgb(0.85, 0.87, 0.9);
const PAID = rgb(0.02, 0.48, 0.35);
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function winAnsi(text: string): string {
  const normalized = String(text ?? "")
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...");
  let out = "";
  for (let i = 0; i < normalized.length; i++) {
    const code = normalized.charCodeAt(i);
    out += (code >= 0x20 && code <= 0x7e) || (code >= 0xa0 && code <= 0xff) ? normalized[i] : " ";
  }
  return out;
}

function color(hex: string) {
  const h = sanitizeHex(hex) ?? DEFAULT_BRAND;
  return rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(d);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function parseInvoiceSnapshot(raw: unknown): InvoiceSnapshotV1 {
  if (!isRecord(raw) || raw.version !== 1 || raw.documentType !== "INVOICE") {
    throw new Error("Unsupported invoice snapshot.");
  }
  const merchant = raw.merchant;
  const document = raw.document;
  const customer = raw.customer;
  const route = raw.route;
  const shipment = raw.shipment;
  const pricing = raw.pricing;
  const payment = raw.payment;
  if (!isRecord(merchant) || !isRecord(document) || !isRecord(customer) || !isRecord(route) || !isRecord(shipment) || !isRecord(pricing) || !isRecord(payment)) {
    throw new Error("Invalid invoice snapshot.");
  }
  if (typeof document.number !== "string" || typeof document.issuedAt !== "string" || typeof document.paidAt !== "string" || payment.status !== "PAID") {
    throw new Error("Invalid invoice document metadata.");
  }
  if (!Array.isArray(pricing.lineItems) || typeof pricing.total !== "number") {
    throw new Error("Invalid invoice pricing snapshot.");
  }
  return raw as unknown as InvoiceSnapshotV1;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = winAnsi(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      line = next;
      continue;
    }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  return lines;
}

type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  accent: ReturnType<typeof rgb>;
  y: number;
  pageIndex: number;
  number: string;
};

function footer(ctx: Ctx) {
  ctx.page.drawText(winAnsi(ctx.number || "Invoice"), { x: MARGIN, y: 34, size: 8, font: ctx.font, color: MUTED });
  const label = `Page ${ctx.pageIndex}`;
  const width = ctx.font.widthOfTextAtSize(label, 8);
  ctx.page.drawText(label, { x: PAGE_W - MARGIN - width, y: 34, size: 8, font: ctx.font, color: MUTED });
}

function addPage(ctx: Ctx) {
  ctx.page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.pageIndex += 1;
  ctx.y = PAGE_H - MARGIN;
  footer(ctx);
}

function ensure(ctx: Ctx, needed: number) {
  if (ctx.y - needed < BOTTOM_LIMIT) addPage(ctx);
}

function section(ctx: Ctx, title: string) {
  ctx.y -= 12;
  ensure(ctx, 28);
  ctx.page.drawText(winAnsi(title), { x: MARGIN, y: ctx.y - 12, size: 12, font: ctx.bold, color: ctx.accent });
  ctx.y -= 18;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y + 4, width: CONTENT_W, height: 0.8, color: RULE });
  ctx.y -= 8;
}

function field(ctx: Ctx, label: string, value: string | number | null) {
  if (value === null || value === "") return;
  const text = typeof value === "number" ? String(value) : value;
  const lines = wrap(text, ctx.font, 10.5, CONTENT_W - 100);
  ensure(ctx, lines.length * 15 + 4);
  ctx.page.drawText(label.toUpperCase(), { x: MARGIN, y: ctx.y - 10.5, size: 8.5, font: ctx.bold, color: MUTED });
  for (const line of lines) {
    ctx.page.drawText(line, { x: MARGIN + 100, y: ctx.y - 10.5, size: 10.5, font: ctx.font, color: INK });
    ctx.y -= 14.5;
  }
  ctx.y -= 3;
}

function priceRow(ctx: Ctx, item: QuoteSnapshotLineItem) {
  const amount = usd.format(Number.isFinite(item.amount) ? item.amount : 0);
  const amountW = ctx.font.widthOfTextAtSize(amount, 10.5);
  const lines = wrap(item.description, ctx.font, 10.5, CONTENT_W - 100);
  const details = item.detail ? wrap(item.detail, ctx.font, 9, CONTENT_W - 100) : [];
  ensure(ctx, lines.length * 14 + details.length * 11 + 10);
  const top = ctx.y - 10.5;
  for (const line of lines) {
    ctx.page.drawText(line, { x: MARGIN, y: ctx.y - 10.5, size: 10.5, font: ctx.font, color: INK });
    ctx.y -= 14.5;
  }
  for (const detail of details) {
    ctx.page.drawText(detail, { x: MARGIN, y: ctx.y - 9, size: 9, font: ctx.font, color: MUTED });
    ctx.y -= 11;
  }
  ctx.page.drawText(amount, { x: PAGE_W - MARGIN - amountW, y: top, size: 10.5, font: ctx.font, color: INK });
  ctx.y -= 4;
  ctx.page.drawRectangle({ x: MARGIN, y: ctx.y + 2, width: CONTENT_W, height: 0.4, color: RULE });
}

export async function renderPaidInvoiceDocumentPdf(document: CustomerDocument): Promise<Uint8Array> {
  if (document.type !== "INVOICE" || document.status !== "PAID") {
    throw new Error("Unsupported invoice document.");
  }
  const snap = parseInvoiceSnapshot(document.snapshot);
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const stamp = new Date(snap.document.issuedAt);
  const deterministicDate = Number.isNaN(stamp.getTime()) ? new Date(0) : stamp;
  pdf.setTitle(`Paid Invoice ${snap.document.number}`.trim());
  pdf.setProducer("Qalt");
  pdf.setCreator("Qalt");
  pdf.setCreationDate(deterministicDate);
  pdf.setModificationDate(deterministicDate);

  const page = pdf.addPage([PAGE_W, PAGE_H]);
  const ctx: Ctx = { doc: pdf, page, font, bold, accent: color(snap.merchant.brandColor), y: PAGE_H - MARGIN, pageIndex: 1, number: snap.document.number };
  footer(ctx);

  const top = PAGE_H - MARGIN;
  ctx.page.drawText(winAnsi(snap.merchant.name || "Invoice"), { x: MARGIN, y: top - 18, size: 18, font: bold, color: INK });
  const label = "PAID INVOICE";
  const labelW = bold.widthOfTextAtSize(label, 24);
  ctx.page.drawText(label, { x: PAGE_W - MARGIN - labelW, y: top - 24, size: 24, font: bold, color: PAID });
  const numberW = font.widthOfTextAtSize(snap.document.number, 10);
  ctx.page.drawText(snap.document.number, { x: PAGE_W - MARGIN - numberW, y: top - 42, size: 10, font, color: MUTED });
  const paidLabel = `Paid ${formatDate(snap.document.paidAt)}`;
  const paidW = font.widthOfTextAtSize(paidLabel, 9);
  ctx.page.drawText(paidLabel, { x: PAGE_W - MARGIN - paidW, y: top - 57, size: 9, font, color: PAID });
  ctx.page.drawRectangle({ x: MARGIN, y: top - 32, width: CONTENT_W, height: 2.5, color: ctx.accent });
  ctx.y = top - 62;

  section(ctx, "Billed to");
  field(ctx, "Name", snap.customer.name);
  field(ctx, "Email", snap.customer.email);
  field(ctx, "Phone", snap.customer.phone);

  section(ctx, "Delivery");
  field(ctx, "Pickup", snap.route.pickupAddress);
  field(ctx, "Dropoff", snap.route.dropoffAddress);
  if (snap.route.distanceMiles !== null) field(ctx, "Distance", `${snap.route.distanceMiles} mi`);
  field(ctx, "Service", snap.shipment.serviceType);
  if (snap.shipment.itemCount !== null) field(ctx, "Items", snap.shipment.itemCount);
  if (snap.shipment.weight) field(ctx, "Weight", `${snap.shipment.weight} lb`);
  if (snap.shipment.vehicleCount !== null && snap.shipment.vehicleCount > 0) field(ctx, "Vehicles", snap.shipment.vehicleCount);
  if (snap.shipment.date) field(ctx, "Pickup date", snap.shipment.date);
  if (snap.shipment.time) field(ctx, "Pickup time", snap.shipment.time);
  if (snap.shipment.addOns.length) field(ctx, "Add-ons", snap.shipment.addOns.join(", "));

  section(ctx, "Payment summary");
  for (const item of snap.pricing.lineItems) priceRow(ctx, item);
  ensure(ctx, 34);
  ctx.y -= 8;
  const total = usd.format(Number.isFinite(snap.pricing.total) ? snap.pricing.total : 0);
  const totalW = bold.widthOfTextAtSize(total, 14);
  ctx.page.drawText("Total paid", { x: MARGIN, y: ctx.y - 14, size: 14, font: bold, color: PAID });
  ctx.page.drawText(total, { x: PAGE_W - MARGIN - totalW, y: ctx.y - 14, size: 14, font: bold, color: PAID });
  ctx.y -= 32;

  ensure(ctx, 28);
  const note = "Payment received. This invoice reflects the immutable delivery and pricing details captured for this transaction.";
  for (const line of wrap(note, font, 8.5, CONTENT_W)) {
    ctx.page.drawText(line, { x: MARGIN, y: ctx.y - 8.5, size: 8.5, font, color: MUTED });
    ctx.y -= 11.5;
  }

  return pdf.save();
}
