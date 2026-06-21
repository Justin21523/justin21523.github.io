import type {
  Metadata,
} from "next";

import {
  ArticleCard,
} from "@/components/tech/article-card";
import {
  articles,
} from "@/data/tech";
import {
  normalizePortfolioLocale,
} from "@/lib/projects";

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
  } = await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );

  return {
    title:
      locale === "en"
        ? "Engineering Notes | Justin Portfolio"
        : "技術筆記 | Justin Portfolio",
    description:
      locale === "en"
        ? "Notes on frontend engineering, metadata systems, desktop apps, and portfolio architecture."
        : "記錄前端工程、Metadata 系統、桌面應用與作品集架構的實作筆記。",
  };
}

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const {
    locale: localeParam,
  } = await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );
  const text =
    locale === "en"
      ? {
          title: "Engineering Notes",
          description:
            "Notes on implementation details, tradeoffs, and learning records from my projects.",
        }
      : {
          title: "技術筆記",
          description:
            "記錄作品中的實作細節、取捨與學習紀錄。",
        };

  return (
    <div className="min-h-screen px-4 pb-12 pt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {text.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {text.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.slug}
              article={article}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
