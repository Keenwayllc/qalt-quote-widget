import Link from "next/link";
import { ArrowRight, Calculator, CalendarCheck, CreditCard, Code2, Settings2, BarChart3, CheckCircle2 } from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";

const steps = [
  {
    icon: Calculator,
    title: "Instant delivery quotes",
    body: "Customers enter their pickup, delivery, and job details. Qalt applies your pricing rules and shows a clear price instantly.",
  },
  {
    icon: CalendarCheck,
    title: "Online booking",
    body: "Once the price works, the customer can submit the job and booking details without waiting for a phone call or email reply.",
  },
  {
    icon: CreditCard,
    title: "Payment collection",
    body: "If you enable payments, customers can pay as part of the booking flow so a website inquiry can become a real paid delivery job.",
  },
];

const controls = [
  { icon: Settings2, label: "Your pricing rules" },
  { icon: Code2, label: "Your website embed" },
  { icon: BarChart3, label: "Your quote and booking activity" },
  { icon: CheckCircle2, label: "Your brand and customer experience" },
];

export default function WhatQaltDoesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PublicNav />

      <main>
        <section className="relative overflow-hidden bg-[#080B14] pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0f1a] via-[#0d0813] to-[#130810]" />
            <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-red-700/20 blur-[120px]" />
            <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-amber-600/10 blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-8">
            <div className="mx-auto mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white/70">
              What Qalt does
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Add instant quoting, booking, and payment to your delivery website.
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-white/55 sm:text-xl">
              Qalt helps delivery companies turn website visitors into real jobs. Instead of making customers call, email, or wait for a manual quote, your website can price the delivery, collect the booking details, and take payment in one connected flow.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center gap-2 bg-red-600 px-8 py-4 text-sm font-black text-white transition hover:bg-red-500 sm:w-auto"
              >
                Start for Free <ArrowRight size={16} />
              </Link>
              <Link
                href="/demo"
                className="inline-flex w-full items-center justify-center border border-white/15 bg-white/5 px-8 py-4 text-sm font-black text-white/80 transition hover:bg-white/10 sm:w-auto"
              >
                See the Live Demo
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">From inquiry to booked job</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Your customer can do more without waiting on you.
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                Qalt is built for courier, local delivery, final-mile, moving, and logistics businesses that want a better way to sell delivery services online.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                      <div className="grid h-11 w-11 place-items-center bg-red-50 text-red-600">
                        <Icon size={21} />
                      </div>
                      <span className="text-xs font-black text-slate-300">0{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-black tracking-tight text-slate-950">{step.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">Built around your business</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Qalt does not replace your delivery company. It puts your delivery service online.
              </h2>
              <p className="mt-6 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                You control the rates, service rules, forms, branding, and customer experience. Qalt gives you the technology to let customers quote, book, and pay directly from your website.
              </p>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                That means fewer manual quote requests, less phone tag, and a clearer path from someone visiting your site to a delivery being ready for your operation.
              </p>
            </div>

            <div className="border border-slate-200 bg-[#f7f8fa] p-6 sm:p-8">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">You stay in control of</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {controls.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-3 border border-slate-200 bg-white p-4">
                      <div className="grid h-9 w-9 shrink-0 place-items-center bg-slate-950 text-white">
                        <Icon size={17} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#080B14] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              Turn your website into a place customers can actually book delivery.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/50 sm:text-lg">
              Add Qalt to your site and give customers a faster path from delivery details to quote, booking, and payment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 bg-red-600 px-8 py-4 text-sm font-black text-white transition hover:bg-red-500 sm:w-auto">
                Get Started <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="inline-flex w-full items-center justify-center border border-white/15 px-8 py-4 text-sm font-black text-white/75 transition hover:bg-white/5 sm:w-auto">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
