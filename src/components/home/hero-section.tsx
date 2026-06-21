"use client";

import type {
  PointerEvent,
} from "react";
import {
  useRef,
} from "react";
import {
  ArrowRight,
  Box,
  Code2,
  Database,
  GitBranch,
  Mail,
  Sparkles,
} from "lucide-react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { Link } from "@/i18n/navigation";
import type {
  HomeContent,
} from "@/data/home";

interface HeroSectionProps {
  content: HomeContent["hero"];
}

const orbitItems = [
  {
    label: "React",
    className:
      "left-2 top-[18%] md:-left-3",
  },
  {
    label: "TypeScript",
    className:
      "right-0 top-[22%] md:-right-4",
  },
  {
    label: "Three.js",
    className:
      "bottom-[18%] left-4 md:-left-2",
  },
  {
    label: "Metadata",
    className:
      "bottom-[12%] right-1 md:-right-6",
  },
];

const ctaIcons = {
  arrow: ArrowRight,
  mail: Mail,
  github: GitBranch,
} as const;

export function HeroSection({
  content,
}: HeroSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const pointerX =
    useMotionValue(0);

  const pointerY =
    useMotionValue(0);

  const smoothX = useSpring(
    pointerX,
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const smoothY = useSpring(
    pointerY,
    {
      stiffness: 80,
      damping: 20,
    }
  );

  const backgroundX =
    useTransform(
      smoothX,
      [-600, 600],
      [-45, 45]
    );

  const backgroundY =
    useTransform(
      smoothY,
      [-400, 400],
      [-35, 35]
    );

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end start",
      ],
    });

  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 150]
  );

  const heroOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.78],
      [1, 0]
    );

  function handlePointerMove(
    event: PointerEvent<HTMLElement>
  ) {
    if (shouldReduceMotion) {
      return;
    }

    const rect =
      event.currentTarget
        .getBoundingClientRect();

    pointerX.set(
      event.clientX -
        rect.left -
        rect.width / 2
    );

    pointerY.set(
      event.clientY -
        rect.top -
        rect.height / 2
    );
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        resetPointer
      }
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border/60 pt-24"
    >
      <div
        aria-hidden="true"
        className="portfolio-grid absolute inset-0 opacity-60"
      />

      <m.div
        aria-hidden="true"
        style={{
          x: shouldReduceMotion
            ? 0
            : backgroundX,
          y: shouldReduceMotion
            ? 0
            : backgroundY,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px] will-change-transform"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 bottom-8 h-96 w-96 rounded-full bg-secondary/60 blur-3xl"
      />

      <m.div
        style={{
          y: shouldReduceMotion
            ? 0
            : heroY,
          opacity:
            shouldReduceMotion
              ? 1
              : heroOpacity,
        }}
        className="section-shell relative z-10 grid items-center gap-16 py-16 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <m.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles className="h-4 w-4" />

            {content.eyebrow}
          </m.div>

          <m.p
            initial={{
              opacity: 0,
              y: 22,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="mb-4 text-lg font-medium text-muted-foreground"
          >
            {content.greeting}
          </m.p>

          <m.h1
            initial={{
              opacity: 0,
              y: 28,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.28,
              duration: 0.8,
            }}
            className="max-w-4xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl xl:text-7xl"
          >
            {content.title}

            <span className="mt-2 block bg-gradient-to-r from-primary via-blue-400 to-violet-400 bg-clip-text text-transparent">
              {content.titleAccent}
            </span>
          </m.h1>

          <m.p
            initial={{
              opacity: 0,
              y: 26,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="mt-7 max-w-3xl text-pretty text-base leading-8 text-muted-foreground md:text-lg"
          >
            {content.description}
          </m.p>

          <m.div
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
            className="mt-8 flex flex-wrap gap-4"
          >
            {content.ctas.map((cta) => {
              const Icon =
                ctaIcons[cta.icon];
              const className =
                cta.variant === "primary"
                  ? "group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                  : "group inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/70 px-6 py-3.5 font-medium backdrop-blur transition-colors hover:bg-accent";

              if (
                "external" in cta &&
                cta.external
              ) {
                return (
                  <a
                    key={cta.label}
                    href={cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                    {cta.label}
                  </a>
                );
              }

              return (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={className}
                >
                  {cta.label}
                  <Icon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              );
            })}
          </m.div>

          <m.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.65,
            }}
            className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <span className="relative flex h-3 w-3">
              {!shouldReduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              )}

              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>

            {content.availability}
          </m.div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-[32rem] lg:block">
          <m.div
            initial={{
              opacity: 0,
              scale: 0.88,
              rotate: -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.9,
            }}
            className="absolute inset-[12%] rounded-full border border-primary/25 bg-card/50 shadow-2xl shadow-primary/10 backdrop-blur-xl"
          />

          <m.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: 360,
                  }
            }
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[5%] rounded-full border border-dashed border-primary/25"
          />

          <m.div
            aria-hidden="true"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: -360,
                  }
            }
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[20%] rounded-full border border-dashed border-border"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <m.div
              whileHover={{
                scale: 1.06,
                rotate: 2,
              }}
              className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-primary/30 bg-background/80 shadow-2xl shadow-primary/20 backdrop-blur-xl"
            >
              <Code2 className="mb-3 h-10 w-10 text-primary" />

              <span className="text-lg font-bold">
                Justin
              </span>

              <span className="text-xs text-muted-foreground">
                Systems Builder
              </span>
            </m.div>
          </div>

          {orbitItems.map(
            (item, index) => (
              <m.div
                key={item.label}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y:
                    shouldReduceMotion
                      ? 0
                      : [
                          0,
                          index % 2 === 0
                            ? -10
                            : 10,
                          0,
                        ],
                }}
                transition={{
                  opacity: {
                    delay:
                      0.65 +
                      index * 0.1,
                  },
                  scale: {
                    delay:
                      0.65 +
                      index * 0.1,
                  },
                  y: {
                    duration:
                      3.5 +
                      index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className={`absolute rounded-xl border border-border bg-background/85 px-4 py-3 text-sm font-semibold shadow-lg backdrop-blur ${item.className}`}
              >
                {item.label}
              </m.div>
            )
          )}

          <Database className="absolute left-[18%] top-[46%] h-6 w-6 text-primary/45" />

          <Box className="absolute bottom-[26%] right-[22%] h-6 w-6 text-primary/45" />
        </div>

        <m.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.72,
          }}
          className="grid gap-3 sm:grid-cols-3 lg:col-span-2"
        >
          {content.focusCards.map(
            (item) => (
              <m.div
                key={item.label}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.01,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                }}
                className="rounded-2xl border border-border/80 bg-card/70 p-5 backdrop-blur"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  {item.label}
                </p>

                <p className="font-medium">
                  {item.value}
                </p>
              </m.div>
            )
          )}
        </m.div>
      </m.div>
    </section>
  );
}
