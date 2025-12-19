
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      const d = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
      setDays(d);
    };

    calculateDays();
    const timer = setInterval(calculateDays, 3600000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="relative glass rounded-[2.5rem] px-16 py-10 text-center group">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-200/20 via-transparent to-pink-200/20 rounded-[2.6rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="relative z-10 space-y-4">
        <span className="block text-[#8c766d] font-mono text-[11px] uppercase tracking-[0.4em] opacity-60">Le temps nous sépare encore de</span>
        <div className="flex items-baseline justify-center space-x-2">
          <span className="text-6xl md:text-8xl font-serif italic font-bold text-[#4a3a35] tracking-tighter">{days}</span>
          <span className="text-2xl md:text-3xl font-romantic text-pink-400">jours</span>
        </div>
        <div className="w-12 h-[1px] bg-pink-200 mx-auto opacity-30"></div>
        <span className="block text-[#8c766d] font-serif italic text-lg">Avant de pouvoir t'embrasser</span>
      </div>
    </div>
  );
};

export default Countdown;
