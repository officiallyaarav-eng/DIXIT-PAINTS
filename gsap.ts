"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Smooths out scroll-driven animation on touchpads / fast scrolls.
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger };
