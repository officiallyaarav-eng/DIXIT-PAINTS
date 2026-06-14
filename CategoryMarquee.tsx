import { PRODUCT_CATEGORIES } from "@/lib/data";

export default function CategoryMarquee() {
  const items = PRODUCT_CATEGORIES.map((c) => c.eyebrow);
  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-line bg-surface py-6">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {loop.map((label, i) => (
          <div key={`${label}-${i}`} className="flex items-center gap-12">
            <span className="font-display text-2xl font-semibold text-ink-dim md:text-3xl">
              {label}
            </span>
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
