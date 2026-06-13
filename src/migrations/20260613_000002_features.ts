import type { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-vercel-postgres";

/**
 * Tabellen voor de nieuwe features: Instellingen (settings), Leveranciers
 * (suppliers), Activiteiten (activities), Nieuws (news), plus de
 * broodje→leverancier koppeling en de document-lock-relaties.
 *
 * Kolomnamen zijn geverifieerd via introspectie van het door Payload
 * gegenereerde (SQLite) schema. Alle statements zijn idempotent (IF NOT EXISTS
 * / DO-blokken), zodat een herstart na een halve run niets stuk maakt.
 */
const statements: string[] = [
  // --- enum voor de Mollie-modus ----------------------------------------
  `DO $$ BEGIN
     CREATE TYPE "public"."enum_settings_mollie_payment_mode" AS ENUM('test','live');
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,

  // --- settings ----------------------------------------------------------
  `CREATE TABLE IF NOT EXISTS "settings" (
     "id" serial PRIMARY KEY NOT NULL,
     "op_rekening_enabled" boolean DEFAULT false,
     "mollie_payment_mode" "enum_settings_mollie_payment_mode" DEFAULT 'test',
     "shop_open" boolean DEFAULT true,
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );`,

  // --- suppliers ---------------------------------------------------------
  `CREATE TABLE IF NOT EXISTS "suppliers" (
     "id" serial PRIMARY KEY NOT NULL,
     "name" varchar NOT NULL,
     "email" varchar NOT NULL,
     "mail_time" varchar DEFAULT '06:00',
     "order_deadline" varchar DEFAULT '20:00',
     "cc_owner" boolean DEFAULT true,
     "active" boolean DEFAULT true,
     "notes" varchar,
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );`,

  // --- activities --------------------------------------------------------
  `CREATE TABLE IF NOT EXISTS "activities" (
     "id" serial PRIMARY KEY NOT NULL,
     "title" varchar NOT NULL,
     "description" varchar,
     "date" timestamp(3) with time zone NOT NULL,
     "start_time" varchar,
     "end_time" varchar,
     "location" varchar,
     "image_id" integer,
     "active" boolean DEFAULT true,
     "order" numeric DEFAULT 100,
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );`,

  // --- news --------------------------------------------------------------
  `CREATE TABLE IF NOT EXISTS "news" (
     "id" serial PRIMARY KEY NOT NULL,
     "title" varchar NOT NULL,
     "excerpt" varchar,
     "body" varchar,
     "date" timestamp(3) with time zone NOT NULL,
     "image_id" integer,
     "published" boolean DEFAULT true,
     "pinned" boolean DEFAULT false,
     "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
     "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
   );`,

  // --- broodje → leverancier --------------------------------------------
  `ALTER TABLE "bread_items" ADD COLUMN IF NOT EXISTS "supplier_id" integer;`,

  // --- foreign keys (upload → media, broodje → leverancier) -------------
  `DO $$ BEGIN
     ALTER TABLE "activities" ADD CONSTRAINT "activities_image_id_media_id_fk"
       FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN
     ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk"
       FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN
     ALTER TABLE "bread_items" ADD CONSTRAINT "bread_items_supplier_id_suppliers_id_fk"
       FOREIGN KEY ("supplier_id") REFERENCES "public"."suppliers"("id") ON DELETE set null ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,

  // --- document-lock relaties -------------------------------------------
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "suppliers_id" integer;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "activities_id" integer;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "news_id" integer;`,
  `ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "settings_id" integer;`,
  `DO $$ BEGIN
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_suppliers_fk"
       FOREIGN KEY ("suppliers_id") REFERENCES "public"."suppliers"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_activities_fk"
       FOREIGN KEY ("activities_id") REFERENCES "public"."activities"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk"
       FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,
  `DO $$ BEGIN
     ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settings_fk"
       FOREIGN KEY ("settings_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION WHEN duplicate_object THEN null; END $$;`,

  // --- indexen -----------------------------------------------------------
  `CREATE INDEX IF NOT EXISTS "activities_image_idx" ON "activities" USING btree ("image_id");`,
  `CREATE INDEX IF NOT EXISTS "news_image_idx" ON "news" USING btree ("image_id");`,
  `CREATE INDEX IF NOT EXISTS "bread_items_supplier_idx" ON "bread_items" USING btree ("supplier_id");`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_suppliers_id_idx" ON "payload_locked_documents_rels" USING btree ("suppliers_id");`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_activities_id_idx" ON "payload_locked_documents_rels" USING btree ("activities_id");`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");`,
  `CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_settings_id_idx" ON "payload_locked_documents_rels" USING btree ("settings_id");`,
];

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  for (const statement of statements) {
    const trimmed = statement.trim();
    if (!trimmed) continue;
    await payload.db.execute({ db, raw: trimmed });
  }
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // Bewust een no-op: terugdraaien zou de nieuwe tabellen + data verwijderen.
}
