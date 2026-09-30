import { NextResponse } from "next/server";
import { getLogoTone, isAnalyzableLogoUrl } from "@/lib/logo-tone";

export const runtime = "nodejs";

// Public on purpose: widgets render on merchants' sites without a Qalt
// session. Only Qalt's own upload bucket is analyzed (see logo-tone.ts), and
// upload paths are unique per file, so the answer can be cached for a year.
export async function GET(request: Request) {
  const src = new URL(request.url).searchParams.get("src") || "";
  if (!isAnalyzableLogoUrl(src)) {
    return NextResponse.json({ tone: "unknown" }, { headers: { "Cache-Control": "public, max-age=3600" } });
  }
  const tone = await getLogoTone(src);
  return NextResponse.json(
    { tone },
    {
      headers: {
        "Cache-Control": tone === "unknown"
          ? "public, max-age=300"
          : "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    },
  );
}
