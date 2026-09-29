/** Keep the company-wide widget aligned with the form it displays. */
export function pricingProfileForForm<T extends { widgetSettingsId: string | null }>(
  profiles: readonly T[],
  formId: string
): T | undefined {
  return profiles.find((profile) => profile.widgetSettingsId === formId)
    ?? profiles.find((profile) => profile.widgetSettingsId === null);
}
