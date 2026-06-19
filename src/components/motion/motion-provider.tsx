"use client";

import type { ReactNode } from "react";
import {
  domAnimation,
  LazyMotion,
  MotionConfig,
} from "motion/react";

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({
  children,
}: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}