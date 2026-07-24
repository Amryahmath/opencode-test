import { getCourses, getGrades, getLessons, getQuizzes, getResources, getStats, getTeachers, getTimeline, getPracticeTopics, getLeaderboard, getDashboard } from '../mock-data/index.js';

export const contentService = {
  courses: async () => getCourses(),
  grades: async () => getGrades(),
  lessons: async () => getLessons(),
  quizzes: async () => getQuizzes(),
  resources: async () => getResources(),
  teachers: async () => getTeachers(),
  stats: async () => getStats(),
  timeline: async () => getTimeline(),
  practice: async () => getPracticeTopics(),
  leaderboard: async () => getLeaderboard(),
  dashboard: async () => getDashboard()
};
