'use client'
import { CarCard } from '@/components';
import { CarCardSkeleton } from '@/components/skeleton';
import { CarProps } from '@/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [cars, setCars] = useState<CarProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(()=> {
    //     if (!session?.user?.id) return; // Guard clause
    //     const getCars = async () => {
    //         try {
    //             const res = await fetch(`/api/car/user/${session?.user?.id}`);
    //             const data = await res.json();
    //             setCars(data);
    //         } catch (error) {
    //             console.error(error);
    //             toast.error('Failed to fetch cars.');
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     getCars();
    // },[session?.user?.id]);

    return (
        <section className='relative max-w-[1440px] mx-auto pt-24 md:pt-32 p-4'>
            <div className='flex items-center gap-4 mb-8'>
                 <div className='relative h-24 w-24 md:h-32 md:w-32'>
                    <Image src={session?.user?.image || 'https://api.multiavatar.com/user.svg'} alt='profile photo' fill className='object-contain rounded-full' quality={100} />
                </div>
                <div className='leading-5'>
                    <h1 className='text-lg md:text-2xl font-bold'>{session?.user?.name}</h1>
                    <p className='text-gray-500 text-sm'>{session?.user?.email}</p>
                    <small className='text-gray-400'>#{session?.user?.id}</small>
                </div>
            </div>

            <div className='mt-12'>
                {
                    (cars?.length === 0 && ((!isLoading))) ? (
                        <h1>You have no auctions yet.</h1>
                    ) : <div>
                        <h1 className='text-lg md:text-2xl font-bold'>My Auctions</h1>
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                            {
                                cars?.map((car, index) => (
                                    <CarCard key={index} car={car} />
                                ))
                            }
                        </div>
                    </div>
                }
                {
                    isLoading && <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                        {
                            Array(8).fill(0).map((_, i) => (
                                <CarCardSkeleton key={i} />
                            ))
                        }
                    </div>
                }
            </div>
        </section>
    )
}

export default Profile
