'use client';
import { useState, useEffect, useRef } from 'react';
import { CustomButton, OfferCount } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from 'framer-motion';

const Hero = () => {
  const { data: session } = useSession();
  const isUser = session?.user;

  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "10px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    // ZMIANA: Sekcja zajmuje teraz całą wysokość ekranu (h-screen)
    <section ref={sectionRef} className="relative w-full bg-black overflow-hidden h-screen">
      {/* Tło wideo z optymalizacjami */}
      <motion.div
        animate={{ opacity: isVideoVisible ? 0.5 : 0 }}
        transition={{ duration: 0.7 }}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <video
          src="/videos/hero-background.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-poster.webp" // OPTYMALIZACJA: Obrazek wyświetlany podczas ładowania wideo
          preload="auto"                   // OPTYMALIZACJA: Wskazówka dla przeglądarki, by szybciej załadowała wideo
          className="w-full h-full object-cover"
        />
        {/* Nakładka przyciemniająca */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      </motion.div>

      {/* ZMIANA: Kontener z treścią centruje elementy w pionie i poziomie na całej wysokości */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold">
          {isUser && (
            <span className="block text-2xl font-medium text-gray-300 mb-4 truncate">
              Hey🙋‍♀️, {session.user?.name?.split(" ")[0]}
            </span>
          )}
          Wygraj aukcje,{' '}
          <span className="text-red-600 dark:text-red-500">
            spełniaj marzenia.
          </span>
        </h1>

        <p className="text-xl md:text-2xl mt-6 mb-8 text-gray-200 max-w-3xl">
          Kup samochód z USA bez stresu.
          Wygraj aukcje i ciesz się nowym autem w kilka tygodni!
        </p>

        <div className="my-8">
          <OfferCount />
        </div>

        <Link href={"/view-all"}>
          <CustomButton
            title="Aukcje na żywo"
            type="button"
            containerStyle="text-white bg-blue-600 hover:bg-blue-700 rounded-full text-lg px-8 py-3"
          />
        </Link>
      </div>
    </section>
  );
};

export default Hero;