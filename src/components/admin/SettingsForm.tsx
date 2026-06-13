"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export type SettingsFormValues = {
  opRekeningEnabled: boolean;
  molliePaymentMode: "test" | "live";
  shopOpen: boolean;
};

type SettingsFormProps = {
  initial: SettingsFormValues;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
};

export function SettingsForm({ initial, action }: SettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const res = await action(formData);
        if (!res?.ok) {
          setError(res?.error ?? "Opslaan mislukt. Probeer het opnieuw.");
          return;
        }
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw."
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard>
        <div style={{ display: "grid", gap: "1.25rem" }}>
          <label
            style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              name="opRekeningEnabled"
              defaultChecked={initial.opRekeningEnabled}
              style={{ marginTop: "0.2rem" }}
            />
            <span>
              <strong>Op rekening toestaan</strong>
              <br />
              <span style={{ color: "var(--a-grijs)", fontSize: "0.9rem" }}>
                Laat gasten broodjes/winkel op de rekening (tab) zetten i.p.v. direct betalen.
              </span>
            </span>
          </label>

          <FormField
            label="Mollie modus"
            htmlFor="molliePaymentMode"
            hint="Test = proefbetalingen. Live = echte betalingen."
          >
            <select
              id="molliePaymentMode"
              name="molliePaymentMode"
              className={inputClass}
              defaultValue={initial.molliePaymentMode}
            >
              <option value="test">Test</option>
              <option value="live">Live</option>
            </select>
          </FormField>

          <label
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              name="shopOpen"
              defaultChecked={initial.shopOpen}
            />
            <span>Winkel open</span>
          </label>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}
          {saved && !error && (
            <p style={{ color: "var(--a-groen-donker)", margin: 0 }} role="status">
              Instellingen opgeslagen.
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={isPending}>
              {isPending ? "Opslaan…" : "Instellingen opslaan"}
            </AdminButton>
          </div>
        </div>
      </AdminCard>
    </form>
  );
}

export default SettingsForm;
