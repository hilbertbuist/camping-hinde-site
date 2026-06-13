import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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

export default withPayload(withNextIntl(nextConfig));
