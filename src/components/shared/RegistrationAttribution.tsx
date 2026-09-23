"use client";

import { useEffect } from "react";

const STORAGE_KEY = "qalt-registration-attribution-v1";

export type RegistrationAttribution = {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

function clean(value: string | null, max = 500) {
  const trimmed = value?.trim() || "";
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function captureCurrentAttribution(): RegistrationAttribution {
  const params = new URLSearchParams(window.location.search);
  return {
    landingPage: clean(window.location.pathname, 300),
    referrer: clean(document.referrer, 1000),
    utmSource: clean(params.get("utm_source"), 160),
    utmMedium: clean(params.get("utm_medium"), 160),
    utmCampaign: clean(params.get("utm_campaign"), 240),
    utmTerm: clean(params.get("utm_term"), 240),
    utmContent: clean(params.get("utm_content"), 240),
  };
}

export function getRegistrationAttribution(): RegistrationAttribution {
  if (typeof window === "undefined") return {};
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as RegistrationAttribution;
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch {}
  return captureCurrentAttribution();
}

export default function RegistrationAttributionTracker() {
  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(captureCurrentAttribution())
        );
      }
    } catch {
      // Attribution must never interrupt the visitor experience.
    }
  }, []);

  return null;
}
