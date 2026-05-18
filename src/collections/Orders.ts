import type { CollectionConfig } from "payload";

export const Orders: CollectionConfig = {
  slug: "orders",
  labels: { singular: "Bestelling", plural: "Bestellingen" },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["id", "type", "guestType", "total", "paymentStatus", "createdAt"],
    group: "Winkel",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "type",
      type: "select",
      label: "Type",
      required: true,
      options: [
        { label: "Winkel-bestelling", value: "shop" },
        { label: "Broodjes-bestelling", value: "bread" },
      ],
    },
    {
      name: "guestType",
      type: "select",
      label: "Gast-type",
      required: true,
      options: [
        { label: "Campinggast", value: "camper" },
        { label: "Passant", value: "passant" },
      ],
    },
    {
      name: "booking",
      type: "relationship",
      relationTo: "bookings",
      label: "Gekoppelde boeking",
      admin: {
        condition: (data) => data?.guestType === "camper",
      },
    },
    {
      name: "shopItems",
      type: "array",
      label: "Producten",
      admin: {
        condition: (data) => data?.type === "shop",
      },
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        { name: "quantity", type: "number", required: true, defaultValue: 1 },
        { name: "priceAtPurchase", type: "number", required: true },
        { name: "name", type: "text", required: true },
      ],
    },
    {
      name: "breadItems",
      type: "array",
      label: "Broodjes",
      admin: {
        condition: (data) => data?.type === "bread",
      },
      fields: [
        {
          name: "item",
          type: "relationship",
          relationTo: "bread-items",
          required: true,
        },
        { name: "quantity", type: "number", required: true, defaultValue: 1 },
        { name: "priceAtPurchase", type: "number", required: true },
        { name: "name", type: "text", required: true },
      ],
    },
    {
      name: "deliveryDate",
      type: "date",
      label: "Bezorgdatum",
      admin: {
        condition: (data) => data?.type === "bread",
        description: "Voor broodjes: ochtend van bezorging.",
      },
    },
    {
      name: "total",
      type: "number",
      label: "Totaal (€)",
      required: true,
      min: 0,
      admin: { step: 0.01 },
    },
    {
      name: "paymentMethod",
      type: "select",
      label: "Betaalwijze",
      defaultValue: "mollie",
      options: [
        { label: "Direct via Mollie", value: "mollie" },
        { label: "Op rekening (campinggast)", value: "tab" },
      ],
    },
    {
      name: "paymentStatus",
      type: "select",
      label: "Betaalstatus",
      defaultValue: "open",
      options: [
        { label: "Open (te betalen)", value: "open" },
        { label: "Betaald", value: "paid" },
        { label: "Op rekening (open tab)", value: "tab" },
        { label: "Mislukt", value: "failed" },
        { label: "Geannuleerd", value: "cancelled" },
      ],
    },
    {
      name: "molliePaymentId",
      type: "text",
      label: "Mollie betaal-ID",
      admin: { readOnly: true },
    },
    {
      name: "molliePaymentUrl",
      type: "text",
      label: "Mollie betaal-URL",
      admin: { readOnly: true },
    },
    {
      name: "guestEmail",
      type: "email",
      label: "E-mail (voor bon)",
    },
    {
      name: "guestNote",
      type: "textarea",
      label: "Opmerking van gast",
    },
    {
      name: "fulfilled",
      type: "checkbox",
      label: "Afgehandeld",
      defaultValue: false,
    },
  ],
};
