"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

const UNIT_OPTIONS = [
  { label: "per stuk", value: "stuk" },
  { label: "per pakje", value: "pakje" },
  { label: "per fles", value: "fles" },
  { label: "per kilo", value: "kg" },
  { label: "per gram (100g)", value: "100g" },
  { label: "per liter", value: "liter" },
  { label: "per zes", value: "zes" },
  { label: "per twaalf", value: "twaalf" },
];

export type ProductFormValues = {
  name?: string;
  slug?: string;
  category?: string | null;
  description?: string;
  image?: string | null;
  price?: number;
  unit?: string;
  stock?: number;
  trackStock?: boolean;
  active?: boolean;
  supplier?: string;
};

type Option = { id: string; label: string };

type ProductFormProps = {
  mode: "create" | "edit";
  initial?: ProductFormValues;
  categoryOptions: Option[];
  mediaOptions: Option[];
  action: (formData: FormData) => Promise<void>;
  deleteAction?: () => Promise<void>;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ProductForm({
  mode,
  initial,
  categoryOptions,
  mediaOptions,
  action,
  deleteAction,
}: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [trackStock, setTrackStock] = useState(initial?.trackStock ?? false);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(formData);
        router.push("/beheer/producten");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je dit product wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        await deleteAction();
        router.push("/beheer/producten");
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
          <FormField label="Productnaam" htmlFor="name">
            <input
              id="name"
              name="name"
              className={inputClass}
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Slug" htmlFor="slug" hint="URL-vriendelijke naam, automatisch ingevuld.">
            <input
              id="slug"
              name="slug"
              className={inputClass}
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              required
            />
          </FormField>

          <FormField label="Categorie" htmlFor="category">
            <select
              id="category"
              name="category"
              className={inputClass}
              defaultValue={initial?.category ?? ""}
              required
            >
              <option value="" disabled>
                Kies een categorie…
              </option>
              {categoryOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Beschrijving" htmlFor="description">
            <textarea
              id="description"
              name="description"
              className={inputClass}
              rows={4}
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

            <FormField label="Eenheid" htmlFor="unit">
              <select
                id="unit"
                name="unit"
                className={inputClass}
                defaultValue={initial?.unit ?? "stuk"}
              >
                {UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Afbeelding" htmlFor="image" hint="Kies een bestaand mediabestand.">
            <select
              id="image"
              name="image"
              className={inputClass}
              defaultValue={initial?.image ?? ""}
            >
              <option value="">Geen afbeelding gekoppeld</option>
              {mediaOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Leverancier (lokaal)" htmlFor="supplier" hint="Optioneel, bijv. 'Slagerij Berg, Dronten'.">
            <input
              id="supplier"
              name="supplier"
              className={inputClass}
              defaultValue={initial?.supplier ?? ""}
            />
          </FormField>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="trackStock"
              checked={trackStock}
              onChange={(e) => setTrackStock(e.target.checked)}
            />
            <span>Voorraad bijhouden</span>
          </label>

          {trackStock && (
            <FormField label="Voorraad" htmlFor="stock">
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                className={inputClass}
                defaultValue={initial?.stock ?? 0}
              />
            </FormField>
          )}

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="active"
              defaultChecked={initial?.active ?? true}
            />
            <span>Beschikbaar in winkel</span>
          </label>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending ? "Opslaan…" : mode === "create" ? "Product aanmaken" : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/producten" disabled={busy}>
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
