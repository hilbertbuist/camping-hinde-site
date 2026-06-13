import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // withPayload sluit drizzle-kit standaard uit de serverless-bundle uit
  // (outputFileTracingExcludes), omdat het normaal alleen in dev gebruikt wordt.
  // Wij draaien echter een drizzle schema-push in productie (prodMigrations →
  // pushDevSchema → require('drizzle-kit/api')) om bij de eerste deploy alle
  // Postgres-tabellen aan te maken. Daarom forceren we drizzle-kit (en de
  // transitive deps die het nodig heeft) TERUG in de function-bundle. In Next.js
  // wint outputFileTracingIncludes van excludes.
  outputFileTracingIncludes: {
    "/api/**": ["./node_modules/drizzle-kit/**/*", "./node_modules/esbuild/**/*"],
    "/admin/**": ["./node_modules/drizzle-kit/**/*", "./node_modules/esbuild/**/*"],
    "**/*": ["./node_modules/drizzle-kit/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "campingdehinde.nl",
        pathname: "/WP/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "campingdehinde.nl",
        pathname: "/WP/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Laat webpack ".js" imports ook naar ".ts"-bestanden resolven.
  // Nodig omdat payload.config.ts ".js"-extensies gebruikt voor de collections
  // en de init-migratie, terwijl die bestanden in werkelijkheid .ts zijn.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webpack: (config: any) => {
    config.resolve = config.resolve ?? {};
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias ?? {}),
      ".js": [".ts", ".tsx", ".js", ".jsx"],
    };
    return config;
  },
};

const finalConfig = withPayload(withNextIntl(nextConfig));

// withPayload zet drizzle-kit in outputFileTracingExcludes['**/*']. Daardoor
// belandt drizzle-kit niet in de serverless-bundle en faalt onze init-migratie
// met "Cannot find module 'drizzle-kit/api'". We halen die excludes er weer uit
// zodat outputFileTracingIncludes (hierboven) drizzle-kit echt mee kan nemen.
if (finalConfig.outputFileTracingExcludes) {
  for (const key of Object.keys(finalConfig.outputFileTracingExcludes)) {
    finalConfig.outputFileTracingExcludes[key] = finalConfig.outputFileTracingExcludes[
      key
    ].filter((p: string) => !p.startsWith("drizzle-kit"));
  }
}

export default finalConfig;
