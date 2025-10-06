"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link"; // ✅ 1. Dodano import komponentu Link

// Komponent ikony (bez zmian)
const FeatureIcon = ({ children }: { children: ReactNode }) => (
  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-pink-900/50 text-blue-500 dark:text-pink-400 rounded-full flex items-center justify-center">
    {children}
  </div>
);

const ImportProcess = () => {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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

  const processSteps = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
      title: "Inteligentne Licytacje",
      description: "Określ swoją maksymalną ofertę, a nasz automat licytacyjny zajmie się resztą, walcząc o najlepszą cenę bez Twojego udziału."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>,
      title: "Pełna Obsługa Logistyczna",
      description: "Organizujemy wszystko: od bezpiecznego transportu w USA, przez fracht morski, aż po dostawę auta lawetą prosto pod Twój dom."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: "Formalności? Zostaw to Nam!",
      description: "Bierzemy na siebie cały ciężar formalności – od przygotowania dokumentacji, przez odprawę celną, aż po opłacenie cła, VAT i akcyzy."
    },
  ];

  return (
    <section
      id="import_process"
      className="max-w-7xl mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
      >
        {/* Kolumna z obrazem (bez zmian w ścieżce) */}
        <motion.div
          variants={imageVariants}
          whileHover={{ scale: 1.03 }}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/shipping-containers.webp"
            alt="Proces importu samochodu z uCars.pl"
            fill
            quality={95}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* Kolumna z tekstem */}
        {/* ✅ 2. Cała kolumna tekstowa owinięta w div z półprzezroczystym tłem */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <motion.div
                // Ten kontener również używa containerVariants, aby animować swoje dzieci (h2, p, ul) jedno po drugim
                variants={containerVariants}
                className="flex flex-col justify-center"
            >
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                >
                    Import z USA. Prościej niż myślisz.
                </motion.h2>
                <motion.p
                    variants={itemVariants}
                    className="text-lg text-slate-700 dark:text-slate-300 mb-8"
                >
                    W uCars.pl licytujesz łatwo i bezpiecznie. Ty wybierasz auto, a my przeprowadzimy Cię przez cały proces. Od licytacji aż od odbioru auta i jego legalizacji.
                </motion.p>

                <ul className="space-y-6">
                    {processSteps.map((step, index) => (
                    <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-4"
                    >
                        <FeatureIcon>{step.icon}</FeatureIcon>
                        <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            {step.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">
                            {step.description}
                        </p>
                        </div>
                    </motion.li>
                    ))}
                </ul>
                
                {/* ✅ 3. Dodany przycisk "Zobacz szczegóły" */}
                <motion.div variants={itemVariants} className="mt-10">
                    <Link
                        href="/import-guide"
                        className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Zobacz szczegóły
                    </Link>
                </motion.div>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ImportProcess;