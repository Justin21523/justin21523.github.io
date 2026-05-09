import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-secondary/30 py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {t("footer.rights")}
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/Justin21523" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href="mailto:you@example.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}