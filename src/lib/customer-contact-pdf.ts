import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { CustomerFacingContact } from "@/lib/customer-contact";

const PAGE_W = 612;
const MARGIN = 42;

function safeText(value: string): string {
  return value
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, " ");
}

export async function decoratePdfWithCustomerContact(
  input: Uint8Array,
  contact: CustomerFacingContact
): Promise<Uint8Array> {
  const parts = [contact.department, contact.email, contact.phone, contact.hours]
    .map((value) => value?.trim())
    .filter((value): value is string => !!value);

  if (!parts.length) return input;

  const doc = await PDFDocument.load(input);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const pages = doc.getPages();
  const size = 6.7;
  const maxWidth = PAGE_W - MARGIN * 2;
  const prefix = "Questions? ";
  let detail = safeText(parts.join("  |  "));
  const prefixWidth = bold.widthOfTextAtSize(prefix, size);

  while (detail.length > 1 && font.widthOfTextAtSize(detail, size) > maxWidth - prefixWidth) {
    detail = detail.slice(0, -1);
  }
  if (detail !== safeText(parts.join("  |  "))) detail = `${detail.trim()}...`;

  for (const page of pages) {
    page.drawText(prefix, {
      x: MARGIN,
      y: 51.5,
      size,
      font: bold,
      color: rgb(0.34, 0.38, 0.45),
    });
    page.drawText(detail, {
      x: MARGIN + prefixWidth,
      y: 51.5,
      size,
      font,
      color: rgb(0.42, 0.46, 0.52),
    });
  }

  return doc.save();
}
