import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#07060B",
        surface: "#100E18",
        "surface-2": "#17141F",
        ink: "#F6F4EF",
        "ink-dim": "#9D99AA",
        "ink-faint": "#5E5A6B",
        line: "rgba(246,244,239,0.08)",
        pigment: {
          coral: "#FF4D6D",
          flame: "#FF7A3D",
          azure: "#2E7CF6",
          emerald: "#00D9A3",
          amber: "#FFC845",
          violet: "#9B5CFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 12vw, 11rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 8vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "pigment-mesh":
          "radial-gradient(60% 50% at 20% 20%, var(--tw-gradient-stops))",
        "noise": "url('/assets/textures/noise.svg')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
