import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/Badge";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  const skills = [
    "JavaScript (ES6+)", "React", "TypeScript", "Node.js", "Three.js", "WebGL",
    "Python", "Docker", "Tailwind CSS", "PostgreSQL", "Next.js", "Git"
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-12"
          >
            <div className="md:col-span-1">
              <h2 className="text-3xl font-bold tracking-tight mb-6">{t("about.philosophy")}</h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
            </div>
            
            <div className="md:col-span-2 space-y-8">
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  {t("about.p1")}
                </p>
                <p>
                  {t("about.p2")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">{t("about.stack")}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
