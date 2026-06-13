"use server";

import { payload } from "@/lib/payload";

export type NewsCard = {
  id: string;
  title: string;
  excerpt?: string;
  body?: string;
  date: string;
  pinned: boolean;
  image?: { url: string; alt?: string } | null;
};

export async function fetchNews(): Promise<NewsCard[]> {
  try {
    const p = await payload();
    const items = await p.find({
      collection: "news" as never,
      where: { published: { equals: true } },
      limit: 200,
      sort: "-date",
      depth: 1,
    });
    const mapped: NewsCard[] = items.docs.map((it: any) => {
      const media = it.image && typeof it.image === "object" ? it.image : null;
      return {
        id: String(it.id),
        title: it.title,
        excerpt: it.excerpt ?? undefined,
        body: it.body ?? undefined,
        date: it.date,
        pinned: Boolean(it.pinned),
        image: media?.url ? { url: media.url, alt: media.alt ?? undefined } : null,
      };
    });
    // Pinned first, then by date desc (already date-desc from query).
    return mapped.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      const da = a.date ?? "";
      const db = b.date ?? "";
      if (da !== db) return da < db ? 1 : -1;
      return 0;
    });
  } catch {
    return [];
  }
}
