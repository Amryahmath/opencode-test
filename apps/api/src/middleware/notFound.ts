import type { Request, Response } from 'express';

export const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found', errors: ['The requested endpoint does not exist.'] });
};
