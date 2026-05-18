import { img } from "./images";

export type Activity = {
  title: string;
  icon: "egg" | "tractor" | "fire" | "horse" | "rabbit" | "trees";
  description: string;
  image?: string;
};

export const activities: Activity[] = [
  {
    title: "Eieren rapen voor het ontbijt",
    icon: "egg",
    description:
      "De kippen leggen het hele jaar door. Mandje pakken, de hennen zoeken.",
    image: img.kippen,
  },
  {
    title: "Op koe-safari met de boer",
    icon: "tractor",
    description:
      "René rijdt regelmatig een rondje over het land. Spring achterop, je ziet meer dan je denkt.",
    image: img.tractorplay,
  },
  {
    title: "Kampvuur als de zon zakt",
    icon: "fire",
    description:
      "Een eigen vuurplek per accommodatie. Marshmallows niet vergeten.",
    image: img.lente,
  },
];

export type FarmAnimal = {
  name: string;
  description: string;
  image: string;
};

export const farmAnimals: FarmAnimal[] = [
  {
    name: "Pony's",
    description:
      "Drie pony's met elk hun eigen karakter. Aaien mag, na een hapje hooi nog liever.",
    image: img.pony,
  },
  {
    name: "Kippen en hanen",
    description:
      "Eigen ren met scharrelkippen. Verse eieren elke ochtend in de boerderijwinkel.",
    image: img.kippen,
  },
  {
    name: "Geiten",
    description:
      "Nieuwsgierig en gezellig. De kinderen aaien eerst, daarna willen ze niet meer weg.",
    image: img.geitAaien,
  },
  {
    name: "Konijnen",
    description:
      "Knuffelconijnen, letterlijk. De zachtste introductie tot het boerenleven.",
    image: img.konijnAaien,
  },
];
