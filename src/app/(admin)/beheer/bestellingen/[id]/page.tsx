import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { getDoc } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { setPaymentStatus } from "../actions";

type Booking = {
  id: string;
  reference?: string;
  guestName?: string;
  guestLastName?: string;
  campsiteNumber?: string;
};
type OrderLine = { name?: string; quantity?: number; priceAtPurchase?: number };
type Order = {
  id: string;
  type: "shop" | "bread";
  guestType: "camper" | "passant";
  booking?: Booking | string | null;
  shopItems?: OrderLine[];
  breadItems?: OrderLine[];
  deliveryDate?: string | null;
  total?: number;
  paymentMethod?: string;
  paymentStatus: string;
  guestEmail?: string;
  guestNote?: string;
  createdAt?: string;
};

const eur = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });
const dateFmt = new Intl.DateTimeFormat("nl-NL", { dateStyle: "medium" });
const dateTimeFmt = new Intl.DateTimeFormat("nl-NL", { dateStyle: "full", timeStyle: "short" });

function fmtDate(d?: string | null, fmt = dateFmt) {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return fmt.format(date);
}

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.7rem",
        borderRadius: "999px",
        fontSize: "0.85rem",
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

const PAYMENT_METHOD_LABEL: Record<string, string> = {
  mollie: "Direct via Mollie",
  tab: "Op rekening (campinggast)",
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", padding: "0.4rem 0" }}>
      <span style={{ color: "var(--a-grijs)" }}>{label}</span>
      <span style={{ textAlign: "right", fontWeight: 500 }}>{children}</span>
    </div>
  );
}

export default async function BestellingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const order = await getDoc<Order>("orders", id, 1);
  if (!order) notFound();

  const lines = (order.type === "bread" ? order.breadItems : order.shopItems) ?? [];
  const booking = typeof order.booking === "object" && order.booking ? order.booking : null;
  const payment = PAYMENT_PILL[order.paymentStatus] ?? {
    label: order.paymentStatus,
    color: "var(--a-grijs)",
  };

  const markPaid = setPaymentStatus.bind(null, id, "paid");
  const markTabPaid = setPaymentStatus.bind(null, id, "paid");
  const markTab = setPaymentStatus.bind(null, id, "tab");
  const markCancelled = setPaymentStatus.bind(null, id, "cancelled");

  return (
    <>
      <PageHeader
        title={`Bestelling #${String(order.id).slice(-6)}`}
        description={fmtDate(order.createdAt, dateTimeFmt)}
        actions={
          <AdminButton href="/beheer/bestellingen" variant="ghost">
            ← Terug
          </AdminButton>
        }
      />

      <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)" }}>
        <AdminCard>
          <h2 style={{ marginTop: 0, fontStyle: "italic", fontFamily: "var(--font-fraunces, serif)" }}>
            {order.type === "bread" ? "Broodjes" : "Producten"}
          </h2>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {lines.length === 0 ? (
              <p style={{ color: "var(--a-grijs)" }}>Geen items op deze bestelling.</p>
            ) : (
              lines.map((line, i) => {
                const qty = line.quantity ?? 0;
                const unit = line.priceAtPurchase ?? 0;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "1rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid var(--a-rand)",
                    }}
                  >
                    <span>
                      {line.name ?? "Onbekend item"}{" "}
                      <span style={{ color: "var(--a-grijs)" }}>
                        × {qty} ({eur.format(unit)})
                      </span>
                    </span>
                    <span style={{ fontWeight: 600 }}>{eur.format(qty * unit)}</span>
                  </div>
                );
              })
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
                paddingTop: "0.5rem",
                fontSize: "1.1rem",
                fontWeight: 700,
              }}
            >
              <span>Totaal</span>
              <span>{eur.format(order.total ?? 0)}</span>
            </div>
          </div>
        </AdminCard>

        <div style={{ display: "grid", gap: "1.25rem", alignContent: "start" }}>
          <AdminCard>
            <h3 style={{ marginTop: 0 }}>Gast</h3>
            <Row label="Type">{order.guestType === "camper" ? "Campinggast" : "Passant"}</Row>
            {booking && (
              <>
                <Row label="Naam">
                  {[booking.guestName, booking.guestLastName].filter(Boolean).join(" ") || "—"}
                </Row>
                <Row label="Plek">{booking.campsiteNumber ?? "—"}</Row>
                <Row label="Boeking">{booking.reference ?? "—"}</Row>
              </>
            )}
            {order.guestEmail && <Row label="E-mail">{order.guestEmail}</Row>}
            {order.type === "bread" && <Row label="Bezorgdatum">{fmtDate(order.deliveryDate)}</Row>}
            {order.guestNote && <Row label="Opmerking">{order.guestNote}</Row>}
          </AdminCard>

          <AdminCard>
            <h3 style={{ marginTop: 0 }}>Betaling</h3>
            <Row label="Betaalwijze">
              {PAYMENT_METHOD_LABEL[order.paymentMethod ?? ""] ?? order.paymentMethod ?? "—"}
            </Row>
            <Row label="Status">
              <Pill color={payment.color}>{payment.label}</Pill>
            </Row>

            <div style={{ display: "grid", gap: "0.6rem", marginTop: "1rem" }}>
              {order.paymentStatus !== "paid" && order.paymentStatus !== "tab" && (
                <form action={markPaid} style={{ display: "grid" }}>
                  <AdminButton type="submit" variant="primary">
                    Markeer als betaald
                  </AdminButton>
                </form>
              )}
              {order.paymentStatus === "tab" && (
                <form action={markTabPaid} style={{ display: "grid" }}>
                  <AdminButton type="submit" variant="primary">
                    Markeer op rekening voldaan
                  </AdminButton>
                </form>
              )}
              {order.paymentStatus !== "tab" && order.paymentStatus !== "paid" && (
                <form action={markTab} style={{ display: "grid" }}>
                  <AdminButton type="submit" variant="outline">
                    Op rekening zetten
                  </AdminButton>
                </form>
              )}
              {order.paymentStatus !== "cancelled" && (
                <form action={markCancelled} style={{ display: "grid" }}>
                  <AdminButton type="submit" variant="danger">
                    Annuleren
                  </AdminButton>
                </form>
              )}
            </div>
          </AdminCard>
        </div>
      </div>
    </>
  );
}
