export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  readTime: string;
}

export const articles: Article[] = [
  {
    slug: "nextjs-app-router-guide",
    title: "深入理解 Next.js App Router",
    excerpt: "Next.js 13 引入的 App Router 帶來了全新的路由與資料獲取方式，本文將帶你深入了解其核心概念。",
    content: "Next.js 13 引入的 App Router 帶來了全新的路由與資料獲取方式...",
    date: "2024-01-15",
    tags: ["Next.js", "React", "前端"],
    readTime: "8 分鐘",
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript 實戰最佳實踐",
    excerpt: "從型別定義到進階型別操作，分享我在大型專案中使用 TypeScript 的經驗與技巧。",
    content: "從型別定義到進階型別操作，分享我在大型專案中使用 TypeScript 的經驗與技巧...",
    date: "2024-02-20",
    tags: ["TypeScript", "最佳實踐"],
    readTime: "12 分鐘",
  },
  {
    slug: "tailwind-css-tips",
    title: "Tailwind CSS 高效開發技巧",
    excerpt: "如何利用 Tailwind CSS 的原子化類別快速建構響應式介面，並保持程式碼整潔。",
    content: "如何利用 Tailwind CSS 的原子化類別快速建構響應式介面...",
    date: "2024-03-10",
    tags: ["Tailwind CSS", "CSS"],
    readTime: "6 分鐘",
  },
];