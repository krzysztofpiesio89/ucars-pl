// components/DynamicImageGallery.tsx

"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface DynamicImageGalleryProps {
  initialImageUrl: string;
  altText: string;
}

const DynamicImageGallery = ({ initialImageUrl, altText }: DynamicImageGalleryProps) => {
  const [images, setImages] = useState<string[]>([initialImageUrl]);
  const [mainImage, setMainImage] = useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Funkcja generująca URL dla kolejnego zdjęcia na podstawie indeksu
  const generateImageUrl = (url: string, index: number): string | null => {
    // Używamy wyrażenia regularnego, aby znaleźć i podmienić numer zdjęcia (np. ~I1~)
    const regex = /(~I)\d+(~)/;
    if (!url.match(regex)) {
      return null; // Zwróć null, jeśli URL nie pasuje do wzorca
    }
    return url.replace(regex, `$1${index}$2`);
  };

  useEffect(() => {
    const fetchAllImages = async () => {
      // Zaczynamy sprawdzanie od drugiego zdjęcia, bo pierwsze już mamy
      let currentIndex = 2;
      let hasMoreImages = true;
      const loadedImages: string[] = [];

      while (hasMoreImages) {
        const nextImageUrl = generateImageUrl(initialImageUrl, currentIndex);

        if (!nextImageUrl) {
            hasMoreImages = false;
            break;
        }

        try {
          // Używamy fetch, aby sprawdzić, czy obrazek istnieje
          const response = await fetch(nextImageUrl);
          if (response.ok) {
            // Jeśli status to 200 OK, dodajemy URL do listy
            loadedImages.push(nextImageUrl);
            currentIndex++;
          } else {
            // Jeśli jakikolwiek inny status (np. 404), kończymy pętlę
            hasMoreImages = false;
          }
        } catch (error) {
          console.error("Błąd podczas sprawdzania zdjęcia:", error);
          hasMoreImages = false;
        }
      }

      // Aktualizujemy stan o nowe, znalezione zdjęcia
      if (loadedImages.length > 0) {
        setImages(prev => [...prev, ...loadedImages]);
      }
      setIsLoading(false);
    };

    fetchAllImages();
    // Chcemy, żeby ten efekt uruchomił się tylko raz, gdy initialImageUrl się zmieni
  }, [initialImageUrl]);

  return (
    <div>
      {/* Główne zdjęcie */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            <Image
              src={mainImage}
              alt={altText}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Miniaturki */}
      <div className="mt-4">
        {isLoading && images.length <= 1 && <p className="text-sm text-slate-500">Wczytywanie dodatkowych zdjęć...</p>}
        <div className="flex gap-2 overflow-x-auto p-2 -ml-2">
          {images.map((imgSrc) => (
            <button
              key={imgSrc}
              onClick={() => setMainImage(imgSrc)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-200 ${mainImage === imgSrc ? 'ring-2 ring-blue-500 dark:ring-pink-500' : 'hover:opacity-80'}`}
            >
              <Image
                src={imgSrc.replace("retriever", "resizer").replace(/width=\d+&height=\d+/, "width=161&height=120")} // Używamy resizera dla miniaturek
                alt={`Miniaturka ${altText}`}
                fill
                className="object-cover"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicImageGallery;