import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/login", "/register", "/forgot-password", "/reset-password", "/documents/", "/quote/", "/custom-widget/"],
    },
    sitemap: "https://www.qalt.site/sitemap.xml",
    host: "https://www.qalt.site",
  };
}
