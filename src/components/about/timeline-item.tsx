"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Experience } from "@/types/about";
import { useTranslations } from "next-intl";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const t = useTranslations("about.experience");

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border"></div>
      
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
        className="absolute left-0 top-0 w-4 h-4 -translate-x-[7px] rounded-full bg-primary border-4 border-background"
      />

      {/* Content Card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{experience.position}</h3>
            <p className="text-primary font-medium">{experience.company}</p>
          </div>
          {index === 0 && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {t("current")}
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{experience.period}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-4">{experience.description}</p>

        {/* Achievements */}
        <div>
          <h4 className="font-semibold mb-2 text-sm">{t("achievements")}</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}