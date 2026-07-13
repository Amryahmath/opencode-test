import { apiClient } from './client';
import type {
  Grade,
  Module,
  Lesson,
  Course,
  CourseProgress,
  Quiz,
  QuizResult,
  QuizSubmission,
  Resource,
  Chat,
  Message,
  ChatRequest,
  ChatResponse,
  DashboardStats,
  Activity,
  Achievement,
  CalendarEvent,
  Profile,
  User,
  UserSettings,
  Certificate,
  Teacher,
  LeaderboardEntry,
  PaginatedResponse,
} from '@it-master-ai/types';

export const api = {
  grades: {
    getAll: () => apiClient.get<Grade[]>('/grades'),
    getById: (id: string) => apiClient.get<Grade>(`/grades/${id}`),
    getModules: (gradeId: string) => apiClient.get<Module[]>(`/grades/${gradeId}/modules`),
  },

  courses: {
    getAll: (params?: { grade?: number; difficulty?: string; search?: string }) =>
      apiClient.get<PaginatedResponse<Course>>('/courses', { params }),
    getById: (id: string) => apiClient.get<Course>(`/courses/${id}`),
    getProgress: (courseId: string) => apiClient.get<CourseProgress>(`/courses/${courseId}/progress`),
    updateProgress: (courseId: string, data: Partial<CourseProgress>) =>
      apiClient.patch<CourseProgress>(`/courses/${courseId}/progress`, data),
  },

  lessons: {
    getById: (id: string) => apiClient.get<Lesson>(`/lessons/${id}`),
    getByModule: (moduleId: string) => apiClient.get<Lesson[]>(`/modules/${moduleId}/lessons`),
    complete: (lessonId: string) => apiClient.post<void>(`/lessons/${lessonId}/complete`),
  },

  quizzes: {
    getAll: (params?: { grade?: number; topic?: string }) =>
      apiClient.get<PaginatedResponse<Quiz>>('/quizzes', { params }),
    getById: (id: string) => apiClient.get<Quiz>(`/quizzes/${id}`),
    submit: (id: string, submission: QuizSubmission) =>
      apiClient.post<QuizResult>(`/quizzes/${id}/submit`, submission),
    getLeaderboard: (quizId: string) => apiClient.get<LeaderboardEntry[]>(`/quizzes/${quizId}/leaderboard`),
  },

  resources: {
    getAll: (params?: { grade?: number; type?: string; search?: string }) =>
      apiClient.get<PaginatedResponse<Resource>>('/resources', { params }),
    getById: (id: string) => apiClient.get<Resource>(`/resources/${id}`),
    download: (id: string) => apiClient.get<{ url: string }>(`/resources/${id}/download`),
  },

  chat: {
    sendMessage: (request: ChatRequest) => apiClient.post<ChatResponse>('/chat', request),
    getHistory: () => apiClient.get<Chat[]>('/chat/history'),
    getChat: (id: string) => apiClient.get<Chat>(`/chat/${id}`),
    deleteChat: (id: string) => apiClient.delete<void>(`/chat/${id}`),
    newChat: () => apiClient.post<Chat>('/chat/new', {}),
  },

  auth: {
    login: (credentials: { email: string; password: string; rememberMe?: boolean }) =>
      apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', credentials),
    register: (data: { name: string; email: string; password: string; grade: number; school: string }) =>
      apiClient.post<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', data),
    logout: () => apiClient.post<void>('/auth/logout'),
    refresh: (refreshToken: string) =>
      apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken }),
    me: () => apiClient.get<User>('/auth/me'),
    forgotPassword: (email: string) => apiClient.post<void>('/auth/forgot-password', { email }),
    verifyOtp: (email: string, otp: string) =>
      apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/verify-otp', { email, otp }),
    resetPassword: (token: string, password: string) =>
      apiClient.post<void>('/auth/reset-password', { token, password }),
  },

  profile: {
    get: () => apiClient.get<Profile>('/profile'),
    update: (data: Partial<Profile>) => apiClient.put<Profile>('/profile', data),
    updateSettings: (settings: Partial<UserSettings>) =>
      apiClient.put<UserSettings>('/profile/settings', settings),
    uploadAvatar: (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return apiClient.post<{ avatar: string }>('/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    getCertificates: () => apiClient.get<Certificate[]>('/profile/certificates'),
  },

  dashboard: {
    getStats: () => apiClient.get<DashboardStats>('/dashboard/stats'),
    getActivity: (params?: { limit?: number }) =>
      apiClient.get<Activity[]>('/dashboard/activity', { params }),
    getAchievements: () => apiClient.get<Achievement[]>('/dashboard/achievements'),
    getCalendar: (params?: { month?: number; year?: number }) =>
      apiClient.get<CalendarEvent[]>('/dashboard/calendar', { params }),
    getProgressData: (params?: { days?: number }) =>
      apiClient.get<{ date: string; lessonsCompleted: number; quizzesTaken: number; aiQuestions: number; studyTime: number }[]>('/dashboard/progress', { params }),
  },

  teachers: {
    getAll: () => apiClient.get<Teacher[]>('/teachers'),
    getById: (id: string) => apiClient.get<Teacher>(`/teachers/${id}`),
  },
};

export default api;