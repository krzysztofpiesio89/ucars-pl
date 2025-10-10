'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// --- Komponenty Ikon SVG ---
const RocketIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.11S5.34 9.66 4.5 9.5" /><path d="m9 15 6-6" /><path d="M14.5 9.5c.66.84 2.3.89 3.11.05 1.26-1.5 2-5 2-5s-3.74.5-5 2c-.84.71-.89 2.3-.05 3.11Z" /></svg>
);
const PiggyBankIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1z" /><path d="M10.73 19.5c-4.43-1.47-5.73-6.68-4.26-11.11A6.87 6.87 0 0 1 12 4.07a6.87 6.87 0 0 1 5.53 4.32c1.47 4.43.17 9.64-4.26 11.11" /><path d="M5.5 14.5a3 3 0 0 0 3 3" /><path d="M19 12a3 3 0 1 1-6 0" /></svg>
);
const ArmchairIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 9V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M4 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M18 11H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" /><path d="M7 19v-2" /><path d="M17 19v-2" /></svg>
);
const ShieldCheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
);

// --- Dane i Animacje ---
const benefits = [
    { title: "Gwarancja spokoju", Icon: ShieldCheckIcon },
    { title: "Licytuj w swoim budżecie", Icon: PiggyBankIcon },
    { title: "Wygrywaj wymarzone auta", Icon: RocketIcon },
    { title: "Odbieraj pod domem", Icon: ArmchairIcon },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, filter: 'blur(5px)' },
    visible: {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

// --- Główny Komponent ---
const WhyUsCarAnimation = () => {
    return (
        <section className="relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-slate-900 text-white text-center p-6">
            <div className="absolute inset-0 z-0 opacity-50">
                {/* ZMIANA: Poniższe animacje są ukryte na małych ekranach i widoczne od rozdzielczości 'lg' (1024px) w górę */}
                <motion.div
                    className="hidden lg:block absolute top-0 left-0 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl"
                    animate={{ x: [-100, 100, -100], y: [-100, 100, -100], rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 40, repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.div
                    className="hidden lg:block absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"
                    animate={{ x: [100, -100, 100], y: [100, -100, 100], rotate: [0, -180, -360], scale: [1, 1.1, 1] }}
                    transition={{ duration: 35, repeat: Infinity, repeatType: "mirror", delay: 5 }}
                />
            </div>
            
            <motion.div
                className="relative z-10 flex flex-col items-center pt-24"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold tracking-tighter"
                    variants={itemVariants}
                >
                    Twoje Wymarzone Auto z USA.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
                        Prościej Niż Myślisz.
                    </span>
                </motion.h1>

                <motion.p
                    className="mt-6 max-w-2xl text-lg md:text-xl text-slate-300"
                    variants={itemVariants}
                >
                    Importujemy, załatwiamy formalności i dostarczamy pod Twój dom.
                    Ty wybierasz, my zajmujemy się resztą.
                </motion.p>

                <motion.div variants={itemVariants} className="mt-10">
                    <Link href="/view-all" legacyBehavior>
                        <a className="bg-white text-slate-900 font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                            Zobacz Dostępne Aukcje
                        </a>
                    </Link>
                </motion.div>

                <motion.div
                    className="mt-20 flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-4"
                    variants={containerVariants}
                >
                    {benefits.map(({ title, Icon }) => (
                        <motion.div
                            key={title}
                            className="flex items-center gap-3 text-slate-300"
                            variants={itemVariants}
                        >
                            <Icon className="w-8 h-8 text-slate-400" />
                            <span className="font-medium text-lg whitespace-nowrap">{title}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default WhyUsCarAnimation;