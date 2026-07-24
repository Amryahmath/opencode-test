import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, BrainCircuit, Clock3, FileText, Mic, Send, Upload, Volume2 } from 'lucide-react';
import type { ChatMessage, Course, Grade, LeaderboardEntry, Lesson, PracticeTopic, Quiz, Resource, StudentProfile, Teacher } from '@it-master-ai/types';
import { Button, Input, Loader, Pagination, ProgressCircle, Select } from '@it-master-ai/ui';
import { getCourses, getDashboard, getGrades, getLeaderboard, getLessons, getPracticeTopics, getProfile, getQuizzes, getResources, getStats, getTeachers, getTimeline, login, register, sendChat } from './services/api';
import { cn, mockCatalog } from '@it-master-ai/utils';
import { ChatBubble, ChatSidebar, CourseCard, DashboardCard, EmptyState, Hero, LessonCard, PageShell, ProfileCard, QuizCard, ResourceCard, SectionTitle, Sidebar, StatCard, TeacherCard, TimelineCard, ToolbarButton } from './components';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';

const useLoaded = <T,>(loader: () => Promise<T>, fallback: T) => {
  const [data, setData] = useState<T>(fallback);
  useEffect(() => {
    let active = true;
    void loader().then((next) => {
      if (active) setData(next);
    });
    return () => {
      active = false;
    };
  }, [loader]);
  return data;
};

const cardGrid = 'grid gap-4 md:grid-cols-2 xl:grid-cols-3';

export const HomePage = () => {
  const stats = useLoaded(getStats, mockCatalog.stats);
  const courses = useLoaded(getCourses, mockCatalog.courses).slice(0, 3);

  return (
    <div className="grid gap-10">
      <Hero stats={stats} />
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-5 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <SectionTitle eyebrow="Learning flow" title="AI guided lessons, practice, quizzes, and tutor support in one place." subtitle="The app keeps the experience coherent across the classroom journey: discover, practice, ask, and track progress." />
          <div className="grid gap-3 sm:grid-cols-3">
            {['Start a course', 'Ask AI Tutor', 'Track progress'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">{item}</div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <SectionTitle eyebrow="Featured grades" title="Explore the progression" />
          {courses.map((course) => <CourseCard key={course.grade} course={course} />)}
        </div>
      </section>
    </div>
  );
};

export const AboutPage = () => {
  const teachers = useLoaded(getTeachers, mockCatalog.teachers);
  const timeline = useLoaded(getTimeline, mockCatalog.timeline);

  return (
    <PageShell title="About IT Master AI" subtitle="An institute story designed around clarity, confidence, and AI-assisted learning for students in Grade 6-11.">
      <div className={cardGrid}>
        {[
          { label: 'Mission', value: 'Turn every IT lesson into an interactive, confidence-building learning path.' },
          { label: 'Vision', value: 'Create a student-first platform where AI explains, practices, and tracks growth.' },
          { label: 'Why choose us', value: 'Premium UI, smart tutoring flow, structured content, and modular architecture.' }
        ].map((item) => (
          <div key={item.label} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">{item.label}</p>
            <p className="mt-3 text-sm text-slate-300">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <SectionTitle title="Institute timeline" />
          <div className="grid gap-4">
            {timeline.map((item) => <TimelineCard key={item.year} item={item} />)}
          </div>
        </div>
        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <SectionTitle title="Teachers" subtitle="A support team built for guided digital learning and AI-assisted instruction." />
          <div className="grid gap-4 sm:grid-cols-2">
            {teachers.map((teacher) => <TeacherCard key={teacher.name} teacher={teacher} />)}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export const CoursesPage = () => {
  const grades = useLoaded(getGrades, mockCatalog.grades);
  const courses = useLoaded(getCourses, mockCatalog.courses);

  return (
    <PageShell title="Courses" subtitle="Grades 6-11 are grouped into modular learning tracks with progress, difficulty, and lesson estimates.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {grades.map((grade) => (
          <div key={grade.grade} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Grade {grade.grade}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">{grade.title}</h3>
              </div>
              <ProgressCircle value={grade.progress} size={90} label="progress" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {grade.modules.map((module) => <span key={module} className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-300">{module}</span>)}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
              <span>{grade.lessons} lessons</span>
              <span>{grade.estimatedDuration}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={cardGrid}>
        {courses.map((course) => <CourseCard key={course.grade} course={course} />)}
      </div>
    </PageShell>
  );
};

export const AITutorPage = () => {
  const [threads, setThreads] = useState(mockCatalog.chatThreads);
  const [activeThreadId, setActiveThreadId] = useState(mockCatalog.chatThreads[0]?.id ?? '');
  const [messages, setMessages] = useState<ChatMessage[]>(mockCatalog.chatThreads[0]?.messages ?? []);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [draftAnswer, setDraftAnswer] = useState('');
  const { toast } = useToast();

  const currentThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0];
  const suggested = mockCatalog.suggestedQuestions;

  useEffect(() => {
    const thread = threads.find((entry) => entry.id === activeThreadId);
    setMessages(thread?.messages ?? []);
  }, [activeThreadId, threads]);

  useEffect(() => {
    if (!isStreaming) return;
    const handle = window.setInterval(() => {
      setDraftAnswer((current) => current.slice(0, current.length + 1));
    }, 20);
    return () => window.clearInterval(handle);
  }, [isStreaming]);

  const startNewChat = () => {
    const newThread = { id: crypto.randomUUID(), title: 'New chat', updatedAt: 'Now', messages: [] };
    setThreads((current) => [newThread, ...current]);
    setActiveThreadId(newThread.id);
    setMessages([]);
    toast({ title: 'New chat created', message: 'You can start a fresh conversation with the tutor.' });
  };

  const deleteThread = (id: string) => {
    setThreads((current) => current.filter((thread) => thread.id !== id));
    if (activeThreadId === id && threads[1]) setActiveThreadId(threads[1].id);
  };

  const selectSuggested = async (question: string) => {
    setInput(question);
    await sendMessage(question);
  };

  const sendMessage = async (prompt?: string) => {
    const message = (prompt ?? input).trim();
    if (!message) return;
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: message, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const assistantId = crypto.randomUUID();
    const nextMessages = [...messages, userMessage, { id: assistantId, role: 'assistant', content: '', timestamp: 'typing...' }];
    setMessages(nextMessages);
    setInput('');
    setIsStreaming(true);

    const response = await sendChat(message, messages);
    const answer = response.reply;
    setDraftAnswer('');

    let index = 0;
    const handle = window.setInterval(() => {
      index += 2;
      const partial = answer.slice(0, index);
      setMessages((current) => current.map((entry) => (entry.id === assistantId ? { ...entry, content: partial, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } : entry)));
      if (index >= answer.length) {
        window.clearInterval(handle);
        setIsStreaming(false);
      }
    }, 18);

    setThreads((current) => current.map((thread) => thread.id === activeThreadId ? { ...thread, title: message.slice(0, 24), updatedAt: 'Just now', messages: [...nextMessages.slice(0, -1), { id: assistantId, role: 'assistant', content: answer, timestamp: 'Just now' }] } : thread));
  };

  return (
    <PageShell title="AI Tutor" subtitle="A ChatGPT-style tutoring space with recent chats, suggested questions, streaming replies, and UI-only voice/upload actions.">
      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <ChatSidebar threads={threads} activeThreadId={activeThreadId} onNewChat={startNewChat} onSelectThread={setActiveThreadId} onDeleteThread={deleteThread} />

        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Active thread</p>
              <h3 className="mt-1 font-semibold text-white">{currentThread?.title ?? 'New chat'}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <ToolbarButton icon={<Mic className="h-4 w-4" />} label="Voice" />
              <ToolbarButton icon={<Upload className="h-4 w-4" />} label="Upload" />
            </div>
          </div>

          <div className="grid min-h-[34rem] gap-4 rounded-[1.3rem] border border-white/10 bg-slate-950/80 p-4">
            <div className="flex flex-col gap-3 overflow-y-auto pr-1">
              {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
              {isStreaming ? <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">Typing a response...</div> : null}
            </div>

            <div className="grid gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Suggested questions</p>
              <div className="flex flex-wrap gap-2">
                {suggested.map((question) => (
                  <button key={question} onClick={() => selectSuggested(question)} className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">{question}</button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
              <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={4} placeholder="Ask anything about IT lessons, revision, or practice..." className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400">Streaming response effect is simulated on the client.</p>
                <Button onClick={() => sendMessage()}><Send className="mr-2 h-4 w-4" /> Send</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export const PracticePage = () => {
  const topics = useLoaded(getPracticeTopics, mockCatalog.practiceTopics);
  const [grade, setGrade] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [topic, setTopic] = useState('');

  const filtered = topics.filter((entry) => (grade === 'All' || String(entry.grade) === grade) && (difficulty === 'All' || entry.difficulty === difficulty) && entry.topic.toLowerCase().includes(topic.toLowerCase()));

  return (
    <PageShell title="Practice" subtitle="Choose a grade, filter by difficulty, and start targeted practice topics." actions={<Button>Start Practice</Button>}>
      <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5 lg:grid-cols-4">
        <Select label="Grade" value={grade} onChange={(event) => setGrade(event.target.value)}>
          <option>All</option>
          {mockCatalog.grades.map((item) => <option key={item.grade}>{item.grade}</option>)}
        </Select>
        <Select label="Difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Select>
        <Input label="Topic" value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Search topic" />
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">{filtered.length} topics</div>
      </div>
      <div className={cardGrid}>
        {filtered.map((entry) => (
          <div key={entry.id} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
            <Badge>Grade {entry.grade}</Badge>
            <h3 className="mt-3 font-display text-xl font-bold text-white">{entry.topic}</h3>
            <p className="mt-2 text-sm text-slate-300">{entry.focus}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-300"><span>{entry.difficulty}</span><span>{entry.duration}</span></div>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export const QuizPage = () => {
  const quizzes = useLoaded(getQuizzes, mockCatalog.quizzes);
  const navigate = useNavigate();
  const quiz = quizzes[0];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const question = quiz?.questions[index];
  const progress = quiz ? Math.round(((index + 1) / quiz.questions.length) * 100) : 0;

  const submit = () => {
    if (!quiz) return;
    const correctAnswers = quiz.questions.reduce((count, item, questionIndex) => count + (answers[questionIndex] === item.options.findIndex((option) => option.correct) ? 1 : 0), 0);
    const result = {
      total: quiz.questions.length,
      correct: correctAnswers,
      wrong: quiz.questions.length - correctAnswers,
      score: Math.round((correctAnswers / quiz.questions.length) * 100),
      leaderboard: quiz.leaderboard
    };
    window.localStorage.setItem('itma.quizResult', JSON.stringify(result));
    navigate('/quiz/results');
  };

  if (!quiz) return <Loader label="Loading quiz" />;

  return (
    <PageShell title="Quiz" subtitle="Interactive MCQ interface with timer, progress, navigation, and results flow.">
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Badge>Grade {quiz.grade}</Badge>
              <h3 className="mt-3 font-display text-2xl font-bold text-white">{quiz.title}</h3>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200"><Clock3 className="mr-2 inline h-4 w-4" /> {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</div>
          </div>
          <div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${progress}%` }} /></div>
          <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-slate-950/80 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Question {index + 1} of {quiz.questions.length}</p>
            <h4 className="mt-3 text-xl font-semibold text-white">{question.question}</h4>
            <div className="mt-5 grid gap-3">
              {question.options.map((option, optionIndex) => (
                <button key={option.label} onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} className={cn('rounded-2xl border px-4 py-3 text-left transition', answers[index] === optionIndex ? 'border-cyan-400/50 bg-cyan-400/10 text-white' : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10')}>
                  {option.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <Button variant="secondary" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0}><ArrowLeft className="mr-2 h-4 w-4" /> Previous</Button>
              {index < quiz.questions.length - 1 ? (
                <Button onClick={() => setIndex((current) => Math.min(quiz.questions.length - 1, current + 1))}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              ) : (
                <Button onClick={submit}>Submit</Button>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <QuizCard quiz={quiz} />
          <DashboardCard title="Quiz instructions">
            <ul className="grid gap-3 text-sm text-slate-300">
              <li>Read each question carefully.</li>
              <li>Use the timer to manage your pace.</li>
              <li>Submit to see score, wrong answers, and leaderboard.</li>
            </ul>
          </DashboardCard>
        </div>
      </div>
    </PageShell>
  );
};

export const QuizResultsPage = () => {
  const stored = window.localStorage.getItem('itma.quizResult');
  const result = stored ? JSON.parse(stored) as { total: number; correct: number; wrong: number; score: number; leaderboard: LeaderboardEntry[] } : { total: 0, correct: 0, wrong: 0, score: 0, leaderboard: mockCatalog.leaderboard };

  return (
    <PageShell title="Quiz Results" subtitle="Review your score, compare against the leaderboard, and continue learning.">
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ProgressCircle value={result.score} size={160} label="score" />
            <div className="grid gap-3 sm:grid-cols-3">
              <DashboardCard title="Correct"><div className="text-4xl font-bold text-white">{result.correct}</div></DashboardCard>
              <DashboardCard title="Wrong"><div className="text-4xl font-bold text-white">{result.wrong}</div></DashboardCard>
              <DashboardCard title="Total"><div className="text-4xl font-bold text-white">{result.total}</div></DashboardCard>
            </div>
          </div>
          <Button className="w-fit">Review answer explanations</Button>
        </div>
        <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
          <SectionTitle title="Leaderboard" />
          {result.leaderboard.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
              <span>{index + 1}. {entry.name}</span>
              <span>{entry.score} pts · {entry.streak} streak</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export const ResourcesPage = () => {
  const resources = useLoaded(getResources, mockCatalog.resources);
  const [query, setQuery] = useState('');

  const filtered = resources.filter((resource) => `${resource.title} ${resource.category} ${resource.type}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <PageShell title="Resources" subtitle="Search PDF cards, video cards, notes, and downloads." actions={<Button><FileText className="mr-2 h-4 w-4" /> Downloads</Button>}>
      <div className="grid gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5 md:grid-cols-[1fr_auto]">
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" label="Search" />
        <div className="flex items-end gap-3">
          <Badge>PDF</Badge>
          <Badge>Video</Badge>
          <Badge>Notes</Badge>
          <Badge>Downloads</Badge>
        </div>
      </div>
      <div className={cardGrid}>
        {filtered.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}
      </div>
    </PageShell>
  );
};

export const DashboardPage = () => {
  const dashboard = useLoaded(getDashboard, mockCatalog.dashboard);
  const stats = useLoaded(getStats, mockCatalog.stats);

  return (
    <PageShell title="Dashboard" subtitle="Monitor statistics, achievements, calendar, AI usage, and recent activity.">
      <div className={cardGrid}>
        {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <DashboardCard title="Recent activity">
          <div className="grid gap-3">
            {dashboard.recentActivity.map((activity) => (
              <div key={activity.title} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">{activity.title}</p>
                <p className="mt-1">{activity.detail}</p>
                <p className="mt-2 text-xs text-slate-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
        <DashboardCard title="Calendar">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {dashboard.calendar.map((entry) => (
              <div key={entry.day} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-slate-300">
                <p className="font-semibold text-white">{entry.day}</p>
                <p className="mt-2 text-xs">{entry.label}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <DashboardCard title="Quiz results"><div className="grid gap-3">{dashboard.quizResults.map((item) => <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>{item.label}</span><span className="font-semibold text-white">{item.value}</span></div>)}</div></DashboardCard>
        <DashboardCard title="AI usage"><div className="grid gap-3">{dashboard.aiUsage.map((item) => <div key={item.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>{item.label}</span><span className="font-semibold text-white">{item.value}</span></div>)}</div></DashboardCard>
      </div>
      <DashboardCard title="Achievements">
        <div className="grid gap-3 md:grid-cols-3">
          {dashboard.achievements.map((achievement) => <div key={achievement.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"><p className="font-semibold text-white">{achievement.title}</p><p className="mt-2">{achievement.detail}</p></div>)}
        </div>
      </DashboardCard>
    </PageShell>
  );
};

export const StudentProfilePage = () => {
  const profile = useLoaded(getProfile, mockCatalog.profile as StudentProfile);

  return (
    <PageShell title="Student Profile" subtitle="View progress, certificates, settings, and learning goals.">
      <ProfileCard profile={profile} />
      <div className="grid gap-5 lg:grid-cols-2">
        <DashboardCard title="Goals"><div className="grid gap-3">{profile.goals.map((goal) => <div key={goal} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">{goal}</div>)}</div></DashboardCard>
        <DashboardCard title="Settings"><div className="grid gap-3 text-sm text-slate-300"><div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>Dark mode</span><span>{profile.settings.darkMode ? 'Enabled' : 'Disabled'}</span></div><div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span>Notifications</span><span>{profile.settings.notifications ? 'Enabled' : 'Disabled'}</span></div></div></DashboardCard>
      </div>
    </PageShell>
  );
};

export const LoginPage = () => {
  const { login: authLogin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register: registerField, handleSubmit, formState: { isSubmitting } } = useForm<{ email: string; password: string }>();

  const onSubmit = async (payload: { email: string; password: string }) => {
    await authLogin(payload);
    toast({ title: 'Welcome back', message: 'You are now signed in.', tone: 'success' });
    navigate('/dashboard');
  };

  return (
    <PageShell title="Login" subtitle="Sign in to continue your learning journey.">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-full max-w-lg gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
        <Input label="Email" type="email" placeholder="student@example.com" {...registerField('email', { required: true })} />
        <Input label="Password" type="password" placeholder="••••••••" {...registerField('password', { required: true })} />
        <Button loading={isSubmitting} type="submit">Login</Button>
        <div className="flex flex-wrap items-center justify-between text-sm text-slate-300">
          <Link to="/forgot-password" className="hover:text-white">Forgot password?</Link>
          <Link to="/register" className="hover:text-white">Create account</Link>
        </div>
      </form>
    </PageShell>
  );
};

export const RegisterPage = () => {
  const { register: authRegister } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register: registerField, handleSubmit, formState: { isSubmitting } } = useForm<{ name: string; email: string; password: string; grade: string }>();

  const onSubmit = async (payload: { name: string; email: string; password: string; grade: string }) => {
    await authRegister(payload);
    toast({ title: 'Account created', message: 'Your learning profile is ready.', tone: 'success' });
    navigate('/otp');
  };

  return (
    <PageShell title="Register" subtitle="Create a new student account.">
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto grid w-full max-w-lg gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
        <Input label="Name" placeholder="Ayaan Silva" {...registerField('name', { required: true })} />
        <Input label="Email" type="email" placeholder="student@example.com" {...registerField('email', { required: true })} />
        <Input label="Password" type="password" placeholder="••••••••" {...registerField('password', { required: true })} />
        <Select label="Grade" {...registerField('grade')}>
          <option>Grade 6</option>
          <option>Grade 7</option>
          <option>Grade 8</option>
          <option>Grade 9</option>
          <option>Grade 10</option>
          <option>Grade 11</option>
        </Select>
        <Button loading={isSubmitting} type="submit">Register</Button>
        <Link to="/login" className="text-sm text-slate-300 hover:text-white">Already have an account?</Link>
      </form>
    </PageShell>
  );
};

export const ForgotPasswordPage = () => (
  <PageShell title="Forgot Password" subtitle="A UI-only reset flow for future email integration.">
    <form className="mx-auto grid w-full max-w-lg gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
      <Input label="Email" type="email" placeholder="student@example.com" />
      <Button>Send reset link</Button>
    </form>
  </PageShell>
);

export const OtpPage = () => (
  <PageShell title="OTP Verification" subtitle="Enter a one-time code to complete sign-in. The flow is UI-only for now.">
    <form className="mx-auto grid w-full max-w-lg gap-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
      <Input label="OTP code" placeholder="000000" />
      <Button>Verify code</Button>
    </form>
  </PageShell>
);

export const NotFoundPage = () => (
  <div className="grid min-h-screen place-items-center px-4">
    <div className="grid max-w-xl gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-cyan-100">404</p>
      <h1 className="font-display text-4xl font-bold text-white">Page not found</h1>
      <p className="text-slate-300">The requested route does not exist. Return to the home page to continue exploring IT Master AI.</p>
      <Link to="/"><Button className="mx-auto w-fit">Go home</Button></Link>
    </div>
  </div>
);
