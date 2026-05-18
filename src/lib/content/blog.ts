export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  hero: string;
  content: string;
  author?: string;
  readingTime?: string;
  tags?: string[];
};

const PHOTO = "/images/photos";

export const blogPosts: BlogPost[] = [
  {
    slug: "eerste-lammetjes-2026",
    title: "Onze eerste lammetjes van 2026 zijn er",
    excerpt:
      "De eerste lammetjes zijn geboren op De Hinde. Een verhaal over de geboorte, de moeders, en hoe je ze kunt zien tijdens je verblijf.",
    date: "2026-04-12",
    category: "Op de boerderij",
    hero: `${PHOTO}/boer-en-jongens-met-kalfje-aan-touw.jpg`,
    author: "Dora Buist",
    readingTime: "3 minuten leestijd",
    tags: ["lammetjes", "dieren", "natuurbeheer"],
    content:
      "Het is gisterochtend rond een uur of zes gebeurd. Dora maakte haar ronde over het natuurgebied en zag dat een van onze eerste schapen alleen stond, met twee kleintjes ernaast die nog onhandig op hun pootjes stonden. De eerste lammetjes van het jaar.\n\nHet tweede setje volgde later die dag, en in de loop van deze week verwachten we er nog een stuk of zes. Ze blijven nu een paar weken bij hun moeders in het natuurgebied, en daarna gaan ze samen verder met grazen.\n\n**Kom je ze ook zien?**\n\nVoor onze gasten is het mooi nieuws: de lammetjes zijn de hele lente te zien aan de overkant van de weg. Vraag bij aankomst gerust of we ze even gaan kijken, dan lopen we samen naar de wei.",
  },
  {
    slug: "vroegboekkorting-safaritent-2026",
    title: "Vroegboekkorting tot 1 mei: 10% korting op safaritent-weken",
    excerpt:
      "Boek je safaritent-week voor 1 mei en krijg 10% korting op je verblijf. Geldig op alle weken in het laagseizoen en middenseizoen.",
    date: "2026-03-08",
    category: "Aanbieding",
    hero: `${PHOTO}/safaritent-veranda-met-zonsondergang.jpg`,
    author: "René Buist",
    readingTime: "2 minuten leestijd",
    tags: ["safaritent", "korting", "vroegboek"],
    content:
      "We kijken altijd vooruit naar het nieuwe seizoen, en dat doe je vast ook. Daarom hebben we een vroegboekkorting voor wie nu al weet wanneer hij wil komen.\n\n**Wat krijg je?**\n\n10% korting op een hele week in een van onze safaritenten, mits je voor 1 mei boekt en de week valt in het laagseizoen of middenseizoen. De grote schoolvakantie in juli is uitgesloten, omdat daar al jaren een wachtlijst voor is.\n\n**Hoe werkt het?**\n\nReserveer via onze boekingsmodule of via Vodatent, en vermeld de code VROEG2026 in het opmerkingenveld. We trekken de korting handmatig af en sturen je een aangepaste bevestiging.\n\nVragen? Bel of app ons gerust.",
  },
  {
    slug: "5-fietsroutes-vanaf-de-hinde",
    title: "5 fietsroutes vanaf De Hinde, getest door René",
    excerpt:
      "Van een uurtje door het bos tot een hele dag rond het Veluwemeer: vijf routes die we zelf gefietst hebben, met onderweg-tips.",
    date: "2026-05-02",
    category: "Omgeving",
    hero: `${PHOTO}/panorama-camping-met-spelende-kinderen-en-tenten.jpg`,
    author: "René Buist",
    readingTime: "5 minuten leestijd",
    tags: ["fietsen", "omgeving", "routes"],
    content:
      "Een van de mooiste dingen aan deze plek is dat je in elke richting wat vindt. Bos, water, vestingstadje, polder. Ik heb dit voorjaar vijf routes opnieuw gefietst om te kijken of de tips nog klopten. Dit zijn ze.\n\n**1. Bossen-rondje (12 km, 2 uur)**\n\nVanaf de camping richting het Bos van Roggebot, een rondje door de boswachterij, en terug langs het Drontermeer. Geschikt voor kinderen vanaf een jaar of acht.\n\n**2. Veluwemeer-tour (28 km, hele dag)**\n\nLangs het water naar Elburg, koffie op een terras aan de haven, en via de andere kant van het meer terug. Onderweg veel strandjes om te stoppen.\n\n**3. Vestingsteden-rit (45 km, sportieve dag)**\n\nVoor wie het stevig wil: Dronten, Elburg, Kampen, en terug. Veel rijwielpaden, weinig auto's.\n\n**4. Polder-rondje (18 km, halve dag)**\n\nDoor de oude Flevopolder met de rechte sloten en de wijde luchten. Stil, vlak, weinig mensen.\n\n**5. Strand-shuttle (8 km, ochtend)**\n\nKortste route naar strand Reve-Abbert, ideaal als ontbijt-uitje. Kinderen vinden het geweldig.\n\nDe routekaartjes liggen klaar bij de receptie. Vraag er gerust naar.",
  },
  {
    slug: "natuurbeheer-met-onze-koeien",
    title: "Waarom we kiezen voor natuurbeheer met onze koeien",
    excerpt:
      "Aan de overkant van de weg grazen onze koeien in een natuurgebied. Een verhaal over waarom we dat doen, en wat het oplevert.",
    date: "2026-02-20",
    category: "Op de boerderij",
    hero: `${PHOTO}/koe-safari-met-tractor-langs-koeien.jpg`,
    author: "René Buist",
    readingTime: "4 minuten leestijd",
    tags: ["natuurbeheer", "koeien", "duurzaamheid"],
    content:
      "Een paar jaar geleden hebben we de stap gezet om aan de overkant van de weg aan natuurbeheer te doen. Een stuk land dat we niet meer intensief bewerken, maar waar onze kleinschalige veehouderij in alle rust rondloopt.\n\n**Waarom dan?**\n\nOmdat het past bij hoe we naar de toekomst van de boerderij kijken. Minder dieren, meer ruimte per dier, en een grond die ervan opknapt in plaats van uitgeput raakt. De koeien grazen in hun eigen tempo, het gras krijgt rust, en de biodiversiteit komt terug. We zien tegenwoordig vlinders die we jaren niet meer gezien hadden.\n\n**Wat levert het op?**\n\nOp den duur vlees in ons campingwinkeltje, van runderen die hier gewoon hun leven hebben geleefd. Korter kan een keten niet zijn, en de smaak is naar wat we ervan horen onvergelijkbaar met wat in de supermarkt ligt.\n\nGasten mogen mee op koe-safari met de tractor om het gebied te zien. Vraag er gerust naar bij aankomst.",
  },
  {
    slug: "stalloon-hele-jaar-te-huur",
    title: "De Stalloon is het hele jaar te huur, hier ontstonden de mooiste feestjes",
    excerpt:
      "Onze omgebouwde koeienstal is het hele jaar door te huur voor verjaardagen, reünies en bruiloften. Een paar verhalen uit het afgelopen jaar.",
    date: "2026-01-15",
    category: "De Stalloon",
    hero: `${PHOTO}/boerderijwinkeltje-met-streekproducten-en-drankjes.jpg`,
    author: "Dora Buist",
    readingTime: "3 minuten leestijd",
    tags: ["stalloon", "feestjes", "verhuur"],
    content:
      "De Stalloon stond vroeger vol Groningse Blaarkoppen, de koeien van mijn schoonvader. Nu staat er een lange tafel waar mensen samenkomen voor de mooiste momenten. We dachten: tijd om een paar verhalen op te schrijven.\n\n**De 80e van oma Hendriks (mei 2025)**\n\nDrie generaties bij elkaar, kinderen die binnen de geiten zochten en buiten op het sportveld speelden. Oma zat in het midden, en zei aan het eind van de dag: 'Dit was de mooiste dag van mijn leven.' Dan weet je dat de plek werkt.\n\n**De kleine bruiloft van Sanne en Mark (september 2025)**\n\nVijfentwintig gasten, eigen catering uit Elburg, en een vuurkorf buiten toen het donker werd. Geen showbruiloft, gewoon mensen samen.\n\n**De familiereünie van familie De Boer (juli 2025)**\n\nVeertig man uit drie generaties, een hele dag op het erf, en kinderen die elkaar voor het eerst zagen. De camping zat vol met logés in de safaritenten.\n\n**Beschikbaarheid**\n\nDe Stalloon is het hele jaar te huur, behalve in januari en februari (dan is het stil hier). Tijdens schoolvakanties houden we hem vrij voor onze campinggasten. Stuur ons een aanvraag of bel direct.",
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
