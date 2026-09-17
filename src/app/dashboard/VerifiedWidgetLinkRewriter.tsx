"use client";

import { useEffect } from "react";

interface VerifiedWidgetLinkRewriterProps {
  companyId: string;
  customWidgetDomain?: string | null;
  customWidgetDomainVerified?: boolean;
}

export default function VerifiedWidgetLinkRewriter({
  companyId,
  customWidgetDomain,
  customWidgetDomainVerified = false,
}: VerifiedWidgetLinkRewriterProps) {
  useEffect(() => {
    const fallbackPath = `/widget/${companyId}`;
    const targetHref =
      customWidgetDomainVerified && customWidgetDomain
        ? `https://${customWidgetDomain}`
        : `https://www.qalt.site${fallbackPath}`;

    const rewriteLinks = () => {
      const links = document.querySelectorAll<HTMLAnchorElement>("a[href]");

      links.forEach((link) => {
        const rawHref = link.getAttribute("href");
        if (!rawHref) return;

        let matchesWidget = rawHref === fallbackPath;

        if (!matchesWidget) {
          try {
            const parsed = new URL(rawHref, window.location.origin);
            matchesWidget = parsed.pathname === fallbackPath;
          } catch {
            matchesWidget = false;
          }
        }

        if (matchesWidget) {
          link.href = targetHref;
        }
      });
    };

    rewriteLinks();

    const observer = new MutationObserver(rewriteLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [companyId, customWidgetDomain, customWidgetDomainVerified]);

  return null;
}
