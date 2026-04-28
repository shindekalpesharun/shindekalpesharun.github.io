"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shield, Coffee, Code, Zap } from 'lucide-react';

interface HealthIndicatorProps {
  isDark: boolean;
}

export default function HealthIndicator({ isDark }: HealthIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  const healthStats = {
    systemHealth: 98,
    developerEnergy: 94,
    coffeeConsumed: Math.floor(Math.random() * 5) + 3,
    codeLinesToday: Math.floor(Math.random() * 500) + 200,
    bugsFixed: Math.floor(Math.random() * 20) + 5,
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button 
        className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 ${
          isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
        }`}
      >
        <Heart size={16} className="text-red-400" fill="#EF4444" />
        <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {healthStats.developerEnergy}%
        </span>
      </button>
      
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full right-0 mt-2 w-56 rounded-xl shadow-xl z-[60] overflow-hidden"
            style={{ 
              backgroundColor: isDark ? 'rgba(26, 26, 46, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="p-3 border-b border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-green-400" />
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Developer Health
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${healthStats.systemHealth}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
                <span className="text-xs font-medium text-green-400">{healthStats.systemHealth}%</span>
              </div>
            </div>
            
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-3">
                <Coffee size={14} className="text-amber-400" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Coffee consumed</span>
                <span className={`ml-auto font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {healthStats.coffeeConsumed} cups
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Code size={14} className="text-blue-400" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Lines of code today</span>
                <span className={`ml-auto font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {healthStats.codeLinesToday.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Zap size={14} className="text-green-400" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Bugs fixed</span>
                <span className={`ml-auto font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {healthStats.bugsFixed}
                </span>
              </div>
            </div>
            
            <div className={`p-2 text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Updated just now
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}