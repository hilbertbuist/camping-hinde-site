"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Receipt, AlertCircle } from "lucide-react";
import type { GuestSession } from "../actions";
import { fetchOpenTab } from "./load";
import { payOpenTab } from "@/app/(frontend)/winkel/checkout-actions";

type OpenOrder = {
  id: string;
  type: string;
  total: number;
  createdAt: string;
  itemSummary: string;
};

export default function RekeningPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<GuestSession | null>(null);
  const [orders, setOrders] = useState<OpenOrder[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const raw = localStorage.getItem("hinde:booking");
    if (!raw) {
      router.replace("/winkel/camping");
      return;
    }
    try {
      const b = JSON.parse(raw) as GuestSession;
      setBooking(b);
      fetchOpenTab(b.bookingId).then((data) => {
        setOrders(data);
        setLoaded(true);
      });
    } catch {
      router.replace("/winkel/camping");
    }
  }, [router]);

  const total = orders.reduce((s, o) => s + o.total, 0);

  const settle = () => {
    if (!booking) return;
    setError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("bookingId", booking.bookingId);
      const res = await payOpenTab(fd);
      if (res.ok) {
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
        } else {
          // Refresh tab
          const fresh = await fetchOpenTab(booking.bookingId);
          setOrders(fresh);
        }
      } else {
        setError(res.error ?? "Er ging iets mis.");
      }
    });
  };

  if (!booking || !loaded) {
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
            <Receipt className="h-4 w-4 text-paars-primair" aria-hidden />
            Mijn rekening
          </h1>
          <span className="w-12" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 py-6">
        {orders.length === 0 ? (
          <div className="rounded-card bg-wit p-8 text-center">
            <p className="text-tekst-donker">
              Er staat niets open. Smakelijk verblijf 🌾
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="rounded-card border border-rand-zacht bg-wit p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold tracking-tight text-tekst-donker">
                        {o.type === "bread" ? "Broodjes" : "Winkel"}
                      </p>
                      <p className="text-xs text-tekst-grijs">
                        {new Date(o.createdAt).toLocaleString("nl-NL", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="mt-1 text-xs text-tekst-grijs">
                        {o.itemSummary}
                      </p>
                    </div>
                    <span className="font-bold text-tekst-donker">
                      €{o.total.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-card bg-wit p-5 shadow-sm">
              <div className="flex items-center justify-between text-base">
                <span className="text-tekst-grijs">Totaal openstaand</span>
                <span className="text-2xl font-bold text-tekst-donker">
                  €{total.toFixed(2)}
                </span>
              </div>
              {error && (
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-800">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
                  <span>{error}</span>
                </div>
              )}
              <button
                onClick={settle}
                disabled={pending}
                className="design-btn btn-groen mt-4 w-full disabled:opacity-60"
                style={{ padding: "0.875rem 1.5rem", fontSize: "1rem" }}
              >
                {pending ? "Bezig..." : "Nu afrekenen"}
              </button>
              <p className="mt-3 text-xs text-tekst-grijs">
                Of laat het staan, dan rekent de boer het bij uitchecken met je
                af.
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
