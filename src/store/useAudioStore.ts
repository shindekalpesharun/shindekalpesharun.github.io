import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  cover?: string;
}

interface AudioState {
  currentTrack: Track | null;
  playlist: Track[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  isLooping: boolean;
  isShuffled: boolean;
  fmStations: { id: string; name: string; frequency: string; genre: string; url: string; isPlaying: boolean }[];
  activeFMStation: string | null;
  
  setCurrentTrack: (track: Track) => void;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playFMStation: (stationId: string) => void;
  stopFM: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  playlist: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  isLooping: false,
  isShuffled: false,
  fmStations: [
    { id: '1', name: 'Lofi Dreams', frequency: '98.7 FM', genre: 'Lofi Hip Hop', url: 'https://stream.zeno.fm/0r0xa792kwzuv', isPlaying: false },
    { id: '2', name: 'Chill Vibes', frequency: '101.5 FM', genre: 'Chillout', url: 'https://stream.zeno.fm/f3wvbbqmd44uv', isPlaying: false },
    { id: '3', name: 'Neon Waves', frequency: '105.3 FM', genre: 'Synthwave', url: 'https://stream.zeno.fm/gecv4yeefm0uv', isPlaying: false },
  ],
  activeFMStation: null,
  
  setCurrentTrack: (track) => set({ currentTrack: track }),
  playTrack: (index) => {
    const { playlist } = get();
    if (playlist[index]) {
      set({ currentTrack: playlist[index], currentIndex: index, isPlaying: true });
    }
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  nextTrack: () => {
    const { playlist, currentIndex, isLooping } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex < playlist.length) {
      set({ currentTrack: playlist[nextIndex], currentIndex: nextIndex });
    } else if (isLooping) {
      set({ currentTrack: playlist[0], currentIndex: 0 });
    }
  },
  prevTrack: () => {
    const { playlist, currentIndex } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      set({ currentTrack: playlist[prevIndex], currentIndex: prevIndex });
    } else {
      set({ currentTrack: playlist[playlist.length - 1], currentIndex: playlist.length - 1 });
    }
  },
  setVolume: (volume) => set({ volume }),
  setCurrentTime: (time) => set({ currentTime: time }),
  toggleLoop: () => set((state) => ({ isLooping: !state.isLooping })),
  toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
  playFMStation: (stationId) => {
    const { fmStations } = get();
    set({
      fmStations: fmStations.map(s => ({ ...s, isPlaying: s.id === stationId })),
      activeFMStation: stationId,
      isPlaying: true,
    });
  },
  stopFM: () => {
    const { fmStations } = get();
    set({
      fmStations: fmStations.map(s => ({ ...s, isPlaying: false })),
      activeFMStation: null,
      isPlaying: false,
    });
  },
}));