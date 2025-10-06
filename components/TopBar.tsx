'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCurrency } from '@/context/CurrencyProvider';
import { useTopBar } from '@/context/TopBarContext';
import { motion, AnimatePresence } from 'framer-motion';

const TimeClock = ({ timeZone, label }: { timeZone: string; label: string }) => {
    const getDate = useCallback(() => new Date(new Date().toLocaleString('en-US', { timeZone })), [timeZone]);

    const [date, setDate] = useState(getDate());

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(getDate());
        }, 1000);

        return () => clearInterval(timer);
    }, [getDate]);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    const digitalTime = date.toLocaleTimeString('pl-PL', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 50 50"
                className="w-5 h-5 text-slate-600 dark:text-slate-300"
            >
                <circle cx="25" cy="25" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
                <line
                    x1="25"
                    y1="25"
                    x2="25"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(${hourAngle} 25 25)`}
                />
                <line
                    x1="25"
                    y1="25"
                    x2="25"
                    y2="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    transform={`rotate(${minuteAngle} 25 25)`}
                />
                <line
                    x1="25"
                    y1="25"
                    x2="25"
                    y2="8"
                    stroke="red"
                    strokeWidth="1"
                    strokeLinecap="round"
                    transform={`rotate(${secondAngle} 25 25)`}
                />
            </svg>
            <span className="font-medium text-slate-500 dark:text-slate-400">{label}:</span>
            <span className="font-bold text-green-500 dark:text-green-400 tabular-nums" suppressHydrationWarning>{digitalTime}</span>
        </div>
    );
};

const TopBar = () => {
    const { rate, isLoading } = useCurrency();
    const { isOpen, setIsOpen } = useTopBar();

    return (
        // Klasa "relative" jest tutaj potrzebna dla przycisku poniżej i jest prawidłowa.
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