import "server-only";
import { payload } from "@/lib/payload";

export type AppSettings = {
  opRekeningEnabled: boolean;
  molliePaymentMode: "test" | "live";
  shopOpen: boolean;
};

const DEFAULTS: AppSettings = {
  opRekeningEnabled: false,
  molliePaymentMode: "test",
  shopOpen: true,
};

/**
 * Lees de enkele instellingen-doc via de Payload Local API.
 * Valt altijd terug op veilige standaardwaarden als er nog geen doc bestaat
 * of als de query mislukt.
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const p = await payload();
    const result = await p.find({ collection: "settings" as never, limit: 1 });
    const doc = result.docs[0] as Partial<AppSettings> | undefined;
    if (!doc) return { ...DEFAULTS };

    const mode = doc.molliePaymentMode === "live" ? "live" : "test";

    return {
      opRekeningEnabled: Boolean(doc.opRekeningEnabled),
      molliePaymentMode: mode,
      shopOpen: doc.shopOpen === undefined ? true : Boolean(doc.shopOpen),
    };
  } catch (err) {
    console.error("[settings] getSettings failed:", err);
    return { ...DEFAULTS };
  }
}

/**
 * Geeft het id van de enkele instellingen-doc terug (of null als die nog niet bestaat).
 */
export async function getSettingsId(): Promise<string | null> {
  try {
    const p = await payload();
    const result = await p.find({ collection: "settings" as never, limit: 1 });
    const doc = result.docs[0] as { id: string | number } | undefined;
    return doc ? String(doc.id) : null;
  } catch (err) {
    console.error("[settings] getSettingsId failed:", err);
    return null;
  }
}
