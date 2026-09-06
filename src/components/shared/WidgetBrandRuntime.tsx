"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function parseBrandColor(raw: string) {
  const value = raw.trim();
  if (/^#[0-9a-f]{8}$/i.test(value)) return value.slice(0, 7);
  if (/^#[0-9a-f]{6}$/i.test(value)) return value;
  return null;
}

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

/**
 * Keeps the quote-result surfaces tied to the merchant's saved primary color.
 * Some of those result styles were still hard-coded emerald from an older
 * success-state treatment, so they ignored Widget Appearance settings.
 */
export default function WidgetBrandRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const appliesHere = pathname === "/demo" || pathname.startsWith("/widget/");
    if (!appliesHere) return;

    const style = document.createElement("style");
    style.dataset.qaltWidgetBrandRuntime = "true";
    style.textContent = `
      [style*="--ring"] [class*="from-emerald-50"][class*="to-teal-50"] {
        background: linear-gradient(135deg, var(--qalt-brand-soft), var(--qalt-brand-soft-2)) !important;
        border-color: var(--qalt-brand-border) !important;
      }

      [style*="--ring"] [class*="from-emerald-50"][class*="to-teal-50"] [class*="text-emerald-"] {
        color: var(--qalt-brand) !important;
      }

      [style*="--ring"] [class*="from-emerald-50"][class*="to-teal-50"] [class*="border-emerald-"] {
        border-color: var(--qalt-brand-border) !important;
      }

      [style*="--ring"] button[class*="bg-emerald-600"] {
        background-color: var(--qalt-brand) !important;
        box-shadow: 0 8px 24px -4px var(--qalt-brand-shadow) !important;
      }
    `;
    document.head.appendChild(style);

    const applyBrandVariables = () => {
      const roots = document.querySelectorAll<HTMLElement>('[style*="--ring"]');

      roots.forEach((root) => {
        const rawRing = root.style.getPropertyValue("--ring") || getComputedStyle(root).getPropertyValue("--ring");
        const brand = parseBrandColor(rawRing);
        if (!brand) return;

        const { r, g, b } = hexToRgb(brand);
        root.style.setProperty("--qalt-brand", brand);
        root.style.setProperty("--qalt-brand-soft", `rgba(${r}, ${g}, ${b}, 0.10)`);
        root.style.setProperty("--qalt-brand-soft-2", `rgba(${r}, ${g}, ${b}, 0.045)`);
        root.style.setProperty("--qalt-brand-border", `rgba(${r}, ${g}, ${b}, 0.20)`);
        root.style.setProperty("--qalt-brand-shadow", `rgba(${r}, ${g}, ${b}, 0.35)`);
      });
    };

    const frame = requestAnimationFrame(applyBrandVariables);
    const observer = new MutationObserver(applyBrandVariables);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      style.remove();
    };
  }, [pathname]);

  return null;
}
