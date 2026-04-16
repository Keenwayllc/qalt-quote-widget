"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiBurst() {
  useEffect(() => {
    const end = Date.now() + 2500;

    const colors = ["#10b981", "#34d399", "#ffffff", "#6ee7b7", "#059669"];

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        zIndex: 9999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
}
