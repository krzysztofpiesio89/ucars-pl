"use client";

import { CustomButton } from "@/components";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import AboutUs from "@/components/AboutUs";

const Hero = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const isUser = session?.user;

  return (
    // ✅ POPRAWKA: Zmieniono xl:flex-row na lg:flex-row dla lepszej responsywności na tabletach
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center overflow-hidden">
      
      {/* Kolumna z tekstem */}
      {/* ✅ POPRAWKA: Dodano klasy 'order' do zarządzania kolejnością */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-28 lg:pt-36 order-last lg:order-first">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white">
          {isUser && (
            <span className="block text-xl lg:text-2xl font-medium text-blue-600 dark:text-pink-500 mb-2 truncate">
              Witaj 🙋‍♀️, {session.user?.name?.split(" ")[0]}!
            </span>
          )}
          Wygraj aukcje i spełnij marzenie o samochodzie z USA!
        </h1>

        <p className="text-lg md:text-xl mt-4 mb-8 text-gray-600 dark:text-slate-400">
          Kup samochód z USA bez stresu i ryzyka. Wygraj aukcje i ciesz się nowym autem w kilka tygodni!
        </p>
        
        <Link href={"#explore"}>
          <CustomButton
            title="Trwające aukcje"
            type="button"
            containerStyle="text-white bg-blue-600 dark:bg-pink-500 rounded-full px-8 py-3 font-semibold shadow-lg hover:opacity-90 transition-opacity"
          />
        </Link>
      </div>

      {/* Kolumna z obrazkiem */}
      {/* ✅ POPRAWKA: Dodano klasy 'order' do zarządzania kolejnością */}
      <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-screen relative order-first lg:order-last">
        <Image
          src={"/images/usa-main-car.png"}
          alt="hero"
          quality={100}
          fill
          className="object-contain w-[90%] h-full mx-auto lg:w-full"
          priority
          sizes="(max-width: 1024px) 90vw, 50vw"
        />
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <main>
      <Hero />
      <AboutUs />
      {/* Tutaj możesz dodać kolejne sekcje swojej strony głównej */}
    </main>
  );
};

export default HomePage;