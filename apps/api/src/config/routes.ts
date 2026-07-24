import { Router } from 'express';
import contentRoutes from '../routes/content.routes.js';
import authRoutes from '../routes/auth.routes.js';
import chatRoutes from '../routes/chat.routes.js';
import profileRoutes from '../routes/profile.routes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ success: true, message: 'API healthy', data: { status: 'ok' } }));
router.use('/', contentRoutes);
router.use('/', authRoutes);
router.use('/', chatRoutes);
router.use('/', profileRoutes);

export default router;
