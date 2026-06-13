"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc } from "@/lib/admin/data";

const CATEGORIES = ["broodje-zacht", "broodje-hard", "croissant", "eieren", "anders"];

function parseBread(formData: FormData) {
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  const priceRaw = (formData.get("price") as string | null)?.replace(",", ".") ?? "";
  const price = priceRaw === "" ? 0 : Number(priceRaw);

  const orderRaw = (formData.get("order") as string | null) ?? "";
  const order = orderRaw === "" ? 100 : Number(orderRaw);

  const categoryRaw = ((formData.get("category") as string | null) || "").trim();
  const category = CATEGORIES.includes(categoryRaw) ? categoryRaw : "broodje-zacht";

  const description = ((formData.get("description") as string | null) || "").trim();
  const image = (formData.get("image") as string | null) || null;

  return {
    name: ((formData.get("name") as string | null) || "").trim(),
    description: description || undefined,
    price: Number.isFinite(price) ? price : 0,
    image,
    category,
    order: Number.isFinite(order) ? order : 100,
    active,
  };
}

export async function createBread(formData: FormData) {
  const data = parseBread(formData);
  await createDoc("bread-items", data);
  revalidatePath("/beheer/broodjes");
}

export async function updateBread(id: string, formData: FormData) {
  const data = parseBread(formData);
  await updateDoc("bread-items", id, data);
  revalidatePath("/beheer/broodjes");
  revalidatePath(`/beheer/broodjes/${id}`);
}

export async function deleteBread(id: string) {
  await deleteDoc("bread-items", id);
  revalidatePath("/beheer/broodjes");
}
