"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Lock, RefreshCw, Moon, LogOut } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';

export default function PowerMenu() {
  const { theme, togglePowerMenu, setLocked, setShuttingDown, isShuttingDown } = useOSStore();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  const options = [
    { id: 'lock', icon: Lock, label: 'Lock Screen', color: '#3B82F6' },
    { id: 'restart', icon: RefreshCw, label: 'Restart', color: '#10B981' },
    { id: 'sleep', icon: Moon, label: 'Sleep', color: '#8B5CF6' },
    { id: 'shutdown', icon: LogOut, label: 'Shut Down', color: '#EF4444' },
  ];

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    if (optionId === 'lock') {
      setTimeout(() => {
        setLocked(true);
        togglePowerMenu();
      }, 500);
    } else if (optionId === 'shutdown') {
      setTimeout(() => {
        setShuttingDown(true);
      }, 300);
    } else if (optionId === 'restart') {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isShuttingDown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)` }}>
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 text-lg"
              >
                Shindekalpesharun OS is shutting down...
              </motion.div>
              <motion.div 
                className="mt-8 w-48 h-1 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'linear' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed top-12 right-4 w-64 rounded-2xl shadow-2xl z-[55] overflow-hidden"
        style={{ backgroundColor: isDark ? 'rgba(26, 26, 46, 0.98)' : 'rgba(255, 255, 255, 0.98)', backdropFilter: 'blur(20px)' }}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)` }}>
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <div className="text-white font-medium">Kalpesh Shinde</div>
              <div className="text-gray-500 text-xs">Feel Rich Developer Experience</div>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          {options.map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
              }`}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${option.color}20`, color: option.color }}
              >
                <option.icon size={16} />
              </div>
              <span className={isDark ? 'text-white' : 'text-gray-800'}>{option.label}</span>
            </motion.button>
          ))}
        </div>
        
        <div className={`p-3 text-center text-xs border-t ${isDark ? 'border-white/10 text-gray-500' : 'border-black/10 text-gray-400'}`}>
          Shindekalpesharun OS v1.0
        </div>
      </motion.div>
    </>
  );
}