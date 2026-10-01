import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calculator, Globe2, Settings2, Workflow, CheckCircle2 } from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";

export const metadata: Metadata = {
  title: "Courier Quote Software for Instant Delivery Pricing | Qalt",
  description: "Add instant delivery pricing to your courier website using your rates, route distance, services, fees, branding, and quote workflow.",
  alternates: { canonical: "https://www.qalt.site/courier-quote-software" },
  openGraph: {
    title: "Courier Quote Software for Instant Delivery Pricing | Qalt",
    description: "Add instant courier pricing to your website without replacing your existing dispatch system.",
    url: "https://www.qalt.site/courier-quote-software",
    siteName: "Qalt",
    type: "website",
  },
};

const guides = [
  ["/blog/courier-quote-software", "Courier Quote Software: How to Give Customers Instant Prices Online"],
  ["/blog/courier-rate-per-mile", "How Much Should a Courier Charge Per Mile in 2026?"],
  ["/blog/replace-courier-quote-form-instant-pricing", "How to Replace a Courier Quote Form With Instant Pricing"],
  ["/blog/medical-courier-pricing", "Medical Courier Pricing: How to Build a Quote System"],
  ["/blog/same-day-delivery-pricing", "Same-Day Delivery Pricing"],
  ["/blog/multi-stop-delivery-pricing", "How Multi-Stop Delivery Pricing Works"],
  ["/blog/wordpress-courier-quote-calculator", "How to Add a Courier Quote Calculator to WordPress"],
] as const;

export default function CourierQuoteSoftwarePage() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Qalt",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://www.qalt.site/courier-quote-software",
    description: "Courier quote software for adding instant delivery pricing and branded quote forms to courier and final-mile websites.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Starter plan available at no charge." },
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Does Qalt replace courier dispatch software?", acceptedAnswer: { "@type": "Answer", text: "No. Qalt can be used as the customer-facing quoting layer while a courier keeps its existing dispatch, routing, tracking, and proof-of-delivery tools." } },
      { "@type": "Question", name: "Can a courier use its own rates?", acceptedAnswer: { "@type": "Answer", text: "Yes. Qalt uses the merchant's configured supported pricing rules." } },
      { "@type": "Question", name: "Can Qalt handle additional stops?", acceptedAnswer: { "@type": "Answer", text: "Yes. Qalt supports intermediate stops and a configurable additional-stop fee." } },
    ],
  };

  const features = [
    [Calculator, "Use your own pricing rules", "Set minimums, mileage pricing, service options, after-hours fees, stop fees, and supported add-ons."],
    [Globe2, "Calculate real routes", "Customers enter pickup and delivery locations so pricing can use the route rather than a generic estimate."],
    [Workflow, "Keep your current dispatch tools", "Use Qalt for website quoting while keeping the operational software your team already knows."],
    [Settings2, "Control the customer experience", "Configure the quote form around your services, fields, pricing, and branding options."],
  ] as const;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PublicNav />
      <main className="pt-28 sm:pt-32">
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-red-600">Courier quote software</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">Give courier customers a price before they leave your website</h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
            Qalt adds instant delivery quoting to an existing courier, delivery, or final-mile website. Customers enter the job, Qalt applies your supported pricing rules, and the request lands in your dashboard.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 font-black text-white hover:bg-red-700">Try the live demo <ArrowRight size={17} /></Link>
            <Link href="/register" className="rounded-xl bg-slate-900 px-7 py-3.5 text-center font-black text-white hover:bg-slate-800">Start free</Link>
            <Link href="/pricing" className="rounded-xl border border-slate-200 px-7 py-3.5 text-center font-black text-slate-700 hover:bg-slate-50">View pricing</Link>
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
            {features.map(([Icon, title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <Icon className="mb-4 text-red-600" size={24} />
                <h2 className="text-xl font-black">{title}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight">What can affect a delivery quote</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Minimum job charge and mileage", "Service level and urgency", "Weight and item count", "After-hours work", "Inside delivery and stairs", "Intermediate stops", "Vehicle needs where supported", "Customer contact and quote records"].map((item) => (
              <div key={item} className="flex gap-3 rounded-xl border border-slate-200 p-4"><CheckCircle2 className="mt-0.5 shrink-0 text-red-600" size={18} /><span className="font-semibold text-slate-700">{item}</span></div>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-black tracking-tight">Quote software before dispatch</h2>
            <div className="mt-6 grid gap-8 text-slate-300 md:grid-cols-2">
              <p className="leading-relaxed">Dispatch systems usually focus on assignment, drivers, routing, tracking, and proof of delivery after work enters the operation.</p>
              <p className="leading-relaxed">Qalt focuses on the customer-facing quoting step, so you can improve the digital front door without replacing the rest of your workflow.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-black tracking-tight">Courier pricing and website guides</h2>
          <div className="mt-8 grid gap-4">
            {guides.map(([href, title]) => (
              <Link key={href} href={href} className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 hover:border-red-200 hover:shadow-sm">
                <span className="font-bold text-slate-800 group-hover:text-red-600">{title}</span><ArrowRight className="shrink-0 text-slate-300 group-hover:text-red-600" size={18} />
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-100 bg-slate-50 py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-black tracking-tight">Frequently asked questions</h2>
            <div className="mt-8 space-y-6">
              <div><h3 className="font-black">Does Qalt replace my dispatch software?</h3><p className="mt-2 text-slate-600">No. Keep your current dispatch workflow and use Qalt for the website quoting step.</p></div>
              <div><h3 className="font-black">Can customers get pricing from my website?</h3><p className="mt-2 text-slate-600">Yes. The embedded form uses the merchant's configured supported pricing rules.</p></div>
              <div><h3 className="font-black">What about unusual deliveries?</h3><p className="mt-2 text-slate-600">They can still be reviewed manually. Instant pricing is most useful for repeatable standard jobs.</p></div>
              <div><h3 className="font-black">Can I start without a card?</h3><p className="mt-2 text-slate-600">Yes. The Starter plan is free and does not require a card.</p></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
