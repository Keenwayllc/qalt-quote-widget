import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

type Article = {
  title: string;
  category: string;
  intro: string;
  whatItDoes: string[];
  howItWorks: string[];
  actionHref: string;
  actionText: string;
  note?: string;
};

const ARTICLES: Record<string, Article> = {
  "customer-documents": {
    title: "Branded Quote & Paid Invoice PDFs",
    category: "Customer Documents",
    intro: "Qalt creates customer-facing quote and paid-invoice records that merchants can view, email, and manage from Quote Details.",
    whatItDoes: [
      "Issue a branded Quote PDF for a customer quote.",
      "Email a secure quote link and resend it when needed.",
      "Create and expose a Paid Invoice record after a successful payment.",
      "View Quote PDFs and Paid Invoice PDFs directly from Quote Details.",
    ],
    howItWorks: [
      "Open Quotes and select a quote.",
      "Use Customer Documents to issue or view the Quote PDF.",
      "Use Email Quote to send the secure customer document link.",
      "After a successful eligible payment, the paid invoice becomes available for viewing and email delivery.",
    ],
    actionHref: "/dashboard/quotes",
    actionText: "Open Quotes",
  },
  "white-label-email": {
    title: "White-Label Email Domain",
    category: "Pro / Enterprise",
    intro: "Pro and Enterprise merchants can register and verify a custom email subdomain so customer quote emails can be sent from their own brand domain.",
    whatItDoes: [
      "Register a sending subdomain you control.",
      "Choose the sender name customers see.",
      "Display the DNS records required for verification.",
      "Verify the domain before Qalt begins using it for customer email delivery.",
    ],
    howItWorks: [
      "Open Account Settings and find Custom Email Domain.",
      "Enter a subdomain such as mail.yourcompany.com and your sender name.",
      "Add the generated DNS records at your DNS provider.",
      "Return to Qalt and click Verify DNS.",
    ],
    actionHref: "/dashboard/settings",
    actionText: "Open Account Settings",
  },
  "kanban-crm": {
    title: "Kanban CRM Board",
    category: "All Plans",
    intro: "The Quotes board gives merchants a visual workflow for moving quotes through six operational statuses.",
    whatItDoes: [
      "Organize quotes into Pending, Confirmed, Won, Lost, Cancelled, and Paid columns.",
      "Drag a quote card from one column to another.",
      "Persist the changed quote status back to Qalt.",
      "Open quote details directly from a board card.",
    ],
    howItWorks: [
      "Open Quotes and switch to the board view when available.",
      "Drag a quote card into the status that matches its current stage.",
      "Qalt updates the quote immediately in the interface and saves the new status.",
    ],
    actionHref: "/dashboard/quotes",
    actionText: "Open Quotes Board",
  },
  "geo-fencing": {
    title: "Geo-Fencing & Service Areas",
    category: "Pro / Enterprise",
    intro: "Service-area controls let merchants define supported ZIP codes and prevent unsupported routes from moving through the normal quote flow when geo-fencing is enabled.",
    whatItDoes: [
      "Store a merchant-defined list of service ZIP codes.",
      "Enable or disable geo-fencing from widget settings.",
      "Check the entered pickup and dropoff ZIP codes before calculating the quote.",
      "Stop unsupported requests and show the customer an explanatory message.",
    ],
    howItWorks: [
      "Open Widget Appearance and find Service Area.",
      "Add the ZIP codes you serve and enable geo-fencing.",
      "Save the widget settings.",
      "The live quote form checks the customer route against those ZIP codes before proceeding.",
    ],
    actionHref: "/dashboard/widget",
    actionText: "Open Service Area Settings",
  },
  "transit-time": {
    title: "Transit Time Estimation",
    category: "All Plans",
    intro: "Qalt can return estimated driving time with a route calculation and show it beside the quote estimate so customers can understand both price and expected drive time.",
    whatItDoes: [
      "Requests a driving route for the pickup and dropoff locations.",
      "Returns route distance and duration when routing data is available.",
      "Displays the estimated drive time next to the distance on the rate screen.",
      "Carries the estimated duration into the booking review screen.",
    ],
    howItWorks: [
      "The customer enters pickup and dropoff addresses.",
      "Qalt calculates the driving route used for the quote.",
      "The estimate response includes duration in minutes when the routing provider returns it.",
      "Qalt formats that duration as minutes or hours and minutes for the customer.",
    ],
    actionHref: "/dashboard/widget",
    actionText: "Preview Your Widget",
    note: "The time shown is a driving-time estimate from the calculated route. It is not a guaranteed delivery ETA and can change with traffic, stops, service time, or operating conditions.",
  },
  "payments": {
    title: "Payment Processing",
    category: "Enterprise",
    intro: "Enterprise merchants can enable the widget payment flow so a customer can review a quote and continue into hosted checkout.",
    whatItDoes: [
      "Enable Pay & Book on eligible Enterprise widgets.",
      "Create a checkout session for the submitted quote.",
      "Send the customer into hosted checkout instead of ending at a basic quote submission.",
      "Record paid status and support the paid-invoice document workflow after successful payment.",
    ],
    howItWorks: [
      "Connect the merchant payment account in Widget Appearance.",
      "Enable payments for the widget.",
      "The customer reviews the quote and selects Pay & Book.",
      "Qalt creates checkout for that quote and redirects the customer to the hosted payment page.",
    ],
    actionHref: "/dashboard/widget",
    actionText: "Open Payment Settings",
    note: "Current Qalt plan entitlements expose widget payments on Enterprise. Pro does not currently include this entitlement.",
  },
};

export default async function FeatureArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <article className="mx-auto max-w-3xl p-4 sm:p-8 lg:py-10">
      <Link href="/dashboard/whats-new" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft size={16} /> Back to What's New
      </Link>

      <header className="mb-8 border-b border-slate-200 pb-7 dark:border-white/[0.07]">
        <div className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-600">{article.category}</div>
        <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">{article.intro}</p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">What it does</h2>
        <div className="mt-4 space-y-3">
          {article.whatItDoes.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/[0.07] dark:bg-white/[0.03] sm:p-6">
        <h2 className="text-xl font-black text-slate-950 dark:text-white">How to use it</h2>
        <ol className="mt-4 space-y-3">
          {article.howItWorks.map((item, index) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[11px] font-black text-white dark:bg-white dark:text-slate-900">{index + 1}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>

      {article.note && (
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
          {article.note}
        </div>
      )}

      <Link href={article.actionHref} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-red-700">
        {article.actionText} <ArrowRight size={16} />
      </Link>
    </article>
  );
}
