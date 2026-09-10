import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleHelp, Minus } from "lucide-react";
import PublicNav from "@/components/shared/PublicNav";

export const metadata: Metadata = {
  title: "Compare Qalt | Delivery Quote & Booking Software",
  description:
    "Compare Qalt with Shipday, Onfleet, Tookan, Onro, OnTime 360, and Setmore for delivery quoting, booking, payments, branding, and operations.",
};

type CellValue = "yes" | "partial" | "no" | "soon" | string;

type ComparisonRow = {
  feature: string;
  note?: string;
  qalt: CellValue;
  shipday: CellValue;
  onfleet: CellValue;
  tookan: CellValue;
  onro: CellValue;
  ontime: CellValue;
  setmore: CellValue;
};

const vendors = [
  { key: "qalt", label: "Qalt", sub: "Quote-to-cash for delivery", highlight: true },
  { key: "shipday", label: "Shipday", sub: "Delivery management" },
  { key: "onfleet", label: "Onfleet", sub: "Last-mile operations" },
  { key: "tookan", label: "Tookan", sub: "Dispatch & delivery" },
  { key: "onro", label: "Onro", sub: "Courier management" },
  { key: "ontime", label: "OnTime 360", sub: "Courier TMS" },
  { key: "setmore", label: "Setmore", sub: "Appointment scheduling" },
] as const;

const rows: ComparisonRow[] = [
  {
    feature: "Built specifically for delivery companies",
    qalt: "yes",
    shipday: "yes",
    onfleet: "yes",
    tookan: "yes",
    onro: "yes",
    ontime: "yes",
    setmore: "no",
  },
  {
    feature: "Customer-facing order / booking form",
    qalt: "yes",
    shipday: "yes",
    onfleet: "Courier Suite",
    tookan: "Higher tiers / add-on",
    onro: "yes",
    ontime: "Customer portal",
    setmore: "Booking widget",
  },
  {
    feature: "Custom delivery pricing rules",
    note: "Distance, service, vehicle, surcharges, add-ons, and similar delivery-specific logic.",
    qalt: "yes",
    shipday: "partial",
    onfleet: "Courier Suite",
    tookan: "partial",
    onro: "yes",
    ontime: "yes",
    setmore: "partial",
  },
  {
    feature: "Instant price before booking",
    qalt: "yes",
    shipday: "partial",
    onfleet: "Courier Suite",
    tookan: "partial",
    onro: "yes",
    ontime: "Higher tiers",
    setmore: "Service price",
  },
  {
    feature: "White-label / branded customer experience",
    qalt: "yes",
    shipday: "Higher tier",
    onfleet: "yes",
    tookan: "Higher tier / add-on",
    onro: "yes",
    ontime: "Enterprise",
    setmore: "Pro",
  },
  {
    feature: "Online payment collection",
    qalt: "yes",
    shipday: "partial",
    onfleet: "partial",
    tookan: "partial",
    onro: "yes",
    ontime: "Enterprise portal",
    setmore: "yes",
  },
  {
    feature: "Branded Quote PDF",
    note: "A customer-ready quote document that preserves the price and quote details at issue time.",
    qalt: "soon",
    shipday: "Varies",
    onfleet: "Varies",
    tookan: "Varies",
    onro: "Varies",
    ontime: "Custom reports",
    setmore: "no",
  },
  {
    feature: "Paid invoice / receipt record",
    qalt: "soon",
    shipday: "Varies",
    onfleet: "Courier Suite invoicing",
    tookan: "Varies",
    onro: "Varies",
    ontime: "Business+ invoicing",
    setmore: "Receipts",
  },
  {
    feature: "Dispatch & driver management",
    qalt: "Ops Console",
    shipday: "yes",
    onfleet: "yes",
    tookan: "yes",
    onro: "yes",
    ontime: "yes",
    setmore: "no",
  },
  {
    feature: "Route optimization",
    qalt: "no",
    shipday: "Professional+",
    onfleet: "yes",
    tookan: "Paid / add-on",
    onro: "yes",
    ontime: "yes",
    setmore: "no",
  },
  {
    feature: "Driver mobile app",
    qalt: "no",
    shipday: "yes",
    onfleet: "yes",
    tookan: "yes",
    onro: "yes",
    ontime: "yes",
    setmore: "no",
  },
  {
    feature: "Free entry plan",
    qalt: "yes",
    shipday: "yes",
    onfleet: "no",
    tookan: "yes",
    onro: "Trial",
    ontime: "Trial",
    setmore: "yes",
  },
];

function Cell({ value, qalt = false }: { value: CellValue; qalt?: boolean }) {
  if (value === "yes") {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 font-bold text-slate-800">
        <CheckCircle2 size={18} className={qalt ? "text-red-600" : "text-emerald-600"} />
        <span className="sr-only">Included</span>
      </span>
    );
  }

  if (value === "no") {
    return (
      <span className="inline-flex items-center justify-center text-slate-300">
        <Minus size={18} />
        <span className="sr-only">Not included</span>
      </span>
    );
  }

  if (value === "partial") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700">
        <CircleHelp size={15} /> Partial
      </span>
    );
  }

  if (value === "soon") {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-black uppercase tracking-wide text-red-700">
        In development
      </span>
    );
  }

  return <span className="text-xs font-bold leading-snug text-slate-600">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <PublicNav />

      <main className="pt-16 sm:pt-20">
        <section className="relative overflow-hidden border-b border-slate-200 bg-[#080B14] px-6 py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(223,23,49,0.18),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(245,158,11,0.08),transparent_28%)]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
              Delivery software comparison
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Choose the tool that fits
              <span className="block text-red-500">the way you sell delivery.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-relaxed text-white/60 sm:text-lg">
              Qalt is designed around the customer-facing quote-to-cash flow: your website, your pricing, your brand, then booking and payment. Other platforms may go deeper into routing, dispatch, or appointment scheduling.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-7 py-3.5 text-sm font-black text-white transition hover:bg-red-500 sm:w-auto"
              >
                See Qalt Live <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-black text-white/85 transition hover:bg-white/10 sm:w-auto"
              >
                View Qalt Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-red-600">Feature matrix</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Qalt versus popular alternatives</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500 sm:text-base">
                This is a practical fit comparison, not a claim that one product replaces every other product. A courier may use Qalt as the branded sales layer in front of a separate dispatch or routing system.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-[1180px] w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 bg-white">
                      <th className="sticky left-0 z-20 w-[260px] bg-white px-5 py-5 text-xs font-black uppercase tracking-wider text-slate-400">
                        Capability
                      </th>
                      {vendors.map((vendor) => (
                        <th
                          key={vendor.key}
                          className={`min-w-[130px] px-4 py-5 align-top ${vendor.highlight ? "bg-red-50/70" : ""}`}
                        >
                          <div className={`text-sm font-black ${vendor.highlight ? "text-red-700" : "text-slate-900"}`}>
                            {vendor.label}
                          </div>
                          <div className="mt-1 text-[11px] font-semibold leading-snug text-slate-400">{vendor.sub}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={row.feature} className={index === rows.length - 1 ? "" : "border-b border-slate-100"}>
                        <th className="sticky left-0 z-10 bg-white px-5 py-5 align-middle">
                          <div className="text-sm font-bold text-slate-800">{row.feature}</div>
                          {row.note && <div className="mt-1.5 text-[11px] font-medium leading-relaxed text-slate-400">{row.note}</div>}
                        </th>
                        <td className="bg-red-50/50 px-4 py-5 text-center"><Cell value={row.qalt} qalt /></td>
                        <td className="px-4 py-5 text-center"><Cell value={row.shipday} /></td>
                        <td className="px-4 py-5 text-center"><Cell value={row.onfleet} /></td>
                        <td className="px-4 py-5 text-center"><Cell value={row.tookan} /></td>
                        <td className="px-4 py-5 text-center"><Cell value={row.onro} /></td>
                        <td className="px-4 py-5 text-center"><Cell value={row.ontime} /></td>
                        <td className="px-4 py-5 text-center"><Cell value={row.setmore} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 text-xs font-medium leading-relaxed text-slate-500">
                Feature availability, packaging, and pricing can change. Competitor descriptions are based on publicly available vendor information reviewed in September 2026. “Varies” means the capability may depend on workflow, plan, configuration, or was not presented by the vendor as the same quote-document experience Qalt is building.
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white px-6 py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-red-600">Qalt&apos;s wedge</div>
              <h3 className="text-2xl font-black tracking-tight">Your website becomes the sales counter.</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
                Give customers a delivery-specific quote and booking experience without sending them to a generic appointment page or making every quote a phone call.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-red-600">Not a platform war</div>
              <h3 className="text-2xl font-black tracking-tight">Keep the ops tools you already like.</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
                Shipday, Onfleet, Tookan, Onro, and OnTime 360 are strong in operations. Qalt can complement an existing stack by owning the branded quote, booking, payment, and document experience.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-7">
              <div className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-red-600">Built for small carriers</div>
              <h3 className="text-2xl font-black tracking-tight">Look established without enterprise overhead.</h3>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
                Qalt is designed to help a small courier present clear pricing, consistent branding, and professional customer records from the first website visit.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#080B14] px-6 py-20 text-center sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">Your brand. Your pricing. Your website.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-white/55">
              Let Qalt handle the quote-to-cash experience in the background while your customer sees a professional delivery company in front.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-sm font-black text-white transition hover:bg-red-500"
              >
                Start Free <ArrowRight size={16} />
              </Link>
              <Link
                href="/what-qalt-does"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-black text-white/85 transition hover:bg-white/10"
              >
                See What Qalt Does
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
