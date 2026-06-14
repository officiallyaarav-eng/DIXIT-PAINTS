export type AccentKey =
  | "coral"
  | "flame"
  | "azure"
  | "emerald"
  | "amber"
  | "violet";

export interface AccentColor {
  key: AccentKey;
  /** Hex value used for 3D materials, swatches and inline styles */
  hex: string;
  /** Hue (0-360) used to drive the global --accent-h CSS variable */
  hue: number;
  /** Human label shown in UI */
  label: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  index: string; // "01" - "06"
  eyebrow: string;
  name: string;
  productName: string;
  description: string;
  specs: ProductSpec[];
  accent: AccentKey;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  accent: AccentKey;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  accent: AccentKey;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  addressLines: string[];
  city: string;
  pin: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  hours: { day: string; time: string }[];
  mapEmbedUrl: string;
  mapLinkUrl: string;
  lat: number;
  lng: number;
}
