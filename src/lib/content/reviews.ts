export type Review = {
  name: string;
  date: string;
  stars: 1 | 2 | 3 | 4 | 5;
  quote: string;
  accommodation?: string;
};

export const reviews: Review[] = [
  {
    name: "Familie Van der Berg",
    date: "Augustus 2025",
    stars: 5,
    quote:
      "We kwamen voor een lang weekend en bleven uiteindelijk tien dagen. De kinderen liepen elke ochtend naar de kippen, naar de boer, terug naar het kampvuur. Niets te doen, alles te beleven.",
    accommodation: "Kampeerplaats",
  },
  {
    name: "Sanne en Mark",
    date: "Juni 2025",
    stars: 5,
    quote:
      "De safaritent overtrof onze verwachtingen. Echt een huiskamer onder canvas, met alle gemakken. René en Dora maken je meteen onderdeel van het bedrijf, zonder dat het opdringerig is.",
    accommodation: "Safaritent",
  },
  {
    name: "Familie De Vries",
    date: "Mei 2025",
    stars: 5,
    quote:
      "Onze kinderen praten er nog steeds over. De koe-safari, eieren rapen, marshmallows boven het vuur. Geen animatieteam, maar wel echt vakantie. Wij komen terug.",
    accommodation: "Hindehut",
  },
  {
    name: "Henk en Mieke",
    date: "September 2024",
    stars: 5,
    quote:
      "Als oudere bezoekers waarderen wij de rust. Geen herrie, geen drukte, wel een knipoog van de buurman naast je en een praatje met de boer als je dat wilt.",
    accommodation: "Hooiberghut",
  },
  {
    name: "Familie Janssen",
    date: "Juli 2024",
    stars: 5,
    quote:
      "De stalloon was ideaal voor ons familieweekend. Met dertig man droog onder dak, eigen keuken, eigen sfeer. Volgend jaar weer.",
    accommodation: "Stalloon",
  },
];

export const reviewStats = {
  count: 2000,
  average: 4.9,
} as const;
