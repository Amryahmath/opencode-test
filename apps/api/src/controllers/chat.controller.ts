import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service.js';
import { ok } from '../utils/apiResponse.js';

export const chatController = {
  chat: async (req: Request, res: Response) => {
    const message = String(req.body?.message ?? '');
    const history = Array.isArray(req.body?.history) ? req.body.history : [];
    res.json(ok('Chat reply generated', { ...(await chatService.reply(message)), history }));
  }
};
