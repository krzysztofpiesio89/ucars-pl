'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion, Variants, useAnimation } from 'framer-motion';

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
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animationState, setAnimationState] = useState<'initial' | 'counting' | 'finished'>('initial');
  const needleControls = useAnimation();

  useEffect(() => {
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
  
  useEffect(() => {
    if (animationState === 'counting') {
      needleControls.start({
        rotate: 150,
        transition: { duration: 2.5, ease: "easeOut" }
      });
    }
  }, [animationState, needleControls]);

  const circleVariants: Variants = {
     initial: { boxShadow: '0 0 15px rgba(0, 0, 0, 0)', borderColor: 'rgba(100, 116, 139, 0.4)' },
     counting: { boxShadow: '0 0 50px rgba(56, 189, 248, 0.7)', borderColor: 'rgba(56, 189, 248, 1)', transition: { duration: 2.5, ease: 'easeOut' } },
     finished: { boxShadow: ['0 0 50px rgba(56, 189, 248, 0.7)','0 0 100px rgba(239, 68, 68, 1)','0 0 50px rgba(56, 189, 248, 0.7)'], borderColor: ['rgba(56, 189, 248, 1)','rgba(239, 68, 68, 1)','rgba(56, 189, 248, 1)'], transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const speedometerNumbers = [
    { v: '0', a: -150 }, { v: '50', a: -112.5 }, { v: '100', a: -75 },
    { v: '150', a: -37.5 }, { v: '200', a: 0 }, { v: '250', a: 37.5 },
    { v: '300', a: 75 }, { v: '350', a: 112.5 }, { v: '400', a: 150 }
  ];

  if (isLoading) { return ( <div className="w-[70vw] sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[400px] mx-auto"><div className="w-full aspect-square rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center"><div className="font-mono text-4xl text-slate-600 animate-pulse">...</div></div></div>); }
  if (count === null) return null;

  return (
    // ZMIANA: Zwiększony rozmiar na mobile (70vw), stopniowo zmniejszany na większych ekranach
    <div className="w-[70vw] sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-[400px] mx-auto">
      <motion.div
        className="relative w-full aspect-square rounded-full bg-gradient-to-br from-slate-900 to-black border-2 p-4 shadow-2xl flex flex-col items-center justify-center overflow-hidden"
        variants={circleVariants} initial="initial" animate={animationState}
      >
        {/* --- ELEMENTY WIDOCZNE TYLKO NA DESKTOPIE --- */}

        {/* ZMIANA: Tarcza i cyfry ukryte na mobile (widoczne od `md`) */}
        <div className="hidden md:block absolute inset-2 rounded-full opacity-20 dark:opacity-30 animate-spin-slow bg-[repeating-conic-gradient(rgba(0,190,255,0.4)_0deg_1deg,transparent_1deg_6deg)] z-0" />
        <div className="hidden md:block absolute inset-0 z-10">
          {speedometerNumbers.map((num) => (
            <div key={num.v} className="absolute inset-0" style={{ transform: `rotate(${num.a}deg)` }}>
              <span className="absolute top-0 left-1/2 -translate-x-1/2 pt-2 font-mono text-lg text-green-400"
                style={{ transform: `rotate(-${num.a}deg)`, textShadow: '0 0 8px rgba(52, 211, 153, 0.8)' }}>
                {num.v}
              </span>
            </div>
          ))}
        </div>
        
        {/* ZMIANA: Wskazówka i pin ukryte na mobile (widoczne od `md`) */}
        <div className="hidden md:block absolute inset-0 z-30 flex justify-center items-center">
          <motion.div className="w-1 h-1/3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)]"
            style={{ transformOrigin: 'bottom' }} initial={{ rotate: -150 }} animate={needleControls}
          />
        </div>
        <div className="hidden md:block absolute w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-500 z-40" />

        {/* --- ELEMENTY WIDOCZNE ZAWSZE --- */}

        <div className="relative z-50 flex flex-col items-center justify-center">
            <div className="
              bg-gradient-to-b from-blue-900/50 to-blue-950/70
              backdrop-blur-sm
              rounded-xl px-6 py-3 sm:px-8 sm:py-4
              border-t border-blue-400/50
              shadow-inner shadow-black/50
            ">
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-green-400 tracking-widest">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative rounded-full h-2 w-2 bg-green-500"></span></span>
                    LIVE
                </div>
                <div className="font-mono text-4xl sm:text-5xl font-bold text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.8)] tabular-nums">
                    <AnimatedNumber value={count} onStart={() => setAnimationState('counting')} onEnd={() => setAnimationState('finished')} />
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500 tracking-wider uppercase">
                    Ofert Online
                </p>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OfferCount;