export type PublicActivity = {
  id: string;
  kind: "signup" | "trial" | "subscription";
  plan: "STARTER" | "PRO" | "ENTERPRISE" | null;
  occurredAt: string;
};

export type ActivityCompany = {
  id: string;
  name: string;
  emailVerified: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  registrationSource: string | null;
  createdAt: Date;
  trialEndsAt: Date | null;
  subscriptionPlan: string;
  stripeSubscriptionId: string | null;
};

export type PaidActivity = {
  id: string;
  livemode: boolean;
  created: number;
  subscriptionId: string | null;
  amountPaid: number;
  billingReason: string | null;
  priceId: string | null;
};

export const ACTIVITY_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;

// Never publish names, locations, emails, company IDs or billing identifiers.
// Test/admin accounts and unverified registrations do not provide social proof.
export function isActivityCompany(company: ActivityCompany) {
  return company.emailVerified && !company.isAdmin && !company.isSuperAdmin &&
    !/\b(test|demo|sandbox|fixture|internal)\b/i.test(company.name) &&
    !/^(test|demo|sandbox|fixture|internal)$/i.test(company.registrationSource || "");
}

export function buildPublicActivity(
  companies: ActivityCompany[],
  payments: PaidActivity[],
  pricePlans: Record<string, "PRO" | "ENTERPRISE">,
  now = Date.now(),
): Omit<PublicActivity, "id">[] {
  const eligible = companies.filter(isActivityCompany);
  const recent = (date: Date) => Number.isFinite(date.getTime()) && date.getTime() <= now && date.getTime() >= now - ACTIVITY_WINDOW_MS;
  const items: Omit<PublicActivity, "id">[] = [];
  for (const company of eligible) {
    if (!recent(company.createdAt)) continue;
    // Registration grants a 14-day Pro trial. Only label it a trial when the
    // persisted trial expiry confirms it, never infer a purchase from a plan.
    const trialDuration = company.trialEndsAt ? company.trialEndsAt.getTime() - company.createdAt.getTime() : 0;
    const hasSignupTrial = trialDuration >= 13 * 86400000 && trialDuration <= 15 * 86400000;
    items.push({
      kind: hasSignupTrial ? "trial" : "signup",
      plan: hasSignupTrial ? "PRO" : !company.trialEndsAt && company.subscriptionPlan === "STARTER" ? "STARTER" : null,
      occurredAt: company.createdAt.toISOString(),
    });
  }
  const subscriptions = new Set(eligible.map(company => company.stripeSubscriptionId).filter(Boolean));
  const seen = new Set<string>();
  for (const payment of payments) {
    const date = new Date(payment.created * 1000);
    const plan = payment.priceId ? pricePlans[payment.priceId] : undefined;
    if (!payment.livemode || payment.amountPaid <= 0 || !recent(date) || !plan ||
      !payment.subscriptionId || !subscriptions.has(payment.subscriptionId) ||
      !["subscription_create", "subscription_update"].includes(payment.billingReason || "") || seen.has(payment.id)) continue;
    seen.add(payment.id);
    items.push({ kind: "subscription", plan, occurredAt: date.toISOString() });
  }
  return items.sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt)).slice(0, 8);
}

export function activityMessage(item: Pick<PublicActivity, "kind" | "plan">) {
  if (item.kind === "subscription") return `Subscribed to ${item.plan === "ENTERPRISE" ? "Enterprise" : "Pro"}`;
  if (item.kind === "trial") return "Started a free Pro trial";
  return item.plan === "STARTER" ? "Signed up for Starter Free" : "Joined Qalt";
}

export function activityAge(occurredAt: string, now = Date.now()) {
  const elapsed = Math.max(0, now - Date.parse(occurredAt));
  if (elapsed < 60000) return "Less than a minute ago";
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
}
