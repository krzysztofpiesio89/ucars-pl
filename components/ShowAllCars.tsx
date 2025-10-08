'use client';

import { ShowAllCarsProps } from '@/types';
import { useState, useEffect } from 'react';
import { CarCarousel } from './CarCarousel';

// Custom hook for count-up animation (bez zmian)
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        // ... logika hooka
        let start = 0;
        const startTime = Date.now();
        const animateCount = () => {
            const now = Date.now();
            const progress = Math.min(1, (now - startTime) / duration);
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                setCount(end);
            }
        };
        if (end > 0) {
            requestAnimationFrame(animateCount);
        } else {
            setCount(0);
        }
    }, [end, duration]);
    return count;
};

const ShowAllCars = ({ allCars, limit, isLoading, totalCars }: ShowAllCarsProps) => {
  const animatedTotal = useCountUp(totalCars);

  return (
    <section className='w-full'>
      <div className='flex flex-col items-center text-center mb-12 space-y-4'>
        
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Wszystkie pojazdy</h1>
          <p className="text-gray-500 mt-2">Przeglądaj naszą pełną kolekcję dostępnych aut.</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Łączna ilość aukcji</p>
          <p className="text-5xl font-extrabold text-blue-600 dark:text-indigo-400 tabular-nums">
            {animatedTotal}
          </p>
        </div>
        
        <div className="pt-4">
          <a
            href="/view-all"
            // 👇 ZMIANA: Użycie wbudowanej animacji 'animate-pulse' zamiast niestandardowej 👇
            className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition animate-pulse"
          >
            {/* Wskaźnik "Live" pozostaje bez zmian, bo używa wbudowanej animacji "ping" */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            Oglądaj aukcję na żywo
          </a>
        </div>

      </div>

      <CarCarousel 
        allCars={allCars} 
        isLoading={isLoading} 
        limit={limit} 
      />

    </section>
  );
};

export default ShowAllCars;