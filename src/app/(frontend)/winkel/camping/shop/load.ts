"use server";

import { payload } from "@/lib/payload";

export async function fetchShopData() {
  try {
    const p = await payload();
    const cats = await p.find({
      collection: "product-categories",
      where: { active: { equals: true } },
      limit: 100,
      sort: "order",
    });
    const prods = await p.find({
      collection: "products",
      where: { active: { equals: true } },
      limit: 500,
      sort: "name",
    });

    return {
      categories: cats.docs.map((c) => ({
        id: String(c.id),
        name: c.name,
        slug: c.slug,
        icon: c.icon ?? undefined,
        color: c.color ?? undefined,
      })),
      products: prods.docs.map((pr) => ({
        id: String(pr.id),
        name: pr.name,
        slug: pr.slug,
        price: pr.price,
        unit: pr.unit ?? "stuk",
        description: pr.description ?? undefined,
        categoryId:
          typeof pr.category === "object" ? String(pr.category.id) : String(pr.category),
        imageUrl:
          typeof pr.image === "object" && pr.image && "url" in pr.image
            ? (pr.image as { url: string }).url
            : undefined,
      })),
    };
  } catch {
    return { categories: [], products: [] };
  }
}
