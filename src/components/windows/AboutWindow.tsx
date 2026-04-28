"use client";

import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Globe, Link2, Sparkles } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { useOSStore } from '@/store/useOSStore';

export default function AboutWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-full p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="flex flex-col items-center mb-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-28 h-28 rounded-full overflow-hidden border-4 mb-4"
          style={{
            borderColor: accentColor,
            boxShadow: `0 8px 32px ${accentColor}30`,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">K</span>
          </div>
        </motion.div>
        
        <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {personalInfo.name}
        </h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {personalInfo.title}
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 flex items-center gap-2"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
            {personalInfo.availability}
          </span>
        </motion.div>
      </div>
      
      <div className={`flex items-center gap-2 text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <MapPin size={14} />
        <span>{personalInfo.location}</span>
      </div>
      
      <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {personalInfo.bio}
      </p>
      
      <div className="space-y-2">
        <a 
          href={`mailto:${personalInfo.email}`}
          className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
            isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
          }`}
        >
          <Mail size={16} style={{ color: accentColor }} />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{personalInfo.email}</span>
        </a>
        
        <a 
          href={`tel:${personalInfo.phone}`}
          className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${
            isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
          }`}
        >
          <Phone size={16} className="text-green-500" />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{personalInfo.phone}</span>
        </a>
      </div>
      
      <div className="flex gap-2 mt-6">
        {[
          { icon: Globe, href: personalInfo.social.github, label: 'GitHub' },
          { icon: Link2, href: personalInfo.social.linkedin, label: 'LinkedIn' },
          { icon: Sparkles, href: personalInfo.social.twitter, label: 'X' },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl transition-colors ${
              isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
            }`}
          >
            <social.icon size={16} className={isDark ? 'text-white/70' : 'text-gray-600'} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{social.label}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}