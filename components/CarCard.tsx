"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarProps } from "@/types";
import VideoPlayer from "./VideoPlayer";
import Car360Viewer from "./Car360Viewer"; // Importujemy nowy komponent 360

// Mały komponent do wyświetlania szczegółów w siatce
const InfoPill = ({ label, value }: { label: string; value: string | undefined | null }) => (
    <div className="text-xs">
        <span className="font-semibold text-slate-500 dark:text-slate-400">{label}: </span>
        <span className="text-slate-700 dark:text-white font-medium">{value || 'N/A'}</span>
    </div>
);


const CarCard = ({ car }: { car: CarProps }) => {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [is360ViewerOpen, setIs360ViewerOpen] = useState(false); // Stan dla widoku 360

  const isIAAI = car.detailUrl.includes('iaai.com'); // Sprawdzamy, czy auto pochodzi z IAAI

  // Funkcja do bezpiecznego formatowania ceny
  const formatPrice = (price: string | number | null | undefined) => {
      if (price === null || price === undefined) return "N/A";
      const priceString = String(price);
      const number = parseFloat(priceString.replace(/[^0-9.]/g, ''));
      return isNaN(number) ? priceString : `$${number.toLocaleString('en-US')}`;
  };

  const currentBid = formatPrice(car.bidPrice);
  const buyNowPrice = car.buyNowPrice ? formatPrice(car.buyNowPrice) : null;

  return (
    <>
      <div className="relative w-full max-w-sm mx-auto bg-white dark:bg-slate-800/50 dark:border-slate-700/70 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl border group overflow-hidden">
          <span className="absolute top-0 left-[-100%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent transition-all group-hover:left-[100%] group-hover:duration-700" />
          
          <div className="relative w-full h-48 overflow-hidden">
              <Image
                  src={car.imageUrl || "/images/fallback-car.webp"}
                  alt={`${car.make} ${car.model}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "/images/fallback-car.webp"; }}
              />
              <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
                  {/* Przycisk widoku 360 (tylko dla aut z IAAI) */}
                  {isIAAI && (
                      <button
                        onClick={() => setIs360ViewerOpen(true)}
                        className="p-1.5 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
                        aria-label="Otwórz widok 360"
                      >
                          <Image
                            src="/icons/360-degrees.svg"
                            alt="360 view icon"
                            width={20}
                            height={20}
                          />
                      </button>
                  )}
                  {/* Przycisk wideo */}
                  {car.videoUrl && (
                      <button
                        onClick={() => setIsVideoPlayerOpen(true)}
                        className="p-1.5 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
                        aria-label="Odtwórz wideo"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                              <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                          </svg>
                      </button>
                  )}
              </div>
          </div>

          <div className="p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {car.year} {car.make} {car.model}
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                  <InfoPill label="Przebieg" value={car.mileage} />
                  <InfoPill label="Uszkodzenie" value={car.damageType} />
                  <InfoPill label="Status" value={car.engineStatus} />
                  <InfoPill label="Lot" value={car.stock} />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Aktualna oferta</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{currentBid}</p>
                       {buyNowPrice && (
                           <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Kup Teraz: {buyNowPrice}</p>
                       )}
                  </div>
                  <Link href={car.detailUrl} target="_blank" rel="noopener noreferrer">
                      <button className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300">
                          Licytuj
                      </button>
                  </Link>
              </div>
          </div>
      </div>
      
      {isVideoPlayerOpen && car.videoUrl && (
        <VideoPlayer 
          videoUrl={car.videoUrl} 
          onClose={() => setIsVideoPlayerOpen(false)} 
        />
      )}
      {/* Warunkowe renderowanie widoku 360 */}
      {is360ViewerOpen && isIAAI && (
        <Car360Viewer
          stockNumber={car.stock}
          onClose={() => setIs360ViewerOpen(false)}
        />
      )}
    </>
  );
};

export default CarCard;

