import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-vercel-postgres";
import { statements } from "./20260613_000000_init.statements.js";

/**
 * Eerste ("initiële") migratie voor de Postgres-database op Vercel.
 *
 * Waarom kant-en-klare SQL i.p.v. een drizzle schema-push?
 * - Payload's `migrate:create` CLI kan op Windows én op Vercel de collection-imports
 *   in payload.config.ts niet resolven (tsx `tsImport` bug → ERR_MODULE_NOT_FOUND),
 *   dus de normale migratie-generatie lukt daar niet.
 * - Een runtime drizzle-push (pushDevSchema → require('drizzle-kit/api')) faalt op
 *   Vercel omdat withPayload drizzle-kit uit de serverless-bundle weert en het pakket
 *   zwaar/native (esbuild) is.
 *
 * Daarom is het volledige Postgres-schema één keer lokaal gegenereerd met
 * drizzle-kit (generateMigration over de webpack-resolvebare config) en hier als
 * platte SQL-statements opgeslagen (zie ./20260613_000000_init.statements.ts).
 * Deze migratie voert die statements simpelweg uit — geen extra runtime-deps nodig.
 *
 * Uitvoering gebeurt automatisch bij de eerste connect in productie via
 * `prodMigrations` in de db-adapter (zie payload.config.ts en
 * node_modules/@payloadcms/db-vercel-postgres/dist/connect.js). De migratie maakt
 * álle tabellen aan, inclusief `payload_migrations`, die Payload daarna gebruikt om
 * deze migratie als 'uitgevoerd' te boeken. Bij volgende deploys staat de migratie
 * al geboekt en gebeurt er niets meer.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  for (const statement of statements) {
    const trimmed = statement.trim();
    if (!trimmed) {
      continue;
    }
    // payload.db.execute draait het statement op de actieve (transactie-)verbinding.
    await payload.db.execute({ db, raw: trimmed });
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Bewust een no-op: dit is de basis-migratie. Terugdraaien zou de hele
  // database leeggooien; dat doen we niet automatisch.
}
