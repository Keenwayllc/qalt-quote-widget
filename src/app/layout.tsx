import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/shared/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display/heading font — techy, characterful
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased selection:bg-red-100 selection:text-red-900 dark:selection:bg-red-900/40 dark:selection:text-red-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
