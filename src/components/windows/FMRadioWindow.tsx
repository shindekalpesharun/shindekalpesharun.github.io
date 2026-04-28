"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Play, Pause, Volume2, VolumeX, Signal, Disc, Zap } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { useAudioStore } from '@/store/useAudioStore';

export default function FMRadioWindow() {
  const { theme } = useOSStore();
  const { fmStations, activeFMStation, playFMStation, stopFM, isPlaying, setVolume, volume } = useAudioStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [visualizerBars] = useState(Array(20).fill(0).map(() => Math.random() * 100));
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://de1.api.radio-browser.info/json/stations/search?limit=15&tag=lofi,chill&hidebroken=true&order=clickcount&reverse=true');
        const data = await response.json();
        const stations = data.map((item: any) => ({
          id: item.stationuuid,
          name: item.name,
          frequency: item.tags?.split(',')[0] || '101.5 FM',
          genre: item.tags?.split(',').slice(0, 2).join(', ') || 'Chill',
          url: item.url_resolved,
          isPlaying: false
        }));
        useAudioStore.setState({ fmStations: stations });
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    if (audioRef.current && activeFMStation) {
      const station = fmStations.find(s => s.id === activeFMStation);
      if (station && audioRef.current.src !== station.url) {
        audioRef.current.src = station.url;
      }
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [activeFMStation, isPlaying, fmStations]);

  const handleStationSelect = (stationId: string) => {
    setSelectedStation(stationId);
    playFMStation(stationId);
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
      <audio ref={audioRef} onEnded={stopFM} />
      
      {/* Header */}
      <div 
        className="p-4 border-b flex items-center gap-3"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          <Radio size={20} />
        </div>
        <div>
          <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            FM Radio
          </div>
          <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            {fmStations.find(s => s.id === activeFMStation)?.name || 'Select a station'}
          </div>
        </div>
      </div>

      {/* Frequency Display */}
      <div className="p-6 flex-1 flex flex-col items-center justify-center">
        <motion.div 
          className="w-48 h-48 rounded-full flex items-center justify-center relative"
          style={{ backgroundColor: `${accentColor}10` }}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <div 
            className="w-40 h-40 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Disc size={48} className="text-white/80" />
          </div>
          {isPlaying && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {visualizerBars.map((bar, i) => (
                <motion.div
                  key={i}
                  className="absolute bottom-0 w-1 rounded-t"
                  style={{ 
                    left: `${i * 5}%`,
                    backgroundColor: accentColor,
                    height: `${bar}%`,
                  }}
                  animate={{ height: [`${bar}%`, `${Math.random() * 100}%`, `${bar}%`] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Frequency Display */}
        <div className={`mt-6 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {fmStations.find(s => s.id === activeFMStation)?.frequency || '--.-- FM'}
        </div>
        <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          {fmStations.find(s => s.id === activeFMStation)?.genre || 'No station selected'}
        </div>
      </div>

      {/* Station List */}
      <div 
        className="border-t p-4"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        <div className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          STATIONS
        </div>
        <div className="space-y-2">
          {fmStations.map((station) => (
            <motion.button
              key={station.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleStationSelect(station.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeFMStation === station.id
                  ? ''
                  : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
              style={{ 
                backgroundColor: activeFMStation === station.id ? `${accentColor}15` : 'transparent',
                border: activeFMStation === station.id ? `1px solid ${accentColor}30` : '1px solid transparent'
              }}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: activeFMStation === station.id ? `${accentColor}20` : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)') }}
              >
                <Signal size={16} className={activeFMStation === station.id ? 'text-orange-400' : (isDark ? 'text-gray-500' : 'text-gray-400')} />
              </div>
              <div className="flex-1 text-left">
                <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {station.name}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {station.frequency} • {station.genre}
                </div>
              </div>
              {activeFMStation === station.id && isPlaying && (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((bar) => (
                    <motion.div
                      key={bar}
                      className="w-0.5 rounded-full bg-green-400"
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: bar * 0.1 }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Volume Control */}
      <div className="p-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className={isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-800'}
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
            style={{ 
              background: `linear-gradient(to right, ${accentColor} ${volume * 100}%, ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} ${volume * 100}%)` 
            }}
          />
        </div>
      </div>
    </div>
  );
}