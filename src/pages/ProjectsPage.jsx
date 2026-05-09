import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProjects } from "../lib/data";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import SEO from "../components/SEO";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "../lib/utils";
import { useTranslation } from "react-i18next";
import { useProjectContent } from "../hooks/useProjectContent";
import { canPlayVideo } from "../lib/media";

export default function ProjectsPage() {
  const projects = getProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");
  const { t } = useTranslation();

  const tags = useMemo(() => {
    const set = new Set();
    projects.forEach(p => p.tags?.forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter(p => p.tags?.includes(activeTag));
  }, [projects, activeTag]);

  const toggleTag = (tag) => {
    if (activeTag === tag) {
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <SEO title="Projects" description="Explore my portfolio of web development, 3D, and AI projects." />
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t("projects.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <Button 
            variant={!activeTag ? "primary" : "secondary"} 
            size="sm"
            onClick={() => setSearchParams({})}
            className="rounded-full"
          >
            {t("projects.filter_all")}
          </Button>
          {tags.map(tag => (
            <Button
              key={tag}
              variant={activeTag === tag ? "primary" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
              className={cn("rounded-full", activeTag === tag ? "" : "bg-transparent hover:bg-secondary")}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} t={t} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-muted-foreground">{t("projects.no_results")}</h3>
            <Button variant="link" onClick={() => setSearchParams({})}>{t("projects.clear_filters")}</Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project: initialProject, index, t }) {
  const project = useProjectContent(initialProject);
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (!project?.video) {
      setCanPlay(false);
      return;
    }
    setCanPlay(canPlayVideo(project.video));
  }, [project?.video]);

  const handleMouseEnter = () => {
    if (videoRef.current && canPlay) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Card
      className="flex flex-col h-full overflow-hidden group border-border/60 hover:border-primary/50 transition-colors"
    >
      <div
        className="block relative aspect-video bg-muted overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Click-only navigation overlay (kept separate to avoid nested <a> tags). */}
        <Link to={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={project.title} />
        {canPlay && project.video ? (
          <>
            <img 
              src={project.image} 
              alt={project.title} 
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                "group-hover:opacity-0" // Hide image on hover to show video
              )} 
            />
            <video
              ref={videoRef}
              src={project.video}
              poster={project.image}
              className="absolute inset-0 w-full h-full object-cover"
              muted
              playsInline
              loop
              preload="none"
            />
          </>
        ) : project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/30">
            <span className="text-4xl opacity-20">📦</span>
          </div>
        )}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-black hover:bg-gray-100 transition-colors"
                title="View Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
             {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full text-black hover:bg-gray-100 transition-colors"
                title="View Code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider">{project.group || "Web"}</Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          <Link to={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack?.slice(0, 3).map(tech => (
            <span key={tech} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
              {tech}
            </span>
          ))}
          {project.stack?.length > 3 && (
            <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">+{project.stack.length - 3}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
