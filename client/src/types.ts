export interface Recruiter {
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface Candidate {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: number;
  resumeUrl?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  bio?: string;
  projects?: { title: string; description: string; link?: string }[];
  aiScore?: number;
  shortlist?: boolean;
}

export interface JobRequirement {
  title: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minExperience: number;
  salary: string;
  location: string;
  type: string;
  description: string;
}
