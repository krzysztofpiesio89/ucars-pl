"use client";

import { FormEvent, useEffect, useState } from 'react';
import { Form } from '@/components';
// Upewnij się, że ten typ jest zgodny ze schematem Prisma
import { CarInfoProps } from '@/types'; 
import toast from 'react-hot-toast';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

const EditCar = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { width, height } = useWindowSize();
    
    // Poprawiony stan początkowy
    const [carInfo, setCarInfo] = useState<CarInfoProps>({
        make: '',
        model: '',
        year: new Date().getFullYear(),
        vin: '',
        lotNumber: '',
        odometer: null,
        primaryDamage: '',
        secondaryDamage: '',
        fuelType: '',
        transmission: '',
        drive: '',
        cylinders: null,
        bodyStyle: '',
        color: '',
        currentBid: 0,
        buyItNowPrice: null,
        imageFiles: [],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        const getCarInfo = async () => {
            try {
                const res = await fetch(`/api/car/${id}`);
                if (!res.ok) throw new Error('Failed to fetch car details');
                const data = await res.json();
                setCarInfo(data);
            } catch (error) {
                console.error(error);
                throw error;
            }
        };
        
        toast.promise(getCarInfo(), {
            loading: 'Fetching car details..',
            success: 'Fetched car details.',
            error: 'Could not fetch details.'
        });
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => setIsSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const updatePromise = async () => {
            try {
                const response = await fetch(`/api/car/user/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(carInfo)
                });
                if (!response.ok) throw new Error('Failed to update the car.');
                setIsSuccess(true);
                return 'Edited successfully.';
            } catch (error) {
                setIsSuccess(false);
                throw error;
            } finally {
                setIsLoading(false);
            }
        };

        toast.promise(updatePromise(), {
            loading: 'Editing car details...',
            success: (message) => message,
            error: (err) => err.message || 'An unknown error occurred.'
        });
    };

    return (
        <section className='relative pt-16 md:pt-20 px-1'>
            {isSuccess && <Confetti width={width} height={height} recycle={false} />}
            <Form
                carInfo={carInfo}
                setCarInfo={setCarInfo}
                submitBtnTitle='Edit Car'
                title='Edit Vehicle Details'
                handleSubmit={handleSubmit}
                isLoading={isLoading}
            />
        </section>
    );
};

export default EditCar;