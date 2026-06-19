"use client";

import {
  Command,
  Search,
} from "lucide-react";

import {
  m,
} from "motion/react";

export function ProjectCommandButton() {
  function openCommandPalette() {
    window.dispatchEvent(
      new CustomEvent(
        "portfolio:open-command"
      )
    );
  }

  return (
    <m.button
      type="button"
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.96,
      }}
      onClick={
        openCommandPalette
      }
      aria-label="搜尋所有作品"
      className="group hidden h-10 items-center gap-2 rounded-lg border border-border bg-background/70 px-3 text-sm text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground sm:inline-flex"
    >
      <Search className="h-4 w-4" />

      <span className="hidden xl:inline">
        搜尋作品
      </span>

      <span className="ml-1 hidden items-center gap-1 xl:flex">
        <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px]">
          <Command className="inline h-3 w-3" />
        </kbd>

        <kbd className="rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px]">
          K
        </kbd>
      </span>
    </m.button>
  );
}