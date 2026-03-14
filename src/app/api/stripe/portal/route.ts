import { NextResponse } from "next/server";
import { getCurrentCompany } from "@/lib/session";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const company = await getCurrentCompany();

    if (!company.stripeCustomerId) {
      return NextResponse.json({ error: "No active subscription found." }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://qalt.site";

    const session = await stripe.billingPortal.sessions.create({
      customer: company.stripeCustomerId,
      return_url: `${baseUrl}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error("Stripe portal error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Failed to open billing portal." }, { status: 500 });
  }
}
