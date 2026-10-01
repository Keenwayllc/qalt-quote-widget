import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const base = "https://www.qalt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/pricing", "/compare", "/demo", "/what-qalt-does", "/courier-quote-software", "/blog", "/partners", "/security"];
  const now = new Date();
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/courier-quote-software" ? 0.9 : 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
