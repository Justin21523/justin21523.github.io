"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface BioSectionProps {
  bio: string[];
}

export function BioSection({ bio }: BioSectionProps) {
  const t = useTranslations("about.profile");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-primary rounded-full"></span>
        {t("bio_title")}
      </h3>
      <div className="space-y-4">
        {bio.map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="text-muted-foreground leading-relaxed"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}