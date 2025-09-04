"use client";

import { useEffect, useState } from "react";
import { CarProps } from "@/types";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

// Komponent do wyświetlania pojedynczej informacji o aucie
const DetailItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-700">
        <h4 className="font-semibold capitalize text-slate-600 dark:text-slate-400">{label}</h4>
        <p className="font-medium text-slate-900 dark:text-white">{value || "N/A"}</p>
    </div>
);


const CardDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [car, setCar] = useState<CarProps | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("/images/fallback-car.webp");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchSpecificCar = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/car/${id}`);
        if (!res.ok) throw new Error("Car not found");
        const carDetail = await res.json();
        setCar(carDetail);

        // Bezpieczna obsługa obrazów
        let imageList: string[] = [];
        if (Array.isArray(carDetail.imageFiles)) {
            imageList = carDetail.imageFiles;
        } else if (typeof carDetail.imageFiles === "string") {
            try {
                const parsed = JSON.parse(carDetail.imageFiles);
                if (Array.isArray(parsed)) imageList = parsed;
            } catch {}
        }

        setImages(imageList);
        if (imageList.length > 0) {
            setMainImage(imageList[0]);
        }

      } catch (error) {
        console.error("Something went wrong", error);
        toast.error("Failed to fetch car details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecificCar();
  }, [id]);

  if (isLoading) {
      return <div className="text-center py-40">Loading details...</div>
  }

  if (!car) {
    return <div className="text-center py-40">Could not find car details.</div>;
  }

  return (
    <motion.section 
        className="relative max-w-[1440px] mx-auto pt-24 md:pt-32 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* --- Galeria Zdjęć --- */}
            <div className="lg:w-1/2 w-full">
                <div className="bg-gray-100 dark:bg-slate-800/50 rounded-2xl overflow-hidden aspect-square">
                    <Image
                        src={mainImage}
                        alt={car.carTitle || "Main car image"}
                        width={1024}
                        height={1024}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        priority
                    />
                </div>
                {images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {images.map((img, index) => (
                            <div 
                                key={index} 
                                className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${mainImage === img ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setMainImage(img)}
                            >
                                <Image
                                    src={img}
                                    alt={`Car thumbnail ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- Szczegóły Pojazdu --- */}
            <div className="lg:w-1/2 w-full">
                <h1 className="font-bold text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#456efd] to-[#00377b] dark:from-pink-500 dark:to-violet-600">{car.carTitle}</h1>
                <p className="text-gray-700 dark:text-gray-400 mt-2 text-lg">{car.model} | {car.year}</p>

                {/* --- SEKCJA Z CENĄ I LICYTACJĄ --- */}
                <div className="mt-8 p-6 bg-white dark:bg-slate-800/50 rounded-2xl border dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-400">Current Bid</p>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white mt-1">
                        ${(car.currentBid || 0).toLocaleString('en-US')}
                    </p>
                    {car.buyItNowPrice && (
                         <p className="text-slate-600 dark:text-slate-400 mt-2">
                            Buy It Now: <span className="font-bold text-slate-800 dark:text-slate-200">${car.buyItNowPrice.toLocaleString('en-US')}</span>
                         </p>
                    )}
                    <button className="w-full mt-4 bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300 text-lg shadow-lg">
                        Place a Bid
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Vehicle Specifications</h3>
                    <DetailItem label="VIN" value={car.vin} />
                    <DetailItem label="Lot Number" value={car.lotNumber} />
                    <DetailItem label="Odometer" value={car.odometer ? `${car.odometer.toLocaleString('en-US')} mi` : 'N/A'} />
                    <DetailItem label="Body Style" value={car.bodyStyle} />
                    <DetailItem label="Drive" value={car.drive} />
                    <DetailItem label="Engine Cylinders" value={car.cylinders} />
                    <DetailItem label="Fuel Type" value={car.fuelType} />
                    <DetailItem label="Transmission" value={car.transmission} />
                    <DetailItem label="Color" value={car.color} />
                    <DetailItem label="Primary Damage" value={car.primaryDamage} />
                    <DetailItem label="Secondary Damage" value={car.secondaryDamage} />
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-800/50 rounded-2xl">
                     <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Description</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-lg">
                     {`This is a ${car.year} ${car.make} ${car.model} with primary damage listed as '${car.primaryDamage || 'N/A'}'. Please review all photos and specifications before bidding.`}
                    </p>
                </div>
            </div>
        </div>
    </motion.section>
  );
};

export default CardDetails;

