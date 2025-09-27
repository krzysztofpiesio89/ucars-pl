"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Car360ViewerProps {
  linkNumber: string;
  detailUrl: string; // Potrzebny do linku zwrotnego
  onClose: () => void;
}

const Car360Viewer = ({ linkNumber, detailUrl, onClose }: Car360ViewerProps) => {
  // Stan do śledzenia statusu widoku 360
  const [viewStatus, setViewStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    // Funkcja sprawdzająca, czy pierwsze zdjęcie z serii 360 istnieje
    const checkViewExists = async () => {
      try {
        const firstImageUrl = `https://mediaretriever.iaai.com/api/ThreeSixtyImageRetriever?tenant=iaai&partitionKey=${linkNumber}&imageOrder=1`;
        const response = await fetch(firstImageUrl, { method: 'HEAD' }); // Używamy HEAD dla wydajności

        if (response.ok) {
          setViewStatus('success');
        } else {
          console.warn(`Widok 360 dla aukcji ${linkNumber} nie istnieje (status: ${response.status})`);
          setViewStatus('error');
        }
      } catch (error) {
        console.error("Błąd sieciowy podczas sprawdzania widoku 360:", error);
        setViewStatus('error');
      }
    };

    checkViewExists();
  }, [linkNumber]);

  // Inicjalizacja skryptu tylko jeśli widok istnieje
  useEffect(() => {
    if (viewStatus === 'success' && window.CI360) {
      window.CI360.init();
    }
  }, [viewStatus]);

  const dataFolderUrl = `https://mediaretriever.iaai.com/api/ThreeSixtyImageRetriever?tenant=iaai&partitionKey=${linkNumber}`;

  return (
    <>
      {/* Skrypt jest ładowany warunkowo, tylko jeśli będzie potrzebny */}
      {viewStatus === 'success' && (
         <Script
            src="https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/latest/js-cloudimage-360-view.min.js"
            onLoad={() => {
              if (window.CI360) {
                window.CI360.init();
              }
            }}
         />
      )}
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
          className="relative w-full max-w-4xl p-4 bg-slate-900/80 rounded-2xl border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Przycisk zamykania jest zawsze widoczny */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-20 p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
            aria-label="Zamknij"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Ładowanie */}
          {viewStatus === 'loading' && (
            <div className="flex flex-col items-center justify-center h-64 text-white">
              <svg className="animate-spin h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Sprawdzanie dostępności widoku 360°...</p>
            </div>
          )}

          {/* Błąd / Brak widoku */}
          {viewStatus === 'error' && (
             <div className="flex flex-col items-center justify-center h-64 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Widok 360° jest niedostępny</h3>
                <p className="text-slate-300 mb-4">Dla tego pojazdu nie udostępniono interaktywnego widoku.</p>
                <Link 
                  href={detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Zobacz pojazd na stronie IAAI
                </Link>
             </div>
          )}

          {/* Sukces - renderowanie widoku 360 */}
          {viewStatus === 'success' && (
            <div
              className="cloudimage-360"
              data-folder={dataFolderUrl}
              data-filename-x="&imageOrder={index}"
              data-amount-x="12"
              data-autoplay="true"
              data-play-once="true"
              data-speed="150"
              data-drag-speed="200"
              data-spin-reverse="true"
            ></div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

declare global {
  interface Window {
    CI360: any;
  }
}

export default Car360Viewer;

