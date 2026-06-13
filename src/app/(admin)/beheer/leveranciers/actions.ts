"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc, friendlyError, type SaveResult } from "@/lib/admin/data";
import { sendSupplierOrders, type SendSummaryItem } from "@/lib/bread-orders";

function parseSupplier(formData: FormData) {
  const ccOwner =
    formData.get("ccOwner") === "on" || formData.get("ccOwner") === "true";
  const active =
    formData.get("active") === "on" || formData.get("active") === "true";

  const name = ((formData.get("name") as string | null) || "").trim();
  const email = ((formData.get("email") as string | null) || "").trim();
  const mailTime = ((formData.get("mailTime") as string | null) || "").trim() || "06:00";
  const orderDeadline =
    ((formData.get("orderDeadline") as string | null) || "").trim() || "20:00";
  const notes = ((formData.get("notes") as string | null) || "").trim();

  return {
    name,
    email,
    mailTime,
    orderDeadline,
    ccOwner,
    active,
    notes: notes || undefined,
  };
}

export async function createSupplier(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseSupplier(formData);
    const { id } = await createDoc("suppliers", data);
    revalidatePath("/beheer/leveranciers");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function updateSupplier(id: string, formData: FormData): Promise<SaveResult> {
  try {
    const data = parseSupplier(formData);
    await updateDoc("suppliers", id, data);
    revalidatePath("/beheer/leveranciers");
    revalidatePath(`/beheer/leveranciers/${id}`);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function deleteSupplier(id: string): Promise<SaveResult> {
  try {
    await deleteDoc("suppliers", id);
    revalidatePath("/beheer/leveranciers");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export type SendNowResult = {
  ok: boolean;
  error?: string;
  summary?: SendSummaryItem[];
};

/**
 * Handmatige trigger vanuit het beheer: verstuurt de bestelmails voor MORGEN
 * (de bezorgdag) zodat de eigenaar dit kan testen of vervroegd kan versturen.
 */
export async function sendOrdersNow(): Promise<SendNowResult> {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const summary = await sendSupplierOrders(tomorrow);
    return { ok: true, summary };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
