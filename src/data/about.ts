import { ProfileInfo, Skill, Experience, Education } from "@/types/about";

export const profileInfo: ProfileInfo = {
  name: "Justin",
  title: "Frontend Engineer",
  location: "Taipei, Taiwan",
  email: "justin@example.com",
  bio: [
    "我是一位熱愛創造的前端工程師，擁有 3 年以上的開發經驗。專注於使用 React、Next.js 和 TypeScript 打造高效能、可維護的網頁應用。",
    "我相信優秀的程式碼不僅要能運作，更要具備可讀性與可擴展性。在日常工作中，我持續學習最新的前端技術，並致力於提升使用者體驗。",
    "除了技術能力，我也重視團隊合作與溝通。我喜歡分享知識，參與開源社群，並持續挑戰自我。",
  ],
  interests: ["前端開發", "UI/UX 設計", "開源貢獻", "技術寫作", "攝影", "旅行"],
  avatar: "/images/avatar.jpg",
};

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 85, category: "frontend" },
  { name: "TypeScript", level: 88, category: "frontend" },
  { name: "Vue.js", level: 75, category: "frontend" },
  { name: "Tailwind CSS", level: 92, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  
  // Backend
  { name: "Node.js", level: 70, category: "backend" },
  { name: "Express", level: 68, category: "backend" },
  { name: "Python", level: 60, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  
  // Tools
  { name: "Git", level: 88, category: "tools" },
  { name: "Docker", level: 65, category: "tools" },
  { name: "Webpack/Vite", level: 80, category: "tools" },
  { name: "Jest/Vitest", level: 75, category: "tools" },
  
  // Design
  { name: "Figma", level: 78, category: "design" },
  { name: "UI/UX Design", level: 72, category: "design" },
  { name: "Responsive Design", level: 90, category: "design" },
];

export const experiences: Experience[] = [
  {
    company: "Tech Company A",
    position: "Senior Frontend Engineer",
    period: "2023 - Present",
    location: "Taipei, Taiwan",
    description: "負責核心產品的前端架構設計與開發，帶領 3 人前端團隊。",
    achievements: [
      "主導公司主要產品從 Vue 2 遷移至 React + TypeScript，提升開發效率 40%",
      "建立前端元件庫，統一 UI 規範，減少 30% 重複開發時間",
      "優化網站效能，Lighthouse 分數從 60 提升至 95+",
      "導入 CI/CD 流程，自動化測試覆蓋率達 80%",
    ],
  },
  {
    company: "Startup B",
    position: "Frontend Engineer",
    period: "2021 - 2023",
    location: "Taipei, Taiwan",
    description: "參與新創公司產品開發，從 0 到 1 打造 SaaS 平台。",
    achievements: [
      "使用 Next.js + Tailwind CSS 開發公司官網與產品頁面",
      "實作響應式設計，支援手機、平板、桌面等多種裝置",
      "串接 RESTful API，處理複雜的資料狀態管理",
      "參與 UI/UX 設計討論，提供技術可行性建議",
    ],
  },
  {
    company: "Company C",
    position: "Junior Frontend Developer",
    period: "2020 - 2021",
    location: "Taipei, Taiwan",
    description: "入門前端開發，學習業界標準與最佳實踐。",
    achievements: [
      "使用 Vue.js 開發內部管理系統",
      "學習 Git 版本控制與團隊協作流程",
      "參與程式碼審查，學習 code review 技巧",
    ],
  },
];

export const educations: Education[] = [
  {
    school: "National Taiwan University",
    degree: "Master of Computer Science",
    period: "2018 - 2020",
    description: "專注於人機互動與網頁技術研究",
  },
  {
    school: "National Cheng Kung University",
    degree: "Bachelor of Information Engineering",
    period: "2014 - 2018",
    description: "學習計算機科學基礎與軟體工程",
  },
];