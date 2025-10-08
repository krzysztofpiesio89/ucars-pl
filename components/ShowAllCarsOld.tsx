'use client';

import { ShowAllCarsProps } from '@/types'
import CarCard from './CarCard';
import { CarCardSkeleton } from './skeleton';
import Pagination from './Pagination';
import { useState, useEffect } from 'react';

// Custom hook for count-up animation
const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
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
                setCount(end); // Ensure it ends on the exact number
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

const ShowAllCarsOld = ({ allCars, limit, isLoading, page, totalCars }: ShowAllCarsProps) => {
  const totalPages = Math.ceil(totalCars / 10);
  const animatedTotal = useCountUp(totalCars);

  return (
    <section className='w-full'>
      <div className='flex flex-col md:flex-row items-center justify-between px-2 md:px-0 mb-8'>
          <div>
            <h1 className="text-2xl font-bold">Wszystkie pojazdy</h1>
            <p className="text-gray-500 mt-1">Przeglądaj naszą pełną kolekcję dostępnych aut.</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">Łączna ilość aukcji</p>
            <p className="text-5xl font-extrabold text-blue-600 dark:text-indigo-400 tabular-nums">
                {animatedTotal}
            </p>
          </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 w-full h-fit'>
        {isLoading
          ? Array(limit || 10).fill(0).map((_, i) => <CarCardSkeleton key={i} />)
          : (
            (allCars.length === 0)
              ? <p className='text-center text-xl w-full col-span-full'>Nie znaleziono samochodów.</p>
              : allCars.map((car) => <CarCard key={car.id} car={car} />)
          )
        }
      </div>

      {(!isLoading && totalPages > 1) && (
        <Pagination page={page} totalPages={totalPages} />
      )}
    </section>
  );
};

export default ShowAllCarsOld;