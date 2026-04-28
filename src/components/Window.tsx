"use client";

import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { WindowId } from '@/types';
import { useState, useCallback } from 'react';

interface WindowProps {
  id: WindowId;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  minSize?: { width: number; height: number };
}

export default function WindowComponent({
  id,
  title,
  icon,
  children,
  minSize = { width: 350, height: 250 },
}: WindowProps) {
  const { 
    openWindows, 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    theme,
    animationsEnabled,
  } = useOSStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const isActive = useOSStore(state => state.activeWindow === id);
  
  const handleDragStop = useCallback((e: any, data: any) => {
    setIsDragging(false);
    focusWindow(id);
    
    const snapThreshold = 20;
    const maxX = globalThis.innerWidth - 100;
    
    let newX = data.x;
    let newY = data.y;
    
    if (data.x < snapThreshold) newX = 0;
    if (data.x > maxX) newX = maxX;
    if (data.y < snapThreshold) {
      maximizeWindow(id);
      return;
    }

    updateWindowPosition(id, { x: newX, y: newY });
  }, [id, focusWindow, maximizeWindow, updateWindowPosition]);

  const win = openWindows.find(w => w.id === id);
  
  if (!win) return null;
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(id);
  };
  
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(id);
  };
  
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeWindow(id);
  };
  
  const handleFocus = () => {
    focusWindow(id);
  };

  const windowVariants = animationsEnabled ? {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.15 } },
  } : {};
  
  return (
    <Rnd
      position={{ x: win.position.x, y: win.position.y }}
      size={{ width: win.size.width, height: win.size.height }}
      minWidth={minSize.width}
      minHeight={minSize.height}
      maxWidth={typeof window !== 'undefined' ? window.innerWidth : 1920}
      maxHeight={typeof window !== 'undefined' ? window.innerHeight : 1080}
      bounds="parent"
      dragHandleClassName="window-header"
      onDragStart={() => setIsDragging(true)}
      onDragStop={(e, data) => {
        setIsDragging(false);
        handleDragStop(e, data);
      }}
      onResizeStart={() => setIsResizing(true)}
      onResizeStop={(e, direction, ref, delta, position) => {
        setIsResizing(false);
        focusWindow(id);
        updateWindowSize(id, { width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
        updateWindowPosition(id, position);
      }}
      style={{ zIndex: win.zIndex, display: win.isMinimized ? 'none' : 'block' }}
      onMouseDown={handleFocus}
      disableDragging={win.isMaximized}
    >
      <AnimatePresence mode="wait">
        {!win.isMinimized && (
          <motion.div 
            key="window-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={windowVariants as any}
            className={`h-full flex flex-col overflow-hidden rounded-2xl ${
              isDark ? 'bg-gray-900/95' : 'bg-white/95'
            } ${isDragging ? 'scale-[0.99] opacity-90' : ''} ${isResizing ? 'select-none' : ''}`}
            style={{
              backdropFilter: 'blur(20px)',
              boxShadow: isActive 
                ? `0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px ${accentColor}30, ${isDragging ? '0 0 20px ' + accentColor + '40' : ''}`
                : (isDark 
                  ? '0 25px 50px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)' 
                  : '0 25px 50px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.1)'),
            }}
          >
            <div 
              className={`window-header flex items-center justify-between px-4 py-2.5 cursor-grab active:cursor-grabbing rounded-t-2xl select-none ${
                isDragging ? 'opacity-80' : ''
              }`}
              style={{ 
                backgroundColor: isActive 
                  ? (isDark ? `${accentColor}20` : `${accentColor}10`)
                  : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                borderBottom: `1px solid ${isActive ? `${accentColor}30` : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')}`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? '' : 'opacity-60'}>{icon}</span>
                <span 
                  className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}
                  style={{ color: isActive ? accentColor : undefined }}
                >
                  {title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleMinimize}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <Minus size={14} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                </button>
                <button
                  onClick={handleMaximize}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                  }`}
                >
                  <Maximize2 size={12} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                </button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:bg-red-500/80 group"
                  style={{ backgroundColor: isActive && !isDark ? `${accentColor}20` : undefined }}
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            </div>
            
            <div className={`flex-1 overflow-auto ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
              {children}
            </div>
            
            <div 
              className={`flex items-center px-4 py-1.5 text-xs select-none ${
                isDark ? 'bg-gray-800/50 text-gray-500' : 'bg-gray-100/50 text-gray-400'
              }`}
              style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}
            >
              <span className="opacity-60">Ready</span>
              {isDragging && (
                <span className="ml-auto text-[10px]" style={{ color: accentColor }}>
                  Dragging...
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Rnd>
  );
}