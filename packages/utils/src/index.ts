import catalog from './catalog.json';
import type { ApiResponse, Catalog, ChatMessage } from '@it-master-ai/types';

const data = catalog as Catalog;

const clone = <T,>(value: T): T => (typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value)));

export const mockCatalog = data;
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

export const toApiResponse = <T,>(message: string, payload: T): ApiResponse<T> => ({ success: true, message, data: payload });

export const getGrades = () => clone(data.grades);
export const getCourses = () => clone(data.courses);
export const getLessons = () => clone(data.lessons);
export const getQuizzes = () => clone(data.quizzes);
export const getResources = () => clone(data.resources);
export const getTeachers = () => clone(data.teachers);
export const getStats = () => clone(data.stats);
export const getTimeline = () => clone(data.timeline);
export const getPracticeTopics = () => clone(data.practiceTopics);
export const getProfile = () => clone({ ...data.profile, id: 'student-001' });
export const getDashboard = () => clone(data.dashboard);
export const getSuggestedQuestions = () => clone(data.suggestedQuestions);
export const getChatThreads = () => clone(data.chatThreads);
export const getLeaderboard = () => clone(data.leaderboard);

export const buildTutorReply = (message: string, history: ChatMessage[] = []) => {
  const input = message.toLowerCase();
  if (input.includes('html')) return 'HTML gives structure to a web page. Start with semantic tags, then add forms, sections, and accessible labels.';
  if (input.includes('css')) return 'CSS controls layout, spacing, color, and responsive behavior. Think in containers, typography, and breakpoints.';
  if (input.includes('quiz')) return 'For quizzes, read the question carefully, remove obvious wrong options, and watch for keywords like best, always, and most.';
  if (input.includes('cyber') || input.includes('security')) return 'Cybersecurity starts with strong passwords, safe links, updates, and never sharing private data.';
  if (input.includes('spreadsheet')) return 'Spreadsheets are for organizing data, using formulas, and turning numbers into charts and insights.';

  const lastAssistant = [...history].reverse().find((entry) => entry.role === 'assistant')?.content;
  return `${lastAssistant ? `${lastAssistant} ` : ''}Try breaking the topic into smaller parts, then practice one example at a time.`;
};
