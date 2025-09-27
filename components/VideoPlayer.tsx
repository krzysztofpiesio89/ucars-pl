"use client";

import { motion } from "framer-motion";
import React from "react";

// --------------------------------------------------------------------
// Komponent odtwarzacza wideo (dostarczony przez Ciebie)
// --------------------------------------------------------------------

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoPlayer = ({ videoUrl, onClose }: VideoPlayerProps) => {
  return (
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
        className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <video src={videoUrl} controls autoPlay className="w-full aspect-video">
          Twoja przeglądarka nie obsługuje tagu wideo.
        </video>
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

// --------------------------------------------------------------------
// NOWY KOMPONENT Z LOGIKĄ PORÓWNYWANIA
// --------------------------------------------------------------------

interface ConditionalVideoPlayerProps {
  iaaiUrl: string;
  videoUrl: string;
  onClose: () => void;
}

/**
 * Wyświetla odtwarzacz wideo tylko wtedy, gdy numery ID
 * w linkach iaaiUrl i videoUrl są identyczne.
 */
const ConditionalVideoPlayer = ({
  iaaiUrl,
  videoUrl,
  onClose,
}: ConditionalVideoPlayerProps) => {
  
  /**
   * Wyodrębnia numer ID z podanego adresu URL za pomocą wyrażenia regularnego.
   * @param url - Adres URL do przeszukania.
   * @param regex - Wyrażenie regularne z jedną grupą przechwytującą numer.
   * @returns Wyodrębniony numer jako string lub null, jeśli nie znaleziono.
   */
  const extractId = (url: string, regex: RegExp): string | null => {
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Wyciągamy ID z obu linków
  const iaaiId = extractId(iaaiUrl, /\/(\d+)~/);
  const videoId = extractId(videoUrl, /\/media\/(\d+)_VES/);

  // Sprawdzamy, czy oba ID istnieją i czy są takie same
  const shouldShowVideo = iaaiId && videoId && iaaiId === videoId;

  if (shouldShowVideo) {
    return <VideoPlayer videoUrl={videoUrl} onClose={onClose} />;
  }

  // Jeśli warunki nie są spełnione, nic nie renderuj
  return null;
};

export default ConditionalVideoPlayer;