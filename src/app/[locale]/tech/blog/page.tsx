import { articles } from "@/data/tech";
import { ArticleCard } from "@/components/tech/article-card";

export const metadata = {
  title: "技術文章 | Justin Portfolio",
  description: "分享前端開發、React、Next.js 等技術心得與學習筆記。",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">技術文章</h1>
          <p className="text-lg text-muted-foreground">
            記錄學習歷程與技術心得
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}