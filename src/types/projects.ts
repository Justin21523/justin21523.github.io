export type ProjectCategory = 'web' | 'mobile' | 'design' | 'opensource';

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean; // 是否為精選作品
}