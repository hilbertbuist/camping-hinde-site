import type { CollectionConfig } from "payload";

export const Settings: CollectionConfig = {
  slug: "settings",
  labels: { singular: "Instelling", plural: "Instellingen" },
  admin: {
    group: "Beheer",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "opRekeningEnabled",
      type: "checkbox",
      label: "Op rekening toestaan",
      defaultValue: false,
      admin: {
        description:
          "Laat gasten broodjes/winkel op de rekening (tab) zetten i.p.v. direct betalen.",
      },
    },
    {
      name: "molliePaymentMode",
      type: "select",
      label: "Mollie modus",
      defaultValue: "test",
      options: [
        { label: "Test", value: "test" },
        { label: "Live", value: "live" },
      ],
      admin: {
        description: "Test = proefbetalingen. Live = echte betalingen.",
      },
    },
    {
      name: "shopOpen",
      type: "checkbox",
      label: "Winkel open",
      defaultValue: true,
    },
  ],
};
