# IT Master AI - AI-Powered Learning Platform

A modern, production-ready monorepo for an AI-powered learning platform for Grade 6-11 Information Technology students.

## 🏗️ Architecture

### Monorepo Structure (Turborepo + pnpm)

```
it-master-ai/
├── apps/
│   ├── web/          # React 18 + Vite + TypeScript Frontend
│   └── api/          # Express.js + TypeScript Backend
├── packages/
│   ├── ui/           # Shared React Component Library
│   ├── types/        # Shared TypeScript Types
│   └── utils/        # Shared Utilities (API, Auth, Date, Format, Validation)
├── turbo.json        # Turborepo configuration
├── pnpm-workspace.yaml
├── package.json      # Root package.json
└── tsconfig.base.json
```

## 🚀 Tech Stack

### Frontend (apps/web)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router v6** for routing
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form + Zod** for forms and validation
- **Axios** for API communication
- **React Hot Toast** for notifications
- **Radix UI** primitives for accessible components
- **Lucide React** for icons

### Backend (apps/api)
- **Express.js** with TypeScript
- **JWT** authentication (structure only, mock implementation)
- **Zod** for request validation
- **Helmet, CORS, Morgan** for security and logging
- **Mock JSON data** (no database required)

### Shared Packages
- **@it-master-ai/types** - All TypeScript interfaces
- **@it-master-ai/utils** - API client, auth helpers, date/format utilities, Zod schemas
- **@it-master-ai/ui** - 30+ reusable React components

## ✨ Features

### Frontend Pages (12 pages)
1. **Home** - Hero, animated stats, features, grade overview
2. **About** - Mission/vision, timeline, why choose us, teachers
3. **Courses** - Grade 6-11 tabs, modules, lessons, progress tracking
4. **AI Tutor** - ChatGPT-like interface with sidebar, streaming, dark mode
5. **Practice** - Topic cards with filters by grade/difficulty
6. **Quiz** - MCQ interface, timer, progress, results, leaderboard
7. **Resources** - PDF/Video/Notes tabs with search/filter
8. **Dashboard** - Stats, progress charts, activity, calendar, achievements
9. **Profile** - Avatar, certificates, settings (theme, notifications)
10. **Auth** - Login, Register, Forgot Password, OTP (UI only)
11. **404** - Friendly page with search

### Backend API (20+ endpoints)
- **Auth**: Login, Register, Logout, Refresh, Forgot Password, OTP, Reset Password
- **Grades/Courses**: List all, get by ID, get by level
- **Quizzes**: List, get by ID, submit, leaderboard
- **Resources**: List with filters, get by ID, download
- **Chat**: Send message, history, get chat, delete
- **Dashboard**: Stats, activity, achievements, calendar, progress
- **Profile**: Get/Update profile, certificates, settings
- **Teachers**: List all, get by ID

### Design System
- **Glassmorphism** + **Gradients** + **Rounded Cards**
- **Dark Mode** (Tailwind class strategy)
- **Mobile-First Responsive** (320px, 768px, 1440px)
- **Framer Motion** animations throughout
- **Loading Skeletons** for all data components
- **Toast Notifications** for feedback
- **WCAG AA** accessible components

### Future-Ready Interfaces (Structure Only)
- `IDatabase` - For Prisma/Drizzle/PostgreSQL
- `IAIProvider` - OpenAI, Gemini, Claude, Groq
- `IAuthService` - JWT, OAuth (Google, GitHub, Microsoft)
- `IPaymentService` - Stripe, LemonSqueezy, Paddle
- `IEmailService` - SendGrid, Resend, Nodemailer
- `INotificationService` - Push, In-App, SMS

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd it-master-ai

# Install dependencies
pnpm install

# Start development servers (both frontend and backend)
pnpm dev
```

This starts:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Individual Commands

```bash
# Frontend only
pnpm --filter @it-master-ai/web dev

# Backend only
pnpm --filter @it-master-ai/api dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Type check all packages
pnpm typecheck

# Format code
pnpm format
```

## 📁 Key Files

### Frontend Entry Points
- `apps/web/src/main.tsx` - App entry with providers
- `apps/web/src/App.tsx` - Main routing
- `apps/web/src/styles/globals.css` - Global styles + Tailwind

### Backend Entry Points
- `apps/api/src/server.ts` - Server entry
- `apps/api/src/app.ts` - Express app setup
- `apps/api/src/routes/index.ts` - Route registration

### Shared Types
- `packages/types/src/index.ts` - All exported types

### Shared Utils
- `packages/utils/src/api/client.ts` - Axios instance with interceptors
- `packages/utils/src/auth/jwt.ts` - JWT helpers
- `packages/utils/src/validation/schemas.ts` - Zod schemas

## 🎨 Customization

### Theme Colors
Edit `packages/ui/tailwind.config.js` or `apps/web/tailwind.config.js`:

```js
colors: {
  primary: { /* your brand colors */ },
  secondary: { /* your accent colors */ },
  // ...
}
```

### Adding New Components
1. Create component in `packages/ui/src/components/`
2. Export from `packages/ui/src/components/`
2. Import in frontend: `import { MyComponent } from '@it-master-ai/ui'`

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Docker (Example)
```dockerfile
# Frontend
FROM node:18-alpine
WORKDIR /app
COPY apps/web/dist ./dist
EXPOSE 5173
CMD ["npx", "serve", "-s", "dist"]

# Backend
FROM node:18-alpine
WORKDIR /app
COPY apps/api/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## 📝 License

MIT License - Feel free to use for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

Built with ❤️ for the next generation of IT learners.