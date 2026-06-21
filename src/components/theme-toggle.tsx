"use client";

import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const mounted = useMounted();
  const locale = useLocale();

  const {
    resolvedTheme,
    setTheme,
  } = useTheme();

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  const label =
    locale === "en"
      ? isDark
        ? "Light"
        : "Dark"
      : isDark
        ? "淺色"
        : "深色";

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(isDark ? "light" : "dark")
      }
      className="rounded-md border px-3 py-2"
    >
      {label}
    </button>
  );
}
