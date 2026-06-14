import { NAV_LINKS, STORE_INFO } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-void px-6 pt-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="spec-label text-ink-faint">Color. Reimagined.</p>
            <h2 className="mt-4 font-display text-[clamp(3rem,14vw,10rem)] font-extrabold leading-[0.9] tracking-tight text-ink">
              DIXIT
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 md:gap-16">
            <div>
              <p className="spec-label mb-4 text-ink-faint">Explore</p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-ink-dim transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="spec-label mb-4 text-ink-faint">Visit</p>
              <ul className="flex flex-col gap-3 text-ink-dim">
                <li>{STORE_INFO.name}</li>
                {STORE_INFO.addressLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
                <li>
                  {STORE_INFO.city} – {STORE_INFO.pin}
                </li>
              </ul>
            </div>

            <div>
              <p className="spec-label mb-4 text-ink-faint">Contact</p>
              <ul className="flex flex-col gap-3 text-ink-dim">
                <li>
                  <a href={`tel:${STORE_INFO.phoneE164}`} className="hover:text-ink">
                    {STORE_INFO.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink"
                  >
                    WhatsApp Us
                  </a>
                </li>
                <li>
                  <a
                    href={STORE_INFO.mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink"
                  >
                    Get Directions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dixit Paints Centre. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.25em]">
            Authorised Dealer · Kasganj, Uttar Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}
