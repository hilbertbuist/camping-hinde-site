/**
 * Database-init voor productie (Vercel build-stap).
 *
 * Dit script roept getPayload aan met NODE_ENV=development, waardoor de
 * Postgres-adapter automatisch het schema "pusht": alle ontbrekende tabellen
 * en kolommen worden aangemaakt op basis van de collections in payload.config.
 *
 * Het is idempotent — bij elke build worden alleen ontbrekende dingen
 * toegevoegd. Bestaande data blijft staan. Zo hoeven we geen losse migraties
 * te onderhouden, wat voor een project van deze omvang prima is.
 *
 * Draait via:  NODE_ENV=development payload run scripts/init-db.ts
 */

import { getPayload } from "payload";
import config from "@payload-config";

const run = async () => {
  try {
    if (!process.env.POSTGRES_URL) {
      console.log(
        "[init-db] Geen POSTGRES_URL gevonden, schema-push overgeslagen (lokale SQLite of build zonder DB)."
      );
      process.exit(0);
    }
    console.log("[init-db] Schema synchroniseren met Postgres...");
    await getPayload({ config });
    console.log("[init-db] Klaar — alle tabellen bestaan.");
    process.exit(0);
  } catch (err) {
    console.error("[init-db] Fout bij schema-sync:", err);
    process.exit(1);
  }
};

run();
