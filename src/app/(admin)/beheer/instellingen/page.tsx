import { requireAdmin } from "@/lib/admin/auth";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/settings";
import { saveSettings } from "./actions";

export const dynamic = "force-dynamic";

function StatusRow({ label, found }: { label: string; found: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.55rem 0",
        borderBottom: "1px solid var(--a-rand)",
      }}
    >
      <span style={{ color: "var(--a-grijs)" }}>{label}</span>
      <span
        style={{
          whiteSpace: "nowrap",
          padding: "0.2rem 0.7rem",
          borderRadius: 999,
          fontSize: "0.8rem",
          fontWeight: 600,
          color: found ? "var(--a-groen-donker)" : "#b3261e",
          background: found
            ? "color-mix(in srgb, var(--a-groen) 16%, transparent)"
            : "color-mix(in srgb, #b3261e 10%, transparent)",
          border: "1px solid var(--a-rand)",
        }}
      >
        {found ? "Gevonden" : "Ontbreekt"}
      </span>
    </div>
  );
}

export default async function InstellingenPage() {
  await requireAdmin();

  const settings = await getSettings();

  // Mollie secret keys staan in Vercel environment variables, NIET in de database.
  // We lezen ze hier server-side en geven alleen booleans door aan de client.
  const testKeyFound = Boolean(process.env.MOLLIE_API_KEY_TEST);
  const liveKeyFound = Boolean(process.env.MOLLIE_API_KEY_LIVE);

  return (
    <div>
      <PageHeader title="Instellingen" description="Beheer de instellingen van camping & winkel" />

      <div style={{ display: "grid", gap: "1.5rem", maxWidth: 640 }}>
        <SettingsForm initial={settings} action={saveSettings} />

        <AdminCard>
          <h3
            style={{
              margin: "0 0 0.75rem",
              fontFamily: "var(--a-font-head)",
              fontStyle: "italic",
              color: "var(--a-paars)",
              fontSize: "1.15rem",
            }}
          >
            Mollie-koppeling
          </h3>

          <StatusRow label="Mollie test-sleutel" found={testKeyFound} />
          <StatusRow label="Mollie live-sleutel" found={liveKeyFound} />

          <p style={{ margin: "0.9rem 0 0", color: "var(--a-grijs)", fontSize: "0.88rem" }}>
            De Mollie-sleutels worden ingesteld in Vercel → Project → Settings → Environment
            Variables (<code>MOLLIE_API_KEY_TEST</code> en <code>MOLLIE_API_KEY_LIVE</code>). Ze
            worden om veiligheidsredenen nooit in de database of het beheer getoond.
          </p>
        </AdminCard>
      </div>
    </div>
  );
}
