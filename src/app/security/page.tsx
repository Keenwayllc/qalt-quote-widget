import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";
import { TrustBadgeGrid } from "@/components/shared/TrustBadges";
import MarketingFooter from "@/components/shared/MarketingFooter";

export const metadata: Metadata = {
  title: "Security · Qalt",
  description: "How Qalt protects delivery companies and their customers: encrypted connections, Stripe payments, hashed passwords, and encrypted storage.",
};

const SECTIONS = [
  {
    title: "For your customers",
    points: [
      "The quote form on your website loads over HTTPS, so addresses, names, emails, and phone numbers are encrypted on the way to Qalt.",
      "When you take payments, customers pay on Stripe's own checkout page. Card numbers go to Stripe, not to Qalt and not to you.",
      "Quote links you send are long random codes that can't be guessed, so one customer can't open another customer's quote.",
    ],
  },
  {
    title: "For your business",
    points: [
      "Your password is stored as a bcrypt hash. Nobody at Qalt can read it, and password resets go only to your account email.",
      "You sign in with a session cookie the browser keeps away from page scripts (HttpOnly).",
      "Your quotes, pricing, and customer records are stored in a Postgres database that is encrypted at rest.",
      "Sign-up is protected by Cloudflare's human check to keep bots and fake accounts out.",
    ],
  },
  {
    title: "Payments",
    points: [
      "Online payments run through Stripe, which is certified PCI DSS Level 1, the highest level for card payment processors.",
      "Qalt never stores card numbers, CVC codes, or bank details. Payouts go straight from Stripe to the delivery company's own Stripe account.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <PublicNav />
      <main>
        <section className="bg-[#f4f2ec] pb-20 pt-28 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500"><span className="h-2 w-2 bg-red-600" />Security</p>
            <h1 className="max-w-5xl text-[clamp(3.1rem,7vw,6.2rem)] font-black leading-[0.88] tracking-[-0.06em] text-slate-950">Security built into the quote flow.</h1>
            <p className="mt-8 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg">Delivery companies trust Qalt with pricing and customer data. Here is how the platform protects quotes, accounts and payments in plain terms.</p>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <TrustBadgeGrid />
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-4xl gap-12 px-6 sm:px-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="text-2xl font-black tracking-tight text-slate-950">{section.title}</h2>
                <ul className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="border-l-2 border-red-600 pl-4 text-[15px] font-medium leading-7 text-slate-600">{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-black text-slate-950">Found a security problem?</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                Email us and we will look into it right away. Please include the page and the steps to reproduce it.
              </p>
              <a href="mailto:business@qalt.site?subject=Security%20report" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-red-600 hover:text-red-700">
                <Mail size={15} /> business@qalt.site
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 bg-red-600 px-7 py-4 text-sm font-black text-white hover:bg-red-500">
                Start free <ArrowRight size={16} />
              </Link>
              <Link href="/legal/privacy" className="inline-flex items-center justify-center border border-slate-200 px-7 py-4 text-sm font-black text-slate-700 hover:bg-slate-50">
                Privacy policy
              </Link>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
