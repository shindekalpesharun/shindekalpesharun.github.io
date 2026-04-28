"use client";

import { motion } from 'framer-motion';
import { Folder, File, Image, Music, FileText, ArrowLeft, } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'image' | 'music' | 'pdf';
  size?: string;
}

const files: FileItem[] = [
  { id: '1', name: 'Projects', type: 'folder' },
  { id: '2', name: 'Resume.pdf', type: 'pdf', size: '2.4 MB' },
  { id: '3', name: 'Portfolio', type: 'folder' },
  { id: '4', name: 'photo_01.jpg', type: 'image', size: '1.8 MB' },
  { id: '5', name: 'song.mp3', type: 'music', size: '4.2 MB' },
  { id: '6', name: 'README.md', type: 'file', size: '1.2 KB' },
  { id: '7', name: 'Client Work', type: 'folder' },
  { id: '8', name: 'screenshot.png', type: 'image', size: '856 KB' },
];

export default function FilesWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'folder': return <Folder size={18} className="text-blue-400" />;
      case 'file': return <File size={18} className="text-gray-400" />;
      case 'image': return <Image size={18} className="text-green-400" />;
      case 'music': return <Music size={18} className="text-purple-400" />;
      case 'pdf': return <FileText size={18} className="text-red-400" />;
      default: return <File size={18} />;
    }
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
      {/* Toolbar */}
      <div 
        className="p-3 border-b flex items-center gap-3"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        <button className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
          <ArrowLeft size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
        </button>
        <div 
          className="flex-1 px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
        >
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Home / Files</span>
        </div>
      </div>
      
      {/* Files Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-4 gap-3">
          {files.map((file, index) => (
            <motion.button
              key={file.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                {getIcon(file.type)}
              </div>
              <div className="text-center">
                <div className={`text-xs font-medium truncate w-20 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {file.name}
                </div>
                {file.size && (
                  <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {file.size}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Status Bar */}
      <div 
        className={`p-2 text-xs border-t ${isDark ? 'border-white/10 text-gray-500' : 'border-black/10 text-gray-400'}`}
      >
        {files.length} items
      </div>
    </div>
  );
}