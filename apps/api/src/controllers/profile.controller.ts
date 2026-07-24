import type { Request, Response } from 'express';
import { profileService } from '../services/profile.service.js';
import { ok } from '../utils/apiResponse.js';

export const profileController = {
  profile: async (_req: Request, res: Response) => res.json(ok('Profile loaded', await profileService.profile()))
};
