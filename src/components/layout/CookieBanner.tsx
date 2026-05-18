"use client";

import { useEffect, useState } from "react";

const COOKIE_NAME = "cookie-consent";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getCookie(COOKIE_NAME);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: "functional" | "all") => {
    setCookie(COOKIE_NAME, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-0 z-50 mb-4 max-w-md sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:mx-0">
      <div className="rounded-card border border-rand-zacht bg-wit p-5 shadow-lg">
        <h2 className="font-serif text-lg text-tekst-donker mb-2">Cookies op De Hinde</h2>
        <p className="text-sm text-tekst-grijs leading-relaxed mb-4">
          Wij gebruiken cookies voor een beter werkende website. Functionele cookies altijd,
          statistiek alleen met jouw akkoord.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => handleChoice("functional")}
            className="inline-flex items-center justify-center rounded-pill bg-transparent text-tekst-donker hover:bg-creme transition-colors px-5 py-2.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-tekst-donker focus-visible:ring-offset-2"
          >
            Alleen functioneel
          </button>
          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="inline-flex items-center justify-center rounded-pill bg-groen-gras text-wit hover:bg-groen-donker transition-colors px-5 py-2.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-groen-donker focus-visible:ring-offset-2"
          >
            Akkoord
          </button>
        </div>
      </div>
    </div>
  );
}
