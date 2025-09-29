'use client';

import { useState, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyProvider';

const TimeClock = ({ timeZone, label }: { timeZone: string; label: string }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date().toLocaleTimeString('pl-PL', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(newTime);
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

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50 px-4 py-1.5">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-sm">
        
        <div className="flex items-center gap-4 order-2 md:order-1">
          <TimeClock timeZone="Europe/Warsaw" label="PL" />
          <TimeClock timeZone="America/New_York" label="NY (ET)" />
          <TimeClock timeZone="America/Los_Angeles" label="LA (PT)" />
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
    </div>
  );
};

export default TopBar;
