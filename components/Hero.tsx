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
    <section className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center overflow-hidden">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 pt-28 xl:pt-36">
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

      <div className="flex-1 w-full h-[350px] sm:h-[500px] xl:h-screen relative">
        <Image
          src={"/images/usa-main-car.webp"}
          alt="hero"
          quality={100}
          fill
          // ✅ POPRAWKA: Uproszczono i poprawiono klasy dla obrazka
          className="object-contain w-[90%] h-full mx-auto xl:w-full"
          priority // Dodano dla szybszego ładowania
          sizes="(max-width: 1280px) 90vw, 50vw"
        />
      </div>
    </section>
  );
};

// ✅ POPRAWKA: Stworzono komponent nadrzędny, aby poprawnie renderować obie sekcje
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