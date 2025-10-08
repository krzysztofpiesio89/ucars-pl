'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { CarProps } from '@/types';
import CarCardLarge from './CarCardLarge';
import { CarCardSkeleton } from './skeleton';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface CarCarouselProps {
  allCars?: CarProps[];
  isLoading?: boolean;
  limit?: number;
}

export const CarCarousel = ({ allCars = [], isLoading = false, limit = 10 }: CarCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
      }),
    ]
  );

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {!isLoading && allCars.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-105 transition disabled:opacity-30"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:scale-105 transition disabled:opacity-30"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
        </>
      )}

      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {isLoading
            ? Array(limit).fill(0).map((_, i) => (
                <div key={i} className="embla__slide p-2 basis-full md:basis-1/2 lg:basis-1/3">
                  <CarCardSkeleton />
                </div>
              ))
            : allCars.map((car) => (
                <div key={car.id} className="embla__slide p-2 basis-full md:basis-1/2 lg:basis-1/3">
                  <CarCardLarge car={car} />
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};