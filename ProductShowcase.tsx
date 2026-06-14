import SectionHeading from "@/components/ui/SectionHeading";
import ProductSection from "@/components/sections/ProductSection";
import { PRODUCT_CATEGORIES } from "@/lib/data";

export default function ProductShowcase() {
  return (
    <div className="relative">
      <div className="border-t border-line px-6 pt-28 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <SectionHeading
            eyebrow="The Range"
            title="Six systems. One standard."
            description="Every category below is engineered, tested and colour-matched in-house — from the first coat on a bedroom wall to a decade of monsoons on a rooftop."
          />
        </div>
      </div>

      {PRODUCT_CATEGORIES.map((category) => (
        <ProductSection key={category.id} category={category} />
      ))}
    </div>
  );
}
