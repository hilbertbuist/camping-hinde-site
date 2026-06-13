"use server";

import { payload } from "@/lib/payload";

export type ActivityCard = {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  image?: { url: string; alt?: string } | null;
};

export async function fetchActivities(): Promise<ActivityCard[]> {
  try {
    const p = await payload();
    const items = await p.find({
      collection: "activities" as never,
      where: { active: { equals: true } },
      limit: 200,
      sort: "date",
      depth: 1,
    });
    const mapped: ActivityCard[] = items.docs.map((it: any) => {
      const media = it.image && typeof it.image === "object" ? it.image : null;
      return {
        id: String(it.id),
        title: it.title,
        description: it.description ?? undefined,
        date: it.date,
        startTime: it.startTime ?? undefined,
        endTime: it.endTime ?? undefined,
        location: it.location ?? undefined,
        image: media?.url ? { url: media.url, alt: media.alt ?? undefined } : null,
      };
    });
    // Sort by date asc, then order asc within a day (upcoming first).
    return mapped.sort((a, b) => {
      const da = a.date ?? "";
      const db = b.date ?? "";
      if (da !== db) return da < db ? -1 : 1;
      return 0;
    });
  } catch {
    return [];
  }
}
