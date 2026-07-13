// apps/api/src/routes/teachers.ts
import { Router, Request, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getAllTeachers, getTeacherById } from '../mock-data/users';
import { success, error } from '../utils/apiResponse';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    return res.json({ success: true, message: 'Teachers retrieved', data: getAllTeachers() });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve teachers', errors: [] });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const teacher = getTeacherById(req.params.id);
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found', errors: [] });
    return res.json({ success: true, message: 'Teacher retrieved', data: teacher });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve teacher', errors: [] });
  }
});

export default router;