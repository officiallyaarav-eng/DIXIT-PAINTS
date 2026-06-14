# Dixit Paints Centre — Website

> "Color. Reimagined." — A futuristic luxury website for Dixit Paints Centre, Kasganj, Uttar Pradesh.

---

## ⚠️ Before You Deploy — Replace These Placeholders

Open `src/lib/data.ts` and update the `STORE_INFO` object with real business details:

| Field | Placeholder | What to replace with |
|---|---|---|
| `phoneDisplay` | `+91 98765 43210` | Real store phone number |
| `phoneE164` | `919876543210` | Phone in E.164 format (no + sign) |
| `whatsappNumber` | `919876543210` | WhatsApp number (must be registered on WhatsApp) |
| `addressLines[0]` | `Main Market Road` | Exact street address |
| `mapEmbedUrl` | Google Maps search URL | Replace with the iframe `src` from Google Maps → Share → Embed a map |
| `mapLinkUrl` | Google Maps search URL | Replace with the direct link to your pin |

### Getting your Google Maps Embed URL
1. Go to [maps.google.com](https://maps.google.com) and search for "Dixit Paints Centre Kasganj"
2. Click **Share** → **Embed a map**
3. Copy the `src="..."` value from the iframe code
4. Paste it into `STORE_INFO.mapEmbedUrl` in `src/lib/data.ts`

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ (required by Next.js 15)
- npm / yarn / pnpm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| 3D | Three.js via @react-three/fiber + @react-three/drei |
| Animation | Framer Motion + GSAP (ScrollTrigger) |
| Fonts | Bricolage Grotesque · Inter · JetBrains Mono (Google Fonts) |

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `void` | `#07060B` | Page background |
| `surface` | `#100E18` | Card backgrounds |
| `surface-2` | `#17141F` | Elevated surfaces |
| `ink` | `#F6F4EF` | Primary text |
| `ink-dim` | `#9D99AA` | Secondary text |
| `ink-faint` | `#5E5A6B` | Muted/disabled text |

Six dynamic accent colours (one per product category) are driven by CSS variable `--accent-h` (hue). The **Pigment Lens** dial (bottom-right) and **ColorSync AI** section allow real-time recolouring of the entire UI.

### Typography
- **Display** — Bricolage Grotesque (headings, wordmark)
- **Body** — Inter (paragraphs, UI)
- **Mono** — JetBrains Mono (spec labels, hex codes)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Home page (section assembly)
│   └── globals.css         # CSS variables, base styles, utilities
├── components/
│   ├── hero/
│   │   ├── Hero.tsx        # Full-screen hero with headline + CTA
│   │   └── PaintBucket3D.tsx  # Three.js procedural 3D paint bucket
│   ├── layout/
│   │   ├── Navbar.tsx      # Fixed navigation with mobile menu
│   │   ├── Footer.tsx      # Footer with links, address, contact
│   │   ├── CursorGlow.tsx  # Mouse-following accent glow (desktop)
│   │   └── PigmentLens.tsx # Colour-wheel HUD — signature feature
│   ├── providers/
│   │   └── AccentProvider.tsx  # Global accent colour context
│   ├── sections/
│   │   ├── ProductShowcase.tsx  # Container for all 6 product sections
│   │   ├── ProductSection.tsx   # Individual product category section
│   │   ├── CategoryMarquee.tsx  # Infinite scroll category ticker
│   │   ├── ColorSpectrum.tsx    # Interactive colour picker section
│   │   ├── ProjectShowcase.tsx  # Project portfolio grid
│   │   ├── Testimonials.tsx     # Customer testimonials
│   │   └── ContactSection.tsx   # Store info + Google Maps
│   └── ui/
│       ├── MagneticButton.tsx   # Magnetic-cursor CTA button
│       ├── FloatingPanel.tsx    # Glassmorphic spec card
│       ├── FloatingCTA.tsx      # Fixed WhatsApp / Call FAB
│       ├── RevealText.tsx       # Word-by-word reveal animation
│       └── SectionHeading.tsx   # Shared section heading pattern
├── hooks/
│   └── useMousePosition.ts  # Normalised [-1,1] pointer position
├── lib/
│   ├── data.ts              # All content: products, testimonials, projects, store info
│   ├── utils.ts             # Utility functions (cn, clamp, lerp, mapRange)
│   ├── gsap.ts              # GSAP + ScrollTrigger registration
│   └── colorNames.ts        # Hue → evocative colour name lookup
└── types/
    └── index.ts             # Shared TypeScript types
```

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Deploy (zero config needed — Next.js is auto-detected)

### Other Platforms
The app uses no server-side APIs; it's a static-compatible Next.js app. `npm run build && npm run export` will produce a fully static build if needed (add `output: 'export'` to `next.config.ts`).

---

## 📝 Notes

- **3D Paint Bucket** — The bucket is procedurally generated from Three.js primitives. No external `.glb` / `.gltf` assets required.
- **Environment map** — `@react-three/drei`'s `<Environment preset="city">` downloads an HDR from a CDN at runtime. The 3D scene still renders without it, just without reflections.
- **Google Fonts** — Loaded via `next/font/google` at build time; no CORS issues at runtime.
- **Reduced Motion** — The site respects `prefers-reduced-motion` — parallax and entrance animations are disabled for users with that system setting.

---

*Built with Next.js 15 · Designed for Dixit Paints Centre, Kasganj, UP 207123*
