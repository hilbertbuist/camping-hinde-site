import { createMollieClient, type MollieClient } from "@mollie/api-client";

let client: MollieClient | null = null;

export function getMollie(): MollieClient | null {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) return null;
  if (!client) {
    client = createMollieClient({ apiKey });
  }
  return client;
}

export const isMollieConfigured = () => Boolean(process.env.MOLLIE_API_KEY);

export type MolliePaymentMode = "test" | "live";

/**
 * Geeft de Mollie API-sleutel terug die hoort bij de gekozen modus.
 * Sleutels staan in Vercel environment variables (nooit in de database).
 */
export function mollieKeyForMode(mode: MolliePaymentMode): string | undefined {
  return mode === "live"
    ? process.env.MOLLIE_API_KEY_LIVE
    : process.env.MOLLIE_API_KEY_TEST;
}

const modeClients: Partial<Record<MolliePaymentMode, MollieClient>> = {};

/**
 * Maakt (of hergebruikt) een Mollie-client voor de gekozen modus, op basis van
 * de bijbehorende environment-variabele. Geeft null als de sleutel ontbreekt.
 */
export function getMollieForMode(mode: MolliePaymentMode): MollieClient | null {
  const apiKey = mollieKeyForMode(mode);
  if (!apiKey) return null;
  if (!modeClients[mode]) {
    modeClients[mode] = createMollieClient({ apiKey });
  }
  return modeClients[mode] ?? null;
}
