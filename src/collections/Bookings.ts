import type { CollectionConfig } from "payload";

export const Bookings: CollectionConfig = {
  slug: "bookings",
  labels: { singular: "Boeking", plural: "Boekingen" },
  admin: {
    useAsTitle: "reference",
    defaultColumns: ["reference", "guestName", "campsiteNumber", "arrival", "departure", "status"],
    group: "Gasten",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "reference",
      type: "text",
      label: "Boekingsnummer",
      required: true,
      unique: true,
      admin: {
        description: "Het nummer dat de gast in z'n bevestigingsmail heeft.",
      },
    },
    {
      name: "guestName",
      type: "text",
      label: "Naam hoofdgast",
      required: true,
    },
    {
      name: "guestLastName",
      type: "text",
      label: "Achternaam (voor login-koppeling)",
      required: true,
    },
    {
      name: "email",
      type: "email",
      label: "E-mail",
    },
    {
      name: "phone",
      type: "text",
      label: "Telefoon",
    },
    {
      name: "campsiteNumber",
      type: "text",
      label: "Campingplaats- of accommodatienummer",
      admin: {
        description: "Bijv. '7' of 'Safaritent' of 'Hindehut-1'. Gasten kunnen hiermee inloggen in de app.",
      },
    },
    {
      name: "arrival",
      type: "date",
      label: "Aankomst",
      required: true,
    },
    {
      name: "departure",
      type: "date",
      label: "Vertrek",
      required: true,
    },
    {
      name: "guests",
      type: "number",
      label: "Aantal gasten",
      defaultValue: 2,
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      defaultValue: "active",
      options: [
        { label: "Actief (gast is hier)", value: "active" },
        { label: "Aankomend", value: "upcoming" },
        { label: "Afgesloten", value: "closed" },
        { label: "Geannuleerd", value: "cancelled" },
      ],
    },
    {
      name: "externalSource",
      type: "select",
      label: "Bron",
      defaultValue: "manual",
      options: [
        { label: "Handmatig ingevoerd", value: "manual" },
        { label: "uwboeking.com", value: "uwboeking" },
        { label: "Direct via website", value: "website" },
      ],
    },
    {
      name: "notes",
      type: "textarea",
      label: "Notities",
    },
  ],
};
