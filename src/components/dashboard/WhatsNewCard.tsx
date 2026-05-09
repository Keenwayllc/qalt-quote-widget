import { Star } from "lucide-react";
import Link from "next/link";

interface WhatsNewCardProps {
  name: string;
  icon: React.ReactNode;
  description: string;
  readingTime: number;
  category: string;
  learnMoreLink: string;
  variant?: "full" | "compact";
}

export default function WhatsNewCard({
  name,
  icon,
  description,
  readingTime,
  category,
  learnMoreLink,
  variant = "full",
}: WhatsNewCardProps) {
  if (variant === "compact") {
    // Compact version for dashboard highlight
    return (
      <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-none p-4 space-y-2">
        <div className="flex items-start gap-3">
          <div className="text-red-500 shrink-0">{icon}</div>
          <div className="min-w-0 flex-1">
            <p className="font-black text-slate-900 dark:text-white text-sm truncate">
              {name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Full version for What's New page
  return (
    <div className="bg-white dark:bg-[#1e1e1e] border border-slate-200 dark:border-white/[0.06] rounded-none p-6 space-y-4 hover:shadow-lg dark:hover:border-white/10 hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="text-red-500 shrink-0">{icon}</div>
          <div>
            <p className="font-black text-slate-900 dark:text-white text-lg">
              {name}
            </p>
            <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-400 rounded-md">
              {category}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
          {readingTime} min read
        </span>
        <Link
          href={learnMoreLink}
          className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Learn More →
        </Link>
      </div>
    </div>
  );
}
