"use client";

import { motion } from 'framer-motion';
import { Download, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { experience, personalInfo } from '@/data/portfolio';
import { useOSStore } from '@/store/useOSStore';

export default function ResumeWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-full overflow-auto p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Resume</h1>
        <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
          style={{ backgroundColor: accentColor }}
        >
          <Download size={14} /> Download PDF
        </a>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className={`flex items-center gap-2 text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Briefcase size={16} /> WORK EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l-2"
                style={{ borderColor: accentColor }}
              >
                <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
                <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{exp.role}</div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{exp.company}</div>
                <div className={`flex items-center gap-1 text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  <Calendar size={12} /> {exp.period}
                </div>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className={`flex items-center gap-2 text-sm font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <GraduationCap size={16} /> EDUCATION
          </h2>
          <div className="relative pl-6 border-l-2" style={{ borderColor: accentColor }}>
            <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
            <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Bachelor of Engineering in IT</div>
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>RMD Sinhgad College of Engineering</div>
            <div className={`flex items-center gap-1 text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              <Calendar size={12} /> 2015 - 2019
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}