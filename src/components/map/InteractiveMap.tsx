"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Maximize2, ArrowRight } from "lucide-react";
import {
  hotspots,
  animationZones,
  type Hotspot,
} from "@/lib/content/map-hotspots";
import { AnimatedAnimal } from "./AnimatedAnimal";
import { CampMapSvg } from "./CampMapSvg";

const TYPE_COLORS: Record<
  Hotspot["type"],
  { bg: string; ring: string; label: string }
> = {
  accommodation: { bg: "#E5524B", ring: "rgba(229,82,75,0.4)", label: "Verhuur" },
  facility: { bg: "#3B82F6", ring: "rgba(59,130,246,0.4)", label: "Faciliteit" },
  animal: { bg: "#F4A52B", ring: "rgba(244,165,43,0.4)", label: "Dieren" },
  kids: { bg: "#7C3AED", ring: "rgba(124,58,237,0.4)", label: "Kinderen" },
  field: { bg: "#7DB332", ring: "rgba(125,179,50,0.4)", label: "Kampeerveld" },
  parking: { bg: "#6B7280", ring: "rgba(107,114,128,0.4)", label: "Parkeren" },
};

const FILTER_LABELS: Array<{ key: Hotspot["type"] | "all"; label: string }> = [
  { key: "all", label: "Alles" },
  { key: "accommodation", label: "Verhuur" },
  { key: "facility", label: "Faciliteiten" },
  { key: "kids", label: "Voor kinderen" },
  { key: "animal", label: "Dieren" },
  { key: "field", label: "Velden" },
];

export function InteractiveMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const [filter, setFilter] = useState<Hotspot["type"] | "all">("all");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const visibleHotspots =
    filter === "all" ? hotspots : hotspots.filter((h) => h.type === filter);

  const zoomIn = () => setZoom((z) => Math.min(z * 1.25, 3));
  const zoomOut = () =>
    setZoom((z) => {
      const next = Math.max(z / 1.25, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse wheel zoom
  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * 0.15;
    setZoom((z) => Math.min(Math.max(z + delta, 1), 3));
  }, []);

  // Drag pan
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Keyboard close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative">
      {/* Filter pills */}
      <div className="mx-auto mb-4 flex max-w-3xl flex-wrap justify-center gap-2 px-4">
        {FILTER_LABELS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-pill px-4 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-tekst-donker text-wit"
                  : "bg-creme text-tekst-donker hover:bg-rand-zacht"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Map container */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-card border border-rand-zacht bg-creme shadow-lg"
        onWheel={onWheel}
      >
        <div
          className="relative aspect-[1000/1180] w-full select-none touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
          }}
        >
          <motion.div
            className="absolute inset-0 origin-center"
            animate={{
              scale: zoom,
              x: pan.x,
              y: pan.y,
            }}
            transition={
              isDragging
                ? { duration: 0 }
                : { type: "spring", stiffness: 200, damping: 30 }
            }
          >
            {/* Plattegrond — getekende SVG */}
            <CampMapSvg />

            {/* Hotspots */}
            {visibleHotspots.map((h) => {
                const colors = TYPE_COLORS[h.type];
                return (
                  <button
                    key={h.id}
                    onClick={() => setSelected(h)}
                    className="absolute flex items-center justify-center rounded-full border-2 border-white shadow-md transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      width: 22,
                      height: 22,
                      transform: "translate(-50%, -50%)",
                      backgroundColor: colors.bg,
                      boxShadow: `0 0 0 6px ${colors.ring}`,
                      zIndex: 10,
                    }}
                    aria-label={h.label}
                    title={h.label}
                  >
                    {h.number !== undefined && (
                      <span className="text-[10px] font-bold text-white">
                        {h.number}
                      </span>
                    )}
                  </button>
                );
              })}

            {/* Animated animals */}
            {animationZones.map((zone) =>
              Array.from({ length: zone.count }).map((_, i) => (
                <AnimatedAnimal
                  key={`${zone.id}-${i}`}
                  type={zone.animal}
                  zone={zone}
                  index={i}
                  total={zone.count}
                />
              ))
            )}
          </motion.div>
        </div>

        {/* Zoom controls */}
        <div className="absolute right-3 top-3 flex flex-col gap-1 rounded-pill bg-wit/95 p-1 shadow-md backdrop-blur">
          <button
            onClick={zoomIn}
            disabled={zoom >= 3}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tekst-donker hover:bg-creme disabled:opacity-40"
            aria-label="Zoom in"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={zoomOut}
            disabled={zoom <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tekst-donker hover:bg-creme disabled:opacity-40"
            aria-label="Zoom uit"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={reset}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tekst-donker hover:bg-creme"
            aria-label="Reset"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Legenda */}
      <div className="mx-auto mt-6 max-w-3xl px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {(Object.entries(TYPE_COLORS) as [Hotspot["type"], (typeof TYPE_COLORS)[Hotspot["type"]]][]).map(
            ([type, colors]) => (
              <div key={type} className="flex items-center gap-2 text-sm">
                <span
                  className="inline-block h-4 w-4 rounded-full"
                  style={{ backgroundColor: colors.bg }}
                />
                <span className="text-tekst-donker">{colors.label}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Detail-modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-tekst-donker/40 sm:items-center"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
              className="w-full max-w-md rounded-t-card bg-wit p-6 shadow-2xl sm:rounded-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="inline-block rounded-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: TYPE_COLORS[selected.type].bg }}
                  >
                    {TYPE_COLORS[selected.type].label}
                    {selected.number !== undefined && ` · ${selected.number}`}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-tekst-donker">
                    {selected.label}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-tekst-grijs hover:bg-creme"
                  aria-label="Sluiten"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {selected.description && (
                <p className="mt-3 text-sm leading-relaxed text-tekst-grijs">
                  {selected.description}
                </p>
              )}
              {selected.link && (
                <Link
                  href={selected.link}
                  className="mt-5 inline-flex items-center gap-2 rounded-pill bg-groen-gras px-5 py-2.5 text-sm font-semibold text-wit transition hover:bg-groen-donker"
                >
                  Bekijk pagina
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
