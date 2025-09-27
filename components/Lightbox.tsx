// components/Lightbox.tsx
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

const Lightbox = ({ imageUrl, onClose }: LightboxProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        {/* Przycisk zamykania */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl z-50"
          aria-label="Zamknij podgląd"
        >
          &times;
        </button>

        {/* Kontener na zdjęcie, aby umożliwić padding */}
        <div className="relative w-full h-full p-4 md:p-8 lg:p-16">
          <Image
            src={imageUrl}
            alt="Podgląd zdjęcia w pełnym rozmiarze"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;