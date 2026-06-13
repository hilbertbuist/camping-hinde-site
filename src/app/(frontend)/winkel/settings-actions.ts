"use server";

import { getSettings } from "@/lib/settings";

/**
 * Geeft terug of "op rekening" (tab) is ingeschakeld in de admin-instellingen.
 * Gebruikt door de winkel-app (client) om de op-rekening-optie te tonen/verbergen.
 */
export async function fetchOpRekeningEnabled(): Promise<boolean> {
  const s = await getSettings();
  return Boolean(s.opRekeningEnabled);
}
