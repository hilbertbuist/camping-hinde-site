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
