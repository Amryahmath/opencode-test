import { GradeLevel, Resource } from './index';

export interface Grade {
  id: string;
  level: GradeLevel;
  name: string;
  description: string;
  modules: Module[];
  estimatedHours: number;
  thumbnail: string;
}

export interface Module {
  id: string;
  gradeId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  estimatedHours: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
  resources: Resource[];
  quizId?: string;
}

export interface Course {
  id: string;
  gradeId: string;
  title: string;
  description: string;
  thumbnail: string;
  modules: Module[];
  totalLessons: number;
  totalHours: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  completedModules: string[];
  progressPercentage: number;
  lastAccessedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  userId: string;
  completed: boolean;
  completedAt?: string;
  timeSpent: number;
}