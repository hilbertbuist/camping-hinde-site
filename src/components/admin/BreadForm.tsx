"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

const CATEGORY_OPTIONS = [
  { label: "Broodje (zacht)", value: "broodje-zacht" },
  { label: "Broodje (hard)", value: "broodje-hard" },
  { label: "Croissant", value: "croissant" },
  { label: "Eitjes", value: "eieren" },
  { label: "Anders", value: "anders" },
];

export type BreadFormValues = {
  name?: string;
  description?: string;
  price?: number;
  image?: string | null;
  category?: string;
  order?: number;
  active?: boolean;
};

type Option = { id: string; label: string };

type BreadFormProps = {
  mode: "create" | "edit";
  initial?: BreadFormValues;
  mediaOptions: Option[];
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  deleteAction?: () => Promise<{ ok: boolean; error?: string }>;
};

export function BreadForm({ mode, initial, mediaOptions, action, deleteAction }: BreadFormProps) {
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
        router.push("/beheer/broodjes");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je dit broodje wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        const res = await deleteAction();
        if (!res?.ok) {
          setError(res?.error ?? "Verwijderen mislukt.");
          return;
        }
        router.push("/beheer/broodjes");
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

          <FormField label="Korte beschrijving" htmlFor="description">
            <textarea
              id="description"
              name="description"
              className={inputClass}
              rows={3}
              defaultValue={initial?.description ?? ""}
            />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <FormField label="Prijs (€)" htmlFor="price">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                className={inputClass}
                defaultValue={initial?.price ?? ""}
                required
              />
            </FormField>

            <FormField label="Type" htmlFor="category">
              <select
                id="category"
                name="category"
                className={inputClass}
                defaultValue={initial?.category ?? "broodje-zacht"}
                required
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

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

          <FormField label="Volgorde" htmlFor="order" hint="Lagere nummers staan bovenaan in het menu.">
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
            <span>Beschikbaar voor bestelling</span>
          </label>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending ? "Opslaan…" : mode === "create" ? "Broodje aanmaken" : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/broodjes" disabled={busy}>
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

export default BreadForm;
