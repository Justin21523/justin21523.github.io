"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { navStructure } from "@/components/header";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const navItems = [
    { key: "about", label: t("about"), items: navStructure.about },
    { key: "projects", label: t("projects"), items: navStructure.projects },
    { key: "tech", label: t("tech"), items: navStructure.tech },
    { key: "contact", label: t("contact"), items: navStructure.contact },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-background border-l border-border z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">選單</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = item.items.some(subItem => 
                    pathname.startsWith(subItem.href)
                  );

                  return (
                    <div key={item.key}>
                      <button
                        onClick={() => setExpandedItem(
                          expandedItem === item.key ? null : item.key
                        )}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent/50"
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            expandedItem === item.key ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedItem === item.key && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pr-2 py-2 space-y-1">
                              {item.items.map((subItem) => {
                                const Icon = subItem.icon;
                                return (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                                  >
                                    <Icon className="w-4 h-4" />
                                    <span>{subItem.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}