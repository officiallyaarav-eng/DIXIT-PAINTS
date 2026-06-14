"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A soft radial glow that trails the cursor, tinted with the live accent
 * colour. Purely decorative — sits behind UI (z-40) and ignores pointer
 * events, but reinforces the "liquid pigment" feel across every section.
 */
export default function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{
        translateX: springX,
        translateY: springY,
        x: "-50%",
        y: "-50%",
      }}
    >
      <div
        className="h-[420px] w-[420px] rounded-full opacity-[0.18] blur-[80px] transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
