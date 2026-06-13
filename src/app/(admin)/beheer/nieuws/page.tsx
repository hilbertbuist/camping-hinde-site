import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { DataTable } from "@/components/admin/ui/DataTable";

export const dynamic = "force-dynamic";

type NewsItem = {
  id: string;
  title: string;
  date?: string;
  published?: boolean;
  pinned?: boolean;
};

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

const dateFmt = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return dateFmt.format(d);
}

export default async function NieuwsPage() {
  await requireAdmin();
  const rows = await listDocs<NewsItem>("news", { sort: "-date", depth: 0 });

  const columns = [
    { key: "date", label: "Datum", render: (r: NewsItem) => formatDate(r.date) },
    {
      key: "title",
      label: "Titel",
      render: (r: NewsItem) => <strong>{r.title}</strong>,
    },
    {
      key: "published",
      label: "Gepubliceerd",
      render: (r: NewsItem) =>
        r.published ? (
          <Pill color="var(--a-groen)">Gepubliceerd</Pill>
        ) : (
          <Pill color="var(--a-grijs)">Concept</Pill>
        ),
    },
    {
      key: "pinned",
      label: "Vastgezet",
      render: (r: NewsItem) => (r.pinned ? <Pill color="var(--a-oranje)">Vastgezet</Pill> : "—"),
    },
    {
      key: "actions",
      label: "",
      render: (r: NewsItem) => (
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <AdminButton href={`/beheer/nieuws/${r.id}`} variant="outline" size="sm">
            Bewerken
          </AdminButton>
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Nieuws"
        description="Beheer nieuwsberichten voor gasten"
        actions={
          <AdminButton href="/beheer/nieuws/nieuw" variant="primary">
            + Nieuw bericht
          </AdminButton>
        }
      />
      <DataTable
        columns={columns}
        rows={rows}
        emptyText="Nog geen nieuwsberichten. Voeg het eerste bericht toe!"
      />
    </>
  );
}
