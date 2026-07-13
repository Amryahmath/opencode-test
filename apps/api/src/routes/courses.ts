// apps/api/src/routes/courses.ts
import { Router, Response } from 'express';
import { grades, getGradeById, getGradeByLevel } from '../mock-data/grades';
import { success, error } from '../utils/apiResponse';

const router = Router();

router.get('/', async (req, res: Response) => {
  return res.json({ success: true, message: 'Grades retrieved', data: grades });
});

router.get('/:id', async (req, res: Response) => {
  const grade = getGradeById(req.params.id);
  if (!grade) return res.status(404).json(error('Grade not found'));
  return res.json({ success: true, message: 'Grade retrieved', data: grade });
});

router.get('/level/:level', async (req, res: Response) => {
  const grade = getGradeByLevel(parseInt(req.params.level));
  if (!grade) return res.status(404).json(error('Grade not found'));
  return res.json({ success: true, message: 'Grade retrieved', data: grade });
});

export default router;