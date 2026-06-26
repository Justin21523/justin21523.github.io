import type {
  Metadata,
} from "next";
import {
  Inter,
  Noto_Sans_TC,
} from "next/font/google";

import {
  siteUrl,
} from "@/data/home";

import "./globals.css";

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
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Justin | Web Development, Data Organization, and LIS Portfolio",
    template: "%s | Justin Portfolio",
  },
  description:
    "Justin's bilingual portfolio for web development, data organization, metadata, digital archives, and library information science projects.",
  openGraph: {
    title:
      "Justin | Web Development, Data Organization, and LIS Portfolio",
    description:
      "Portfolio projects built around Python, JavaScript, TypeScript, metadata, search, digital archives, and learning-focused application development.",
    url: siteUrl,
    siteName: "Justin Portfolio",
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${notoSansTC.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
