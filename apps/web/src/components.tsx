import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CalendarDays, CheckCircle2, ChevronRight, Clock3, LayoutDashboard, LogOut, Menu, MoonStar, Plus, Rocket, Send, ShieldCheck, Sparkles, SunMedium, Trash2, Trophy, UserRound } from 'lucide-react';
import type { ChatMessage, Course, Dashboard, Grade, LeaderboardEntry, Lesson, PracticeTopic, Quiz, Resource, StudentProfile, Teacher, TimelineItem } from '@it-master-ai/types';
import { Badge, Button, ProgressCircle, Skeleton } from '@it-master-ai/ui';
import { cn } from '@it-master-ai/utils';
import { navigation } from './data/navigation';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

export const MainLayout = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.14),_transparent_26%)]" />
      <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} onSignOut={logout} signedIn={Boolean(user)} mobileMenuOpen={mobileMenuOpen} onToggleMobileMenu={() => setMobileMenuOpen((current) => !current)} onCloseMobileMenu={() => setMobileMenuOpen(false)} />

      <main className="relative mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8" onClick={() => setMobileMenuOpen(false)}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export const Navbar = ({ darkMode, onToggleTheme, onSignOut, signedIn, mobileMenuOpen, onToggleMobileMenu, onCloseMobileMenu }: { darkMode: boolean; onToggleTheme: () => void; onSignOut: () => void; signedIn: boolean; mobileMenuOpen: boolean; onToggleMobileMenu: () => void; onCloseMobileMenu: () => void }) => (
  <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-white">IT Master AI</p>
          <p className="text-xs text-slate-400">Grade 6-11 learning platform</p>
        </div>
      </Link>

      <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
        {navigation.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => cn('rounded-full px-4 py-2 text-sm transition', isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white')}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button type="button" aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} onClick={onToggleMobileMenu} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10 lg:hidden">
          <Menu className="h-4 w-4" />
        </button>
        <button onClick={onToggleTheme} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10" aria-label="Toggle theme">
          {darkMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
        </button>
        {signedIn ? (
          <Button variant="secondary" onClick={onSignOut} className="hidden sm:inline-flex">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="secondary" className="hidden sm:inline-flex">
              <UserRound className="mr-2 h-4 w-4" /> Login
            </Button>
          </Link>
        )}
      </div>
    </div>

    {mobileMenuOpen ? (
      <div className="border-t border-white/10 bg-slate-950/90 px-4 py-4 lg:hidden" onClick={(event) => event.stopPropagation()}>
        <nav className="grid gap-2">
          {navigation.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={onCloseMobileMenu} className={({ isActive }) => cn('rounded-2xl px-4 py-3 text-sm transition', isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white')}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    ) : null}
  </header>
);

export const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950/70">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p className="font-display text-lg font-bold text-white">IT Master AI</p>
        <p className="mt-1 max-w-xl">A premium AI learning experience for Grade 6-11 students, built with modular monorepo architecture.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge>React</Badge>
        <Badge>Tailwind</Badge>
        <Badge>Framer Motion</Badge>
        <Badge>Express API</Badge>
      </div>
    </div>
  </footer>
);

export const PageShell = ({ title, subtitle, actions, children }: { title: string; subtitle: string; actions?: React.ReactNode; children: React.ReactNode }) => (
  <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-100">IT Master AI</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">{subtitle}</p>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
    {children}
  </motion.section>
);

export const Hero = ({ stats }: { stats: Array<{ label: string; value: string; description: string }> }) => (
  <section className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
    <div className="grid gap-6">
      <div className="flex flex-wrap gap-2">
        <Badge className="bg-cyan-400/15 text-cyan-100">AI powered</Badge>
        <Badge className="bg-amber-400/15 text-amber-100">Grade 6-11</Badge>
        <Badge className="bg-emerald-400/15 text-emerald-100">Premium learning</Badge>
      </div>
      <div className="grid gap-4">
        <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">Learn Information Technology with AI</h2>
        <p className="max-w-2xl text-lg text-slate-300">Grade 6-11 AI Learning Platform built to feel like a modern blend of ChatGPT, Coursera, and Khan Academy for Information Technology students.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to="/courses"><Button><Rocket className="mr-2 h-4 w-4" /> Start Learning</Button></Link>
        <Link to="/ai-tutor"><Button variant="secondary"><Sparkles className="mr-2 h-4 w-4" /> Try AI Tutor</Button></Link>
      </div>
    </div>

    <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
      <div className="rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(37,99,235,0.2))] p-5">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>AI Tutor active</span>
          <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs text-emerald-200">Streaming</span>
        </div>
        <div className="mt-4 grid gap-3">
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
          <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">Ask about hardware, coding, quizzes, cybersecurity, or study planning.</div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-200">{stat.label}</p>
            <p className="mt-2 text-xs text-slate-400">{stat.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const SectionTitle = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => (
  <div className="flex flex-col gap-2">
    {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">{eyebrow}</p> : null}
    <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
    {subtitle ? <p className="max-w-3xl text-sm text-slate-300 sm:text-base">{subtitle}</p> : null}
  </div>
);

export const StatCard = ({ stat }: { stat: { label: string; value: string; description: string } }) => (
  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-glow">
    <p className="text-3xl font-bold text-white">{stat.value}</p>
    <p className="mt-2 text-sm font-semibold text-cyan-100">{stat.label}</p>
    <p className="mt-2 text-sm text-slate-400">{stat.description}</p>
  </div>
);

export const CourseCard = ({ course }: { course: Course }) => (
  <div className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/8">
    <div className="flex items-start justify-between gap-3">
      <div>
        <Badge className="mb-3">Grade {course.grade}</Badge>
        <h3 className="font-display text-xl font-bold text-white">{course.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{course.summary}</p>
      </div>
      <Badge className="bg-amber-400/15 text-amber-100">{course.difficulty}</Badge>
    </div>
    <div className="flex flex-wrap gap-2">
      {course.modules.map((module) => (
        <span key={module} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs text-slate-300">{module}</span>
      ))}
    </div>
    <div className="grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
      <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-cyan-300" /> {course.lessons} lessons</div>
      <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-300" /> {course.estimatedDuration}</div>
      <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> {course.progress}% progress</div>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${course.progress}%` }} />
    </div>
  </div>
);

export const LessonCard = ({ lesson }: { lesson: Lesson }) => (
  <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Grade {lesson.grade}</p>
        <h3 className="mt-1 font-semibold text-white">{lesson.title}</h3>
      </div>
      <Badge>{lesson.difficulty}</Badge>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
      <span>{lesson.topic}</span>
      <span>{lesson.duration}</span>
    </div>
    <div className="mt-3 h-2 rounded-full bg-white/10">
      <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${lesson.progress}%` }} />
    </div>
  </div>
);

export const QuizCard = ({ quiz }: { quiz: Quiz }) => (
  <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
    <div className="flex items-center justify-between gap-3">
      <div>
        <Badge>Grade {quiz.grade}</Badge>
        <h3 className="mt-3 font-display text-xl font-bold text-white">{quiz.title}</h3>
      </div>
      <Badge className="bg-blue-400/15 text-blue-100">{quiz.timeLimit}</Badge>
    </div>
    <p className="mt-3 text-sm text-slate-300">{quiz.questions.length} questions, instant scoring, and leaderboard support.</p>
  </div>
);

export const TeacherCard = ({ teacher }: { teacher: Teacher }) => (
  <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-slate-950">{teacher.badge}</div>
      <div>
        <h3 className="font-semibold text-white">{teacher.name}</h3>
        <p className="text-sm text-slate-300">{teacher.role}</p>
      </div>
    </div>
    <p className="mt-4 text-sm text-slate-300">{teacher.quote}</p>
    <p className="mt-4 text-xs text-cyan-100">{teacher.specialization} · {teacher.experience}</p>
  </div>
);

export const ResourceCard = ({ resource }: { resource: Resource }) => (
  <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <Badge>{resource.category}</Badge>
        <h3 className="mt-3 font-semibold text-white">{resource.title}</h3>
      </div>
      <Badge className="bg-emerald-400/15 text-emerald-100">{resource.type}</Badge>
    </div>
    <p className="mt-3 text-sm text-slate-300">{resource.detail}</p>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
      <span>Grade {resource.grade}</span>
      <span>{resource.format}</span>
    </div>
  </div>
);

export const TimelineCard = ({ item }: { item: TimelineItem }) => (
  <div className="relative rounded-[1.4rem] border border-white/10 bg-white/5 p-5 pl-14">
    <div className="absolute left-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-slate-950">{item.year.slice(-2)}</div>
    <p className="text-sm font-semibold text-cyan-100">{item.year}</p>
    <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
    <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
  </div>
);

export const DashboardCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
    <h3 className="font-semibold text-white">{title}</h3>
    <div className="mt-4">{children}</div>
  </div>
);

export const ProfileCard = ({ profile }: { profile: StudentProfile }) => (
  <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl font-bold text-slate-950">{profile.name.split(' ').map((part) => part[0]).join('')}</div>
      <div className="grid gap-1">
        <h3 className="font-display text-2xl font-bold text-white">{profile.name}</h3>
        <p className="text-sm text-slate-300">{profile.grade} · {profile.school}</p>
        <p className="text-sm text-cyan-100">Favorite topic: {profile.favoriteTopic}</p>
      </div>
    </div>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      <DashboardCard title="Progress"><ProgressCircle value={profile.progress} label="course progress" /></DashboardCard>
      <DashboardCard title="Certificates"><div className="text-4xl font-bold text-white">{profile.certificates}</div></DashboardCard>
      <DashboardCard title="Streak"><div className="text-4xl font-bold text-white">{profile.streak} days</div></DashboardCard>
    </div>
  </div>
);

export const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser ? <div className="mt-1 h-9 w-9 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600" /> : null}
      <div className={cn('max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-6', isUser ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 bg-white/5 text-slate-100')}>
        <p>{message.content}</p>
        <span className={cn('mt-2 block text-[11px]', isUser ? 'text-slate-900/70' : 'text-slate-400')}>{message.timestamp}</span>
      </div>
    </div>
  );
};

export const ChatSidebar = ({ threads, activeThreadId, onNewChat, onSelectThread, onDeleteThread }: { threads: Array<{ id: string; title: string; updatedAt: string }>; activeThreadId: string; onNewChat: () => void; onSelectThread: (id: string) => void; onDeleteThread: (id: string) => void }) => (
  <aside className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Recent chats</p>
        <h3 className="mt-1 font-semibold text-white">AI Tutor</h3>
      </div>
      <Button variant="secondary" onClick={onNewChat}><Plus className="mr-2 h-4 w-4" /> New</Button>
    </div>
    <div className="grid gap-2">
      {threads.map((thread) => (
        <button key={thread.id} onClick={() => onSelectThread(thread.id)} className={cn('group rounded-2xl border px-3 py-3 text-left transition', thread.id === activeThreadId ? 'border-cyan-400/50 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10')}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{thread.title}</p>
              <p className="mt-1 text-xs text-slate-400">{thread.updatedAt}</p>
            </div>
            <button onClick={(event) => { event.stopPropagation(); onDeleteThread(thread.id); }} className="rounded-full p-2 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-white/10">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </button>
      ))}
    </div>
    <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(37,99,235,0.2))] p-4 text-sm text-slate-100">
      <p className="font-semibold">Suggested prompts</p>
      <p className="mt-1 text-slate-200/90">Use the input box to ask for explanations, practice questions, or revision plans.</p>
    </div>
  </aside>
);

export const ToolbarButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
    {icon}
    {label}
  </button>
);

export const EmptyState = ({ title, detail, actionLabel }: { title: string; detail: string; actionLabel: string }) => (
  <div className="grid place-items-center rounded-[1.6rem] border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center">
    <p className="text-lg font-semibold text-white">{title}</p>
    <p className="mt-2 max-w-lg text-sm text-slate-300">{detail}</p>
    <Button className="mt-5"><ChevronRight className="mr-2 h-4 w-4" /> {actionLabel}</Button>
  </div>
);

export const Sidebar = ({ items }: { items: Array<{ label: string; path: string }> }) => {
  const location = useLocation();
  return (
    <aside className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Navigation</p>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <NavLink key={item.path} to={item.path} className={({ isActive }) => cn('flex items-center justify-between rounded-2xl px-3 py-3 text-sm transition', isActive || location.pathname === item.path ? 'bg-cyan-400/10 text-white' : 'text-slate-300 hover:bg-white/8')}>
            <span>{item.label}</span>
            <ArrowRight className="h-4 w-4" />
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
