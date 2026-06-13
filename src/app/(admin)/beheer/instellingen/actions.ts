"use server";

import { revalidatePath } from "next/cache";
import { createDoc, updateDoc, friendlyError, type SaveResult } from "@/lib/admin/data";
import { getSettingsId } from "@/lib/settings";

function parseSettings(formData: FormData) {
  const opRekeningEnabled =
    formData.get("opRekeningEnabled") === "on" ||
    formData.get("opRekeningEnabled") === "true";

  const shopOpen =
    formData.get("shopOpen") === "on" || formData.get("shopOpen") === "true";

  const modeRaw = String(formData.get("molliePaymentMode") ?? "test");
  const molliePaymentMode = modeRaw === "live" ? "live" : "test";

  return { opRekeningEnabled, molliePaymentMode, shopOpen };
}

export async function saveSettings(formData: FormData): Promise<SaveResult> {
  try {
    const data = parseSettings(formData);
    const existingId = await getSettingsId();

    let id: string;
    if (existingId) {
      await updateDoc("settings", existingId, data);
      id = existingId;
    } else {
      const created = await createDoc("settings", data);
      id = created.id;
    }

    revalidatePath("/beheer/instellingen");
    return { ok: true, id };
  } catch (err) {
    return { ok: false, error: friendlyError(err) };
  }
}
