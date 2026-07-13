// apps/api/src/routes/dashboard.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import { 
  getDashboardStats, 
  getRecentActivity, 
  getAchievements, 
  getCalendarEvents,
  getProgressData 
} from '../mock-data/dashboard';
import { success, error } from '../utils/apiResponse';

const router = Router();

router.get('/stats', authMiddleware, async (req: AuthRequest, res: Response) => {
  return res.json({ success: true, message: 'Stats retrieved', data: getDashboardStats() });
});

router.get('/activity', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { limit = '10' } = req.query;
  const activity = getRecentActivity(parseInt(limit as string));
  return res.json({ success: true, message: 'Activity retrieved', data: activity });
});

router.get('/achievements', authMiddleware, async (req: AuthRequest, res: Response) => {
  return res.json({ success: true, message: 'Achievements retrieved', data: getAchievements() });
});

router.get('/calendar', authMiddleware, async (req: AuthRequest, res: Response) => {
  return res.json({ success: true, message: 'Calendar retrieved', data: getCalendarEvents() });
});

router.get('/progress', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { days = '30' } = req.query;
  const progressData = getProgressData().slice(-parseInt(days as string));
  return res.json({ success: true, message: 'Progress data retrieved', data: progressData });
});

export default router;