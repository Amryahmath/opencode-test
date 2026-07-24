import { Router } from 'express';
import { contentController } from '../controllers/content.controller.js';

const router = Router();

router.get('/courses', contentController.courses);
router.get('/grades', contentController.grades);
router.get('/lessons', contentController.lessons);
router.get('/quizzes', contentController.quizzes);
router.get('/resources', contentController.resources);
router.get('/teachers', contentController.teachers);
router.get('/stats', contentController.stats);
router.get('/timeline', contentController.timeline);
router.get('/practice', contentController.practice);
router.get('/leaderboard', contentController.leaderboard);
router.get('/dashboard', contentController.dashboard);

export default router;
