"use client";

import { useTranslations } from "next-intl";
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
  GitBranch,  // 改用 GitBranch 代替 Github
  BookOpen,
  Terminal,
  Layers,
  Download,
  ExternalLink,
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

// 定義導航結構
const navStructure = {
  about: [
    { href: "/about/profile", label: "個人簡介", icon: User, description: "認識我" },
    { href: "/about/skills", label: "技能樹", icon: Layers, description: "技術能力" },
    { href: "/about/experience", label: "工作經歷", icon: Briefcase, description: "職業歷程" },
    { href: "/about/education", label: "教育背景", icon: BookOpen, description: "學歷與證照" },
  ],
  projects: [
    { href: "/projects/web", label: "Web 應用", icon: Laptop, description: "網站與網頁應用" },
    { href: "/projects/mobile", label: "移動應用", icon: Smartphone, description: "iOS/Android App" },
    { href: "/projects/design", label: "UI/UX 設計", icon: Palette, description: "介面設計作品" },
    { href: "/projects/opensource", label: "開源專案", icon: GitBranch, description: "GitHub 貢獻" }, // 改用 GitBranch
    { href: "/projects/all", label: "查看全部", icon: ExternalLink, description: "所有作品" },
  ],
  tech: [
    { href: "/tech/frontend", label: "前端開發", icon: Code2, description: "React/Vue/Next.js" },
    { href: "/tech/backend", label: "後端開發", icon: Terminal, description: "Node.js/Python" },
    { href: "/tech/devops", label: "DevOps", icon: Layers, description: "CI/CD/雲端" },
    { href: "/tech/blog", label: "技術文章", icon: FileText, description: "學習筆記" },
  ],
  contact: [
    { href: "/contact/form", label: "聯絡表單", icon: Mail, description: "發送訊息" },
    { href: "/contact/social", label: "社群連結", icon: ExternalLink, description: "關注我" },
    { href: "/resume.pdf", label: "下載履歷", icon: Download, description: "PDF 格式", external: true },
  ],
};

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: "about", label: t("about"), items: navStructure.about },
    { key: "projects", label: t("projects"), items: navStructure.projects },
    { key: "tech", label: t("tech"), items: navStructure.tech },
    { key: "contact", label: t("contact"), items: navStructure.contact },
  ];

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
                  pathname.startsWith(subItem.href)
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
                      
                      {item.items.map((subItem: { href: string; label: string; icon: any; description: string; external?: boolean }) => {
                        const Icon = subItem.icon;
                        const isExternal = subItem.external;
                        
                        return (
                          <DropdownMenuItem key={subItem.href} asChild>
                            <Link
                              href={subItem.href}
                              target={isExternal ? "_blank" : undefined}
                              rel={isExternal ? "noopener noreferrer" : undefined}
                              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer group hover:bg-accent/50"
                              onClick={() => setOpenDropdown(null)}
                            >
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
                            </Link>
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
              <LanguageToggle />
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
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
              <h2 className="text-lg font-semibold">選單</h2>
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
                    {item.items.map((subItem: { href: string; label: string; icon: any; description: string; external?: boolean }) => {
                      const Icon = subItem.icon;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span>{subItem.label}</span>
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