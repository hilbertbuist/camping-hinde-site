import { img } from "./images";

export type Surrounding = {
  name: string;
  category: "natuur" | "stad" | "attractie" | "water";
  distance: string;
  distanceKm: number;
  description: string;
  image?: string;
  url?: string;
};

export const surroundings: Surrounding[] = [
  {
    name: "Veluwemeer",
    category: "water",
    distance: "4 km",
    distanceKm: 4,
    description:
      "Op de fiets in een kwartier bij het water. Strandje, surfen, suppen of gewoon de voeten erin.",
    image: img.dronterstrand,
  },
  {
    name: "Bos van Roggebot",
    category: "natuur",
    distance: "3 km",
    distanceKm: 3,
    description:
      "Wandelen door bossen en lanen, leuke speelbossen voor de kinderen. Ook met de hond fijn.",
  },
  {
    name: "Elburg",
    category: "stad",
    distance: "8 km",
    distanceKm: 8,
    description:
      "Vestingstadje met grachten, een oude scheepswerf en zonnige terrasjes. Perfecte regen-back-up.",
    image: img.elburg,
  },
  {
    name: "Walibi Holland",
    category: "attractie",
    distance: "12 km",
    distanceKm: 12,
    description:
      "De grote attractieparken-dag. Vroeg de auto in, laat terug bij het kampvuur.",
  },
  {
    name: "Dolfinarium Harderwijk",
    category: "attractie",
    distance: "18 km",
    distanceKm: 18,
    description:
      "Een dag voor de dieren-fans in het gezin. Combineren met de oude binnenstad maakt het rond.",
  },
  {
    name: "Dronten centrum",
    category: "stad",
    distance: "2 km",
    distanceKm: 2,
    description:
      "Voor de boodschappen, een ijsje of een markt op zaterdag. Ook leuk: het Meerpaal Theater.",
    image: img.dronten,
  },
  {
    name: "Hanzestad Kampen",
    category: "stad",
    distance: "15 km",
    distanceKm: 15,
    description:
      "Mooie gevels, IJsselkade, sigarenmuseum en goede koffie. Combineer met een fietstocht over de dijk.",
    image: img.kampen,
  },
];
