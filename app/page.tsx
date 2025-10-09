'use client';

// Twoje importy pozostają bez zmian
import { ShowAllCars, Hero, AboutUs, ProcessSection, MainContent, BrandStrip, CarFilterForm, WhyUsCarAnimation, OfferCount } from '@/components';

import { CarProps, FilterProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Home({ searchParams }: { searchParams: FilterProps }) {
    // Cała logika z fetchowaniem danych pozostaje bez zmian
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
        <main className="overflow-hidden relative dark:bg-slate-900">
            {/* --- WARSTWA TŁA (z-0) --- */}
            {/* Ten kontener trzyma wszystkie dekoracyjne "plamy" i zawsze jest na spodzie. */}
            <div className="absolute inset-0 z-0">
                <div className="w-44 h-44 hidden md:flex dark:bg-gradient-radial from-pink-500 to-purple-700 rounded-full rotate-12 absolute top-3/4 right-1/2 blur-3xl" />
                <div className="w-44 h-44 dark:bg-gradient-radial from-blue-500 to-violet-950 rounded-2xl rotate-12 absolute top-[98%] left-1/2 blur-3xl" />
                <div className="w-72 h-72 dark:bg-gradient-radial from-indigo-900 to-purple-700 rounded-2xl rotate-12 absolute top-1/2 left-1/2 blur-3xl" />
                <div className="w-72 h-20 dark:bg-gradient-radial from-teal-500 to-green-700 rounded-2xl rotate-12 absolute top-0 left-4 blur-3xl" />
                <div className="w-72 h-72 dark:bg-gradient-radial from-slate-700 to-[#343434] rounded-2xl rotate-12 absolute top-[15%] right-0 blur-3xl" />
            </div>

            {/* --- WARSTWA TREŚCI (z-10) --- */}
            {/* Ten kontener trzyma całą zawartość strony i zawsze jest na wierzchu. */}
            <div className="relative z-10">
       
                
                <MainContent>
            
                    <Hero /> 
                    <CarFilterForm />
                    <ShowAllCars
                        allCars={allCars}
                        limit={(Number(searchParams.limit) || 10)}
                        page={Number(searchParams.page) || 1}
                        totalCars={totalCars}
                        isLoading={isLoading}
                    />
                    <BrandStrip />
                    <AboutUs /> 
                    <ProcessSection />
                </MainContent>
            </div>
        </main>
    );
}