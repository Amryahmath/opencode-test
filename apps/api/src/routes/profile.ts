// apps/api/src/routes/profile.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validation';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { getUserById, getUserByEmail, getAllTeachers, getTeacherById } from '../mock-data/users';
import { success, error } from '../utils/apiResponse';

const router = Router();

const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  school: z.string().max(100).optional(),
  grade: z.number().min(6).max(11).optional(),
});

const settingsUpdateSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).optional(),
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  language: z.string().optional(),
});

router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  const user = getUserById(req.user!.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found', errors: [] });
  return res.json({ success: true, message: 'Profile retrieved', data: user });
});

router.put('/', authMiddleware, validate(profileUpdateSchema), async (req: AuthRequest, res: Response) => {
  // In a real app, update user in database
  const user = getUserById(req.user!.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found', errors: [] });
  return res.json({ success: true, message: 'Profile updated', data: { ...user, ...req.body } });
});

router.put('/settings', authMiddleware, validate(settingsUpdateSchema), async (req: AuthRequest, res: Response) => {
  // In a real app, update settings in database
  return res.json({ success: true, message: 'Settings updated', data: req.body });
});

router.get('/certificates', authMiddleware, async (req: AuthRequest, res: Response) => {
  const user = getUserById(req.user!.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found', errors: [] });
  // Return mock certificates
  return res.json({ success: true, message: 'Certificates retrieved', data: [] });
});

router.get('/teachers', async (req: Request, res: Response) => {
  return res.json({ success: true, message: 'Teachers retrieved', data: getAllTeachers() });
});

router.get('/teachers/:id', async (req: Request, res: Response) => {
  const teacher = getTeacherById(req.params.id);
  if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found', errors: [] });
  return res.json({ success: true, message: 'Teacher retrieved', data: teacher });
});

export default router;