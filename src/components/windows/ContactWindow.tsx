"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Globe, Link2, MessageCircle, CheckCircle } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { useOSStore } from '@/store/useOSStore';

export default function ContactWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`h-full overflow-auto p-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <h1 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Contact Me</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-2xl text-center ${isDark ? 'bg-green-900/20' : 'bg-green-100'}`}
            >
              <CheckCircle size={40} className="mx-auto mb-3 text-green-500" />
              <h2 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Message Sent!</h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>I&apos;ll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-3 py-2 rounded-xl text-sm ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-800'
                  } border focus:outline-none focus:border-orange-500`} placeholder="Your name" />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-3 py-2 rounded-xl text-sm ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-800'
                  } border focus:outline-none focus:border-orange-500`} placeholder="your@email.com" />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Subject</label>
                <input type="text" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
                  className={`w-full px-3 py-2 rounded-xl text-sm ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-800'
                  } border focus:outline-none focus:border-orange-500`} placeholder="Project inquiry" />
              </div>
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Message</label>
                <textarea required rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-3 py-2 rounded-xl text-sm ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-100 border-gray-200 text-gray-800'
                  } border focus:outline-none focus:border-orange-500`} placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                style={{ backgroundColor: accentColor }}>
                <Send size={14} /> Send Message
              </button>
            </form>
          )}
        </div>
        
        <div className="space-y-3">
          {[
            { icon: Mail, label: 'Email', value: personalInfo.email, color: 'blue' },
            { icon: Phone, label: 'Phone', value: personalInfo.phone, color: 'green' },
            { icon: MapPin, label: 'Location', value: personalInfo.location, color: 'red' },
          ].map((item) => (
            <div key={item.label} className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <item.icon size={16} className={item.color === 'blue' ? 'text-blue-500' : item.color === 'green' ? 'text-green-500' : 'text-red-500'} />
                <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</span>
              </div>
              <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.value}</p>
            </div>
          ))}
          
          <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
            <p className={`text-xs font-medium mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Connect with me</p>
            <div className="flex gap-2">
              {[
                { icon: Globe, href: personalInfo.social.github, label: 'GitHub' },
                { icon: Link2, href: personalInfo.social.linkedin, label: 'LinkedIn' },
                { icon: MessageCircle, href: personalInfo.social.whatsapp, label: 'WhatsApp' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg text-xs ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}>
                  <social.icon size={14} className={isDark ? 'text-white/70' : 'text-gray-600'} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}