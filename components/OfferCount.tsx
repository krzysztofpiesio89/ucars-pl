'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Komponent do animacji liczby (bez zmian)
const AnimatedNumber = ({ value }: { value: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? <CountUp end={value} duration={2.5} separator=" " /> : 0}
    </div>
  );
};

// Główny komponent
const OfferCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/car/count');
        if (!res.ok) {
          throw new Error(`Błąd serwera: ${res.status}`);
        }
        const data = await res.json();
        setCount(data.count);
      } catch (error)
      {
        console.error('Nie udało się pobrać liczby ofert:', error);
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  // ⏳ NOWY, LEPSZY EKRAN ŁADOWANIA
  if (isLoading) {
    return (
      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700 p-6 shadow-lg flex flex-col items-center justify-center w-80 h-40">
        <div className="w-3/4 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-3"></div>
        <div className="w-1/2 h-5 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  // Nic nie renderuj przy błędzie
  if (count === null) {
    return null;
  }

  // ✨ OSTATECZNY, NOWOCZESNY WYGLĄD
  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700 p-6 shadow-lg flex flex-col items-center justify-center w-auto min-w-[320px]">
      {/* 1. Wskaźnik "LIVE" dodający kontekst */}
      <div className="flex items-center gap-2 mb-3 text-sm font-medium text-green-600 dark:text-green-400">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        AUKCJE NA ŻYWO
      </div>

      {/* 2. Liczba z gradientem, świetnie wyglądająca w obu trybach */}
      <div className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500 tabular-nums">
        <AnimatedNumber value={count} />
      </div>

      {/* 3. Czytelny opis */}
      <p className="mt-1 text-lg font-medium text-slate-600 dark:text-slate-400">
        Aktywnych Ofert
      </p>
    </div>
  );
};

export default OfferCount;