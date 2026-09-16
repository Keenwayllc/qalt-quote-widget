import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Download, FileText, MapPin, ReceiptText, ShieldCheck } from "lucide-react";
import prisma from "@/lib/prisma";
import { getPublicQuoteDocument, markPublicDocumentViewed } from "@/lib/customer-document-access";
import { parseQuoteSnapshot } from "@/lib/customer-document-snapshots";
import QuotePortalActions from "./QuotePortalActions";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function prettyDate(value: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

export default async function CustomerQuotePortal({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const document = await getPublicQuoteDocument(token);
  if (!document) notFound();

  let snapshot;
  try {
    snapshot = parseQuoteSnapshot(document.snapshot);
  } catch {
    notFound();
  }

  const quote = await prisma.quoteRequest.findFirst({
    where: { id: document.quoteRequestId, companyId: document.companyId, deletedAt: null },
    select: {
      status: true,
      paymentStatus: true,
      paidAt: true,
      company: {
        select: {
          phone: true,
          website: true,
          email: true,
        },
      },
      customerDocuments: {
        where: { type: "INVOICE", status: "PAID" },
        select: { id: true, number: true, paidAt: true },
        take: 1,
      },
    },
  });
  if (!quote) notFound();

  try {
    await markPublicDocumentViewed({ documentId: document.id, token });
  } catch {
    // Viewing metadata never blocks customer access.
  }

  const paid = quote.paymentStatus === "PAID" || quote.status === "PAID";
  const canAccept = quote.status === "PENDING";
  const canPay = !paid && quote.paymentStatus !== null;
  const invoice = quote.customerDocuments[0] ?? null;
  const brand = snapshot.merchant.brandColor || "#df1731";
  const issuedDate = prettyDate(snapshot.document.issuedAt);

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            {snapshot.merchant.logoUrl ? (
              <img src={snapshot.merchant.logoUrl} alt="" className="h-12 w-12 rounded-xl object-contain ring-1 ring-slate-200" />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-xl text-lg font-black text-white" style={{ backgroundColor: brand }}>
                {snapshot.merchant.name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">Customer quote portal</div>
              <h1 className="mt-1 text-xl font-black tracking-[-0.02em]">{snapshot.merchant.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            <ShieldCheck size={14} /> Secure quote link
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: brand }}>Quote {snapshot.document.number}</div>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">{snapshot.shipment.serviceType || "Delivery service"}</h2>
                  <p className="mt-2 text-sm font-medium text-slate-500">Issued {issuedDate || "recently"}{snapshot.customer.name ? ` for ${snapshot.customer.name}` : ""}</p>
                </div>
                <div className="rounded-2xl bg-slate-950 px-5 py-4 text-white">
                  <div className="text-[10px] font-black uppercase tracking-wider text-white/45">Total</div>
                  <div className="mt-1 text-3xl font-black">{money(snapshot.pricing.total)}</div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                <div className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400"><MapPin size={14} /> Route</div>
                <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <div><div className="text-[10px] font-black uppercase text-slate-400">Pickup</div><div className="mt-1 text-sm font-bold leading-5">{snapshot.route.pickupAddress || "Pickup location"}</div></div>
                  <div className="hidden text-slate-300 sm:block">→</div>
                  <div><div className="text-[10px] font-black uppercase text-slate-400">Drop-off</div><div className="mt-1 text-sm font-bold leading-5">{snapshot.route.dropoffAddress || "Drop-off location"}</div></div>
                </div>
                {snapshot.route.distanceMiles !== null && <div className="mt-4 text-xs font-bold text-slate-500">{snapshot.route.distanceMiles.toFixed(1)} miles</div>}
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-black">Price breakdown</h3>
                <div className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200">
                  {snapshot.pricing.lineItems.length > 0 ? snapshot.pricing.lineItems.map((item, index) => (
                    <div key={`${item.description}-${index}`} className="flex items-start justify-between gap-5 px-4 py-3.5">
                      <div><div className="text-sm font-bold text-slate-800">{item.description}</div>{item.detail && <div className="mt-0.5 text-xs font-medium text-slate-400">{item.detail}</div>}</div>
                      <div className="text-sm font-black">{money(item.amount)}</div>
                    </div>
                  )) : (
                    <div className="flex items-center justify-between px-4 py-3.5"><span className="text-sm font-bold text-slate-700">Delivery service</span><span className="text-sm font-black">{money(snapshot.pricing.total)}</span></div>
                  )}
                  <div className="flex items-center justify-between bg-slate-50 px-4 py-4"><span className="text-sm font-black">Quote total</span><span className="text-base font-black">{money(snapshot.pricing.total)}</span></div>
                </div>
              </div>

              {(snapshot.shipment.date || snapshot.shipment.time || snapshot.shipment.itemCount || snapshot.shipment.weight || snapshot.shipment.addOns.length > 0) && (
                <div className="mt-8">
                  <h3 className="text-sm font-black">Delivery details</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {snapshot.shipment.date && <Detail label="Pickup date" value={snapshot.shipment.date} />}
                    {snapshot.shipment.time && <Detail label="Pickup time" value={snapshot.shipment.time} />}
                    {snapshot.shipment.itemCount !== null && <Detail label="Items" value={String(snapshot.shipment.itemCount)} />}
                    {snapshot.shipment.weight && <Detail label="Weight" value={snapshot.shipment.weight} />}
                    {snapshot.shipment.vehicleCount !== null && <Detail label="Vehicles" value={String(snapshot.shipment.vehicleCount)} />}
                    {snapshot.shipment.addOns.length > 0 && <Detail label="Add-ons" value={snapshot.shipment.addOns.join(", ")} />}
                  </div>
                </div>
              )}
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Status</div>
                  <div className="mt-1 text-lg font-black">{paid ? "Paid & booked" : quote.status === "CONFIRMED" ? "Accepted" : "Ready for review"}</div>
                </div>
                {paid && <CheckCircle2 className="text-emerald-600" size={24} />}
              </div>
              <div className="mt-5"><QuotePortalActions token={token} canAccept={canAccept} canPay={canPay} /></div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-black"><FileText size={16} /> Documents</div>
              <a href={`/documents/${token}`} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                <span>Quote PDF</span><Download size={15} />
              </a>
              {invoice && (
                <a href={`/quote/${token}/invoice`} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
                  <span>{invoice.number || "Paid invoice"}</span><ReceiptText size={15} />
                </a>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-black">Need help?</div>
              <p className="mt-2 text-xs font-medium leading-5 text-slate-500">Contact {snapshot.merchant.name} about this quote.</p>
              <div className="mt-3 space-y-2 text-xs font-bold text-slate-700">
                {quote.company.phone && <div>{quote.company.phone}</div>}
                {quote.company.email && <div>{quote.company.email}</div>}
                {quote.company.website && <Link href={quote.company.website} className="block" target="_blank">{quote.company.website}</Link>}
              </div>
            </div>

            <p className="px-2 text-center text-[10px] font-semibold leading-4 text-slate-400">This private link provides access to your quote. Do not forward it unless you want another person to view the quote.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200 p-4"><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 text-sm font-bold text-slate-800">{value}</div></div>;
}
