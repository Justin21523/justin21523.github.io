"use client";

import { useLocale } from "next-intl";

import {
  usePathname,
  useRouter,
} from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLanguage() {
    const nextLocale =
      locale === "zh-TW" ? "en" : "zh-TW";

    router.replace(pathname, {
      locale: nextLocale,
    });
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className="rounded-md border px-3 py-2"
    >
      {locale === "zh-TW" ? "English" : "繁體中文"}
    </button>
  );
}