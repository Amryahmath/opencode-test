import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import { ok } from '../utils/apiResponse.js';

export const authController = {
  login: async (_req: Request, res: Response) => res.json(ok('Logged in successfully', await authService.login())),
  register: async (_req: Request, res: Response) => res.json(ok('Registered successfully', await authService.register()))
};
