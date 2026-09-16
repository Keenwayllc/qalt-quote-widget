import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendQuoteDocumentEmail } from "@/lib/customer-document-email";
import { hasFollowUp, logFollowUp } from "@/lib/growth-engine";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const oldest = new Date(now.getTime() - 72 * 60 * 60 * 1000);
  const newest = new Date(now.getTime() - 4 * 60 * 60 * 1000);
  const quotes = await prisma.quoteRequest.findMany({
    where: {
      deletedAt: null,
      createdAt: { gte: oldest, lte: newest },
      status: { notIn: ["LOST", "CANCELLED", "WON", "PAID"] },
      NOT: { paymentStatus: "PAID" },
    },
    select: { id: true, companyId: true, customerEmail: true, createdAt: true },
    orderBy: { createdAt: "asc" },
    take: 75,
  });

  let sent = 0;
  let skipped = 0;
  let failed = 0;
  for (const quote of quotes) {
    if (!quote.customerEmail) { skipped++; continue; }
    const ageHours = (now.getTime() - quote.createdAt.getTime()) / 3600000;
    const kind = ageHours >= 24 ? "DAY_1" : "HOUR_4";
    if (await hasFollowUp(quote.id, kind)) { skipped++; continue; }
    try {
      await sendQuoteDocumentEmail({ companyId: quote.companyId, quoteRequestId: quote.id, to: quote.customerEmail, now });
      await logFollowUp(quote.companyId, quote.id, kind);
      sent++;
    } catch (error) {
      failed++;
      console.error("Quote follow-up failed", quote.id, error);
    }
  }
  return NextResponse.json({ success: true, scanned: quotes.length, sent, skipped, failed });
}
