"use server";

import { revalidatePath } from "next/cache";
import { payload } from "@/lib/payload";
import { deleteDoc } from "@/lib/admin/data";

export type UploadResult = {
  ok: boolean;
  count: number;
  error?: string;
};

/**
 * Upload one or more images to the "media" collection.
 *
 * Uses Payload's Local API `create` with the `file` option so that sharp
 * generates the configured imageSizes (thumbnail / card / hero). That is the
 * autocrop + optimization the owner wanted — handled entirely by Payload.
 */
export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (files.length === 0) {
    return { ok: false, count: 0, error: "Geen bestanden ontvangen." };
  }

  try {
    const p = await payload();
    let count = 0;

    for (const file of files) {
      const buf = Buffer.from(await file.arrayBuffer());
      await p.create({
        collection: "media",
        data: { alt: file.name },
        file: {
          data: buf,
          name: file.name,
          mimetype: file.type || "application/octet-stream",
          size: file.size,
        },
      });
      count += 1;
    }

    revalidatePath("/beheer/media");
    return { ok: true, count };
  } catch (err) {
    console.error("[beheer/media] uploadMedia failed:", err);
    const message = err instanceof Error ? err.message : "Uploaden mislukt.";
    return { ok: false, count: 0, error: message };
  }
}

/**
 * Upload één (in de browser bijgesneden) afbeelding naar de mediabank en geef
 * de id + url terug, zodat een formulier de afbeelding direct kan koppelen.
 * sharp genereert de imageSizes (thumbnail/card/hero) = extra optimalisatie.
 */
export async function uploadImage(
  formData: FormData,
): Promise<{ ok: boolean; id?: string; url?: string; thumbUrl?: string; error?: string }> {
  const file = formData.get("file");
  const alt = ((formData.get("alt") as string | null) || "").trim();
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Geen afbeelding ontvangen." };
  }
  try {
    const p = await payload();
    const buf = Buffer.from(await file.arrayBuffer());
    const doc = (await p.create({
      collection: "media",
      data: { alt: alt || file.name },
      file: {
        data: buf,
        name: file.name || "afbeelding.webp",
        mimetype: file.type || "image/webp",
        size: file.size,
      },
    })) as { id: string | number; url?: string; sizes?: { thumbnail?: { url?: string } } };
    revalidatePath("/beheer/media");
    return {
      ok: true,
      id: String(doc.id),
      url: doc.url,
      thumbUrl: doc.sizes?.thumbnail?.url ?? doc.url,
    };
  } catch (err) {
    console.error("[beheer/media] uploadImage failed:", err);
    const message = err instanceof Error ? err.message : "Uploaden mislukt.";
    return { ok: false, error: message };
  }
}

export async function deleteMediaItem(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    await deleteDoc("media", id);
    revalidatePath("/beheer/media");
    return { ok: true };
  } catch (err) {
    console.error("[beheer/media] deleteMediaItem failed:", err);
    const message = err instanceof Error ? err.message : "Verwijderen mislukt.";
    return { ok: false, error: message };
  }
}

export async function updateMediaAlt(
  id: string,
  alt: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const p = await payload();
    await p.update({ collection: "media", id, data: { alt } });
    revalidatePath("/beheer/media");
    return { ok: true };
  } catch (err) {
    console.error("[beheer/media] updateMediaAlt failed:", err);
    const message = err instanceof Error ? err.message : "Opslaan mislukt.";
    return { ok: false, error: message };
  }
}
