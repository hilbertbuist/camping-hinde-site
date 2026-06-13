import Image from "next/image";
import { ArrowLeft, CalendarDays, Clock, MapPin, PartyPopper } from "lucide-react";
import { fetchActivities, type ActivityCard } from "./load";

export const dynamic = "force-dynamic";

const dayFmt = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function formatDay(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const label = dayFmt.format(d);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function dayKey(value: string) {
  return value ? String(value).split("T")[0] : "";
}

export default async function ActiviteitenPage() {
  const activities = await fetchActivities();

  // Group by day, preserving the date-asc order.
  const groups: { key: string; label: string; items: ActivityCard[] }[] = [];
  for (const a of activities) {
    const key = dayKey(a.date);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: formatDay(a.date), items: [] };
      groups.push(group);
    }
    group.items.push(a);
  }

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
            <PartyPopper className="h-4 w-4 text-oranje-warm" aria-hidden />
            Activiteiten
          </h1>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        {groups.length === 0 ? (
          <div className="rounded-card border border-rand-zacht bg-wit p-8 text-center">
            <PartyPopper className="mx-auto h-8 w-8 text-oranje-warm" aria-hidden />
            <p className="mt-3 text-tekst-grijs">Nog geen activiteiten gepland.</p>
            <p className="mt-1 text-sm text-tekst-grijs">
              Houd deze pagina in de gaten voor het animatieprogramma.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {groups.map((group) => (
              <section key={group.key}>
                <h2
                  className="mb-3 inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontWeight: 500,
                    fontSize: "1.25rem",
                    color: "var(--paars)",
                  }}
                >
                  <CalendarDays className="h-5 w-5 text-oranje-warm" aria-hidden />
                  {group.label}
                </h2>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="overflow-hidden rounded-card border border-rand-zacht bg-wit shadow-sm"
                    >
                      {item.image?.url && (
                        <div className="relative h-44 w-full">
                          <Image
                            src={item.image.url}
                            alt={item.image.alt ?? item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 42rem"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3
                          className="text-tekst-donker"
                          style={{
                            fontFamily: "var(--serif)",
                            fontStyle: "italic",
                            fontWeight: 500,
                            fontSize: "1.1rem",
                          }}
                        >
                          {item.title}
                        </h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-tekst-grijs">
                          {(item.startTime || item.endTime) && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" aria-hidden />
                              {item.startTime}
                              {item.endTime ? ` – ${item.endTime}` : ""}
                            </span>
                          )}
                          {item.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" aria-hidden />
                              {item.location}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-2 whitespace-pre-line text-sm text-tekst-donker">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
