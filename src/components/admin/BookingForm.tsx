"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { FormField, inputClass } from "@/components/admin/ui/FormField";

const STATUS_OPTIONS = [
  { label: "Actief (gast is hier)", value: "active" },
  { label: "Aankomend", value: "upcoming" },
  { label: "Afgesloten", value: "closed" },
  { label: "Geannuleerd", value: "cancelled" },
];

export type BookingFormValues = {
  reference?: string;
  guestName?: string;
  guestLastName?: string;
  email?: string;
  phone?: string;
  campsiteNumber?: string;
  arrival?: string;
  departure?: string;
  guests?: number;
  status?: string;
  notes?: string;
};

type BookingFormProps = {
  mode: "create" | "edit";
  initial?: BookingFormValues;
  action: (formData: FormData) => Promise<{ ok: boolean; error?: string }>;
  deleteAction?: () => Promise<{ ok: boolean; error?: string }>;
};

/** Normalises a Payload date value to a yyyy-mm-dd string for <input type="date">. */
function toDateInput(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

export function BookingForm({ mode, initial, action, deleteAction }: BookingFormProps) {
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
        router.push("/beheer/boekingen");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Opslaan mislukt. Probeer het opnieuw.");
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!confirm("Weet je zeker dat je deze boeking wilt verwijderen?")) return;
    setError(null);
    startDelete(async () => {
      try {
        const res = await deleteAction();
        if (!res?.ok) {
          setError(res?.error ?? "Verwijderen mislukt.");
          return;
        }
        router.push("/beheer/boekingen");
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <FormField label="Voornaam hoofdgast" htmlFor="guestName">
              <input
                id="guestName"
                name="guestName"
                className={inputClass}
                defaultValue={initial?.guestName ?? ""}
                required
              />
            </FormField>
            <FormField
              label="Achternaam"
              htmlFor="guestLastName"
              hint="Gebruikt voor login-koppeling."
            >
              <input
                id="guestLastName"
                name="guestLastName"
                className={inputClass}
                defaultValue={initial?.guestLastName ?? ""}
                required
              />
            </FormField>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <FormField label="E-mail" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                className={inputClass}
                defaultValue={initial?.email ?? ""}
              />
            </FormField>
            <FormField label="Telefoon" htmlFor="phone">
              <input
                id="phone"
                name="phone"
                className={inputClass}
                defaultValue={initial?.phone ?? ""}
              />
            </FormField>
          </div>

          <FormField
            label="Plek / accommodatie"
            htmlFor="campsiteNumber"
            hint="Bijv. '7', 'Safaritent' of 'Hindehut-1'. Gasten loggen hiermee in."
          >
            <input
              id="campsiteNumber"
              name="campsiteNumber"
              className={inputClass}
              defaultValue={initial?.campsiteNumber ?? ""}
            />
          </FormField>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
            <FormField label="Aankomst" htmlFor="arrival">
              <input
                id="arrival"
                name="arrival"
                type="date"
                className={inputClass}
                defaultValue={toDateInput(initial?.arrival)}
                required
              />
            </FormField>
            <FormField label="Vertrek" htmlFor="departure">
              <input
                id="departure"
                name="departure"
                type="date"
                className={inputClass}
                defaultValue={toDateInput(initial?.departure)}
                required
              />
            </FormField>
            <FormField label="Aantal gasten" htmlFor="guests">
              <input
                id="guests"
                name="guests"
                type="number"
                min="1"
                className={inputClass}
                defaultValue={initial?.guests ?? 2}
              />
            </FormField>
          </div>

          <FormField label="Status" htmlFor="status">
            <select
              id="status"
              name="status"
              className={inputClass}
              defaultValue={initial?.status ?? "active"}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Notities" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              className={inputClass}
              rows={3}
              defaultValue={initial?.notes ?? ""}
            />
          </FormField>

          {mode === "edit" && (
            <FormField
              label="Boekingsnummer"
              htmlFor="reference"
              hint="Laat ongewijzigd tenzij nodig."
            >
              <input
                id="reference"
                name="reference"
                className={inputClass}
                defaultValue={initial?.reference ?? ""}
              />
            </FormField>
          )}

          {error && (
            <p style={{ color: "#b3261e", margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
            <AdminButton type="submit" variant="primary" disabled={busy}>
              {isPending
                ? "Opslaan…"
                : mode === "create"
                  ? "Boeking aanmaken"
                  : "Wijzigingen opslaan"}
            </AdminButton>
            <AdminButton type="button" variant="ghost" href="/beheer/boekingen" disabled={busy}>
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

export default BookingForm;
