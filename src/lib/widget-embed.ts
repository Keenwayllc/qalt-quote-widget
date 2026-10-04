// Canonical links never inherit a dashboard, preview, or custom-domain origin.
export function widgetFormUrl(formId: string | null | undefined): string {
  if (!formId || !/^[a-zA-Z0-9_-]{1,128}$/.test(formId)) return "";
  return `https://www.qalt.site/widget/form/${encodeURIComponent(formId)}`;
}

export function widgetEmbedCode(formId: string | null | undefined): string {
  const url = widgetFormUrl(formId);
  if (!url) return "";
  // Script-free HTML works in builders that strip scripts. Long forms retain scrolling.
  return `<iframe
  src="${url}"
  title="Delivery quote form"
  width="100%"
  height="1000"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="payment"
  style="display: block; width: 100%; min-height: 1000px; border: 0;"
></iframe>`;
}
