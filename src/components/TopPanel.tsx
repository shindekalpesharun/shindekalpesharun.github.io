"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Volume2, VolumeX, Bell, Power, 
  Settings, Search, ChevronDown, WifiOff, Heart, Shield
} from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import SearchOverlay from './SearchOverlay';
import NotificationCenter from './NotificationCenter';
import PowerMenu from './PowerMenu';
import HealthIndicator from './HealthIndicator';
import InternetStatus from './InternetStatus';

export default function TopPanel() {
  const { 
    theme, 
    soundEnabled,
    toggleSound,
    openWindows,
    activeWindow,
    minimizeWindow,
    restoreWindow,
    toggleAppDrawer,
    appDrawerOpen,
    toggleNotificationCenter,
    notificationCenterOpen,
    openWindow,
    notifications,
    searchOpen,
    toggleSearch,
    powerMenuOpen,
    togglePowerMenu,
  } = useOSStore();
  
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const getWindowTitle = (id: string) => {
    const titles: Record<string, string> = {
      about: 'About Me',
      skills: 'Skills & Tech',
      projects: 'My Projects',
      services: 'Services',
      resume: 'Resume',
      contact: 'Contact',
      terminal: 'Terminal',
      'ai-agent': 'AI Assistant',
      settings: 'Settings',
      files: 'Files',
      'music-player': 'Music Player',
      'fm-radio': 'FM Radio',
      calendar: 'Calendar',
    };
    return titles[id] || id;
  };

  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  return (
    <>
      <AnimatePresence>
        {searchOpen && <SearchOverlay key="search" />}
        {notificationCenterOpen && <NotificationCenter key="notifications" />}
        {powerMenuOpen && <PowerMenu key="power" />}
      </AnimatePresence>
      
      <motion.div 
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 h-10 flex items-center justify-between px-3 z-50 ${
          isDark 
            ? 'bg-gray-900/90 backdrop-blur-xl' 
            : 'bg-white/90 backdrop-blur-xl'
        }`}
        style={{ 
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="flex items-center gap-1">
          <button
            onClick={toggleAppDrawer}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              appDrawerOpen 
                ? '' 
                : 'hover:bg-white/10'
            }`}
            style={{ 
              backgroundColor: appDrawerOpen ? `${accentColor}20` : 'transparent',
              color: isDark ? '#fff' : '#333'
            }}
          >
            <div 
              className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)` }}
            >
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="text-sm font-medium hidden sm:inline">Activities</span>
            <ChevronDown size={14} className="opacity-60" />
          </button>
          
          <div className="flex items-center gap-1 ml-2">
            {openWindows.slice(0, 5).map((win) => (
              <button
                key={win.id}
                onClick={() => win.isMinimized ? restoreWindow(win.id) : minimizeWindow(win.id)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-all text-xs max-w-[120px] ${
                  activeWindow === win.id && !win.isMinimized
                    ? ''
                    : 'hover:bg-white/10'
                }`}
                style={{ 
                  backgroundColor: activeWindow === win.id && !win.isMinimized ? `${accentColor}20` : 'transparent',
                  color: activeWindow === win.id && !win.isMinimized ? accentColor : (isDark ? '#ccc' : '#666'),
                }}
              >
                <span className="truncate">{getWindowTitle(win.id)}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={toggleSearch}
            className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${isDark ? 'text-white' : 'text-gray-700'}`}
            title="Search (Cmd+K)"
          >
            <Search size={16} />
          </button>
          
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-gray-700'}`}
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          
          <InternetStatus isDark={isDark} accentColor={accentColor} />
          
          <HealthIndicator isDark={isDark} />
          
          <button
            onClick={toggleNotificationCenter}
            className={`p-1.5 rounded-lg transition-colors relative ${
              notificationCenterOpen
                ? ''
                : isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
            }`}
            style={{ 
              backgroundColor: notificationCenterOpen ? `${accentColor}20` : 'transparent',
              color: isDark ? '#fff' : '#333'
            }}
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span 
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white"
                style={{ backgroundColor: accentColor }}
              >
                {unreadCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => openWindow('settings')}
            className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-gray-700'}`}
          >
            <Settings size={16} />
          </button>
          
          <button 
            className={`flex flex-col items-end px-3 py-1 rounded-lg text-xs leading-tight ${
              isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-gray-700'
            }`}
          >
            <span className="font-medium">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span className="opacity-60 text-[10px]">
              {time.toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </button>
          
          <button 
            onClick={togglePowerMenu}
            className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10 text-white' : 'hover:bg-black/10 text-gray-700'}`}
          >
            <Power size={16} />
          </button>
        </div>
      </motion.div>
    </>
  );
}