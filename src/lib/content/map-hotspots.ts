/**
 * Coördinaten zijn percentages (0-100) van de afbeelding.
 * Pas zo nodig aan zodra de plattegrond is bijgewerkt.
 */

export type HotspotType =
  | "accommodation"
  | "facility"
  | "animal"
  | "kids"
  | "field"
  | "parking";

export type Hotspot = {
  id: string;
  type: HotspotType;
  x: number;
  y: number;
  label: string;
  description?: string;
  link?: string;
  number?: number;
};

export const hotspots: Hotspot[] = [
  // VERHUURACCOMMODATIES (rode cirkels met nummer)
  {
    id: "hindehut",
    type: "accommodation",
    number: 1,
    x: 14,
    y: 65,
    label: "De Hindehut",
    description: "Knus houten huisje voor 4 personen. Eigen badkamer en keuken.",
    link: "/verblijf/hindehut",
  },
  {
    id: "hooiberghut",
    type: "accommodation",
    number: 2,
    x: 17,
    y: 48,
    label: "Hooiberghut 'Het Hert'",
    description: "Karakteristieke ronde hut, 5 personen, eigen sfeer.",
    link: "/verblijf/hooiberghut",
  },
  {
    id: "safaritent-kiekendief",
    type: "accommodation",
    number: 3,
    x: 32,
    y: 5,
    label: "Safaritent 'De Kiekendief'",
    description: "Glamping voor 6 personen, eigen veranda en houtkachel.",
    link: "/verblijf/safaritent",
  },
  {
    id: "safaritent-graspieper",
    type: "accommodation",
    number: 4,
    x: 47,
    y: 5,
    label: "Safaritent 'De Graspieper'",
    description: "Glamping voor 6 personen, eigen veranda en houtkachel.",
    link: "/verblijf/safaritent",
  },
  {
    id: "safaritent-buizerd",
    type: "accommodation",
    number: 5,
    x: 58,
    y: 6,
    label: "Safaritent 'De Buizerd'",
    description: "Glamping voor 6 personen, eigen veranda en houtkachel.",
    link: "/verblijf/safaritent",
  },

  // KAMPEERVELDEN (vogels) — top half
  { id: "f-grutto", type: "field", x: 22, y: 22, label: "Grutto veld" },
  { id: "f-kievit", type: "field", x: 31, y: 22, label: "Kievit veld" },
  { id: "f-tureluur", type: "field", x: 41, y: 12, label: "Tureluur veld" },
  { id: "f-zwaluw", type: "field", x: 63, y: 16, label: "Zwaluw veld" },
  { id: "f-reiger", type: "field", x: 67, y: 25, label: "Reiger veld" },
  { id: "f-mus", type: "field", x: 62, y: 32, label: "Mus veld" },

  // KAMPEERVELDEN (gewassen) — bottom half left
  { id: "f-zilverui", type: "field", x: 25, y: 47, label: "Zilverui veld" },
  { id: "f-wortel", type: "field", x: 30, y: 47, label: "Wortel veld" },
  { id: "f-luzerne", type: "field", x: 36, y: 47, label: "Luzerne veld" },
  { id: "f-tarwe", type: "field", x: 36, y: 53, label: "Tarwe veld" },
  { id: "f-aardappel", type: "field", x: 36, y: 59, label: "Aardappel veld" },
  { id: "f-witof", type: "field", x: 31, y: 62, label: "Witof veld" },
  { id: "f-bonen", type: "field", x: 22, y: 65, label: "Bonen veld" },
  { id: "f-erwten", type: "field", x: 18, y: 60, label: "Erwten veld" },
  { id: "f-mais", type: "field", x: 17, y: 53, label: "Maïs veld" },

  // FACILITEITEN (blauwe cirkels)
  {
    id: "fac-toiletten",
    type: "facility",
    number: 1,
    x: 38,
    y: 75,
    label: "Toiletten",
    description: "Schoon en ruim sanitair.",
  },
  {
    id: "fac-douches",
    type: "facility",
    number: 2,
    x: 36,
    y: 75,
    label: "Douches",
    description: "Met familiedouche en opstapje voor de kleintjes.",
  },
  {
    id: "fac-afwas",
    type: "facility",
    number: 3,
    x: 39,
    y: 80,
    label: "Afwasplaats",
    description: "Vaatwasruimte met warm water.",
  },
  {
    id: "fac-recreatie",
    type: "facility",
    number: 4,
    x: 60,
    y: 80,
    label: "Recreatieruimte / Stalloon / EHBO",
    description: "De stalloon: tot 50 personen, hele jaar door beschikbaar voor groepen.",
    link: "/boerderij/stalloon",
  },
  {
    id: "fac-wasserette",
    type: "facility",
    number: 5,
    x: 33,
    y: 73,
    label: "Wasserette",
    description: "Wasmachine en droger.",
  },
  {
    id: "fac-stortplaats",
    type: "facility",
    number: 6,
    x: 47,
    y: 60,
    label: "Stortplaats chemisch toilet",
  },

  // VOOR DE KINDEREN (paarse cirkels)
  {
    id: "kids-skelters",
    type: "kids",
    number: 1,
    x: 53,
    y: 67,
    label: "Skelters & traptrekkers",
    description: "Onze skelterbaan over het sportveld.",
  },
  {
    id: "kids-strohoek",
    type: "kids",
    number: 2,
    x: 18,
    y: 45,
    label: "Stro-stro indoor speelhoek",
    description: "Indoor klauteren in het stro, ook bij regen.",
  },
  {
    id: "kids-water",
    type: "kids",
    number: 3,
    x: 49,
    y: 73,
    label: "Water- en zandspeelhoek",
    description: "Pomp, modder, schepjes — dat hele werk.",
  },
  {
    id: "kids-singelpretpad",
    type: "kids",
    number: 4,
    x: 64,
    y: 68,
    label: "Singel pretpad",
    description: "Ontdekkingspad door de bosrand.",
  },
  {
    id: "kids-bandentunnel",
    type: "kids",
    number: 5,
    x: 27,
    y: 68,
    label: "Bandentunnel",
  },
  {
    id: "kids-sportveld",
    type: "kids",
    number: 6,
    x: 65,
    y: 90,
    label: "Sportveld",
    description: "Voetballen, volleyballen, tussen de tenten en de luchten.",
  },

  // DIEREN (oranje cirkels)
  {
    id: "dier-kleindieren",
    type: "animal",
    number: 1,
    x: 30,
    y: 73,
    label: "Kleindieren-verzorg schuur",
    description: "Konijnen, kuikens — aaien en knuffelen mag.",
    link: "/boerderij/dieren",
  },
  {
    id: "dier-kippen",
    type: "animal",
    number: 2,
    x: 26,
    y: 78,
    label: "Kippen scharrelveld",
    description: "Verse eieren elke ochtend in de boerderijwinkel.",
    link: "/boerderij/dieren",
  },
  {
    id: "dier-pony",
    type: "animal",
    number: 3,
    x: 33,
    y: 83,
    label: "Pony verzorg schuur",
    description: "Drie pony's met elk hun eigen karakter.",
    link: "/boerderij/dieren",
  },
  {
    id: "dier-geiten",
    type: "animal",
    number: 4,
    x: 65,
    y: 78,
    label: "Geitenweide",
    description: "Nieuwsgierig en gezellig — de kinderen willen niet meer weg.",
    link: "/boerderij/dieren",
  },
  {
    id: "dier-pony-weide",
    type: "animal",
    number: 5,
    x: 66,
    y: 92,
    label: "Pony weide",
    description: "Ruim grasveld voor de pony's.",
    link: "/boerderij/dieren",
  },

  // PARKEERPLAATSEN
  { id: "p-noord", type: "parking", x: 8, y: 22, label: "Parkeerplaats noord" },
  { id: "p-zuid", type: "parking", x: 11, y: 78, label: "Parkeerplaats zuid" },
];

/**
 * Animatie-zones: gebieden waar dieren rond scharrelen.
 * Coördinaten zijn relatief aan de container (% van breedte/hoogte).
 */
export type AnimationZone = {
  id: string;
  animal: "chicken" | "goat" | "pony";
  count: number;
  x: number; // top-left
  y: number;
  width: number;
  height: number;
};

export const animationZones: AnimationZone[] = [
  // Kippen scharrelveld (linksonder, rond de boerderijgebouwen)
  {
    id: "kippen-zone",
    animal: "chicken",
    count: 4,
    x: 22,
    y: 75,
    width: 12,
    height: 8,
  },
  // Geitenweide (midden-rechts)
  {
    id: "geiten-zone",
    animal: "goat",
    count: 2,
    x: 60,
    y: 76,
    width: 10,
    height: 8,
  },
  // Ponyweide (rechtsonder)
  {
    id: "pony-zone",
    animal: "pony",
    count: 1,
    x: 60,
    y: 88,
    width: 12,
    height: 8,
  },
];
