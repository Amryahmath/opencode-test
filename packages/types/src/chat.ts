export interface Chat {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  createdAt: string;
}

export interface ChatRequest {
  message: string;
  chatId?: string;
}

export interface ChatResponse {
  message: Message;
  chatId: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
  messageCount: number;
}