import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const company = await getCurrentCompany();
    const { plan } = await req.json();

    const priceIds: Record<string, string | undefined> = {
      PRO: process.env.STRIPE_PRO_PRICE_ID,
      ENTERPRISE: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    };
    const priceId = priceIds[plan];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const stripe = getStripe();

    // Create Stripe customer if one doesn't exist yet
    let stripeCustomerId = company.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: company.email,
        name: company.name,
        metadata: { companyId: company.id },
      });
      stripeCustomerId = customer.id;
      await prisma.company.update({
        where: { id: company.id },
        data: { stripeCustomerId },
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qalt.site";

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard/billing?success=1`,
      cancel_url: `${baseUrl}/dashboard/billing`,
      metadata: { companyId: company.id },
      subscription_data: {
        metadata: { companyId: company.id },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe checkout error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Failed to create checkout session." }, { status: 500 });
  }
}
