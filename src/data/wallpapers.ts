export interface WallpaperOption {
  id: string;
  name: string;
  type: 'cosmic' | 'aurora' | 'gradient' | 'minimal' | 'abstract';
  colors: string[];
  css: string;
}

export const wallpapers: WallpaperOption[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Dark',
    type: 'cosmic',
    colors: ['#0a0a0f', '#1a1a2e', '#FF4D00'],
    css: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    type: 'aurora',
    colors: ['#0f0c29', '#302b63', '#24243e'],
    css: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
  },
  {
    id: 'gradient',
    name: 'Sunset Glow',
    type: 'gradient',
    colors: ['#ff4d00', '#ff9933', '#1a1a2e'],
    css: 'linear-gradient(135deg, #1a1a2e 0%, #ff4d00 50%, #ff9933 100%)',
  },
  {
    id: 'minimal',
    name: 'Minimal Dark',
    type: 'minimal',
    colors: ['#000000', '#111111', '#222222'],
    css: 'linear-gradient(180deg, #000000 0%, #111111 50%, #0a0a0f 100%)',
  },
  {
    id: 'abstract',
    name: 'Abstract Neon',
    type: 'abstract',
    colors: ['#0d0d0d', '#FF4D00', '#00ff88'],
    css: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 25%, #0d0d0d 50%, #FF4D00 75%, #0d0d0d 100%)',
  },
];