"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Signal, SignalLow, SignalMedium, SignalHigh } from 'lucide-react';

interface InternetStatusProps {
  isDark: boolean;
  accentColor: string;
}

export default function InternetStatus({ isDark, accentColor }: InternetStatusProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [signalStrength, setSignalStrength] = useState(4);
  
  const connectionInfo = {
    networkName: 'ShindeNet-5G',
    ipAddress: '192.168.1.' + Math.floor(Math.random() * 200 + 50),
    downloadSpeed: '350 Mbps',
    uploadSpeed: '280 Mbps',
    signalStrength,
  };

  const SignalIcon = signalStrength >= 4 ? SignalHigh : signalStrength >= 3 ? SignalMedium : signalStrength >= 2 ? SignalLow : Signal;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button 
        className={`p-1.5 rounded-lg transition-colors ${
          isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
        }`}
      >
        {isConnected ? (
          <Wifi size={16} className="text-green-400" />
        ) : (
          <WifiOff size={16} className="text-red-400" />
        )}
      </button>
      
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full right-0 mt-2 w-64 rounded-xl shadow-xl z-[60] overflow-hidden"
            style={{ 
              backgroundColor: isDark ? 'rgba(26, 26, 46, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                  <SignalIcon size={20} className="text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {connectionInfo.networkName}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400">
                      Connected
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    IP: {connectionInfo.ipAddress}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Signal Strength</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`w-1.5 rounded-full transition-all ${
                        level <= signalStrength 
                          ? 'bg-green-400' 
                          : isDark ? 'bg-white/20' : 'bg-black/10'
                      }`}
                      style={{ height: `${level * 3 + 4}px` }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Download</div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {connectionInfo.downloadSpeed}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Upload</div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {connectionInfo.uploadSpeed}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-3 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              <button 
                onClick={() => setIsConnected(!isConnected)}
                className="w-full py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
              >
                Disconnect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}