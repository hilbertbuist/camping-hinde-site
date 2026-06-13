import type { CollectionConfig } from "payload";

export const Activities: CollectionConfig = {
  slug: "activities",
  labels: { singular: "Activiteit", plural: "Activiteiten" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "startTime", "active"],
    group: "Camping",
    description: "Het animatieprogramma met activiteiten voor campinggasten.",
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
      name: "description",
      type: "textarea",
      label: "Omschrijving",
    },
    {
      name: "date",
      type: "date",
      label: "Datum",
      required: true,
      admin: {
        date: { pickerAppearance: "dayOnly" },
      },
    },
    {
      name: "startTime",
      type: "text",
      label: "Begintijd",
      admin: { placeholder: "bv. 14:00" },
    },
    {
      name: "endTime",
      type: "text",
      label: "Eindtijd",
    },
    {
      name: "location",
      type: "text",
      label: "Locatie",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Foto",
    },
    {
      name: "active",
      type: "checkbox",
      label: "Actief",
      defaultValue: true,
    },
    {
      name: "order",
      type: "number",
      label: "Volgorde",
      defaultValue: 100,
      admin: { hidden: true },
    },
  ],
};

export default Activities;
