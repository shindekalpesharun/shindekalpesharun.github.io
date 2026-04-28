"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Music, Disc3 } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';
import { useAudioStore, Track } from '@/store/useAudioStore';
import { demoTracks } from '@/data/tracks';

export default function MusicPlayerWindow() {
  const { theme, openWindow } = useOSStore();
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    currentTime, 
    isLooping,
    isShuffled,
    playlist,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    setCurrentTime,
    toggleLoop,
    toggleShuffle,
    playTrack,
  } = useAudioStore();
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [localPlaylist, setLocalPlaylist] = useState<Track[]>(demoTracks);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  const isWide = containerWidth > 550;

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch('https://itunes.apple.com/search?term=lofi&media=music&limit=15');
        const data = await response.json();
        const tracks: Track[] = data.results.map((item: any) => ({
          id: item.trackId.toString(),
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName,
          duration: Math.floor(item.trackTimeMillis / 1000),
          url: item.previewUrl,
          cover: item.artworkUrl100,
        }));
        setLocalPlaylist(tracks);
        useAudioStore.setState({ playlist: tracks });
        if (!currentTrack && tracks.length > 0) {
          playTrack(0);
        }
      } catch (error) {
        console.error('Failed to fetch tracks:', error);
        setLocalPlaylist(demoTracks);
        useAudioStore.setState({ playlist: demoTracks });
      }
    };

    fetchTracks();
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setAudioError(true);
          // Auto-skip to next track on error
          setTimeout(() => {
            setAudioError(false);
            nextTrack();
          }, 2000);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Visualizer bars for music player
  const visualizerBars = useState(Array(20).fill(0).map(() => Math.random() * 100))[0];

  return (
    <div 
      ref={containerRef}
      className={`h-full flex flex-col ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}
    >
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />
      
      {/* Header */}
      <div 
        className="p-4 border-b shrink-0"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <Music size={18} />
          </div>
          <div className="min-w-0">
            <div className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {currentTrack?.title || 'No Track Selected'}
            </div>
            <div className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {currentTrack?.artist || 'Select a track'}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`flex flex-1 min-h-0 ${isWide ? 'flex-row' : 'flex-col'}`}>
        {/* Player Section */}
        <div className={`flex flex-col ${isWide ? 'w-1/2 border-r' : 'shrink-0'}`} 
             style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
          {/* Album Art / Visualizer */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4 min-h-[200px]">
            <motion.div 
              className="relative rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: `${accentColor}20`,
                width: isWide ? '160px' : '140px',
                height: isWide ? '160px' : '140px'
              }}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              <div 
                className="rounded-full flex items-center justify-center overflow-hidden border-4"
                style={{ 
                  backgroundColor: `${accentColor}30`,
                  borderColor: `${accentColor}20`,
                  width: isWide ? '130px' : '110px',
                  height: isWide ? '130px' : '110px'
                }}
              >
                {currentTrack?.cover ? (
                  <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                ) : (
                  <Disc3 size={isWide ? 48 : 40} className="text-white/80" />
                )}
              </div>
            </motion.div>
            
            {/* Bar Visualizer */}
            {isPlaying && !audioError && (
              <div className="flex items-end gap-0.5 h-6">
                {(isWide ? visualizerBars : visualizerBars.slice(0, 15)).map((bar, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                    animate={{ height: [`${bar}%`, `${Math.random() * 100}%`, `${bar}%`] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                  />
                ))}
              </div>
            )}
            
            {audioError && (
              <div className={`text-[10px] px-2 py-1 rounded-lg ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'}`}>
                Track unavailable
              </div>
            )}
          </div>
          
          {/* Controls Section */}
          <div className="p-4 space-y-3 shrink-0">
            {/* Progress Bar */}
            <div>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 rounded-full appearance-none cursor-pointer"
                style={{ 
                  background: `linear-gradient(to right, ${accentColor} ${(currentTime / (duration || 1)) * 100}%, ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'} ${(currentTime / (duration || 1)) * 100}%)` 
                }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: isDark ? '#666' : '#999' }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            {/* Main Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleShuffle}
                  className={`p-1.5 rounded-lg transition-colors ${isShuffled ? '' : isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                  style={{ color: isShuffled ? accentColor : (isDark ? '#666' : '#999') }}
                >
                  <Shuffle size={14} />
                </button>
                <button 
                  onClick={prevTrack}
                  className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                >
                  <SkipBack size={16} className={isDark ? 'text-white' : 'text-gray-800'} />
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: accentColor, boxShadow: `0 8px 16px ${accentColor}30` }}
              >
                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
              </motion.button>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={nextTrack}
                  className={`p-1.5 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                >
                  <SkipForward size={16} className={isDark ? 'text-white' : 'text-gray-800'} />
                </button>
                <button
                  onClick={toggleLoop}
                  className={`p-1.5 rounded-lg transition-colors ${isLooping ? '' : isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
                  style={{ color: isLooping ? accentColor : (isDark ? '#666' : '#999') }}
                >
                  <Repeat size={14} />
                </button>
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                className={isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-gray-800'}
              >
                {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
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
        
        {/* Playlist Section */}
        <div className={`flex flex-col flex-1 min-h-0 ${isDark ? 'bg-black/20' : 'bg-white/20'}`}>
          <div className={`px-4 py-2 text-[10px] font-bold tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            UP NEXT
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {localPlaylist.map((track, index) => (
              <button
                key={track.id}
                onClick={() => playTrack(index)}
                className={`w-full flex items-center gap-3 px-4 py-2 transition-colors group ${
                  currentTrack?.id === track.id ? '' : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
                style={{ 
                  backgroundColor: currentTrack?.id === track.id ? `${accentColor}15` : 'transparent' 
                }}
              >
                <div className="relative w-8 h-8 rounded shrink-0 overflow-hidden bg-gray-800">
                  {track.cover ? (
                    <img src={track.cover} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <Music size={12} className="text-gray-600 m-auto" />
                  )}
                  {currentTrack?.id === track.id && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                      <div className="w-0.5 h-3 bg-white animate-pulse" />
                      <div className="w-0.5 h-2 bg-white animate-pulse" style={{ animationDelay: '150ms' }} />
                      <div className="w-0.5 h-3 bg-white animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className={`text-xs font-medium truncate ${currentTrack?.id === track.id ? '' : (isDark ? 'text-white' : 'text-gray-800')}`}
                       style={{ color: currentTrack?.id === track.id ? accentColor : undefined }}>
                    {track.title}
                  </div>
                  <div className={`text-[10px] truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {track.artist}
                  </div>
                </div>
                <span className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formatTime(track.duration)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}