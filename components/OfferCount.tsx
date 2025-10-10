'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion, Variants } from 'framer-motion';

// --- Wewnętrzny komponent do animacji liczby (bez zmian) ---
const AnimatedNumber = ({ value, onStart, onEnd }: { value: number; onStart: () => void; onEnd: () => void }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    onChange: (inView) => {
      if (inView) onStart();
    },
  });

  return (
    <div ref={ref}>
      {inView ? <CountUp end={value} duration={2.5} separator=" " onEnd={onEnd} /> : 0}
    </div>
  );
};

// --- Główny komponent ---
const OfferCount = () => {
  // --- Logika (bez zmian) ---
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationState, setAnimationState] = useState<'initial' | 'counting' | 'finished'>('initial');

  useEffect(() => {
    // ...logika fetchowania bez zmian
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/car/count');
        if (!res.ok) throw new Error(`Błąd serwera: ${res.status}`);
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Nie udało się pobrać liczby ofert:', error);
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCount();
  }, []);
  
  const circleVariants: Variants = {
    initial: { scale: 1, boxShadow: '0 0 20px rgba(56, 189, 248, 0)' },
    counting: {
      scale: [1, 1.05, 1],
      boxShadow: ['0 0 30px rgba(56, 189, 248, 0.4)', '0 0 60px rgba(56, 189, 248, 0.8)', '0 0 30px rgba(56, 189, 248, 0.4)'],
      transition: { duration: 2.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
    },
    finished: {
      scale: 1,
      boxShadow: ['0 0 60px rgba(56, 189, 248, 0.8)', '0 0 100px rgba(147, 51, 234, 1)', '0 0 30px rgba(56, 189, 248, 0.4)'],
      transition: { duration: 0.7, ease: 'easeInOut' },
    },
  };

  if (isLoading) { /* Ekran ładowania bez zmian */ return ( <div className="w-[70vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-[380px] mx-auto"><div className="w-full aspect-square rounded-full bg-slate-900/50 flex items-center justify-center"><div className="w-3/4 h-1/3 bg-slate-800/50 rounded-2xl animate-pulse"></div></div></div>); }
  if (count === null) return null;

  // --- NOWOŚĆ: Logika dynamicznie zmieniająca rozmiar czcionki ---
  let numberSizeClass = 'text-6xl sm:text-7xl'; // Domyślny, największy rozmiar
  const numDigits = count.toString().length;

  if (numDigits === 5) {
    numberSizeClass = 'text-5xl sm:text-6xl'; // Rozmiar dla 5 cyfr
  } else if (numDigits >= 6) {
    numberSizeClass = 'text-4xl sm:text-5xl'; // Rozmiar dla 6+ cyfr
  }

  return (
    <div className="w-[70vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-[380px] mx-auto">
      <motion.div
        className="relative w-full aspect-square rounded-full bg-slate-900/80 border-2 border-slate-700/50 p-4 shadow-2xl flex flex-col items-center justify-center"
        variants={circleVariants} 
        initial="initial" 
        animate={animationState}
      >
        <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="bg-gradient-to-b from-blue-900/10 to-blue-950/20 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-inner shadow-black/50">
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-green-400 tracking-widest">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-green-500"></span></span>
                    LIVE
                </div>
                
                {/* ZMIANA: Zastosowano dynamiczną klasę rozmiaru czcionki */}
                <div className={`font-mono font-bold text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] tabular-nums my-1 ${numberSizeClass}`}>
                    <AnimatedNumber value={count} onStart={() => setAnimationState('counting')} onEnd={() => setAnimationState('finished')} />
                </div>
                
                <p className="text-xl font-medium text-orange-400 tracking-wider uppercase animate-turn-signal">
                    Ofert Online
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferCount;