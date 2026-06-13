import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-vercel-postgres";
import { pushDevSchema } from "@payloadcms/drizzle";

/**
 * Eerste ("initiële") migratie voor de Postgres-database op Vercel.
 *
 * Waarom geen handgeschreven SQL?
 * Payload's `migrate:create` CLI kan op Windows én op Vercel de collection-imports
 * in payload.config.ts niet resolven (tsx `tsImport` bug → ERR_MODULE_NOT_FOUND),
 * waardoor het genereren van een klassieke SQL-migratie niet lukt. De Next.js/webpack
 * build resolvet diezelfde config wél prima.
 *
 * Daarom draaien we hier dezelfde schema-push die Payload normaal in dev gebruikt
 * (`pushDevSchema`), maar nu expliciet in productie. Drizzle leidt het volledige
 * schema af uit de (webpack-gebundelde) collections en maakt in één keer alle
 * tabellen aan op de lege Neon-database — inclusief de `payload_migrations`-tabel,
 * die `prodMigrations` daarna nodig heeft om deze migratie als 'uitgevoerd' te boeken.
 *
 * Deze migratie wordt automatisch uitgevoerd bij de eerste connect in productie,
 * via `prodMigrations` in de db-adapter (zie payload.config.ts). Drizzle's push is
 * idempotent: bij een volgende deploy is het schema al gelijk en gebeurt er niets.
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Forceer de push ook al staat NODE_ENV op production en sla de
  // interactieve "accept warnings"-prompt over (lege DB → geen dataverlies).
  process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = "true";

  // payload.db is de drizzle-adapter; pushDevSchema leidt het schema uit
  // adapter.schema/rawTables af en synct het naar de live database.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await pushDevSchema(payload.db as any);
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Bewust een no-op: dit is de basis-migratie. Terugdraaien zou de hele
  // database leeggooien; dat doen we niet automatisch.
}
