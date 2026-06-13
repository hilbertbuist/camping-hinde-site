import type { ReactNode } from "react";
import { Package, ShoppingBag, Croissant, Tent } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { countDocs } from "@/lib/admin/data";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { AdminButton } from "@/components/admin/ui/AdminButton";

export const dynamic = "force-dynamic";

type Stat = {
  label: string;
  value: number;
  icon: ReactNode;
  bg: string;
  color: string;
};

export default async function DashboardPage() {
  const user = await requireAdmin();

  const [products, orders, openBread, bookings] = await Promise.all([
    countDocs("products"),
    countDocs("orders"),
    countDocs("orders", {
      and: [
        { type: { equals: "bread" } },
        { paymentStatus: { in: ["open", "tab"] } },
      ],
    }),
    countDocs("bookings"),
  ]);

  const stats: Stat[] = [
    {
      label: "Producten in de winkel",
      value: products,
      icon: <Package strokeWidth={2} />,
      bg: "rgba(125,179,50,.12)",
      color: "var(--a-groen-donker)",
    },
    {
      label: "Bestellingen totaal",
      value: orders,
      icon: <ShoppingBag strokeWidth={2} />,
      bg: "rgba(90,31,107,.10)",
      color: "var(--a-paars)",
    },
    {
      label: "Openstaande broodjes",
      value: openBread,
      icon: <Croissant strokeWidth={2} />,
      bg: "rgba(244,165,43,.16)",
      color: "#b9791a",
    },
    {
      label: "Boekingen",
      value: bookings,
      icon: <Tent strokeWidth={2} />,
      bg: "rgba(183,57,46,.10)",
      color: "var(--a-danger)",
    },
  ];

  const greetingName = user.name ?? user.email ?? "beheerder";

  return (
    <>
      <PageHeader
        title="Dashboard"
        description={`Fijn dat je er bent, ${greetingName}. Hier zie je in één oogopslag wat er speelt op de camping.`}
      />

      <div className="a-stat-grid">
        {stats.map((stat) => (
          <AdminCard key={stat.label}>
            <div className="a-stat">
              <span
                className="a-stat__icon"
                style={{ background: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </span>
              <span>
                <span className="a-stat__num">{stat.value}</span>
                <span className="a-stat__label">{stat.label}</span>
              </span>
            </div>
          </AdminCard>
        ))}
      </div>

      <section>
        <h2 className="a-section-title">Snel naar</h2>
        <div className="a-quick-links">
          <AdminButton href="/beheer/producten" variant="outline">
            Producten
          </AdminButton>
          <AdminButton href="/beheer/broodjes" variant="outline">
            Broodjes
          </AdminButton>
          <AdminButton href="/beheer/bestellingen" variant="outline">
            Bestellingen
          </AdminButton>
          <AdminButton href="/beheer/boekingen" variant="outline">
            Boekingen
          </AdminButton>
        </div>
      </section>
    </>
  );
}
