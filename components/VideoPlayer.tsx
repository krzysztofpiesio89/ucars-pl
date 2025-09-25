"use client";

import { motion } from "framer-motion";

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

/**
 * Komponent wyświetlający odtwarzacz wideo w modalnym oknie (overlay).
 * @param videoUrl - Adres URL do pliku wideo.
 * @param onClose - Funkcja wywoływana przy zamknięciu okna.
 */
const VideoPlayer = ({ videoUrl, onClose }: VideoPlayerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose} // Zamykanie po kliknięciu na tło
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Zapobiega zamknięciu modala po kliknięciu na wideo
      >
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full aspect-video"
        >
          Twoja przeglądarka nie obsługuje tagu wideo.
        </video>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
          aria-label="Zamknij odtwarzacz wideo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default VideoPlayer;
