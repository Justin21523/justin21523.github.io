import { notFound } from "next/navigation";
import { articles } from "@/data/tech";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  
  return {
    title: `${article.title} | Justin Portfolio`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/tech/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回文章列表
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p>{article.content}</p>
          <p className="mt-4">
            (此處為文章內容預留位置，未來可串接 MDX 或 CMS 系統來管理完整文章內容。)
          </p>
        </div>
      </article>
    </div>
  );
}