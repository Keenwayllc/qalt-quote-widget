import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { censusZipAreaUrl, normalizeZipAreas, parseZipAreaQuery } from "@/lib/zip-areas";
import { widgetRequestAllowed } from "@/lib/widget-rate-limit";

// Only successful, validated boundaries enter the cache. Provider errors stay retryable.
const lookupZipAreas = unstable_cache(async (zips: string[]) => {
    const response = await fetch(censusZipAreaUrl(zips), { signal: AbortSignal.timeout(15000), cache: "no-store" });
    if (!response.ok) throw new Error("Boundary service failed");
    const text = await response.text();
    if (text.length > 4000000) throw new Error("Boundary response too large");
    return normalizeZipAreas(JSON.parse(text), zips);
}, ["census-zip-areas-2020-v1"], { revalidate: 604800 });

export async function GET(request: Request) {
  let zips: string[];
  try { zips = parseZipAreaQuery(new URL(request.url).searchParams.get("zips") || ""); }
  catch { return NextResponse.json({ error: "Enter 1 to 20 five-digit ZIP codes." }, { status: 400 }); }
  if (!widgetRequestAllowed(request, "zip-areas", 60)) return NextResponse.json({ error: "Please wait before looking up more ZIP areas." }, { status: 429, headers: { "Retry-After": "60" } });
  try {
    const areas = await lookupZipAreas(zips);
    const missing = zips.filter(zip => !areas.features.some(feature => feature.properties.zip === zip));
    return NextResponse.json({ ...areas, missing }, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=604800" } });
  } catch {
    return NextResponse.json({ error: "ZIP area boundaries are temporarily unavailable. Please retry." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
