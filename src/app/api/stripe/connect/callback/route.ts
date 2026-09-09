import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/stripe/connect/callback
 * Stripe redirects here after the user completes (or exits) the Account Link onboarding.
 */
export async function GET() {
  try {
    // The connected account was already created and saved against the
    // authenticated company in /api/stripe/connect (derived from the signed
    // session, never the browser). This callback only returns the user to the
    // dashboard, so it does NOT read or trust any browser-supplied companyId.
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.qalt.site";

    // We redirect to the widget settings page with a success flag
    return NextResponse.redirect(`${baseUrl}/dashboard/widget?connect=success`);
  } catch (error: unknown) {
    console.error("Stripe Connect Callback Error:", error instanceof Error ? error.message : String(error));
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.qalt.site";
    return NextResponse.redirect(`${baseUrl}/dashboard/widget?connect=error`);
  }
}
