import type { CollectionConfig } from "payload";

export const Suppliers: CollectionConfig = {
  slug: "suppliers",
  labels: { singular: "Leverancier", plural: "Leveranciers" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "mailTime", "orderDeadline", "active"],
    group: "Beheer",
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
      name: "email",
      type: "email",
      label: "E-mail",
      required: true,
    },
    {
      name: "mailTime",
      type: "text",
      label: "Verstuurtijd",
      defaultValue: "06:00",
      admin: {
        description: "Tijd waarop de bestelmail wordt verstuurd, HH:MM",
      },
    },
    {
      name: "orderDeadline",
      type: "text",
      label: "Bestel-deadline",
      defaultValue: "20:00",
    },
    {
      name: "ccOwner",
      type: "checkbox",
      label: "Kopie naar eigenaar",
      defaultValue: true,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Actief",
      defaultValue: true,
    },
    {
      name: "notes",
      type: "textarea",
      label: "Notities",
    },
  ],
};

export default Suppliers;
