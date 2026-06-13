import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { ProductCategories } from "./src/collections/ProductCategories";
import { Products } from "./src/collections/Products";
import { BreadItems } from "./src/collections/BreadItems";
import { Bookings } from "./src/collections/Bookings";
import { Orders } from "./src/collections/Orders";
import * as initMigration from "./src/migrations/20260613_000000_init";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      title: "De Hinde — Beheer",
      description: "Beheerpaneel voor Boerderijcamping De Hinde",
    },
  },
  collections: [
    Users,
    Media,
    ProductCategories,
    Products,
    BreadItems,
    Bookings,
    Orders,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "change-me-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  // In productie (Vercel) gebruiken we Vercel Postgres (POSTGRES_URL auto-injected).
  // Lokaal valt het terug op SQLite voor snel ontwikkelen zonder DB-setup.
  //
  // Schema-aanmaak op Vercel:
  // Payload's `push` draait alleen als NODE_ENV !== production, dus nooit tijdens
  // een Vercel-build/-runtime. En `payload migrate` via de CLI faalt omdat tsx de
  // collection-imports niet kan resolven. Daarom gebruiken we `prodMigrations`:
  // de db-adapter draait bij de eerste connect in productie automatisch deze
  // migratie (zie node_modules/@payloadcms/db-vercel-postgres/dist/connect.js).
  // De migratie voert kant-en-klare Postgres-DDL uit (één keer lokaal gegenereerd
  // met drizzle-kit) en maakt zo alle tabellen aan — zonder runtime-afhankelijkheid
  // van drizzle-kit/esbuild.
  db: process.env.POSTGRES_URL
    ? vercelPostgresAdapter({
        pool: { connectionString: process.env.POSTGRES_URL },
        // push staat in productie toch uit; tabellen komen via prodMigrations.
        push: false,
        prodMigrations: [
          {
            name: "20260613_000000_init",
            up: initMigration.up,
            down: initMigration.down,
          },
        ],
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || "file:./payload.db",
        },
        push: true,
      }),
  sharp,
  upload: {
    limits: {
      fileSize: 10000000, // 10 MB
    },
  },
});
