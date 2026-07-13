// apps/api/src/mock-data/dashboard.ts
import type { DashboardStats, Activity, Achievement, CalendarEvent, ProgressDataPoint } from '@it-master-ai/types';

export const mockDashboardStats: DashboardStats = {
  completedLessons: 47,
  totalLessons: 120,
  currentGrade: 9,
  averageQuizScore: 87,
  aiQuestionsAsked: 234,
  studyStreak: 12,
};

export const mockActivity: Activity[] = [
  { id: 'a1', type: 'lesson', title: 'Completed: JavaScript Functions', description: 'Grade 9 • Web Development', timestamp: '2024-01-20T10:30:00Z' },
  { id: 'a2', type: 'quiz', title: 'Quiz: HTML & CSS Basics', description: 'Score: 92% • 12/13 correct', timestamp: '2024-01-20T05:45:00Z' },
  { id: 'a3', type: 'chat', title: 'AI Chat: Python Loops', description: 'Asked 3 questions about for loops', timestamp: '2024-01-19T14:20:00Z' },
  { id: 'a4', type: 'lesson', title: 'Completed: CSS Grid Layout', description: 'Grade 9 • Web Development', timestamp: '2024-01-18T16:30:00Z' },
  { id: 'a5', type: 'quiz', title: 'Quiz: Variables & Data Types', description: 'Score: 85% • 17/20 correct', timestamp: '2024-01-17T11:15:00Z' },
  { id: 'a6', type: 'chat', title: 'AI Chat: Database Normalization', description: 'Asked 2 questions about 3NF', timestamp: '2024-01-16T09:30:00Z' },
];

export const mockAchievements: Achievement[] = [
  { id: 'ach1', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', unlockedAt: '2024-01-15T10:30:00Z', progress: 1, maxProgress: 1 },
  { id: 'ach2', title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: '🏆', unlockedAt: '2024-02-10T14:20:00Z', progress: 5, maxProgress: 5 },
  { id: 'ach3', title: 'Streak Keeper', description: 'Maintain a 7-day study streak', icon: '🔥', unlockedAt: '2024-01-22T08:00:00Z', progress: 12, maxProgress: 7 },
  { id: 'ach4', title: 'AI Explorer', description: 'Ask 50 questions to AI Tutor', icon: '🤖', unlockedAt: '2024-02-05T16:45:00Z', progress: 234, maxProgress: 50 },
  { id: 'ach5', title: 'Grade 9 Graduate', description: 'Complete all Grade 9 modules', icon: '🎓', progress: 47, maxProgress: 55 },
  { id: 'ach6', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: '⭐', progress: 0, maxProgress: 1 },
  { id: 'ach7', title: 'Code Contributor', description: 'Complete 10 coding projects', icon: '💻', progress: 3, maxProgress: 10 },
  { id: 'ach8', title: 'Community Helper', description: 'Help 5 classmates in chat', icon: '🤝', progress: 2, maxProgress: 5 },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 'cal1', title: 'JavaScript Quiz', type: 'quiz', date: '2024-02-15', grade: 9 },
  { id: 'cal2', title: 'CSS Grid Lesson', type: 'lesson', date: '2024-02-16', grade: 9 },
  { id: 'cal3', title: 'Python Project Due', type: 'assignment', date: '2024-02-18', grade: 8 },
  { id: 'cal4', title: 'HTML & CSS Quiz', type: 'quiz', date: '2024-02-20', grade: 9 },
  { id: 'cal5', title: 'Database Design Lesson', type: 'lesson', date: '2024-02-22', grade: 10 },
];

export const mockProgressData: ProgressDataPoint[] = [
  { date: '2024-01-15', lessonsCompleted: 2, quizzesTaken: 1, aiQuestions: 5, studyTime: 45 },
  { date: '2024-01-16', lessonsCompleted: 3, quizzesTaken: 0, aiQuestions: 8, studyTime: 60 },
  { date: '2024-01-17', lessonsCompleted: 1, quizzesTaken: 2, aiQuestions: 3, studyTime: 40 },
  { date: '2024-01-18', lessonsCompleted: 4, quizzesTaken: 1, aiQuestions: 12, studyTime: 90 },
  { date: '2024-01-19', lessonsCompleted: 2, quizzesTaken: 0, aiQuestions: 6, studyTime: 50 },
  { date: '2024-01-20', lessonsCompleted: 3, quizzesTaken: 1, aiQuestions: 9, studyTime: 75 },
  { date: '2024-01-21', lessonsCompleted: 1, quizzesTaken: 0, aiQuestions: 4, studyTime: 35 },
];

export function getDashboardStats(): typeof mockDashboardStats {
  return mockDashboardStats;
}

export function getRecentActivity(limit = 10): Activity[] {
  return mockActivity.slice(0, limit);
}

export function getAchievements(): Achievement[] {
  return mockAchievements;
}

export function getCalendarEvents(): CalendarEvent[] {
  return mockCalendarEvents;
}

export function getProgressData(): ProgressDataPoint[] {
  return mockProgressData;
}