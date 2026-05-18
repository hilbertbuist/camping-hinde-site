"use client";

import { useRef } from "react";

export function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => trackRef.current?.scrollBy({ left: -420, behavior: "smooth" });
  const scrollNext = () => trackRef.current?.scrollBy({ left: 420, behavior: "smooth" });

  return (
    <section className="rev design-section" id="reviews">
      <div className="design-container">
        <div className="rev-head-row">
          <div>
            <div className="section-tag">Wat onze gasten zeggen</div>
            <h2 className="section-h">Tienduizenden vakantie-uren later</h2>
          </div>
          <div className="rev-meta">
            <div className="rev-rating">9,4</div>
            <div className="rev-rating-side">
              <div className="stars">★ ★ ★ ★ ★</div>
              op basis van 247 reviews<br />
              <strong style={{ color: "white" }}>Zoover, Booking &amp; Google</strong>
            </div>
          </div>
        </div>

        <div className="rev-track-wrap">
          <div className="rev-track" id="revTrack" ref={trackRef}>
            <article className="rev-card">
              <div className="stars">★ ★ ★ ★ ★</div>
              <p className="rev-quote">&quot;We kwamen voor een weekend, bleven een week. De kinderen wilden niet meer naar huis.&quot;</p>
              <div className="rev-author">
                <div className="rev-avatar">J</div>
                <div className="rev-author-meta">
                  <strong>familie Jansen</strong>
                  <span>juli 2025</span>
                </div>
              </div>
            </article>
            <article className="rev-card">
              <div className="stars">★ ★ ★ ★ ★</div>
              <p className="rev-quote">&quot;Echt boerenleven. René nam onze zoon mee op de tractor, dat vergeet hij nooit meer.&quot;</p>
              <div className="rev-author">
                <div className="rev-avatar">V</div>
                <div className="rev-author-meta">
                  <strong>familie De Vries</strong>
                  <span>augustus 2025</span>
                </div>
              </div>
            </article>
            <article className="rev-card">
              <div className="stars">★ ★ ★ ★ ★</div>
              <p className="rev-quote">&quot;Stille kampeerplek met alle ruimte. Het Veluwemeer dichtbij, eigen broodjes &#39;s ochtends, dit is hoe vakantie hoort.&quot;</p>
              <div className="rev-author">
                <div className="rev-avatar">M</div>
                <div className="rev-author-meta">
                  <strong>Marleen &amp; Thom</strong>
                  <span>juni 2025</span>
                </div>
              </div>
            </article>
          </div>
          <div className="rev-nav">
            <button type="button" onClick={scrollPrev} aria-label="Vorige">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button type="button" onClick={scrollNext} aria-label="Volgende">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
