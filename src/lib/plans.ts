export type SubscriptionPlan = "STARTER" | "PRO" | "ENTERPRISE";

export interface PlanEntitlements {
  maxQuotesPerMonth: number | "unlimited";
  isWhiteLabelEnabled: boolean;
  isAdvancedCustomizationEnabled: boolean; // Custom fonts, colors, etc.
  isAnalyticsDashboardEnabled: boolean;
  isCustomCSSEnabled: boolean;
  isWebhookEnabled: boolean;
  supportTier: "email" | "priority" | "dedicated";
}

export const PLANS: Record<SubscriptionPlan, PlanEntitlements> = {
  STARTER: {
    maxQuotesPerMonth: 50,
    isWhiteLabelEnabled: false,
    isAdvancedCustomizationEnabled: false,
    isAnalyticsDashboardEnabled: false,
    isCustomCSSEnabled: false,
    isWebhookEnabled: false,
    supportTier: "email",
  },
  PRO: {
    maxQuotesPerMonth: "unlimited",
    isWhiteLabelEnabled: true,
    isAdvancedCustomizationEnabled: true,
    isAnalyticsDashboardEnabled: true,
    isCustomCSSEnabled: false,
    isWebhookEnabled: true,
    supportTier: "priority",
  },
  ENTERPRISE: {
    maxQuotesPerMonth: "unlimited",
    isWhiteLabelEnabled: true,
    isAdvancedCustomizationEnabled: true,
    isAnalyticsDashboardEnabled: true,
    isCustomCSSEnabled: true,
    isWebhookEnabled: true,
    supportTier: "dedicated",
  },
};

export function getEntitlements(plan: string | null | undefined): PlanEntitlements {
  const planKey = (plan?.toUpperCase() as SubscriptionPlan) || "STARTER";
  return PLANS[planKey] || PLANS.STARTER;
}

export function hasFeatureAccess(plan: string | null | undefined, feature: keyof PlanEntitlements): boolean {
  const entitlements = getEntitlements(plan);
  const value = entitlements[feature];
  return typeof value === "boolean" ? value : true; // If it's not a boolean (like maxQuotes), assume there's some access or it's not a toggle feature
}
