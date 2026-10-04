"use client";

import { useEffect, useRef } from "react";
import { embeddingWidgetHost } from "@/lib/widget-installations";

export default function WidgetInstallTracker({ companyId, formId }: { companyId: string; formId: string }) {
  const sentFor = useRef("");
  useEffect(() => {
    if (window.top === window.self) return;
    const domain = embeddingWidgetHost(window.top !== window.self, document.referrer, Array.from(window.location.ancestorOrigins || []), window.location.origin);
    if (!domain) return;
    const key = `${companyId}:${formId}:${domain}`;
    if (sentFor.current === key) return;
    sentFor.current = key;
    const body = JSON.stringify({ companyId, formId, domain });
    if (navigator.sendBeacon && navigator.sendBeacon("/api/widget/install-ping", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/widget/install-ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }, [companyId, formId]);
  return null;
}
