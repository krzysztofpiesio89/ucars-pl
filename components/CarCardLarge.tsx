'use client';

import Image from "next/image";
import Link from "next/link";
import { CarProps } from "@/types";
import { useCurrency } from "@/context/CurrencyProvider";

interface CarCardLargeProps {
    car: CarProps;
}

const CarCardLarge = ({ car }: CarCardLargeProps) => {
    const { currency, rate, isLoading: isCurrencyLoading } = useCurrency();

    const formatPrice = (price: string | number | null | undefined) => {
        if (price === null || price === undefined) return "N/A";
        const priceString = String(price);
        const number = parseFloat(priceString.replace(/[^0-9.]/g, ''));

        if (isNaN(number)) return priceString;

        if (isCurrencyLoading) {
            return 'Ładowanie...';
        }

        if (currency === 'PLN' && rate) {
            return `${(number * rate).toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}`;
        }
        
        return `${number.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
    };

    const bidPrice = formatPrice(car.bidPrice);

    return (
        <Link href={`/auction/${car.stock}`} className="w-full">
            <div className="relative w-full h-80 mx-auto bg-white dark:bg-slate-800/50 dark:border-slate-700/70 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl border group overflow-hidden">
                <Image
                    src={car.imageUrl || "/cars/fallback.webp"}
                    alt={`${car.make} ${car.model}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = "/cars/fallback.webp"; }}
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-lg text-sm font-bold">
                    {bidPrice}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg font-bold text-white truncate">
                        {car.year} {car.make} {car.model}
                    </h3>
                    {car.auctionDate && (
                        <p className="text-sm text-gray-300">
                            Aukcja: {new Date(car.auctionDate).toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default CarCardLarge;