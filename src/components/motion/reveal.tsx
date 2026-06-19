"use client";

import type {
  ReactNode,
} from "react";
import {
  m,
  useReducedMotion,
} from "motion/react";

type RevealDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  distance?: number;
  once?: boolean;
  amount?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 32,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const shouldReduceMotion =
    useReducedMotion();

  const offset = shouldReduceMotion
    ? { x: 0, y: 0 }
    : getDirectionOffset(
        direction,
        distance
      );

  return (
    <m.div
      initial={{
        opacity: 0,
        ...offset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
      }}
      transition={{
        duration:
          shouldReduceMotion
            ? 0.2
            : duration,
        delay:
          shouldReduceMotion
            ? 0
            : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function getDirectionOffset(
  direction: RevealDirection,
  distance: number
) {
  switch (direction) {
    case "down":
      return {
        x: 0,
        y: -distance,
      };

    case "left":
      return {
        x: distance,
        y: 0,
      };

    case "right":
      return {
        x: -distance,
        y: 0,
      };

    case "none":
      return {
        x: 0,
        y: 0,
      };

    case "up":
    default:
      return {
        x: 0,
        y: distance,
      };
  }
}