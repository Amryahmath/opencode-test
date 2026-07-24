export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors: string[];
};

export type Grade = {
  grade: number;
  title: string;
  difficulty: string;
  modules: string[];
  lessons: number;
  progress: number;
  estimatedDuration: string;
};

export type Course = {
  grade: number;
  title: string;
  summary: string;
  difficulty: string;
  modules: string[];
  lessons: number;
  progress: number;
  estimatedDuration: string;
};

export type Lesson = {
  id: string;
  grade: number;
  title: string;
  topic: string;
  difficulty: string;
  duration: string;
  progress: number;
};

export type QuizOption = { label: string; correct?: boolean };

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
  explanation: string;
};

export type Quiz = {
  id: string;
  grade: number;
  title: string;
  timeLimit: string;
  questions: QuizQuestion[];
  leaderboard: LeaderboardEntry[];
};

export type Resource = {
  id: string;
  title: string;
  type: string;
  category: string;
  grade: number;
  format: string;
  detail: string;
};

export type Teacher = {
  name: string;
  role: string;
  specialization: string;
  experience: string;
  quote: string;
  badge: string;
};

export type Stat = {
  label: string;
  value: string;
  description: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
};

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
};

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
};

export type PracticeTopic = {
  id: string;
  grade: number;
  topic: string;
  difficulty: string;
  duration: string;
  focus: string;
};

export type LeaderboardEntry = {
  name: string;
  score: number;
  streak: number;
};

export type StudentProfile = {
  name: string;
  grade: string;
  school: string;
  progress: number;
  certificates: number;
  streak: number;
  completedLessons: number;
  favoriteTopic: string;
  goals: string[];
  settings: {
    darkMode: boolean;
    notifications: boolean;
  };
};

export type Dashboard = {
  completedLessons: number;
  currentGrade: string;
  quizResults: Stat[];
  aiUsage: Stat[];
  recentActivity: { title: string; detail: string; time: string }[];
  calendar: { day: string; label: string; accent: string }[];
  achievements: { title: string; detail: string }[];
};

export type Catalog = {
  grades: Grade[];
  courses: Course[];
  lessons: Lesson[];
  quizzes: Quiz[];
  resources: Resource[];
  teachers: Teacher[];
  stats: Stat[];
  timeline: TimelineItem[];
  practiceTopics: PracticeTopic[];
  profile: StudentProfile;
  dashboard: Dashboard;
  suggestedQuestions: string[];
  chatThreads: ChatThread[];
  leaderboard: LeaderboardEntry[];
};

export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { name: string; email: string; password: string; grade: string };
export type ProfileResponse = StudentProfile & { id: string };

export type DatabaseProvider = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export type CourseRepository = {
  findAll: () => Promise<Course[]>;
};

export type LessonRepository = {
  findAll: () => Promise<Lesson[]>;
};

export type QuizRepository = {
  findAll: () => Promise<Quiz[]>;
};

export type ResourceRepository = {
  findAll: () => Promise<Resource[]>;
};

export type UserRepository = {
  findProfile: () => Promise<ProfileResponse>;
};

export type AuthProvider = {
  signIn: (payload: LoginRequest) => Promise<{ token: string; profile: ProfileResponse }>;
  signUp: (payload: RegisterRequest) => Promise<{ token: string; profile: ProfileResponse }>;
};

export type AIProvider = {
  generateReply: (message: string, history?: ChatMessage[]) => Promise<string>;
};

export type PaymentProvider = {
  createCheckoutSession: (productId: string) => Promise<{ url: string }>;
};

export type EmailProvider = {
  send: (to: string, subject: string, body: string) => Promise<void>;
};

export type NotificationProvider = {
  notify: (userId: string, message: string) => Promise<void>;
};
