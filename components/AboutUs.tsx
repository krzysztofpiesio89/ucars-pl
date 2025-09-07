"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

// Komponent ikony (bez zmian)
const FeatureIcon = ({ children }: { children: ReactNode }) => (
    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-pink-900/50 text-blue-500 dark:text-pink-400 rounded-full flex items-center justify-center">
        {children}
    </div>
);

// Dane dla listy cech (bez zmian)
const features = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        title: "Pasja i Doświadczenie",
        description: "Znamy rynek aut z USA od podszewki, co pozwala nam znajdować najlepsze okazje i unikać pułapek."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        title: "Pełna Transparentność",
        description: "U nas nie ma ukrytych kosztów. Przedstawiamy pełen raport i wszystkie opłaty na samym początku."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>,
        title: "Obsługa od A do Z",
        description: "Zajmujemy się wszystkim: od licytacji, przez transport, po odprawę celną i dostawę pod Twój dom."
    },
];


const AboutUs = () => {
    // Warianty animacji (bez zmian)
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: "easeOut" } 
        },
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            id="about_us"
            className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
            >
                {/* Kolumna z obrazem (bez zmian) */}
                <motion.div
                    variants={imageVariants}
                    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl order-first lg:order-last"
                >
                    <Image
                        src="/images/car-import-process.webp"
                        alt="Proces importu samochodu z USA"
                        fill
                        quality={95}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                </motion.div>

                {/* Kolumna z tekstem */}
                {/* ✅ GŁÓWNA ZMIANA: Dodano div z półprzezroczystym tłem */}
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-lg">
                    <motion.div
                        variants={containerVariants}
                        className="flex flex-col justify-center"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                        >
                            Kim Jesteśmy i Dlaczego Warto Nam Zaufać?
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-700 dark:text-slate-300 mb-8"
                        >
                            Jesteśmy zespołem pasjonatów motoryzacji, którzy przekształcili swoje hobby w profesjonalną usługę. Naszą misją jest uproszczenie procesu importu wymarzonego samochodu z USA, czyniąc go dostępnym, bezpiecznym i w pełni transparentnym dla każdego klienta.
                        </motion.p>

                        <motion.ul variants={itemVariants} className="space-y-6">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <FeatureIcon>{feature.icon}</FeatureIcon>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                                            {feature.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default AboutUs;