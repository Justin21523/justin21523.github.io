"use client";

import type {
  ReactNode,
} from "react";

import {
  m,
  useReducedMotion,
} from "motion/react";

interface LocaleTemplateProps {
  children: ReactNode;
}

export default function LocaleTemplate({
  children,
}: LocaleTemplateProps) {
  const shouldReduceMotion =
    useReducedMotion();

  return (
    <m.div
      initial={
        shouldReduceMotion
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              y: 18,
              filter:
                "blur(6px)",
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0.1
            : 0.5,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      {children}
    </m.div>
  );
}