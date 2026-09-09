import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/stripe/connect
 * Initiates Stripe Connect onboarding using Account Links (Pivot from OAuth).
 *
 * The connected account ALWAYS belongs to the authenticated merchant. The
 * company is derived from the signed Qalt session cookie — never from a
 * browser-supplied companyId — so a merchant cannot onboard, read, or mutate
 * another tenant's Stripe Connect account by changing a query/body parameter.
 */
export async function GET() {
  try {
    // 0. Authenticate from the signed session (same pattern as dashboard APIs).
    const cookieStore = await cookies();
    const token = cookieStore.get("qalt_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // The ONLY trusted company identity. Any companyId in the query/body is
    // ignored entirely.
    const companyId = payload.companyId;

    const stripe = getStripe();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.qalt.site";

    // 1. Fetch the authenticated company to see if they already have an account ID
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

      // Save it immediately — only to the authenticated company
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
    return NextResponse.json({ error: "Failed to initiate Stripe Connect." }, { status: 500 });
  }
}
