'use client';
import { CustomButton } from "@/components";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  '/images/hero-carousel/1.webp',
  '/images/hero-carousel/2.webp',
];

const Hero = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const isUser = session?.user;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-[1440px] mx-auto relative flex flex-col md:flex-row items-center bg-contain light dark:dark bg-no-repeat bg-bottom gradient-radial">
      <div className="flex-1 p-4 md:p-16 pt-32 md:pt-28">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-radial from-[#456efd] to-[#00377b,#017cd0] text-blue-500 dark:text-white">
          {isUser && (
            <span
              className={`text-lg ${
                theme === "dark" ? "text-pink-600" : "text-indigo-600"
              } truncate`}
            >
              Hey🙋‍♀️, {session.user?.name?.split(" ")[0]} <br />
            </span>
          )}
       Wygraj aukcje i spełnij marzenie o samochodzie z USA! Wygodnie i bezpiecznie
        </h1>

        <p className="text-xl md:text-2xl md:mt-6 mt-4 mb-4 lg:mb-8 text-slat-600 dark:text-slate-400">
         Kup samochód z USA bez stresu i ryzyka. 
          Wygraj aukcje i ciesz się nowym autem w kilka tygodni!
        </p>
        <Link href={"#explore"}>
          <CustomButton
            title="Trwające aukcje"
            type="button"
            containerStyle="text-white bg-blue-500 dark:bg-pink-500"
          />
        </Link>
      </div>

      <div className="flex items-end lg:flex-[1.25] justify-end w-full h-[590px] lg:h-screen">
        <div className="relative w-full h-full flex justify-center items-center px-[5%]">
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute w-full h-full"
            >
              <Image
                src={images[index]}
                alt="hero carousel"
                quality={100}
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Hero;