"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Briefcase } from 'lucide-react';
import { useOSStore } from '@/store/useOSStore';

interface CalendarEvent {
  date: string;
  title: string;
  type: 'deadline' | 'launch' | 'meeting' | 'milestone';
}

const events: CalendarEvent[] = [
  { date: '2026-04-30', title: 'Freelance Deadline', type: 'deadline' },
  { date: '2026-04-28', title: 'Portfolio Launch', type: 'launch' },
  { date: '2026-05-05', title: 'Client Meeting', type: 'meeting' },
  { date: '2026-05-15', title: 'Project Milestone', type: 'milestone' },
  { date: '2026-04-25', title: 'Code Review', type: 'meeting' },
];

export default function CalendarWindow() {
  const { theme } = useOSStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const isDark = theme === 'dark';
  const accentColor = isDark ? '#FF4D00' : '#E55039';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };
  
  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };
  
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'deadline': return 'bg-red-500';
      case 'launch': return 'bg-green-500';
      case 'meeting': return 'bg-blue-500';
      case 'milestone': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`h-full flex ${isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'}`}>
      {/* Calendar Grid */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigateMonth(-1)}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
          >
            <ChevronLeft size={20} className={isDark ? 'text-white' : 'text-gray-800'} />
          </button>
          <div className="flex items-center gap-2">
            <CalendarIcon size={18} style={{ color: accentColor }} />
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {monthNames[month]} {year}
            </span>
          </div>
          <button 
            onClick={() => navigateMonth(1)}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
          >
            <ChevronRight size={20} className={isDark ? 'text-white' : 'text-gray-800'} />
          </button>
        </div>
        
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className={`text-center text-xs font-medium py-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array(firstDayOfMonth).fill(null).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const dateEvents = getEventsForDate(day);
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            
            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedDate(dateStr)}
                className={`relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${
                  isToday ? '' : isSelected ? (isDark ? 'bg-white/10' : 'bg-black/5') : ''
                }`}
                style={{ 
                  backgroundColor: isToday ? `${accentColor}20` : (isSelected ? undefined : 'transparent'),
                  border: isToday ? `2px solid ${accentColor}` : '2px solid transparent'
                }}
              >
                <span className={`text-sm ${
                  isToday ? 'font-bold' : ''
                } ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {day}
                </span>
                {dateEvents.length > 0 && (
                  <div className="absolute bottom-1 flex gap-0.5">
                    {dateEvents.map((event, idx) => (
                      <div 
                        key={idx}
                        className={`w-1 h-1 rounded-full ${getEventTypeColor(event.type)}`}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Mini Agenda Sidebar */}
      <div 
        className={`w-64 border-l p-4 overflow-y-auto ${isDark ? 'border-white/10' : 'border-black/10'}`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} style={{ color: accentColor }} />
          <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Upcoming Events
          </span>
        </div>
        
        <div className="space-y-3">
          {events
            .filter(e => new Date(e.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((event, index) => (
              <motion.div
                key={event.date}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-black/5'}`}
              >
                <div className="flex items-start gap-2">
                  <div 
                    className={`w-2 h-2 rounded-full mt-1.5 ${getEventTypeColor(event.type)}`}
                  />
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {event.title}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
        
        {selectedDate && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <div className={`text-xs font-medium mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              EVENTS ON {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </div>
            {getEventsForDate(new Date(selectedDate).getDate()).length > 0 ? (
              getEventsForDate(new Date(selectedDate).getDate()).map((event, idx) => (
                <div key={idx} className={`p-2 rounded-lg mb-2 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className={`text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>{event.title}</div>
                  <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{event.type}</div>
                </div>
              ))
            ) : (
              <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No events</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}