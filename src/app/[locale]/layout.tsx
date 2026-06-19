import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { routing } from "@/i18n/routing";

// 預先載入字體，優化效能
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Justin Portfolio | Frontend Engineer",
    template: "%s | Justin Portfolio",
  },
  description: "Personal portfolio of Justin - Frontend Engineer specialized in React and Next.js",
  // 設定 Open Graph (讓分享到 LINE/FB 時有漂亮預覽)
  openGraph: {
    title: "Justin Portfolio",
    description: "Frontend Engineer specialized in React and Next.js",
    url: "https://your-portfolio-domain.com",
    siteName: "Justin Portfolio",
    locale: "zh_TW",
    type: "website",
  },
};

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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansTC.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}