import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { getPublicQuoteDocument } from "@/lib/customer-document-access";
import { signCustomerQuoteToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const PRIVATE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const document = await getPublicQuoteDocument(token);
    if (!document) return NextResponse.json({ error: "Quote not found" }, { status: 404, headers: PRIVATE_HEADERS });

    const quote = await prisma.quoteRequest.findFirst({
      where: { id: document.quoteRequestId, companyId: document.companyId, deletedAt: null },
      include: { company: true },
    });
    if (!quote) return NextResponse.json({ error: "Quote not found" }, { status: 404, headers: PRIVATE_HEADERS });

    if (quote.paymentStatus === null) {
      return NextResponse.json({ error: "Online payment is not enabled for this quote." }, { status: 409, headers: PRIVATE_HEADERS });
    }
    if (quote.paymentStatus === "PAID") {
      return NextResponse.json({ error: "This quote is already paid." }, { status: 409, headers: PRIVATE_HEADERS });
    }
    if (["LOST", "CANCELLED"].includes(quote.status)) {
      return NextResponse.json({ error: "This quote is no longer available." }, { status: 409, headers: PRIVATE_HEADERS });
    }
    if (!quote.company.stripeConnectAccountId) {
      return NextResponse.json({ error: "Online payment is temporarily unavailable." }, { status: 409, headers: PRIVATE_HEADERS });
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qalt.site";
    const amountInCents = Math.round(quote.estimatedPrice * 100);
    const successToken = await signCustomerQuoteToken({ quoteId: quote.id, companyId: quote.companyId });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: quote.customerEmail,
      payment_method_types: ["card"],
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
      success_url: `${baseUrl}/widget/payment-success?token=${successToken}`,
      cancel_url: `${baseUrl}/quote/${token}`,
      payment_intent_data: {
        metadata: {
          quoteId: quote.id,
          companyId: quote.companyId,
          customerEmail: quote.customerEmail,
          customerName: quote.customerName,
        },
      },
      metadata: {
        quoteId: quote.id,
        companyId: quote.companyId,
      },
    }, { stripeAccount: quote.company.stripeConnectAccountId });

    await prisma.quoteRequest.updateMany({
      where: { id: quote.id, companyId: quote.companyId, deletedAt: null },
      data: {
        stripePaymentIntentId: session.payment_intent as string | null,
        paymentStatus: "PENDING",
      },
    });

    return NextResponse.json({ checkoutUrl: session.url }, { headers: PRIVATE_HEADERS });
  } catch (error: unknown) {
    console.error("Public quote payment error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Unable to start payment." }, { status: 500, headers: PRIVATE_HEADERS });
  }
}
