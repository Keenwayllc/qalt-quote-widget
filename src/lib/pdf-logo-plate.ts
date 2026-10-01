import { rgb, type PDFPage } from "pdf-lib";
import { resolveLogoTone } from "@/lib/logo-tone-resolve";
import { logoPlateFor } from "@/lib/logo-plate";

export const PDF_LOGO_PLATE_PAD = 8;

/** True when a logo would vanish on white paper and needs a dark plate. */
export async function pdfLogoNeedsPlate(logoUrl: string | null | undefined) {
  return logoPlateFor(await resolveLogoTone(logoUrl), "light") === "dark";
}

/** Rounded dark plate behind a logo whose bottom-left corner is (x, y), size w x h. */
export function drawPdfLogoPlate(page: PDFPage, x: number, y: number, w: number, h: number) {
  const pad = PDF_LOGO_PLATE_PAD;
  const W = w + pad * 2;
  const H = h + pad * 2;
  const r = 6;
  // SVG paths in pdf-lib start at (x, y) and run downward, so y is the top edge.
  const path = `M ${r} 0 H ${W - r} Q ${W} 0 ${W} ${r} V ${H - r} Q ${W} ${H} ${W - r} ${H} H ${r} Q 0 ${H} 0 ${H - r} V ${r} Q 0 0 ${r} 0 Z`;
  page.drawSvgPath(path, { x: x - pad, y: y + h + pad, color: rgb(0.059, 0.09, 0.165) });
}
