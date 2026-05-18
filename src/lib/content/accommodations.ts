import { img } from "./images";

export type Accommodation = {
  slug: string;
  name: string;
  shortName: string;
  type: "kampeerplaats" | "safaritent" | "huisje";
  badge?: string;
  badgeStyle?: "popular" | "default";
  priceFrom: number;
  priceUnit: string;
  capacity: number;
  shortDescription: string;
  description: string;
  faciliteiten: string[];
  heroImage: string;
  gallery: string[];
  floorPlan?: string;
  seasons: string;
  // Detail-page extras
  intro?: string;
  voorzieningenBinnen?: string[];
  voorzieningenBuiten?: string[];
  voorzieningenSanitair?: string[];
  tarieven?: { periode: string; perNacht: string; perWeek?: string }[];
  bijkomendeKosten?: string[];
  optioneel?: string[];
  inbegrepen?: string[];
  voorwaarden?: string[];
  sfeer?: string;
};

export const accommodations: Accommodation[] = [
  {
    slug: "safaritent",
    name: "Safaritent",
    shortName: "Safaritent",
    type: "safaritent",
    badge: "Populair bij gezinnen",
    badgeStyle: "popular",
    priceFrom: 95,
    priceUnit: "per nacht",
    capacity: 6,
    shortDescription:
      "Glamping in een complete tent met houten details, eigen toilet, twee slaapcabines en complete keuken. Voor maximaal 6 personen.",
    description:
      "Twee grote safaritenten op het mooiste deel van het terrein. De houten details en de oprolbare voorkant geven het echte buitengevoel, het comfort binnen maakt het thuis. Bij aankomst staat alles klaar: het bed is opgemaakt, de keuken is uitgerust, en je kunt direct met vakantie beginnen.\n\nSlaapt comfortabel zes personen. Een tweepersoonsbed (140x200) in een aparte slaapcabine, plus twee stapelbedden in de tweede cabine. Alle bedden inclusief dekens en kussens, linnen erbij te boeken. In de tent vind je een complete keuken met inductie kookplaat, koelkast, koffiezetapparaat en waterkoker. Een zit/eethoek voor zes personen, een eigen toilet en een gezellige veranda met meubilair voor de avonden buiten.",
    faciliteiten: [
      "Slaapt 6 personen",
      "Eigen toilet",
      "Volledige keuken met inductie",
      "Twee slaapcabines",
      "Veranda met meubilair",
      "Elektrische straalkachel",
      "Volledige keukeninventaris",
      "Eindschoonmaak inbegrepen",
    ],
    heroImage: "/images/photos/safaritent-veranda-met-zonsondergang.jpg",
    gallery: [
      "/images/photos/safaritent-veranda-met-zonsondergang.jpg",
      "/images/photos/safaritent-de-buizerd-met-fietsen-buiten.jpg",
      "/images/photos/safaritent-interieur-slaapkamer-met-stapelbed.jpg",
      "/images/photos/kampeerveld-met-safaritenten-en-blauwe-lucht.jpg",
      "/images/photos/Safaritent/safaritent-keukenhoek-met-kookplaat-en-gootsteen.jpg",
      "/images/photos/Safaritent/safaritent-veranda-met-twee-stoelen-en-uitzicht.jpg",
      "/images/photos/Safaritent/safaritent-twee-tenten-met-uitzicht-op-velden.jpg",
    ],
    seasons: "april t/m oktober",
    voorzieningenBinnen: [
      "Slaapcabine met tweepersoonsbed (140x200)",
      "Slaapcabine met 2 stapelbedden (80x200)",
      "Zit-/eethoek met zes stoelen",
      "Eigen toilet",
      "Elektrische straalkachel",
      "Keukenblok met stromend warm en koud water",
      "4-pits inductie kookplaat (thermisch beveiligd)",
      "Koelkast",
      "Koffiezetapparaat (snelfilter) en waterkoker",
      "Volledige keukeninventaris (pannenset, servies, bestek)",
      "Schoonmaakset (stoffer en blik, emmer, dweil, bezem, afwasteiltje)",
      "Afvalemmer",
      "Lichtpunten en wandcontactdozen",
    ],
    voorzieningenBuiten: [
      "Veranda met meubilair",
      "Plek voor een vuurkorf (op aanvraag)",
    ],
    voorzieningenSanitair: [
      "Gedeelde douches in centraal sanitairgebouw, op loopafstand met vloerverwarming en thermostaatkraan",
    ],
    tarieven: [
      { periode: "Laagseizoen (apr-jun, sep-okt)", perNacht: "vanaf €95", perWeek: "vanaf €595" },
      { periode: "Middenseizoen (juni, augustus)", perNacht: "vanaf €115", perWeek: "vanaf €725" },
      { periode: "Hoogseizoen (juli)", perNacht: "vanaf €145", perWeek: "vanaf €925" },
    ],
    bijkomendeKosten: [
      "Per persoon (incl. toeristenbelasting): €3,70 p.p.p.d.",
      "Linnenpakket (verplicht): €10 p.p. (dekbedovertrek, kussensloop, hoeslaken)",
    ],
    optioneel: [
      "Handdoekenpakket: €4 p.p. (1 handdoek p.p. per nacht, washandje, keuken/theedoeken)",
      "Kinderpakket: €10 p.k.p.n. (kinderstoel + campingbedje met beddengoed)",
      "Bezoek: €2 p.p.p.d.",
    ],
    inbegrepen: [
      "Gas, water, elektra",
      "Warm water/douche in centraal gebouw",
      "Gratis WiFi",
      "Afvalstoffenheffing",
      "Eindschoonmaak",
    ],
    voorwaarden: [
      "Niet roken in de tent",
      "Geen huisdieren",
      "Linnenpakket verplicht",
      "Aankomst vanaf 15:00, vertrek voor 12:00",
      "Algemene voorwaarden Vekabo van toepassing",
    ],
    sfeer:
      "Onze populairste accommodatie. In juli en augustus al maanden van tevoren volgeboekt, dus tijdig reserveren is verstandig.",
  },
  {
    slug: "duolodge",
    name: "Duolodge",
    shortName: "Duolodge",
    type: "safaritent",
    badge: "Voor 2 personen",
    priceFrom: 65,
    priceUnit: "per nacht",
    capacity: 2,
    shortDescription:
      "Onze kleinere safaritent voor twee personen, ideaal voor doorreizigers of een romantische ontsnapping.",
    description:
      "Een knusse safaritent met dezelfde houten details en oprolbare voorkant als haar grotere zus, maar dan in een compactere versie. Twee eenpersoonsbedden, een eigen veranda en alles wat je nodig hebt voor een paar nachten of een hele week.\n\nIdeaal voor stellen die iets anders willen dan een hotel, voor doorreizigers die even tot rust willen komen, of voor logés van vaste gasten. Stroom, water in de buurt, WiFi en alle camping-faciliteiten binnen handbereik.",
    faciliteiten: [
      "Voor 2 personen",
      "Twee eenpersoonsbedden",
      "Eigen veranda",
      "Servies & bestek voor 2",
      "Koelkast (in wasserette naast tent)",
      "Koffiezetapparaat & waterkoker",
      "Watertappunt op het veld",
      "WiFi",
    ],
    heroImage: "/images/photos/Safaritent/safaritent-duolodge-met-open-ingang-en-stoelen.jpg",
    gallery: [
      "/images/photos/Safaritent/safaritent-duolodge-met-open-ingang-en-stoelen.jpg",
      "/images/photos/Safaritent/safaritent-duolodge-met-gesloten-zijflappen.jpg",
      "/images/photos/Safaritent/safaritent-stel-zittend-op-veranda-in-zon.jpg",
      "/images/photos/Safaritent/safaritent-veranda-houten-reling-zijaanzicht.jpg",
      "/images/photos/Safaritent/safaritent-buitenkant-met-windmolen-op-achtergrond.jpg",
    ],
    seasons: "april t/m oktober",
    voorzieningenBinnen: [
      "Slaapcabine met twee eenpersoonsbedden (of op verzoek aaneengeschoven tot tweepersoonsbed)",
      "Servies en bestek voor twee personen",
      "Koffiezetapparaat en waterkoker",
      "Afwasteil",
      "Elektrische hapjespan",
      "Koelkast (in de wasserette-ruimte naast de tent)",
      "Wandcontactdozen",
      "Nachtlampje",
    ],
    voorzieningenBuiten: [
      "Veranda met twee terrasstoelen",
      "Buitenverlichting",
      "Watertappunt op het veld",
      "WiFi",
    ],
    tarieven: [
      { periode: "Laagseizoen", perNacht: "vanaf €65" },
      { periode: "Middenseizoen", perNacht: "vanaf €75" },
      { periode: "Hoogseizoen", perNacht: "vanaf €85" },
    ],
    bijkomendeKosten: [
      "Linnenpakket (verplicht): €10 p.p.",
      "Toeristenbelasting: €1,75 p.p.p.n.",
    ],
    voorwaarden: [
      "Niet roken",
      "Geen huisdieren",
      "Aankomst vanaf 15:00, vertrek voor 12:00",
    ],
    sfeer:
      "Voor stellen, doorreizigers en logés die alle voorzieningen van een grote safaritent willen, in een knussere vorm.",
  },
  {
    slug: "hindehut",
    name: "Hindehut",
    shortName: "Hindehut",
    type: "huisje",
    priceFrom: 75,
    priceUnit: "per nacht",
    capacity: 4,
    shortDescription:
      "Knus houten huisje naast het campingveld. Twee slaapvertrekken, eigen keukenblok, veranda met uitzicht op de bossingel.",
    description:
      "De Hindehut staat naast het campingveld, tegen de bossingel aan. Een compacte vakantiewoning, gebouwd met liefde voor het materiaal en het karakter. Twee aparte slaapvertrekken, een woon-/eetkamer met keukenblok, en een veranda met terrasmeubilair waar je 's ochtends rustig je koffie drinkt terwijl het dauw nog op het gras ligt.\n\nSlaapt comfortabel vier personen: een tweepersoonsbed in het ene vertrek, twee eenpersoonsbedden in het andere. Bij meer dan vier personen is het mogelijk om naast de hut maximaal twee bijzettentjes te plaatsen.",
    faciliteiten: [
      "4 slaapplaatsen",
      "Twee slaapvertrekken",
      "Eigen keukenblok met warm water",
      "Elektrische verwarming",
      "Veranda met terrasmeubilair",
      "Standaard keukeninventaris",
      "Koelkast",
      "Bedden incl. dekens en kussens",
    ],
    heroImage: "/images/photos/hindehut-buitenkant-met-vlinderstruik-en-terras.jpg",
    gallery: [
      "/images/photos/hindehut-buitenkant-met-vlinderstruik-en-terras.jpg",
      "/images/photos/hindehut-houten-terras-met-tafel-en-stoelen.jpg",
      "/images/photos/Hindehut/hindehut-eethoek-met-pallethout-en-hertenposters.jpg",
      "/images/photos/Hindehut/hindehut-houten-terras-met-vlinderstruik.jpg",
      "/images/photos/Hindehut/hindehut-interieur-met-keuken-en-twee-bedden.jpg",
      "/images/photos/Hindehut/hindehut-overzicht-met-eettafel-en-keuken.jpg",
      "/images/photos/Hindehut/hindehut-zijaanzicht-met-paarse-vlinderstruik.jpg",
    ],
    floorPlan: img.hindehutPlan,
    seasons: "april t/m oktober",
    voorzieningenBinnen: [
      "Twee slaapvertrekken (1x tweepersoonsbed, 2x eenpersoonsbed)",
      "Zit-/eethoek",
      "Elektrische verwarming",
      "Keukenblok met warm water",
      "2-pits elektrische kookplaat",
      "Koelkast",
      "Koffiezetapparaat en waterkoker",
      "Standaard keukeninventaris",
      "Bedden inclusief dekens en kussens (linnen verplicht bij te boeken)",
    ],
    voorzieningenBuiten: ["Veranda met terrasmeubilair"],
    voorzieningenSanitair: [
      "Gedeelde douches en wc's in centraal sanitairgebouw op loopafstand. Eigen sanitair niet aanwezig in de Hindehut.",
    ],
    tarieven: [
      { periode: "Laagseizoen", perNacht: "vanaf €75", perWeek: "vanaf €475" },
      { periode: "Middenseizoen", perNacht: "vanaf €95", perWeek: "vanaf €595" },
      { periode: "Hoogseizoen", perNacht: "vanaf €115", perWeek: "vanaf €725" },
    ],
    bijkomendeKosten: [
      "Linnenpakket (verplicht): €10 p.p.",
      "Toeristenbelasting: €1,75 p.p.p.n.",
    ],
    optioneel: [
      "Handdoekenpakket: €4 p.p.",
      "Kinderpakket: €10 p.k.p.n.",
      "Bezoek: €2 p.p.p.d.",
      "Extra bijzettentje: €0,90 p.n.",
    ],
    inbegrepen: [
      "Gas, water, elektra",
      "Warm water/douche in centraal gebouw",
      "Gratis WiFi",
      "Afvalstoffenheffing",
      "Eindschoonmaak",
    ],
    voorwaarden: [
      "Niet roken",
      "Geen huisdieren",
      "Linnenpakket verplicht",
      "Aankomst vanaf 15:00, vertrek voor 12:00",
    ],
  },
  {
    slug: "hooiberghut",
    name: "Hooiberghut",
    shortName: "Hooiberghut",
    type: "huisje",
    priceFrom: 85,
    priceUnit: "per nacht",
    capacity: 4,
    shortDescription:
      "Slapen in een echte hooiberg op de boerderij. Authentiek dakconstructie, eigen sanitair en houtkachel.",
    description:
      "Onze hooiberg is verbouwd tot een verrassend ruime overnachtingsplek met behoud van het oorspronkelijke karakter. Het dakconstructie met de oude balken is nog origineel, het hooi is vervangen door comfort. Slapen op de begane grond in een tweepersoonsbed, of op de slaapzolder met twee extra plekken voor de kinderen of vrienden.\n\nEen houtkachel houdt de ruimte ook in het voor- en naseizoen behaaglijk warm. Eigen sanitair, een keuken om zelf te koken, en een veranda waar je 's avonds geniet van de zonsondergang over het natuurgebied. Romantisch voor stellen, avontuurlijk voor kinderen.",
    faciliteiten: [
      "4 slaapplaatsen",
      "Eigen badkamer met douche en wc",
      "Houtkachel",
      "Volledige keuken",
      "Origineel dakconstructie",
      "Slaapzolder",
      "Veranda met terrasmeubilair",
      "WiFi en stroom",
    ],
    heroImage: "/images/photos/hooiberghut-buitenkant-met-stoelen-op-gras.jpg",
    gallery: [
      "/images/photos/hooiberghut-buitenkant-met-stoelen-op-gras.jpg",
      "/images/photos/hooiberghut-interieur-met-vier-stapelbedden.jpg",
      "/images/photos/hooiberghut-keuken-en-bed-met-groene-gordijnen.jpg",
      "/images/photos/hooiberghut-keuken-en-toilet-binnenkant.jpg",
      "/images/photos/hooiberghut-tweepersoonsbed-met-eettafel-en-raam.jpg",
      "/images/photos/Hooiberghut/hooiberghut-buitenkant-met-tafel-en-stoelen.jpg",
      "/images/photos/Hooiberghut/hooiberghut-het-hert-met-parasol-en-zithoek.jpg",
      "/images/photos/Hooiberghut/hooiberghut-stapelbedden-met-keukentje.jpg",
    ],
    floorPlan: img.hooiberghutPlan,
    seasons: "april t/m oktober",
    voorzieningenBinnen: [
      "Tweepersoonsbed op de begane grond",
      "Slaapzolder met twee slaapplekken",
      "Eigen badkamer met douche en wc",
      "Houtkachel (hout te bestellen)",
      "Volledige keuken met elektrische kookplaat",
      "Koelkast",
      "Koffiezetapparaat en waterkoker",
      "Zit-/eethoek",
      "WiFi en stroom",
    ],
    voorzieningenBuiten: [
      "Veranda met terrasmeubilair",
      "Origineel behouden dakconstructie",
    ],
    tarieven: [
      { periode: "Laagseizoen", perNacht: "vanaf €85", perWeek: "vanaf €535" },
      { periode: "Middenseizoen", perNacht: "vanaf €105", perWeek: "vanaf €655" },
      { periode: "Hoogseizoen", perNacht: "vanaf €125", perWeek: "vanaf €795" },
    ],
    bijkomendeKosten: [
      "Linnenpakket (verplicht): €10 p.p.",
      "Toeristenbelasting: €1,75 p.p.p.n.",
      "Hout voor de kachel: €17 per kruiwagen",
    ],
    voorwaarden: [
      "Niet roken",
      "Geen huisdieren",
      "Linnenpakket verplicht",
      "Aankomst vanaf 15:00, vertrek voor 12:00",
    ],
    sfeer:
      "Bijzonder geliefd in het voor- en naseizoen, als de kachel brandt en de zon laag staat boven het natuurgebied.",
  },
];

export const getAccommodation = (slug: string) =>
  accommodations.find((a) => a.slug === slug);
