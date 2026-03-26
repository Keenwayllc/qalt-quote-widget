import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

function getPlanFromPriceId(priceId: string): string {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return "PRO";
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) return "ENTERPRISE";
  return "STARTER";
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

        // Retrieve subscription to determine the price
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price.id ?? "";
        const plan = getPlanFromPriceId(priceId);

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
        const plan = getPlanFromPriceId(priceId);
        const isActive = subscription.status === "active" || subscription.status === "trialing";

        const company = await prisma.company.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });
        if (!company) break;

        await prisma.company.update({
          where: { id: company.id },
          data: { subscriptionPlan: isActive ? plan : "STARTER" },
        });
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

      // Quote payment: mark QuoteRequest as PAID
      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const quoteId = intent.metadata?.quoteId;
        if (!quoteId) break; // Not a quote payment — ignore

        await prisma.quoteRequest.update({
          where: { id: quoteId },
          data: {
            paymentStatus: "PAID",
            stripePaymentIntentId: intent.id,
            paidAt: new Date(),
            status: "CONFIRMED", // Elevate quote status to confirmed
          },
        });
        console.log(`[Webhook] Quote ${quoteId} marked as PAID via payment intent ${intent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const quoteId = intent.metadata?.quoteId;
        if (!quoteId) break;

        await prisma.quoteRequest.update({
          where: { id: quoteId },
          data: { paymentStatus: "FAILED" },
        });
        console.log(`[Webhook] Quote ${quoteId} payment FAILED: ${intent.last_payment_error?.message}`);
        break;
      }

    }
  } catch (error: unknown) {
    console.error("Webhook handler error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
