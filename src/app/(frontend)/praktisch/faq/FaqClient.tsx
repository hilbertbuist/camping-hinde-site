"use client";

import { useState } from "react";
import Link from "next/link";
import { faqs } from "@/lib/content/faq";

function makeId(category: string, index: number) {
  return `${category}-${index}`;
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      width="20"
      height="20"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function FaqClient() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Group by category preserving order
  const grouped: { category: string; items: typeof faqs }[] = [];
  for (const f of faqs) {
    let entry = grouped.find((g) => g.category === f.category);
    if (!entry) {
      entry = { category: f.category, items: [] };
      grouped.push(entry);
    }
    entry.items.push(f);
  }

  return (
    <>
      {/* Hero */}
      <section className="design-section" style={{ background: "var(--creme)" }}>
        <div className="design-container">
          <div className="max-w-3xl">
            <div className="section-tag">FAQ</div>
            <h1 className="section-h mt-4">Vragen die we vaak krijgen</h1>
            <p className="mt-6 text-lg leading-relaxed text-tekst-grijs md:text-xl">
              Staat je vraag er niet bij? Bel of app ons gerust, we helpen
              graag verder.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ groups */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="mx-auto max-w-3xl space-y-14">
            {grouped.map((g) => (
              <div key={g.category}>
                <h2 className="section-h">{g.category}</h2>
                <div className="mt-6">
                  {g.items.map((item, idx) => {
                    const id = makeId(g.category, idx);
                    const isOpen = open.has(id);
                    return (
                      <div key={id} className="border-b border-rand-zacht">
                        <button
                          type="button"
                          onClick={() => toggle(id)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                        >
                          <span
                            className={`text-lg ${isOpen ? "text-paars-primair" : "text-tekst-donker"}`}
                            style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 500 }}
                          >
                            {item.question}
                          </span>
                          <ChevronRight
                            className={`shrink-0 text-paars-primair transition-transform duration-200 ${
                              isOpen ? "rotate-90" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-200 ease-out ${
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-6 text-base leading-relaxed text-tekst">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact card */}
      <section
        className="design-section"
        style={{ background: "var(--paars-donker)", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div className="design-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl" style={{ color: "white" }}>
              Staat je vraag er niet bij?
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Bel of app ons gerust, we helpen graag verder.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="design-btn btn-groen">
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
