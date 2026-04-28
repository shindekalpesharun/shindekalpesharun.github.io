"use client";

import { useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';
import Desktop from '@/components/Desktop';
import TopPanel from '@/components/TopPanel';
import Dock from '@/components/Dock';
import BootScreen from '@/components/BootScreen';
import AppDrawer from '@/components/AppDrawer';
import WindowComponent from '@/components/Window';
import AboutWindow from '@/components/windows/AboutWindow';
import SkillsWindow from '@/components/windows/SkillsWindow';
import ProjectsWindow from '@/components/windows/ProjectsWindow';
import ServicesWindow from '@/components/windows/ServicesWindow';
import ResumeWindow from '@/components/windows/ResumeWindow';
import ContactWindow from '@/components/windows/ContactWindow';
import AIAgentWindow from '@/components/windows/AIAgentWindow';
import SettingsWindow from '@/components/windows/SettingsWindow';
import MusicPlayerWindow from '@/components/windows/MusicPlayerWindow';
import FMRadioWindow from '@/components/windows/FMRadioWindow';
import CalendarWindow from '@/components/windows/CalendarWindow';
import FilesWindow from '@/components/windows/FilesWindow';
import TerminalWindow from '@/components/windows/TerminalWindow';
import { User, Cpu, Folder, Briefcase, FileText, Mail, Terminal, Bot, Settings, FolderOpen, Music, Radio, Calendar as CalendarIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const windowConfigs = [
  { id: 'about' as const, title: 'About Me', icon: <User size={16} />, component: <AboutWindow /> },
  { id: 'skills' as const, title: 'Skills & Tech', icon: <Cpu size={16} />, component: <SkillsWindow /> },
  { id: 'projects' as const, title: 'My Projects', icon: <Folder size={16} />, component: <ProjectsWindow /> },
  { id: 'services' as const, title: 'Services', icon: <Briefcase size={16} />, component: <ServicesWindow /> },
  { id: 'resume' as const, title: 'Resume', icon: <FileText size={16} />, component: <ResumeWindow /> },
  { id: 'contact' as const, title: 'Contact Me', icon: <Mail size={16} />, component: <ContactWindow /> },
  { id: 'terminal' as const, title: 'Terminal', icon: <Terminal size={16} />, component: <TerminalWindow /> },
  { id: 'ai-agent' as const, title: 'AI Assistant', icon: <Bot size={16} />, component: <AIAgentWindow /> },
  { id: 'settings' as const, title: 'Settings', icon: <Settings size={16} />, component: <SettingsWindow /> },
  { id: 'files' as const, title: 'Files', icon: <FolderOpen size={16} />, component: <FilesWindow /> },
  { id: 'music-player' as const, title: 'Music Player', icon: <Music size={16} />, component: <MusicPlayerWindow /> },
  { id: 'fm-radio' as const, title: 'FM Radio', icon: <Radio size={16} />, component: <FMRadioWindow /> },
  { id: 'calendar' as const, title: 'Calendar', icon: <CalendarIcon size={16} />, component: <CalendarWindow /> },
];

export default function OS() {
  const { booted, openWindows, toggleSearch, searchOpen } = useOSStore();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (booted) toggleSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [booted, toggleSearch]);
  
  return (
    <div className="h-screen w-screen overflow-hidden">
      <BootScreen />
      <Desktop />
      <AppDrawer />
      
      <AnimatePresence mode="popLayout">
        {booted && windowConfigs.map((config) => {
          const win = openWindows.find(w => w.id === config.id);
          if (!win) return null;
          
          return (
            <WindowComponent
              key={config.id}
              id={config.id}
              title={config.title}
              icon={config.icon}
            >
              {config.component}
            </WindowComponent>
          );
        })}
      </AnimatePresence>
      
      {booted && <TopPanel />}
      {booted && <Dock />}
    </div>
  );
}