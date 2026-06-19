"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Skill } from "@/types/about";
import { SkillCard } from "./skill-card";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations("about.skills");

  const categories = [
    { key: "frontend", label: t("frontend"), skills: skills.filter(s => s.category === "frontend") },
    { key: "backend", label: t("backend"), skills: skills.filter(s => s.category === "backend") },
    { key: "tools", label: t("tools"), skills: skills.filter(s => s.category === "tools") },
    { key: "design", label: t("design"), skills: skills.filter(s => s.category === "design") },
  ];

  return (
    <div className="space-y-12">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.1 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary rounded-full"></span>
            {category.label}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}