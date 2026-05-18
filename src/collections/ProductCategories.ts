import type { CollectionConfig } from "payload";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  labels: { singular: "Categorie", plural: "Categorieën" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "icon", "order", "active"],
    group: "Winkel",
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
      name: "slug",
      type: "text",
      label: "Slug",
      required: true,
      unique: true,
      admin: {
        description: "Korte URL-vriendelijke naam, bijv. 'vlees' of 'zuivel'.",
      },
    },
    {
      name: "description",
      type: "textarea",
      label: "Beschrijving",
    },
    {
      name: "icon",
      type: "select",
      label: "Icoon",
      defaultValue: "shopping-bag",
      options: [
        { label: "Vlees", value: "beef" },
        { label: "Zuivel", value: "milk" },
        { label: "Bier", value: "beer" },
        { label: "Brood", value: "wheat" },
        { label: "Eieren", value: "egg" },
        { label: "Honing", value: "honey" },
        { label: "Kaas", value: "cheese" },
        { label: "Wijn", value: "wine" },
        { label: "Groenten", value: "carrot" },
        { label: "Fruit", value: "apple" },
        { label: "Algemeen winkeltje", value: "shopping-bag" },
      ],
    },
    {
      name: "color",
      type: "select",
      label: "Accentkleur",
      defaultValue: "groen",
      options: [
        { label: "Groen (gras)", value: "groen" },
        { label: "Paars", value: "paars" },
        { label: "Oranje", value: "oranje" },
        { label: "Blauw", value: "blauw" },
        { label: "Crème", value: "creme" },
      ],
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Categorie-afbeelding",
    },
    {
      name: "order",
      type: "number",
      label: "Volgorde",
      defaultValue: 100,
      admin: {
        description: "Lager getal = hoger in de lijst.",
      },
    },
    {
      name: "active",
      type: "checkbox",
      label: "Zichtbaar in winkel",
      defaultValue: true,
    },
  ],
};
