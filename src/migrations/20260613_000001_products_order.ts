import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-vercel-postgres";

/**
 * Voegt het `order`-veld toe aan de products-tabel (voor drag-and-drop volgorde).
 * Additief en idempotent (IF NOT EXISTS) — raakt bestaande rijen niet.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  await payload.db.execute({
    db,
    raw: 'ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "order" numeric DEFAULT 0;',
  });
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  await payload.db.execute({
    db,
    raw: 'ALTER TABLE "products" DROP COLUMN IF EXISTS "order";',
  });
}
