/* eslint-disable @next/next/no-img-element -- decorative card art, sized by CSS */
import Link from "next/link";
import type { WhatsNewItem } from "@/lib/whats-new";

/** Card art sits behind the content, faded in from the left so text stays readable. */
function CardArt({ item, compact }: { item: WhatsNewItem; compact: boolean }) {
  if (!item.image) return null;
  const imgClass = `pointer-events-none absolute inset-y-0 right-0 h-full object-cover object-right ${compact ? "w-full opacity-60 dark:opacity-50" : "w-[78%] opacity-90 dark:opacity-75"}`;
  return (
    <>
      <img src={item.image} alt="" aria-hidden="true" loading="lazy" decoding="async"
        className={`${imgClass}${item.imageDark ? " dark:hidden" : ""}`} />
      {item.imageDark && (
        <img src={item.imageDark} alt="" aria-hidden="true" loading="lazy" decoding="async" className={`${imgClass} hidden dark:block`} />
      )}
      <div className={`pointer-events-none absolute inset-0 ${compact
        ? "bg-linear-to-r from-white via-white/90 to-white/40 dark:from-[#1e1e1e] dark:via-[#1e1e1e]/90 dark:to-[#1e1e1e]/45"
        : "bg-linear-to-r from-white from-30% via-white/80 via-55% to-white/0 dark:from-[#1e1e1e] dark:via-[#1e1e1e]/80 dark:to-[#1e1e1e]/10"}`} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-white/90 to-transparent dark:from-[#1e1e1e]/90" />
    </>
  );
}

export default function WhatsNewCard({ item, variant = "full" }: { item: WhatsNewItem; variant?: "full" | "compact" }) {
  const Icon = item.icon;

  if (variant === "compact") {
    return (
      <Link href={item.link}
        className="relative block h-full min-h-[104px] overflow-hidden border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 dark:border-white/[0.06] dark:bg-[#1e1e1e] dark:hover:border-white/10">
        <CardArt item={item} compact />
        <div className="relative flex items-start gap-3">
          <Icon size={24} className="shrink-0 text-red-500" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-slate-900 dark:text-white">{item.name}</p>
            <p className="line-clamp-2 text-xs text-slate-600 dark:text-slate-300">{item.summary}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative flex min-h-[210px] flex-col overflow-hidden border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg dark:border-white/[0.06] dark:bg-[#1e1e1e] dark:hover:border-white/10">
      <CardArt item={item} compact={false} />
      <div className="relative flex items-start gap-3">
        <Icon size={32} className="shrink-0 text-red-500" aria-hidden="true" />
        <div>
          <p className="text-lg font-black text-slate-900 dark:text-white">{item.name}</p>
          <span className="mt-1 inline-block rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700 dark:bg-red-500/15 dark:text-red-400">
            {item.category}
          </span>
        </div>
      </div>

      <p className="relative mt-4 max-w-[34rem] text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.description}</p>

      <div className="relative mt-auto flex items-center justify-between pt-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
          {item.readingTime ? `${item.readingTime} min read` : ""}
        </span>
        <Link href={item.link}
          className="text-sm font-bold text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
          {item.linkLabel ?? "Learn More"} →
        </Link>
      </div>
    </div>
  );
}
