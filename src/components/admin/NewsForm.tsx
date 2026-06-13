"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

export type NewsFormValues = {
  title?: string;
  excerpt?: string;
  body?: string;
  date?: string;
  image?: string | null;
  published?: boolean;
  pinned?: boolean;
};

type Option = { id: string; label: string };

type NewsFormProps = {
  mode: "create" | "edit";
  initial?: NewsFormValues;
  mediaOptions: Option[];
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  deleteAction?: () => Promise<{ ok: boolean; error?: string }>;
};

export function NewsForm({ mode, initial, mediaOptions, action, deleteAction }: NewsFormProps) {
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
        router.push("/beheer/nieuws");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je dit nieuwsbericht wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        const res = await deleteAction();
        if (!res?.ok) {
          setError(res?.error ?? "Verwijderen mislukt.");
          return;
        }
        router.push("/beheer/nieuws");
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

          <FormField label="Korte intro" htmlFor="excerpt">
            <input
              id="excerpt"
              name="excerpt"
              className={inputClass}
              defaultValue={initial?.excerpt ?? ""}
            />
          </FormField>

          <FormField label="Bericht" htmlFor="body">
            <textarea
              id="body"
              name="body"
              className={inputClass}
              rows={6}
              defaultValue={initial?.body ?? ""}
            />
          </FormField>

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

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} />
            <span>Gepubliceerd (zichtbaar voor gasten)</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
            <input type="checkbox" name="pinned" defaultChecked={initial?.pinned ?? false} />
            <span>Bovenaan vastzetten</span>
          </label>

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending ? "Opslaan…" : mode === "create" ? "Bericht aanmaken" : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/nieuws" disabled={busy}>
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

export default NewsForm;
