import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";
import MarketingFooter from "@/components/shared/MarketingFooter";

const steps = [
  {
    title: "Instant delivery quotes",
    body: "Customers enter their pickup, delivery, and job details. Qalt applies your pricing rules and shows a clear price instantly.",
  },
  {
    title: "Online booking",
    body: "Once the price works, the customer can submit the job and booking details without waiting for a phone call or email reply.",
  },
  {
    title: "Payment at booking",
    body: "On Enterprise, you can connect Stripe so customers pay when they book. On other plans you keep collecting payment the way you do now.",
  },
];

const controls = [
  "Your rates and pricing rules",
  "Where the form sits on your site",
  "Every quote and booking",
  "Your logo, colors and wording",
];

export default function WhatQaltDoesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <PublicNav />

      <main>
        <section className="relative overflow-hidden bg-[#f4f2ec] pb-20 pt-28 sm:pb-24 sm:pt-32">
          <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-red-600/[0.05] blur-3xl" />
          <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              <span className="h-2 w-2 bg-red-600" /> What Qalt does
            </p>
            <h1 className="max-w-5xl text-[clamp(3.1rem,7vw,6.2rem)] font-black leading-[0.88] tracking-[-0.06em] text-slate-950">
              Your delivery website should do more than collect a message.
            </h1>
            <p className="mt-8 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
              Qalt gives delivery companies a working customer-facing quote flow for pricing, booking and payment, while the rest of the operation keeps running on the systems already in place.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex w-full items-center justify-center gap-2 bg-red-600 px-8 py-4 text-sm font-black text-white transition hover:bg-red-700 sm:w-auto">
                Get Started <ArrowRight size={16} />
              </Link>
              <Link href="/demo" className="inline-flex w-full items-center justify-center border border-slate-950/15 bg-white/55 px-8 py-4 text-sm font-black text-slate-900 transition hover:bg-white sm:w-auto">
                View Live Demo
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <h2 className="text-4xl font-black leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-6xl">
                What your customers can do
              </h2>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                Qalt is used by couriers, local and final-mile delivery companies, movers, and freight operators.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => {
                return (
                  <div key={step.title} className="border border-slate-200 bg-white p-7">
                    <p className="mb-4 text-sm font-black text-red-600">{index + 1}.</p>
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
              <h2 className=" text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                You still run the delivery. Qalt handles the quote.
              </h2>
              <p className="mt-6 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                You set the rates, the service rules, what the form asks, and how it looks. Qalt runs the math and hands you the booking.
              </p>
              <p className="mt-5 text-base font-medium leading-relaxed text-slate-500 sm:text-lg">
                You spend less time pricing jobs over the phone, and the customers who would never have called still get a price.
              </p>
            </div>

            <div className="border border-slate-200 bg-[#f7f8fa] p-6 sm:p-8">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-slate-400">You stay in control of</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {controls.map((label) => (
                  <div key={label} className="border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0b0b0c] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              Put a price on your website.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/50 sm:text-lg">
              The free plan covers one form and 50 quotes a month. No card needed.
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
      <MarketingFooter />
    </div>
  );
}
