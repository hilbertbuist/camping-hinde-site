"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export type ActivityFormValues = {
  title?: string;
  description?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  image?: string | null;
  active?: boolean;
  order?: number;
};

type Option = { id: string; label: string };

type ActivityFormProps = {
  mode: "create" | "edit";
  initial?: ActivityFormValues;
  mediaOptions: Option[];
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  deleteAction?: () => Promise<{ ok: boolean; error?: string }>;
};

export function ActivityForm({ mode, initial, mediaOptions, action, deleteAction }: ActivityFormProps) {
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
        router.push("/beheer/activiteiten");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je deze activiteit wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        const res = await deleteAction();
        if (!res?.ok) {
          setError(res?.error ?? "Verwijderen mislukt.");
          return;
        }
        router.push("/beheer/activiteiten");
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
          <FormField label="Titel" htmlFor="title">
            <input
              id="title"
              name="title"
              className={inputClass}
              defaultValue={initial?.title ?? ""}
              required
            />
          </FormField>

          <FormField label="Omschrijving" htmlFor="description">
            <textarea
              id="description"
              name="description"
              className={inputClass}
              rows={4}
              defaultValue={initial?.description ?? ""}
            />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
            <FormField label="Datum" htmlFor="date">
              <input
                id="date"
                name="date"
                type="date"
                className={inputClass}
                defaultValue={initial?.date ?? ""}
                required
              />
            </FormField>

            <FormField label="Begintijd" htmlFor="startTime" hint='bv. "14:00"'>
              <input
                id="startTime"
                name="startTime"
                className={inputClass}
                placeholder="14:00"
                defaultValue={initial?.startTime ?? ""}
              />
            </FormField>

            <FormField label="Eindtijd" htmlFor="endTime">
              <input
                id="endTime"
                name="endTime"
                className={inputClass}
                placeholder="16:00"
                defaultValue={initial?.endTime ?? ""}
              />
            </FormField>
          </div>

          <FormField label="Locatie" htmlFor="location">
            <input
              id="location"
              name="location"
              className={inputClass}
              defaultValue={initial?.location ?? ""}
            />
          </FormField>

          <FormField label="Foto" htmlFor="image" hint="Kies een bestaand mediabestand.">
            <select
              id="image"
              name="image"
              className={inputClass}
              defaultValue={initial?.image ?? ""}
            >
              <option value="">Geen foto gekoppeld</option>
              {mediaOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Volgorde" htmlFor="order" hint="Lagere nummers staan bovenaan binnen dezelfde dag.">
            <input
              id="order"
              name="order"
              type="number"
              className={inputClass}
              defaultValue={initial?.order ?? 100}
            />
          </FormField>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" name="active" defaultChecked={initial?.active ?? true} />
            <span>Actief (zichtbaar voor gasten)</span>
          </label>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending ? "Opslaan…" : mode === "create" ? "Activiteit aanmaken" : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/activiteiten" disabled={busy}>
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

export default ActivityForm;
