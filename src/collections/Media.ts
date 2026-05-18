import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Afbeelding", plural: "Afbeeldingen" },
  admin: {
    group: "Inhoud",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "media",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 800, height: 600, position: "centre" },
      { name: "hero", width: 1920, height: 1080, position: "centre" },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alternatieve tekst",
      required: true,
      admin: {
        description: "Beschrijf wat er op de foto staat (voor toegankelijkheid en SEO).",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Bijschrift",
    },
  ],
};
