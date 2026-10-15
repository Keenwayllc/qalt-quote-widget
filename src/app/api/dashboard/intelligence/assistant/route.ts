import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import { answerQuestion, MAX_QUESTION_LENGTH } from "@/lib/merchant-assistant";
import { loadMerchantIntelligence } from "@/lib/merchant-intelligence-data";

const PRIVATE = { "Cache-Control": "private, no-store" };
const WINDOW_MS = 60_000;
const LIMIT = 20;
// Per-instance throttle. Answers are rule-based (no AI provider cost), so this
// only guards the database against a runaway client.
const recent = new Map<string, number[]>();

function allow(companyId: string, now: number) {
  const hits = (recent.get(companyId) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= LIMIT) return false;
  hits.push(now);
  recent.set(companyId, hits);
  if (recent.size > 5000) recent.clear();
  return true;
}

export async function POST(request: Request) {
  try {
    const company = await getCurrentCompany();
    if (!allow(company.id, Date.now())) {
      return NextResponse.json({ error: "Too many questions at once. Wait a minute and try again." }, { status: 429, headers: PRIVATE });
    }
    const body = await request.json().catch(() => null);
    const question = typeof body?.question === "string" ? body.question.trim() : "";
    if (!question) return NextResponse.json({ error: "Ask a question" }, { status: 400, headers: PRIVATE });
    if (question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json({ error: `Keep questions under ${MAX_QUESTION_LENGTH} characters` }, { status: 400, headers: PRIVATE });
    }
    const data = await loadMerchantIntelligence();
    const answer = answerQuestion(question, {
      quotes: data.quotes,
      profiles: data.profiles,
      recommendations: data.recommendations,
      now: data.now,
      quoteId: typeof body?.quoteId === "string" ? body.quoteId : null,
    });
    return NextResponse.json({ answer }, { headers: PRIVATE });
  } catch (error) {
    console.error("[intelligence] assistant failed:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "The assistant is unavailable right now. Try again shortly." }, { status: 500, headers: PRIVATE });
  }
}
