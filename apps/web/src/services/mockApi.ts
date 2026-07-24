import type { LoginRequest, RegisterRequest } from '@it-master-ai/types';
import { buildTutorReply, getChatThreads, getCourses, getDashboard, getGrades, getLessons, getPracticeTopics, getProfile, getQuizzes, getResources, getSuggestedQuestions, getTeachers, getTimeline, getLeaderboard, getStats } from '@it-master-ai/utils';

const wait = (ms = 350) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const mockApi = {
  courses: async () => (await wait(), getCourses()),
  grades: async () => (await wait(), getGrades()),
  lessons: async () => (await wait(), getLessons()),
  quizzes: async () => (await wait(), getQuizzes()),
  resources: async () => (await wait(), getResources()),
  teachers: async () => (await wait(), getTeachers()),
  timeline: async () => (await wait(), getTimeline()),
  stats: async () => (await wait(), getStats()),
  practice: async () => (await wait(), getPracticeTopics()),
  dashboard: async () => (await wait(), getDashboard()),
  leaderboard: async () => (await wait(), getLeaderboard()),
  profile: async () => (await wait(), getProfile()),
  chats: async () => (await wait(), getChatThreads()),
  suggested: async () => (await wait(), getSuggestedQuestions()),
  login: async (_payload: LoginRequest) => ({ token: 'mock-login-token', profile: getProfile() }),
  register: async (_payload: RegisterRequest) => ({ token: 'mock-register-token', profile: getProfile() }),
  chat: async (message: string) => ({ reply: buildTutorReply(message), suggested: getSuggestedQuestions() })
};
