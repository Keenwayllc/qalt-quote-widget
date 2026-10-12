import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Plans & Pricing | Qalt Systems",
  description: "Compare Starter, Pro and Enterprise for instant delivery quoting, branding, quote requests and optional payments. Monthly and annual billing explained.",
  alternates: { canonical: "/pricing" },
};
export default function PricingLayout({ children }: { children: React.ReactNode }) { return children; }
