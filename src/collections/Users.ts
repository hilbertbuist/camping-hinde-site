import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Gebruiker", plural: "Gebruikers" },
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role"],
    group: "Admin",
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
      name: "role",
      type: "select",
      label: "Rol",
      defaultValue: "admin",
      required: true,
      options: [
        { label: "Beheerder (volledige toegang)", value: "admin" },
        { label: "Personeel (beperkt)", value: "staff" },
      ],
    },
  ],
};
