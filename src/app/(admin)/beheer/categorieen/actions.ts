"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc } from "@/lib/admin/data";

function parseCategory(formData: FormData) {
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const orderRaw = (formData.get("order") as string | null) ?? "";
  const order = orderRaw === "" ? 100 : Number(orderRaw);

  const image = (formData.get("image") as string | null) || null;
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

export async function createCategory(formData: FormData) {
  const data = parseCategory(formData);
  await createDoc("product-categories", data);
  revalidatePath("/beheer/categorieen");
}

export async function updateCategory(id: string, formData: FormData) {
  const data = parseCategory(formData);
  await updateDoc("product-categories", id, data);
  revalidatePath("/beheer/categorieen");
  revalidatePath(`/beheer/categorieen/${id}`);
}

export async function deleteCategory(id: string) {
  await deleteDoc("product-categories", id);
  revalidatePath("/beheer/categorieen");
}
