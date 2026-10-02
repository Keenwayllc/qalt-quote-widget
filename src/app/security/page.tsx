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
    <div className="min-h-screen bg-white text-slate-900">
      <PublicNav />
      <main>
        <section className="bg-[#080B14] pb-16 pt-32 sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-red-400">Security</p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">How Qalt keeps quotes and payments safe.</h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/60 sm:text-lg">
              Delivery companies trust Qalt with their pricing and their customers trust it with addresses and payment. Here is exactly what we do to protect both, in plain terms.
            </p>
          </div>
        </section>

        <section className="bg-slate-50 py-14 sm:py-20">
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
                    <li key={point} className="border-l-2 border-emerald-500 pl-4 text-[15px] font-medium leading-7 text-slate-600">{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-lg font-black text-slate-950">Found a security problem?</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                Email us and we will look into it right away. Please include the page and the steps to reproduce it.
              </p>
              <a href="mailto:business@qalt.site?subject=Security%20report" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-red-600 hover:text-red-700">
                <Mail size={15} /> business@qalt.site
              </a>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-4 text-sm font-black text-white hover:bg-red-500">
                Start free <ArrowRight size={16} />
              </Link>
              <Link href="/legal/privacy" className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-7 py-4 text-sm font-black text-slate-700 hover:bg-slate-50">
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
