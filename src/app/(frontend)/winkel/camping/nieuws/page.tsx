import Image from "next/image";
import { ArrowLeft, Newspaper, Pin } from "lucide-react";
import { fetchNews } from "./load";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const label = dateFmt.format(d);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export default async function NieuwsPage() {
  const items = await fetchNews();

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--creme, #FAF6EE)" }}>
      <header className="sticky top-0 z-30 border-b border-rand-zacht bg-wit/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
          <a
            href="/winkel/camping/menu"
            className="inline-flex items-center gap-1.5 text-sm text-tekst-grijs hover:text-tekst-donker"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </a>
          <h1
            className="inline-flex items-center gap-1.5"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "1.15rem",
              color: "var(--paars)",
            }}
          >
            <Newspaper className="h-4 w-4 text-oranje-warm" aria-hidden />
            Nieuws
          </h1>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        {items.length === 0 ? (
          <div className="rounded-card border border-rand-zacht bg-wit p-8 text-center">
            <Newspaper className="mx-auto h-8 w-8 text-oranje-warm" aria-hidden />
            <p className="mt-3 text-tekst-grijs">Nog geen nieuws.</p>
            <p className="mt-1 text-sm text-tekst-grijs">
              Hier verschijnen binnenkort berichten van de camping.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {items.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-card border border-rand-zacht bg-wit shadow-sm"
              >
                {item.image?.url && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image.url}
                      alt={item.image.alt ?? item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 42rem"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-tekst-grijs">
                    {item.pinned && (
                      <span className="inline-flex items-center gap-1 rounded-pill bg-oranje-warm/15 px-2 py-0.5 font-medium text-oranje-warm">
                        <Pin className="h-3 w-3" aria-hidden />
                        Vastgezet
                      </span>
                    )}
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <h2
                    className="mt-1.5 text-tekst-donker"
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontWeight: 500,
                      fontSize: "1.2rem",
                    }}
                  >
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="mt-1 text-sm font-medium text-tekst-donker">{item.excerpt}</p>
                  )}
                  {item.body && (
                    <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-tekst-donker">
                      {item.body}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
