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
