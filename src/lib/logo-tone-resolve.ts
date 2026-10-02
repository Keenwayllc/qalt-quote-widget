import prisma from "@/lib/prisma";
import { getLogoTone } from "@/lib/logo-tone";
import { normalizeLogoBackdrop, pickLogoTone, type LogoBackdrop, type LogoTone } from "@/lib/logo-plate";

/**
 * Tone for a logo URL, honoring the owning company's Widget Appearance
 * override ("Logo background") where detection is unsure. Server-only; kept apart from logo-tone.ts so
 * the analyzer stays testable without a database.
 */
export async function resolveLogoTone(url: string | null | undefined): Promise<LogoTone> {
  if (!url) return "unknown";
  let backdrop: LogoBackdrop = "auto";
  try {
    const owner = await prisma.company.findFirst({
      where: { OR: [{ logoUrl: url }, { widgetSettings: { some: { logoUrl: url } } }] },
      select: { logoBackdrop: true },
    });
    backdrop = normalizeLogoBackdrop(owner?.logoBackdrop);
  } catch {
    // Fall back to detection alone if the lookup fails.
  }
  return pickLogoTone(await getLogoTone(url), backdrop) ?? "unknown";
}
