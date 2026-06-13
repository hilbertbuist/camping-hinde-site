"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc, friendlyError, type SaveResult } from "@/lib/admin/data";

function parseActivity(formData: FormData) {
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const orderRaw = (formData.get("order") as string | null) ?? "";
  const order = orderRaw === "" ? 100 : Number(orderRaw);

  const description = ((formData.get("description") as string | null) || "").trim();
  const startTime = ((formData.get("startTime") as string | null) || "").trim();
  const endTime = ((formData.get("endTime") as string | null) || "").trim();
  const location = ((formData.get("location") as string | null) || "").trim();
  const date = ((formData.get("date") as string | null) || "").trim();
  const image = (formData.get("image") as string | null) || null;

  return {
    title: ((formData.get("title") as string | null) || "").trim(),
    description: description || undefined,
    date: date || undefined,
    startTime: startTime || undefined,
    endTime: endTime || undefined,
    location: location || undefined,
    image,
    order: Number.isFinite(order) ? order : 100,
    active,
  };
}

export async function createActivity(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseActivity(formData);
    const { id } = await createDoc("activities", data);
    revalidatePath("/beheer/activiteiten");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function updateActivity(id: string, formData: FormData): Promise<SaveResult> {
  try {
    const data = parseActivity(formData);
    await updateDoc("activities", id, data);
    revalidatePath("/beheer/activiteiten");
    revalidatePath(`/beheer/activiteiten/${id}`);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function deleteActivity(id: string): Promise<SaveResult> {
  try {
    await deleteDoc("activities", id);
    revalidatePath("/beheer/activiteiten");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
