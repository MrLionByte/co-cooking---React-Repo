import React, { useState, useEffect } from 'react';
import { Clock,X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';


const Stopwatch: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isRunning) {
      interval = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => {
      if (interval !== null) {
        window.clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 
                 bg-[#0c0f0d]/95 backdrop-blur-md border-b border-indigo-400/60 text-white shadow-2xl"
    >
      <div className="flex items-center gap-3">
        <Clock className="text-indigo-400" size={24} />
        <span className="text-2xl font-mono tracking-wide">{formatTime(seconds)}</span>
      </div>

      <div className="flex gap-3">
        <Button
          size="sm"
          className={`px-4 font-semibold cursor-pointer ${isRunning ? 'bg-rose-600 hover:bg-rose-700' : 'bg-indigo-500 hover:bg-indigo-400'} text-gray-900`}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-slate-400/70 cursor-pointer"
          onClick={() => setSeconds(0)}
        >
          Reset
        </Button>
      </div>

      <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-white transition-colors">
        <X size={20} />
      </button>
    </motion.div>
  );
};

export default Stopwatch;