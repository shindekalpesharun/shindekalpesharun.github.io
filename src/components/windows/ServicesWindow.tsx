"use client";

import { motion } from 'framer-motion';
import { Check, Star, Sparkles } from 'lucide-react';
import { services } from '@/data/portfolio';
import { useOSStore } from '@/store/useOSStore';

export default function ServicesWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-full overflow-auto p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <h1 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Freelance Services
      </h1>
      
      <div className="grid gap-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-5 rounded-2xl transition-all hover:scale-[1.01] ${
              service.popular 
                ? '' 
                : isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
            }`}
            style={service.popular ? { 
              background: `linear-gradient(135deg, ${accentColor}15, ${accentColor}05)`,
              border: `1px solid ${accentColor}30`
            } : undefined}
          >
            {service.popular && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <Star size={10} fill="white" /> MOST POPULAR
              </div>
            )}
            
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {service.name}
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {service.description}
                </p>
              </div>
              <div>
                <span className="text-2xl font-bold" style={{ color: accentColor }}>
                  {service.price}
                </span>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    service.popular ? 'bg-orange-500' : (isDark ? 'bg-gray-700' : 'bg-gray-200')
                  }`}>
                    <Check size={10} className="text-white" />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            
            <button
              className="w-full py-2.5 rounded-xl font-medium transition-all hover:opacity-90"
              style={service.popular ? { 
                background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)`,
                color: 'white'
              } : { 
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                color: isDark ? 'white' : 'gray-800'
              }}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}