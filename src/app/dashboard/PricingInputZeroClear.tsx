"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PRICING_NAME_PATTERN = /(price|pricing|rate|fee|charge|cost|amount|minimum|mileage|mile)/i;

function isPricingInput(input: HTMLInputElement, pathname: string): boolean {
  if (input.disabled || input.readOnly) return false;
  if (input.type !== "number" && input.inputMode !== "decimal") return false;

  // Pricing Settings is entirely pricing-oriented, so all numeric/decimal
  // inputs there get the behavior. This also covers service fees, vehicle
  // charges, large-item pricing, core rates, and future pricing controls.
  if (pathname.startsWith("/dashboard/pricing")) return true;

  const identity = [
    input.name,
    input.id,
    input.getAttribute("aria-label") || "",
    input.placeholder,
  ].join(" ");

  if (PRICING_NAME_PATTERN.test(identity)) return true;

  const container = input.closest("label, [data-pricing-field], .pricing-field, div");
  const nearbyText = container?.textContent || "";
  return PRICING_NAME_PATTERN.test(nearbyText);
}

function setNativeInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;

  if (setter) setter.call(input, value);
  else input.value = value;

  input.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function PricingInputZeroClear() {
  const pathname = usePathname();

  useEffect(() => {
    const onFocusIn = (event: FocusEvent) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      if (!isPricingInput(input, pathname)) return;

      const raw = input.value.trim();
      if (raw === "") return;

      const numeric = Number(raw);
      if (Number.isFinite(numeric) && numeric === 0) {
        input.dataset.qaltZeroCleared = "true";
        setNativeInputValue(input, "");
      }
    };

    const onFocusOut = (event: FocusEvent) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      if (input.dataset.qaltZeroCleared !== "true") return;

      delete input.dataset.qaltZeroCleared;
      if (input.value.trim() === "") {
        setNativeInputValue(input, "0");
      }
    };

    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);

    return () => {
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
    };
  }, [pathname]);

  return null;
}
