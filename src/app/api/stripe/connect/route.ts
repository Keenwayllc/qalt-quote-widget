import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/stripe/connect
 * Initiates Stripe Connect onboarding using Account Links (Pivot from OAuth).
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json({ error: "companyId is required." }, { status: 400 });
    }

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.qalt.site";

    // 1. Fetch the company to see if they already have an account ID
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      select: { stripeConnectAccountId: true, email: true, name: true }
    });

    if (!company) {
      return NextResponse.json({ error: "Company not found." }, { status: 404 });
    }

    let accountId = company.stripeConnectAccountId;

    // 2. If no account ID exists, create a new "standard" connected account
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "standard",
        email: company.email || undefined,
        business_profile: {
          name: company.name || undefined,
        },
        metadata: {
          companyId: companyId
        }
      });
      
      accountId = account.id;

      // Save it immediately
      await prisma.company.update({
        where: { id: companyId },
        data: { stripeConnectAccountId: accountId }
      });
    }

    // 3. Create an Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/api/stripe/connect?companyId=${companyId}`,
      return_url: `${baseUrl}/api/stripe/connect/callback?companyId=${companyId}`,
      type: "account_onboarding",
    });

    return NextResponse.redirect(accountLink.url);
  } catch (error: unknown) {
    console.error("Stripe Connect Error:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: "Failed to initiate Stripe Connect.", details: error instanceof Error ? error.message : "" }, { status: 500 });
  }
}
