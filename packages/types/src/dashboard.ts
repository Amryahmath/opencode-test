import { GradeLevel } from './index';

export interface DashboardStats {
  completedLessons: number;
  totalLessons: number;
  currentGrade: GradeLevel;
  averageQuizScore: number;
  aiQuestionsAsked: number;
  studyStreak: number;
}

export interface Activity {
  id: string;
  type: 'lesson' | 'quiz' | 'chat' | 'resource';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'assignment';
  date: string;
  grade: GradeLevel;
}

export interface ProgressDataPoint {
  date: string;
  lessonsCompleted: number;
  quizzesTaken: number;
  aiQuestions: number;
  studyTime: number;
}