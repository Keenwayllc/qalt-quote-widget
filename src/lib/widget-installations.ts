// Store only the hostname. Never retain visitor URLs, query strings, or identities.
export function externalWidgetHost(value: unknown, appUrl: string): string | null {
  if (typeof value !== "string" || value.length > 2048) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    if (host.length > 253 || host.split(".").some((label) =>
      label.length > 63 || !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(label))) return null;
    const appHost = new URL(appUrl).hostname.toLowerCase();
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) return null;
    if (host === appHost || host === "qalt.site" || host.endsWith(".qalt.site") ||
        host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") ||
        host.endsWith(".vercel.app") || !host.includes(".") || host.includes(":") ||
        /^\d+\.\d+\.\d+\.\d+$/.test(host)) return null;
    return host;
  } catch {
    return null;
  }
}

export function widgetInstallationStatus(lastSeenAt: Date | null, now = new Date()): string {
  if (!lastSeenAt) return "Not detected";
  return now.getTime() - lastSeenAt.getTime() <= 30 * 24 * 60 * 60 * 1000
    ? "Active embed" : "Previously detected";
}

/** Hostnames are evidence of a load, not proof that a page is published. */
export function widgetInstallationSource(domain: string): string {
  const host = domain.toLowerCase();
  return ["systeme.io", "webflow.io", "myshopify.com", "wordpress.com"].some((builder) => host === builder || host.endsWith(`.${builder}`))
    ? "Builder/preview detection" : "Unknown external host";
}

export function embeddingWidgetHost(embedded: boolean, referrer: string, ancestors: readonly string[], appUrl: string): string | null {
  if (!embedded) return null;
  // A branded-domain wrapper inside the dashboard is still a dashboard preview.
  if (ancestors.some((origin) => {
    try {
      const host = new URL(origin).hostname;
      return host === new URL(appUrl).hostname || host === "qalt.site" || host.endsWith(".qalt.site") || host.endsWith(".vercel.app");
    } catch { return false; }
  })) return null;
  return externalWidgetHost(referrer, appUrl) || externalWidgetHost(ancestors[0], appUrl);
}
