"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ACCENTS, ACCENT_ORDER } from "@/lib/data";
import type { AccentColor, AccentKey } from "@/types";

interface AccentContextValue {
  /** Current hue, 0-360 — single source of truth for --accent-h */
  hue: number;
  /** Closest named accent to the current hue */
  accent: AccentColor;
  /** Directly set the hue (used by the Pigment Lens dial) */
  setHue: (hue: number) => void;
  /** Smoothly target a named accent (used by scroll storytelling) */
  setAccentByKey: (key: AccentKey) => void;
}

const AccentContext = createContext<AccentContextValue | null>(null);

function closestAccent(hue: number): AccentColor {
  let closest = ACCENTS[ACCENT_ORDER[0]];
  let smallestDiff = Infinity;

  for (const key of ACCENT_ORDER) {
    const candidate = ACCENTS[key];
    const diff = Math.min(
      Math.abs(candidate.hue - hue),
      360 - Math.abs(candidate.hue - hue)
    );
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = candidate;
    }
  }
  return closest;
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [hue, setHueState] = useState<number>(ACCENTS.coral.hue);

  // Reflect the live hue into a CSS custom property so every component —
  // glows, borders, gradients, the 3D bucket's emissive ring — can read it
  // without prop-drilling.
  useEffect(() => {
    document.documentElement.style.setProperty("--accent-h", String(hue));
  }, [hue]);

  const setHue = useCallback((next: number) => {
    setHueState(((next % 360) + 360) % 360);
  }, []);

  const setAccentByKey = useCallback((key: AccentKey) => {
    setHueState(ACCENTS[key].hue);
  }, []);

  const accent = useMemo(() => closestAccent(hue), [hue]);

  const value = useMemo(
    () => ({ hue, accent, setHue, setAccentByKey }),
    [hue, accent, setHue, setAccentByKey]
  );

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) {
    throw new Error("useAccent must be used within an AccentProvider");
  }
  return ctx;
}
