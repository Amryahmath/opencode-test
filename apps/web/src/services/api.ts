import axios from 'axios';
import type { LoginRequest, RegisterRequest } from '@it-master-ai/types';
import { mockApi } from './mockApi';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api', timeout: 6000 });

const unwrap = <T,>(response: { data: { success: boolean; data: T } }) => response.data.data;

const request = async <T,>(path: string, fallback: () => Promise<T>) => {
  try {
    const response = await client.get<{ success: boolean; data: T }>(path);
    return unwrap(response);
  } catch {
    return fallback();
  }
};

export const getCourses = () => request('/courses', mockApi.courses);
export const getGrades = () => request('/grades', mockApi.grades);
export const getLessons = () => request('/lessons', mockApi.lessons);
export const getQuizzes = () => request('/quizzes', mockApi.quizzes);
export const getResources = () => request('/resources', mockApi.resources);
export const getTeachers = () => request('/teachers', mockApi.teachers);
export const getTimeline = () => request('/timeline', mockApi.timeline);
export const getStats = () => request('/stats', mockApi.stats);
export const getPracticeTopics = () => request('/practice', mockApi.practice);
export const getDashboard = () => request('/dashboard', mockApi.dashboard);
export const getLeaderboard = () => request('/leaderboard', mockApi.leaderboard);
export const getProfile = () => request('/profile', mockApi.profile);

export const login = async (payload: LoginRequest) => {
  try {
    const response = await client.post('/login', payload);
    return response.data.data as Awaited<ReturnType<typeof mockApi.login>>;
  } catch {
    return mockApi.login(payload);
  }
};

export const register = async (payload: RegisterRequest) => {
  try {
    const response = await client.post('/register', payload);
    return response.data.data as Awaited<ReturnType<typeof mockApi.register>>;
  } catch {
    return mockApi.register(payload);
  }
};

export const sendChat = async (message: string, history: unknown[] = []) => {
  try {
    const response = await client.post('/chat', { message, history });
    return response.data.data as Awaited<ReturnType<typeof mockApi.chat>>;
  } catch {
    return mockApi.chat(message);
  }
};
