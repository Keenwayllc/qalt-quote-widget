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
