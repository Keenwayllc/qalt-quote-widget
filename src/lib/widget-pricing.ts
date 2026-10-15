/** Keep the company-wide widget aligned with the form it displays. */
export function pricingProfileForForm<T extends { widgetSettingsId: string | null }>(
  profiles: readonly T[],
  formId: string
): T | undefined {
  // Oldest default wins, matching serverQuotePricing's orderBy id fallback.
  return profiles.find((profile) => profile.widgetSettingsId === formId)
    ?? profiles
      .filter((profile) => profile.widgetSettingsId === null)
      .sort((a, b) => {
        const ai = (a as { id?: string }).id ?? "", bi = (b as { id?: string }).id ?? "";
        return ai < bi ? -1 : ai > bi ? 1 : 0;
      })[0];
}
