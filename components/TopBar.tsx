'use client';

import { useState, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyProvider';
import { useTopBar } from '@/context/TopBarContext';
import { motion, AnimatePresence } from 'framer-motion';

const TimeClock = ({ timeZone, label }: { timeZone: string; label: string }) => {
  const getInitialTime = () => new Date().toLocaleTimeString('pl-PL', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
  });

  const [time, setTime] = useState(getInitialTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pl-PL', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeZone]);

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium text-slate-500 dark:text-slate-400">{label}:</span>
      <span className="font-bold text-green-500 dark:text-green-400 tabular-nums">{time}</span>
    </div>
  );
};

const TopBar = () => {
  const { rate, isLoading } = useCurrency();
  const { isOpen, setIsOpen } = useTopBar();

  return (
    <div className="relative w-full bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-sm px-4 py-1.5">
              <div className="flex items-center gap-4 order-2 md:order-1">
                <TimeClock timeZone="Europe/Warsaw" label="WAW" />
                <TimeClock timeZone="Europe/London" label="LDN" />
                <TimeClock timeZone="America/New_York" label="NYC" />
                <TimeClock timeZone="America/New_York" label="MIA" />
              </div>

              <div className="flex items-center gap-2 order-1 md:order-2">
                <span className="font-medium text-slate-500 dark:text-slate-400">Kurs USD/PLN:</span>
                {isLoading ? (
                  <div className="h-5 w-16 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
                ) : (
                  <span className="font-bold text-green-500 dark:text-green-400">{rate?.toFixed(4) ?? 'B/D'}</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-12 h-5 bg-slate-200 dark:bg-slate-700/80 border-x border-b border-slate-300 dark:border-slate-600 rounded-b-lg flex items-center justify-center"
        aria-label={isOpen ? 'Ukryj pasek informacyjny' : 'Pokaż pasek informacyjny'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default TopBar;
