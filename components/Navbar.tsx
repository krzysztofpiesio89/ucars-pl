"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import ThemeSwitcher from "./theme/ThemeSwitcher";
// ✅ 1. Zaktualizowano importy ikon
import { BsX, BsInstagram, BsFacebook } from "react-icons/bs";
import { useTheme } from "next-themes";
import { RiMenu3Line } from "react-icons/ri";
import TopBar from "./TopBar";

// ✅ 2. Stworzono reużywalny komponent dla linków społecznościowych
const SocialLinks = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-4 ${className}`}>
        <Link href={"https://x.com/TWOJ_PROFIL"} target="_blank" aria-label="Odwiedź nasz profil na X">
            <BsX className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" />
        </Link>
        <Link href={"https://instagram.com/TWOJ_PROFIL"} target="_blank" aria-label="Odwiedź nasz profil na Instagramie">
            <BsInstagram className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" />
        </Link>
        <Link href={"https://facebook.com/TWOJ_PROFIL"} target="_blank" aria-label="Odwiedź nasz profil na Facebooku">
            <BsFacebook className="h-5 w-5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" />
        </Link>
    </div>
);


const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const { theme } = useTheme();
  const isUser = session?.user;
  const id = session?.user.id;

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  return (
    <nav className="fixed z-50 left-0 right-0 top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-b-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-16">
        <Link href={"/"}>
          <span className="text-xl md:text-2xl text-blue-600 font-bold dark:text-white">
           { process.env.NEXT_PUBLIC_APP_NAME || "uCars.pl" }
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={"/view-all"} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <span>Wyszukaj</span>
          </Link>
          <Link href={"/#import_process"} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
            <span>Jak to działa?</span>
          </Link>

          {isUser ? (
            <div className="flex items-center gap-4">
              <Link href={`/favorites/${id}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                <span>Ulubione</span>
              </Link>
              <Link href={`/profile`}>
                <Image
                  src={session?.user?.image || "/images/user-fallback.png"}
                  alt="Zdjęcie profilowe"
                  width={32}
                  height={32}
                  className="cursor-pointer rounded-full"
                />
              </Link>
              <CustomButton
                title="Wyloguj"
                type="button"
                handleClick={() => signOut()}
                containerStyle="bg-blue-600 text-white rounded-full text-sm px-4 py-2 hover:bg-blue-700"
              />
            </div>
          ) : (
            <CustomButton
                title="Zaloguj się"
                type="button"
                handleClick={() => signIn()}
                containerStyle="bg-blue-600 text-white rounded-full text-sm px-4 py-2 hover:bg-blue-700"
            />
          )}

          {/* ✅ 3. Sekcja z ikonami i przełącznikiem motywu */}
          <div className="flex items-center gap-4 border-l dark:border-slate-700 ml-4 pl-4">
            <SocialLinks />
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeSwitcher />
          <button onClick={() => setIsDropdownShown((prev) => !prev)} aria-label="Otwórz menu">
            <RiMenu3Line size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {isDropdownShown && (
          <div className="bg-white/90 dark:bg-gray-800/90 border dark:border-zinc-700 w-[calc(100%-2rem)] rounded-lg shadow-xl backdrop-blur-md absolute top-20 right-4 p-5 flex flex-col gap-4 text-left md:hidden z-50">
            <Link href={"/view-all"} onClick={() => setIsDropdownShown(false)} className="font-medium">Wyszukaj</Link>
            <Link href={"/#import_process"} onClick={() => setIsDropdownShown(false)} className="font-medium">Jak to działa?</Link>
            
            <hr className="dark:border-gray-700 my-2" />
            
            {isUser ? (
              <>
                <Link href={`/favorites/${id}`} onClick={() => setIsDropdownShown(false)} className="font-medium">Ulubione</Link>
                <Link href={"/profile"} className="flex items-center font-medium" onClick={() => setIsDropdownShown(false)}>
                  <Image
                    src={session?.user?.image || "/images/user-fallback.png"}
                    alt="Zdjęcie profilowe"
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                  <span className="ml-2">Mój Profil</span>
                </Link>
                <button onClick={() => { signOut(); setIsDropdownShown(false); }} className="text-left font-medium text-red-500">
                  Wyloguj
                </button>
              </>
            ) : (
              <Link href={"/user/login"} onClick={() => setIsDropdownShown(false)} className="font-medium">
                Zaloguj się
              </Link>
            )}
            
            <hr className="dark:border-gray-700 my-2" />
            
            {/* ✅ 4. Linki społecznościowe w menu mobilnym */}
            <SocialLinks />
          </div>
        )}
      </div>
      <TopBar />
    </nav>
  );
};

export default Navbar;