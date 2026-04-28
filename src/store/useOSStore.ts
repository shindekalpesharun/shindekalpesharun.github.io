import { create } from 'zustand';
import { WindowId, ThemeMode, WallpaperType, Notification, OpenWindow } from '@/types';

interface OSState {
  booted: boolean;
  isShuttingDown: boolean;
  isLocked: boolean;
  theme: ThemeMode;
  wallpaper: WallpaperType;
  activeWindow: WindowId | null;
  openWindows: OpenWindow[];
  appDrawerOpen: boolean;
  notificationCenterOpen: boolean;
  searchOpen: boolean;
  powerMenuOpen: boolean;
  soundEnabled: boolean;
  animationsEnabled: boolean;
  notifications: Notification[];
  
  setBooted: (booted: boolean) => void;
  setShuttingDown: (isShuttingDown: boolean) => void;
  setLocked: (isLocked: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  setWallpaper: (wallpaper: WallpaperType) => void;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  toggleAppDrawer: () => void;
  toggleNotificationCenter: () => void;
  toggleSearch: () => void;
  togglePowerMenu: () => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
}

let zIndexCounter = 100;

const getDefaultPosition = (id: WindowId): { x: number; y: number } => {
  const positions: Record<WindowId, { x: number; y: number }> = {
    about: { x: 100, y: 80 },
    skills: { x: 150, y: 100 },
    projects: { x: 200, y: 120 },
    services: { x: 250, y: 140 },
    resume: { x: 180, y: 90 },
    contact: { x: 220, y: 110 },
    terminal: { x: 300, y: 150 },
    'ai-agent': { x: 350, y: 100 },
    settings: { x: 400, y: 120 },
    files: { x: 50, y: 50 },
    'music-player': { x: 120, y: 80 },
    'fm-radio': { x: 160, y: 100 },
    calendar: { x: 200, y: 60 },
  };
  return positions[id] || { x: 100, y: 80 };
};

const getDefaultSize = (id: WindowId): { width: number; height: number } => {
  const sizes: Record<WindowId, { width: number; height: number }> = {
    about: { width: 520, height: 420 },
    skills: { width: 600, height: 480 },
    projects: { width: 750, height: 550 },
    services: { width: 580, height: 480 },
    resume: { width: 600, height: 520 },
    contact: { width: 520, height: 480 },
    terminal: { width: 650, height: 420 },
    'ai-agent': { width: 500, height: 600 },
    settings: { width: 550, height: 500 },
    files: { width: 700, height: 500 },
    'music-player': { width: 380, height: 520 },
    'fm-radio': { width: 350, height: 450 },
    calendar: { width: 450, height: 380 },
  };
  return sizes[id] || { width: 520, height: 420 };
};

export const useOSStore = create<OSState>((set, get) => ({
  booted: false,
  isShuttingDown: false,
  isLocked: false,
  theme: 'dark',
  wallpaper: 'cosmic',
  activeWindow: null,
  openWindows: [],
  appDrawerOpen: false,
  notificationCenterOpen: false,
  searchOpen: false,
  powerMenuOpen: false,
  soundEnabled: true,
  animationsEnabled: true,
  notifications: [
    { id: '1', title: 'Welcome to Shindekalpesharun OS', message: 'Feel Rich Developer Experience! Click apps to get started!', time: 'Now', read: false },
    { id: '2', title: 'AI Assistant Ready', message: 'Try asking me about my projects or skills!', time: '2 min ago', read: true },
    { id: '3', title: 'New Project Added', message: 'E-Commerce Android App for Client', time: '5 min ago', read: false },
    { id: '4', title: '5-Star Review', message: 'Freelance Gig Completed Successfully', time: '1 hour ago', read: true },
  ],

  setBooted: (booted) => set({ booted }),
  setShuttingDown: (isShuttingDown) => set({ isShuttingDown }),
  setLocked: (isLocked) => set({ isLocked }),
  setTheme: (theme) => set({ theme }),
  setWallpaper: (wallpaper) => set({ wallpaper }),
  
  openWindow: (id) => {
    const { openWindows, activeWindow } = get();
    const existingWindow = openWindows.find(w => w.id === id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          openWindows: openWindows.map(w => 
            w.id === id ? { ...w, isMinimized: false, zIndex: ++zIndexCounter } : w
          ),
          activeWindow: id,
        });
      } else {
        set({
          openWindows: openWindows.map(w => 
            w.id === id ? { ...w, zIndex: ++zIndexCounter } : w
          ),
          activeWindow: id,
        });
      }
    } else {
      const newWindow: OpenWindow = {
        id,
        zIndex: ++zIndexCounter,
        isMinimized: false,
        isMaximized: false,
        position: getDefaultPosition(id),
        lastPosition: getDefaultPosition(id),
        size: getDefaultSize(id),
        lastSize: getDefaultSize(id),
      };
      set({
        openWindows: [...openWindows, newWindow],
        activeWindow: id,
      });
    }
    set({ appDrawerOpen: false, notificationCenterOpen: false, searchOpen: false, powerMenuOpen: false });
  },
  
  closeWindow: (id) => set((state) => {
    const newWindows = state.openWindows.filter(w => w.id !== id);
    const newActive = state.activeWindow === id 
      ? (newWindows.length > 0 ? newWindows[newWindows.length - 1].id : null)
      : state.activeWindow;
    return { openWindows: newWindows, activeWindow: newActive };
  }),
  
  minimizeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ),
    activeWindow: state.activeWindow === id ? null : state.activeWindow,
  })),
  
  maximizeWindow: (id) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === id 
        ? (w.isMaximized 
            ? { ...w, isMaximized: false, position: w.lastPosition, size: w.lastSize }
            : { ...w, isMaximized: true, lastPosition: w.position, lastSize: w.size, position: { x: 0, y: 40 }, size: { width: typeof window !== 'undefined' ? window.innerWidth : 1200, height: typeof window !== 'undefined' ? window.innerHeight - 80 : 800 } }
          )
        : w
    ),
  })),
  
  restoreWindow: (id) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: ++zIndexCounter } : w
    ),
    activeWindow: id,
  })),
  
  focusWindow: (id) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === id ? { ...w, zIndex: ++zIndexCounter } : w
    ),
    activeWindow: id,
  })),

  updateWindowPosition: (id, position) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === id ? { ...w, position, isMaximized: false } : w
    ),
  })),

  updateWindowSize: (id, size) => set((state) => ({
    openWindows: state.openWindows.map(w => 
      w.id === id ? { ...w, size, isMaximized: false } : w
    ),
  })),
  
  toggleSearch: () => set((state) => ({ 
    searchOpen: !state.searchOpen,
    notificationCenterOpen: false,
    powerMenuOpen: false,
  })),
  
  togglePowerMenu: () => set((state) => ({ 
    powerMenuOpen: !state.powerMenuOpen,
    appDrawerOpen: false,
    notificationCenterOpen: false,
    searchOpen: false,
  })),
  
  toggleAppDrawer: () => set((state) => ({ 
    appDrawerOpen: !state.appDrawerOpen,
    notificationCenterOpen: false,
    searchOpen: false,
    powerMenuOpen: false,
  })),
  
  toggleNotificationCenter: () => set((state) => ({ 
    notificationCenterOpen: !state.notificationCenterOpen,
    appDrawerOpen: false,
    searchOpen: false,
    powerMenuOpen: false,
  })),
  
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  
  toggleAnimations: () => set((state) => ({ animationsEnabled: !state.animationsEnabled })),
  
  addNotification: (notification) => set((state) => ({
    notifications: [
      { ...notification, id: Date.now().toString(), time: 'Now', read: false },
      ...state.notifications,
    ],
  })),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ),
  })),
}));