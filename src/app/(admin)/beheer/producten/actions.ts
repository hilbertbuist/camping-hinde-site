"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc, friendlyError, relId, type SaveResult } from "@/lib/admin/data";

function parseProduct(formData: FormData) {
  const trackStock = formData.get("trackStock") === "on" || formData.get("trackStock") === "true";
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const priceRaw = (formData.get("price") as string | null)?.replace(",", ".") ?? "";
  const price = priceRaw === "" ? 0 : Number(priceRaw);

  const stockRaw = (formData.get("stock") as string | null) ?? "";
  const stock = stockRaw === "" ? 0 : Number(stockRaw);

  const category = relId(formData.get("category"));
  const image = relId(formData.get("image"));
  const supplier = ((formData.get("supplier") as string | null) || "").trim();
  const description = ((formData.get("description") as string | null) || "").trim();

  return {
    name: ((formData.get("name") as string | null) || "").trim(),
    slug: ((formData.get("slug") as string | null) || "").trim(),
    category,
    description: description || undefined,
    image,
    price: Number.isFinite(price) ? price : 0,
    unit: (formData.get("unit") as string | null) || "stuk",
    stock: Number.isFinite(stock) ? stock : 0,
    trackStock,
    active,
    supplier: supplier || undefined,
  };
}

export async function createProduct(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseProduct(formData);
    if (!data.category) {
      return { ok: false, error: "Kies een categorie. Maak er eerst een aan onder ‘Categorieën’ als de lijst leeg is." };
    }
    const { id } = await createDoc("products", data);
    revalidatePath("/beheer/producten");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function updateProduct(id: string, formData: FormData): Promise<SaveResult> {
  try {
    const data = parseProduct(formData);
    if (!data.category) {
      return { ok: false, error: "Kies een categorie." };
    }
    await updateDoc("products", id, data);
    revalidatePath("/beheer/producten");
    revalidatePath(`/beheer/producten/${id}`);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function deleteProduct(id: string): Promise<SaveResult> {
  try {
    await deleteDoc("products", id);
    revalidatePath("/beheer/producten");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
