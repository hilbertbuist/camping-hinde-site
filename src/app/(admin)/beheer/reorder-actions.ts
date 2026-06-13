"use server";

import { revalidatePath } from "next/cache";
import { updateDoc } from "@/lib/admin/data";

/** Toegestane collecties + hun lijstpagina (whitelist tegen misbruik). */
const ALLOWED: Record<string, string> = {
  products: "/beheer/producten",
  "product-categories": "/beheer/categorieen",
  "bread-items": "/beheer/broodjes",
};

/**
 * Slaat een nieuwe volgorde op: het `order`-veld krijgt de positie (1..n)
 * in de aangeleverde id-lijst. Gebruikt door de drag-and-drop lijsten.
 */
export async function reorderDocs(
  collection: string,
  ids: string[],
): Promise<{ ok: boolean; error?: string }> {
  const path = ALLOWED[collection];
  if (!path) return { ok: false, error: "Onbekende collectie." };
  try {
    await Promise.all(ids.map((id, i) => updateDoc(collection, id, { order: i + 1 })));
    revalidatePath(path);
    return { ok: true };
  } catch {
    return { ok: false, error: "Volgorde opslaan mislukt. Probeer het opnieuw." };
  }
}
