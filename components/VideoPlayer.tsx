"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface VideoPlayerProps {
  iaaiUrl: string;
  onClose: () => void;
}

export const VideoPlayer = ({ iaaiUrl, onClose }: VideoPlayerProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const match = iaaiUrl.match(/VehicleDetail\/(\d+)/);
    const vehicleId = match ? match[1] : null;

    if (!vehicleId) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const url = `https://mediastorageaccountprod.blob.core.windows.net/media/${vehicleId}_VES-100_1`;
    setVideoUrl(url);

    const videoElement = document.createElement("video");
    videoElement.src = url;

    const timer = setTimeout(() => {
      setError(true);
      setIsLoading(false);
    }, 10000); // 10-sekundowy timeout

    videoElement.onloadeddata = () => {
      clearTimeout(timer);
      setIsLoading(false);
      setError(false);
    };

    videoElement.onerror = () => {
      clearTimeout(timer);
      setError(true);
      setIsLoading(false);
    };

    return () => {
      clearTimeout(timer);
    };
  }, [iaaiUrl]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl overflow-hidden aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-white text-lg font-semibold">Ładowanie wideo...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-4">
            <p className="text-white text-lg font-semibold">Wideo jest w tej chwili niedostępne.</p>
            <p className="text-slate-400">Zapraszamy do obejrzenia w serwisie{" "}
              <a
                href={iaaiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                IAAI
              </a>.
            </p>
          </div>
        )}

        {!isLoading && !error && videoUrl && (
          <video
            className="w-full h-full"
            src={videoUrl}
            controls
            autoPlay
          >
            Twoja przeglądarka nie obsługuje tagu wideo.
          </video>
        )}

        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
          aria-label="Zamknij odtwarzacz wideo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};