import { useTranslation } from "react-i18next";
import projectsZh from "../locales/projects-zh.json";

export function useProjectContent(project) {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith("zh");

  if (!project) return null;

  if (isZh && projectsZh[project.slug]) {
    return {
      ...project,
      title: projectsZh[project.slug].title || project.title,
      summary: projectsZh[project.slug].summary || project.summary,
    };
  }

  return project;
}
