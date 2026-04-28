"use client";

import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  User, Cpu, Folder, Briefcase, FileText, Mail, 
  Terminal, Bot, Settings, FolderOpen, Music, Radio, Calendar as CalendarIcon
} from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { WindowId } from '@/types';

interface DockApp {
  id: WindowId;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const dockApps: DockApp[] = [
  { id: 'music-player', name: 'Music', icon: Music },
  { id: 'fm-radio', name: 'FM Radio', icon: Radio },
  { id: 'calendar', name: 'Calendar', icon: CalendarIcon },
  { id: 'files', name: 'Files', icon: FolderOpen },
  { id: 'terminal', name: 'Terminal', icon: Terminal },
  { id: 'ai-agent', name: 'AI Agent', icon: Bot },
  { id: 'about', name: 'About', icon: User },
  { id: 'skills', name: 'Skills', icon: Cpu },
  { id: 'projects', name: 'Projects', icon: Folder },
  { id: 'services', name: 'Services', icon: Briefcase },
  { id: 'resume', name: 'Resume', icon: FileText },
  { id: 'contact', name: 'Contact', icon: Mail },
  { id: 'settings', name: 'Settings', icon: Settings },
];

function DockIcon({ app, isActive, isDark, accentColor, mouseX }: { 
  app: DockApp; 
  isActive: boolean; 
  isDark: boolean;
  accentColor: string;
  mouseX: any;
}) {
  const { openWindow } = useOSStore();
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const width = useSpring(useTransform(distance, [-150, 0, 150], [48, 72, 48]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const height = useSpring(useTransform(distance, [-150, 0, 150], [48, 72, 48]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width, height }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`absolute -top-12 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap z-50 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
            style={{ 
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
            }}
          >
            {app.name}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Dock Icon */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => openWindow(app.id)}
        className={`relative w-full h-full rounded-xl flex items-center justify-center transition-all ${
          isActive ? 'ring-2' : ''
        }`}
        style={{ 
          backgroundColor: isActive 
            ? `${accentColor}25` 
            : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.85)'),
          color: isActive ? accentColor : (isDark ? '#fff' : '#333'),
          backdropFilter: 'blur(12px)',
          boxShadow: isActive 
            ? `0 0 25px ${accentColor}50` 
            : (isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.15)'),
          border: isActive ? `2px solid ${accentColor}` : '2px solid transparent',
        }}
      >
        <app.icon size={24} className={isActive ? '' : (isDark ? 'text-white/95' : 'text-gray-700')} />
        
        {/* Active dot */}
        {isActive && (
          <motion.div
            layoutId="active-dot"
            className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}

export default function Dock() {
  const { theme, openWindows, activeWindow } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div 
        className={`flex items-end gap-2 px-4 py-3 rounded-3xl ${
          isDark 
            ? 'bg-gray-900/80 backdrop-blur-2xl' 
            : 'bg-white/80 backdrop-blur-2xl'
        }`}
        style={{ 
          boxShadow: isDark 
            ? '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)' 
            : '0 12px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
        }}
      >
        {dockApps.map((app) => (
          <DockIcon 
            key={app.id}
            app={app}
            isActive={activeWindow === app.id || openWindows.some(w => w.id === app.id)}
            isDark={isDark}
            accentColor={accentColor}
            mouseX={mouseX}
          />
        ))}
      </div>
    </motion.div>
  );
}