import type { CollectionConfig } from "payload";

export const BreadItems: CollectionConfig = {
  slug: "bread-items",
  labels: { singular: "Broodje", plural: "Broodjes (bestelmenu)" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "price", "active"],
    group: "Winkel",
    description:
      "Items die campinggasten 's avonds kunnen bestellen voor de volgende ochtend.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Naam",
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Korte beschrijving",
    },
    {
      name: "price",
      type: "number",
      label: "Prijs (€)",
      required: true,
      min: 0,
      admin: { step: 0.01 },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto",
    },
    {
      name: "category",
      type: "select",
      label: "Type",
      required: true,
      defaultValue: "broodje",
      options: [
        { label: "Broodje (zacht)", value: "broodje-zacht" },
        { label: "Broodje (hard)", value: "broodje-hard" },
        { label: "Croissant", value: "croissant" },
        { label: "Eitjes", value: "eieren" },
        { label: "Anders", value: "anders" },
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Volgorde",
      defaultValue: 100,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Beschikbaar voor bestelling",
      defaultValue: true,
    },
  ],
};
