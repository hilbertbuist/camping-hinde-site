"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Croissant,
  Plus,
  Minus,
  Clock,
  AlertCircle,
} from "lucide-react";
import type { GuestSession } from "../actions";
import { fetchBreadItems } from "./load";
import { createBreadOrder } from "@/app/winkel/checkout-actions";

type BreadItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
};

const CUTOFF_HOUR = 20;

export default function BroodjesPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<GuestSession | null>(null);
  const [items, setItems] = useState<BreadItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [paymentMethod, setPaymentMethod] = useState<"mollie" | "tab">("tab");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const raw = localStorage.getItem("hinde:booking");
    if (!raw) {
      router.replace("/winkel/camping");
      return;
    }
    try {
      setBooking(JSON.parse(raw) as GuestSession);
    } catch {
      router.replace("/winkel/camping");
    }
  }, [router]);

  useEffect(() => {
    fetchBreadItems().then(setItems);
  }, []);

  const now = new Date();
  const past = now.getHours() >= CUTOFF_HOUR;
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const deliveryDate = tomorrow.toISOString().split("T")[0];
  const deliveryLabel = tomorrow.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + (quantities[item.id] ?? 0) * item.price,
        0
      ),
    [items, quantities]
  );

  const totalCount = useMemo(
    () => Object.values(quantities).reduce((s, q) => s + q, 0),
    [quantities]
  );

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => {
      const next = { ...prev };
      next[id] = Math.max(0, (next[id] ?? 0) + delta);
      return next;
    });
  };

  const submit = () => {
    if (!booking) return;
    setError(null);
    const orderItems = items
      .filter((it) => (quantities[it.id] ?? 0) > 0)
      .map((it) => ({
        itemId: it.id,
        name: it.name,
        price: it.price,
        quantity: quantities[it.id] ?? 0,
      }));
    if (orderItems.length === 0) {
      setError("Selecteer minstens één broodje.");
      return;
    }

    startTransition(async () => {
      const fd = new FormData();
      fd.set("items", JSON.stringify(orderItems));
      fd.set("paymentMethod", paymentMethod);
      fd.set("bookingId", booking.bookingId);
      fd.set("deliveryDate", deliveryDate);
      const res = await createBreadOrder(fd);
      if (res.ok) {
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
        } else {
          router.push(`/winkel/bedankt?id=${res.orderId}&method=${paymentMethod}`);
        }
      } else {
        setError(res.error ?? "Er ging iets mis.");
      }
    });
  };

  if (!booking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-tekst-grijs">Laden...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32">
      <header className="sticky top-0 z-30 border-b border-rand-zacht bg-wit/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
          <a
            href="/winkel/camping/menu"
            className="inline-flex items-center gap-1.5 text-sm text-tekst-grijs hover:text-tekst-donker"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </a>
          <h1 className="inline-flex items-center gap-1.5 text-base font-bold text-tekst-donker">
            <Croissant className="h-4 w-4 text-oranje-warm" aria-hidden />
            Broodjes morgen
          </h1>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        {/* Delivery info */}
        <div className="rounded-card bg-oranje-warm/10 border border-oranje-warm/30 p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-tekst-donker">
            <Clock className="h-4 w-4 text-oranje-warm" aria-hidden />
            Bezorging op {deliveryLabel} rond 8:30
          </p>
          <p className="mt-1 text-xs text-tekst-grijs">
            Bestellen kan tot vanavond {CUTOFF_HOUR}:00 uur. Op je terras of bij
            de accommodatie.
          </p>
        </div>

        {past && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-900">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
            <span>
              De bestelling van vandaag is gesloten. Je bestelt nu voor{" "}
              <strong>{deliveryLabel}</strong>.
            </span>
          </div>
        )}

        {/* Items */}
        {items.length === 0 ? (
          <p className="py-12 text-center text-tekst-grijs">
            Het bestelmenu wordt nog ingericht.
          </p>
        ) : (
          <ul className="mt-6 space-y-3">
            {items.map((item) => {
              const qty = quantities[item.id] ?? 0;
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-card border border-rand-zacht bg-wit p-4 shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold tracking-tight text-tekst-donker">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-0.5 truncate text-xs text-tekst-grijs">
                        {item.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-groen-donker">
                      €{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      disabled={qty === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-rand-zacht disabled:opacity-40"
                      aria-label="Min"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center font-bold">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-groen-gras text-wit"
                      aria-label="Plus"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {totalCount > 0 && (
          <div className="mt-8 rounded-card bg-wit p-5 shadow-sm">
            <div className="flex items-center justify-between text-base">
              <span className="text-tekst-grijs">{totalCount} item(s)</span>
              <span className="text-xl font-bold">€{total.toFixed(2)}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-pill bg-rand-zacht p-1">
              <button
                onClick={() => setPaymentMethod("tab")}
                className={`rounded-pill py-2.5 text-sm font-medium transition ${
                  paymentMethod === "tab"
                    ? "bg-paars-primair text-wit shadow"
                    : "text-tekst-grijs"
                }`}
              >
                Op rekening
              </button>
              <button
                onClick={() => setPaymentMethod("mollie")}
                className={`rounded-pill py-2.5 text-sm font-medium transition ${
                  paymentMethod === "mollie"
                    ? "bg-groen-gras text-wit shadow"
                    : "text-tekst-grijs"
                }`}
              >
                Direct betalen
              </button>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-700">{error}</p>
            )}

            <button
              onClick={submit}
              disabled={pending}
              className="mt-4 inline-flex w-full items-center justify-center rounded-pill bg-tekst-donker px-6 py-3.5 text-base font-semibold text-wit transition hover:bg-paars-donker disabled:opacity-60"
            >
              {pending
                ? "Bezig..."
                : paymentMethod === "tab"
                ? "Op rekening zetten"
                : `Betalen (€${total.toFixed(2)})`}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
