"use client";

import Link from "next/link";
import { useState, useTransition, type FormEvent, type ChangeEvent } from "react";
import { site } from "@/lib/content/site";
import { sendContactEmail } from "./actions";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "Algemene vraag",
  message: "",
  website: "",
};

const fieldWrap =
  "rounded-xl border border-rand-zacht bg-wit px-4 py-3 transition-colors focus-within:border-paars-primair focus-within:ring-2 focus-within:ring-paars-primair/20";
const labelSpan =
  "block text-[11px] font-semibold uppercase tracking-[0.08em] text-tekst-grijs";
const inputBase =
  "mt-1 w-full bg-transparent text-[15px] text-tekst-donker placeholder:text-tekst-grijs focus:outline-none";

/* ------- Inline SVG icons ------- */
const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData();
    Object.entries(values).forEach(([k, v]) => formData.set(k, v));

    startTransition(async () => {
      try {
        const result = await sendContactEmail(formData);
        if (result.ok) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMessage(result.error ?? "Er ging iets mis. Probeer het later opnieuw.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Er ging iets mis. Probeer het later opnieuw.");
      }
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="design-section bg-creme">
        <div className="design-container">
          <div className="max-w-3xl">
            <span className="section-tag">Contact</span>
            <h1 className="section-h">Een vraag? Bel of app gerust</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
              Wij nemen zelf op, en denken graag met je mee.
            </p>
          </div>
        </div>
      </section>

      {/* Drie contactblokken */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="acco-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", display: "grid", gap: "24px" }}>
            {/* Bel */}
            <div className="prac-card">
              <div className="prac-card-icon" style={{ color: "var(--paars)" }}>
                <IconPhone />
              </div>
              <h3 className="section-h" style={{ fontSize: "26px" }}>Bel ons</h3>
              <p className="mt-3" style={{ color: "var(--tekst-grijs)" }}>
                We nemen meestal direct op, of bellen je terug binnen het uur.
              </p>
              <div className="mt-4 space-y-1">
                <a href={`tel:${site.contact.telLink}`} className="block font-semibold hover:underline" style={{ color: "var(--paars)" }}>
                  {site.contact.tel}
                </a>
                <a href={`tel:${site.contact.telAltLink}`} className="block font-semibold hover:underline" style={{ color: "var(--paars)" }}>
                  {site.contact.telAlt}
                </a>
              </div>
            </div>

            {/* App */}
            <div className="prac-card">
              <div className="prac-card-icon" style={{ color: "var(--groen)" }}>
                <IconChat />
              </div>
              <h3 className="section-h" style={{ fontSize: "26px" }}>App ons</h3>
              <p className="mt-3" style={{ color: "var(--tekst-grijs)" }}>
                Vaak het snelste om iets kort te vragen.
              </p>
              <div className="mt-4">
                <a
                  href={`https://wa.me/${site.contact.telAltLink.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline"
                  style={{ color: "var(--paars)" }}
                >
                  WhatsApp {site.contact.telAlt}
                </a>
              </div>
            </div>

            {/* Mail */}
            <div className="prac-card">
              <div className="prac-card-icon" style={{ color: "var(--oranje)" }}>
                <IconMail />
              </div>
              <h3 className="section-h" style={{ fontSize: "26px" }}>Mail ons</h3>
              <p className="mt-3" style={{ color: "var(--tekst-grijs)" }}>
                We reageren meestal binnen een dag.
              </p>
              <div className="mt-4">
                <a href={`mailto:${site.contact.email}`} className="font-semibold hover:underline break-all" style={{ color: "var(--paars)" }}>
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Adres + Route */}
      <section className="design-section bg-creme">
        <div className="design-container">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Adres */}
            <div>
              <span className="section-tag">Adres</span>
              <h2 className="section-h">Waar je ons vindt</h2>
              <address className="mt-6 not-italic text-[17px] leading-relaxed" style={{ color: "var(--tekst)" }}>
                <strong>Boerderijcamping De Hinde</strong>
                <br />
                {site.address.street}
                <br />
                {site.address.postal} {site.address.city}
                <br />
                {site.address.region}, {site.address.country}
              </address>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.google.com/maps/?q=Stobbenweg+6,+8251+PX+Dronten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="design-btn btn-paars"
                >
                  Open in Google Maps
                  <IconArrow />
                </a>
              </div>

              {/* Social */}
              <div className="mt-8">
                <span className="section-tag">Volg ons</span>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-wit"
                    style={{ color: "var(--paars)", border: "1px solid var(--rand)" }}
                  >
                    <IconFacebook />
                  </a>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-wit"
                    style={{ color: "var(--paars)", border: "1px solid var(--rand)" }}
                  >
                    <IconInstagram />
                  </a>
                  <div className="text-sm" style={{ color: "var(--tekst-grijs)" }}>
                    /campingdehinde &middot; @camping_dehinde_dronten
                  </div>
                </div>
              </div>
            </div>

            {/* Route */}
            <div>
              <span className="section-tag">Route</span>
              <h2 className="section-h">Zo kom je hier</h2>

              <div
                className="mt-6 overflow-hidden rounded-card relative"
                style={{ aspectRatio: "16 / 10", background: "var(--rand-zacht)" }}
              >
                <iframe
                  title="Plattegrond De Hinde"
                  src="https://www.google.com/maps?q=Stobbenweg+6,+8251+PX+Dronten&output=embed"
                  style={{ border: 0, width: "100%", height: "100%" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-6 space-y-4 text-[15px]" style={{ color: "var(--tekst)" }}>
                <div>
                  <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--paars)" }}>
                    <IconPin />
                    Met de auto
                  </div>
                  <ul className="mt-2 ml-7 list-disc space-y-1" style={{ color: "var(--tekst-grijs)" }}>
                    <li>Vanaf de A6: afslag Dronten-Oost, ongeveer 5 minuten</li>
                    <li>Vanaf de A28: via Elburg en de N307, ongeveer 15 minuten</li>
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--paars)" }}>
                    <IconPin />
                    Met openbaar vervoer
                  </div>
                  <ul className="mt-2 ml-7 list-disc space-y-1" style={{ color: "var(--tekst-grijs)" }}>
                    <li>Trein naar Dronten Centrum</li>
                    <li>Vanaf station Dronten ongeveer 15 minuten met de bus, of 25 minuten op de fiets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contactformulier */}
      <section className="design-section bg-wit">
        <div className="design-container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center">
              <span className="section-tag">Bericht sturen</span>
              <h2 className="section-h">Stuur ons een bericht</h2>
              <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
                We reageren meestal binnen een dag.
              </p>
            </div>

            <div className="mt-10">
              {status === "success" ? (
                <div
                  className="rounded-card p-8 flex items-start gap-4"
                  style={{
                    background: "rgba(124, 179, 50, 0.08)",
                    border: "1px solid rgba(124, 179, 50, 0.35)",
                  }}
                >
                  <span style={{ color: "var(--groen-donker, var(--groen))" }} className="flex-shrink-0 mt-1">
                    <IconCheck />
                  </span>
                  <div>
                    <h3 className="section-h" style={{ fontSize: "28px" }}>
                      Bedankt!
                    </h3>
                    <p className="mt-3 leading-relaxed" style={{ color: "var(--tekst)" }}>
                      We hebben je bericht ontvangen en reageren meestal binnen een dag. Voor
                      spoed mag je ons direct bellen op{" "}
                      <a
                        href={`tel:${site.contact.telLink}`}
                        className="font-semibold underline"
                        style={{ color: "var(--paars)" }}
                      >
                        {site.contact.tel}
                      </a>
                      .
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-10000px",
                      top: "auto",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label>
                      Website (laat dit veld leeg)
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.website}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={fieldWrap + " block"}>
                      <span className={labelSpan}>Naam *</span>
                      <input
                        type="text"
                        name="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className={inputBase}
                      />
                    </label>
                    <label className={fieldWrap + " block"}>
                      <span className={labelSpan}>E-mail *</span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={values.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className={inputBase}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className={fieldWrap + " block"}>
                      <span className={labelSpan}>Telefoon</span>
                      <input
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className={inputBase}
                      />
                    </label>
                    <label className={fieldWrap + " block"}>
                      <span className={labelSpan}>Onderwerp</span>
                      <select
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        className={inputBase}
                      >
                        <option>Algemene vraag</option>
                        <option>Boeking</option>
                        <option>Stalloon-aanvraag</option>
                        <option>Anders</option>
                      </select>
                    </label>
                  </div>

                  <label className={fieldWrap + " block"}>
                    <span className={labelSpan}>Bericht *</span>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={values.message}
                      onChange={handleChange}
                      className={inputBase + " resize-y"}
                    />
                  </label>

                  {status === "error" && errorMessage && (
                    <div
                      className="rounded-xl p-4 flex items-start gap-3"
                      style={{
                        background: "rgba(220, 38, 38, 0.06)",
                        border: "1px solid rgba(220, 38, 38, 0.3)",
                      }}
                    >
                      <span style={{ color: "rgb(185, 28, 28)" }} className="flex-shrink-0 mt-0.5">
                        <IconAlert />
                      </span>
                      <p className="text-sm" style={{ color: "rgb(127, 29, 29)" }}>
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 text-center">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="design-btn btn-paars disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isPending ? "Versturen..." : "Stuur bericht"}
                      <IconSend />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="cta-strip" style={{ background: "var(--paars-donker)" }}>
        <div className="design-container">
          <div className="text-center">
            <h2 className="section-h text-wit">Klaar voor je vakantie?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-wit/85">
              Bekijk wanneer er nog plek is op De Hinde.
            </p>
            <div className="cta-row mt-8">
              <Link href="/kamperen" className="design-btn btn-groen">
                Bekijk de beschikbaarheid
                <IconArrow />
              </Link>
              <a href={`tel:${site.contact.telLink}`} className="design-btn btn-outline" style={{ borderColor: "rgba(255,255,255,.5)", color: "white" }}>
                <IconPhone />
                {site.contact.tel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
