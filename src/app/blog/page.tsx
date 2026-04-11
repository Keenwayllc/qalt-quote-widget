import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import PublicNav from "@/components/shared/PublicNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Qalt",
  description: "Guides and insights for courier and delivery companies, from pricing and lead generation to website tools and operations.",
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
  const [featured, ...rest] = posts;

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

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="block mb-12 group"
          >
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-black ${CATEGORY_COLORS[featured.category] ?? "bg-slate-100 text-slate-600"}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {new Date(featured.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {featured.readTime}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-red-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-slate-500 font-medium text-base leading-relaxed max-w-3xl">
                {featured.description}
              </p>
              <span className="inline-flex items-center mt-6 text-sm font-black text-red-600 group-hover:gap-2 transition-all gap-1">
                Read article →
              </span>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
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
            Set up your delivery price calculator in minutes. Free for 14 days, no credit card required.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3.5 bg-red-600 text-white rounded-xl font-black hover:bg-red-500 transition-colors shadow-lg"
          >
            Get Started Free →
          </Link>
        </div>
      </main>
    </div>
  );
}
