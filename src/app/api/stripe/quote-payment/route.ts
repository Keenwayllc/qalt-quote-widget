import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * POST /api/stripe/quote-payment
 * Creates a Stripe Checkout Session for a specific quote.
 * Called by the widget frontend after a customer submits quote details
 * and the company has paymentsEnabled = true.
 *
 * Body: { quoteId: string }
 */
export async function POST(req: Request) {
  try {
    const { quoteId } = await req.json();

    if (!quoteId) {
      return NextResponse.json({ error: "quoteId is required." }, { status: 400 });
    }

    const quote = await prisma.quoteRequest.findUnique({
      where: { id: quoteId },
      include: { company: true },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    }

    if (quote.paymentStatus === "PAID") {
      return NextResponse.json({ error: "Quote already paid." }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qalt.site";

    const amountInCents = Math.round(quote.estimatedPrice * 100);

    // Stripe Connect: Use the company's connected account
    const connectedAccountId = quote.company.stripeConnectAccountId;
    
    if (!connectedAccountId) {
      return NextResponse.json({ 
        error: "This company has not connected a Stripe account yet. Payments cannot be processed." 
      }, { status: 400 });
    }

    // Use Checkout Session on the connected account.
    // IMPORTANT: Do NOT pass a platform 'customer' here — platform customers are
    // not visible to connected accounts. Use customer_email instead.
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: quote.customerEmail,
      payment_method_types: ["card"], // Explicitly allow card payments
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Delivery Booking — ${quote.serviceType}`,
              description: `${quote.pickupZip} → ${quote.dropoffZip} · ${quote.distanceMiles.toFixed(1)} miles`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/widget/payment-success?quoteId=${quote.id}`,
      cancel_url: `${baseUrl}/widget/${quote.companyId}?cancelled=1`,
      payment_intent_data: {
        metadata: {
          quoteId: quote.id,
          companyId: quote.company.id,
          customerEmail: quote.customerEmail,
          customerName: quote.customerName,
        },
      },
      metadata: {
        quoteId: quote.id,
        companyId: quote.company.id,
      },
    }, {
      stripeAccount: connectedAccountId,
    });

    // Store payment intent ID optimistically
    await prisma.quoteRequest.update({
      where: { id: quoteId },
      data: {
        stripePaymentIntentId: session.payment_intent as string | null,
        paymentStatus: "PENDING",
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Quote payment error:", message);
    return NextResponse.json({ error: message || "Failed to create payment session." }, { status: 500 });
  }
}
