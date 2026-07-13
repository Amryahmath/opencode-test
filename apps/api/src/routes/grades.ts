// apps/api/src/routes/grades.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getAllGrades, getGradeById, getGradeByLevel } from '../mock-data/grades';

const router = Router();

const gradeQuerySchema = z.object({
  grade: z.coerce.number().min(6).max(11).optional(),
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const { grade } = gradeQuerySchema.parse(req.query);
    let grades = getAllGrades();
    
    if (grade) {
      grades = grades.filter(g => g.level === grade);
    }
    
    return res.json({
      success: true,
      message: 'Grades retrieved successfully',
      data: grades,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid query parameters',
      errors: err instanceof z.ZodError ? err.errors : [],
    });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const grade = getGradeById(req.params.id);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
        errors: [],
      });
    }
    
    return res.json({
      success: true,
      message: 'Grade retrieved successfully',
      data: grade,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve grade',
      errors: [],
    });
  }
});

router.get('/level/:level', async (req: Request, res: Response) => {
  try {
    const level = parseInt(req.params.level);
    if (isNaN(level) || level < 6 || level > 11) {
      return res.status(400).json({
        success: false,
        message: 'Invalid grade level',
        errors: [],
      });
    }
    
    const grade = getGradeByLevel(level);
    if (!grade) {
      return res.status(404).json({
        success: false,
        message: 'Grade not found',
        errors: [],
      });
    }
    
    return res.json({
      success: true,
      message: 'Grade retrieved successfully',
      data: grade,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve grade',
      errors: [],
    });
  }
});

export default router;