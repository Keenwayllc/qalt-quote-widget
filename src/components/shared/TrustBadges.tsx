import Link from "next/link";
import { CreditCard, Database, KeyRound, Lock, ShieldCheck, type LucideIcon } from "lucide-react";

/**
 * Security badges shown across Qalt. Every claim here must stay true of the
 * code and hosting; update or remove a badge before changing what it describes.
 *
 *   https     Vercel serves every page and API route over TLS only.
 *   stripe    Payments use Stripe Checkout (stripe.checkout.sessions.create);
 *             card numbers are typed on Stripe's page and never reach Qalt.
 *   passwords bcrypt hashing in src/lib/auth.ts.
 *   atRest    Supabase Postgres, encrypted at rest (AES-256) by the host.
 *   bots      Cloudflare Turnstile on sign-up and demo access.
 *
 * Do not add compliance certifications (SOC 2, HIPAA, PCI for Qalt itself),
 * insurance, or uptime guarantees without written confirmation.
 */

export type TrustBadge = { key: string; icon: LucideIcon; title: string; detail: string };

export const TRUST_BADGES: TrustBadge[] = [
  {
    key: "https",
    icon: Lock,
    title: "Encrypted connection",
    detail: "Every page, quote form, and dashboard screen loads over HTTPS (TLS), so data can't be read in transit.",
  },
  {
    key: "stripe",
    icon: CreditCard,
    title: "Payments by Stripe",
    detail: "Customers enter card details on Stripe's checkout page. Card numbers never reach Qalt or the delivery company.",
  },
  {
    key: "passwords",
    icon: KeyRound,
    title: "Hashed passwords",
    detail: "Account passwords are stored as bcrypt hashes. Nobody at Qalt can see your password.",
  },
  {
    key: "atRest",
    icon: Database,
    title: "Encrypted at rest",
    detail: "Quotes, customer details, and account data live in a Postgres database that is encrypted at rest.",
  },
  {
    key: "bots",
    icon: ShieldCheck,
    title: "Bot protection",
    detail: "Sign-up and demo access are guarded by Cloudflare's human check to keep fake accounts out.",
  },
];

/** Full badge grid for marketing pages. */
export function TrustBadgeGrid({ tone = "light", keys }: { tone?: "light" | "dark"; keys?: string[] }) {
  const badges = keys ? TRUST_BADGES.filter((b) => keys.includes(b.key)) : TRUST_BADGES;
  const dark = tone === "dark";
  return (
    <ul className={`grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2 ${badges.length >= 5 ? "xl:grid-cols-5" : badges.length === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"} ${dark ? "border-white/10 bg-white/10" : "border-slate-200 bg-slate-200"}`}>
      {badges.map(({ key, icon: Icon, title, detail }) => (
        <li key={key} className={`p-5 ${dark ? "bg-slate-950" : "bg-white"}`}>
          <div className="flex items-center gap-2">
            <Icon size={16} className={dark ? "text-emerald-400" : "text-emerald-600"} aria-hidden="true" />
            <h3 className={`text-sm font-black ${dark ? "text-white" : "text-slate-950"}`}>{title}</h3>
          </div>
          <p className={`mt-2 text-[13px] font-medium leading-5 ${dark ? "text-slate-400" : "text-slate-500"}`}>{detail}</p>
        </li>
      ))}
    </ul>
  );
}

/** One-line badge strip: sign-up, pricing, dashboard. */
export function TrustBadgeStrip({
  keys = ["https", "stripe", "passwords"],
  tone = "light",
  link = true,
  className = "",
}: {
  keys?: string[];
  tone?: "light" | "dark";
  link?: boolean;
  className?: string;
}) {
  const badges = TRUST_BADGES.filter((b) => keys.includes(b.key));
  const dark = tone === "dark";
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold ${dark ? "text-slate-400" : "text-slate-500"} ${className}`}>
      {badges.map(({ key, icon: Icon, title }) => (
        <span key={key} className="inline-flex items-center gap-1.5" title={TRUST_BADGES.find((b) => b.key === key)?.detail}>
          <Icon size={12} className={dark ? "text-emerald-400" : "text-emerald-600"} aria-hidden="true" />
          {title}
        </span>
      ))}
      {link && (
        <Link href="/security" className={`underline-offset-2 hover:underline ${dark ? "text-slate-300" : "text-slate-600"}`}>
          Security details
        </Link>
      )}
    </div>
  );
}
