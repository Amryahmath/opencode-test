import * as React from 'react';
import { Send, Mic, Paperclip, X } from 'lucide-react';
import { cn } from '../../utils/classnames';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({ onSend, disabled = false, placeholder = 'Ask me anything...' }: MessageInputProps) {
  const [message, setMessage] = React.useState('');
  const [isComposing, setIsComposing] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isComposing) {
      onSend(message.trim());
      setMessage('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = (e: React.CompositionEvent) => {
    setIsComposing(false);
    const value = e.currentTarget.value;
    if (value) {
      setMessage(value);
    }
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="flex items-end gap-2 p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Attach file"
            disabled={disabled}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className={cn(
                'w-full bg-transparent resize-none outline-none',
                'text-gray-900 dark:text-white placeholder:text-gray-400',
                'pr-12',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              style={{ minHeight: '44px', maxHeight: '150px' }}
              onInput={autoResize}
              aria-label="Message input"
            />
            {message && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setMessage('')}
                aria-label="Clear message"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Voice input"
            disabled={disabled}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button
            type="submit"
            disabled={!message.trim() || disabled || isComposing}
            className="ml-1 p-2 bg-primary-600 hover:bg-primary-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 px-3">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </form>
  );
}