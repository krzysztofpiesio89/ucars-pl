'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomButton } from '@/components';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const images = [
  '/images/hero-carousel/1.webp',
  '/images/hero-carousel/2.webp',
  '/images/hero-carousel/3.webp',
];

const Hero = () => {
  const { data: session } = useSession();
  const isUser = session?.user;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden dark:bg-gray-900">
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto p-4 gap-8">
        
        {/* === KONTENER Z TREŚCIĄ TEKSTOWĄ === */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            {isUser && (
              <span className="block text-2xl font-medium text-gray-600 dark:text-gray-300 mb-4 truncate">
                Hey🙋‍♀️, {session.user?.name?.split(' ')[0]}
              </span>
            )}
            Wygraj aukcje, spełniaj marzenia.
          </h1>

          <p className="text-lg md:text-xl mt-6 mb-8 text-gray-600 dark:text-gray-300">
            Kup samochód z USA bez stresu. Wygraj aukcje i ciesz się nowym autem w kilka tygodni!
          </p>

          <Link href={'#explore'}>
            <CustomButton
              title="Trwające aukcje"
              type="button"
              containerStyle="text-white bg-blue-600 hover:bg-blue-700 rounded-full text-lg px-8 py-3"
            />
          </Link>
        </div>

        {/* === KONTENER Z KARUZELĄ === */}
        <div className="lg:w-1/2 w-full h-64 sm:h-80 md:h-96 relative mt-8 lg:mt-0">
          <AnimatePresence>
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="absolute w-full h-full"
            >
              <Image
                src={images[currentImage]}
                alt="Samochód z aukcji w USA"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-2xl"
                priority={currentImage === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;
