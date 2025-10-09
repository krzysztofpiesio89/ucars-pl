'use client';
import { CustomButton, OfferCount } from "@/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from 'framer-motion';

const Hero = () => {
  const { data: session } = useSession();
  const isUser = session?.user;

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-900 flex justify-center items-center">
      
      {/* --- KROK 1: Nowe animowane tło --- */}
      {/* Kontener na "bloby", umieszczony z tyłu (z-0) */}
      <div className="absolute inset-0 z-0">
        {/* Każdy motion.div to osobny, animowany "blob" z gradientem */}
        <motion.div
          className="absolute top-[10%] left-[10%] w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-40"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[5%] w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-30"
          animate={{
            x: [0, -40, 50, 0],
            y: [0, 60, -30, 0],
            rotate: [0, -120, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 5,
          }}
        />
         <motion.div
          className="absolute bottom-[45%] right-[40%] w-60 h-60 bg-sky-500 rounded-full filter blur-3xl opacity-40"
          animate={{
            x: [0, 40, -50, 0],
            y: [0, -60, 30, 0],
            rotate: [0, 90, -180],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        />
      </div>

      {/* --- KROK 2: Treść sekcji Hero (bez zmian) --- */}
      {/* Kontener z treścią, umieszczony na wierzchu (z-10) */}
      <div className="relative z-10 flex flex-col justify-center items-center container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold">
          {isUser && (
            <span className="block text-2xl font-medium text-gray-300 mb-4 truncate">
              Hey🙋‍♀️, {session.user?.name?.split(" ")[0]}
            </span>
          )}
          Wygraj aukcje,{' '}
          <span className="text-red-500">
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