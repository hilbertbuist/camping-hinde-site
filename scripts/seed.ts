/**
 * Seed-script: maakt een eerste admin-gebruiker en een setje voorbeelddata.
 *
 * Draaien: `npm run seed`  (zie package.json scripts)
 * Stopt veilig als de admin-gebruiker al bestaat.
 */

import { getPayload } from "payload";
import config from "../payload.config";

async function seed() {
  const payload = await getPayload({ config });

  // 1. Eerste admin
  const existing = await payload.find({
    collection: "users",
    where: { email: { equals: "info@campingdehinde.nl" } },
    limit: 1,
  });

  if (existing.docs.length === 0) {
    await payload.create({
      collection: "users",
      data: {
        name: "Dora Buist",
        email: "info@campingdehinde.nl",
        password: "DeHinde2026!",
        role: "admin",
      },
    });
    console.log("✓ Admin-gebruiker aangemaakt: info@campingdehinde.nl / DeHinde2026!");
  } else {
    console.log("• Admin-gebruiker bestaat al, overgeslagen.");
  }

  // 2. Categorieën
  const categoryDefs = [
    { name: "Vlees", slug: "vlees", icon: "beef", color: "groen", order: 1 },
    { name: "Zuivel", slug: "zuivel", icon: "milk", color: "blauw", order: 2 },
    { name: "Bier", slug: "bier", icon: "beer", color: "oranje", order: 3 },
    { name: "Brood en banket", slug: "brood", icon: "wheat", color: "creme", order: 4 },
    { name: "Eieren", slug: "eieren", icon: "egg", color: "oranje", order: 5 },
    { name: "Algemeen", slug: "algemeen", icon: "shopping-bag", color: "groen", order: 99 },
  ];
  const categoryIdBySlug: Record<string, string> = {};
  for (const cat of categoryDefs) {
    const existing = await payload.find({
      collection: "product-categories",
      where: { slug: { equals: cat.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      const created = await payload.create({
        collection: "product-categories",
        data: cat,
      });
      categoryIdBySlug[cat.slug] = String(created.id);
      console.log(`  ✓ Categorie: ${cat.name}`);
    } else {
      categoryIdBySlug[cat.slug] = String(existing.docs[0].id);
    }
  }

  // 3. Voorbeeldproducten
  const products = [
    { categorySlug: "vlees", name: "Rookworst (Slagerij Berg)", slug: "rookworst", price: 4.5, unit: "stuk", supplier: "Slagerij Berg, Dronten" },
    { categorySlug: "vlees", name: "Bief­burger 200g", slug: "biefburger", price: 3.95, unit: "stuk" },
    { categorySlug: "zuivel", name: "Verse melk (1 L)", slug: "melk", price: 1.6, unit: "liter" },
    { categorySlug: "zuivel", name: "Boerenkaas, jong", slug: "boerenkaas-jong", price: 5.5, unit: "100g", supplier: "Kaasboerderij Heuvel" },
    { categorySlug: "zuivel", name: "Yoghurt vanille (500 ml)", slug: "yoghurt", price: 2.4, unit: "stuk" },
    { categorySlug: "bier", name: "Flevobier blond (33 cl)", slug: "flevobier-blond", price: 3.2, unit: "fles", supplier: "Brouwerij Flevo" },
    { categorySlug: "bier", name: "Flevobier IPA (33 cl)", slug: "flevobier-ipa", price: 3.5, unit: "fles" },
    { categorySlug: "brood", name: "Volkoren, halfje", slug: "volkoren-half", price: 1.95, unit: "stuk" },
    { categorySlug: "eieren", name: "Eieren van eigen kippen (zes)", slug: "eieren-zes", price: 2.5, unit: "zes" },
    { categorySlug: "algemeen", name: "Honing van het erf", slug: "honing", price: 6.5, unit: "fles", supplier: "Imker Vermeer" },
  ];
  for (const p of products) {
    const existing = await payload.find({
      collection: "products",
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "products",
        data: {
          name: p.name,
          slug: p.slug,
          category: categoryIdBySlug[p.categorySlug],
          price: p.price,
          unit: p.unit,
          supplier: p.supplier,
          active: true,
        },
      });
      console.log(`  ✓ Product: ${p.name}`);
    }
  }

  // 4. Broodjes-bestelmenu
  const breads = [
    { name: "Croissant (vers)", slug: "croissant", price: 1.25, category: "croissant", order: 10 },
    { name: "Hard broodje wit", slug: "hard-wit", price: 0.95, category: "broodje-hard", order: 20 },
    { name: "Hard broodje bruin", slug: "hard-bruin", price: 1.05, category: "broodje-hard", order: 21 },
    { name: "Zacht broodje wit", slug: "zacht-wit", price: 0.85, category: "broodje-zacht", order: 30 },
    { name: "Zacht broodje bruin", slug: "zacht-bruin", price: 0.95, category: "broodje-zacht", order: 31 },
    { name: "Eitje (vers, scharrel)", slug: "eitje", price: 0.45, category: "eieren", order: 40 },
  ];
  for (const b of breads) {
    const existing = await payload.find({
      collection: "bread-items",
      where: { name: { equals: b.name } },
      limit: 1,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "bread-items",
        data: { ...b, active: true },
      });
      console.log(`  ✓ Broodje: ${b.name}`);
    }
  }

  // 5. Test-boeking voor demo (campingplaats 7, achternaam "Test")
  const testBooking = await payload.find({
    collection: "bookings",
    where: { reference: { equals: "DEMO-001" } },
    limit: 1,
  });
  if (testBooking.docs.length === 0) {
    const today = new Date().toISOString().split("T")[0];
    const inAWeek = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];
    await payload.create({
      collection: "bookings",
      data: {
        reference: "DEMO-001",
        guestName: "Familie Test",
        guestLastName: "Test",
        email: "demo@example.com",
        campsiteNumber: "7",
        arrival: today,
        departure: inAWeek,
        guests: 4,
        status: "active",
        externalSource: "manual",
      },
    });
    console.log("✓ Test-boeking: plaatsnummer 7, achternaam 'Test', boekingsnummer 'DEMO-001'");
  }

  console.log("\nKlaar. Login op /admin met info@campingdehinde.nl / DeHinde2026!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
