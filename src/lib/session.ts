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
 * Returns true if the company's free trial has expired and they have no active paid plan.
 * Existing users with no trialEndsAt are grandfathered (not blocked).
 */
export function isTrialExpired(company: Awaited<ReturnType<typeof getCurrentCompany>>): boolean {
  if (company.subscriptionPlan === "STARTER") return false; // Free Forever
  const isPaid = company.subscriptionPlan !== "STARTER";
  if (isPaid) return false;
  if (!company.trialEndsAt) return false; // grandfathered user
  return new Date() > company.trialEndsAt;
}

/**
 * Returns how many days remain in the trial, or null if not on trial.
 * Returns 0 if trial ended today or in the past.
 */
export function trialDaysRemaining(company: Awaited<ReturnType<typeof getCurrentCompany>>): number | null {
  if (company.subscriptionPlan === "STARTER") return null; // No trial countdown for Free plan
  const isPaid = company.subscriptionPlan !== "STARTER";
  if (isPaid || !company.trialEndsAt) return null;
  const diff = company.trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
