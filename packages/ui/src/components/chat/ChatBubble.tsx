import * as React from 'react';
import { cn } from '../../utils/classnames';

interface ChatBubbleProps {
  message: {
    role: 'user' | 'assistant';
    content: string;
    isStreaming?: boolean;
  };
}

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div className={cn('flex gap-3', message.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
      {message.role !== 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className={cn(
        'max-w-[70%] rounded-2xl px-4 py-3',
        message.role === 'user'
          ? 'bg-primary-600 text-white rounded-tr-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-md'
      )}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.isStreaming && (
          <span className="inline-block animate-pulse ml-1">▌</span>
        )}
      </div>
      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">U</span>
        </div>
      )}
    </div>
  );
}