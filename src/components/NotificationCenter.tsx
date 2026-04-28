"use client";

import { motion } from 'framer-motion';
import { Bell, X, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';

export default function NotificationCenter() {
  const { theme, notifications, toggleNotificationCenter, markNotificationRead, addNotification, openWindow } = useOSStore();
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  const getIcon = (title: string) => {
    if (title.includes('Project') || title.includes('Added')) return <Sparkles size={16} className="text-orange-400" />;
    if (title.includes('Review') || title.includes('Star')) return <CheckCircle size={16} className="text-green-400" />;
    if (title.includes('Ready') || title.includes('Assistant')) return <Bell size={16} className="text-blue-400" />;
    return <Bell size={16} className="text-gray-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-12 right-4 w-80 rounded-2xl shadow-2xl z-[55] overflow-hidden"
      style={{ backgroundColor: isDark ? 'rgba(26, 26, 46, 0.98)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(20px)' }}
    >
      <div 
        className={`flex items-center justify-between px-4 py-3 border-b ${
          isDark ? 'border-white/10' : 'border-black/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <Bell size={16} style={{ color: accentColor }} />
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Notifications</span>
        </div>
        <button 
          onClick={toggleNotificationCenter}
          className={`p-1 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
        >
          <X size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`px-4 py-3 border-b cursor-pointer transition-all ${
                isDark 
                  ? 'border-white/5 hover:bg-white/5' 
                  : 'border-black/5 hover:bg-black/5'
              } ${notification.read ? 'opacity-60' : ''}`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(notification.title)}</div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {notification.title}
                  </div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {notification.message}
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <Clock size={10} />
                    <span>{notification.time}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className={`p-8 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            No notifications
          </div>
        )}
      </div>
      
      <div 
        className={`px-4 py-2 text-center text-xs border-t cursor-pointer ${
          isDark 
            ? 'border-white/10 text-gray-500 hover:bg-white/5' 
            : 'border-black/10 text-gray-400 hover:bg-black/5'
        }`}
      >
        Clear all notifications
      </div>
    </motion.div>
  );
}