import { createApiMethods } from './client';
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

export function createApiEndpoints(methods: ReturnType<typeof createApiMethods>) {
  const { get, post, put, patch, delete: del } = methods;

  return {
    grades: {
      getAll: () => get<Grade[]>('/grades'),
      getById: (id: string) => get<Grade>(`/grades/${id}`),
      getModules: (gradeId: string) => get<Module[]>(`/grades/${gradeId}/modules`),
    },

    courses: {
      getAll: (params?: { grade?: number; difficulty?: string; search?: string }) =>
        get<PaginatedResponse<Course>>('/courses', { params }),
      getById: (id: string) => get<Course>(`/courses/${id}`),
      getProgress: (courseId: string) => get<CourseProgress>(`/courses/${courseId}/progress`),
      updateProgress: (courseId: string, data: Partial<CourseProgress>) =>
        patch<CourseProgress>(`/courses/${courseId}/progress`, data),
    },

    lessons: {
      getById: (id: string) => get<Lesson>(`/lessons/${id}`),
      getByModule: (moduleId: string) => get<Lesson[]>(`/modules/${moduleId}/lessons`),
      complete: (lessonId: string) => post<void>(`/lessons/${lessonId}/complete`),
    },

    quizzes: {
      getAll: (params?: { grade?: number; topic?: string }) =>
        get<PaginatedResponse<Quiz>>('/quizzes', { params }),
      getById: (id: string) => get<Quiz>(`/quizzes/${id}`),
      submit: (id: string, submission: QuizSubmission) =>
        post<QuizResult>(`/quizzes/${id}/submit`, submission),
      getLeaderboard: (quizId: string) => get<LeaderboardEntry[]>(`/quizzes/${quizId}/leaderboard`),
    },

    resources: {
      getAll: (params?: { grade?: number; type?: string; search?: string }) =>
        get<PaginatedResponse<Resource>>('/resources', { params }),
      getById: (id: string) => get<Resource>(`/resources/${id}`),
      download: (id: string) => get<{ url: string }>(`/resources/${id}/download`),
    },

    chat: {
      sendMessage: (request: ChatRequest) => post<ChatResponse>('/chat', request),
      getHistory: () => get<Chat[]>('/chat/history'),
      getChat: (id: string) => get<Chat>(`/chat/${id}`),
      deleteChat: (id: string) => del<void>(`/chat/${id}`),
      newChat: () => post<Chat>('/chat/new', {}),
    },

    auth: {
      login: (credentials: { email: string; password: string; rememberMe?: boolean }) =>
        post<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', credentials),
      register: (data: { name: string; email: string; password: string; grade: number; school: string }) =>
        post<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', data),
      logout: () => post<void>('/auth/logout'),
      refresh: (refreshToken: string) =>
        post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken }),
      me: () => get<User>('/auth/me'),
      forgotPassword: (email: string) => post<void>('/auth/forgot-password', { email }),
      verifyOtp: (email: string, otp: string) =>
        post<{ accessToken: string; refreshToken: string }>('/auth/verify-otp', { email, otp }),
      resetPassword: (token: string, password: string) =>
        post<void>('/auth/reset-password', { token, password }),
    },

    profile: {
      get: () => get<Profile>('/profile'),
      update: (data: Partial<Profile>) => put<Profile>('/profile', data),
      updateSettings: (settings: Partial<UserSettings>) =>
        put<UserSettings>('/profile/settings', settings),
      uploadAvatar: (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return post<{ avatar: string }>('/profile/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      },
      getCertificates: () => get<Certificate[]>('/profile/certificates'),
    },

    dashboard: {
      getStats: () => get<DashboardStats>('/dashboard/stats'),
      getActivity: (params?: { limit?: number }) =>
        get<Activity[]>('/dashboard/activity', { params }),
      getAchievements: () => get<Achievement[]>('/dashboard/achievements'),
      getCalendar: (params?: { month?: number; year?: number }) =>
        get<CalendarEvent[]>('/dashboard/calendar', { params }),
      getProgressData: (params?: { days?: number }) =>
        get<{ date: string; lessonsCompleted: number; quizzesTaken: number; aiQuestions: number; studyTime: number }[]>('/dashboard/progress', { params }),
    },

    teachers: {
      getAll: () => get<Teacher[]>('/teachers'),
      getById: (id: string) => get<Teacher>(`/teachers/${id}`),
    },
  };
}