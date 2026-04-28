"use client";

import { motion } from 'framer-motion';
import { FolderOpen, FileText, Mail, Music, Radio, Calendar } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { WindowId } from '@/types';

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

function DesktopIcon({ id, label, icon: Icon }: DesktopIconProps) {
  const { openWindow, theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  return (
    <motion.button
      whileHover={{ scale: 1.02, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
      whileTap={{ scale: 0.98 }}
      onDoubleClick={() => openWindow(id)}
      onClick={() => openWindow(id)}
      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors w-20`}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
          boxShadow: `0 4px 12px ${accentColor}30`,
        }}
      >
        <Icon size={24} className={isDark ? 'text-white' : 'text-gray-800'} />
      </div>
      <span 
        className={`text-xs text-center leading-tight px-1 rounded ${
          isDark 
            ? 'text-white/90 bg-black/30' 
            : 'text-gray-800 bg-white/50'
        }`}
        style={{ 
          textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
          backdropFilter: 'blur(4px)',
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

export default function Desktop() {
  const { theme, openWindow } = useOSStore();
  const isDark = theme === 'dark';
  
  const getBackgroundClass = () => {
    const wallpapers: Record<string, string> = {
      cosmic: 'from-purple-950 via-indigo-950 to-black',
      aurora: 'from-green-900 via-teal-900 to-blue-900',
      gradient: 'from-orange-900 via-pink-900 to-purple-900',
      minimal: 'from-gray-950 via-gray-900 to-gray-950',
      abstract: 'from-pink-900 via-purple-900 to-blue-900',
    };
    return wallpapers[isDark ? 'cosmic' : 'aurora'];
  };

  const desktopIcons: DesktopIconProps[] = [
    { id: 'files', label: 'Files', icon: FolderOpen },
    { id: 'music-player', label: 'Music', icon: Music },
    { id: 'fm-radio', label: 'FM Radio', icon: Radio },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundClass()} overflow-hidden`}>
      {/* Animated background effects */}
      {isDark && (
        <>
          {/* Floating orbs */}
          <motion.div 
            animate={{ 
              x: [0, 50, 0], 
              y: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-20"
            style={{ 
              background: 'radial-gradient(circle, #FF4D00 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
          <motion.div 
            animate={{ 
              x: [0, -30, 0], 
              y: [0, 50, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-40 right-20 w-80 h-80 rounded-full opacity-15"
            style={{ 
              background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
              filter: 'blur(50px)'
            }}
          />
          
          {/* Subtle grid */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </>
      )}
      
      {/* Desktop Icons */}
      <div className="absolute top-16 left-4 flex flex-col gap-2">
        {desktopIcons.map((icon) => (
          <DesktopIcon 
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
          />
        ))}
        
        {/* Recycle Bin */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}
          whileTap={{ scale: 0.98 }}
          className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors w-20`}
        >
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            }}
          >
            <FolderOpen size={24} className={isDark ? 'text-white/40' : 'text-gray-400'} />
          </div>
          <span 
            className={`text-xs text-center leading-tight px-1 rounded ${
              isDark 
                ? 'text-white/70 bg-black/30' 
                : 'text-gray-600 bg-white/50'
            }`}
          >
            Trash
          </span>
        </motion.button>
      </div>
    </div>
  );
}