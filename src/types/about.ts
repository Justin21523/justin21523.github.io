export interface ProfileInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  bio: string[];
  interests: string[];
  avatar: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'design';
  proficiency?: string;
  icon?: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  logo?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  description?: string;
  logo?: string;
}
