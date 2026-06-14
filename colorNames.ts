/**
 * Convert an HSL triple to a 6-digit hex string.
 */
export function hslToHex(h: number, s: number, l: number): string {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) =>
    lNorm - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase();
}

/**
 * A small library of evocative paint names, organised by hue band, that
 * the "ColorSync AI" panel draws from. Deterministic per hue so the same
 * dial position always yields the same name.
 */
const NAME_BANDS: { max: number; names: string[] }[] = [
  { max: 15, names: ["Coral Pulse", "Cinder Rose", "Sunset Ember"] },
  { max: 45, names: ["Flame Bronze", "Amber Grain", "Copper Dawn"] },
  { max: 70, names: ["Solar Gold", "Honey Quartz", "Wheat Glow"] },
  { max: 100, names: ["Citrus Veil", "Meadow Light", "Fresh Lime"] },
  { max: 150, names: ["Emerald Guard", "Jade Current", "Forest Signal"] },
  { max: 195, names: ["Teal Drift", "Lagoon Mist", "Marine Pulse"] },
  { max: 230, names: ["Azure Shield", "Sky Circuit", "Cobalt Wave"] },
  { max: 265, names: ["Violet Sync", "Indigo Field", "Twilight Core"] },
  { max: 320, names: ["Orchid Signal", "Plum Static", "Magenta Drift"] },
  { max: 361, names: ["Coral Pulse", "Rose Quartz", "Blush Circuit"] },
];

export function getColorName(hue: number): string {
  const normalized = ((hue % 360) + 360) % 360;
  for (const band of NAME_BANDS) {
    if (normalized <= band.max) {
      const idx = Math.floor(normalized) % band.names.length;
      return band.names[idx];
    }
  }
  return "Pigment Unknown";
}

/**
 * A pseudo "AI confidence" score, purely cosmetic — gives the ColorSync
 * panel a believable spectral-match readout that shifts with the dial.
 */
export function getMatchConfidence(hue: number): number {
  const normalized = ((hue % 360) + 360) % 360;
  const wave = Math.sin((normalized / 360) * Math.PI * 4);
  return Math.round(96 + wave * 3.2);
}
