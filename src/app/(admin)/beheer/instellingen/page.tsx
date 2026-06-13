import { requireAdmin } from "@/lib/admin/auth";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";

export const dynamic = "force-dynamic";

type Item = { title: string; desc: string; status: "binnenkort" | "later" };

const PLANNED: Item[] = [
  {
    title: "Leveranciers & broodjes-mail",
    desc: "Leveranciers beheren, mailtijden en bestel-deadline (20:00) instellen, automatische besteloverzichten versturen.",
    status: "binnenkort",
  },
  {
    title: "Openingstijden & bezorging",
    desc: "Bezorgmoment voor broodjes (8:30) en winkeltijden instellen.",
    status: "later",
  },
  {
    title: "Betaalmethodes",
    desc: "Mollie-instellingen en 'op rekening' beheren.",
    status: "later",
  },
  {
    title: "Gebruikers",
    desc: "Beheerders en personeel toevoegen of verwijderen.",
    status: "later",
  },
];

export default async function InstellingenPage() {
  await requireAdmin();

  return (
    <div>
      <PageHeader title="Instellingen" description="Beheer de instellingen van camping & winkel" />

      <div style={{ display: "grid", gap: "1rem" }}>
        {PLANNED.map((item) => (
          <AdminCard key={item.title}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--a-font-head)",
                    fontStyle: "italic",
                    color: "var(--a-paars)",
                    fontSize: "1.15rem",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ margin: "0.35rem 0 0", color: "var(--a-grijs)", fontSize: "0.92rem" }}>
                  {item.desc}
                </p>
              </div>
              <span
                style={{
                  whiteSpace: "nowrap",
                  padding: "0.2rem 0.7rem",
                  borderRadius: 999,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: item.status === "binnenkort" ? "var(--a-groen-donker)" : "var(--a-grijs)",
                  background:
                    item.status === "binnenkort"
                      ? "color-mix(in srgb, var(--a-groen) 16%, transparent)"
                      : "var(--a-creme)",
                  border: "1px solid var(--a-rand)",
                }}
              >
                {item.status === "binnenkort" ? "Binnenkort" : "Later"}
              </span>
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
