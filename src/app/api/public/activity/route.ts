import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { createHash } from "node:crypto";
import prisma from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { ACTIVITY_WINDOW_MS, buildPublicActivity, type PaidActivity } from "@/lib/public-activity";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

const recentActivity = unstable_cache(async () => {
  const now = Date.now();
  const companies = await prisma.company.findMany({
    where: { emailVerified: true, isAdmin: false, isSuperAdmin: false },
    select: {
      id: true, name: true, emailVerified: true, isAdmin: true, isSuperAdmin: true,
      registrationSource: true, createdAt: true, trialEndsAt: true,
      subscriptionPlan: true, stripeSubscriptionId: true,
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  const prices: Record<string, "PRO" | "ENTERPRISE"> = {};
  for (const price of [process.env.STRIPE_PRO_PRICE_ID, process.env.STRIPE_PRO_ANNUAL_PRICE_ID]) if (price) prices[price] = "PRO";
  for (const price of [process.env.STRIPE_ENTERPRISE_PRICE_ID, process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID]) if (price) prices[price] = "ENTERPRISE";
  const payments: PaidActivity[] = [];
  if (process.env.STRIPE_SECRET_KEY && companies.some(company => company.stripeSubscriptionId)) {
    try {
      // Read verified live billing events. Never change a subscription or charge.
      const events = await getStripe().events.list({
        types: ["invoice.paid"], limit: 100,
        created: { gte: Math.floor((now - ACTIVITY_WINDOW_MS) / 1000) },
      }, { timeout: 5000, maxNetworkRetries: 0 });
      for (const event of events.data) {
        if (event.type !== "invoice.paid") continue;
        // Stripe retains the API version of each event. Support both original
        // and current invoice shapes without modifying or refetching billing.
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string | { id: string } };
        const subscription = invoice.parent?.subscription_details?.subscription || invoice.subscription;
        const priceIdFor = (item: Stripe.InvoiceLineItem) => {
          const price = item.pricing?.price_details?.price || (item as Stripe.InvoiceLineItem & { price?: string | { id: string } }).price;
          return typeof price === "string" ? price : price?.id || null;
        };
        // Billing events use their original invoice prices, not today's plan.
        const line = invoice.lines.data.find(item => prices[priceIdFor(item) || ""]);
        payments.push({
          id: invoice.id, livemode: event.livemode, created: event.created,
          subscriptionId: typeof subscription === "string" ? subscription : subscription?.id || null,
          amountPaid: invoice.amount_paid, billingReason: invoice.billing_reason,
          priceId: line ? priceIdFor(line) : null,
        });
      }
    } catch {
      // A marketing card must never interfere with signup or checkout.
      // If billing is unavailable, only real verified signup records are used.
    }
  }
  return buildPublicActivity(companies, payments, prices, now).map((item, index) => ({
    ...item,
    id: createHash("sha256").update(`${item.kind}:${item.plan}:${item.occurredAt}:${index}`).digest("hex").slice(0, 16),
  }));
}, ["qalt-public-activity-v1"], { revalidate: 300 });

export async function GET() {
  try {
    const events = await recentActivity();
    return NextResponse.json({ events }, { headers: { "Cache-Control": "public, max-age=60, s-maxage=300" } });
  } catch {
    return NextResponse.json({ events: [] }, { headers: { "Cache-Control": "no-store" } });
  }
}
