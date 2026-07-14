import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Mic, Paperclip, Bot, X, Sparkles, Trash2, Plus, Loader2, Copy, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, ScrollArea } from '@it-master-ai/ui';

const suggestedQuestions = [
  'What is a variable in programming?',
  'How do loops work in Python?',
  'Explain the difference between HTTP and HTTPS',
  'What is a database and why do we need it?',
  'How does encryption protect my data?',
  'What are the basics of HTML and CSS?',
];

const mockResponses: Record<string, string> = {
  'variable': 'A variable is like a labeled box where you can store a value. In programming, you give it a name (like `age` or `score`) and assign it a value. You can then use that name throughout your code to refer to the stored value. For example: `let age = 15;` stores the number 15 in a variable called `age`.',
  'loop': 'A loop lets you repeat code multiple times without writing it over and over. In Python, a `for` loop might look like: `for i in range(5): print(i)` - this prints numbers 0 through 4. A `while` loop continues as long as a condition is true. Loops are essential for automating repetitive tasks!',
  'http': 'HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web. HTTPS is the secure version - the "S" stands for Secure. It uses SSL/TLS encryption to protect data between your browser and the server. Always look for the padlock icon and "https://" when entering sensitive information!',
  'database': 'A database is an organized collection of data that can be easily accessed, managed, and updated. Think of it like a digital filing cabinet. Common types include SQL databases (like MySQL, PostgreSQL) for structured data and NoSQL databases (like MongoDB) for flexible data. They power everything from your school records to social media!',
  'encryption': 'Encryption scrambles your data so only authorized parties can read it. It uses mathematical algorithms and keys. Symmetric encryption uses the same key to encrypt and decrypt. Asymmetric encryption uses a public key (to encrypt) and private key (to decrypt). This is how HTTPS, messaging apps, and password storage stay secure!',
  'html': 'HTML (HyperText Markup Language) structures web content with elements like headings (`<h1>`), paragraphs (`<p>`), links (`<a>`), and images (`<img>`). CSS (Cascading Style Sheets) styles those elements - colors, fonts, layouts, animations. Together they create every website you visit! Try right-clicking any page and selecting "Inspect" to see the code.',
};

function getMockResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) return response;
  }
  return `That's a great question about "${message}"! As your AI tutor, I can help explain IT concepts, debug code, suggest projects, and guide you through the curriculum.

For example, I can:
• Explain programming concepts (variables, loops, functions, etc.)
• Help debug your code step by step
• Suggest practice projects for your grade level
• Explain networking, databases, cybersecurity topics
• Create custom quizzes to test your knowledge

What would you like to learn about today?`;
}

function ChatBubble({ message, isUser }: { message: { role: 'user' | 'assistant'; content: string; isStreaming?: boolean }; isUser: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      <div className={`max-w-[70%] ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary-600 text-white rounded-tr-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-sm'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
          {message.isStreaming && <span className="inline-block w-4 h-4 ml-1 animate-bounce">▌</span>}
        </div>
        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isUser && (
            <>
              <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-green-500" title="Helpful">
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500" title="Not helpful">
                <ThumbsDown className="h-4 w-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-primary-500" title="Copy">
                <Copy className="h-4 w-4" />
              </button>
              <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-red-500" title="Report">
                <Flag className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">U</span>
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3 rounded-tl-sm">
        <div className="flex gap-1">
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function AITutorPage() {
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant'; content: string; isStreaming?: boolean }>>([
    { role: 'assistant', content: "Hi! I'm your AI Tutor for IT Master AI. I can help you with programming concepts, debugging, practice problems, and explaining any topic from the Grade 6-11 curriculum. What would you like to learn today?" }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [chats, setChats] = React.useState<Array<{ id: string; title: string; messages: typeof messages }>>([
    { id: '1', title: 'Welcome Chat', messages: [] }
  ]);
  const [activeChatId, setActiveChatId] = React.useState('1');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    const currentInput = input;
    setInput('');

    // Simulate streaming response
    const response = getMockResponse(currentInput);
    const streamingMessage = { role: 'assistant' as const, content: '', isStreaming: true };
    setMessages(prev => [...prev, streamingMessage]);

    let currentText = '';
    for (let i = 0; i < response.length; i++) {
      await new Promise(r => setTimeout(r, 10 + Math.random() * 20));
      currentText += response[i];
      setMessages(prev => prev.map((msg, idx) => 
        idx === prev.length - 1 ? { ...msg, content: currentText } : msg
      ));
    }

    setMessages(prev => prev.map(msg => 
      msg.isStreaming ? { ...msg, isStreaming: false, content: response } : msg
    ));
    setIsLoading(false);
  };

  const getMockResponse = (message: string): string => {
    const lower = message.toLowerCase();
    for (const [key, response] of Object.entries({
      'variable': 'A variable is like a labeled box where you can store a value. In programming, you give it a name (like `age` or `score`) and assign it a value. You can then use that name throughout your code to refer to the stored value. For example: `let age = 15;` stores the number 15 in a variable called `age`.',
      'loop': 'A loop lets you repeat code multiple times without writing it over and over. In Python, a `for` loop might look like: `for i in range(5): print(i)` - this prints numbers 0 through 4. A `while` loop continues as long as a condition is true. Loops are essential for automating repetitive tasks!',
      'http': 'HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web. HTTPS is the secure version - the "S" stands for Secure. It uses SSL/TLS encryption to protect data between your browser and the server. Always look for the padlock icon and "https://" when entering sensitive information!',
      'database': 'A database is an organized collection of data that can be easily accessed, managed, and updated. Think of it like a digital filing cabinet. Common types include SQL databases (like MySQL, PostgreSQL) for structured data and NoSQL databases (like MongoDB) for flexible data. They power everything from your school records to social media!',
      'encryption': 'Encryption scrambles your data so only authorized parties can read it. It uses mathematical algorithms and keys. Symmetric encryption uses the same key to encrypt and decrypt. Asymmetric encryption uses a public key (to encrypt) and private key (to decrypt). This is how HTTPS, messaging apps, and password storage stay secure!',
      'html': 'HTML (HyperText Markup Language) structures web content with elements like headings (`<h1>`), paragraphs (`<p>`), links (`<a>`), and images (`<img>`). CSS (Cascading Style Sheets) styles those elements - colors, fonts, layouts, animations. Together they create every website you visit! Try right-clicking any page and selecting "Inspect" to see the code.',
    })) {
      if (lower.includes(key)) return response;
    }
    return `That's a great question about "${message}"! As your AI tutor, I can help explain IT concepts, debug code, suggest projects, and guide you through the curriculum.

For example, I can:
• Explain programming concepts (variables, loops, functions, etc.)
• Help debug your code step by step
• Suggest practice projects for your grade level
• Explain networking, databases, cybersecurity topics
• Create custom quizzes to test your knowledge

What would you like to learn about today?`;
  };

  const handleSuggestedClick = (question: string) => {
    setInput(question);
    handleSend(new Event('submit') as React.FormEvent);
  };

  const handleNewChat = () => {
    const newId = Date.now().toString();
    const newChat = { id: newId, title: 'New Chat', messages: [] };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newId);
    setMessages([
      { role: 'assistant', content: "Hi! I'm your AI Tutor for IT Master AI. I can help you with programming concepts, debugging, practice problems, and explaining any topic from the Grade 6-11 curriculum. What would you like to learn today?" }
    ]);
  };

  const handleDeleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      const remaining = chats.filter(c => c.id !== id);
      if (remaining.length > 0) {
        setActiveChatId(remaining[0].id);
      } else {
        handleNewChat();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} lg:w-80 transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Chats</h2>
          <Button variant="ghost" size="sm" onClick={handleNewChat} className="h-8 w-8 p-0" aria-label="New chat">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  activeChatId === chat.id
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{chat.title || 'New Chat'}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete chat"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Chats are saved locally in your browser
          </p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle chat history"
            >
              <Bot className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">AI Tutor</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Grade 6-11 IT Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Online
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <ChatBubble key={`${index}-${message.content.slice(0, 20)}`} message={message} isUser={message.role === 'user'} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </AnimatePresence>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={q}
                    onClick={() => handleSuggestedClick(q)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about IT..."
                className="pr-16"
                rows={1}
                maxRows={5}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                <button type="button" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Attach file">
                  <Paperclip className="h-5 w-5" />
                </button>
                <button type="button" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-label="Voice input">
                  <Mic className="h-5 w-5" />
                </button>
                <button type="submit" disabled={!input.trim() || isLoading} className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send message">
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </form>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}