import { site } from "@/lib/content/site";
import { reviewStats } from "@/lib/content/reviews";

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Campground",
    "@id": `${site.url}#campground`,
    name: site.name,
    alternateName: site.shortName,
    description:
      "Kleinschalige boerderijcamping in Flevoland met twintig kampeerplekken, een safaritent, en twee verhuurhuisjes (Hindehut en Hooiberghut).",
    url: site.url,
    telephone: site.contact.telLink,
    email: site.contact.email,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postal,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.social.facebook, site.social.instagram],
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "19:00",
        validFrom: "2026-04-01",
        validThrough: "2026-10-31",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(reviewStats.average),
      reviewCount: String(reviewStats.count),
      bestRating: "5",
      worstRating: "1",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Speeltuin", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sanitair", value: true },
      { "@type": "LocationFeatureSpecification", name: "Wasmachine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kampvuurplek", value: true },
      { "@type": "LocationFeatureSpecification", name: "Boerderijwinkel", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
