"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { useEffect } from "react";

interface Car360ViewerProps {
  stockNumber: string;
  onClose: () => void;
}

/**
 * Komponent wyświetlający interaktywny widok 360 stopni w modalnym oknie.
 * Używa zewnętrznej biblioteki Cloudimage 360 View.
 */
const Car360Viewer = ({ stockNumber, onClose }: Car360ViewerProps) => {
  
  // Inicjalizacja widoku 360 po załadowaniu skryptu
  useEffect(() => {
    // Sprawdzamy, czy biblioteka jest dostępna w obiekcie window
    if (window.CI360) {
      window.CI360.init();
    }
  }, []);

  const dataFolderUrl = `https://mediaretriever.iaai.com/api/ThreeSixtyImageRetriever?tenant=iaai&partitionKey=${stockNumber}`;

  return (
    <>
      {/* Skrypt biblioteki Cloudimage 360 View ładowany z CDN */}
      <Script
        src="https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js"
        onLoad={() => {
          // Ponowna inicjalizacja po załadowaniu skryptu
          if (window.CI360) {
            window.CI360.init();
          }
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-4xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Kontener dla widoku 360, skonfigurowany zgodnie z dokumentacją IAAI */}
          <div
            className="cloudimage-360"
            data-folder={dataFolderUrl}
            data-filename-x="&imageOrder={index}"
            data-amount-x="12" // IAAI zazwyczaj dostarcza 12 klatek
            data-autoplay="true"
            data-play-once="true"
            data-speed="150"
            data-drag-speed="200"
            data-spin-reverse="true"
          ></div>
           <button
              onClick={onClose}
              className="absolute top-0 right-0 z-10 p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              aria-label="Zamknij widok 360"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </motion.div>
      </motion.div>
    </>
  );
};

// Deklaracja globalnego obiektu, aby TypeScript nie zgłaszał błędu
declare global {
  interface Window {
    CI360: any;
  }
}

export default Car360Viewer;
