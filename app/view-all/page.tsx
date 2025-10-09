'use client';
import { ShowAllCarsOld, AdvancedFilter, CustomButton, FloatingFilterButton } from '@/components';
import { CarProps, FilterProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { updateMultipleSearchParams } from '@/utils';
import { useRouter } from 'next/navigation';

const ViewAllCars = ({ searchParams }: { searchParams: FilterProps }) => {
    const router = useRouter();
    const [allCars, setAllCars] = useState<CarProps[]>([]);
    const [totalCars, setTotalCars] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [filters, setFilters] = useState<FilterProps>({
        brand: searchParams.brand || '',
        model: searchParams.model || '',
        version: searchParams.version || '',
        fuelType: searchParams.fuelType || '',
        yearFrom: searchParams.yearFrom || undefined,
        yearTo: searchParams.yearTo || undefined,
        priceFrom: searchParams.priceFrom || undefined,
        priceTo: searchParams.priceTo || undefined,
        mileageTo: searchParams.mileageTo || undefined,
        engineCapacityTo: searchParams.engineCapacityTo || undefined,
        cylinders: searchParams.cylinders || [],
        // USUNIĘTO: Poniższa linia była zbędna i myląca
        // buyNowPrice: searchParams.buyNowPrice || [], 
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowFloatingButton(true);
            } else {
                setShowFloatingButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchAllCars = async () => {
            setIsLoading(true);
            try {
                const queryString = new URLSearchParams(searchParams as any).toString();
                const res = await fetch(`/api/car?${queryString}`);
                if (res.ok) {
                    const data = await res.json();
                    setAllCars(data.cars);
                    setTotalCars(data.totalCars);
                } else {
                    const errorData = await res.json();
                    setAllCars([]);
                    setTotalCars(0);
                    throw new Error(errorData.message || 'Failed to fetch cars');
                }
            } catch (error) {
                console.error(error);
                throw error; // Re-throw the error to be caught by toast.promise
            } finally {
                setIsLoading(false);
            }
        };

        toast.promise(
            fetchAllCars(),
            {
                loading: 'Wyszukiwanie samochodów...',
                success: 'Samochody znalezione',
                error: (err) => err.message,
            }
        );
    }, [searchParams]);

    const handleApplyFilters = () => {
        const pathname = updateMultipleSearchParams(filters);
        router.push(pathname);
        setIsFilterOpen(false);
    };

    return (
        <section className='max-w-[1440px] mx-auto relative pt-16 md:pt-24'>
            <div className='flex justify-end w-full mb-4'>
                <CustomButton
                    title="Filtruj"
                    handleClick={() => setIsFilterOpen(true)}
                    containerStyle='text-white rounded-full bg-primary-blue min-w-[130px]'
                />
            </div>
            {showFloatingButton && <FloatingFilterButton onClick={() => setIsFilterOpen(true)} />}
            <AdvancedFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                setFilters={setFilters}
                handleApply={handleApplyFilters}
            />
            {
                allCars && <ShowAllCarsOld
                    allCars={allCars}
                    limit={(Number(searchParams.limit) || 10) / 10}
                    page={Number(searchParams.page) || 1}
                    totalCars={totalCars}
                    isLoading={isLoading}
                />
            }
        </section>
    )
}

export default ViewAllCars;
