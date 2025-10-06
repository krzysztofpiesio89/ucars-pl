'use client';

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import ThemeSwitcher from "./theme/ThemeSwitcher";
import { BsX, BsInstagram, BsFacebook } from "react-icons/bs";
import { useTheme } from "next-themes";
import { RiMenu3Line } from "react-icons/ri";

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
    const id = session?.user?.id;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };
        setupProviders();
    }, []);

    return (
        // --- POPRAWKA ---
        // Usunięto "sticky top-0 z-50", ponieważ rodzic <header> zarządza teraz pozycjonowaniem.
        <nav className={`w-full transition-colors duration-300 ${
            isScrolled 
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md' 
                : 'bg-transparent'
        }`}>
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-16">
                <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                    <Image
                        src="/logo/logo2.png"
                        alt="uCars.pl - Strona główna"
                        width={40}
                        height={40}
                        className="h-10 w-auto"
                        priority
                    />
                    <span className="text-2xl font-bold tracking-tight">
                        uCars<span className="text-red-600">.pl</span>
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
                            <button onClick={() => { signIn(); setIsDropdownShown(false); }} className="text-left font-medium">
                                Zaloguj się
                            </button>
                        )}

                        <hr className="dark:border-gray-700 my-2" />
                        
                        <SocialLinks />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;