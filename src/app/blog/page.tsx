import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import PublicNav from "@/components/shared/PublicNav";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { featuredInsight } from "@/lib/featuredInsight";
import MarketingFooter from "@/components/shared/MarketingFooter";

export const metadata: Metadata = {
  title: "Blog | Qalt",
  description: "Guides and insights for courier and delivery companies, from pricing and lead generation to website tools and operations.",
  alternates: { canonical: "https://www.qalt.site/blog" },
};

const CATEGORY_COLORS: Record<string, string> = {
  "How-To": "bg-red-50 text-red-700",
  "Industry": "bg-slate-100 text-slate-700",
  "Product": "bg-red-50 text-red-700",
  "Growth": "bg-slate-100 text-slate-700",
  "Operations": "bg-red-50 text-red-700",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <PublicNav />

      <main>
        <section className="bg-[#f4f2ec] px-5 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <div className="mx-auto max-w-6xl">
            <p className="mb-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500"><span className="h-2 w-2 bg-red-600" />Qalt field notes</p>
            <h1 className="max-w-5xl text-[clamp(3.1rem,7vw,6.2rem)] font-black leading-[0.88] tracking-[-0.06em] text-slate-950">Resources for courier and delivery operators.</h1>
            <p className="mt-8 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg">Pricing, lead generation, website quoting and practical operating ideas for delivery companies.</p>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">

        {/* Featured external insight */}
        <a
          href={featuredInsight.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-12 block group"
          aria-label={`${featuredInsight.title} (opens on LinkedIn in a new tab)`}
        >
          <div className="overflow-hidden border border-slate-950 bg-[#0b0b0c] p-8 text-white transition duration-300 hover:-translate-y-0.5 sm:p-10">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
                Featured insight
              </span>
              <span className="text-xs font-bold text-slate-400">
                {featuredInsight.source} · {featuredInsight.author}
              </span>
            </div>
            <h2 className="max-w-4xl text-2xl font-black leading-tight tracking-tight text-white transition-colors group-hover:text-red-400 sm:text-4xl">
              {featuredInsight.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-400">
              {featuredInsight.description}
            </p>
            <span className="mt-7 inline-flex items-center gap-2 text-sm font-black text-white">
              Read on LinkedIn
              <ExternalLink size={15} aria-hidden="true" />
            </span>
          </div>
        </a>

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-slate-200 bg-white p-6 transition-colors hover:border-slate-400"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>
                  {post.category}
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 tracking-tight mb-2 group-hover:text-red-600 transition-colors leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                {post.description}
              </p>
              <p className="text-xs text-slate-400 font-medium mt-auto">
                {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {post.readTime}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-[#0b0b0c] p-10 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Ready to add a quote widget to your site?</h2>
          <p className="text-slate-400 font-medium mb-6">
            Start free on the Starter plan, build your first quote form, and upgrade when you need more.
          </p>
          <Link
            href="/register"
            className="inline-block bg-red-600 px-8 py-3.5 font-black text-white transition-colors hover:bg-red-700"
          >
            Get Started Free →
          </Link>
        </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
