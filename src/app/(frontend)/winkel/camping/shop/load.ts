"use server";

import { payload } from "@/lib/payload";

type MediaLike =
  | {
      url?: string | null;
      sizes?: {
        card?: { url?: string | null };
        thumbnail?: { url?: string | null };
      } | null;
    }
  | string
  | number
  | null
  | undefined;

/** Haalt een bruikbare afbeelding-URL uit een (gepopuleerde) media-relatie. */
function imageUrlOf(image: MediaLike): string | undefined {
  if (!image || typeof image !== "object") return undefined;
  return image.url ?? image.sizes?.card?.url ?? image.sizes?.thumbnail?.url ?? undefined;
}

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
      depth: 1,
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
        imageUrl: imageUrlOf(pr.image),
      })),
    };
  } catch {
    return { categories: [], products: [] };
  }
}
