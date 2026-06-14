"use client";

import { useEffect, useState } from "react";

export interface NormalizedPointer {
  /** -1 (left) to 1 (right) */
  x: number;
  /** -1 (top) to 1 (bottom) */
  y: number;
}

/**
 * Tracks pointer position normalized to [-1, 1] on each axis, with (0,0)
 * at the centre of the viewport. Used to drive the hero's 3D perspective
 * and ambient parallax across the page.
 */
export function useMousePosition(): NormalizedPointer {
  const [pos, setPos] = useState<NormalizedPointer>({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setPos({ x, y });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return pos;
}
