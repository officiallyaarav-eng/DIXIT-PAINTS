"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS, STORE_INFO } from "@/lib/data";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          {/* Wordmark */}
          <a href="#top" className="group flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
              DIXIT
            </span>
            <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.3em] text-ink-dim sm:inline">
              Paints Centre
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors duration-300 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton href="#visit" variant="outline" size="sm">
              Book Consultation
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="block h-[1.5px] w-6 bg-ink"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block h-[1.5px] w-6 bg-ink"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="block h-[1.5px] w-6 bg-ink"
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-void/95 px-6 pb-8 pt-2 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-6 pt-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-semibold text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${STORE_INFO.phoneE164}`}
                className="font-display text-3xl font-semibold text-ink"
              >
                Call Store
              </a>
              <MagneticButton href="#visit" variant="solid" size="md" onClick={() => setOpen(false)}>
                Book Consultation
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
