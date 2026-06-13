"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

const ICON_OPTIONS = [
  { label: "Vlees", value: "beef" },
  { label: "Zuivel", value: "milk" },
  { label: "Bier", value: "beer" },
  { label: "Brood", value: "wheat" },
  { label: "Eieren", value: "egg" },
  { label: "Honing", value: "honey" },
  { label: "Kaas", value: "cheese" },
  { label: "Wijn", value: "wine" },
  { label: "Groenten", value: "carrot" },
  { label: "Fruit", value: "apple" },
  { label: "Algemeen winkeltje", value: "shopping-bag" },
];

const COLOR_OPTIONS = [
  { label: "Groen (gras)", value: "groen", swatch: "var(--a-groen)" },
  { label: "Paars", value: "paars", swatch: "var(--a-paars)" },
  { label: "Oranje", value: "oranje", swatch: "var(--a-oranje)" },
  { label: "Blauw", value: "blauw", swatch: "#3B82C4" },
  { label: "Crème", value: "creme", swatch: "var(--a-creme)" },
];

export type CategoryFormValues = {
  name?: string;
  slug?: string;
  description?: string;
  icon?: string;
  color?: string;
  image?: string | null;
  order?: number;
  active?: boolean;
};

type Option = { id: string; label: string };

type CategoryFormProps = {
  mode: "create" | "edit";
  initial?: CategoryFormValues;
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

export function CategoryForm({
  mode,
  initial,
  mediaOptions,
  action,
  deleteAction,
}: CategoryFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [color, setColor] = useState(initial?.color ?? "groen");

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
        router.push("/beheer/categorieen");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je deze categorie wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        await deleteAction();
        router.push("/beheer/categorieen");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verwijderen mislukt.");
      }
    });
  }

  const busy = isPending || isDeleting;
  const activeSwatch = COLOR_OPTIONS.find((c) => c.value === color)?.swatch ?? "var(--a-groen)";

  return (
    <form onSubmit={handleSubmit}>
      <AdminCard>
        <div style={{ display: "grid", gap: "1.25rem" }}>
          <FormField label="Naam" htmlFor="name">
            <input
              id="name"
              name="name"
              className={inputClass}
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </FormField>

          <FormField label="Slug" htmlFor="slug" hint="Korte URL-vriendelijke naam, bijv. 'vlees' of 'zuivel'.">
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

          <FormField label="Beschrijving" htmlFor="description">
            <textarea
              id="description"
              name="description"
              className={inputClass}
              rows={3}
              defaultValue={initial?.description ?? ""}
            />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <FormField label="Icoon" htmlFor="icon">
              <select
                id="icon"
                name="icon"
                className={inputClass}
                defaultValue={initial?.icon ?? "shopping-bag"}
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Accentkleur" htmlFor="color">
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  aria-hidden
                  style={{
                    display: "inline-block",
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: activeSwatch,
                    border: "1px solid var(--a-rand)",
                    flexShrink: 0,
                  }}
                />
                <select
                  id="color"
                  name="color"
                  className={inputClass}
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  {COLOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </FormField>
          </div>

          <FormField label="Categorie-afbeelding" htmlFor="image" hint="Kies een bestaand mediabestand.">
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

          <FormField label="Volgorde" htmlFor="order" hint="Lager getal = hoger in de lijst.">
            <input
              id="order"
              name="order"
              type="number"
              className={inputClass}
              defaultValue={initial?.order ?? 100}
            />
          </FormField>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="active"
              defaultChecked={initial?.active ?? true}
            />
            <span>Zichtbaar in winkel</span>
          </label>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending ? "Opslaan…" : mode === "create" ? "Categorie aanmaken" : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/categorieen" disabled={busy}>
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
