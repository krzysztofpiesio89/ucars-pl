'use client';

import { ShowAllCarsProps } from '@/types'
import CarCard from './CarCard';
import { CarCardSkeleton } from './skeleton';
import Pagination from './Pagination';

const ShowAllCars = ({ allCars, limit, isLoading, page, totalCars }: ShowAllCarsProps) => {
  const totalPages = Math.ceil(totalCars / 10);

  return (
    <section className='w-full'>
      <div className='flex items-center justify-between px-2 md:px-0 mb-4'>
          <h1 className="text-2xl font-bold">Wszystkie pojazdy</h1>
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

export default ShowAllCars;