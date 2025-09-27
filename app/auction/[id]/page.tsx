"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CarProps } from "@/types";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

import VideoPlayer from "@/components/VideoPlayer";
import Car360Viewer from "@/components/Car360Viewer";
import Lightbox from "@/components/Lightbox";
import { generateIAAIImages } from "@/utils/iaaiUtils";

const LicytujPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: session, status: sessionStatus } = useSession();
  const [car, setCar] = useState<CarProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [is360ViewerOpen, setIs360ViewerOpen] = useState(false);
  const [maxBid, setMaxBid] = useState('');
  
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      setIsMainImageLoading(true);
      try {
        const res = await fetch(`/api/car/${id}`);
        if (!res.ok) throw new Error("Nie znaleziono samochodu");
        const carDetail = await res.json();
        setCar(carDetail);
        setMainImage(carDetail.imageUrl);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
        toast.error("Nie udało się załadować szczegółów pojazdu.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleThumbnailClick = (hdUrl: string) => {
    if (hdUrl === mainImage) return;
    setIsMainImageLoading(true);
    setMainImage(hdUrl);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Twoja maksymalna oferta ${maxBid} USD została przyjęta. Skontaktujemy się z Tobą.`);
  };

  const isIAAI = car?.detailUrl.includes('iaai.com');
  const isLoggedIn = sessionStatus === 'authenticated';
  
  const images = useMemo(() => {
    if (isIAAI && car?.imageUrl) {
      return generateIAAIImages(car.imageUrl, 11);
    }
    return [];
  }, [isIAAI, car?.imageUrl]);

  if (isLoading || sessionStatus === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Ładowanie...</div>;
  }

  if (!car) {
    return <div className="flex justify-center items-center min-h-screen">Nie znaleziono pojazdu.</div>;
  }

  return (
    <>
      <motion.main
        className="relative max-w-[1440px] mx-auto pt-24 md:pt-32 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Kolumna ze zdjęciem i galerią */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">{car.year} {car.make} {car.model}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Numer LOT: {car.stock}</p>
            
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mt-6 shadow-lg group bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {isMainImageLoading && (
                <div className="absolute z-10">
                  <svg className="animate-spin h-8 w-8 text-blue-500 dark:text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}

              {mainImage && (
                <Image
                  key={mainImage}
                  src={mainImage}
                  alt={`${car.make} ${car.model}`}
                  fill
                  priority
                  className={`object-cover transition-opacity duration-300 ${isMainImageLoading ? 'opacity-0' : 'opacity-100'}`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onLoad={() => setIsMainImageLoading(false)}
                />
              )}
              
              {!isMainImageLoading && mainImage && (
                 <div 
                   onClick={() => setIsLightboxOpen(true)}
                   className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-12 h-12">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                   </svg>
                 </div>
              )}
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleThumbnailClick(img.hdUrl)}
                    className={`relative w-full aspect-video rounded-lg overflow-hidden shadow cursor-pointer border-2 transition-all ${mainImage === img.hdUrl ? 'border-blue-500' : 'border-transparent hover:border-slate-400'}`}
                  >
                    <Image
                      src={img.thumbUrl}
                      alt={`Miniaturka zdjęcia ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="15vw"
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center gap-4 mt-6">
              {car.videoUrl && (
                <button onClick={() => setIsVideoPlayerOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" /></svg>
                  Zobacz Wideo
                </button>
              )}
              {isIAAI && (
                 <button onClick={() => setIs360ViewerOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-pink-400 transition-colors">
                  <Image src="/icons/360-degrees.svg" alt="360 view icon" width={20} height={20} className="dark:invert"/>
                  Zobacz 360°
                </button>
              )}
            </div>
          </div>

          {/* Kolumna z licytacją */}
          <div className="bg-white dark:bg-slate-800/50 border dark:border-slate-700 rounded-2xl p-6 lg:p-8 flex flex-col">
            {isLoggedIn ? (
              <form onSubmit={handleBidSubmit}>
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-pink-500 dark:to-violet-500 mb-4">
                  Licytuj z uCars.pl
                </h2>
                <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <div>
                        <p className="text-slate-600 dark:text-slate-400">Aktualna oferta</p>
                        <p className="text-4xl font-bold text-slate-900 dark:text-white mt-1">${(car.bidPrice || 0).toLocaleString('en-US')}</p>
                    </div>
                    <div>
                        <label htmlFor="maxBid" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Twoja maksymalna oferta (USD)</label>
                        <input
                            type="number"
                            name="maxBid"
                            id="maxBid"
                            value={maxBid}
                            onChange={(e) => setMaxBid(e.target.value)}
                            required
                            min={(car.bidPrice || 0) + 1}
                            placeholder={`Wpisz więcej niż ${(car.bidPrice || 0).toLocaleString('en-US')}`}
                            className="w-full pl-4 py-2.5 border bg-transparent rounded-lg outline-none dark:border-slate-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-pink-500 transition-all"
                        />
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-blue-50 dark:bg-slate-900/50 rounded-lg">
                        <p className="font-semibold mb-1">Jak to działa?</p>
                        <p>Po złożeniu oferty, skontaktujemy się z Tobą, aby sfinalizować wpłatę **zwrotnej kaucji**. Po jej opłaceniu, to my będziemy licytować w Twoim imieniu aż do podanej kwoty, dbając o cały proces importu.</p>
                    </div>
                </div>
                <div className="mt-auto pt-6">
                    <button type="submit" className="w-full bg-blue-600 text-white text-base font-bold py-3 px-6 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300 shadow-lg">
                      Złóż ofertę i przejdź do kaucji
                    </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-pink-500 dark:to-violet-500 mb-4">
                  Rozpocznij Licytację
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Aby wziąć udział w licytacji, musisz posiadać aktywne konto i wpłaconą kaucję zwrotną.
                </p>
                <div className="space-y-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-pink-900/50 text-blue-600 dark:text-pink-400 rounded-full flex items-center justify-center font-bold text-lg">1</div>
                    <div><h3 className="font-semibold text-slate-900 dark:text-white">Zarejestruj się lub Zaloguj</h3></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-pink-900/50 text-blue-600 dark:text-pink-400 rounded-full flex items-center justify-center font-bold text-lg">2</div>
                    <div><h3 className="font-semibold text-slate-900 dark:text-white">Wpłać Kaucję Zwrotną</h3></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-pink-900/50 text-blue-600 dark:text-pink-400 rounded-full flex items-center justify-center font-bold text-lg">3</div>
                    <div><h3 className="font-semibold text-slate-900 dark:text-white">Licytuj z Nami!</h3></div>
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <Link href="/user/login" className="w-full block">
                    <button className="w-full bg-blue-600 text-white text-base font-bold py-3 px-6 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300 shadow-lg">
                      Zaloguj się i Wpłać Kaucję
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.main>

      {isLightboxOpen && mainImage && (
        <Lightbox imageUrl={mainImage} onClose={() => setIsLightboxOpen(false)} />
      )}
      {isVideoPlayerOpen && car.videoUrl && (
        <VideoPlayer videoUrl={car.videoUrl} onClose={() => setIsVideoPlayerOpen(false)} />
      )}
      {is360ViewerOpen && isIAAI && (
        <Car360Viewer stockNumber={car.stock} onClose={() => setIs360ViewerOpen(false)} />
      )}
    </>
  );
};

export default LicytujPage;