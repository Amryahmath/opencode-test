import { GradeLevel } from './index';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'notes' | 'download';
  grade: GradeLevel;
  topic: string;
  thumbnail: string;
  url: string;
  duration?: number;
  pages?: number;
  downloads: number;
  tags: string[];
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon: string;
  resourceCount: number;
}