"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, FolderOpen, ArrowLeft } from 'lucide-react';
import { projects } from '@/data/portfolio';
import { useOSStore } from '@/store/useOSStore';

type Category = 'All' | 'Android App' | 'Mobile App' | 'Web App';

export default function ProjectsWindow() {
  const { theme } = useOSStore();
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories: Category[] = ['All', 'Android App', 'Mobile App', 'Web App'];
  const filteredProjects = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Category Tabs */}
      <div className={`flex gap-2 p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedProject(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeCategory === cat ? '' : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
              }`}
            style={activeCategory === cat ? { backgroundColor: accentColor, color: 'white' } : { color: isDark ? '#888' : '#666' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightboxImage}
              alt="Full size project"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects */}
      <div className="flex-1 overflow-auto p-4">
        {selectedProject ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => setSelectedProject(null)}
              className={`flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg text-sm transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'
                }`}
            >
              <ArrowLeft size={14} /> Back to Gallery
            </button>

            <div className="flex flex-col gap-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                    {selectedProject.category}
                  </span>
                  {selectedProject.tech.map((tech) => (
                    <span key={tech} className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {selectedProject.description}
                </p>
              </div>

              {selectedProject.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.images.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group"
                      onClick={() => setLightboxImage(img)}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, #FF6B3D)`,
                    boxShadow: `0 8px 20px ${accentColor}40`
                  }}
                >
                  <ExternalLink size={16} /> Live Project
                </a>
                <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Globe size={16} /> View Source
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className={`relative group rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ${isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
                  }`}
              >
                <div className="aspect-video overflow-hidden">
                  {project.images[0] ? (
                    <img src={project.images[0]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
                      <FolderOpen size={40} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className={`font-bold text-sm mb-1 group-hover:text-orange-500 transition-colors ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {project.title}
                  </h3>
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {project.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}