"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, X, Settings, User, MessageCircle, Loader2 } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { aiResponses } from '@/data/portfolio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIAgentWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: aiResponses.greetings[0],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
    }
    if (lowerInput.includes('about') || lowerInput.includes('who') || lowerInput.includes('yourself')) {
      return aiResponses.about[Math.floor(Math.random() * aiResponses.about.length)];
    }
    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
      return aiResponses.skills[Math.floor(Math.random() * aiResponses.skills.length)];
    }
    if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
      return aiResponses.projects[Math.floor(Math.random() * aiResponses.projects.length)];
    }
    if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach')) {
      return aiResponses.contact[Math.floor(Math.random() * aiResponses.contact.length)];
    }
    if (lowerInput.includes('hire') || lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('service')) {
      return aiResponses.hire[Math.floor(Math.random() * aiResponses.hire.length)];
    }
    if (lowerInput.includes('help') || lowerInput.includes('command')) {
      return "Try asking about:\n• 'about' - Learn about Kalpesh\n• 'skills' - See his tech stack\n• 'projects' - View his work\n• 'contact' - Get in touch\n• 'hire' - Hire him for your project!";
    }
    
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1000);
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div 
        className="flex items-center gap-3 p-4 border-b"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)`,
            boxShadow: `0 4px 12px ${accentColor}40`
          }}
        >
          <Bot size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Shindekalpesharun Assistant
          </h2>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            AI-powered help • Always ready to assist
          </p>
        </div>
        <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
          <Settings size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div 
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.role === 'assistant' 
                  ? '' 
                  : isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}
              style={message.role === 'assistant' ? { 
                background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)` 
              } : undefined}
            >
              {message.role === 'assistant' ? (
                <Sparkles size={14} className="text-white" />
              ) : (
                <User size={14} className={isDark ? 'text-white' : 'text-gray-600'} />
              )}
            </div>
            
            {/* Message Bubble */}
            <div 
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                message.role === 'user'
                  ? ''
                  : isDark ? 'bg-gray-800' : 'bg-gray-100'
              }`}
              style={message.role === 'user' ? { 
                background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)`,
                borderBottomRightRadius: '4px'
              } : { borderBottomLeftRadius: '4px' }}
            >
              <p className={`text-sm whitespace-pre-wrap ${
                message.role === 'user' 
                  ? 'text-white' 
                  : isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {message.content}
              </p>
              <p className={`text-[10px] mt-1 ${
                message.role === 'user' 
                  ? 'text-white/60' 
                  : isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-3"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)` 
                }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <div 
                className={`px-4 py-3 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
                style={{ borderBottomLeftRadius: '4px' }}
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ 
                        backgroundColor: isDark ? '#666' : '#999',
                        opacity: 0.5
                      }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        delay: i * 0.15 
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form 
        onSubmit={handleSubmit}
        className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
      >
        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl ${
          isDark ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Kalpesh..."
            className={`flex-1 bg-transparent border-none outline-none text-sm ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
            }`}
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={`p-2 rounded-xl transition-all ${
              input.trim() && !isTyping ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ 
              background: input.trim() && !isTyping ? `linear-gradient(135deg, ${accentColor}, #FF6B3D)` : undefined,
            }}
          >
            {isTyping ? (
              <Loader2 size={16} className="text-white animate-spin" />
            ) : (
              <Send size={16} className="text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}