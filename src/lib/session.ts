import { cache } from "react";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const getCurrentCompany = cache(async function getCurrentCompany() {
  const cookieStore = await cookies();
  const token = cookieStore.get("qalt_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.companyId) {
    redirect("/login");
  }

  const company = await prisma.company.findUnique({
    where: { id: payload.companyId },
    include: {
      pricingProfiles: true,
      widgetSettings: true,
    }
  });

  if (!company) {
    redirect("/login");
  }

  return company;
});

/** Returns the company-level default pricing (widgetSettingsId === null) */
export function getDefaultPricing(company: Awaited<ReturnType<typeof getCurrentCompany>>) {
  return company.pricingProfiles.find((p) => p.widgetSettingsId === null) ?? null;
}

/**
 * A company is "on trial" if they're on a paid plan tier but have no active
 * Stripe subscription — i.e. they signed up and got PRO features for 14 days
 * without paying. STARTER (free forever) and users with stripeSubscriptionId
 * (actually paying) are never on trial.
 */
function isOnTrial(company: Awaited<ReturnType<typeof getCurrentCompany>>): boolean {
  if (company.subscriptionPlan === "STARTER") return false;
  if (company.stripeSubscriptionId) return false;
  return !!company.trialEndsAt;
}

export function isTrialExpired(company: Awaited<ReturnType<typeof getCurrentCompany>>): boolean {
  if (!isOnTrial(company)) return false;
  return new Date() > company.trialEndsAt!;
}

/**
 * Returns how many days remain in the trial, or null if not on trial.
 * Returns 0 if trial ended today or in the past.
 */
export function trialDaysRemaining(company: Awaited<ReturnType<typeof getCurrentCompany>>): number | null {
  if (!isOnTrial(company)) return null;
  const diff = company.trialEndsAt!.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * True for users whose PRO trial ended and were auto-downgraded to STARTER.
 * Use to surface a persistent "upgrade to restore PRO" nudge.
 */
export function wasTrialDowngraded(company: Awaited<ReturnType<typeof getCurrentCompany>>): boolean {
  if (company.subscriptionPlan !== "STARTER") return false;
  if (company.stripeSubscriptionId) return false;
  if (!company.trialEndsAt) return false;
  return new Date() > company.trialEndsAt;
}
