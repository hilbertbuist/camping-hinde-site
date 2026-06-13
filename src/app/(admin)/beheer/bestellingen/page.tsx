import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { listDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { DataTable } from "@/components/admin/ui/DataTable";

type Booking = { id: string; campsiteNumber?: string; guestName?: string };
type OrderLine = { quantity?: number };
type Order = {
  id: string;
  type: "shop" | "bread";
  guestType: "camper" | "passant";
  booking?: Booking | string | null;
  shopItems?: OrderLine[];
  breadItems?: OrderLine[];
  deliveryDate?: string | null;
  total?: number;
  paymentStatus: string;
  createdAt?: string;
};

const eur = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
const dateFmt = new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium" });
const dateTimeFmt = new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short" });

function fmtDate(d?: string | null) {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFmt.format(date);
}

function fmtDateTime(d?: string | null) {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return dateTimeFmt.format(date);
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

const PAYMENT_PILL: Record<string, { label: string; color: string }> = {
  paid: { label: "Betaald", color: "var(--a-groen)" },
  open: { label: "Open", color: "var(--a-oranje)" },
  tab: { label: "Op rekening", color: "var(--a-paars)" },
  failed: { label: "Mislukt", color: "#b3261e" },
  cancelled: { label: "Geannuleerd", color: "var(--a-grijs)" },
};

const TYPE_TABS = [
  { label: "Alle", value: "" },
  { label: "Winkel", value: "shop" },
  { label: "Broodjes", value: "bread" },
];

const STATUS_TABS = [
  { label: "Alle", value: "" },
  { label: "Open", value: "open" },
  { label: "Betaald", value: "paid" },
  { label: "Op rekening", value: "tab" },
  { label: "Mislukt", value: "failed" },
];

function tabHref(base: { type: string; status: string }, patch: Partial<{ type: string; status: string }>) {
  const next = { ...base, ...patch };
  const params = new URLSearchParams();
  if (next.type) params.set("type", next.type);
  if (next.status) params.set("status", next.status);
  const qs = params.toString();
  return qs ? `/beheer/bestellingen?${qs}` : "/beheer/bestellingen";
}

function FilterRow({
  title,
  tabs,
  active,
  hrefFor,
}: {
  title: string;
  tabs: { label: string; value: string }[];
  active: string;
  hrefFor: (value: string) => string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <span style={{ fontSize: "0.85rem", color: "var(--a-grijs)", minWidth: "4.5rem" }}>{title}</span>
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <Link
            key={tab.value || "all"}
            href={hrefFor(tab.value)}
            style={{
              padding: "0.3rem 0.8rem",
              borderRadius: "999px",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid var(--a-rand)",
              background: isActive ? "var(--a-paars)" : "transparent",
              color: isActive ? "#fff" : "var(--a-paars)",
            }}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

export default async function BestellingenPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const type = sp.type === "shop" || sp.type === "bread" ? sp.type : "";
  const status = STATUS_TABS.some((t) => t.value === sp.status) ? (sp.status as string) : "";

  const where: Record<string, unknown> = {};
  if (type) where.type = { equals: type };
  if (status) where.paymentStatus = { equals: status };

  const orders = await listDocs<Order>("orders", {
    sort: "-createdAt",
    depth: 1,
    where: Object.keys(where).length ? where : undefined,
  });

  const base = { type, status };

  const columns = [
    {
      key: "createdAt",
      label: "Datum / tijd",
      render: (row: Order) => fmtDateTime(row.createdAt),
    },
    {
      key: "type",
      label: "Type",
      render: (row: Order) =>
        row.type === "bread" ? (
          <Pill color="var(--a-oranje)">Broodjes</Pill>
        ) : (
          <Pill color="#2563eb">Winkel</Pill>
        ),
    },
    {
      key: "guest",
      label: "Gast",
      render: (row: Order) => {
        if (row.guestType === "camper") {
          const booking = typeof row.booking === "object" && row.booking ? row.booking : null;
          const plek = booking?.campsiteNumber;
          return plek ? `Gast · plek ${plek}` : "Gast";
        }
        return "Passant";
      },
    },
    {
      key: "items",
      label: "Items",
      render: (row: Order) => {
        const lines = row.type === "bread" ? row.breadItems : row.shopItems;
        const count = (lines ?? []).reduce((sum, l) => sum + (l.quantity ?? 0), 0);
        return `${count} art.`;
      },
    },
    {
      key: "deliveryDate",
      label: "Bezorgdatum",
      render: (row: Order) => (row.type === "bread" ? fmtDate(row.deliveryDate) : "—"),
    },
    {
      key: "total",
      label: "Totaal",
      render: (row: Order) => eur.format(row.total ?? 0),
    },
    {
      key: "paymentStatus",
      label: "Betaalstatus",
      render: (row: Order) => {
        const p = PAYMENT_PILL[row.paymentStatus] ?? { label: row.paymentStatus, color: "var(--a-grijs)" };
        return <Pill color={p.color}>{p.label}</Pill>;
      },
    },
    {
      key: "actions",
      label: "",
      className: "a-col-actions",
      render: (row: Order) => (
        <AdminButton href={`/beheer/bestellingen/${row.id}`} variant="outline" size="sm">
          Details
        </AdminButton>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Bestellingen" description="Winkel- en broodjesbestellingen van gasten" />
      <div style={{ display: "grid", gap: "0.6rem", marginBottom: "1.25rem" }}>
        <FilterRow
          title="Type"
          tabs={TYPE_TABS}
          active={type}
          hrefFor={(v) => tabHref(base, { type: v })}
        />
        <FilterRow
          title="Status"
          tabs={STATUS_TABS}
          active={status}
          hrefFor={(v) => tabHref(base, { status: v })}
        />
      </div>
      <DataTable
        columns={columns}
        rows={orders}
        emptyText="Geen bestellingen gevonden voor deze filters."
      />
    </>
  );
}
