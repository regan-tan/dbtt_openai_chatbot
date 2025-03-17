import React from 'react';
import { Message } from '../types';
import { Cake } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} max-w-[80%] items-start gap-2`}>
        {isBot ? (
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
            <Cake className="w-5 h-5 text-rose-600" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-sm text-gray-600">You</span>
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-lg ${
            isBot
              ? 'bg-rose-50 text-gray-800'
              : 'bg-rose-500 text-white'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};