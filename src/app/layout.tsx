import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieBanner from "@/components/shared/CookieBanner";
import GlobalScrollToTop from "@/components/shared/GlobalScrollToTop";
import MarketingDemoDiversity from "@/components/shared/MarketingDemoDiversity";
import WidgetBrandRuntime from "@/components/shared/WidgetBrandRuntime";
import NavigationBoost from "@/components/shared/NavigationBoost";
import ErrorReporter from "@/components/shared/ErrorReporter";
import RegistrationAttributionTracker from "@/components/shared/RegistrationAttribution";
import IntroJourney from "@/components/landing/intro/IntroJourney";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro-boot";

// Inter is the typography used by the approved Astra reference. It is loaded
// once at the root so the public site, authentication screens, Merchant
// Console, admin dashboard, and customer-facing Qalt UI share one type system.
//
// Both faces are self-hosted (variable-weight Latin subsets, SIL Open Font
// License) rather than pulled through next/font/google. Google started serving
// some build regions `fonts.gstatic.com/l/font?kit=...&skey=...` URLs that
// Turbopack's Google font loader cannot parse, which failed production builds.
const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// Keep a true monospace face only for code/embed snippets. All normal product
// and marketing UI typography is Inter.
const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.qalt.site"),
  title: "Qalt - Embeddable Quote Calculators for Delivery Companies",
  description: "The easiest way to add an instant delivery quote widget to your website. Boost your leads and save time with Qalt.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Qalt - Embeddable Quote Calculators for Delivery Companies",
    description: "Add an instant delivery quote widget to your website using your pricing rules, services, fees, and branding.",
    url: "/",
    siteName: "Qalt",
    type: "website",
  },
  icons: {
    icon: "/images/qalt-icon-400.jpg",
    shortcut: "/images/qalt-icon-400.jpg",
    apple: "/images/qalt-icon-400.jpg",
  },
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased selection:bg-red-100 selection:text-red-900 dark:selection:bg-red-900/40 dark:selection:text-red-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorReporter />
          <NavigationBoost />
          <RegistrationAttributionTracker />
          {children}
          <MarketingDemoDiversity />
          <WidgetBrandRuntime />
          <GlobalScrollToTop />
          <CookieBanner />
          <IntroJourney />
        </ThemeProvider>
      </body>
    </html>
  );
}
