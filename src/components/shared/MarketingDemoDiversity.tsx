"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Replacement = readonly [from: string, to: string];

const LOGIN: readonly Replacement[] = [
  ["North Hollywood → Downtown LA", "Seattle → Bellevue"],
  ["20.8 mi", "12.4 mi"],
  ["$127.00", "$148.00"],
  ["$127", "$148"],
];

const REGISTER: readonly Replacement[] = [
  ["North Hollywood, CA", "San Diego, CA"],
  ["Downtown Los Angeles, CA", "La Jolla, CA"],
  ["20.8 MI", "14.6 MI"],
  ["20.8 mi", "14.6 mi"],
  ["$127.00", "$94.50"],
  ["$102.00", "$69.50"],
  ["$127", "$94.50"],
];

const HERO: readonly Replacement[] = [
  ["North Hollywood → Downtown LA", "Palo Alto → San Jose"],
  ["North Hollywood, CA", "Palo Alto, CA"],
  ["Downtown Los Angeles, CA", "San Jose, CA"],
  ["Downtown Los Angeles", "San Jose"],
  ["North Hollywood", "Palo Alto"],
  ["LOS ANGELES", "BAY AREA"],
  ["Northline Delivery Co.", "Peninsula Courier Co."],
  ["20.8 mi × $2.50", "16.9 mi × $2.50"],
  ["20.8 miles", "16.9 miles"],
  ["20.8 MI", "16.9 MI"],
  ["20.8 mi", "16.9 mi"],
  ["$127.00", "$117.25"],
  ["$52.00", "$42.25"],
  ["$127", "$117"],
];

const HOW_IT_WORKS: readonly Replacement[] = [
  ["North Hollywood → Downtown LA", "Oakland → San Francisco"],
  ["North Hollywood, CA", "Oakland, CA"],
  ["Downtown Los Angeles, CA", "San Francisco, CA"],
  ["Downtown Los Angeles", "San Francisco"],
  ["North Hollywood", "Oakland"],
  ["LOS ANGELES", "BAY AREA"],
  ["Northline Delivery Co.", "BayRoute Express"],
  ["20.8 mi × $2.50", "13.6 mi × $2.50"],
  ["20.8 miles", "13.6 miles"],
  ["20.8 MI", "13.6 MI"],
  ["20.8 mi", "13.6 mi"],
  ["$127.00", "$109.00"],
  ["$52.00", "$34.00"],
  ["$127", "$109"],
];

const ANALYTICS: readonly Replacement[] = [
  ["91605 → 90012", "92101 → 92037"],
  ["91316 → 91606", "94301 → 95113"],
  ["Jordan Lee", "Maya Chen"],
  ["20.8 miles", "13.8 miles"],
  ["20.8 MI", "13.8 MI"],
  ["20.8 mi", "13.8 mi"],
  ["$127.00", "$112.00"],
  ["$127", "$112"],
];

const SORTED = new WeakMap<readonly Replacement[], readonly Replacement[]>();

function sorted(replacements: readonly Replacement[]) {
  const cached = SORTED.get(replacements);
  if (cached) return cached;
  const value = [...replacements].sort((a, b) => b[0].length - a[0].length);
  SORTED.set(replacements, value);
  return value;
}

function replaceText(value: string, replacements: readonly Replacement[]) {
  let next = value;
  for (const [from, to] of sorted(replacements)) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  return next;
}

function homepageReplacements(node: Text) {
  const parent = node.parentElement;
  const section = parent?.closest("section");
  if (!section) return ANALYTICS;

  if (section.id === "how-it-works") return HOW_IT_WORKS;

  const firstMainSection = document.querySelector("main > section");
  if (section === firstMainSection) return HERO;

  const copy = section.textContent || "";
  if (
    copy.includes("Recent Requests") ||
    copy.includes("Quote activity") ||
    copy.includes("Conversion") ||
    copy.includes("Quote volume")
  ) {
    return ANALYTICS;
  }

  return ANALYTICS;
}

function replacementsFor(node: Text, pathname: string) {
  if (pathname === "/login") return LOGIN;
  if (pathname === "/register") return REGISTER;
  if (pathname === "/") return homepageReplacements(node);
  return null;
}

function processTextNode(node: Text, pathname: string) {
  const parent = node.parentElement;
  if (!parent || parent.closest("script, style, textarea")) return;

  const replacements = replacementsFor(node, pathname);
  if (!replacements || !node.nodeValue) return;

  const next = replaceText(node.nodeValue, replacements);
  if (next !== node.nodeValue) node.nodeValue = next;
}

function processSubtree(root: Node, pathname: string) {
  if (root.nodeType === Node.TEXT_NODE) {
    processTextNode(root as Text, pathname);
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    processTextNode(current as Text, pathname);
    current = walker.nextNode();
  }
}

/**
 * Presentation-only demo data normalizer for Qalt's public marketing and auth
 * mockups. The original visuals were created from the same seed job, which made
 * $127 and North Hollywood appear everywhere. This keeps each surface visually
 * varied without touching real quotes, merchant data, pricing logic, or embeds.
 */
export default function MarketingDemoDiversity() {
  const pathname = usePathname();

  useEffect(() => {
    if (!["/", "/login", "/register"].includes(pathname)) return;

    const run = () => processSubtree(document.body, pathname);
    const frame = requestAnimationFrame(run);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          processTextNode(mutation.target as Text, pathname);
          continue;
        }

        for (const node of mutation.addedNodes) {
          processSubtree(node, pathname);
        }
      }
    });

    observer.observe(document.body, { childList: true, characterData: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
