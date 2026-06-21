"use client";

import {
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import {
  ImageIcon,
  Play,
} from "lucide-react";

import {
  AnimatePresence,
  m,
} from "motion/react";

import type {
  PortfolioLocale,
  ProjectMedia,
} from "@/types/projects";
import {
  withBasePath,
} from "@/lib/site-assets";

interface ProjectMediaGalleryProps {
  media: ProjectMedia[];
  locale: PortfolioLocale;
}

export function ProjectMediaGallery({
  media,
  locale,
}: ProjectMediaGalleryProps) {
  const orderedMedia =
    useMemo(
      () =>
        [...media].sort(
          (a, b) =>
            Number(
              Boolean(
                b.featured
              )
            ) -
            Number(
              Boolean(
                a.featured
              )
            )
        ),
      [media]
    );

  const [
    selectedId,
    setSelectedId,
  ] = useState(
    orderedMedia[0]?.id ?? ""
  );

  const selectedMedia =
    orderedMedia.find(
      (item) =>
        item.id === selectedId
    ) ??
    orderedMedia[0];

  if (!selectedMedia) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-3xl border border-dashed border-border bg-card text-muted-foreground">
        <div className="text-center">
          <ImageIcon className="mx-auto mb-3 h-10 w-10" />

          <p>
            {locale === "en"
              ? "Project media will be added soon."
              : "專案媒體內容即將補上。"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-primary/5">
        <AnimatePresence
          mode="wait"
        >
          <m.div
            key={selectedMedia.id}
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.01,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative aspect-video bg-background"
          >
            {selectedMedia.type ===
            "video" ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={
                  withBasePath(
                    selectedMedia.poster
                  )
                }
                className="h-full w-full object-contain"
              >
                <source
                  src={
                    withBasePath(
                      selectedMedia.src
                    )
                  }
                />
              </video>
            ) : (
              <Image
                src={
                  withBasePath(
                    selectedMedia.src
                  ) ?? selectedMedia.src
                }
                alt={
                  selectedMedia.alt[
                    locale
                  ]
                }
                fill
                priority={
                  selectedMedia.featured
                }
                sizes="(max-width: 1280px) 100vw, 1200px"
                onError={(event) => {
                  event.currentTarget.style.opacity =
                    "0";
                }}
                className="object-contain"
              />
            )}
          </m.div>
        </AnimatePresence>

        <div className="border-t border-border p-5">
          <h2 className="font-bold">
            {
              selectedMedia.title[
                locale
              ]
            }
          </h2>

          {selectedMedia.caption && (
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {
                selectedMedia.caption[
                  locale
                ]
              }
            </p>
          )}
        </div>
      </div>

      {orderedMedia.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {orderedMedia.map(
            (item) => {
              const active =
                item.id ===
                selectedMedia.id;

              return (
                <m.button
                  key={item.id}
                  type="button"
                  whileHover={{
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    setSelectedId(
                      item.id
                    )
                  }
                  aria-label={
                    item.title[
                      locale
                    ]
                  }
                  className={`relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border-2 bg-secondary ${
                    active
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  {item.type ===
                  "video" ? (
                    <>
                      {item.poster && (
                        <Image
                          src={
                            withBasePath(
                              item.poster
                            ) ?? item.poster
                          }
                          alt=""
                          fill
                          sizes="160px"
                          onError={(event) => {
                            event.currentTarget.style.opacity =
                              "0";
                          }}
                          className="object-cover"
                        />
                      )}

                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-7 w-7 text-white" />
                      </span>
                    </>
                  ) : (
                    <Image
                      src={
                        withBasePath(
                          item.src
                        ) ?? item.src
                      }
                      alt=""
                      fill
                      sizes="160px"
                      onError={(event) => {
                        event.currentTarget.style.opacity =
                          "0";
                      }}
                      className="object-cover"
                    />
                  )}
                </m.button>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}
