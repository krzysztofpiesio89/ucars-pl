'use client';

// --- KROK 1: Zaimportuj MainContent ---
import { Catalogue, Hero, AboutUs, ProcessSection, MainContent } from '@/components';
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
        // Usunęliśmy nadmiarowe divy dla uproszczenia
        <main className="overflow-hidden relative dark:bg-slate-900">
            <AnimatedGradientBlobs />
            
            {/* Hero jest renderowane samodzielnie, aby zająć cały ekran */}
            <Hero />

            {/* --- KROK 2: Opakuj resztę treści w MainContent --- */}
            <MainContent>
                <AboutUs /> 
                <ProcessSection />
                { allCars && <Catalogue
                    isLoading={isLoading}
                    allCars={allCars}
                    limit={(limit || 20) / 10}
                />}
            </MainContent>
        </main>
    );
}