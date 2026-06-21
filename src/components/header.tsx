"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  User, 
  Briefcase, 
  Code2, 
  FileText, 
  Mail,
  Laptop,
  Smartphone,
  Palette,
  GitBranch,
  BookOpen,
  Terminal,
  Layers,
  Download,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { Link, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ProjectCommandButton,
} from "@/components/command/project-command-button";
import {
  githubProfileUrl,
  resumePath,
} from "@/data/contact";
import {
  withBasePath,
} from "@/lib/site-assets";

const navStructure: NavStructure = {
  "zh-TW": {
    about: [
      { href: "/about/profile", label: "個人簡介", icon: User, description: "背景、角色與開發方向" },
      { href: "/about/skills", label: "技能證據", icon: Layers, description: "以作品呈現能力" },
      { href: "/about/experience", label: "經歷", icon: Briefcase, description: "實作與學習歷程" },
      { href: "/about/education", label: "教育背景", icon: BookOpen, description: "圖書資訊與技術養成" },
    ],
    projects: [
      { href: "/projects/all", label: "作品典藏庫", icon: ExternalLink, description: "搜尋所有專案與 Metadata" },
      { href: "/projects/web", label: "前端與 Web", icon: Laptop, description: "React、Next.js、互動介面" },
      { href: "/projects/design", label: "資訊架構", icon: Palette, description: "分類、檢索與工作流程" },
      { href: "/projects/opensource", label: "GitHub 專案", icon: GitBranch, description: "可公開查看的程式碼" },
      { href: "/projects/mobile", label: "桌面與跨平台", icon: Smartphone, description: "Avalonia、Qt 與系統工具" },
    ],
    tech: [
      { href: "/projects/all", label: "前端工程", icon: Code2, description: "先前往作品集查看相關實作" },
      { href: "/projects/all", label: "後端與資料", icon: Terminal, description: "先前往作品集查看相關實作" },
      { href: "/projects/all", label: "部署與工具", icon: Layers, description: "先前往作品集查看相關實作" },
      { href: "/projects/all", label: "技術筆記", icon: FileText, description: "先前往作品集查看相關實作" },
    ],
    contact: [
      { href: "/contact/form", label: "聯絡表單", icon: Mail, description: "合作、面試與專案交流" },
      { href: githubProfileUrl, label: "相關連結", icon: ExternalLink, description: "GitHub 與公開資料", external: true },
      { href: resumePath, label: "下載履歷", icon: Download, description: "PDF 檔案", external: true },
    ],
  },
  en: {
    about: [
      { href: "/about/profile", label: "Profile", icon: User, description: "Background, role, and direction" },
      { href: "/about/skills", label: "Skill Evidence", icon: Layers, description: "Capabilities shown through projects" },
      { href: "/about/experience", label: "Experience", icon: Briefcase, description: "Project and learning history" },
      { href: "/about/education", label: "Education", icon: BookOpen, description: "Library science and engineering path" },
    ],
    projects: [
      { href: "/projects/all", label: "Project Archive", icon: ExternalLink, description: "Search all projects and metadata" },
      { href: "/projects/web", label: "Frontend & Web", icon: Laptop, description: "React, Next.js, interactive UI" },
      { href: "/projects/design", label: "Information Architecture", icon: Palette, description: "Classification, retrieval, workflow" },
      { href: "/projects/opensource", label: "GitHub Projects", icon: GitBranch, description: "Public source code" },
      { href: "/projects/mobile", label: "Desktop & Cross-platform", icon: Smartphone, description: "Avalonia, Qt, and system tools" },
    ],
    tech: [
      { href: "/projects/all", label: "Frontend Engineering", icon: Code2, description: "View related work in the project archive" },
      { href: "/projects/all", label: "Backend & Data", icon: Terminal, description: "View related work in the project archive" },
      { href: "/projects/all", label: "Deployment & Tools", icon: Layers, description: "View related work in the project archive" },
      { href: "/projects/all", label: "Engineering Notes", icon: FileText, description: "View related work in the project archive" },
    ],
    contact: [
      { href: "/contact/form", label: "Contact Form", icon: Mail, description: "Work, interviews, and collaboration" },
      { href: githubProfileUrl, label: "Links", icon: ExternalLink, description: "GitHub and public profiles", external: true },
      { href: resumePath, label: "Resume", icon: Download, description: "PDF file", external: true },
    ],
  },
};

interface NavSubItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
  external?: boolean;
}

type NavSectionKey =
  | "about"
  | "projects"
  | "tech"
  | "contact";

type NavLocale =
  | "zh-TW"
  | "en";

type NavStructure = Record<
  NavLocale,
  Record<NavSectionKey, NavSubItem[]>
>;

function navHref(item: NavSubItem) {
  return item.external
    ? withBasePath(item.href) ?? item.href
    : item.href;
}

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() === "en" ? "en" : "zh-TW";
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: "about", label: t("about"), items: navStructure[locale].about },
    { key: "projects", label: t("projects"), items: navStructure[locale].projects },
    { key: "tech", label: t("tech"), items: navStructure[locale].tech },
    { key: "contact", label: t("contact"), items: navStructure[locale].contact },
  ];
  const commandLabel = locale === "en" ? "Search all projects" : "搜尋所有作品";
  const menuLabel = locale === "en" ? "Menu" : "選單";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-80 transition-opacity"
            >
              <Code2 className="w-6 h-6" />
              <span>Justin</span>
            </Link>

            {/* Desktop Navigation with Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.items.some(subItem => 
                  !subItem.external && pathname.startsWith(subItem.href)
                );

                return (
                  <DropdownMenu 
                    key={item.key}
                    open={openDropdown === item.key}
                    onOpenChange={(open) => setOpenDropdown(open ? item.key : null)}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`relative h-10 px-4 font-medium transition-colors ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                        }`}
                      >
                        {item.label}
                        <ChevronDown 
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            openDropdown === item.key ? "rotate-180" : ""
                          }`}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    
                    <DropdownMenuContent 
                      align="start" 
                      className="w-64 p-2"
                      sideOffset={8}
                    >
                      <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                        {item.label}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {item.items.map((subItem: NavSubItem) => {
                        const Icon = subItem.icon;
                        const isExternal = subItem.external;
                        const content = (
                          <>
                            <div className="mt-0.5">
                              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm group-hover:text-primary transition-colors">
                                {subItem.label}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {subItem.description}
                              </div>
                            </div>
                            {isExternal && (
                              <ExternalLink className="w-3 h-3 text-muted-foreground" />
                            )}
                          </>
                        );
                        
                        return (
                          <DropdownMenuItem key={subItem.href} asChild>
                            {isExternal ? (
                              <a
                                href={navHref(subItem)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer group hover:bg-accent/50"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {content}
                              </a>
                            ) : (
                              <Link
                                href={navHref(subItem)}
                                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer group hover:bg-accent/50"
                                onClick={() => setOpenDropdown(null)}
                              >
                                {content}
                              </Link>
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              })}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <ProjectCommandButton />
              <LanguageToggle />
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label={menuLabel}
              >
                <div className="w-5 h-5 flex flex-col justify-center gap-1">
                  <span className="w-5 h-0.5 bg-current block transition-all"></span>
                  <span className="w-5 h-0.5 bg-current block transition-all"></span>
                  <span className="w-5 h-0.5 bg-current block transition-all"></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <button
              type="button"
              onClick={() => {
                  window.dispatchEvent(
                  new CustomEvent(
                      "portfolio:open-command"
                  )
                  );
              }}
              >
              {commandLabel}
              </button>
              <h2 className="text-lg font-semibold">{menuLabel}</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              {navItems.map((item) => (
                <div key={item.key} className="mb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
                    {item.label}
                  </h3>
                  <div className="space-y-1">
                    {item.items.map((subItem: NavSubItem) => {
                      const Icon = subItem.icon;
                      const content = (
                        <>
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span>{subItem.label}</span>
                        </>
                      );

                      return subItem.external ? (
                          <a
                            key={subItem.href}
                            href={navHref(subItem)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            {content}
                          </a>
                        ) : (
                          <Link
                            key={subItem.href}
                            href={navHref(subItem)}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            {content}
                          </Link>
                        );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

// Export navStructure for mobile menu
export { navStructure };
