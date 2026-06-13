"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, deleteDoc, friendlyError, type SaveResult } from "@/lib/admin/data";

function parseNews(formData: FormData) {
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const pinned = formData.get("pinned") === "on" || formData.get("pinned") === "true";

  const excerpt = ((formData.get("excerpt") as string | null) || "").trim();
  const body = ((formData.get("body") as string | null) || "").trim();
  const date = ((formData.get("date") as string | null) || "").trim();
  const image = (formData.get("image") as string | null) || null;

  return {
    title: ((formData.get("title") as string | null) || "").trim(),
    excerpt: excerpt || undefined,
    body: body || undefined,
    date: date || undefined,
    image,
    published,
    pinned,
  };
}

export async function createNews(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseNews(formData);
    const { id } = await createDoc("news", data);
    revalidatePath("/beheer/nieuws");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function updateNews(id: string, formData: FormData): Promise<SaveResult> {
  try {
    const data = parseNews(formData);
    await updateDoc("news", id, data);
    revalidatePath("/beheer/nieuws");
    revalidatePath(`/beheer/nieuws/${id}`);
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}

export async function deleteNews(id: string): Promise<SaveResult> {
  try {
    await deleteDoc("news", id);
    revalidatePath("/beheer/nieuws");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
