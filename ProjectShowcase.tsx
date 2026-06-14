"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { ACCENTS, PROJECTS } from "@/lib/data";

export default function ProjectShowcase() {
  return (
    <section id="projects" className="relative border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Studio · Selected Work"
          title="Built across Kasganj."
          description="A small sample of homes, showrooms and institutions finished with Dixit systems — colour-matched, applied and warrantied by our own team."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => {
            const accentHex = ACCENTS[project.accent].hex;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-line"
              >
                <div
                  className="swatch absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-110"
                  style={{ "--swatch-color": accentHex } as React.CSSProperties}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
                    {project.year}
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">{project.location}</p>
                </div>

                {/* Hover-reveal corner accent */}
                <div className="absolute right-5 top-5 h-3 w-3 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundColor: accentHex }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
