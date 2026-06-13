import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { DataTable } from "@/components/admin/ui/DataTable";

type Booking = {
  id: string;
  guestName?: string;
  guestLastName?: string;
  campsiteNumber?: string;
  arrival?: string;
  departure?: string;
  guests?: number;
  status: string;
};

const dateFmt = new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium" });

function fmtDate(d?: string | null) {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFmt.format(date);
}

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

const STATUS_PILL: Record<string, { label: string; color: string }> = {
  active: { label: "Actief", color: "var(--a-groen)" },
  upcoming: { label: "Aankomend", color: "#2563eb" },
  closed: { label: "Afgereisd", color: "var(--a-grijs)" },
  cancelled: { label: "Geannuleerd", color: "#b3261e" },
};

export default async function BoekingenPage() {
  await requireAdmin();
  const bookings = await listDocs<Booking>("bookings", { sort: "-arrival", depth: 0 });

  const columns = [
    {
      key: "naam",
      label: "Naam",
      render: (row: Booking) => (
        <strong>{[row.guestName, row.guestLastName].filter(Boolean).join(" ") || "—"}</strong>
      ),
    },
    {
      key: "campsiteNumber",
      label: "Plek",
      render: (row: Booking) => row.campsiteNumber || "—",
    },
    { key: "arrival", label: "Aankomst", render: (row: Booking) => fmtDate(row.arrival) },
    { key: "departure", label: "Vertrek", render: (row: Booking) => fmtDate(row.departure) },
    { key: "guests", label: "Gasten", render: (row: Booking) => row.guests ?? "—" },
    {
      key: "status",
      label: "Status",
      render: (row: Booking) => {
        const p = STATUS_PILL[row.status] ?? { label: row.status, color: "var(--a-grijs)" };
        return <Pill color={p.color}>{p.label}</Pill>;
      },
    },
    {
      key: "actions",
      label: "",
      className: "a-col-actions",
      render: (row: Booking) => (
        <AdminButton href={`/beheer/boekingen/${row.id}`} variant="outline" size="sm">
          Bewerken
        </AdminButton>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Boekingen"
        description="Gasten & campingplaatsen (handmatig deze zomer)"
        actions={
          <AdminButton href="/beheer/boekingen/nieuw" variant="primary">
            + Nieuwe boeking
          </AdminButton>
        }
      />
      <DataTable
        columns={columns}
        rows={bookings}
        emptyText="Nog geen boekingen. Voeg de eerste gast handmatig toe!"
      />
    </>
  );
}
