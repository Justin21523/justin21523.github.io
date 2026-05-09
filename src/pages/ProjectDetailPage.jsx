import React, { useMemo, useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProjects } from "../lib/data";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import SEO from "../components/SEO";
import ScrollProgress from "../components/ScrollProgress";
import { useTranslation } from "react-i18next";
import { useProjectContent } from "../hooks/useProjectContent";
import { canPlayVideo } from "../lib/media";

function normalizeSlug(input) {
  return String(input || "").trim().toLowerCase();
}

function findProjectBySlug(projects, slug) {
  const raw = String(slug || "");
  if (!raw) return null;
  const exact = projects.find((p) => p.slug === raw);
  if (exact) return exact;
  const lower = normalizeSlug(raw);
  return (
    projects.find((p) => normalizeSlug(p.slug) === lower) ||
    projects.find((p) => (p.aliases || []).some((a) => normalizeSlug(a) === lower)) ||
    null
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const rawProjects = getProjects();
  const { t } = useTranslation();
  
  const initialProject = useMemo(() => findProjectBySlug(rawProjects, slug), [rawProjects, slug]);
  const project = useProjectContent(initialProject);
  
  const [content, setContent] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (project?.slug) {
      // Future TODO: fetch different markdown for different locales if available
      fetch(`/content/projects/${project.slug}.md`)
        .then((res) => {
          if (res.ok) return res.text();
          throw new Error("No content");
        })
        .then((text) => setContent(text))
        .catch(() => setContent(""));
    }
  }, [project]);

  useEffect(() => {
    if (!project?.video) {
      setShowVideo(false);
      return;
    }
    setShowVideo(canPlayVideo(project.video));
  }, [project?.video]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <SEO title="Project Not Found" />
        <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the project you're looking for.</p>
        <Button asChild>
          <Link to="/projects"><ArrowLeft className="mr-2 h-4 w-4"/> {t("projects.back")}</Link>
        </Button>
      </div>
    );
  }

  // Normalize URL if slug case differs
  if (slug && slug !== project.slug) {
     return <Navigate to={`/projects/${project.slug}`} replace />;
  }

  return (
    <article className="min-h-screen pb-20">
      <SEO title={project.title} description={project.summary} image={project.image} url={`/projects/${project.slug}`} />
      <ScrollProgress />
      
      {/* Hero Section */}
      <div className="bg-secondary/30 border-b border-border/50 pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("projects.back")}
          </Link>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">{project.group || "Development"}</Badge>
              {project.featured && <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">{t("projects.featured")}</Badge>}
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-balance"
            >
              {project.title}
            </motion.h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              {project.demoUrl && (
                <Button size="lg" asChild className="rounded-full">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    {t("projects.live_demo")} <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button variant="outline" size="lg" asChild className="rounded-full bg-background">
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    {t("projects.view_code")} <Github className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 max-w-5xl mt-16 grid md:grid-cols-12 gap-12">
        
        {/* Main Content */}
        <div className="md:col-span-8 space-y-12">
           {/* Project Visual (Video or Image) */}
           <div className="rounded-2xl border border-border bg-muted aspect-video flex items-center justify-center overflow-hidden shadow-sm">
             {project.video && showVideo ? (
                <video 
                  src={project.video} 
                  poster={project.image}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onError={() => setShowVideo(false)}
                />
             ) : project.image ? (
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
             ) : (
                <div className="text-center text-muted-foreground">
                  <span className="text-6xl mb-4 block opacity-50">🖼️</span>
                  <span className="text-sm font-medium uppercase tracking-widest">{t("showcase.preview")}</span>
                </div>
             )}
           </div>

           <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
             {content ? (
               <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
             ) : (
               <>
                 <h3>About the Project</h3>
                 <p className="text-muted-foreground">
                   {project.summary}
                 </p>
                 <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border text-center">
                    <p className="text-muted-foreground mb-4">Detailed case study coming soon.</p>
                    {project.repoUrl && (
                      <Button variant="outline" asChild>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          View README on GitHub <ExternalLink className="ml-2 h-4 w-4"/>
                        </a>
                      </Button>
                    )}
                 </div>
               </>
             )}
           </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-semibold mb-4">{t("projects.tech_stack")}</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack?.map(tech => (
                <Badge key={tech} variant="outline" className="bg-secondary/30">{tech}</Badge>
              ))}
            </div>

            <h3 className="font-semibold mb-4 border-t border-border pt-6">{t("projects.details")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>{t("projects.type")}</span>
                <span className="font-medium text-foreground capitalize">{project.group || "Web"}</span>
              </li>
              {project.tags?.includes("featured") && (
                 <li className="flex justify-between">
                  <span>{t("projects.status")}</span>
                  <span className="font-medium text-primary">{t("projects.featured")}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
