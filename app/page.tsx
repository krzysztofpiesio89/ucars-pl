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
        <main className="relative overflow-x-hidden dark:bg-slate-900">
          
            
            {/* Hero jest renderowane samodzielnie, aby zająć cały ekran */}
      

            {/* --- KROK 2: Opakuj resztę treści w MainContent --- */}
            <MainContent>
                <BrandStrip />
                <AboutUs /> 
                <ProcessSection />
                
             
             
            </MainContent>

        </main>
    );
}