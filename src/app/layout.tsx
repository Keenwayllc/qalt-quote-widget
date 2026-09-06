import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/shared/CookieBanner";
import GlobalScrollToTop from "@/components/shared/GlobalScrollToTop";

// Inter is the typography used by the approved Astra reference. It is loaded
// once at the root so the public site, authentication screens, Merchant
// Console, admin dashboard, and customer-facing Qalt UI share one type system.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Keep a true monospace face only for code/embed snippets. All normal product
// and marketing UI typography is Inter.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Qalt - Embeddable Quote Calculators for Delivery Companies",
  description: "The easiest way to add an instant delivery quote widget to your website. Boost your leads and save time with Qalt.",
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
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased selection:bg-red-100 selection:text-red-900 dark:selection:bg-red-900/40 dark:selection:text-red-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <GlobalScrollToTop />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
