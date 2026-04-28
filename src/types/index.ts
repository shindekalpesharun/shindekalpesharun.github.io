export type WindowId =
  | 'about'
  | 'skills'
  | 'projects'
  | 'services'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'ai-agent'
  | 'settings'
  | 'files'
  | 'music-player'
  | 'fm-radio'
  | 'calendar';

export interface OpenWindow {
  id: WindowId;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  lastPosition: { x: number; y: number };
  size: { width: number; height: number };
  lastSize: { width: number; height: number };
}

export type ThemeMode = 'dark' | 'light';

export type WallpaperType = 'cosmic' | 'aurora' | 'gradient' | 'minimal' | 'abstract';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface AppItem {
  id: WindowId;
  name: string;
  icon: string;
  category: 'apps' | 'files' | 'system';
}

export interface OSState {
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
  setShuttingDown: (shuttingDown: boolean) => void;
  setLocked: (locked: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  setWallpaper: (wallpaper: WallpaperType) => void;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateWindowSize: (id: WindowId, size: { width: number; height: number }) => void;
  toggleAppDrawer: () => void;
  toggleNotificationCenter: () => void;
  toggleSearch: () => void;
  togglePowerMenu: () => void;
  toggleSound: () => void;
  toggleAnimations: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'time' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
}