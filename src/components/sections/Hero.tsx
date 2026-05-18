"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const HERO_IMAGE =
  "https://campingdehinde.nl/WP/wp-content/uploads/2017/11/Naamloos_panorama1.jpg";

export function Hero() {
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/boeken");
  };

  return (
    <section className="hero">
      <div className="hero-media">
        <div
          className="ken-burns"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
      </div>
      <div className="video-pill">
        <span className="dot"></span>
        LIVE · Boerderij vandaag, ochtend bij de stal
      </div>

      <div
        className="handnote"
        style={{
          position: "absolute",
          top: "30%",
          right: "6%",
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: "var(--oranje)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily: "var(--hand)",
          fontSize: 22,
          lineHeight: 1.1,
          transform: "rotate(-8deg)",
          padding: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          zIndex: 3,
        }}
      >
        Open april<br />t/m oktober
      </div>

      <div className="container hero-content">
        <div className="hero-tag">Boerderijcamping in Flevoland · Dronten</div>
        <h1>
          Tijd voor <span className="accent">elkaar</span>, op de boerderij
        </h1>
        <p className="hero-sub">
          Drie generaties boerenleven, één plek om even helemaal niets te moeten.
        </p>

        <form className="booking-widget" onSubmit={onSubmit}>
          <label className="bw-field">
            <span className="bw-label">Aankomst</span>
            <span className="bw-value">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              vr 17 jul 2026
            </span>
          </label>
          <label className="bw-field">
            <span className="bw-label">Vertrek</span>
            <span className="bw-value">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              zo 26 jul 2026
            </span>
          </label>
          <label className="bw-field">
            <span className="bw-label">Gasten</span>
            <span className="bw-value">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              2 volwassenen · 2 kinderen
            </span>
          </label>
          <div className="bw-cta">
            <button type="submit" className="btn btn-groen">
              Beschikbaarheid
            </button>
          </div>
        </form>
      </div>

      <div className="hero-scroll-hint">
        Scroll, het wordt mooier
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
