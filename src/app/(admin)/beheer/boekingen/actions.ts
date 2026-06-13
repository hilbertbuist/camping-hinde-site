"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc, friendlyError, type SaveResult } from "@/lib/admin/data";

const VALID_STATUSES = ["active", "upcoming", "closed", "cancelled"];

function parseBooking(formData: FormData) {
  const statusRaw = ((formData.get("status") as string | null) || "").trim();
  const status = VALID_STATUSES.includes(statusRaw) ? statusRaw : "active";

  const guestsRaw = (formData.get("guests") as string | null) ?? "";
  const guests = guestsRaw === "" ? 2 : Number(guestsRaw);

  const arrivalRaw = ((formData.get("arrival") as string | null) || "").trim();
  const departureRaw = ((formData.get("departure") as string | null) || "").trim();

  const get = (k: string) => ((formData.get(k) as string | null) || "").trim();

  return {
    guestName: get("guestName"),
    guestLastName: get("guestLastName"),
    email: get("email") || undefined,
    phone: get("phone") || undefined,
    campsiteNumber: get("campsiteNumber") || undefined,
    arrival: arrivalRaw || undefined,
    departure: departureRaw || undefined,
    guests: Number.isFinite(guests) ? guests : 2,
    status,
    notes: get("notes") || undefined,
  };
}

/** Builds a deterministic reference from the server submit time, e.g. DH-3K9F2A. */
function generateReference() {
  const stamp = new Date().getTime().toString(36).toUpperCase();
  return `DH-${stamp}`;
}

export async function createBooking(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseBooking(formData);
    const refInput = ((formData.get("reference") as string | null) || "").trim();
    const reference = refInput || generateReference();
    const { id } = await createDoc("bookings", {
      ...data,
      reference,
      externalSource: "manual",
    });
    revalidatePath("/beheer/boekingen");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function updateBooking(id: string, formData: FormData): Promise<SaveResult> {
  try {
    const data = parseBooking(formData);
    const refInput = ((formData.get("reference") as string | null) || "").trim();
    const payload: Record<string, unknown> = { ...data };
    if (refInput) payload.reference = refInput;
    await updateDoc("bookings", id, payload);
    revalidatePath("/beheer/boekingen");
    revalidatePath(`/beheer/boekingen/${id}`);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function deleteBooking(id: string): Promise<SaveResult> {
  try {
    await deleteDoc("bookings", id);
    revalidatePath("/beheer/boekingen");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
