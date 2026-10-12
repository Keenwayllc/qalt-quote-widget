// Shared display values from the existing published pricing and merchant billing UI.
// Stripe price IDs and subscription rules remain server-side and unchanged.
// When billing prices change, reconcile these values with Stripe before publishing.
export const BILLING_DISPLAY = {
  PRO: { monthly: 39, annualTotal: 348 },
  ENTERPRISE: { monthly: 99, annualTotal: 948 },
} as const;

export function billingDisplay(plan: keyof typeof BILLING_DISPLAY, annual: boolean) {
  const { monthly, annualTotal } = BILLING_DISPLAY[plan];
  const savings = monthly * 12 - annualTotal;
  return {
    price: `$${annual ? annualTotal / 12 : monthly}`,
    detail: annual ? `Billed $${annualTotal} annually · save $${savings}` : "Billed monthly",
    badge: `Save $${savings}`,
  };
}
