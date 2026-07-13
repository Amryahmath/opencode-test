// apps/api/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader } from '../utils/auth';
import { error } from '../utils/apiResponse';
import type { User } from '@it-master-ai/types';
import { getUserById } from '../mock-data/users';

export interface AuthRequest extends Request {
  user?: User;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = extractTokenFromHeader(req.headers.authorization);
  
  if (!token) {
    return res.status(401).json(error('Authentication required'));
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json(error('Invalid or expired token'));
  }

  const user = getUserById(payload.sub);
  if (!user) {
    return res.status(401).json(error('User not found'));
  }

  req.user = user;
  next();
}

export function optionalAuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = extractTokenFromHeader(req.headers.authorization);
  
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      const user = getUserById(payload.sub);
      if (user) req.user = user;
    }
  }
  next();
}

export function requireRole(...roles: User['role'][]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json(error('Authentication required'));
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json(error('Insufficient permissions'));
    }
    next();
  };
}