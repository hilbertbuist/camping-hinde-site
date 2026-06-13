import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SortableTable, type SortableRow } from "@/components/admin/SortableTable";

export const dynamic = "force-dynamic";

const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

type Media = { url?: string; alt?: string; filename?: string; sizes?: { thumbnail?: { url?: string } } };
type Category = { id: string; name?: string };
type Product = {
  id: string;
  name?: string;
  category?: Category | string | null;
  image?: Media | string | null;
  price?: number;
  stock?: number;
  trackStock?: boolean;
  active?: boolean;
  order?: number;
};

function imageUrl(image: Product["image"]): string | null {
  if (!image || typeof image === "string") return null;
  return image.sizes?.thumbnail?.url ?? image.url ?? null;
}

function categoryName(category: Product["category"]): string {
  if (!category || typeof category === "string") return "—";
  return category.name ?? "—";
}

export default async function ProductenPage() {
  await requireAdmin();
  const products = await listDocs<Product>("products", { sort: "order", depth: 1 });

  const rows: SortableRow[] = products.map((row) => {
    const url = imageUrl(row.image);
    return {
      id: String(row.id),
      cells: [
        url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={row.name ?? ""}
            style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 6, border: "1px solid var(--a-rand)" }}
          />
        ) : (
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 40,
              height: 40,
              borderRadius: 6,
              background: "var(--a-creme)",
              border: "1px solid var(--a-rand)",
            }}
          />
        ),
        <span style={{ fontWeight: 600 }}>{row.name ?? "—"}</span>,
        <span>{categoryName(row.category)}</span>,
        <span>{euro.format(row.price ?? 0)}</span>,
        <span>{row.trackStock ? String(row.stock ?? 0) : "—"}</span>,
        <span
          style={{
            display: "inline-block",
            padding: "0.15rem 0.6rem",
            borderRadius: 999,
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#fff",
            background: row.active ? "var(--a-groen)" : "var(--a-grijs)",
          }}
        >
          {row.active ? "Actief" : "Verborgen"}
        </span>,
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <AdminButton variant="outline" size="sm" href={`/beheer/producten/${row.id}`}>
            Bewerken
          </AdminButton>
        </span>,
      ],
    };
  });

  return (
    <div>
      <PageHeader
        title="Producten"
        description="Beheer je winkelproducten"
        actions={
          <AdminButton variant="primary" href="/beheer/producten/nieuw">
            + Nieuw product
          </AdminButton>
        }
      />
      <SortableTable
        collection="products"
        template="48px 1.6fr 1fr 110px 90px 100px 110px"
        headers={["", "Naam", "Categorie", "Prijs", "Voorraad", "Status", ""]}
        rows={rows}
        emptyText="Nog geen producten. Voeg je eerste product toe."
      />
    </div>
  );
}
