"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc } from "@/lib/admin/data";

function parseProduct(formData: FormData) {
  const trackStock = formData.get("trackStock") === "on" || formData.get("trackStock") === "true";
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const priceRaw = (formData.get("price") as string | null)?.replace(",", ".") ?? "";
  const price = priceRaw === "" ? 0 : Number(priceRaw);

  const stockRaw = (formData.get("stock") as string | null) ?? "";
  const stock = stockRaw === "" ? 0 : Number(stockRaw);

  const category = (formData.get("category") as string | null) || null;
  const image = (formData.get("image") as string | null) || null;
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

export async function createProduct(formData: FormData) {
  const data = parseProduct(formData);
  await createDoc("products", data);
  revalidatePath("/beheer/producten");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = parseProduct(formData);
  await updateDoc("products", id, data);
  revalidatePath("/beheer/producten");
  revalidatePath(`/beheer/producten/${id}`);
}

export async function deleteProduct(id: string) {
  await deleteDoc("products", id);
  revalidatePath("/beheer/producten");
}
