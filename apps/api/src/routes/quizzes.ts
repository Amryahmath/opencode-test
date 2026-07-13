// apps/api/src/routes/quizzes.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validation';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { 
  getQuizById, 
  getAllQuizzes, 
  getQuizzesByGrade, 
  submitQuiz, 
  getLeaderboard 
} from '../mock-data/quizzes';
import { success, error } from '../utils/apiResponse';

const router = Router();

const quizSubmissionSchema = z.object({
  quizId: z.string(),
  answers: z.record(z.array(z.string())),
  timeTaken: z.number().min(0),
});

router.get('/', async (req: Request, res: Response) => {
  const { grade, page = '1', limit = '10' } = req.query;
  let quizzes = getAllQuizzes();
  
  if (grade) quizzes = getQuizzesByGrade(parseInt(grade as string));
  
  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const start = (pageNum - 1) * limitNum;
  const paginated = quizzes.slice(start, start + limitNum);

  return res.json({
    success: true,
    message: 'Quizzes retrieved',
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: quizzes.length,
      totalPages: Math.ceil(quizzes.length / limitNum),
    },
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const quiz = getQuizById(req.params.id);
  if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found', errors: [] });
  return res.json({ success: true, message: 'Quiz retrieved', data: quiz });
});

router.post('/:id/submit', authMiddleware, validate(quizSubmissionSchema), async (req: AuthRequest, res: Response) => {
  try {
    const result = submitQuiz(req.params.id, req.body);
    return res.json({ success: true, message: 'Quiz submitted', data: result });
  } catch (err) {
    return res.status(400).json({ success: false, message: err instanceof Error ? err.message : 'Submission failed', errors: [] });
  }
});

router.get('/:id/leaderboard', async (req: Request, res: Response) => {
  return res.json({ success: true, message: 'Leaderboard retrieved', data: getLeaderboard(req.params.id) });
});

export default router;