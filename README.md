# IT Master AI

Monorepo for a modern AI learning platform for Grade 6-11 Information Technology students.

## Workspace

- `apps/web` - React + Vite front end
- `apps/api` - Express REST API
- `packages/types` - Shared TypeScript contracts
- `packages/utils` - Mock JSON data and helpers
- `packages/ui` - Reusable UI primitives

## Stack

- pnpm + Turborepo
- React Router, Tailwind CSS, Framer Motion, Axios, React Hook Form
- Node.js, Express.js, MVC-style API structure
- No database yet. Mock JSON drives both the API and the UI.

## Commands

```bash
pnpm install
pnpm dev
```

## Startup

1. Copy `.env.example` to `.env` at the repository root.
2. Install dependencies with `pnpm install`.
3. Start both apps with `pnpm dev`.
4. Open the web app at `http://localhost:5173` and the API at `http://localhost:4000`.

## Environment

- `PORT` controls the Express server port.
- `CORS_ORIGIN` should match the web app origin during local development.
- `JWT_SECRET` is reserved for future auth token signing.
- `VITE_API_URL` points the frontend to the API base URL.

## API endpoints

- `GET /api/courses`
- `GET /api/grades`
- `GET /api/lessons`
- `GET /api/quizzes`
- `GET /api/resources`
- `POST /api/login`
- `POST /api/register`
- `POST /api/chat`
- `GET /api/profile`

## Design goals

Premium, mobile-first, glassmorphism UI with gradients, rounded cards, loading states, and future-ready service boundaries for PostgreSQL, MongoDB, OpenAI, Gemini, Claude, Groq, payments, email, and notifications.

