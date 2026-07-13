// apps/api/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { error } from '../utils/apiResponse';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(error(err.message));
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(error('Invalid token'));
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(error('Token expired'));
  }

  return res.status(500).json(error('Internal server error'));
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json(error(`Route ${req.method} ${req.path} not found`));
}