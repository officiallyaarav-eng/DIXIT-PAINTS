"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";

// The WebGL scene touches `window`/`document` and is heavy — load it only
// on the client, after first paint, with a quiet fallback.
const PaintBucket3D = dynamic(() => import("./PaintBucket3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-[100svh] min-h-[680px] w-full flex-col overflow-hidden bg-void"
    >
      {/* Ambient pigment glow behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-[120px] transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 55%)",
        }}
      />

      {/* 3D bucket */}
      <div className="absolute inset-0">
        <PaintBucket3D />
      </div>

      {/* Vignette for type legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/70 via-transparent to-void" />
      <div className="grain" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pb-16 md:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="spec-label text-ink-dim"
        >
          Dixit Paints Centre · Kasganj, Uttar Pradesh
        </motion.p>

        <div className="pointer-events-none">
          <h1 className="font-display font-extrabold text-ink">
            <RevealText
              text="Color."
              triggerOnView={false}
              className="text-display-xl"
              delay={0.15}
            />
            <RevealText
              text="Reimagined."
              triggerOnView={false}
              className="text-display-xl"
              delay={0.3}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="mt-6 max-w-xl md:mt-8"
          >
            <p className="font-display text-xl font-medium text-ink-dim md:text-2xl">
              The future of paint innovation.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-dim md:text-base">
              Premium finishes, weatherproof coatings and AI-driven colour
              science — engineered for tomorrow, available today at Dixit
              Paints Centre.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="pointer-events-auto flex flex-wrap items-center justify-between gap-8"
        >
          <div className="flex flex-wrap gap-4">
            <MagneticButton href="#finishes" variant="solid" size="md">
              Explore Finishes
            </MagneticButton>
            <MagneticButton href="#visit" variant="outline" size="md">
              Visit Showroom
            </MagneticButton>
          </div>

          <div className="flex items-center gap-3 text-ink-faint">
            <span className="hidden font-mono text-xs uppercase tracking-[0.3em] sm:inline">
              Scroll
            </span>
            <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-line">
              <motion.span
                className="mt-2 h-1.5 w-1.5 rounded-full bg-ink"
                animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
