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
      {
        // Vercel Blob (media-opslag in productie)
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default withPayload(withNextIntl(nextConfig));
