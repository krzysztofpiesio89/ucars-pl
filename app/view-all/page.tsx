'use client'
import { ShowAllCars } from '@/components';
import { CarProps, FetchCarProps } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const ViewAllCars = ({ searchParams }: { searchParams: FetchCarProps }) => {
    const { manufacturer, year, fuelType, limit, model, page } = searchParams;
    const [allCars, setAllCars] = useState<CarProps[]>([]);
    const [totalCars, setTotalCars] = useState(0);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchAllCars = async () => {
            try {
                const res = await fetch(`/api/car?model=${model}&limit=${limit}&fuelType=${fuelType}&year=${year}&make=${manufacturer}&page=${page}`);
                const data = await res.json();
                setAllCars(data.cars.reverse());
                setTotalCars(data.totalCars);
            } catch (error) {
                console.error(error);
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
    }, [model, year, manufacturer, fuelType, limit, page]);


    return (
        <section className='max-w-[1440px] mx-auto relative pt-16 md:pt-24'>
            {
                allCars && <ShowAllCars
                    allCars={allCars}
                    limit={(limit || 10) / 10}
                    page={page || 1}
                    totalCars={totalCars}
                    isLoading={isLoading}
                />
            }
        </section>
    )
}

export default ViewAllCars;