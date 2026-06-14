"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { STORE_INFO } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="visit" className="relative border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <SectionHeading
          eyebrow="Visit · Kasganj Showroom"
          title="Walk into the future of paint."
          description="See every finish, texture and coating in person — and get an instant ColorSync match for your space at our Kasganj showroom."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-3xl border border-line bg-surface/60 p-8"
          >
            <div>
              <p className="spec-label text-ink-faint">{STORE_INFO.tagline}</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl">
                {STORE_INFO.name}
              </h3>

              <div className="mt-6 space-y-1 text-ink-dim">
                {STORE_INFO.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p>
                  {STORE_INFO.city} – {STORE_INFO.pin}
                </p>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <p className="spec-label text-ink-faint">Showroom Hours</p>
                <div className="mt-3 space-y-2">
                  {STORE_INFO.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-6 text-sm text-ink-dim">
                      <span>{h.day}</span>
                      <span className="text-ink">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Hi Dixit Paints Centre, I'd like to know more about your paints and finishes."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                size="md"
                className="flex-1"
              >
                WhatsApp Us
              </MagneticButton>
              <MagneticButton
                href={`tel:${STORE_INFO.phoneE164}`}
                variant="outline"
                size="md"
                className="flex-1"
              >
                Call Store
              </MagneticButton>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative min-h-[360px] overflow-hidden rounded-3xl border border-line lg:min-h-[520px]"
          >
            <iframe
              title="Dixit Paints Centre on Google Maps"
              src={STORE_INFO.mapEmbedUrl}
              className="absolute inset-0 h-full w-full grayscale invert-[0.92] contrast-[1.1]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/20" />

            <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/85">
                {STORE_INFO.city}
              </p>
            </div>

            <a
              href={STORE_INFO.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto absolute bottom-6 right-6"
            >
              <MagneticButton variant="solid" size="sm">
                Get Directions
              </MagneticButton>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
