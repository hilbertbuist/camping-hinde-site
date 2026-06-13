import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ChromeShell } from "@/components/layout/ChromeShell";
import { site } from "@/lib/content/site";
import "./globals.css";

// Fonts geladen via Google Fonts CDN — exact dezelfde URL als
// /design.html zodat de rendering 1:1 identiek is (zelfde opsz-axis,
// zelfde subsets, zelfde fallback-metrics).

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Kamperen bij de boer in Dronten`,
    template: `%s | ${site.name}`,
  },
  description:
    "Kleinschalige boerderijcamping in Flevoland. Kamperen, safaritent, Hindehut en Hooiberghut. Twintig plekken, magische rust, vier minuten van het Veluwemeer.",
  applicationName: site.name,
  authors: [{ name: site.owners }],
  generator: "Next.js",
  keywords: [
    "boerderijcamping",
    "camping Flevoland",
    "kamperen Dronten",
    "Veluwemeer camping",
    "safaritent Flevoland",
    "glamping Veluwe",
    "kleinschalige camping",
    "kamperen met kinderen",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "nl-NL": "/",
      "de-DE": "/de",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description:
      "Kleinschalige boerderijcamping in Flevoland. Twintig plekken, drie verhuuraccommodaties, één onvergetelijke rust.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description:
      "Kleinschalige boerderijcamping in Flevoland. Twintig plekken, drie verhuuraccommodaties, één onvergetelijke rust.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700&family=Caveat:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="antialiased bg-wit text-tekst-donker"
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ChromeShell>{children}</ChromeShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
