export const site = {
  name: "Boerderijcamping De Hinde",
  shortName: "De Hinde",
  tagline: "Boerderijcamping in Flevoland",
  url: "https://www.campingdehinde.nl",
  owners: "René en Dora Buist",
  ownersLine: "René en Dora Buist, derde generatie boer",
  founded: 2010,
  established: "Sinds 2010",

  address: {
    street: "Stobbenweg 6",
    postal: "8251 PX",
    city: "Dronten",
    country: "Nederland",
    region: "Flevoland",
  },

  contact: {
    tel: "0321-317669",
    telAlt: "06-49535458",
    telLink: "+31321317669",
    telAltLink: "+31649535458",
    email: "info@campingdehinde.nl",
  },

  social: {
    facebook: "https://www.facebook.com/campingdehinde",
    facebookHandle: "campingdehinde",
    instagram: "https://www.instagram.com/camping_dehinde_dronten",
    instagramHandle: "camping_dehinde_dronten",
  },

  memberships: [
    { name: "Vekabo", url: "https://www.vekabo.nl" },
    { name: "In het Groen", url: "https://www.inhetgroen.nl" },
  ],

  openingsperiode: "april t/m oktober",
  stalloonNote: "Stalloon (recreatieruimte) is het hele jaar door beschikbaar voor groepen",

  geo: {
    lat: 52.5286,
    lng: 5.6603,
  },

  kvk: "65548221",
} as const;

export type Site = typeof site;
