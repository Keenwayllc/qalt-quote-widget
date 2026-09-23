export type RegistrationAttributionInput = {
  landingPage?: unknown;
  referrer?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  utmTerm?: unknown;
  utmContent?: unknown;
};

const clean = (value: unknown, max: number): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
};

function hostnameFromReferrer(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function normalizeRegistrationAttribution(input: RegistrationAttributionInput | null | undefined) {
  const landingPage = clean(input?.landingPage, 300);
  const referrer = clean(input?.referrer, 1000);
  const utmSource = clean(input?.utmSource, 160);
  const utmMedium = clean(input?.utmMedium, 160);
  const utmCampaign = clean(input?.utmCampaign, 240);
  const utmTerm = clean(input?.utmTerm, 240);
  const utmContent = clean(input?.utmContent, 240);

  const sourceLower = utmSource?.toLowerCase() || "";
  const mediumLower = utmMedium?.toLowerCase() || "";
  const host = hostnameFromReferrer(referrer);

  let registrationSource = "Direct";

  if (
    mediumLower.includes("email") ||
    mediumLower.includes("newsletter") ||
    mediumLower.includes("outreach") ||
    sourceLower.includes("email") ||
    sourceLower.includes("outreach")
  ) {
    registrationSource = "Email outreach";
  } else if (
    sourceLower.includes("chatgpt") ||
    sourceLower.includes("openai") ||
    host === "chatgpt.com" ||
    host?.endsWith(".chatgpt.com") ||
    host === "openai.com" ||
    host?.endsWith(".openai.com")
  ) {
    registrationSource = "ChatGPT";
  } else if (
    sourceLower === "google" ||
    host === "google.com" ||
    host?.startsWith("google.")
  ) {
    registrationSource = "Google";
  } else if (sourceLower === "bing" || host === "bing.com") {
    registrationSource = "Bing";
  } else if (sourceLower.includes("linkedin") || host === "linkedin.com") {
    registrationSource = "LinkedIn";
  } else if (sourceLower.includes("facebook") || host === "facebook.com") {
    registrationSource = "Facebook";
  } else if (sourceLower.includes("instagram") || host === "instagram.com") {
    registrationSource = "Instagram";
  } else if (
    sourceLower === "x" ||
    sourceLower.includes("twitter") ||
    host === "x.com" ||
    host === "twitter.com"
  ) {
    registrationSource = "X";
  } else if (sourceLower.includes("reddit") || host === "reddit.com") {
    registrationSource = "Reddit";
  } else if (utmSource) {
    registrationSource = utmSource.slice(0, 80);
  } else if (host && !host.endsWith("qalt.site")) {
    registrationSource = "Referral";
  }

  return {
    registrationSource,
    registrationReferrer: referrer,
    registrationLandingPage: landingPage,
    registrationUtmSource: utmSource,
    registrationUtmMedium: utmMedium,
    registrationUtmCampaign: utmCampaign,
    registrationUtmTerm: utmTerm,
    registrationUtmContent: utmContent,
  };
}
