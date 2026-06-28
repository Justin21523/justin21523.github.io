import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import {
  ProjectCommandPalette,
} from "@/components/command/project-command-palette";

import {
  normalizePortfolioLocale,
} from "@/lib/projects";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const portfolioLocale = normalizePortfolioLocale(locale);

  return (
    <NextIntlClientProvider
      messages={messages}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <MotionProvider>
          <ScrollProgress />

          <Header />

          <ProjectCommandPalette
            locale={
              portfolioLocale
            }
          />

          {children}
        </MotionProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
