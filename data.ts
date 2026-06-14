import {
  AccentColor,
  AccentKey,
  ProductCategory,
  Project,
  StoreInfo,
  Testimonial,
} from "@/types";

/**
 * The six pigment accents that move through the entire experience.
 * `hue` drives the global --accent-h CSS variable (see PigmentLens),
 * `hex` is used directly for 3D materials, glows and swatches.
 */
export const ACCENTS: Record<AccentKey, AccentColor> = {
  coral: { key: "coral", hex: "#FF4D6D", hue: 349, label: "Coral Pulse" },
  flame: { key: "flame", hex: "#FF7A3D", hue: 19, label: "Flame Bronze" },
  azure: { key: "azure", hex: "#2E7CF6", hue: 217, label: "Azure Shield" },
  emerald: { key: "emerald", hex: "#00D9A3", hue: 165, label: "Emerald Guard" },
  amber: { key: "amber", hex: "#FFC845", hue: 42, label: "Amber Grain" },
  violet: { key: "violet", hex: "#9B5CFF", hue: 263, label: "Violet Sync" },
};

export const ACCENT_ORDER: AccentKey[] = [
  "coral",
  "flame",
  "azure",
  "emerald",
  "amber",
  "violet",
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "interior",
    index: "01",
    eyebrow: "Premium Interior Finishes",
    name: "Interior",
    productName: "Apex Ultra Matte",
    description:
      "A velvet-smooth finish engineered for light. Apex Ultra Matte absorbs glare and amplifies colour depth, turning ordinary walls into a calibrated canvas for living.",
    specs: [
      { label: "Finish", value: "Velvet Matte" },
      { label: "Coverage", value: "140 sq.ft / L" },
      { label: "Washability", value: "5,000+ Cycles" },
      { label: "VOC", value: "Near Zero" },
    ],
    accent: "coral",
  },
  {
    id: "exterior",
    index: "02",
    eyebrow: "Weatherproof Exterior Coatings",
    name: "Exterior",
    productName: "Apex Shyne All-Weather",
    description:
      "Built for extremes. A self-cleaning ceramic-infused shell that reflects heat, resists monsoon staining, and holds its shine through a decade of seasons.",
    specs: [
      { label: "UV Resistance", value: "12-Year Rated" },
      { label: "Heat Reflectance", value: "Up to 6°C Cooler" },
      { label: "Crack Bridging", value: "0.4mm" },
      { label: "Algae & Fungus", value: "Self-Defending" },
    ],
    accent: "flame",
  },
  {
    id: "waterproofing",
    index: "03",
    eyebrow: "Waterproofing Technology",
    name: "Waterproofing",
    productName: "SmartCare DampShield",
    description:
      "A nano-polymer barrier that seals walls and terraces from the inside out — engineered to breathe, flex with temperature, and stop seepage at the source.",
    specs: [
      { label: "Water Pressure", value: "Up to 4 Bar" },
      { label: "Elasticity", value: "300%" },
      { label: "Application", value: "Roof · Wall · Bathroom" },
      { label: "Warranty", value: "10 Years" },
    ],
    accent: "azure",
  },
  {
    id: "protection",
    index: "04",
    eyebrow: "Wall Protection Systems",
    name: "Protection",
    productName: "Royale Shield Armour",
    description:
      "An invisible exoskeleton for your walls. Resists impact, stains, and everyday wear without dulling colour — protection that disappears into the finish.",
    specs: [
      { label: "Stain Resistance", value: "Tea · Ink · Crayon" },
      { label: "Scuff Protection", value: "Engineered Shell" },
      { label: "Anti-Microbial", value: "Silver-Ion Tech" },
      { label: "Touch-Up", value: "Seamless Blend" },
    ],
    accent: "emerald",
  },
  {
    id: "textures",
    index: "05",
    eyebrow: "Designer Textures",
    name: "Textures",
    productName: "Royale Play Studio",
    description:
      "A library of tactile finishes — from brushed concrete to liquid metal — applied with precision tools and an artisan's hand for walls that feel as good as they look.",
    specs: [
      { label: "Finishes", value: "40+ Textures" },
      { label: "Application", value: "Hand-Applied" },
      { label: "Customisation", value: "Bespoke Patterns" },
      { label: "Durability", value: "Interior & Exterior" },
    ],
    accent: "amber",
  },
  {
    id: "smart-color",
    index: "06",
    eyebrow: "Smart Color Solutions",
    name: "Smart Color",
    productName: "ColorSync AI",
    description:
      "Our colour intelligence platform reads your light, your room, and your mood — then renders the exact pigment formula our in-store spectrophotometer mixes on demand.",
    specs: [
      { label: "Palette", value: "2,200+ Shades" },
      { label: "Matching", value: "AI Spectral Scan" },
      { label: "Mixing Precision", value: "±0.2 ΔE" },
      { label: "Visualiser", value: "Real-Time AR" },
    ],
    accent: "violet",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rohit Agarwal",
    role: "Homeowner",
    location: "Kasganj, UP",
    quote:
      "The colour-matching at Dixit Paints felt like walking into a studio, not a paint shop. They scanned a cushion fabric and mixed the exact shade on the spot — the living room looks like a different house.",
    rating: 5,
    accent: "violet",
  },
  {
    id: "t2",
    name: "Sunita Verma",
    role: "Interior Designer",
    location: "Etah Road, Kasganj",
    quote:
      "I source for every project from Dixit. The Apex Ultra Matte finish on a north-facing wall looked flawless under both daylight and warm evening light — no patchiness, no touch-up marks.",
    rating: 5,
    accent: "coral",
  },
  {
    id: "t3",
    name: "Manoj Tiwari",
    role: "Building Contractor",
    location: "Kasganj",
    quote:
      "We waterproofed a full terrace before this monsoon with SmartCare DampShield. Zero seepage complaints since — first time in years a roof has gone through the rains without a single callback.",
    rating: 5,
    accent: "azure",
  },
  {
    id: "t4",
    name: "Priya & Arjun Saxena",
    role: "New Homeowners",
    location: "Sidhpura, Kasganj",
    quote:
      "We were nervous about an all-white exterior in this heat. The team recommended Apex Shyne All-Weather and the house genuinely feels cooler inside, even at the height of summer.",
    rating: 5,
    accent: "flame",
  },
  {
    id: "t5",
    name: "Deepak Chaudhary",
    role: "Shop Owner",
    location: "Nadrai Gate, Kasganj",
    quote:
      "Royale Play textures on our showroom wall gets noticed by every customer who walks in. Dixit's team applied it themselves — the brushed-metal finish looks straight out of a metro city store.",
    rating: 5,
    accent: "amber",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "The Saxena Residence",
    category: "Full Home Interior",
    location: "Sidhpura, Kasganj",
    year: "2025",
    accent: "coral",
  },
  {
    id: "p2",
    title: "Nadrai Gate Showroom",
    category: "Designer Texture Facade",
    location: "Nadrai Gate, Kasganj",
    year: "2025",
    accent: "amber",
  },
  {
    id: "p3",
    title: "Riverside Villas",
    category: "Exterior + Waterproofing",
    location: "Kali Nadi Road, Kasganj",
    year: "2024",
    accent: "flame",
  },
  {
    id: "p4",
    title: "Agarwal Heights",
    category: "Terrace Waterproofing",
    location: "Soron Gate, Kasganj",
    year: "2024",
    accent: "azure",
  },
  {
    id: "p5",
    title: "Govind Public School",
    category: "Wall Protection System",
    location: "Patiyali Road, Kasganj",
    year: "2024",
    accent: "emerald",
  },
  {
    id: "p6",
    title: "Heritage Haveli Restoration",
    category: "ColorSync Custom Palette",
    location: "Old City, Kasganj",
    year: "2023",
    accent: "violet",
  },
];

/**
 * NOTE — placeholder business details.
 * Replace phone numbers, exact address line and opening hours with the
 * real details for Dixit Paints Centre before deploying to production.
 * Coordinates are centred on Kasganj, Uttar Pradesh (207123).
 */
export const STORE_INFO: StoreInfo = {
  name: "Dixit Paints Centre",
  tagline: "Authorised Paints, Coatings & Colour Studio — Kasganj",
  addressLines: ["Main Market Road", "Kasganj, Uttar Pradesh"],
  city: "Kasganj, Uttar Pradesh",
  pin: "207123",
  phoneDisplay: "+91 98765 43210",
  phoneE164: "+919876543210",
  whatsappNumber: "919876543210",
  hours: [
    { day: "Monday – Saturday", time: "9:30 AM – 8:30 PM" },
    { day: "Sunday", time: "10:00 AM – 2:00 PM" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps?q=Dixit+Paints+Centre,+Kasganj,+Uttar+Pradesh+207123&z=15&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Dixit+Paints+Centre+Kasganj+Uttar+Pradesh+207123",
  lat: 27.80833,
  lng: 78.64583,
};

export const NAV_LINKS = [
  { label: "Finishes", href: "#finishes" },
  { label: "Technology", href: "#smart-color" },
  { label: "Studio", href: "#projects" },
  { label: "Visit", href: "#visit" },
];
