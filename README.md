# Boerderijcamping De Hinde

Volledige website + admin-CMS + zelfscan-winkel-app voor Boerderijcamping De Hinde in Dronten, Flevoland.

## Wat zit erin

- **Publieke website** (`/`, `/verblijf`, `/boerderij`, `/omgeving`, `/praktisch`, `/blog`, `/contact`, `/boeken`)
  meertalig (NL primair, DE/EN voorbereid), SEO-geoptimaliseerd, sitemap, structured data, contactformulier met Nodemailer naar mijndomein-SMTP.
- **Admin-paneel** op `/admin` (Payload CMS 3) — log in als beheerder, beheer producten, categorieën, broodjes, boekingen, bestellingen, gebruikers.
- **Zelfscan-app** op `/winkel` als PWA (installeerbaar op telefoon)
  - Passant-flow: streekproducten scannen, mandje, Mollie-betaling
  - Campinggast-flow: inloggen met boekingsnummer of plaatsnummer + achternaam, winkelen, broodjes voor morgen bestellen, "op rekening" zetten, zelf afrekenen via Mollie

## Stack

| Onderdeel | Technologie |
|---|---|
| Framework | Next.js 15.4 (App Router, TypeScript strict) |
| Styling | Tailwind CSS v4 (CSS @theme tokens) |
| Fonts | Jost + Caveat (Google Fonts) |
| CMS | Payload CMS 3.84 (zelf gehost in dezelfde Next.js app) |
| Database | SQLite voor dev, Vercel Postgres voor productie |
| Betalingen | Mollie (iDEAL, Apple Pay, kaart) |
| Mail | Nodemailer naar mijndomein-SMTP |
| Hosting | Vercel (DNS verwijst van mijndomein.nl) |

## Lokaal draaien

```bash
cd hinde-site
npm install
npm run dev
```

Open <http://localhost:3000> voor de website en <http://localhost:3000/admin> voor het beheerpaneel.

## Eerste keer: admin-gebruiker aanmaken

1. Ga naar <http://localhost:3000/admin>
2. Payload toont automatisch een "Maak eerste gebruiker aan" formulier
3. Vul naam, e-mail en wachtwoord in (kies een sterk wachtwoord)
4. Je bent ingelogd als beheerder

## Eerste vulling: producten en categorieën

Via het admin-paneel:

1. **Categorieën** (Winkel → Categorieën): maak categorieën aan zoals Vlees, Zuivel, Bier
2. **Producten** (Winkel → Producten): voeg producten toe, koppel aan categorie, vul prijs en eenheid in
3. **Broodjes** (Winkel → Broodjes): vul het bestelmenu voor de dag-ervoor-bestellingen
4. **Boekingen** (Gasten → Boekingen): voeg actieve boekingen toe met boekingsnummer + achternaam (later automatisch via uwboeking.com koppeling)

## Test-flow voor de winkel-app

1. Maak in admin een boeking aan met:
   - Reference: `DEMO-001`
   - Achternaam: `Test`
   - Plaatsnummer: `7`
   - Status: `active`
2. Open <http://localhost:3000/winkel>
3. Kies "Ik logeer hier" → log in met plaatsnummer `7` en achternaam `Test`
4. Speel met winkel, broodjes, rekening

## Belangrijke routes

| URL | Doel |
|---|---|
| `/` | Homepage |
| `/admin` | Beheerpaneel (login vereist) |
| `/winkel` | PWA-startscherm (passant of camper kiezen) |
| `/winkel/passant` | Direct winkelen voor passanten |
| `/winkel/camping` | Login voor campinggasten |
| `/winkel/camping/menu` | Hoofdmenu campinggast (na login) |
| `/winkel/camping/shop` | Winkel met "op rekening" optie |
| `/winkel/camping/broodjes` | Broodjes voor morgen bestellen |
| `/winkel/camping/rekening` | Open rekening bekijken/afrekenen |
| `/api/mollie-webhook` | Mollie betaalstatus webhook |

## Environment variabelen (.env.local)

```bash
# Payload
PAYLOAD_SECRET=lange-willekeurige-string-min-32-tekens
DATABASE_URI=file:./payload.db

# Mollie (zonder is dev-mode: bestelling wordt direct als 'betaald' gemarkeerd)
MOLLIE_API_KEY=test_xxx_of_live_xxx

# SMTP (mijndomein.nl)
SMTP_HOST=smtp.mijndomein.nl
SMTP_PORT=587
SMTP_USER=info@campingdehinde.nl
SMTP_PASS=jouw-mailwachtwoord
MAIL_FROM="Boerderijcamping De Hinde <info@campingdehinde.nl>"
MAIL_TO=info@campingdehinde.nl
```

## Deployen op Vercel

1. **Push naar GitHub**:
   ```bash
   cd hinde-site
   git init
   git add .
   git commit -m "Initiele website met admin en winkel"
   git branch -M main
   gh repo create hinde-site --private --source=. --push
   ```
2. **Import in Vercel**: ga naar <https://vercel.com/new>, kies de GitHub-repo
3. **Database aanmaken**: in Vercel project → Storage → Create Database → Postgres
4. **Environment variabelen toevoegen** (Project Settings → Environment Variables):
   - `PAYLOAD_SECRET`
   - `DATABASE_URI` (de Postgres URL die Vercel je geeft)
   - `MOLLIE_API_KEY`
   - `SMTP_*` en `MAIL_*` voor mijndomein
5. **Database adapter omschakelen** voor productie: installeer `@payloadcms/db-vercel-postgres` en pas `payload.config.ts` aan (zie hieronder).
6. **Domein koppelen**: in Vercel → Settings → Domains → add `campingdehinde.nl`. Pas de A-record en CNAME aan in mijndomein.nl DNS-instellingen.
7. **Deploy**: Vercel bouwt automatisch bij elke git push naar `main`.

### SQLite naar Postgres in productie

In `payload.config.ts`, vervang:
```ts
import { sqliteAdapter } from "@payloadcms/db-sqlite";
// ...
db: sqliteAdapter({ client: { url: process.env.DATABASE_URI } }),
```
Door:
```ts
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
// ...
db: vercelPostgresAdapter({
  pool: { connectionString: process.env.DATABASE_URI },
}),
```

## Volgende stappen

- [ ] Mollie productiesleutel toevoegen aan Vercel env
- [ ] uwboeking.com koppeling: webhook of API-sync naar Bookings collection
- [ ] Bestaande site-content (homepage, accommodaties, reviews) migreren van TS-bestanden in `src/lib/content/` naar Payload-collections
- [ ] Eigen hero-video uploaden naar `public/videos/hero-placeholder.mp4`
- [ ] Productiefoto's uploaden via Media-library

## Veelgebruikte commands

```bash
npm run dev                # Start dev server (poort 3000)
npm run build              # Productie-build
npm run start              # Productie-server lokaal
npm run generate:types     # Regenereer Payload TypeScript types
npm run generate:importmap # Regenereer Payload admin-importmap
```
