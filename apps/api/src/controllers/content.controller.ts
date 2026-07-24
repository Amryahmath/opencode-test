import type { Request, Response } from 'express';
import { contentService } from '../services/content.service.js';
import { ok } from '../utils/apiResponse.js';

const respond = async (res: Response, message: string, loader: () => Promise<unknown>) => res.json(ok(message, await loader()));

export const contentController = {
  courses: (_req: Request, res: Response) => respond(res, 'Courses loaded', contentService.courses),
  grades: (_req: Request, res: Response) => respond(res, 'Grades loaded', contentService.grades),
  lessons: (_req: Request, res: Response) => respond(res, 'Lessons loaded', contentService.lessons),
  quizzes: (_req: Request, res: Response) => respond(res, 'Quizzes loaded', contentService.quizzes),
  resources: (_req: Request, res: Response) => respond(res, 'Resources loaded', contentService.resources),
  teachers: (_req: Request, res: Response) => respond(res, 'Teachers loaded', contentService.teachers),
  stats: (_req: Request, res: Response) => respond(res, 'Stats loaded', contentService.stats),
  timeline: (_req: Request, res: Response) => respond(res, 'Timeline loaded', contentService.timeline),
  practice: (_req: Request, res: Response) => respond(res, 'Practice topics loaded', contentService.practice),
  leaderboard: (_req: Request, res: Response) => respond(res, 'Leaderboard loaded', contentService.leaderboard),
  dashboard: (_req: Request, res: Response) => respond(res, 'Dashboard loaded', contentService.dashboard)
};
