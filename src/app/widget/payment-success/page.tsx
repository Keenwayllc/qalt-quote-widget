import prisma from "@/lib/prisma";
import Link from "next/link";
import { CheckCircle, Calendar, MapPin, ArrowRight, Truck, Clock, FileText, Receipt } from "lucide-react";
import { notFound } from "next/navigation";
import ConfettiBurst from "@/components/widget/ConfettiBurst";
import { verifyCustomerQuoteToken } from "@/lib/auth";
import { issueQuoteDocument } from "@/lib/customer-documents";
import { createPublicDocumentAccess } from "@/lib/customer-document-access";

export const dynamic = "force-dynamic";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) notFound();
  const claims = await verifyCustomerQuoteToken(token);
  if (!claims) notFound();

  const quote = await prisma.quoteRequest.findFirst({
    where: { id: claims.quoteId, companyId: claims.companyId },
    select: {
      id: true,
      estimatedPrice: true,
      paymentStatus: true,
      serviceType: true,
      pickupZip: true,
      dropoffZip: true,
      selectedExtras: true,
      customerEmail: true,
      companyId: true,
      company: { select: { name: true } },
    },
  });

  if (!quote) notFound();

  const isPaid = quote.paymentStatus === "PAID";
  const isFailed = quote.paymentStatus === "FAILED";

  if (!isPaid) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
          <div className={`${isFailed ? "bg-slate-700" : "bg-amber-500"} p-10 text-center relative overflow-hidden`}>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-6 text-slate-700">
                <Clock size={40} strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight">
                {isFailed ? "Payment Not Completed" : "Payment Is Being Confirmed"}
              </h1>
              <p className="text-white/90 font-medium mt-2">
                {isFailed ? "This payment did not go through." : "This can take a moment to finalize."}
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-bold uppercase tracking-widest">Order Amount</span>
              <span className="text-slate-900 font-extrabold text-lg">${quote.estimatedPrice.toFixed(2)}</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed text-center font-medium">
                {isFailed
                  ? "Your payment was not completed. You can return to the booking widget and try again."
                  : "We're confirming your payment with your bank. Refresh this page in a few moments to see your confirmation."}
              </p>
            </div>

            <Link
              href={`/widget/${quote.companyId}`}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
            >
              Return to Widget
              <ArrowRight size={18} />
            </Link>

            <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">Powered by Qalt</p>
          </div>
        </div>
      </div>
    );
  }

  let pickupDateTime: string | null = null;
  if (quote.selectedExtras) {
    try {
      const extras = JSON.parse(quote.selectedExtras);
      pickupDateTime = extras.pickupDateTime;
    } catch {
      pickupDateTime = null;
    }
  }

  // Customer-document actions are authorized by the signed payment-success
  // capability above, then tenant-bound again with quoteId + companyId. Fresh
  // bearer links are generated for this confirmation view; only token hashes are
  // persisted. A refresh rotates the links and invalidates the prior ones.
  let quotePdfUrl: string | null = null;
  let invoicePdfUrl: string | null = null;
  let invoiceNumber: string | null = null;
  try {
    const quoteDocument = await issueQuoteDocument({
      companyId: claims.companyId,
      quoteRequestId: claims.quoteId,
    });
    const quoteAccess = await createPublicDocumentAccess({
      companyId: claims.companyId,
      documentId: quoteDocument.id,
    });
    quotePdfUrl = `/documents/${quoteAccess.token}`;

    const invoice = await prisma.customerDocument.findFirst({
      where: {
        companyId: claims.companyId,
        quoteRequestId: claims.quoteId,
        type: "INVOICE",
        status: "PAID",
      },
    });
    if (invoice) {
      invoiceNumber = invoice.number;
      const invoiceAccess = await createPublicDocumentAccess({
        companyId: claims.companyId,
        documentId: invoice.id,
      });
      invoicePdfUrl = `/documents/${invoiceAccess.token}`;
    }
  } catch {
    // Payment confirmation must still render if document-link generation is
    // temporarily unavailable. Never expose internal document errors publicly.
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 font-sans">
      <ConfettiBurst />
      <div className="max-w-md w-full bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in duration-500">
        <div className="bg-emerald-500 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-xl mb-6">
              <CheckCircle size={40} strokeWidth={2.5} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Booking Confirmed!</h1>
            <p className="text-emerald-50 font-medium mt-2">Your payment was successful</p>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-bold uppercase tracking-widest">Order Amount</span>
              <span className="text-slate-900 font-extrabold text-lg">${quote.estimatedPrice.toFixed(2)}</span>
            </div>
            <div className="h-px bg-slate-100" />

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"><Truck size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service</p>
                  <p className="text-sm font-bold text-slate-800">{quote.serviceType}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"><MapPin size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Route</p>
                  <p className="text-sm font-bold text-slate-800">{quote.pickupZip} → {quote.dropoffZip}</p>
                </div>
              </div>

              {pickupDateTime && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0"><Calendar size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup Date</p>
                    <p className="text-sm font-bold text-slate-800">
                      {new Date(pickupDateTime).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {(quotePdfUrl || invoicePdfUrl) && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your documents</p>
                <p className="text-xs text-slate-500 mt-1">Secure PDFs for your booking.</p>
              </div>
              {quotePdfUrl && (
                <Link
                  href={quotePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText size={17} /> View Quote PDF
                </Link>
              )}
              {invoicePdfUrl && (
                <Link
                  href={invoicePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Receipt size={17} /> View Paid Invoice{invoiceNumber ? ` · ${invoiceNumber}` : ""}
                </Link>
              )}
            </div>
          )}

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed text-center font-medium">
              Your booking is confirmed for <span className="text-slate-900 font-bold">{quote.customerEmail}</span>. <strong>{quote.company.name}</strong> will contact you shortly to coordinate the pickup.
            </p>
          </div>

          <Link
            href={`/widget/${quote.companyId}`}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
          >
            Return to Widget
            <ArrowRight size={18} />
          </Link>

          <p className="text-[10px] text-center text-slate-300 font-bold uppercase tracking-[0.2em]">Powered by Qalt</p>
        </div>
      </div>
    </div>
  );
}
