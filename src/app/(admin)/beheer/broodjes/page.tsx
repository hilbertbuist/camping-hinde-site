import Image from "next/image";
import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { SortableTable, type SortableRow } from "@/components/admin/SortableTable";

type Media = { id: string; url?: string; alt?: string };
type BreadItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  active?: boolean;
  image?: Media | string | null;
  order?: number;
};

const CATEGORY_LABELS: Record<string, string> = {
  "broodje-zacht": "Broodje (zacht)",
  "broodje-hard": "Broodje (hard)",
  croissant: "Croissant",
  eieren: "Eitjes",
  anders: "Anders",
};

const eur = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.15rem 0.6rem",
        borderRadius: "999px",
        fontSize: "0.8rem",
        fontWeight: 600,
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
      }}
    >
      {children}
    </span>
  );
}

export default async function BroodjesPage() {
  await requireAdmin();
  const items = await listDocs<BreadItem>("bread-items", { sort: "order", depth: 1 });

  const rows: SortableRow[] = items.map((row) => {
    const media = typeof row.image === "object" && row.image ? row.image : null;
    const url = media?.url;
    return {
      id: String(row.id),
      cells: [
        url ? (
          <Image
            src={url}
            alt={media?.alt ?? row.name}
            width={48}
            height={48}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: "var(--a-rand)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            🥪
          </div>
        ),
        <strong>{row.name}</strong>,
        <span>{CATEGORY_LABELS[row.category] ?? row.category}</span>,
        <span>{eur.format(row.price ?? 0)}</span>,
        row.active ? (
          <Pill color="var(--a-groen)">Beschikbaar</Pill>
        ) : (
          <Pill color="var(--a-grijs)">Verborgen</Pill>
        ),
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <AdminButton href={`/beheer/broodjes/${row.id}`} variant="outline" size="sm">
            Bewerken
          </AdminButton>
        </span>,
      ],
    };
  });

  return (
    <>
      <PageHeader
        title="Broodjes"
        description="Beheer het broodjes-assortiment"
        actions={
          <AdminButton href="/beheer/broodjes/nieuw" variant="primary">
            + Nieuw broodje
          </AdminButton>
        }
      />
      <SortableTable
        collection="bread-items"
        template="56px 1.6fr 1fr 110px 130px 110px"
        headers={["", "Naam", "Type", "Prijs", "Status", ""]}
        rows={rows}
        emptyText="Nog geen broodjes in het menu. Voeg het eerste broodje toe!"
      />
    </>
  );
}
