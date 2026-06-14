"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useAccent } from "@/components/providers/AccentProvider";
import FloatingPanel from "@/components/ui/FloatingPanel";
import RevealText from "@/components/ui/RevealText";
import { ACCENTS } from "@/lib/data";
import type { ProductCategory } from "@/types";

interface ProductSectionProps {
  category: ProductCategory;
}

export default function ProductSection({ category }: ProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const { setAccentByKey } = useAccent();
  const accentHex = ACCENTS[category.accent].hex;

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    if (!section || !visual) return;

    const ctx = gsap.context(() => {
      // Sync the global Pigment Lens to this section's accent while it's
      // the dominant element in view.
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => setAccentByKey(category.accent),
        onEnterBack: () => setAccentByKey(category.accent),
      });

      // Depth-based parallax: the visual drifts and scales as the section
      // travels through the viewport.
      gsap.fromTo(
        visual,
        { yPercent: 12, scale: 0.92, rotate: -3 },
        {
          yPercent: -12,
          scale: 1,
          rotate: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [category.accent, setAccentByKey]);

  return (
    <section
      id={category.id === "interior" ? "finishes" : category.id}
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center border-t border-line px-6 py-28 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-ink-faint">{category.index}</span>
            <span className="hairline max-w-[120px]" />
            <span className="spec-label text-ink-faint">{category.eyebrow}</span>
          </div>

          <h2 className="mt-6 font-display text-display-md font-bold text-ink">
            <RevealText text={category.productName} />
          </h2>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-dim md:text-lg">
            {category.description}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:max-w-md">
            {category.specs.map((spec, i) => (
              <FloatingPanel key={spec.label} delay={i * 0.08} className="!p-4">
                <p className="spec-label text-ink-faint">{spec.label}</p>
                <p className="mt-2 font-display text-lg font-semibold text-ink">
                  {spec.value}
                </p>
              </FloatingPanel>
            ))}
          </div>
        </div>

        {/* Visual column */}
        <div className="order-1 lg:order-2">
          <div
            ref={visualRef}
            className="swatch relative aspect-square w-full max-w-xl overflow-hidden rounded-[2.5rem] shadow-2xl"
            style={{ "--swatch-color": accentHex } as React.CSSProperties}
          >
            {/* Floating product tag */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="absolute left-6 top-6 rounded-full border border-white/25 bg-black/20 px-4 py-2 backdrop-blur-md"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/90">
                {category.name}
              </p>
            </motion.div>

            {/* Center wordmark, large and outlined */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[18vw] font-extrabold leading-none text-white/15 lg:text-[8vw]">
                {category.index}
              </span>
            </div>

            {/* Bottom-right gloss readout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="absolute bottom-6 right-6 rounded-2xl border border-white/25 bg-black/20 px-4 py-3 backdrop-blur-md"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
                Pigment Code
              </p>
              <p className="font-display text-sm font-semibold text-white">
                {accentHex.toUpperCase()}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
