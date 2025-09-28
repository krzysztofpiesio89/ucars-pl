'use client'
import { CarCard } from '@/components';
import { CarCardSkeleton } from '@/components/skeleton';
import { CarProps } from '@/types';
import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const Favorites = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [favoriteCars, setFavoriteCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavCars = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/favorites?userId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setFavoriteCars(data);
      } else {
        toast.error('Failed to fetch favorite cars.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while fetching favorites!');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchFavCars();
  }, [fetchFavCars]);

  const handleFavoriteChange = (carId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoriteCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    }
  };

  return (
    <section className='max-w-[1440px] mx-auto relative pt-16 md:pt-24 px-2 md:px-6'>
      {
        (!isLoading && favoriteCars.length === 0) ? (
          <h1 className='text-center mt-12 text-xl'>You have no favorite cars yet 🥸</h1>
        ) : (
          <>
            <h1 className='text-lg md:text-2xl font-bold mb-4'>⭐ Your Favorites</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
              {favoriteCars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  isInitiallyFavorite={true} 
                  onFavoriteChange={handleFavoriteChange}
                />
              ))}
            </div>
          </>
        )
      }
      {
        isLoading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4'>
            {Array(12).fill(0).map((_, i) => <CarCardSkeleton key={i} />)}
          </div>
        )
      }
    </section>
  )
}

export default Favorites