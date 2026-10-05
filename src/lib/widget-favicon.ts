export const DEFAULT_WIDGET_FAVICON = "/images/qalt-icon-400.jpg";
const FAVICON_PREFIX = "https://storage.googleapis.com/qalt-site-production.firebasestorage.app/uploads/";

/** Only normalized public icons uploaded by this merchant belong on its forms. */
export function safeWidgetFavicon(value: unknown, companyId: string): string | null {
  if (typeof value !== "string" || !/^[a-zA-Z0-9_-]+$/.test(companyId)) return null;
  const prefix = `${FAVICON_PREFIX}${companyId}/favicon-`;
  if (!value.startsWith(prefix)) return null;
  const filename = value.slice(prefix.length);
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.png$/i.test(filename) ? value : null;
}

export function widgetPageMetadata(company: { id: string; name: string }, form: { faviconUrl?: string | null; companyNameText?: string | null }) {
  const icon = safeWidgetFavicon(form.faviconUrl, company.id) || DEFAULT_WIDGET_FAVICON;
  return {
    title: `${form.companyNameText?.trim() || company.name} | Delivery Quote`,
    icons: { icon, shortcut: icon, apple: icon },
  };
}
