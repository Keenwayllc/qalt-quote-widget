"use client";

import { useEffect } from "react";

function readAddress(placeholder: string) {
  const input = document.querySelector<HTMLInputElement>(`input[placeholder="${placeholder}"]`);
  return input?.value?.trim() || "";
}

export default function CustomDomainAddressBridge() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      try {
        const url = typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : input.url;

        const isWidgetEstimate = /\/api\/widget\/[^/]+\/estimate(?:\?|$)/.test(url);
        const isWidgetSubmit = /\/api\/widget\/[^/]+\/submit(?:\?|$)/.test(url);

        if ((isWidgetEstimate || isWidgetSubmit) && typeof init?.body === "string") {
          const body = JSON.parse(init.body) as Record<string, unknown>;
          const pickup = readAddress("Enter pickup address");
          const dropoff = readAddress("Enter dropoff address");

          if (isWidgetEstimate) {
            if (!String(body.origin || "").trim() && pickup) body.origin = pickup;
            if (!String(body.destination || "").trim() && dropoff) body.destination = dropoff;
          }

          if (isWidgetSubmit) {
            if (!String(body.pickupAddress || "").trim() && pickup) body.pickupAddress = pickup;
            if (!String(body.dropoffAddress || "").trim() && dropoff) body.dropoffAddress = dropoff;
          }

          init = { ...init, body: JSON.stringify(body) };
        }
      } catch {
        // Never block a customer request if the fallback cannot inspect it.
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
