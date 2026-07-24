import { getProfile } from '../mock-data/index.js';

export const profileService = {
  profile: async () => getProfile()
};
