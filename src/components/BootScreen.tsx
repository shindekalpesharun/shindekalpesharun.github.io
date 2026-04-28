"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

export default function BootScreen() {
  const { booted, setBooted, theme } = useOSStore();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Shindekalpesharun OS...');
  
  useEffect(() => {
    const steps = [
      { progress: 15, status: 'Loading kernel...' },
      { progress: 30, status: 'Initializing system services...' },
      { progress: 45, status: 'Loading desktop environment...' },
      { progress: 60, status: 'Starting COSMIC desktop...' },
      { progress: 75, status: 'Loading applications...' },
      { progress: 90, status: 'Preparing interface...' },
      { progress: 100, status: 'Welcome to Shindekalpesharun OS' },
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 600);
      }
    }, 450);
    
    return () => clearInterval(interval);
  }, [setBooted]);
  
  if (booted) return null;
  
  const isDark = theme === 'dark';
  const accentColor = '#FF4D00';
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-br from-purple-950 via-gray-900 to-black' 
          : 'bg-gradient-to-br from-blue-400 via-blue-300 to-green-300'
      }`}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div 
          className="w-24 h-24 rounded-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)`,
            boxShadow: `0 8px 32px ${accentColor}40`,
          }}
        >
          <span className="text-white text-4xl font-bold">S</span>
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`text-3xl font-bold mb-1 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}
      >
        Shindekalpesharun OS
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`text-sm mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        Version 1.0.0 • Powered by Next.js
      </motion.p>
      
      {/* Loading */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-72"
      >
        <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white/30'}`}>
          <motion.div
            className="h-full rounded-full"
            style={{ 
              background: `linear-gradient(90deg, ${accentColor}, #FF6B3D)`,
              boxShadow: `0 0 10px ${accentColor}`
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className={isDark ? 'text-gray-500 text-xs' : 'text-gray-600 text-xs'}>{status}</span>
          <span className={isDark ? 'text-gray-500 text-xs' : 'text-gray-600 text-xs'}>{progress}%</span>
        </div>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className={`absolute bottom-8 text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}
      >
        © 2024 Shindekalpesharun • Built with React & Next.js
      </motion.p>
    </motion.div>
  );
}