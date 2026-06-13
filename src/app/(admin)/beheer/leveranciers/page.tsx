import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { DataTable } from "@/components/admin/ui/DataTable";
import { SendOrdersButton } from "@/components/admin/SendOrdersButton";
import { sendOrdersNow } from "./actions";

export const dynamic = "force-dynamic";

type Supplier = {
  id: string;
  name: string;
  email: string;
  mailTime?: string;
  orderDeadline?: string;
  active?: boolean;
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

export default async function LeveranciersPage() {
  await requireAdmin();
  const suppliers = await listDocs<Supplier>("suppliers", { sort: "name", limit: 200 });

  async function sendNow() {
    "use server";
    return sendOrdersNow();
  }

  const columns = [
    {
      key: "name",
      label: "Naam",
      render: (row: Supplier) => <strong>{row.name}</strong>,
    },
    { key: "email", label: "E-mail" },
    {
      key: "mailTime",
      label: "Verstuurtijd",
      render: (row: Supplier) => <span>{row.mailTime ?? "—"}</span>,
    },
    {
      key: "orderDeadline",
      label: "Deadline",
      render: (row: Supplier) => <span>{row.orderDeadline ?? "—"}</span>,
    },
    {
      key: "active",
      label: "Status",
      render: (row: Supplier) =>
        row.active ? (
          <Pill color="var(--a-groen)">Actief</Pill>
        ) : (
          <Pill color="var(--a-grijs)">Inactief</Pill>
        ),
    },
    {
      key: "actions",
      label: "",
      className: "a-table__actions",
      render: (row: Supplier) => (
        <span style={{ display: "flex", justifyContent: "flex-end" }}>
          <AdminButton href={`/beheer/leveranciers/${row.id}`} variant="outline" size="sm">
            Bewerken
          </AdminButton>
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Leveranciers"
        description="Beheer leveranciers en verstuur de dagelijkse broodjes-bestelmail"
        actions={
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <SendOrdersButton action={sendNow} />
            <AdminButton href="/beheer/leveranciers/nieuw" variant="primary">
              + Nieuwe leverancier
            </AdminButton>
          </div>
        }
      />
      <DataTable
        columns={columns}
        rows={suppliers}
        emptyText="Nog geen leveranciers. Voeg de eerste leverancier toe!"
      />
    </>
  );
}
