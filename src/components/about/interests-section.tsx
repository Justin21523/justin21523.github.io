"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface InterestsSectionProps {
  interests: string[];
}

export function InterestsSection({ interests }: InterestsSectionProps) {
  const t = useTranslations("about.profile");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-8 bg-primary rounded-full"></span>
        {t("interests_title")}
      </h3>
      <div className="flex flex-wrap gap-3">
        {interests.map((interest, index) => (
          <motion.span
            key={interest}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
          >
            {interest}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}