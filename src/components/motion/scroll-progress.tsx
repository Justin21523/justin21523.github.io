"use client";

import {
  m,
  useScroll,
  useSpring,
} from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 28,
      mass: 0.3,
    }
  );

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-primary"
    />
  );
}