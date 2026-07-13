import { GradeLevel } from './index';

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

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  score: number;
  percentage: number;
  timeTaken: number;
  completedAt: string;
  rank: number;
}