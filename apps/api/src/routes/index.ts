// apps/api/src/routes/index.ts
import { Router } from 'express';
import authRoutes from './auth';
import gradesRoutes from './grades';
import coursesRoutes from './courses';
import quizzesRoutes from './quizzes';
import resourcesRoutes from './resources';
import chatRoutes from './chat';
import dashboardRoutes from './dashboard';
import profileRoutes from './profile';
import teachersRoutes from './teachers';

const router = Router();

router.use('/auth', authRoutes);
router.use('/grades', gradesRoutes);
router.use('/courses', coursesRoutes);
router.use('/quizzes', quizzesRoutes);
router.use('/resources', resourcesRoutes);
router.use('/chat', chatRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/profile', profileRoutes);
router.use('/teachers', teachersRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;