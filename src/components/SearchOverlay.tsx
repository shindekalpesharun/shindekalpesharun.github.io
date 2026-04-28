"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Folder, User, Cpu, Briefcase, Mail, Bot, Music, Radio, Calendar, FileText } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { WindowId } from '@/types';

interface SearchResult {
  id: WindowId | 'app';
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function SearchOverlay() {
  const { theme, openWindow, toggleSearch } = useOSStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const results: SearchResult[] = [
    { id: 'about', title: 'About Me', description: 'Learn more about Kalpesh Shinde', icon: <User size={20} />, action: () => openWindow('about') },
    { id: 'skills', title: 'Skills & Technologies', description: 'Explore technical skills and tools', icon: <Cpu size={20} />, action: () => openWindow('skills') },
    { id: 'projects', title: 'My Projects', description: 'View portfolio of completed projects including Android apps', icon: <Folder size={20} />, action: () => openWindow('projects') },
    { id: 'services', title: 'Freelance Services', description: 'Hire me for your next project', icon: <Briefcase size={20} />, action: () => openWindow('services') },
    { id: 'resume', title: 'Resume', description: 'Download or view resume', icon: <FileText size={20} />, action: () => openWindow('resume') },
    { id: 'contact', title: 'Contact Me', description: 'Get in touch for collaborations', icon: <Mail size={20} />, action: () => openWindow('contact') },
    { id: 'ai-agent', title: 'AI Assistant', description: 'Chat with AI about my work', icon: <Bot size={20} />, action: () => openWindow('ai-agent') },
    { id: 'music-player', title: 'Music Player', description: 'Listen to some beats', icon: <Music size={20} />, action: () => openWindow('music-player') },
    { id: 'fm-radio', title: 'FM Radio', description: 'Tune into radio stations', icon: <Radio size={20} />, action: () => openWindow('fm-radio') },
    { id: 'calendar', title: 'Calendar', description: 'View upcoming events', icon: <Calendar size={20} />, action: () => openWindow('calendar') },
  ];
  
  const filteredResults = results.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.description.toLowerCase().includes(query.toLowerCase())
  );
  
  const handleSelect = (result: SearchResult) => {
    result.action();
    toggleSearch();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') toggleSearch();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center pt-20"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={toggleSearch}
    >
      <div 
        className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div 
          className={`flex items-center gap-3 px-4 py-4 ${
            isDark ? 'bg-gray-800/95' : 'bg-white/95'
          }`}
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <Search size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search apps, projects, skills..." 
            className={`flex-1 bg-transparent border-none outline-none text-base ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
            }`}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={toggleSearch} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}>
            <X size={18} />
          </button>
        </div>
        
        <motion.div 
          className={`max-h-96 overflow-y-auto ${isDark ? 'bg-gray-800/90' : 'bg-white/90'}`}
          initial={false}
        >
          {filteredResults.length > 0 ? (
            <div className="p-2">
              {filteredResults.map((result, index) => (
                <motion.button
                  key={result.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(result)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                  >
                    {result.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {result.title}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {result.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : query ? (
            <div className={`p-8 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              No results found for "{query}"
            </div>
          ) : null}
        </motion.div>
        
        <div 
          className={`flex items-center justify-between px-4 py-2 text-xs ${
            isDark ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100/50 text-gray-400'
          }`}
        >
          <div className="flex gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Shindekalpesharun OS</span>
        </div>
      </div>
    </motion.div>
  );
}