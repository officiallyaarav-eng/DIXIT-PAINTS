"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccent } from "@/components/providers/AccentProvider";

const RADIUS = 34; // px, radius of the indicator orbit

/**
 * The Pigment Lens is the page's signature mechanism: a fixed, draggable
 * colour wheel. Rotating it sweeps the global `--accent-h` hue used for
 * every glow, border and highlight on the page in real time — a literal,
 * tactile expression of "Smart Color Solutions" and "Color. Reimagined."
 */
export default function PigmentLens() {
  const { hue, accent, setHue } = useAccent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(clientY - cy, clientX - cx);
      let deg = (angle * 180) / Math.PI + 90; // 0deg = top
      if (deg < 0) deg += 360;
      setHue(deg);
    },
    [setHue]
  );

  useEffect(() => {
    if (!dragging) return;

    function handleMove(e: PointerEvent) {
      updateFromPointer(e.clientX, e.clientY);
    }
    function handleUp() {
      setDragging(false);
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, updateFromPointer]);

  const angleRad = ((hue - 90) * Math.PI) / 180;
  const knobX = Math.cos(angleRad) * RADIUS;
  const knobY = Math.sin(angleRad) * RADIUS;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 select-none md:bottom-10 md:right-10"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => !dragging && setExpanded(false)}
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full right-0 mb-4 w-56 rounded-2xl border border-line bg-surface/90 p-4 backdrop-blur-xl"
          >
            <p className="spec-label text-ink-faint">Pigment Lens</p>
            <p className="mt-2 font-display text-lg font-semibold text-ink">
              {accent.label}
            </p>
            <p className="mt-1 font-mono text-xs text-ink-dim">{accent.hex}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-dim">
              Drag the ring to recolour the entire experience.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        onPointerDown={(e) => {
          setDragging(true);
          updateFromPointer(e.clientX, e.clientY);
        }}
        className="relative flex h-20 w-20 cursor-grab items-center justify-center rounded-full border border-line bg-surface/80 backdrop-blur-xl active:cursor-grabbing"
        style={{
          boxShadow: `0 0 40px -8px var(--accent)`,
        }}
        role="slider"
        aria-label="Adjust accent color"
        aria-valuenow={Math.round(hue)}
        aria-valuemin={0}
        aria-valuemax={360}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setHue(hue + 5);
          if (e.key === "ArrowLeft") setHue(hue - 5);
        }}
      >
        {/* Spectrum ring */}
        <div
          className="absolute inset-1 rounded-full opacity-90"
          style={{
            background:
              "conic-gradient(from 0deg, #FF4D6D, #FF7A3D, #FFC845, #00D9A3, #2E7CF6, #9B5CFF, #FF4D6D)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
          }}
        />

        {/* Center readout */}
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-void text-center">
          <span
            className="h-4 w-4 rounded-full transition-colors duration-300"
            style={{ background: "var(--accent)" }}
          />
        </div>

        {/* Draggable knob */}
        <motion.div
          className="absolute h-3 w-3 rounded-full border border-void"
          style={{
            background: "var(--accent)",
            x: knobX,
            y: knobY,
          }}
        />
      </div>
    </div>
  );
}
