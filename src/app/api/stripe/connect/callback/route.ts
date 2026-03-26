import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/stripe/connect/callback
 * Stripe redirects here after the user completes (or exits) the Account Link onboarding.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    if (!companyId) {
      return NextResponse.json({ error: "Invalid request. Missing companyId." }, { status: 400 });
    }

    // In the Account Links flow, the account ID was already saved before redirecting to Stripe.
    // We just need to send the user back to the dashboard.
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.qalt.site";
    
    // We redirect to the widget settings page with a success flag
    return NextResponse.redirect(`${baseUrl}/dashboard/widget?connect=success`);
  } catch (error: unknown) {
    console.error("Stripe Connect Callback Error:", error instanceof Error ? error.message : String(error));
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.qalt.site";
    return NextResponse.redirect(`${baseUrl}/dashboard/widget?connect=error`);
  }
}
