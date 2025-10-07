'use client';

import { useState, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyProvider';

const TimeClock = ({ timeZone, label }: { timeZone: string; label: string }) => {
    // Stan dla poszczególnych części czasu, aby uniknąć problemów z obiektem Date
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            // Używamy Intl.DateTimeFormat do pewnego pobrania czasu w danej strefie
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone,
                hour12: false, // Kluczowe dla uzyskania formatu 24h do obliczeń
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
            });

            const parts = formatter.formatToParts(now);
            const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
            const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
            const seconds = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
            
            setTime({ hours, minutes, seconds });
        };

        updateClock(); // Uruchom od razu przy montowaniu
        const timer = setInterval(updateClock, 1000);

        return () => clearInterval(timer);
    }, [timeZone]);

    // Obliczenia kątów dla wskazówek zegara analogowego
    const hourAngle = (time.hours % 12) * 30 + time.minutes * 0.5;
    const minuteAngle = time.minutes * 6;
    const secondAngle = time.seconds * 6;

    // Formatowanie czasu cyfrowego z zerami wiodącymi
    const digitalTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`;

    return (
        // Zmniejszono odstęp wewnętrzny dla lepszego dopasowania na mobile
        <div className="flex items-center gap-1.5 whitespace-nowrap">
            <svg
                viewBox="0 0 50 50"
                // Zegar jest teraz mniejszy na mobile i rośnie na większych ekranach
                className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-slate-300 flex-shrink-0"
            >
                <circle cx="25" cy="25" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
                <line
                    x1="25" y1="25" x2="25" y2="15"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    transform={`rotate(${hourAngle} 25 25)`}
                />
                <line
                    x1="25" y1="25" x2="25" y2="10"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    transform={`rotate(${minuteAngle} 25 25)`}
                />
                <line
                    x1="25" y1="25" x2="25" y2="8"
                    stroke="red" strokeWidth="1" strokeLinecap="round"
                    transform={`rotate(${secondAngle} 25 25)`}
                />
            </svg>
            <span className="font-medium text-slate-500 dark:text-slate-400">{label}:</span>
            <span className="font-bold text-green-500 dark:text-green-400 tabular-nums" suppressHydrationWarning>
                {digitalTime}
            </span>
        </div>
    );
};

const TopBar = () => {
    const { rate, isLoading } = useCurrency();

    return (
        <div className="w-full bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50">
            {/* Główne zmiany tutaj: responsywny padding, rozmiar tekstu i odstępy */}
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs md:text-sm px-2 md:px-4 py-1.5">
                {/* Zmieniono układ zegarów dla lepszej responsywności */}
                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 order-2 md:order-1">
                    <TimeClock timeZone="Europe/Warsaw" label="WAW" />
                    <TimeClock timeZone="Europe/London" label="LDN" />
                    <TimeClock timeZone="America/New_York" label="NYC" />
                    <TimeClock timeZone="America/New_York" label="MIA" />
                </div>
                <div className="flex items-center gap-2 order-1 md:order-2 whitespace-nowrap">
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