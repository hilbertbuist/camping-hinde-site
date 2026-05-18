export type Tariff = {
  category: string;
  name: string;
  price: number | string;
  unit: string;
  note?: string;
};

export const tariffs: Tariff[] = [
  {
    category: "Kampeerplaats",
    name: "Kampeerplaats per nacht (2 personen)",
    price: 24,
    unit: "per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Extra persoon",
    price: 5,
    unit: "per persoon, per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Kind (4-12 jaar)",
    price: 3.5,
    unit: "per kind, per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Hond",
    price: 3,
    unit: "per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Stroom 6A",
    price: 4.5,
    unit: "per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Stroom 8A",
    price: 5.5,
    unit: "per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Stroom 10A",
    price: 6.5,
    unit: "per nacht",
  },
  {
    category: "Kampeerplaats",
    name: "Toeristenbelasting",
    price: 1.6,
    unit: "per persoon, per nacht",
  },
  {
    category: "Accommodatie",
    name: "Safaritent (4 personen)",
    price: 95,
    unit: "per nacht",
    note: "Minimaal 2 nachten",
  },
  {
    category: "Accommodatie",
    name: "Hindehut (4 personen)",
    price: 75,
    unit: "per nacht",
    note: "Minimaal 2 nachten",
  },
  {
    category: "Accommodatie",
    name: "Hooiberghut (4 personen)",
    price: 75,
    unit: "per nacht",
    note: "Minimaal 2 nachten",
  },
  {
    category: "Extra",
    name: "Verse broodjes (per stuk)",
    price: 1.2,
    unit: "per broodje",
    note: "Bestellen voor 19:00, ophalen 8:30",
  },
  {
    category: "Extra",
    name: "Eieren van eigen kippen (per zes)",
    price: 2.5,
    unit: "per zes",
  },
];
