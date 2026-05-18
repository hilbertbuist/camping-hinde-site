"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/content/site";

const navLinks = [
  { href: "/verblijf", label: "Verblijf", caret: true },
  { href: "/boerderij", label: "Boerderij", caret: false },
  { href: "/omgeving", label: "Omgeving", caret: false },
  { href: "/praktisch", label: "Praktisch", caret: true },
  { href: "/blog", label: "Blog", caret: false },
  { href: "/contact", label: "Contact", caret: false },
];

type Lang = "nl" | "de" | "en";

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 4h16c1 0 2 1 2 2v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const FlagNL = () => (
  <svg viewBox="0 0 6 4" preserveAspectRatio="none" aria-hidden>
    <rect width="6" height="1.33" fill="#AE1C28" />
    <rect y="1.33" width="6" height="1.34" fill="#fff" />
    <rect y="2.67" width="6" height="1.33" fill="#21468B" />
  </svg>
);

const FlagDE = () => (
  <svg viewBox="0 0 6 4" preserveAspectRatio="none" aria-hidden>
    <rect width="6" height="1.33" fill="#000" />
    <rect y="1.33" width="6" height="1.34" fill="#DD0000" />
    <rect y="2.67" width="6" height="1.33" fill="#FFCE00" />
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 6 4" preserveAspectRatio="none" aria-hidden>
    <rect width="6" height="4" fill="#012169" />
    <path d="M0 0L6 4M6 0L0 4" stroke="#fff" strokeWidth=".8" />
    <path d="M0 0L6 4M6 0L0 4" stroke="#C8102E" strokeWidth=".4" />
    <path d="M3 0V4M0 2H6" stroke="#fff" strokeWidth="1.2" />
    <path d="M3 0V4M0 2H6" stroke="#C8102E" strokeWidth=".7" />
  </svg>
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("nl");

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="design-container topbar-inner">
          <div className="topbar-usps">
            <span>
              <CheckIcon /> Direct boeken bij de boer
            </span>
            <span>
              <CheckIcon /> Beoordeeld met een 9,4
            </span>
            <span>
              <CheckIcon /> Kleinschalig &amp; persoonlijk
            </span>
          </div>
          <div className="topbar-right">
            <a href={`tel:${site.contact.telLink}`}>
              <PhoneIcon />
              {site.contact.tel}
            </a>
            <a href={`mailto:${site.contact.email}`}>
              <MailIcon />
              {site.contact.email}
            </a>
            <div className="flag-switch" role="group" aria-label="Taal">
              <button
                className={lang === "nl" ? "active" : ""}
                aria-label="Nederlands"
                onClick={() => setLang("nl")}
                type="button"
              >
                <FlagNL />
              </button>
              <button
                className={lang === "de" ? "active" : ""}
                aria-label="Deutsch"
                onClick={() => setLang("de")}
                type="button"
              >
                <FlagDE />
              </button>
              <button
                className={lang === "en" ? "active" : ""}
                aria-label="English"
                onClick={() => setLang("en")}
                type="button"
              >
                <FlagEN />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="design-header">
        <div className="design-container header-inner">
          <Link href="/" className="design-logo" aria-label="Boerderijcamping de Hinde">
            <Image
              src="/logo.png"
              alt="Boerderijcamping de Hinde"
              width={180}
              height={110}
              priority
            />
          </Link>

          <nav className="design-nav" aria-label="Hoofdnavigatie">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={link.caret ? "has-caret" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <button className="search-icon" aria-label="Zoeken" type="button">
              <SearchIcon />
            </button>
            <Link href="/boeken" className="design-btn btn-groen">
              Zoek &amp; Boek
            </Link>
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 ml-2"
              aria-label={open ? "Sluit menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Home">
              <Image src="/logo.png" alt="" width={120} height={72} />
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center h-10 w-10"
              aria-label="Sluit menu"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" aria-hidden />
            </button>
          </div>
          <nav className="flex flex-col px-5 py-6 gap-1" aria-label="Mobiel menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium py-3 border-b border-neutral-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a href={`tel:${site.contact.telLink}`} className="flex items-center gap-2 py-2 text-sm">
                <PhoneIcon /> {site.contact.tel}
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2 py-2 text-sm">
                <MailIcon /> {site.contact.email}
              </a>
              <Link
                href="/boeken"
                onClick={() => setOpen(false)}
                className="design-btn btn-groen text-center mt-2"
              >
                Zoek &amp; Boek
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
