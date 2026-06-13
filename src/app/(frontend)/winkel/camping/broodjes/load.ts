"use server";

import { payload } from "@/lib/payload";

export async function fetchBreadItems() {
  try {
    const p = await payload();
    const items = await p.find({
      collection: "bread-items",
      where: { active: { equals: true } },
      limit: 100,
      sort: "order",
    });
    return items.docs.map((it) => ({
      id: String(it.id),
      name: it.name,
      description: it.description ?? undefined,
      price: it.price,
      category: it.category,
    }));
  } catch {
    return [];
  }
}
