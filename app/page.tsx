'use client';

// --- KROK 1: Zaimportuj MainContent ---
import { ShowAllCars, Hero, AboutUs, ProcessSection, MainContent, BrandStrip, CarFilterForm, WhyUsCarAnimation } from '@/components';
import AnimatedGradientBlobs from '@/components/AnimatedGradientBlobs';
import { CarProps, FilterProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home({ searchParams }: { searchParams: FilterProps }) {
    const [allCars, setAllCars] = useState<CarProps[]>([]);
    const [totalCars, setTotalCars] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllCars = async () => {
            setIsLoading(true);
            try {
                const queryString = new URLSearchParams(searchParams as any).toString();
                const res = await fetch(`/api/car?${queryString}`);
                const data = await res.json();
                setAllCars(data.cars);
                setTotalCars(data.totalCars);
            } catch (error) {
                console.error(error);
                toast.error('Nie udało się pobrać samochodów.');
            } finally {
                setIsLoading(false);
            }
        };

        toast.promise(fetchAllCars(), {
            loading: 'Szukam nowych aukcji...',
            success: 'Wyszukiwanie zakończone',
            error: 'Wystąpił błąd podczas wyszukiwania.',
        });
    }, [searchParams]);

    return (
        // Usunęliśmy nadmiarowe divy dla uproszczenia
          <main className="overflow-hidden relative  dark:bg-slate-900 backdrop-blur-3xl backdrop-filter">
        <div className="w-44 h-44 hidden md:flex dark:bg-gradient-radial from-pink-500 to-purple-700 rounded-full rotate-12 absolute top-3/4 right-1/2 blur-3xl" />
      <div className="w-44 h-44 dark:bg-gradient-radial from-blue-500 to-violet-950 rounded-2xl rotate-12 absolute top-[98%] left-1/2 blur-3xl" />
      <div className="w-72 h-72 dark:bg-gradient-radial from-indigo-900 to-purple-700 rounded-2xl rotate-12 absolute top-1/2 left-1/2 blur-3xl" />
      <div className="w-72 h-20 dark:bg-gradient-radial from-teal-500 to-green-700 rounded-2xl rotate-12 absolute top-0 left-4 blur-3xl" />
      <div className="w-72 h-72 dark:bg-gradient-radial from-slate-700 to-[#343434] rounded-2xl rotate-12 absolute top-[15%] right-0 blur-3xl" />
        
            
            {/* Hero jest renderowane samodzielnie, aby zająć cały ekran */}
      
            <BrandStrip />

            {/* --- KROK 2: Opakuj resztę treści w MainContent --- */}
            <MainContent>
                <AboutUs /> 
                <ProcessSection />
                <WhyUsCarAnimation />
                <CarFilterForm />
                <ShowAllCars
                    allCars={allCars}
                    limit={(Number(searchParams.limit) || 10)}
                    page={Number(searchParams.page) || 1}
                    totalCars={totalCars}
                    isLoading={isLoading}
                />
            </MainContent>
        </main>
    );
}