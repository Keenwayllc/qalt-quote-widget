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
  "How-To": "bg-blue-100 text-blue-700",
  "Industry": "bg-purple-100 text-purple-700",
  "Product": "bg-emerald-100 text-emerald-700",
  "Growth": "bg-amber-100 text-amber-700",
  "Operations": "bg-rose-100 text-rose-700",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-slate-50">
      <PublicNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-14">
        <div className="mb-12">
          <p className="text-xs font-black text-red-600 uppercase tracking-widest mb-2">Qalt Blog</p>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Resources for Courier &amp; Delivery Businesses
          </h1>
          <p className="text-slate-500 mt-3 text-lg font-medium max-w-2xl">
            Guides on pricing, lead generation, website tools, and growing a delivery business.
          </p>
        </div>

        {/* Featured external insight */}
        <a
          href={featuredInsight.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-12 block group"
          aria-label={`${featuredInsight.title} (opens on LinkedIn in a new tab)`}
        >
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-8 text-white shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-2xl sm:p-10">
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
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col"
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
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Ready to add a quote widget to your site?</h2>
          <p className="text-slate-400 font-medium mb-6">
            Start free on the Starter plan, build your first quote form, and upgrade when you need more.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-red-600 text-white rounded-xl font-black hover:bg-red-500 transition-colors shadow-lg"
          >
            Get Started Free →
          </Link>
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
