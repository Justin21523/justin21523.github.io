import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProjectContent } from "../hooks/useProjectContent";
import { canPlayVideo } from "../lib/media";

export default function ProjectShowcase({ projects }) {
  const { t } = useTranslation();
  // Filter for featured projects only for the homepage
  const featuredProjects = projects.filter(p => p.featured || p.tags?.includes("featured"));

  return (
    <section className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t("showcase.title")}</h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              {t("showcase.subtitle")}
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link to="/projects">{t("showcase.view_all")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <ShowcaseCard key={project.id} project={project} index={index} t={t} />
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link to="/projects">{t("showcase.view_all")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ project: initialProject, index, t }) {
  const isEven = index % 2 === 0;
  const project = useProjectContent(initialProject);
  const videoRef = React.useRef(null);
  const [showVideo, setShowVideo] = React.useState(false);

  React.useEffect(() => {
    if (!project?.video) {
      setShowVideo(false);
      return;
    }
    setShowVideo(canPlayVideo(project.video));
  }, [project?.video]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
    >
      {/* Project Image Area - Order varies based on even/odd */}
      <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <Link 
          to={`/projects/${project.slug}`}
          className="block relative rounded-2xl overflow-hidden border border-border/50 shadow-lg bg-secondary/50 aspect-video group-hover:shadow-xl transition-shadow duration-500 cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-muted-foreground">
             {/* Use Video if available, else Image */}
             {project.video && showVideo ? (
                <video 
                  ref={videoRef}
                  src={project.video} 
                  poster={project.image}
                  className="w-full h-full object-cover transition-transform duration-700"
                  muted
                  autoPlay
                  playsInline
                  loop
                  preload="metadata"
                  onError={() => setShowVideo(false)}
                />
             ) : project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             ) : (
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">✨</span>
                  <span className="font-medium text-sm uppercase tracking-widest opacity-60">{t("showcase.preview")}</span>
                </div>
             )}
          </div>
        </Link>
      </div>

      {/* Project Info Area */}
      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-primary"></div>
          <span className="text-primary font-semibold tracking-wide text-sm uppercase">{project.group || "Web App"}</span>
        </div>
        
        <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
          {project.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack?.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary">{tech}</Badge>
          ))}
          {project.stack?.length > 4 && (
             <Badge variant="outline">+{project.stack.length - 4}</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4">
           <Button asChild>
             <Link to={`/projects/${project.slug}`}>
               {t("showcase.case_study")}
             </Link>
           </Button>
           {project.repoUrl && (
             <Button variant="outline" size="icon" asChild>
               <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="View Source">
                 <Github className="h-5 w-5" />
               </a>
             </Button>
           )}
           {project.demoUrl && (
             <Button variant="outline" size="icon" asChild>
               <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                 <ExternalLink className="h-5 w-5" />
               </a>
             </Button>
           )}
        </div>
      </div>
    </motion.div>
  );
}
