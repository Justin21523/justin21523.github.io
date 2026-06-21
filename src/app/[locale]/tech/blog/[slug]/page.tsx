import type {
  Metadata,
} from "next";
import {
  notFound,
} from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
} from "lucide-react";

import {
  Link,
} from "@/i18n/navigation";
import {
  articles,
} from "@/data/tech";
import {
  normalizePortfolioLocale,
} from "@/lib/projects";

interface ArticleDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const {
    locale: localeParam,
    slug,
  } = await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );
  const article =
    articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title:
        locale === "en"
          ? "Article Not Found"
          : "找不到文章",
    };
  }

  const content =
    article.content[locale];

  return {
    title: `${content.title} | Justin Portfolio`,
    description: content.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const {
    locale: localeParam,
    slug,
  } = await params;
  const locale =
    normalizePortfolioLocale(
      localeParam
    );
  const article =
    articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const content =
    article.content[locale];
  const backLabel =
    locale === "en"
      ? "Back to notes"
      : "返回技術筆記";

  return (
    <div className="min-h-screen px-4 pb-12 pt-24">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/tech/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">
            {content.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{content.readTime}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary/50 px-3 py-1 text-xs text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose max-w-none leading-relaxed text-muted-foreground dark:prose-invert">
          <p>{content.body}</p>
        </div>
      </article>
    </div>
  );
}
