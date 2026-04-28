"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, Palette, Wallpaper, Volume2, VolumeX, 
  Sparkles, Monitor, Accessibility, Info, ChevronRight,
  Wifi, Heart, Bot, Cpu, Radio, Music, Settings as SettingsIcon
} from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { useAudioStore } from '@/store/useAudioStore';
import { wallpapers } from '@/data/wallpapers';
import { WallpaperType } from '@/types';

type SettingsTab = 'appearance' | 'sound' | 'system' | 'ai' | 'about';

export default function SettingsWindow() {
  const { 
    theme, 
    setTheme, 
    wallpaper, 
    setWallpaper, 
    soundEnabled, 
    toggleSound,
    animationsEnabled,
    toggleAnimations,
  } = useOSStore();
  
  const { volume, setVolume, isPlaying, togglePlay } = useAudioStore();
  
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  const tabs = [
    { id: 'appearance' as const, icon: Palette, label: 'Appearance' },
    { id: 'sound' as const, icon: Volume2, label: 'Sound' },
    { id: 'system' as const, icon: Monitor, label: 'System' },
    { id: 'ai' as const, icon: Bot, label: 'AI Agent' },
    { id: 'about' as const, icon: Info, label: 'About' },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                THEME
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    theme === 'light' 
                      ? '' 
                      : isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={theme === 'light' ? { borderColor: accentColor, backgroundColor: `${accentColor}10` } : undefined}
                >
                  <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-yellow-500' : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
                  <div className={`text-sm font-medium ${theme === 'light' ? 'text-white' : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>
                    Light
                  </div>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    theme === 'dark' 
                      ? '' 
                      : isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={theme === 'dark' ? { borderColor: accentColor, backgroundColor: `${accentColor}10` } : undefined}
                >
                  <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-blue-400' : (isDark ? 'text-gray-400' : 'text-gray-500')}`} />
                  <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>
                    Dark
                  </div>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                WALLPAPER
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id as WallpaperType)}
                    className={`relative aspect-video rounded-xl overflow-hidden transition-all ${
                      wallpaper === wp.id ? 'ring-2 ring-offset-2' : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ 
                      background: wp.css,
                      border: wallpaper === wp.id ? `2px solid ${accentColor}` : '2px solid transparent',
                      ringColor: accentColor,
                    } as React.CSSProperties}
                    title={wp.name}
                  >
                    <span className="absolute bottom-1 left-1 text-[10px] text-white bg-black/50 px-1 rounded">
                      {wp.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                EFFECTS
              </h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center gap-3">
                    <Sparkles size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                    <div>
                      <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Animations</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Enable window animations</div>
                    </div>
                  </div>
                  <button
                    onClick={toggleAnimations}
                    className={`w-12 h-6 rounded-full transition-all`}
                    style={{ backgroundColor: animationsEnabled ? accentColor : (isDark ? '#4B5563' : '#D1D5DB') }}
                  >
                    <motion.div 
                      className="w-5 h-5 rounded-full bg-white shadow ml-0.5"
                      animate={{ x: animationsEnabled ? 24 : 2 }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'sound':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                MASTER VOLUME
              </h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                  className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}
                >
                  {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                  style={{ 
                    background: `linear-gradient(to right, ${accentColor} ${volume * 100}%, ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} ${volume * 100}%)` 
                  }}
                />
                <span className={`text-sm w-8 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                SYSTEM SOUNDS
              </h3>
              <div className={`flex items-center justify-between p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="flex items-center gap-3">
                  <SettingsIcon size={18} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                  <div>
                    <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>UI Sound Effects</div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Play sounds for system events</div>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-12 h-6 rounded-full transition-all`}
                  style={{ backgroundColor: soundEnabled ? accentColor : (isDark ? '#4B5563' : '#D1D5DB') }}
                >
                  <motion.div 
                    className="w-5 h-5 rounded-full bg-white shadow ml-0.5"
                    animate={{ x: soundEnabled ? 24 : 2 }}
                  />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                MUSIC PLAYER
              </h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Now Playing</span>
                    <button
                      onClick={togglePlay}
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Demo Track - Shindekalpesharun OS
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'system':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                INTERNET SIMULATION
              </h3>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Wifi size={20} className="text-green-400" />
                  <div className="flex-1">
                    <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>ShindeNet-5G</div>
                    <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Connected • 350 Mbps ↓ 280 Mbps ↑</div>
                  </div>
                  <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">Active</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                HEALTH SETTINGS
              </h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Heart size={18} className="text-red-400" fill="#EF4444" />
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Developer Energy</div>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Currently at 94%</div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'ai':
        return (
          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                AI PERSONALITY
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'professional', label: 'Professional', desc: 'Formal and business-like' },
                  { id: 'friendly', label: 'Friendly', desc: 'Casual and approachable' },
                  { id: 'technical', label: 'Technical', desc: 'Focus on code and tech' },
                  { id: 'creative', label: 'Creative', desc: 'Artistic and innovative' },
                ].map((personality) => (
                  <button
                    key={personality.id}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{personality.label}</div>
                    <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{personality.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-2xl font-bold">S</span>
              </motion.div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                Shindekalpesharun OS
              </h2>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Version 1.0.0 (Cosmic)
              </p>
              <p className={`text-xs mt-4 max-w-xs mx-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Feel Rich Developer Experience
                <br />
                Built for Kalpesh Shinde - Full Stack & Android Developer
              </p>
            </div>
            
            <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Next.js 15</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Framework</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>TypeScript</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Language</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Tailwind</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Styling</div>
                </div>
                <div>
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Framer Motion</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Animations</div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-full flex ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar Tabs */}
      <div 
        className={`w-48 border-r p-2 ${isDark ? 'border-white/10' : 'border-black/10'}`}
      >
        <div className="mb-4 px-3 py-2">
          <div className="flex items-center gap-2">
            <SettingsIcon size={18} style={{ color: accentColor }} />
            <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>Settings</span>
          </div>
        </div>
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                activeTab === tab.id
                  ? ''
                  : isDark ? 'hover:bg-white/5 text-gray-400' : 'hover:bg-black/5 text-gray-600'
              }`}
              style={activeTab === tab.id ? { backgroundColor: `${accentColor}15`, color: accentColor } : undefined}
            >
              <tab.icon size={16} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}