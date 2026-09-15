import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { issuePaidInvoiceDocument } from "@/lib/customer-invoice-documents";
import { PaidInvoiceEmailError, sendPaidInvoiceEmail } from "@/lib/customer-invoice-email";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

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

function isQuoteEventBound(
  event: Stripe.Event,
  intent: Stripe.PaymentIntent,
  quote: QuoteBinding
): boolean {
  const metaCompanyId = intent.metadata?.companyId;
  if (metaCompanyId && metaCompanyId !== quote.companyId) {
    console.error(`[Webhook][security] companyId metadata mismatch for quote ${quote.id}: intent=${metaCompanyId} quote=${quote.companyId}`);
    return false;
  }

  const eventAccount = event.account;
  const connectedAccountId = quote.company.stripeConnectAccountId;
  if (eventAccount && connectedAccountId && eventAccount !== connectedAccountId) {
    console.error(`[Webhook][security] connected account mismatch for quote ${quote.id}: event=${eventAccount} company=${connectedAccountId}`);
    return false;
  }

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
          if (!plan) {
            console.warn(`[Webhook] subscription.updated for company ${company.id} active/trialing with unknown price ${priceId} — leaving plan unchanged`);
            break;
          }
          await prisma.company.update({
            where: { id: company.id },
            data: { subscriptionPlan: plan },
          });
        } else {
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

      case "payment_intent.succeeded": {
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
            paidAt: true,
            company: { select: { stripeConnectAccountId: true } },
          },
        });

        if (!quote) {
          console.warn(`[Webhook] payment_intent.succeeded for unknown quote ${quoteId} — ignored`);
          break;
        }

        if (!isQuoteEventBound(event, intent, quote)) break;

        const paidAt = quote.paidAt ?? new Date(event.created * 1000);

        if (quote.paymentStatus !== "PAID") {
          await prisma.quoteRequest.update({
            where: { id: quote.id },
            data: {
              paymentStatus: "PAID",
              stripePaymentIntentId: intent.id,
              paidAt,
              status: "CONFIRMED",
            },
          });
          console.log(`[Webhook] Quote ${quote.id} marked as PAID via payment intent ${intent.id}`);
        } else {
          console.log(`[Webhook] Quote ${quote.id} already PAID — ensuring invoice exists`);
        }

        const invoice = await issuePaidInvoiceDocument({
          companyId: quote.companyId,
          quoteRequestId: quote.id,
          stripePaymentIntentId: intent.id,
          paidAt,
        });
        console.log(`[Webhook] Paid invoice ${invoice.number} ready for quote ${quote.id}`);

        if (!invoice.lastEmailedAt) {
          try {
            await sendPaidInvoiceEmail({
              companyId: quote.companyId,
              quoteRequestId: quote.id,
              now: paidAt,
            });
            console.log(`[Webhook] Paid invoice ${invoice.number} emailed successfully`);
          } catch (error: unknown) {
            if (error instanceof PaidInvoiceEmailError && error.code === "INVALID_RECIPIENT") {
              // Permanent data issue. A Stripe retry cannot repair an invalid or
              // missing customer email, so acknowledge the payment and leave the
              // invoice available in Merchant Console for manual follow-up.
              console.warn(`[Webhook] Paid invoice ${invoice.number} not emailed: invalid customer recipient`);
            } else {
              // Transient delivery or state failures remain retryable. Returning
              // 500 causes Stripe to retry the signed payment event, while invoice
              // issuance stays idempotent and lastEmailedAt prevents repeat sends.
              throw error;
            }
          }
        } else {
          console.log(`[Webhook] Paid invoice ${invoice.number} already emailed — skipping resend`);
        }
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

        if (!isQuoteEventBound(event, intent, quote)) break;

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