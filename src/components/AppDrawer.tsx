"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Cpu, Folder, Briefcase, FileText, Mail, 
  Terminal, Bot, Settings, FolderOpen, Search, X, Music, Radio, Calendar as CalendarIcon
} from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { WindowId } from '@/types';

interface AppItem {
  id: WindowId;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  category: 'apps' | 'files' | 'system';
}

const apps: AppItem[] = [
  { id: 'files', name: 'Files', icon: FolderOpen, category: 'files' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, category: 'apps' },
  { id: 'ai-agent', name: 'AI Assistant', icon: Bot, category: 'apps' },
  { id: 'music-player', name: 'Music Player', icon: Music, category: 'apps' },
  { id: 'fm-radio', name: 'FM Radio', icon: Radio, category: 'apps' },
  { id: 'calendar', name: 'Calendar', icon: CalendarIcon, category: 'apps' },
  { id: 'about', name: 'About Me', icon: User, category: 'apps' },
  { id: 'skills', name: 'Skills', icon: Cpu, category: 'apps' },
  { id: 'projects', name: 'Projects', icon: Folder, category: 'apps' },
  { id: 'services', name: 'Services', icon: Briefcase, category: 'apps' },
  { id: 'resume', name: 'Resume', icon: FileText, category: 'apps' },
  { id: 'contact', name: 'Contact', icon: Mail, category: 'apps' },
  { id: 'settings', name: 'Settings', icon: Settings, category: 'system' },
];

export default function AppDrawer() {
  const { appDrawerOpen, toggleAppDrawer, theme, openWindow } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  return (
    <AnimatePresence>
      {appDrawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30"
          onClick={toggleAppDrawer}
        >
          {/* Search Bar */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-lg px-4"
            onClick={e => e.stopPropagation()}
          >
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${
              isDark ? 'bg-gray-800/90 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl'
            }`}
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              <Search size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
              <input 
                type="text" 
                placeholder="Type to search..." 
                className={`flex-1 bg-transparent border-none outline-none text-sm ${
                  isDark ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
                }`}
                autoFocus
              />
              <button onClick={toggleAppDrawer} className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}>
                <X size={18} />
              </button>
            </div>
          </motion.div>

          {/* Apps Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute top-36 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4"
            onClick={e => e.stopPropagation()}
          >
            <div className={`grid grid-cols-5 gap-2 p-4 rounded-2xl ${
              isDark ? 'bg-gray-800/90 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl'
            }`}
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
              {apps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => openWindow(app.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:scale-105 ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${accentColor}15`,
                      color: accentColor
                    }}
                  >
                    <app.icon size={24} />
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {app.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
