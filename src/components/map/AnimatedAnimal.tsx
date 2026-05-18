"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Props = {
  type: "chicken" | "goat" | "pony";
  zone: { x: number; y: number; width: number; height: number };
  index: number;
  total: number;
};

/**
 * Animeert een dier dat random binnen de opgegeven zone rondscharrelt.
 * Gebruikt percentages tov het map-container, zodat het schaalbaar blijft.
 */
export function AnimatedAnimal({ type, zone, index, total }: Props) {
  // Genereer een unieke route binnen de zone
  const route = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const steps = 6;
    for (let i = 0; i < steps; i++) {
      points.push({
        x: zone.x + Math.random() * zone.width,
        y: zone.y + Math.random() * zone.height,
      });
    }
    return points;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Verschillende snelheid per dier
  const duration = type === "pony" ? 28 : type === "goat" ? 22 : 14;
  const delay = (index / total) * duration * 0.4;

  return (
    <motion.div
      className="pointer-events-none absolute"
      initial={{
        left: `${route[0].x}%`,
        top: `${route[0].y}%`,
      }}
      animate={{
        left: route.map((p) => `${p.x}%`),
        top: route.map((p) => `${p.y}%`),
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: route.map((_, i) => i / (route.length - 1)),
      }}
      style={{ zIndex: 5 }}
    >
      <AnimalSvg type={type} />
    </motion.div>
  );
}

function AnimalSvg({ type }: { type: Props["type"] }) {
  if (type === "chicken") {
    return (
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 70%" }}
      >
        <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden>
          <ellipse cx="16" cy="20" rx="9" ry="6" fill="#FAF6EE" stroke="#1F2421" strokeWidth="0.7" />
          <circle cx="22" cy="13" r="4.5" fill="#FAF6EE" stroke="#1F2421" strokeWidth="0.7" />
          <path d="M22 8 Q24 5, 22 4 Q21 6, 22 8" fill="#E5524B" />
          <circle cx="23" cy="13" r="0.8" fill="#1F2421" />
          <path d="M25 14 L28 14 L26 15 Z" fill="#F4A52B" />
          <line x1="13" y1="26" x2="13" y2="29" stroke="#F4A52B" strokeWidth="1.2" />
          <line x1="17" y1="26" x2="17" y2="29" stroke="#F4A52B" strokeWidth="1.2" />
        </svg>
      </motion.div>
    );
  }

  if (type === "goat") {
    return (
      <svg width="28" height="22" viewBox="0 0 40 30" aria-hidden>
        <ellipse cx="20" cy="18" rx="11" ry="6" fill="#F5F0E5" stroke="#1F2421" strokeWidth="0.7" />
        <circle cx="29" cy="12" r="4.5" fill="#F5F0E5" stroke="#1F2421" strokeWidth="0.7" />
        <path d="M27 8 L25 4 M31 8 L33 4" stroke="#1F2421" strokeWidth="1" strokeLinecap="round" />
        <circle cx="30" cy="12" r="0.7" fill="#1F2421" />
        <line x1="14" y1="24" x2="14" y2="28" stroke="#1F2421" strokeWidth="1.2" />
        <line x1="18" y1="24" x2="18" y2="28" stroke="#1F2421" strokeWidth="1.2" />
        <line x1="24" y1="24" x2="24" y2="28" stroke="#1F2421" strokeWidth="1.2" />
        <path d="M9 16 Q6 18, 8 21" stroke="#1F2421" strokeWidth="0.8" fill="none" />
      </svg>
    );
  }

  // pony
  return (
    <svg width="36" height="28" viewBox="0 0 50 38" aria-hidden>
      <ellipse cx="25" cy="22" rx="14" ry="7" fill="#A86D3F" stroke="#1F2421" strokeWidth="0.7" />
      <path d="M37 22 Q43 18, 41 12 Q39 10, 37 14" fill="#A86D3F" stroke="#1F2421" strokeWidth="0.7" />
      <circle cx="40" cy="14" r="0.8" fill="#1F2421" />
      <path d="M37 12 L36 8 M40 11 L40 7" stroke="#A86D3F" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="29" x2="16" y2="34" stroke="#1F2421" strokeWidth="1.5" />
      <line x1="22" y1="29" x2="22" y2="34" stroke="#1F2421" strokeWidth="1.5" />
      <line x1="30" y1="29" x2="30" y2="34" stroke="#1F2421" strokeWidth="1.5" />
      <path d="M11 22 Q5 21, 7 28" stroke="#1F2421" strokeWidth="1" fill="none" />
    </svg>
  );
}
