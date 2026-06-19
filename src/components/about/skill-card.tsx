"use client";

import { motion } from "framer-motion";
import { Skill } from "@/types/about";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">{skill.name}</h3>
        <span className="text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </motion.div>
  );
}