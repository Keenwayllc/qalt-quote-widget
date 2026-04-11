import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import QaltLogo from "@/components/shared/QaltLogo";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Qalt Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      siteName: "Qalt",
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "How-To": "bg-blue-100 text-blue-700",
  "Industry": "bg-purple-100 text-purple-700",
  "Product": "bg-emerald-100 text-emerald-700",
  "Growth": "bg-amber-100 text-amber-700",
  "Operations": "bg-rose-100 text-rose-700",
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <QaltLogo size="md" />
          </Link>
          <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
            <Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link>
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-slate-900 transition-colors">Log in</Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          All posts
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Content */}
        <article
          className="prose prose-slate prose-lg max-w-none
            prose-headings:font-black prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-li:text-slate-600
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-a:text-red-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-ul:space-y-1 prose-ol:space-y-1
            prose-hr:border-slate-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 text-center">
          <h2 className="text-xl font-black text-white mb-2">Add an instant quote widget to your site</h2>
          <p className="text-slate-400 font-medium text-sm mb-5">
            Free for 14 days. Your pricing, your brand, one embed code.
          </p>
          <Link
            href="/register"
            className="inline-block px-7 py-3 bg-red-600 text-white rounded-xl font-black text-sm hover:bg-red-500 transition-colors shadow-lg"
          >
            Get Started Free →
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">More articles</h2>
            <div className="space-y-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="flex items-start justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm transition-shadow group"
                >
                  <div>
                    <p className="text-sm font-black text-slate-900 group-hover:text-red-600 transition-colors leading-snug mb-1">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">{p.readTime}</p>
                  </div>
                  <ArrowLeft size={14} className="shrink-0 text-slate-300 rotate-180 mt-1 group-hover:text-red-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
