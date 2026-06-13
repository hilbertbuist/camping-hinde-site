import { redirect } from "next/navigation";
import { ShopBrowser } from "@/components/winkel/ShopBrowser";
import { payload } from "@/lib/payload";

export const dynamic = "force-dynamic";

export default async function PassantPage() {
  let categories: { id: string; name: string; slug: string; icon?: string; color?: string }[] = [];
  let products: {
    id: string;
    name: string;
    slug: string;
    price: number;
    unit: string;
    description?: string;
    categoryId: string;
    imageUrl?: string;
  }[] = [];

  try {
    const p = await payload();
    const cats = await p.find({
      collection: "product-categories",
      where: { active: { equals: true } },
      limit: 100,
      sort: "order",
    });
    categories = cats.docs.map((c) => ({
      id: String(c.id),
      name: c.name,
      slug: c.slug,
      icon: c.icon ?? undefined,
      color: c.color ?? undefined,
    }));

    const prods = await p.find({
      collection: "products",
      where: { active: { equals: true } },
      limit: 500,
      sort: "name",
    });
    products = prods.docs.map((pr) => ({
      id: String(pr.id),
      name: pr.name,
      slug: pr.slug,
      price: pr.price,
      unit: pr.unit ?? "stuk",
      description: pr.description ?? undefined,
      categoryId: typeof pr.category === "object" ? String(pr.category.id) : String(pr.category),
      imageUrl:
        typeof pr.image === "object" && pr.image && "url" in pr.image
          ? (pr.image as { url: string }).url
          : undefined,
    }));
  } catch {
    // Database not yet seeded — that's OK, we render empty state
  }

  if (categories.length === 0 && products.length === 0) {
    return <EmptyShopState />;
  }

  return (
    <ShopBrowser
      mode="passant"
      categories={categories}
      products={products}
    />
  );
}

function EmptyShopState() {
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <div className="max-w-md text-center">
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "1.6rem",
            color: "var(--paars)",
          }}
        >
          Winkel wordt klaargezet
        </h1>
        <p className="mt-3 text-tekst-grijs">
          De producten worden ingeladen. Probeer het later opnieuw of vraag iemand op het erf om assistentie.
        </p>
        <a href="/winkel" className="mt-6 inline-block text-sm text-groen-donker underline">
          ← Terug
        </a>
      </div>
    </div>
  );
}

// Suppress redirect-import warning when not used
void redirect;
