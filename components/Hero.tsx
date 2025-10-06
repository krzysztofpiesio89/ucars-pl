'use client';
import { useState, useEffect, useRef } from 'react';
import { CustomButton } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

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
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      <AnimatePresence>
        {isVideoVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed top-0 left-0 w-full h-full z-0"
          >
            <video
              src="/videos/hero-background.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center text-center text-white p-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold">
          {isUser && (
            <span className="block text-2xl font-medium text-gray-300 mb-4 truncate">
              Hey🙋‍♀️, {session.user?.name?.split(" ")[0]}
            </span>
          )}
          Wygraj aukcje, spełniaj marzenia.
        </h1>

        <p className="text-xl md:text-2xl mt-6 mb-8 text-gray-200">
          Kup samochód z USA bez stresu.
          Wygraj aukcje i ciesz się nowym autem w kilka tygodni!
        </p>

        <Link href={"#explore"}>
          <CustomButton
            title="Trwające aukcje"
            type="button"
            containerStyle="text-white bg-blue-600 hover:bg-blue-700 rounded-full text-lg px-8 py-3"
          />
        </Link>
      </div>
    </section>
  );
};

export default Hero;