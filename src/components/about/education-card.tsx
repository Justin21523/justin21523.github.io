"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import { Education } from "@/types/about";

interface EducationCardProps {
  education: Education;
  index: number;
}

export function EducationCard({ education, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{education.school}</h3>
          <p className="text-primary font-medium mb-2">{education.degree}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            <span>{education.period}</span>
          </div>
          {education.description && (
            <p className="text-sm text-muted-foreground">{education.description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}