"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarProps } from "@/types";
import VideoPlayer from "./VideoPlayer";
import Car360Viewer from "./Car360Viewer";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

// Mały komponent do wyświetlania szczegółów w siatce
const InfoPill = ({ label, value }: { label: string; value: string | undefined | null }) => (
    <div className="text-xs">
        <span className="font-semibold text-slate-500 dark:text-slate-400">{label}: </span>
        <span className="text-slate-700 dark:text-white font-medium">{value || 'N/A'}</span>
    </div>
);

const CarCard = ({ car }: { car: CarProps }) => {
    const { data: session } = useSession();
    const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
    const [is360ViewerOpen, setIs360ViewerOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

    const isIAAI = car.detailUrl.includes('iaai.com');
    const auctionSiteName = isIAAI ? "IAAI" : "Copart";
    
    // Wyodrębnij numer aukcji z URL za pomocą useMemo, aby uniknąć zbędnych obliczeń
    const linkNumberFor360 = useMemo(() => {
        if (!isIAAI || !car.detailUrl) return null;
        try {
            const segments = car.detailUrl.split('/');
            const lastSegment = segments.pop() || '';
            const linkNumber = lastSegment.split('~')[0];
            return linkNumber || null;
        } catch (error) {
            console.error("Błąd parsowania detailUrl w CarCard:", error);
            return null;
        }
    }, [isIAAI, car.detailUrl]);


    // TODO: W przyszłości zaimplementuj sprawdzanie statusu ulubionych przy ładowaniu komponentu
    const handleFavoriteClick = async () => {
        if (!session?.user?.id) {
          toast.error("Musisz się zalogować, aby dodać do ulubionych.");
          return;
        }
    
        setIsLoadingFavorite(true);
    
        try {
          const response = await fetch('/api/favorites', {
            method: isFavorite ? 'DELETE' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: parseInt(session.user.id, 10),
              carId: car.id, // Assuming car object has an id from the DB
            }),
          });
    
          if (response.ok) {
            setIsFavorite(!isFavorite);
            toast.success(isFavorite ? "Usunięto z ulubionych!" : "Dodano do ulubionych!");
          } else {
            const data = await response.json();
            toast.error(data.message || "Wystąpił błąd.");
          }
        } catch (error) {
          toast.error("Błąd sieci. Spróbuj ponownie.");
        } finally {
          setIsLoadingFavorite(false);
        }
    };

    const formatPrice = (price: string | number | null | undefined) => {
        if (price === null || price === undefined) return "N/A";
        const priceString = String(price);
        const number = parseFloat(priceString.replace(/[^0-9.]/g, ''));
        return isNaN(number) ? priceString : `$${number.toLocaleString('en-US')}`;
    };

    const formatAuctionDate = (dateString: string | null | undefined) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "Nieprawidłowa data";

            return new Intl.DateTimeFormat('pl-PL', {
                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
            }).format(date);
        } catch (error) {
            console.error("Błąd formatowania daty:", error);
            return "Błąd daty";
        }
    };

    const currentBid = formatPrice(car.bidPrice);
    const buyNowPrice = car.buyNowPrice ? formatPrice(car.buyNowPrice) : null;
    const auctionDate = formatAuctionDate(car.auctionDate);

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
                        {isIAAI && (
                            <button 
                                onClick={() => setIs360ViewerOpen(true)} 
                                disabled={!linkNumberFor360}
                                className="p-1.5 bg-black/50 rounded-full hover:bg-black/75 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                                aria-label="Otwórz widok 360"
                            >
                                <Image src="/icons/360-degrees.svg" alt="360 view icon" width={20} height={20} />
                            </button>
                        )}
                        {car.videoUrl && (
                            <button onClick={() => setIsVideoPlayerOpen(true)} className="p-1.5 bg-black/50 rounded-full hover:bg-black/75 transition-colors" aria-label="Odtwórz wideo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                  <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5z" />
                                  <path d="M19.94 18.75l-2.69-2.69V7.94l2.69-2.69A1.5 1.5 0 0121 9v6a1.5 1.5 0 01-1.06 1.44z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <button onClick={handleFavoriteClick} disabled={isLoadingFavorite} className="absolute top-2 left-2 z-10 p-1.5 bg-black/50 rounded-full hover:bg-black/75 transition-colors disabled:opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 transition-colors ${isFavorite ? 'text-red-500' : 'text-white'}`}>
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-.597 15.185 15.185 0 01-3.044-2.03.563.563 0 01-.1-.177l-.053-.082A7.21 7.21 0 015 9.064a7.21 7.21 0 012.355-5.397 7.21 7.21 0 015.397-2.355 7.21 7.21 0 015.397 2.355 7.21 7.21 0 012.355 5.397 7.21 7.21 0 01-2.03 3.044 15.185 15.185 0 01-3.044 2.03.563.563 0 01-.1.177l-.053-.082-.022-.012-.007.003-.002.001a.752.752 0 01-.704 0l-.002-.001z" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                        {car.year} {car.make} {car.model}
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 border-t border-slate-200 dark:border-slate-700 pt-2">
                        <InfoPill label="Przebieg" value={car.mileage} />
                        <InfoPill label="Uszkodzenie" value={car.damageType} />
                        <InfoPill label="Status" value={car.engineStatus} />
                        <InfoPill label="Lot" value={car.stock} />
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-3">
                        <div className="flex items-center justify-center gap-2 text-base font-bold -mt-1 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 dark:text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {auctionDate ? (
                                <span className="text-blue-600 dark:text-pink-400">Aukcja: {auctionDate}</span>
                            ) : (
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Data aukcji nieustalona</span>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Aktualna oferta</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">{currentBid}</p>
                                   {buyNowPrice && (
                                      <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Kup Teraz: {buyNowPrice}</p>
                                   )}
                            </div>
                            <Link
                                href={car.detailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600"
                            >
                                <span>Obejrzyj na {auctionSiteName}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        </div>
                        <Link href={`/auction/${car.id}`} className="w-full">
                            <button className="w-full bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300">
                                Licytuj z Nami
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
            {is360ViewerOpen && linkNumberFor360 && (
                <Car360Viewer
                    linkNumber={linkNumberFor360}
                    detailUrl={car.detailUrl}
                    onClose={() => setIs360ViewerOpen(false)}
                />
            )}
        </>
    );
};

export default CarCard;

