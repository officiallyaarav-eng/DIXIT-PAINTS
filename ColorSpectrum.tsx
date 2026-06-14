"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { useAccent } from "@/components/providers/AccentProvider";
import { getColorName, getMatchConfidence, hslToHex } from "@/lib/colorNames";

export default function ColorSpectrum() {
  const { hue, setHue } = useAccent();
  const [localHue, setLocalHue] = useState(hue);
  const [dragging, setDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = barRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    const clamped = Math.min(Math.max(ratio, 0), 1);
    setLocalHue(clamped * 360);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    function handleMove(e: PointerEvent) {
      updateFromClientX(e.clientX);
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
  }, [dragging, updateFromClientX]);

  const hex = hslToHex(localHue, 72, 58);
  const name = getColorName(localHue);
  const confidence = getMatchConfidence(localHue);

  return (
    <section className="relative border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="ColorSync AI · Live Spectral Match"
          title="Tune your palette in real time."
          description="Drag the spectrum to preview any of 2,200+ shades. Our in-store spectrophotometer mixes the exact formula while you wait — accurate to within 0.2 ΔE of the digital preview."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] border border-line"
            style={{ backgroundColor: hex, transition: "background-color 0.15s ease-out" }}
          >
            <div className="grain" />
            <div className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/20 px-4 py-2 backdrop-blur-md">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/90">
                Live Preview
              </p>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 rounded-2xl border border-white/25 bg-black/25 p-5 backdrop-blur-md sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/70">
                  ColorSync Suggestion
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-white md:text-3xl">
                  {name}
                </p>
              </div>
              <p className="font-mono text-sm text-white/80">{hex}</p>
            </div>
          </motion.div>

          {/* Controls + readout */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="spec-label mb-4 text-ink-faint">Spectral Dial</p>
              <div
                ref={barRef}
                onPointerDown={(e) => {
                  setDragging(true);
                  updateFromClientX(e.clientX);
                }}
                className="relative h-16 w-full cursor-grab touch-none rounded-full active:cursor-grabbing"
                style={{
                  background:
                    "linear-gradient(90deg, #FF4D6D, #FF7A3D, #FFC845, #00D9A3, #2E7CF6, #9B5CFF, #FF4D6D)",
                }}
                role="slider"
                aria-label="Color spectrum"
                aria-valuenow={Math.round(localHue)}
                aria-valuemin={0}
                aria-valuemax={360}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setLocalHue((h) => Math.min(360, h + 4));
                  if (e.key === "ArrowLeft") setLocalHue((h) => Math.max(0, h - 4));
                }}
              >
                <motion.div
                  className="absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-4 border-white shadow-lg"
                  style={{
                    left: `calc(${(localHue / 360) * 100}% - 24px)`,
                    backgroundColor: hex,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line bg-surface/70 p-5">
                <p className="spec-label text-ink-faint">Match Confidence</p>
                <p className="mt-2 font-display text-3xl font-bold text-ink">
                  {confidence}%
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-surface/70 p-5">
                <p className="spec-label text-ink-faint">Mixing Base</p>
                <p className="mt-2 font-display text-3xl font-bold text-ink">
                  HC&nbsp;{Math.round((localHue / 360) * 99).toString().padStart(2, "0")}
                </p>
                <p className="mt-3 text-xs text-ink-dim">
                  Auto-selected from our high-chroma tinting base library.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-ink-dim">
              Like this shade? Sync it to the Pigment Lens to carry it across
              the rest of the experience — or bring the hex code into the
              showroom and we&rsquo;ll mix it on the spot.
            </p>

            <div>
              <MagneticButton
                variant="outline"
                size="md"
                onClick={() => setHue(localHue)}
              >
                Sync to Pigment Lens
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
