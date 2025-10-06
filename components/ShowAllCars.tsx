'use client';

import { CarProps, FilterProps, ShowAllCarsProps } from '@/types'
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState, useEffect } from 'react'
import CustomButton from './CustomButton';
import CarCard from './CarCard';
import Image from 'next/image';
import { CarCardSkeleton } from './skeleton';
import AdvancedFilter from './AdvancedFilter';

const ShowAllCars = ({ allCars, limit, isLoading }: ShowAllCarsProps) => {
  const router = useRouter();
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [filters, setFilters] = useState<FilterProps>({
    brand: '',
    model: '',
    cylinders: [],
    fuelType: '',
    buyNowPrice: [],
    mileageTo: undefined,
    engineCapacityTo: undefined,
    priceFrom: undefined,
    priceTo: undefined,
    yearFrom: undefined,
    yearTo: undefined,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredCars = allCars.filter((car) => {
    const { brand, model, fuelType, mileageTo, engineCapacityTo, priceFrom, priceTo, yearFrom, yearTo } = filters;

    const brandSearch = String(brand).toLowerCase();
    const modelSearch = String(model).toLowerCase();

    const textMatch = (!brandSearch || car.make.toLowerCase().includes(brandSearch)) &&
                      (!modelSearch || car.model.toLowerCase().includes(modelSearch));

    const fuelMatch = !fuelType.length || (car.fuelType && car.fuelType.toLowerCase().includes(String(fuelType).toLowerCase()));

    const priceMatch = (!priceFrom || (car.buyNowPrice && car.buyNowPrice >= priceFrom)) &&
                       (!priceTo || (car.buyNowPrice && car.buyNowPrice <= priceTo));

    const mileageMatch = !mileageTo || (car.mileage && car.mileage <= mileageTo);

    const yearMatch = (!yearFrom || car.year >= yearFrom) &&
                      (!yearTo || car.year <= yearTo);

    const engineCapacityMatch = !engineCapacityTo || (car.engineCapacityL && (car.engineCapacityL * 1000) <= engineCapacityTo);

    return textMatch && fuelMatch && priceMatch && mileageMatch && yearMatch && engineCapacityMatch;
  });

  const handleClick = () => {
    const newLimit = (limit || 10) + 10;
    const pathname = updateSearchParams('limit', `${newLimit}`);
    router.push(pathname);
  };

  return (
    <section className='w-full'>
      <AdvancedFilter isOpen={isShownFilter} onClose={() => setIsShownFilter(false)} filters={filters} setFilters={setFilters} />

      <div className={`transition-opacity duration-300 ${isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className='flex items-center justify-between px-2 md:px-0 mb-4'>
            <h1 className="text-2xl font-bold">Wszystkie pojazdy</h1>
            <button
              type='button'
              className='bg-blue-500 dark:bg-slate-700 text-white border dark:border-zinc-600 px-4 py-2 rounded-full flex items-center gap-2'
              onClick={() => setIsShownFilter(true)}
            >
              <Image src='/icons/filter.svg' alt='filter icon' width={17} height={17} className='object-contain' />
              <span className="hidden md:inline">Filtry Zaawansowane</span>
              <span className="md:hidden">Filtruj</span>
            </button>
        </div>
      </div>

      {isSticky && (
        <button
          type='button'
          onClick={() => setIsShownFilter(true)}
          className='fixed bottom-5 right-5 z-30 bg-blue-600 dark:bg-slate-800 text-white p-3 rounded-full shadow-lg flex items-center justify-center animate-fade-in'
        >
          <Image src='/icons/filter.svg' alt='filter icon' width={20} height={20} className='object-contain' />
        </button>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 w-full h-fit'>
        {isLoading
          ? Array(limit || 10).fill(0).map((_, i) => <CarCardSkeleton key={i} />)
          : (
            (filteredCars.length === 0)
              ? <p className='text-center text-xl w-full col-span-full'>Nie znaleziono samochodów.</p>
              : filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          )
        }
      </div>

      {(!isLoading && (limit || 10) < filteredCars.length) && (
        <CustomButton
          title='Pokaż więcej'
          type='button'
          containerStyle='mt-12 mx-auto bg-blue-600 text-white px-6 border dark:border-slate-600 rounded-full dark:bg-slate-700 dark:text-slate-300'
          handleClick={handleClick}
        />
      )}
    </section>
  );
};

export default ShowAllCars;