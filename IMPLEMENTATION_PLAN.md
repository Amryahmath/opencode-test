# IT Master AI - Implementation Plan

## Project Overview
**Project:** IT Master AI - AI-powered Learning Platform for Grade 6-11 IT Students  
**Architecture:** Turborepo Monorepo with React (Vite) Frontend + Express.js Backend  
**Tech Stack:** React 18, Vite, React Router v6, Tailwind CSS, Framer Motion, Axios, React Hook Form, Express.js, JWT (structure only), Turborepo

---

## Monorepo Structure

\\\
it-master-ai/
apps/
    web/                    # React + Vite Frontend
        src/
            components/     # Reusable UI components
            pages/          # Page components
            hooks/          # Custom hooks
            context/        # React Context providers
            services/       # API services (Axios)
            utils/          # Utility functions
            styles/         # Global styles, Tailwind config
            routes/         # Routing configuration
            types/          # TypeScript types (from @it-master-ai/types)
            assets/         # Static assets
            App.tsx
            main.tsx
            routes.tsx
        index.html
        package.json
        vite.config.ts
        tailwind.config.js
        tsconfig.json
        .eslintrc.js
    
    api/                    # Express.js Backend
        src/
            config/         # Config files (env, db, cors, etc.)
            controllers/    # Route controllers
            middleware/     # Auth, validation, error handling
            mock-data/      # Mock JSON data
            routes/         # Route definitions
            services/       # Business logic
            types/          # TypeScript types (from @it-master-ai/types)
            utils/          # Utility functions
            app.ts          # Express app setup
            server.ts       # Entry point
        package.json
        tsconfig.json
        .eslintrc.js

packages/
    ui/                     # Shared UI Component Library
        src/
            components/
                ui/         # Base components (Button, Input, Card, etc.)
                layout/     # Layout components (Navbar, Sidebar, Footer)
                forms/      # Form components
                data/       # Data display (Cards, Tables, Badges)
                feedback/   # Toast, Modal, Loader, Progress
                chat/       # Chat-specific components
            hooks/          # Shared hooks
            utils/          # Shared utilities
            styles/         # Global styles, Tailwind config
            index.ts        # Main exports
        package.json
        tsconfig.json
        tailwind.config.js
    
    types/                  # Shared TypeScript Types
        src/
            api.ts          # API response types
            auth.ts         # Auth types
            course.ts       # Course, Grade, Module, Lesson types
            chat.ts         # Chat, Message types
            quiz.ts         # Quiz, Question, Result types
            user.ts         # User, Profile, Dashboard types
            resource.ts     # Resource types
            index.ts        # Barrel export
        package.json
        tsconfig.json
    
    utils/                  # Shared Utilities
        src/
            api/            # API client, axios instance
            auth/           # Auth utilities (JWT helpers - structure only)
            date/           # Date utilities
            format/         # Formatting utilities
            validation/     # Zod schemas
            index.ts
        package.json
        tsconfig.json

turbo.json                  # Turborepo config
package.json                # Root package.json
pnpm-workspace.yaml         # pnpm workspace config
tsconfig.base.json          # Base TypeScript config
.eslintrc.js                # Root ESLint config
.prettierrc                 # Prettier config
.gitignore
README.md
\\\

---

## Frontend Implementation Plan

### Phase 1: Project Setup & Configuration (Week 1)

#### 1.1 Monorepo Setup
- Initialize Turborepo with pnpm
- Configure turbo.json for build, lint, dev, test pipelines
- Configure pnpm-workspace.yaml with workspace packages
- Set up root tsconfig.base.json with path aliases
- Configure root ESLint + Prettier
- Set up GitHub Actions CI pipeline

#### 1.2 Shared Packages Setup
- **packages/types**: Define all TypeScript interfaces
- **packages/utils**: Axios instance, Zod schemas, date/format utils, JWT helpers (structure only)
- **packages/ui**: 
  - Set up Tailwind CSS with custom theme (colors, fonts, animations)
  - Create base UI components (Button, Input, Card, Badge, Modal, Toast, Loader, etc.)
  - Create layout components (Navbar, Sidebar, Footer)
  - Create form components (Input, Select, Textarea, Checkbox, Radio)
  - Create data display components (Card, Badge, Avatar, ProgressCircle, Table)
  - Create feedback components (Toast, Modal, Loader, Skeleton, ProgressBar)
  - Create chat components (ChatBubble, ChatSidebar, MessageInput, TypingIndicator)
  - Create layout components (Navbar, Sidebar, Footer, PageLayout)
  - Export all components via barrel exports

#### 1.3 Frontend App Setup (apps/web)
- Initialize Vite + React + TypeScript
- Configure Tailwind CSS with custom theme (IT Master AI brand colors)
- Configure React Router v6 with lazy-loaded routes
- Set up React Context providers (Auth, Theme, Toast, Chat)
- Configure Axios instance with interceptors (auth, error handling)
- Set up React Hook Form + Zod resolvers
- Configure Framer Motion for animations
- Set up React Hot Toast for notifications
- Configure ESLint + Prettier + Husky

### Phase 2: Core Layout & Authentication (Week 1-2)

#### 2.1 Layout Components
- **Navbar**: Logo, navigation links, theme toggle, auth buttons/user menu, mobile hamburger menu
- **Sidebar**: Collapsible sidebar for dashboard/chat pages
- **Footer**: Links, social links, copyright
- **PageLayout**: Wrapper with navbar, sidebar, footer, outlet
- **AuthLayout**: Layout for auth pages (centered card)

#### 2.2 Authentication Pages
- **Login Page**: Email/password form, validation, remember me, forgot password link
- **Register Page**: Multi-step form (Personal Info -> Grade/School -> Password), validation
- **Forgot Password**: Email input, send reset link
- **OTP Screen**: 6-digit input, resend timer, verify button (UI only)
- **Auth Context**: Login, register, logout, user state, token management (structure only)

#### 2.3 Auth Infrastructure
- Auth Context Provider with useAuth hook
- Protected Route wrapper
- Guest Route wrapper
- Axios interceptors for auth token
- Mock auth API calls

### Phase 3: Core Pages Implementation (Week 2-3)

#### 3.1 Home Page
- **Hero Section**: Gradient background, animated elements, statistics counters
- **Statistics Section**: Animated counters (Students, Lessons, Quizzes, AI Questions)
- **Features Section**: Feature cards with hover animations
- **CTA Section**: Gradient background, CTA buttons
- **Animations**: Framer Motion entrance animations, scroll animations

#### 3.2 About Page
- **Hero**: Institute story, mission, vision
- **Why Choose Us**: Feature grid with icons
- **Timeline**: Animated timeline of institute history
- **Teachers Section**: Teacher cards with hover effects

#### 3.3 Courses Page
- **Grade Tabs**: Grade 6-11 tabs with smooth transitions
- **Course Cards**: Grade cards with modules, lessons, duration, progress bar, difficulty badge
- **Course Detail Modal**: Module list, lesson list, progress tracking
- **Filter/Search**: Filter by grade, difficulty, search by title

#### 3.4 AI Tutor Page (ChatGPT-like Interface)
- **Chat Sidebar**: Recent chats list, new chat button, delete chat, search chats
- **Chat Area**: Message bubbles (user/assistant), typing animation, streaming effect
- **Message Input**: Textarea with auto-resize, send button, voice button (UI), file upload (UI)
- **Suggested Questions**: Quick suggestion chips
- **Dark Mode**: Full dark mode support with Tailwind dark mode
- **Chat Context**: Chat state management, localStorage persistence
- **Mock API**: Fake streaming response simulation

#### 3.5 Practice Page
- **Topic Cards**: Grid of practice topics with grade, difficulty, question count
- **Filters**: Grade filter, Difficulty filter, Topic search
- **Practice Session**: Question card, navigation, progress

#### 3.6 Quiz Page
- **Quiz List**: Available quizzes by grade/topic
- **Quiz Interface**: MCQ cards, timer, progress bar, next/previous/submit
- **Results Page**: Score, correct/incorrect breakdown, time taken, leaderboard UI
- **Quiz Timer**: Countdown timer with warning states

#### 3.7 Resources Page
- **Resource Tabs**: PDFs, Videos, Notes, Downloads
- **Resource Cards**: Thumbnail, title, type badge, grade, download/view buttons
- **Search & Filter**: Search by title, filter by type/grade
- **Resource Modal**: Preview PDF, play video, view notes

#### 3.8 Dashboard Page
- **Stats Cards**: Completed lessons, current grade, quiz average, AI usage
- **Progress Chart**: Chart.js/Recharts for progress visualization
- **Recent Activity**: Activity feed with icons
- **Calendar**: Calendar with lesson/quiz dates
- **Achievements**: Achievement badges grid

#### 3.9 Student Profile Page
- **Profile Header**: Avatar, name, grade, school, progress ring
- **Tabs**: Profile, Certificates, Settings
- **Certificates**: Certificate cards with download
- **Settings**: Profile edit, password change, notifications, theme

### Phase 4: Reusable Components & Hooks (Week 3)

#### 4.1 Custom Hooks
- useAuth() - Auth state management
- useTheme() - Dark/light mode
- useToast() - Toast notifications
- useChat() - Chat state management
- useLocalStorage() - Persistent state
- useDebounce() - Debounced values
- useIntersectionObserver() - Scroll animations
- useMediaQuery() - Responsive breakpoints
- useApi() - API call wrapper with loading/error states

#### 4.2 UI Components (packages/ui)
- Button (variants, sizes, loading state)
- Input, Textarea, Select (with validation styles)
- Card (variants: default, glass, gradient)
- Badge (variants, sizes)
- Avatar (image, fallback, sizes)
- Modal (portal, animations, sizes)
- Toast (types, positions, auto-dismiss)
- Loader/Spinner (sizes, colors)
- Skeleton (card, text, circular variants)
- ProgressBar, ProgressCircle
- Pagination
- Tabs
- Accordion
- Dropdown/Select
- Tooltip
- ChatBubble (user/assistant, streaming)
- ChatSidebar
- MessageInput
- TypingIndicator

### Phase 5: Backend API Implementation (Week 3-4)

#### 5.1 Express App Setup
- Express + TypeScript setup
- CORS, Helmet, Morgan, Compression
- Environment configuration (dotenv)
- Error handling middleware
- Request validation middleware (Zod)
- API response formatter middleware

#### 5.2 Mock Data Layer
- mock-data/courses.json - Grades, modules, lessons
- mock-data/quizzes.json - Quizzes, questions, options
- mock-data/resources.json - PDFs, videos, notes
- mock-data/users.json - Users, profiles
- mock-data/chat.json - Sample conversations
- mock-data/dashboard.json - Dashboard stats
- mock-data/teachers.json - Teacher profiles

#### 5.3 API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/grades | Get all grades with modules/lessons |
| GET | /api/grades/:gradeId | Get grade details |
| GET | /api/courses | Get all courses (with filters) |
| GET | /api/courses/:id | Get course details |
| GET | /api/lessons/:id | Get lesson content |
| GET | /api/quizzes | Get quizzes (with filters) |
| GET | /api/quizzes/:id | Get quiz with questions |
| POST | /api/quizzes/:id/submit | Submit quiz answers |
| GET | /api/resources | Get resources (with filters) |
| GET | /api/resources/:id | Get resource details |
| POST | /api/auth/login | Login (mock JWT) |
| POST | /api/auth/register | Register (mock JWT) |
| POST | /api/auth/forgot-password | Forgot password |
| POST | /api/auth/verify-otp | Verify OTP (mock) |
| GET | /api/auth/me | Get current user |
| POST | /api/chat | Send message (mock streaming) |
| GET | /api/chat/history | Get chat history |
| DELETE | /api/chat/:id | Delete chat |
| GET | /api/profile | Get user profile |
| PUT | /api/profile | Update profile |
| GET | /api/dashboard/stats | Dashboard statistics |
| GET | /api/dashboard/activity | Recent activity |
| GET | /api/dashboard/achievements | Achievements |

#### 5.4 API Response Format
\\\	ypescript
// Success
{ success: true, message: string, data: T }

// Error
{ success: false, message: string, errors: ValidationError[] }
\\\

#### 5.5 Mock Auth Structure (JWT-ready)
- JWT token generation/validation structure (no real verification)
- Refresh token structure
- Role-based access control structure (student, teacher, admin)
- Protected route middleware

### Phase 6: Integration & Polish (Week 4)

#### 6.1 Frontend-Backend Integration
- Connect all frontend pages to backend APIs
- Implement React Query / SWR for data fetching (or custom useApi hook)
- Add loading skeletons for all data-fetching components
- Implement error boundaries
- Add toast notifications for API errors

#### 6.2 Animations & Transitions
- Page transitions (Framer Motion AnimatePresence)
- Scroll animations (IntersectionObserver + Framer Motion)
- Hover/tap animations on all interactive elements
- Loading states for all async operations
- Skeleton loaders for all data components
- Dark mode toggle with localStorage persistence
- Responsive testing (320px, 768px, 1024px, 1440px)

#### 6.3 Accessibility & SEO
- Semantic HTML
- ARIA labels on interactive elements
- Focus management (focus-visible, focus-trap in modals)
- Meta tags, Open Graph, Twitter Cards
- Sitemap generation
- robots.txt

#### 6.4 Production Readiness
- Environment configuration (dev, staging, prod)
- Build optimization (code splitting, tree shaking)
- Bundle analysis
- Error boundary with fallback UI
- 404 page with search link
- Offline fallback (Service Worker - optional)

---

## Shared Types (packages/types)

### API Types (api.ts)
\\\	ypescript
export interface ApiResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
\\\

### Auth Types (auth.ts)
\\\	ypescript
export interface User {
  id: string;
  email: string;
  name: string;
  grade: GradeLevel;
  school: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  grade: GradeLevel;
  school: string;
}

export type GradeLevel = 6 | 7 | 8 | 9 | 10 | 11;
\\\

### Course Types (course.ts)
\\\	ypescript
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
\\\

### Chat Types (chat.ts)
\\\	ypescript
export interface Chat {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  createdAt: string;
}

export interface ChatRequest {
  message: string;
  chatId?: string;
}

export interface ChatResponse {
  message: Message;
  chatId: string;
}
\\\

### Quiz Types (quiz.ts)
\\\	ypescript
export interface Quiz {
  id: string;
  title: string;
  description: string;
  grade: GradeLevel;
  topic: string;
  duration: number;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  type: 'mcq' | 'true_false' | 'multiple_select';
  options: Option[];
  correctAnswers: string[];
  explanation: string;
  points: number;
}

export interface Option {
  id: string;
  text: string;
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, string[]>;
  timeTaken: number;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  questionResults: QuestionResult[];
  timeTaken: number;
}

export interface QuestionResult {
  questionId: string;
  isCorrect: boolean;
  selectedAnswers: string[];
  correctAnswers: string[];
  explanation: string;
}
\\\

### Resource Types (resource.ts)
\\\	ypescript
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
\\\

### Dashboard Types (dashboard.ts)
\\\	ypescript
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
  metadata?: Record<string, any>;
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
\\\

### User Types (user.ts)
\\\	ypescript
export interface Profile extends User {
  certificates: Certificate[];
  settings: UserSettings;
}

export interface Certificate {
  id: string;
  title: string;
  grade: GradeLevel;
  issuedAt: string;
  certificateUrl: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
}
\\\

---

## Design System (packages/ui)

### Color Palette
\\\javascript
// tailwind.config.js theme extension
colors: {
  primary: {
    50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
    400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
    800: '#075985', 900: '#0c4a6e', 950: '#082f49',
  },
  secondary: {
    50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
    400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
    800: '#86198f', 900: '#701a75', 950: '#4a044e',
  },
  accent: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
    800: '#9a3412', 900: '#7c2d12', 950: '#431407',
  },
  dark: {
    bg: '#0f172a',
    card: '#1e293b',
    border: '#334155',
    text: '#f1f5f9',
    muted: '#94a3b8',
  },
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(15, 23, 42, 0.8)',
    border: 'rgba(255, 255, 255, 0.1)',
  }
}
\\\

### Typography
- **Headings**: Inter (Bold/Semi-bold)
- **Body**: Inter (Regular/Medium)
- **Code**: JetBrains Mono

### Component Variants
- **Buttons**: primary, secondary, outline, ghost, glass, gradient
- **Cards**: default, glass, gradient, elevated
- **Inputs**: default, filled, outlined

---

## Development Workflow

### Commands (Root package.json)
\\\json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "clean": "turbo run clean",
    "changeset": "changeset",
    "version": "changeset version",
    "release": "changeset publish"
  }
}
\\\

---

## Future-Ready Architecture (Interfaces Only)

### Database Interface (packages/types/src/database.ts)
\\\	ypescript
export interface IDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T[]>;
  execute(sql: string, params?: any[]): Promise<{ affectedRows: number; insertId: string }>;
  transaction<T>(callback: (tx: ITransaction) => Promise<T>): Promise<T>;
}

export interface ITransaction {
  query<T>(sql: string, params?: any[]): Promise<T[]>;
  execute(sql: string, params?: any[]): Promise<{ affectedRows: number; insertId: string }>;
}

export class DatabaseAdapter implements IDatabase {
  // TODO: Implement with Prisma/Drizzle/pg
}
\\\

### AI Provider Interface (packages/types/src/ai.ts)
\\\	ypescript
export interface IAIProvider {
  sendMessage(messages: AIMessage[], options?: AIOptions): Promise<AIResponse>;
  streamMessage(messages: AIMessage[], options?: AIOptions): AsyncIterable<AIChunk>;
  getModels(): Promise<AIModel[]>;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface AIResponse {
  content: string;
  usage: { promptTokens: number; completionTokens: number };
}

export interface AIChunk {
  content: string;
  done: boolean;
}

// Provider implementations (structure only)
export class OpenAIProvider implements IAIProvider { /* TODO */ }
export class GeminiProvider implements IAIProvider { /* TODO */ }
export class ClaudeProvider implements IAIProvider { /* TODO */ }
export class GroqProvider implements IAIProvider { /* TODO */ }
export class MockAIProvider implements IAIProvider { /* Current mock */ }
\\\

### Auth Service Interface (packages/types/src/auth.ts)
\\\	ypescript
export interface IAuthService {
  register(data: RegisterData): Promise<AuthResult>;
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(userId: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  verifyEmail(token: string): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, password: string): Promise<void>;
  verifyOTP(email: string, otp: string): Promise<AuthTokens>;
}

export interface AuthResult {
  user: User;
  tokens: AuthTokens;
}

export class JWTAuthService implements IAuthService { /* TODO */ }
export class OAuthProvider implements IAuthService { /* TODO: Google, GitHub, Microsoft */ }
export class MockAuthService implements IAuthService { /* Current mock */ }
\\\

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Turborepo setup with pnpm
- [ ] TypeScript config with path aliases
- [ ] ESLint + Prettier + Husky
- [ ] Shared types package
- [ ] Shared utils package
- [ ] UI component library setup

### Phase 2: UI Components
- [ ] Base components (Button, Input, Card, etc.)
- [ ] Layout components (Navbar, Sidebar, Footer)
- [ ] Form components
- [ ] Data display components
- [ ] Feedback components
- [ ] Chat components
- [ ] Dark mode support

### Phase 3: Frontend Pages
- [ ] Home page with Hero, Stats, Features
- [ ] About page with Timeline, Teachers
- [ ] Courses page with Grade tabs, Course cards
- [ ] AI Tutor page (ChatGPT-like)
- [ ] Practice page with filters
- [ ] Quiz page with timer, results
- [ ] Resources page with tabs, search
- [ ] Dashboard with charts, activity
- [ ] Profile page with settings
- [ ] Auth pages (Login, Register, Forgot Password, OTP)
- [ ] 404 Page

### Phase 4: Backend API
- [ ] Express + TypeScript setup
- [ ] Mock data layer
- [ ] All REST endpoints
- [ ] Auth structure (JWT-ready)
- [ ] API response formatting
- [ ] Error handling

### Phase 5: Integration
- [ ] Connect frontend to backend
- [ ] React Query / SWR setup
- [ ] Loading skeletons
- [ ] Error boundaries
- [ ] Toast notifications

### Phase 6: Polish
- [ ] Animations & transitions
- [ ] Dark mode
- [ ] Responsive design
- [ ] Accessibility
- [ ] SEO meta tags
- [ ] Production build optimization

---

## Key Decisions Needed

1. **Package Manager**: pnpm (recommended for monorepos) vs npm/yarn
2. **State Management**: React Context + Hooks vs Zustand vs Redux Toolkit
3. **Data Fetching**: React Query vs SWR vs Custom Hooks
4. **Charts**: Recharts vs Chart.js vs Tremor
5. **Animation**: Framer Motion (chosen) vs Tailwind Animate
6. **Forms**: React Hook Form + Zod (chosen)
7. **Component Library**: Custom (packages/ui) vs shadcn/ui vs Radix UI
8. **Testing**: Vitest + React Testing Library vs Jest
9. **Storybook**: Include for UI package? (Recommended)

---

## Estimated Timeline

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| 1. Foundation | 3-4 days | Monorepo, shared packages, UI library |
| 2. Auth & Layout | 2-3 days | Auth pages, layouts, routing |
| 3. Core Pages | 5-7 days | All 12 pages implemented |
| 4. Backend API | 3-4 days | Express API with mock data |
| 5. Integration | 2-3 days | Frontend-Backend connection |
| 6. Polish | 2-3 days | Animations, dark mode, responsive |
| **Total** | **~3-4 weeks** | **Production-ready monorepo** |

---

## Acceptance Criteria

- [ ] Monorepo builds successfully with \pnpm build\
- [ ] All 12 pages render without errors
- [ ] Navigation works between all pages
- [ ] Dark/Light mode toggles and persists
- [ ] Responsive on mobile (320px), tablet (768px), desktop (1440px)
- [ ] API endpoints return correct response format
- [ ] Mock authentication flow works (login/register)
- [ ] AI Tutor chat interface functional (mock streaming)
- [ ] Quiz timer and results work correctly
- [ ] Dashboard displays mock data with charts
- [ ] No TypeScript errors
- [ ] ESLint passes with no errors
- [ ] Production build completes successfully

---

**Next Steps:** Review this plan and confirm the approach. Once approved, I'll begin implementation starting with Phase 1 (Monorepo setup and shared packages).
