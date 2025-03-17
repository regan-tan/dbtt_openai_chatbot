import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ArrowUpRight } from 'lucide-react';
import { generateResponse } from './lib/openai';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm Pie-Bot, your personal assistant at Elijah Pies. How can I help you today? 🥧",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Convert messages to OpenAI format
      const messageHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant' as 'user' | 'assistant',
        content: msg.content
      }));
      messageHistory.push({ role: 'user', content });

      // Generate AI response
      const response = await generateResponse(messageHistory);

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response || "I apologize, but I'm having trouble processing your request.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error handling message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble processing your request right now.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-800">Elijah Pies</h1>
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                Online
              </span>
            </div>
            <a
              href="https://www.instagram.com/elijahpies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 hover:text-rose-600 flex items-center gap-1 text-sm"
            >
              Follow us <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center animate-pulse">
                <span className="text-rose-600">...</span>
              </div>
              <div>Pie-Bot is typing...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;