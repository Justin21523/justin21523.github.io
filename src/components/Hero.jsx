import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { ArrowRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Hero3D = React.lazy(() => import("./Hero3D"));

class Hero3DBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* 3D Background */}
      <Hero3DBoundary>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </Hero3DBoundary>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent/50 text-accent-foreground mb-8 ring-1 ring-inset ring-accent/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t("hero.available")}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 text-balance leading-[1.1]">
            {t("hero.headline_prefix")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{t("hero.headline_highlight")}</span> {t("hero.headline_suffix")}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl text-balance leading-relaxed">
            {t("hero.subheadline")}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
              <Link to="/projects">
                {t("hero.cta_projects")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm" asChild>
              <a href="https://github.com/Justin21523" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> {t("hero.cta_github")}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Abstract Background Gradient Overlay */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
}
