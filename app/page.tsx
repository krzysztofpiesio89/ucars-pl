'use client';
import { Catalogue,  Hero, AboutUs, ProcessSection} from '@/components';
import AnimatedGradientBlobs from '@/components/AnimatedGradientBlobs';
import { CarProps, FetchCarProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home({ searchParams }: { searchParams: FetchCarProps }) {
  const { manufacturer, year, fuelType, limit, model } = searchParams;
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCars = async () => {
      try {
        const res = await fetch(`/api/car?model=${model}&limit=${limit}&fuelType=${fuelType}&year=${year}&manufacturer=${manufacturer}`);
        const data = await res.json();
        setAllCars(data?.reverse());
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    toast.promise(fetchAllCars(), {
      loading: 'Wyszukiwanie samochodów...',
      success: 'Wyszukiwanie zakończone',
      error: 'Nie udało się znaleźć samochodów',
    });
  }, [model, year, manufacturer, fuelType, limit]);

  return (
    <main className="overflow-hidden relative  dark:bg-slate-900">
      <div className="absolute inset-0 backdrop-blur-3xl backdrop-filter" />
      <div className="relative z-10">
        <AnimatedGradientBlobs />

        <Hero />
        <AboutUs /> 
        <ProcessSection />
        { allCars && <Catalogue
          isLoading={isLoading}
          allCars={allCars}
          limit={(limit || 20) / 10}
        />}
      </div>
    </main>
  );
}