import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { DataTable } from "@/components/admin/ui/DataTable";

export const dynamic = "force-dynamic";

type Activity = {
  id: string;
  title: string;
  date?: string;
  startTime?: string;
  location?: string;
  active?: boolean;
  order?: number;
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
  weekday: "short",
  day: "numeric",
  month: "short",
});

function formatDate(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return dateFmt.format(d);
}

export default async function ActiviteitenPage() {
  await requireAdmin();
  const items = await listDocs<Activity>("activities", { sort: "date", depth: 0 });

  const rows = [...items].sort((a, b) => {
    const da = a.date ?? "";
    const db = b.date ?? "";
    if (da !== db) return da < db ? -1 : 1;
    return (a.order ?? 100) - (b.order ?? 100);
  });

  const columns = [
    { key: "date", label: "Datum", render: (r: Activity) => formatDate(r.date) },
    { key: "startTime", label: "Begintijd", render: (r: Activity) => r.startTime || "—" },
    {
      key: "title",
      label: "Titel",
      render: (r: Activity) => <strong>{r.title}</strong>,
    },
    { key: "location", label: "Locatie", render: (r: Activity) => r.location || "—" },
    {
      key: "active",
      label: "Status",
      render: (r: Activity) =>
        r.active ? (
          <Pill color="var(--a-groen)">Actief</Pill>
        ) : (
          <Pill color="var(--a-grijs)">Verborgen</Pill>
        ),
    },
    {
      key: "actions",
      label: "",
      render: (r: Activity) => (
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <AdminButton href={`/beheer/activiteiten/${r.id}`} variant="outline" size="sm">
            Bewerken
          </AdminButton>
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Activiteiten"
        description="Beheer het animatieprogramma"
        actions={
          <AdminButton href="/beheer/activiteiten/nieuw" variant="primary">
            + Nieuwe activiteit
          </AdminButton>
        }
      />
      <DataTable
        columns={columns}
        rows={rows}
        emptyText="Nog geen activiteiten. Voeg de eerste activiteit toe!"
      />
    </>
  );
}
