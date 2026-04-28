"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';

interface HistoryItem {
  type: 'input' | 'output' | 'error';
  content: string | React.ReactNode;
}

export default function TerminalWindow() {
  const { theme, openWindow } = useOSStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'output', content: 'Welcome to shindekalpesharun OS Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const command = args[0];

    setHistory(prev => [...prev, { type: 'input', content: `guest@shindekalpesharun:~$ ${cmd}` }]);

    switch (command) {
      case 'help':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 my-2">
              <span className="text-blue-400">help</span><span>Show this help message</span>
              <span className="text-blue-400">about</span><span>About the developer</span>
              <span className="text-blue-400">projects</span><span>List featured projects</span>
              <span className="text-blue-400">skills</span><span>Show technical skills</span>
              <span className="text-blue-400">contact</span><span>Contact information</span>
              <span className="text-blue-400">education</span><span>Show educational background</span>
              <span className="text-blue-400">echo [text]</span><span>Print text to the terminal</span>
              <span className="text-blue-400">man [cmd]</span><span>Show manual for a command</span>
              <span className="text-blue-400">clear</span><span>Clear the terminal screen</span>
              <span className="text-blue-400">ls</span><span>List directory contents</span>
              <span className="text-blue-400">theme</span><span>Toggle dark/light theme</span>
              <span className="text-blue-400">gui [app]</span><span>Open a GUI application</span>
              <span className="text-blue-400">whoami</span><span>Display current user info</span>
              <span className="text-blue-400">neofetch</span><span>Show system information</span>
            </div>
          )
        }]);
        break;

      case 'about':
        setHistory(prev => [...prev, { type: 'output', content: 'I am a Full Stack Developer passionate about building beautiful, functional, and user-centric web applications. I love working with React, Next.js, and Node.js.' }]);
        break;

      case 'ls':
        setHistory(prev => [...prev, { type: 'output', content: 'Applications/  Documents/  Projects/  Secret/' }]);
        break;

      case 'projects':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="my-2 space-y-2">
              <div><span className="text-yellow-400 font-bold">1. Skilmex</span> - An advanced education platform.</div>
              <div><span className="text-yellow-400 font-bold">2. OS Portfolio</span> - This browser-based OS environment.</div>
              <div><span className="text-yellow-400 font-bold">3. AI Agent</span> - A specialized coding assistant.</div>
              <div className="text-xs text-gray-500 mt-2">Type "gui projects" to see them in full detail.</div>
            </div>
          )
        }]);
        break;

      case 'skills':
        setHistory(prev => [...prev, { type: 'output', content: 'Frontend: React, Next.js, Tailwind, Framer Motion\nBackend: Node.js, Express, PostgreSQL, Redis\nTools: Docker, Git, Linux, AWS' }]);
        break;

      case 'contact':
        setHistory(prev => [...prev, { type: 'output', content: 'Email: contact@example.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username' }]);
        break;

      case 'education':
        setHistory(prev => [...prev, { type: 'output', content: 'Bachelor of Computer Science\nUniversity of Technology (2018 - 2022)' }]);
        break;

      case 'echo':
        const echoText = args.slice(1).join(' ');
        setHistory(prev => [...prev, { type: 'output', content: echoText || '' }]);
        break;

      case 'man':
        if (!args[1]) {
          setHistory(prev => [...prev, { type: 'error', content: 'What manual page do you want?' }]);
          break;
        }
        const manCmd = args[1].toLowerCase();
        const manuals: Record<string, string> = {
          help: 'NAME\n     help - show available commands\n\nDESCRIPTION\n     The help command displays a list of all commands available in the Antigravity shell.',
          about: 'NAME\n     about - about the developer\n\nDESCRIPTION\n     Displays biographical information about the developer of this OS.',
          projects: 'NAME\n     projects - list featured projects\n\nDESCRIPTION\n     Shows a list of projects. Use "gui projects" for a more visual view.',
          skills: 'NAME\n     skills - show technical skills\n\nDESCRIPTION\n     Lists the technical stack and proficiencies of the developer.',
          contact: 'NAME\n     contact - contact information\n\nDESCRIPTION\n     Provides email, social media, and other contact details.',
          ls: 'NAME\n     ls - list directory contents\n\nDESCRIPTION\n     Lists files and directories in the current working directory.',
          gui: 'NAME\n     gui - open GUI application\n\nSYNOPSIS\n     gui [app_id]\n\nDESCRIPTION\n     Opens the graphical version of the specified application.',
          echo: 'NAME\n     echo - display a line of text\n\nSYNOPSIS\n     echo [string ...]\n\nDESCRIPTION\n     The echo utility writes its arguments to the standard output.',
          man: 'NAME\n     man - format and display the on-line manual pages\n\nSYNOPSIS\n     man [command_name]\n\nDESCRIPTION\n     man formats and displays the on-line manual pages for the specified command.'
        };
        setHistory(prev => [...prev, { type: 'output', content: manuals[manCmd] || `No manual entry for ${manCmd}` }]);
        break;

      case 'secret':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="text-yellow-500 animate-pulse">
              You found the secret! Here is a virtual cookie: 🍪
            </div>
          )
        }]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'whoami':
        setHistory(prev => [...prev, { type: 'output', content: 'guest_user (shindekalpesharun Explorer)' }]);
        break;

      case 'neofetch':
        setHistory(prev => [...prev, {
          type: 'output', content: (
            <div className="flex gap-4 my-2 font-mono">
              <pre className="text-blue-400 text-[10px] leading-none">
                {`       .---.
      /     \\
      | () () |
       \\  ^  /
        |||||
        |||||`}
              </pre>
              <div className="text-xs">
                <div className="text-blue-400 font-bold underline">guest@shindekalpesharun</div>
                <div><span className="text-blue-400">OS:</span> shindekalpesharun WebOS 1.0</div>
                <div><span className="text-blue-400">Host:</span> Browser / Next.js</div>
                <div><span className="text-blue-400">Kernel:</span> React 19.0.0</div>
                <div><span className="text-blue-400">Uptime:</span> 1 hour, 23 mins</div>
                <div><span className="text-blue-400">Shell:</span> shindekalpesharun-sh</div>
                <div><span className="text-blue-400">Resolution:</span> {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}</div>
                <div className="flex gap-1 mt-1">
                  <div className="w-3 h-3 bg-red-500" />
                  <div className="w-3 h-3 bg-green-500" />
                  <div className="w-3 h-3 bg-yellow-500" />
                  <div className="w-3 h-3 bg-blue-500" />
                  <div className="w-3 h-3 bg-magenta-500" />
                </div>
              </div>
            </div>
          )
        }]);
        break;

      case 'gui':
        if (args[1]) {
          const appId = args[1] as any;
          openWindow(appId);
          setHistory(prev => [...prev, { type: 'output', content: `Opening ${appId}...` }]);
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Usage: gui [app_id]' }]);
        }
        break;

      case '':
        break;

      default:
        setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${command}. Type "help" for a list of commands.` }]);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div
      className={`h-full font-mono text-sm overflow-hidden flex flex-col p-4 ${isDark ? 'bg-gray-950 text-green-500' : 'bg-gray-100 text-blue-900'
        }`}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar mb-2" ref={scrollRef}>
        {history.map((item, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${item.type === 'error' ? 'text-red-500' : ''
            }`}>
            {item.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 shrink-0">
        <span className={isDark ? 'text-blue-400' : 'text-blue-700'}>guest@shindekalpesharun:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-inherit font-mono"
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
}
