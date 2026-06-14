"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { ACCENTS, TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="relative border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Voices · Verified Customers"
          title="What Kasganj is saying."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => {
            const accentHex = ACCENTS[testimonial.accent].hex;
            return (
              <motion.figure
                key={testimonial.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                className={`flex flex-col justify-between rounded-3xl border border-line bg-surface/60 p-7 ${
                  i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: testimonial.rating }).map((_, starIdx) => (
                      <span
                        key={starIdx}
                        className="h-1.5 w-4 rounded-full"
                        style={{ backgroundColor: accentHex }}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-lg leading-snug text-ink md:text-xl">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="font-semibold text-ink">{testimonial.name}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                    {testimonial.role} · {testimonial.location}
                  </p>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
