"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc, friendlyError, relId, type SaveResult } from "@/lib/admin/data";

function parseCategory(formData: FormData) {
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const orderRaw = (formData.get("order") as string | null) ?? "";
  const order = orderRaw === "" ? 100 : Number(orderRaw);

  const image = relId(formData.get("image"));
  const description = ((formData.get("description") as string | null) || "").trim();

  return {
    name: ((formData.get("name") as string | null) || "").trim(),
    slug: ((formData.get("slug") as string | null) || "").trim(),
    description: description || undefined,
    icon: (formData.get("icon") as string | null) || "shopping-bag",
    color: (formData.get("color") as string | null) || "groen",
    image,
    order: Number.isFinite(order) ? order : 100,
    active,
  };
}

export async function createCategory(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseCategory(formData);
    const { id } = await createDoc("product-categories", data);
    revalidatePath("/beheer/categorieen");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function updateCategory(id: string, formData: FormData): Promise<SaveResult> {
  try {
    const data = parseCategory(formData);
    await updateDoc("product-categories", id, data);
    revalidatePath("/beheer/categorieen");
    revalidatePath(`/beheer/categorieen/${id}`);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function deleteCategory(id: string): Promise<SaveResult> {
  try {
    await deleteDoc("product-categories", id);
    revalidatePath("/beheer/categorieen");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
