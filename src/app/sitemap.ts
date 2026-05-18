import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";
import { accommodations } from "@/lib/content/accommodations";
import { blogPosts } from "@/lib/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/verblijf",
    "/boerderij",
    "/boerderij/dieren",
    "/boerderij/stalloon",
    "/omgeving",
    "/plattegrond",
    "/praktisch",
    "/praktisch/tarieven",
    "/praktisch/faq",
    "/blog",
    "/contact",
    "/boeken",
    "/privacy",
    "/cookies",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const accommodationRoutes: MetadataRoute.Sitemap = accommodations.map((a) => ({
    url: `${base}/verblijf/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...accommodationRoutes, ...blogRoutes];
}
