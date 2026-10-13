import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CookieBanner from "@/components/shared/CookieBanner";
import GlobalScrollToTop from "@/components/shared/GlobalScrollToTop";
import WidgetBrandRuntime from "@/components/shared/WidgetBrandRuntime";
import NavigationBoost from "@/components/shared/NavigationBoost";
import ErrorReporter from "@/components/shared/ErrorReporter";
import RegistrationAttributionTracker from "@/components/shared/RegistrationAttribution";
import IntroJourney from "@/components/landing/intro/IntroJourney";
import RecentActivity from "@/components/landing/RecentActivity";
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
  description: "Instant delivery estimates and quote requests on your website, using your rates and branding. Keep your existing dispatch software.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Qalt - Embeddable Quote Calculators for Delivery Companies",
    description: "Add an instant delivery quote widget to your website using your pricing rules, services, fees, and branding.",
    url: "/",
    siteName: "Qalt",
    type: "website",
  },
  icons: {
    icon: "/images/qalt-favicon-2026-10-clean.svg",
    shortcut: "/images/qalt-icon-2026-10.png?v=20261013",
    apple: "/images/qalt-icon-2026-10.png?v=20261013",
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
          <WidgetBrandRuntime />
          <GlobalScrollToTop />
          <CookieBanner />
          <RecentActivity />
          <IntroJourney />
        </ThemeProvider>
      </body>
    </html>
  );
}
