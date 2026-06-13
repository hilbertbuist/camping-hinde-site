import type { CollectionConfig } from "payload";

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "Nieuwsbericht", plural: "Nieuws" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "published", "pinned"],
    group: "Camping",
    description: "Nieuwsberichten voor campinggasten.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titel",
      required: true,
    },
    {
      name: "excerpt",
      type: "text",
      label: "Korte intro",
    },
    {
      name: "body",
      type: "textarea",
      label: "Bericht",
    },
    {
      name: "date",
      type: "date",
      label: "Datum",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto",
    },
    {
      name: "published",
      type: "checkbox",
      label: "Gepubliceerd",
      defaultValue: true,
    },
    {
      name: "pinned",
      type: "checkbox",
      label: "Bovenaan vastzetten",
      defaultValue: false,
    },
  ],
};

export default News;
