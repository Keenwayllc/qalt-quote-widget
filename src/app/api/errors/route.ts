import { NextResponse, after } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { recordAppError } from "@/lib/error-triage";

export const dynamic = "force-dynamic";

// Per-instance flood guard for this public endpoint.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;
const hits = new Map<string, { count: number; start: number }>();

function limited(ip: string, now: number): boolean {
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    if (hits.size > 5000) hits.clear();
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  return ++entry.count > MAX_PER_WINDOW;
}

/** Browser error reports from src/lib/report-client-error.ts. Always answers 204. */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip, Date.now())) return new NextResponse(null, { status: 204 });

  const text = await req.text().catch(() => "");
  if (!text || text.length > 20_000) return new NextResponse(null, { status: 204 });
  let body: Record<string, unknown>;
  try { body = JSON.parse(text); } catch { return new NextResponse(null, { status: 204 }); }
  if (typeof body.message !== "string") return new NextResponse(null, { status: 204 });

  const token = (await cookies()).get("qalt_token")?.value;
  const companyId = token ? (await verifyToken(token).catch(() => null))?.companyId ?? null : null;
  const userAgent = req.headers.get("user-agent");

  after(() => recordAppError({
    source: "client",
    message: body.message as string,
    stack: typeof body.stack === "string" ? body.stack : null,
    path: typeof body.path === "string" ? body.path : null,
    userAgent,
    companyId,
  }));
  return new NextResponse(null, { status: 204 });
}
