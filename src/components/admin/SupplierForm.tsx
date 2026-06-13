"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export type SupplierFormValues = {
  name?: string;
  email?: string;
  mailTime?: string;
  orderDeadline?: string;
  ccOwner?: boolean;
  active?: boolean;
  notes?: string;
};

type SupplierFormProps = {
  mode: "create" | "edit";
  initial?: SupplierFormValues;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  deleteAction?: () => Promise<{ ok: boolean; error?: string }>;
};

export function SupplierForm({ mode, initial, action, deleteAction }: SupplierFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const res = await action(formData);
        if (!res?.ok) {
          setError(res?.error ?? "Opslaan mislukt. Probeer het opnieuw.");
          return;
        }
        router.push("/beheer/leveranciers");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je deze leverancier wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        const res = await deleteAction();
        if (!res?.ok) {
          setError(res?.error ?? "Verwijderen mislukt.");
          return;
        }
        router.push("/beheer/leveranciers");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verwijderen mislukt.");
      }
    });
  }

  const busy = isPending || isDeleting;

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard>
        <div style={{ display: "grid", gap: "1.25rem" }}>
          <FormField label="Naam" htmlFor="name">
            <input
              id="name"
              name="name"
              className={inputClass}
              defaultValue={initial?.name ?? ""}
              required
            />
          </FormField>

          <FormField label="E-mail" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass}
              defaultValue={initial?.email ?? ""}
              required
            />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <FormField
              label="Verstuurtijd"
              htmlFor="mailTime"
              hint="Tijd waarop de bestelmail wordt verstuurd, HH:MM"
            >
              <input
                id="mailTime"
                name="mailTime"
                className={inputClass}
                placeholder="06:00"
                defaultValue={initial?.mailTime ?? "06:00"}
              />
            </FormField>

            <FormField label="Bestel-deadline" htmlFor="orderDeadline">
              <input
                id="orderDeadline"
                name="orderDeadline"
                className={inputClass}
                placeholder="20:00"
                defaultValue={initial?.orderDeadline ?? "20:00"}
              />
            </FormField>
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" name="ccOwner" defaultChecked={initial?.ccOwner ?? true} />
            <span>Kopie naar eigenaar</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
            <span>Actief</span>
          </label>

          <FormField label="Notities" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              className={inputClass}
              rows={3}
              defaultValue={initial?.notes ?? ""}
            />
          </FormField>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending ? "Opslaan…" : mode === "create" ? "Leverancier aanmaken" : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/leveranciers" disabled={busy}>
              Annuleren
            </AdminButton>
            {mode === "edit" && deleteAction && (
              <div style={{ marginLeft: "auto" }}>
                <AdminButton type="button" variant="danger" onClick={handleDelete} disabled={busy}>
                  {isDeleting ? "Verwijderen…" : "Verwijderen"}
                </AdminButton>
              </div>
            )}
          </div>
        </div>
      </AdminCard>
    </form>
  );
}

export default SupplierForm;
