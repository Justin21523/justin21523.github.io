import projectCatalog from "@/generated/project-catalog.json";
import type { Project } from "@/types/projects";

export const projects = projectCatalog as Project[];