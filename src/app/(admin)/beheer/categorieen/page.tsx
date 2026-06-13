import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SortableTable, type SortableRow } from "@/components/admin/SortableTable";

export const dynamic = "force-dynamic";

const COLOR_SWATCH: Record<string, string> = {
  groen: "var(--a-groen)",
  paars: "var(--a-paars)",
  oranje: "var(--a-oranje)",
  blauw: "#3B82C4",
  creme: "var(--a-creme)",
};

const COLOR_LABEL: Record<string, string> = {
  groen: "Groen",
  paars: "Paars",
  oranje: "Oranje",
  blauw: "Blauw",
  creme: "Crème",
};

type Media = { url?: string; alt?: string; sizes?: { thumbnail?: { url?: string } } };
type Category = {
  id: string;
  name?: string;
  icon?: string;
  color?: string;
  image?: Media | string | null;
  order?: number;
  active?: boolean;
};

function imageUrl(image: Category["image"]): string | null {
  if (!image || typeof image === "string") return null;
  return image.sizes?.thumbnail?.url ?? image.url ?? null;
}

export default async function CategorieenPage() {
  await requireAdmin();
  const categories = await listDocs<Category>("product-categories", { sort: "order", depth: 1 });

  const rows: SortableRow[] = categories.map((row) => {
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
        <span>{row.icon ?? "—"}</span>,
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 16,
              height: 16,
              borderRadius: 4,
              background: COLOR_SWATCH[row.color ?? ""] ?? "var(--a-rand)",
              border: "1px solid var(--a-rand)",
            }}
          />
          {COLOR_LABEL[row.color ?? ""] ?? (row.color ?? "—")}
        </span>,
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
          <AdminButton variant="outline" size="sm" href={`/beheer/categorieen/${row.id}`}>
            Bewerken
          </AdminButton>
        </span>,
      ],
    };
  });

  return (
    <div>
      <PageHeader
        title="Categorieën"
        description="Beheer de categorieën van je winkel"
        actions={
          <AdminButton variant="primary" href="/beheer/categorieen/nieuw">
            + Nieuwe categorie
          </AdminButton>
        }
      />
      <SortableTable
        collection="product-categories"
        template="48px 1.6fr 1fr 1.2fr 110px 110px"
        headers={["", "Naam", "Icoon", "Kleur", "Status", ""]}
        rows={rows}
        emptyText="Nog geen categorieën. Voeg je eerste categorie toe."
      />
    </div>
  );
}
