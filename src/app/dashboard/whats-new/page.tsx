import WhatsNewCard from "@/components/dashboard/WhatsNewCard";
import { WHATS_NEW } from "@/lib/whats-new";

export default function WhatsNewPage() {
  return (
    <div className="p-4 lg:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="space-y-3">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          What&apos;s New in Qalt
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl">
          Discover the latest features to help you manage quote requests and grow your business. Each feature includes a brief description and a link to its complete guide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {WHATS_NEW.map((item) => <WhatsNewCard key={item.id} item={item} variant="full" />)}
      </div>

      <div className="bg-slate-900 dark:bg-[#1e1e1e] dark:border dark:border-white/[0.06] rounded-none p-8 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Ready to get started?</h2>
        <p className="text-slate-300 max-w-xl mx-auto">
          Explore each feature in detail by clicking &ldquo;Learn More&rdquo; above, or head back to the dashboard to start using them.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 mt-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-none transition-all"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
