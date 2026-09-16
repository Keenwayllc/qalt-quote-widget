"use client";

import { useEffect, useRef } from "react";

interface Props {
  companyId: string;
  formId?: string | null;
}

type Snapshot = {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  pickupZip?: string;
  dropoffZip?: string;
  estimatedPrice?: number;
  distanceMiles?: number;
  stage?: "STARTED" | "ROUTE" | "QUOTE" | "CONTACT";
};

const recoveryKey = (companyId: string) => `qalt-recovery-session-${companyId}`;

export default function AbandonedQuoteTracker({ companyId, formId = null }: Props) {
  const snapshotRef = useRef<Snapshot>({ stage: "STARTED" });
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let sessionId = "";
    try {
      sessionId = sessionStorage.getItem(recoveryKey(companyId)) || "";
      if (!sessionId) {
        sessionId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        sessionStorage.setItem(recoveryKey(companyId), sessionId);
      }
    } catch {
      sessionId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    const nativeFetch = window.fetch.bind(window);

    const send = async (extra: Partial<Snapshot> = {}) => {
      const payload = { ...snapshotRef.current, ...extra };
      snapshotRef.current = payload;
      if (!payload.customerEmail?.trim() && !payload.customerPhone?.trim()) return;
      try {
        await nativeFetch(`/api/widget/${companyId}/recovery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({ sessionId, formId, ...payload }),
        });
      } catch {
        // Recovery tracking must never interrupt the quote flow.
      }
    };

    const scheduleSend = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => void send(), 900);
    };

    const onInput = (event: Event) => {
      const el = event.target as HTMLInputElement | null;
      if (!el?.name) return;
      const tracked = new Set(["customerName", "customerEmail", "customerPhone"]);
      if (!tracked.has(el.name)) return;
      snapshotRef.current = {
        ...snapshotRef.current,
        [el.name]: el.value,
        stage: "CONTACT",
      };
      scheduleSend();
    };

    document.addEventListener("input", onInput, true);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      const response = await nativeFetch(input, init);

      if (url.includes(`/api/widget/${companyId}/estimate`) && response.ok) {
        try {
          const requestBody = typeof init?.body === "string" ? JSON.parse(init.body) : {};
          const result = await response.clone().json();
          snapshotRef.current = {
            ...snapshotRef.current,
            pickupAddress: requestBody.origin || snapshotRef.current.pickupAddress,
            dropoffAddress: requestBody.destination || snapshotRef.current.dropoffAddress,
            pickupZip: requestBody.pickupZip || snapshotRef.current.pickupZip,
            dropoffZip: requestBody.dropoffZip || snapshotRef.current.dropoffZip,
            estimatedPrice: typeof result.estimate === "number" ? result.estimate : snapshotRef.current.estimatedPrice,
            distanceMiles: typeof result.distance === "number" ? result.distance : snapshotRef.current.distanceMiles,
            stage: "QUOTE",
          };
          void send();
        } catch {
          // Ignore tracking parse errors.
        }
      }

      if (url.includes(`/api/widget/${companyId}/submit`) && response.ok) {
        try {
          const result = await response.clone().json();
          await nativeFetch(`/api/widget/${companyId}/recovery`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            keepalive: true,
            body: JSON.stringify({
              action: "convert",
              sessionId,
              formId,
              quoteRequestId: result.quoteId || null,
            }),
          });
          try {
            sessionStorage.removeItem(recoveryKey(companyId));
          } catch {}
        } catch {
          // Successful quote submission always wins over tracking.
        }
      }

      return response;
    };

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      document.removeEventListener("input", onInput, true);
      window.fetch = nativeFetch;
    };
  }, [companyId, formId]);

  return null;
}
