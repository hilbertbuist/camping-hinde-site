import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Producten" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "price", "stock", "active"],
    group: "Winkel",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Productnaam",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      label: "Categorie",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschrijving",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto",
    },
    {
      name: "price",
      type: "number",
      label: "Prijs (€)",
      required: true,
      min: 0,
      admin: {
        step: 0.01,
        description: "Prijs in euro's, bijv. 4.95",
      },
    },
    {
      name: "unit",
      type: "select",
      label: "Eenheid",
      defaultValue: "stuk",
      options: [
        { label: "per stuk", value: "stuk" },
        { label: "per pakje", value: "pakje" },
        { label: "per fles", value: "fles" },
        { label: "per kilo", value: "kg" },
        { label: "per gram (100g)", value: "100g" },
        { label: "per liter", value: "liter" },
        { label: "per zes", value: "zes" },
        { label: "per twaalf", value: "twaalf" },
      ],
    },
    {
      name: "stock",
      type: "number",
      label: "Voorraad",
      defaultValue: 0,
      admin: {
        description: "Houd op 0 of leeg als je geen voorraad bijhoudt.",
      },
    },
    {
      name: "trackStock",
      type: "checkbox",
      label: "Voorraad bijhouden",
      defaultValue: false,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Beschikbaar in winkel",
      defaultValue: true,
    },
    {
      name: "supplier",
      type: "text",
      label: "Leverancier (lokaal)",
      admin: {
        description: "Bijv. 'Slagerij Berg, Dronten' — wordt opgenomen in productdetails als herkomst.",
      },
    },
  ],
};
