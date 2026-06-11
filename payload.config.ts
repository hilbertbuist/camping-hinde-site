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
  db: process.env.POSTGRES_URL
    ? vercelPostgresAdapter({
        pool: { connectionString: process.env.POSTGRES_URL },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || "file:./payload.db",
        },
      }),
  sharp,
  upload: {
    limits: {
      fileSize: 10000000, // 10 MB
    },
  },
});
