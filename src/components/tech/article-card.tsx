"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Article } from "@/data/tech";
import { Link } from "@/i18n/navigation";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
    >
      <Link href={`/tech/blog/${article.slug}`} className="block">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}