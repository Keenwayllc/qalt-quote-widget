import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import PublicNav from "@/components/shared/PublicNav";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import MarketingFooter from "@/components/shared/MarketingFooter";

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
    alternates: { canonical: `https://www.qalt.site/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      siteName: "Qalt",
      url: `https://www.qalt.site/blog/${post.slug}`,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  "How-To": "bg-red-50 text-red-700",
  "Industry": "bg-slate-100 text-slate-700",
  "Product": "bg-red-50 text-red-700",
  "Growth": "bg-slate-100 text-slate-700",
  "Operations": "bg-red-50 text-red-700",
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Qalt" },
    publisher: { "@type": "Organization", name: "Qalt", url: "https://www.qalt.site" },
    mainEntityOfPage: `https://www.qalt.site/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PublicNav />

      <main>
        <section className="bg-[#f4f2ec] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
          <div className="mx-auto max-w-4xl">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-red-600"><ArrowLeft size={15} />All posts</Link>
            <div className="mb-2">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black ${CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600"}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} · {post.readTime}
            </span>
          </div>
          <h1 className="mb-5 max-w-4xl text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[0.92] tracking-[-0.055em] text-slate-950">{post.title}</h1>
          <p className="max-w-3xl text-lg font-medium leading-8 text-slate-600">{post.description}</p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6">
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
        <div className="mt-16 bg-[#0b0b0c] p-8 text-center">
          <h2 className="text-xl font-black text-white mb-2">Add an instant quote widget to your site</h2>
          <p className="text-slate-400 font-medium text-sm mb-5">
            Start free on the Starter plan. Your pricing, your brand, one embed code.
          </p>
          <Link
            href="/register"
            className="inline-block bg-red-600 px-7 py-3 text-sm font-black text-white transition-colors hover:bg-red-700"
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
                  className="group flex items-start justify-between gap-4 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-400"
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
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
