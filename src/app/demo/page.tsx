import Link from "next/link";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import PublicNav from "@/components/shared/PublicNav";
import QaltLogo from "@/components/shared/QaltLogo";
import { ArrowRight, Zap, Globe, ReceiptText, CreditCard, Truck, LayoutTemplate } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Demo · Qalt — Instant delivery quotes, booking & online payment",
  description:
    "See the full Qalt customer flow. Delivery companies add an instant quote and booking widget to their site so customers quote, book, and pay online without calling.",
};

// The demo widget: prefer an explicitly configured demo company, then the
// Pittman demo, then any company that has a widget. Set NEXT_PUBLIC_DEMO_COMPANY_ID
// in Vercel to point this page at your polished demo merchant.
async function resolveDemoCompanyId(): Promise<string | null> {
  const envId = process.env.NEXT_PUBLIC_DEMO_COMPANY_ID?.trim();
  if (envId) return envId;

  const byName = await prisma.company.findFirst({
    where: { name: { contains: "Pittman", mode: "insensitive" }, widgetSettings: { some: {} } },
    select: { id: true },
  });
  if (byName) return byName.id;

  const anyWithWidget = await prisma.company.findFirst({
    where: { widgetSettings: { some: {} } },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  return anyWithWidget?.id ?? null;
}

const POSITIONING: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; body: string }[] = [
  { icon: Zap, title: "Instant delivery quotes", body: "Customers enter pickup, dropoff, and details and see a price in seconds. No phone tag, no waiting." },
  { icon: ReceiptText, title: "Transparent pricing", body: "Every charge is itemized, mileage, weight, items, vehicles, stairs, after-hours, and your custom fees." },
  { icon: CreditCard, title: "Online payment", body: "They book the job and pay by card on the spot through secure Stripe checkout." },
  { icon: Globe, title: "Works on your website", body: "A white-label widget you drop onto your existing site. Your brand, your rates, your colors." },
  { icon: Truck, title: "Your real pricing rules", body: "Free-mile thresholds, minimum charges, per-vehicle rates, and merchant-defined large-item categories." },
  { icon: LayoutTemplate, title: "Nothing to install", body: "Configure pricing in the dashboard, paste one embed snippet, and start collecting booked jobs." },
];

export default async function DemoPage() {
  const demoId = await resolveDemoCompanyId();

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      <PublicNav />

      {/* Hero — dark band, copy left, live widget right */}
      <section className="relative overflow-hidden bg-[#080B14] pt-28 sm:pt-32 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0f1a] via-[#0d0813] to-[#130810]" />
          <div className="absolute bottom-0 left-0 w-[55%] h-[55%] bg-red-700/20 blur-[120px] rounded-full" />
          <div className="absolute top-0 right-0 w-[45%] h-[45%] bg-amber-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Copy */}
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md text-white/80 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-white/10">
                <Zap size={13} className="fill-yellow-400 text-yellow-400" /> Live demo
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white mb-6">
                Quote, book, and get paid
                <br />
                <span className="text-red-400">from your website.</span>
              </h1>
              <p className="text-base sm:text-lg text-white/55 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Qalt gives delivery companies an instant quote and booking form they can add to their website.
                Customers enter their delivery details, see transparent pricing, book the job, and pay online.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href="#live-demo"
                  className="group/btn w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-black rounded-none flex items-center justify-center gap-3 hover:bg-red-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-900/40 text-sm tracking-wide"
                >
                  Try the live demo
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                </a>
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white/80 font-black rounded-none hover:bg-white/10 hover:border-white/20 transition-all text-center text-sm tracking-wide"
                >
                  Create your Qalt account
                </Link>
              </div>
            </div>

            {/* Live widget, framed like it lives on a merchant site */}
            <div id="live-demo" className="w-full lg:w-[460px] flex-shrink-0 scroll-mt-24">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-white">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="ml-2 flex-1 max-w-[240px] px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] text-slate-400 font-semibold truncate">
                    yourdeliverycompany.com
                  </div>
                </div>
                {demoId ? (
                  <iframe
                    src={`/widget/${demoId}`}
                    title="Qalt live delivery quote demo"
                    loading="lazy"
                    className="w-full h-[820px] block bg-slate-100"
                  />
                ) : (
                  <div className="h-[420px] flex items-center justify-center text-center px-8 bg-slate-50">
                    <p className="text-sm font-semibold text-slate-500">
                      Demo widget is being configured. Set <code className="text-slate-700">NEXT_PUBLIC_DEMO_COMPANY_ID</code> to your demo company.
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold text-white/35 uppercase tracking-widest">
                This is exactly what your customers would use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning — what it does, in plain delivery terms */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-red-600 mb-4">Why delivery companies use Qalt</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Your customers can quote, book, and pay without calling you.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {POSITIONING.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <f.icon size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#080B14] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[45%] h-[70%] bg-red-700/20 blur-[120px] rounded-full" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-5 leading-tight">
            Stop quoting over the phone.
          </h2>
          <p className="text-white/55 font-medium text-base sm:text-lg mb-10 max-w-xl mx-auto">
            Set up your rates, paste one snippet on your site, and start collecting booked, paid delivery jobs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="group/btn w-full sm:w-auto px-8 py-4 bg-red-600 text-white font-black rounded-none flex items-center justify-center gap-3 hover:bg-red-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-900/40 text-sm tracking-wide"
            >
              Create your Qalt account
              <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
            </Link>
            <a
              href="#live-demo"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white/80 font-black rounded-none hover:bg-white/10 hover:border-white/20 transition-all text-center text-sm tracking-wide"
            >
              Try the live demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <QaltLogo size="sm" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-slate-500">
            <Link href="/pricing" className="hover:text-red-600 transition-colors">Pricing</Link>
            <Link href="/partners" className="hover:text-red-600 transition-colors">Partners</Link>
            <Link href="/register" className="hover:text-red-600 transition-colors">Get Started Free</Link>
            <Link href="/login" className="hover:text-red-600 transition-colors">Log In</Link>
          </nav>
          <p className="text-slate-400 font-medium text-sm">© 2026 Qalt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
