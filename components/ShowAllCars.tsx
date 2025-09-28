'use client'; // <-- DODAJ TĘ LINIĘ

import { CarProps, FilterCardProps, FilterProps, ShowAllCarsProps } from '@/types'
import { updateSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import CustomButton from './CustomButton';
import CarCard from './CarCard';
// Usunęliśmy importy dla filtrów, których już nie potrzebujemy (drive, type)
import { availableFilterBrandOptions, availableFilterCylindersOptions, availableFilterFuelTypeOptions } from '@/constants';
import Image from 'next/image';
import { CarCardSkeleton } from './skeleton';

const ShowAllCars = ({ allCars, limit, isLoading }: ShowAllCarsProps) => {
  const router = useRouter();
  const [searchInputVal, setSearchInputVal] = useState('');
  const [searchCarResults, setSearchCarResults] = useState<CarProps[]>([]);
  const [isShownFilter, setIsShownFilter] = useState(false);

  // Poprawiono: Usunięto twarde znaki (spacje niełamiące)
  const [filters, setFilters] = useState<FilterProps>({
    brand: [],
    cylinders: [],
    fuelType: [],
    buyNowPrice: [],

  });



  const filteredCars = allCars.filter((car) => {
    const { brand, cylinders, fuelType } = filters;
    return (
      // Filtrowanie po marce lub modelu
      (brand.length === 0 ||
        brand.some(b => car.make.toLowerCase().includes(b) || car.model.toLowerCase().includes(b))) &&

      // Filtrowanie po cylindrach
      (cylinders.length === 0 || cylinders.includes(String(car.cylinders))) &&

      // Filtrowanie po typie paliwa (zabezpieczenie, jeśli fuelType jest null)
      (fuelType.length === 0 || (car.fuelType && fuelType.includes(car.fuelType.toLowerCase())))
    );
  });

  const handleClick = () => {
    const newLimit = (limit || 10) + 10;
    const pathname = updateSearchParams('limit', `${newLimit}`);
    // Poprawiono: Usunięto opcję `{ scroll: false }` z `router.push`, aby uniknąć błędu typów
    router.push(pathname);
  };

  const handleSearchValChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    setSearchInputVal(val);
    const searchFilteredCar = allCars.filter(
      (car) =>
        car.model.toLowerCase().includes(val) ||
        car.make.toLowerCase().includes(val)
    );
    setSearchCarResults(searchFilteredCar);
  };


  
  // Poprawiono: Dodano jawne typowanie stałej `filterData`, aby TypeScript poprawnie interpretował `category`
  const filterData: FilterCardProps[] = [
    { title: 'Marka', category: 'brand', options: availableFilterBrandOptions },
    { title: 'Paliwo', category: 'fuelType', options: availableFilterFuelTypeOptions },
    { title: 'Cylindry', category: 'cylinders', options: availableFilterCylindersOptions },
  ];

  return (
    <section className='w-full'>
      <div className='flex flex-col md:flex-row gap-4'>
        {/* Filters button mobile */}
        <button
          type='button'
          className='bg-blue-500 dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-600 px-5 py-1.5 rounded-full w-fit md:hidden ml-2 flex items-center'
          onClick={() => setIsShownFilter(prev => !prev)}
        >
          <span>Filtry</span>
          <Image src='/icons/filter.svg' alt='filter icon' width={17} height={17} className='object-contain ml-1' />
        </button>

        {/* Filters panel */}
        <div className={`px-4 md:p-6 py-3 md:flex mx-2 min-w-[260px] md:mx-0 md:flex-col bg-white shadow-sm rounded-lg gap-3 sticky top-0 md:h-screen flex-wrap transition-all duration-200 ease-linear dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-slate-700 ${isShownFilter ? 'flex' : 'hidden'}`}>
          <div className='items-center py-1.5 hidden md:flex'>
            <Image src='/icons/search.svg' alt='search icon' width={20} height={20} className='object-contain mr-2' />
            <input
              type='text'
              value={searchInputVal}
              onChange={handleSearchValChange}
              placeholder='Szukaj po marce lub modelu'
              className='outline-none bg-transparent text-sm w-full'
            />
          </div>
          <div className='border-b-[0.5px] dark:border-slate-700 w-full hidden md:flex' />
        
        </div>

        {/* Car grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2 w-full h-fit'>
          {isLoading
            ? Array(limit || 10).fill(0).map((_, i) => <CarCardSkeleton key={i} />)
            : (
              (filteredCars.length === 0 || (searchCarResults.length === 0 && searchInputVal))
                ? <p className='text-center text-xl w-full col-span-full'>Nie znaleziono samochodów.</p>
                : (searchInputVal ? searchCarResults : filteredCars).map((car) => <CarCard key={car.id} car={car} />)
            )
          }
        </div>
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