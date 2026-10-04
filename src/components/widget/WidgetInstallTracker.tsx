"use client";

import { useEffect } from "react";

export default function WidgetInstallTracker({ companyId, formId }: { companyId: string; formId: string }) {
  useEffect(() => {
    if (window.top === window.self) return;

    const referrer = document.referrer;
    if (!referrer) return;

    let domain = "";
    try {
      domain = new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
    } catch {
      return;
    }
    if (!domain || domain === window.location.hostname.replace(/^www\./, "")) return;

    const body = JSON.stringify({ companyId, formId, domain });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/widget/install-ping", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/widget/install-ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [companyId, formId]);

  return null;
}
