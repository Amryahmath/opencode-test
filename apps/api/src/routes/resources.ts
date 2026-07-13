// apps/api/src/routes/resources.ts
import { Router, Response } from 'express';
import { getAllResources, getResourcesByGrade, getResourcesByType, searchResources, getResourceById } from '../mock-data/resources';
import { success, error } from '../utils/apiResponse';

const router = Router();

router.get('/', async (req, res: Response) => {
  const { grade, type, search, page = '1', limit = '12' } = req.query;
  let resources = getAllResources();

  if (grade) resources = getResourcesByGrade(parseInt(grade as string));
  if (type) resources = getResourcesByType(type as any);
  if (search) resources = searchResources(search as string);

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const start = (pageNum - 1) * limitNum;
  const paginated = resources.slice(start, start + limitNum);

  return res.json({
    success: true,
    message: 'Resources retrieved',
    data: paginated,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total: resources.length,
      totalPages: Math.ceil(resources.length / limitNum),
    },
  });
});

router.get('/:id', async (req, res: Response) => {
  const resource = getResourceById(req.params.id);
  if (!resource) return res.status(404).json(error('Resource not found'));
  return res.json({ success: true, message: 'Resource retrieved', data: resource });
});

export default router;