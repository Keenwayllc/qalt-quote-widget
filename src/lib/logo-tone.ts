import sharp from "sharp";
import type { LogoTone } from "@/lib/logo-plate";

export type { LogoTone };

// Uploads land in this bucket (src/app/api/upload/route.ts). Only these URLs
// are fetched server-side, so the tone endpoint can't be used to probe
// arbitrary hosts.
const ALLOWED_PREFIX = "https://storage.googleapis.com/qalt-site-production.firebasestorage.app/";

export function isAnalyzableLogoUrl(url: string) {
  return url.startsWith(ALLOWED_PREFIX) && !url.includes("..");
}

const SAMPLE_SIZE = 96;
const VISIBLE_ALPHA = 48;
const LIGHT_LUMA = 200;
const DARK_LUMA = 70;
// Share of visible ink that must be light (or dark) before a plate is used.
// Full-color logos rarely cross this, so they render untouched.
const DOMINANT_SHARE = 0.6;

export async function analyzeLogoTone(input: Buffer): Promise<LogoTone> {
  const { data, info } = await sharp(input, { limitInputPixels: 25_000_000 })
    .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "inside", withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const total = info.width * info.height;
  let visible = 0;
  let opaque = 0;
  let weight = 0;
  let lightWeight = 0;
  let darkWeight = 0;

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a >= 250) opaque++;
    if (a < VISIBLE_ALPHA) continue;
    visible++;
    const luma = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const w = a / 255;
    weight += w;
    if (luma >= LIGHT_LUMA) lightWeight += w;
    else if (luma <= DARK_LUMA) darkWeight += w;
  }

  if (total === 0 || visible < total * 0.01) return "unknown";
  // A JPG or flattened PNG brings its own background box, which already
  // separates the mark from whatever surface it sits on.
  if (opaque / total > 0.97) return "opaque";
  if (lightWeight / weight >= DOMINANT_SHARE) return "light";
  if (darkWeight / weight >= DOMINANT_SHARE) return "dark";
  return "balanced";
}

const cache = new Map<string, Promise<LogoTone>>();

/** Tone for a stored logo URL, memoized per server instance. */
export function getLogoTone(url: string | null | undefined): Promise<LogoTone> {
  if (!url || !isAnalyzableLogoUrl(url)) return Promise.resolve("unknown");
  const hit = cache.get(url);
  if (hit) return hit;
  const pending = (async () => {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) return "unknown" as const;
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length > 6 * 1024 * 1024) return "unknown" as const;
      return await analyzeLogoTone(bytes);
    } catch {
      return "unknown" as const;
    }
  })();
  cache.set(url, pending);
  if (cache.size > 500) cache.delete(cache.keys().next().value as string);
  return pending;
}
