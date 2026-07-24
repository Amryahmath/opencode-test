import { getProfile } from '../mock-data/index.js';

const tokenFor = (subject: string) => Buffer.from(`${subject}:${Date.now()}`).toString('base64url');

export const authService = {
  login: async () => ({ token: tokenFor('login'), profile: getProfile() }),
  register: async () => ({ token: tokenFor('register'), profile: getProfile() })
};
