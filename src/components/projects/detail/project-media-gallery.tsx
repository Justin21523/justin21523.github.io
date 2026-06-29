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
  getMediaPreviewSource,
  getVideoFirstMedia,
} from "@/lib/project-media";
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
        getVideoFirstMedia(media),
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
  const fallbackPoster =
    orderedMedia.find((item) => item.type === "image" && !item.placeholder)?.src ??
    orderedMedia.find((item) => item.type === "image")?.src;
  const screenshotCount = orderedMedia.filter((item) => item.type === "image" && !item.placeholder).length;
  const videoCount = orderedMedia.filter((item) => item.type === "video" && !item.placeholder).length;

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
                    getMediaPreviewSource(selectedMedia, fallbackPoster)
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

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
            {screenshotCount > 0 && (
              <span className="rounded-full bg-secondary px-3 py-1">
                {locale === "en" ? `${screenshotCount} screenshots` : `${screenshotCount} 張截圖`}
              </span>
            )}

            {videoCount > 0 && (
              <span className="rounded-full bg-secondary px-3 py-1">
                {locale === "en" ? `${videoCount} demo videos` : `${videoCount} 支 Demo 影片`}
              </span>
            )}
          </div>
        </div>
      </div>

      {orderedMedia.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {orderedMedia.map(
            (item) => {
              const active =
                item.id ===
                selectedMedia.id;
              const preview =
                getMediaPreviewSource(item, fallbackPoster);

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
                      {preview && (
                        <Image
                          src={
                            withBasePath(
                              preview
                            ) ?? preview
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

      {orderedMedia.length > 1 && (
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              {locale === "en" ? "Media overview" : "媒體總覽"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {videoCount > 0
                ? locale === "en"
                  ? "Browse the project screenshots and recorded walkthroughs."
                  : "快速瀏覽這個專案的截圖與錄影展示。"
                : locale === "en"
                  ? "Browse the project screenshots."
                  : "快速瀏覽這個專案的截圖。"}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {orderedMedia.map((item) => {
              const preview = getMediaPreviewSource(item, fallbackPoster);
              const active = item.id === selectedMedia.id;

              return (
                <button
                  key={`overview-${item.id}`}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className={`group overflow-hidden rounded-2xl border bg-card text-left transition ${
                    active ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/60"
                  }`}
                >
                  <span className="relative block aspect-video bg-secondary">
                    {preview && (
                      <Image
                        src={withBasePath(preview) ?? preview}
                        alt={item.alt[locale]}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        onError={(event) => {
                          event.currentTarget.style.opacity =
                            "0";
                        }}
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    )}

                    {item.type === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="rounded-full bg-background/90 p-3 text-foreground">
                          <Play className="h-6 w-6" />
                        </span>
                      </span>
                    )}
                  </span>

                  <span className="block p-3">
                    <span className="block text-sm font-semibold">
                      {item.title[locale]}
                    </span>

                    <span className="mt-1 block text-xs text-muted-foreground">
                      {item.type === "video"
                        ? locale === "en"
                          ? "Demo recording"
                          : "Demo 錄影"
                        : locale === "en"
                          ? "Screenshot"
                          : "截圖"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
