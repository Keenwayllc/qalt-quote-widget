import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { issuePaidInvoiceDocument } from "@/lib/customer-invoice-documents";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

// Map a trusted Stripe Price ID to a paid plan. Recognizes BOTH monthly and
// annual price IDs for each tier. Returns null for any unknown price — callers
// MUST fail closed on null (never grant a paid tier, never rewrite an existing
// plan) so a mis/unconfigured price can't silently escalate or downgrade.
function getPaidPlanFromPriceId(priceId: string): "PRO" | "ENTERPRISE" | null {
  const proIds = [process.env.STRIPE_PRO_PRICE_ID, process.env.STRIPE_PRO_ANNUAL_PRICE_ID].filter(Boolean);
  const enterpriseIds = [process.env.STRIPE_ENTERPRISE_PRICE_ID, process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID].filter(Boolean);
  if (proIds.includes(priceId)) return "PRO";
  if (enterpriseIds.includes(priceId)) return "ENTERPRISE";
  return null;
}

type QuoteBinding = {
  id: string;
  companyId: string;
  paymentStatus: string | null;
  stripePaymentIntentId: string | null;
  company: { stripeConnectAccountId: string | null };
};

/**
 * A signed Stripe event is not enough to mutate a quote: the event must be
 * bound to THIS quote's tenant. All three signals below must be consistent
 * before a payment_intent.* event may touch the quote. Quote payments are
 * created on the company's Connected account with quoteId + companyId in the
 * PaymentIntent metadata and the expected PaymentIntent id persisted up front,
 * so every legitimate event carries all three. Any mismatch fails closed.
 */
function isQuoteEventBound(
  event: Stripe.Event,
  intent: Stripe.PaymentIntent,
  quote: QuoteBinding
): boolean {
  // 1. Metadata company binding — when present it must be this quote's company.
  const metaCompanyId = intent.metadata?.companyId;
  if (metaCompanyId && metaCompanyId !== quote.companyId) {
    console.error(`[Webhook][security] companyId metadata mismatch for quote ${quote.id}: intent=${metaCompanyId} quote=${quote.companyId}`);
    return false;
  }

  // 2. Connected-account binding — quote payments run on the company's
  // Connected account, so when both are present they must match. This blocks an
  // event for Merchant A's account from altering Merchant B's quote.
  const eventAccount = event.account;
  const connectedAccountId = quote.company.stripeConnectAccountId;
  if (eventAccount && connectedAccountId && eventAccount !== connectedAccountId) {
    console.error(`[Webhook][security] connected account mismatch for quote ${quote.id}: event=${eventAccount} company=${connectedAccountId}`);
    return false;
  }

  // 3. Expected-PaymentIntent binding — once the quote recorded its expected PI
  // id, only that PaymentIntent may update it.
  if (quote.stripePaymentIntentId && quote.stripePaymentIntentId !== intent.id) {
    console.error(`[Webhook][security] payment intent mismatch for quote ${quote.id}: intent=${intent.id} expected=${quote.stripePaymentIntentId}`);
    return false;
  }

  return true;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event | undefined;

  // Try both webhook secrets: platform account and connected accounts
  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET!,
    process.env.STRIPE_CONNECT_WEBHOOK_SECRET!,
  ].filter(Boolean);

  let verified = false;
  for (const secret of secrets) {
    try {
      event = stripe.webhooks.constructEvent(body, sig, secret);
      verified = true;
      break;
    } catch {
      // Try next secret
    }
  }

  if (!verified || !event) {
    console.error("Webhook signature verification failed with all secrets.");
    return NextResponse.json({ error: "Webhook signature failed." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const companyId = session.metadata?.companyId;
        const subscriptionId = session.subscription as string;

        if (!companyId || !subscriptionId) break;

        // Retrieve the subscription and resolve the plan from the trusted Stripe
        // Price ID (never from browser/metadata). An unknown price fails closed:
        // no paid tier granted, no plan rewrite.
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id ?? "";
        const plan = getPaidPlanFromPriceId(priceId);
        if (!plan) {
          console.warn(`[Webhook] checkout.session.completed for company ${companyId} with unknown price ${priceId} — not granting a paid plan`);
          break;
        }

        await prisma.company.update({
          where: { id: companyId },
          data: {
            subscriptionPlan: plan,
            stripeSubscriptionId: subscriptionId,
          },
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const priceId = subscription.items.data[0]?.price.id ?? "";
        const plan = getPaidPlanFromPriceId(priceId);
        const isEntitled = subscription.status === "active" || subscription.status === "trialing";

        const company = await prisma.company.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (!company) break;

        if (isEntitled) {
          // Active/trialing but unknown price → do NOT grant a paid tier and do
          // NOT overwrite the existing plan just because the mapper failed.
          if (!plan) {
            console.warn(`[Webhook] subscription.updated for company ${company.id} active/trialing with unknown price ${priceId} — leaving plan unchanged`);
            break;
          }
          await prisma.company.update({
            where: { id: company.id },
            data: { subscriptionPlan: plan },
          });
        } else {
          // No longer entitled (canceled/past_due/unpaid/etc.) → downgrade.
          await prisma.company.update({
            where: { id: company.id },
            data: { subscriptionPlan: "STARTER" },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const company = await prisma.company.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (!company) break;

        await prisma.company.update({
          where: { id: company.id },
          data: {
            subscriptionPlan: "STARTER",
            stripeSubscriptionId: null,
          },
        });
        break;
      }

      // Quote payment: mark QuoteRequest PAID and create its immutable paid invoice.
      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const quoteId = intent.metadata?.quoteId;
        if (!quoteId) break; // Not a quote payment — ignore

        const quote = await prisma.quoteRequest.findUnique({
          where: { id: quoteId },
          select: {
            id: true,
            companyId: true,
            paymentStatus: true,
            stripePaymentIntentId: true,
            paidAt: true,
            company: { select: { stripeConnectAccountId: true } },
          },
        });

        // Unknown quote — ignore safely (ack so Stripe stops retrying). No 500,
        // no cross-tenant existence revealed.
        if (!quote) {
          console.warn(`[Webhook] payment_intent.succeeded for unknown quote ${quoteId} — ignored`);
          break;
        }

        // Tenant binding must hold before any mutation or document issuance.
        if (!isQuoteEventBound(event, intent, quote)) break;

        // Use a stable Stripe event time for first-write semantics. On retries the
        // persisted quote.paidAt wins, keeping the invoice timestamp deterministic.
        const paidAt = quote.paidAt ?? new Date(event.created * 1000);

        if (quote.paymentStatus !== "PAID") {
          await prisma.quoteRequest.update({
            where: { id: quote.id },
            data: {
              paymentStatus: "PAID",
              stripePaymentIntentId: intent.id,
              paidAt,
              status: "CONFIRMED", // Elevate quote status to confirmed
            },
          });
          console.log(`[Webhook] Quote ${quote.id} marked as PAID via payment intent ${intent.id}`);
        } else {
          console.log(`[Webhook] Quote ${quote.id} already PAID — ensuring invoice exists`);
        }

        // Idempotent and retry-healing: if quote update succeeded but invoice
        // creation failed, Stripe receives a 500 and retries. On the retry the
        // already-PAID branch still calls this helper, which creates/reuses the
        // single INVOICE record without consuming a second number.
        const invoice = await issuePaidInvoiceDocument({
          companyId: quote.companyId,
          quoteRequestId: quote.id,
          stripePaymentIntentId: intent.id,
          paidAt,
        });
        console.log(`[Webhook] Paid invoice ${invoice.number} ready for quote ${quote.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const quoteId = intent.metadata?.quoteId;
        if (!quoteId) break;

        const quote = await prisma.quoteRequest.findUnique({
          where: { id: quoteId },
          select: {
            id: true,
            companyId: true,
            paymentStatus: true,
            stripePaymentIntentId: true,
            company: { select: { stripeConnectAccountId: true } },
          },
        });

        if (!quote) {
          console.warn(`[Webhook] payment_intent.payment_failed for unknown quote ${quoteId} — ignored`);
          break;
        }

        // Same tenant binding as success — an unrelated failed intent must never
        // mark another quote FAILED.
        if (!isQuoteEventBound(event, intent, quote)) break;

        // Never overwrite an already-paid quote due to a stale/duplicate failure.
        if (quote.paymentStatus === "PAID") {
          console.warn(`[Webhook] Ignoring failure for already-PAID quote ${quote.id}`);
          break;
        }

        await prisma.quoteRequest.update({
          where: { id: quote.id },
          data: { paymentStatus: "FAILED" },
        });
        console.log(`[Webhook] Quote ${quote.id} payment FAILED: ${intent.last_payment_error?.message}`);
        break;
      }

    }
  } catch (error: unknown) {
    console.error("Webhook handler error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
