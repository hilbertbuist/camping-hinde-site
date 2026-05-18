"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, ArrowRight } from "lucide-react";

export function BookingWidget({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [arrival, setArrival] = useState(today);
  const [departure, setDeparture] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      aankomst: arrival,
      vertrek: departure,
      gasten: String(guests),
    });
    router.push(`/boeken?${params.toString()}`);
  };

  const containerClass =
    variant === "hero"
      ? "rounded-card bg-wit/95 backdrop-blur p-4 sm:p-5 shadow-2xl"
      : "rounded-card bg-creme p-4 sm:p-5";

  return (
    <form onSubmit={handleSubmit} className={containerClass} aria-label="Boekings­widget">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
        <div>
          <label htmlFor="arrival" className="block text-xs font-semibold uppercase tracking-wider text-tekst-grijs">
            Aankomst
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-rand-zacht bg-wit px-3 py-2.5 focus-within:ring-2 focus-within:ring-groen-donker">
            <Calendar className="h-4 w-4 text-groen-donker" aria-hidden />
            <input
              id="arrival"
              type="date"
              value={arrival}
              min={today}
              onChange={(e) => setArrival(e.target.value)}
              required
              className="w-full bg-transparent text-sm text-tekst-donker focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="departure" className="block text-xs font-semibold uppercase tracking-wider text-tekst-grijs">
            Vertrek
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-rand-zacht bg-wit px-3 py-2.5 focus-within:ring-2 focus-within:ring-groen-donker">
            <Calendar className="h-4 w-4 text-groen-donker" aria-hidden />
            <input
              id="departure"
              type="date"
              value={departure}
              min={arrival}
              onChange={(e) => setDeparture(e.target.value)}
              required
              className="w-full bg-transparent text-sm text-tekst-donker focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label htmlFor="guests" className="block text-xs font-semibold uppercase tracking-wider text-tekst-grijs">
            Gasten
          </label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-rand-zacht bg-wit px-3 py-2.5 focus-within:ring-2 focus-within:ring-groen-donker">
            <Users className="h-4 w-4 text-groen-donker" aria-hidden />
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full bg-transparent text-sm text-tekst-donker focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "gast" : "gasten"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex h-[46px] items-center justify-center gap-2 rounded-pill bg-groen-gras px-6 text-sm font-semibold text-wit transition-colors hover:bg-groen-donker focus:outline-none focus-visible:ring-2 focus-visible:ring-groen-donker focus-visible:ring-offset-2"
        >
          Beschikbaarheid
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </form>
  );
}
