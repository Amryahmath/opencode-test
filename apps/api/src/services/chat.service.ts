import { buildTutorReply, getChatThreads, getSuggestedQuestions } from '../mock-data/index.js';

export const chatService = {
  threads: async () => getChatThreads(),
  suggested: async () => getSuggestedQuestions(),
  reply: async (message: string) => ({ reply: buildTutorReply(message), suggested: await getSuggestedQuestions() })
};
