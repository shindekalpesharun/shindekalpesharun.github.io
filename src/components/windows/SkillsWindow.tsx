"use client";

import { motion } from 'framer-motion';
import { Cpu, Database, Wrench, Globe } from 'lucide-react';
import { skills } from '@/data/portfolio';
import { useOSStore } from '@/store/useOSStore';

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'Mobile Development': Cpu,
  'Frontend': Globe,
  'Backend': Database,
  'Tools & DevOps': Wrench,
};

export default function SkillsWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  return (
    <div className={`h-full overflow-auto p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Skills & Technologies
      </h1>
      
      <div className="space-y-6">
        {skills.map((category, catIndex) => {
          const Icon = categoryIcons[category.category] || Cpu;
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={16} className={isDark ? 'text-white' : 'text-gray-700'} />
                <h2 className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {category.category}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    className={`p-3 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img src={skill.icon} alt={skill.name} className="w-5 h-5 rounded" />
                      <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {skill.name}
                      </span>
                    </div>
                    <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: accentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}