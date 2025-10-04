'use client';
import { CustomButton } from "@/components";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

// Usunęliśmy karuzelę, więc stany i importy z nią związane nie są już potrzebne

const Hero = () => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const isUser = session?.user;

  return (
    // === GŁÓWNY KONTENER SEKCJI ===
    // Ustawiony na całą wysokość ekranu (min-h-screen) i pełną szerokość
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* === TŁO WIDEO === */}
      <video
        src="/videos/hero-background.mp4" // Ścieżka do Twojego wideo w folderze /public
        autoPlay
        loop
        muted
        playsInline // Ważne dla urządzeń mobilnych
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* === PRZYCIEMNIAJĄCA NAKŁADKA === */}
      {/* Kluczowa dla czytelności tekstu na wideo */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      {/* === KONTENER Z TREŚCIĄ === */}
      {/* Wyśrodkowany, z indeksem Z wyższym niż tło i nakładka */}
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
            // Ulepszony styl przycisku dla lepszego kontrastu
            containerStyle="text-white bg-blue-600 hover:bg-blue-700 rounded-full text-lg px-8 py-3"
          />
        </Link>
      </div>
    </section>
  );
};

export default Hero;