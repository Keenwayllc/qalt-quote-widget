import prisma from "@/lib/prisma";
import { getLogoTone } from "@/lib/logo-tone";
import { normalizeLogoBackdrop, toneForBackdrop, type LogoTone } from "@/lib/logo-plate";

/**
 * Tone for a logo URL, honoring the owning company's Widget Appearance
 * override ("Logo background"). Server-only; kept apart from logo-tone.ts so
 * the analyzer stays testable without a database.
 */
export async function resolveLogoTone(url: string | null | undefined): Promise<LogoTone> {
  if (!url) return "unknown";
  try {
    const owner = await prisma.company.findFirst({
      where: { OR: [{ logoUrl: url }, { widgetSettings: { some: { logoUrl: url } } }] },
      select: { logoBackdrop: true },
    });
    const forced = toneForBackdrop(normalizeLogoBackdrop(owner?.logoBackdrop));
    if (forced) return forced;
  } catch {
    // Fall back to detection if the lookup fails.
  }
  return getLogoTone(url);
}
