'use client';

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

// --- Wewnętrzne komponenty stylizacyjne ---

// Nowa, stylizowana karta dla każdego kroku procesu
const ProcessStepCard = ({
  icon,
  stepNumber,
  title,
  description,
}: {
  icon: ReactNode;
  stepNumber: string;
  title: string;
  description: string;
}) => (
  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 h-full text-left">
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-pink-900/50 text-blue-500 dark:text-pink-400 rounded-full flex items-center justify-center font-bold text-xl">
        {stepNumber}
      </div>
      <div className="text-blue-500 dark:text-pink-400">{icon}</div>
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

// --- Główny komponent sekcji ---

const ImportProcess = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Dane kroków procesu (bez zmian)
  const processSteps = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>,
      title: "Inteligentne Licytacje",
      description: "Określ swoją maksymalną ofertę, a nasz automat licytacyjny zajmie się resztą, walcząc o najlepszą cenę."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>,
      title: "Pełna Obsługa Logistyczna",
      description: "Organizujemy wszystko: od transportu w USA, przez fracht morski, aż po dostawę pod Twój dom."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: "Formalności? Zostaw to Nam!",
      description: "Bierzemy na siebie cały ciężar formalności – od odprawy celnej, aż po opłacenie cła, VAT i akcyzy."
    },
  ];

  return (
    <section
      id="import_process"
      className="w-full py-16 md:py-24"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* --- KROK 1: Angażujący nagłówek i wprowadzenie --- */}
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Od aukcji w USA po kluczyki w Twojej dłoni.
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-700 dark:text-slate-300 mb-12 max-w-3xl mx-auto"
        >
          Nasz proces importu jest w pełni transparentny i zaprojektowany dla Twojej wygody. Zobacz, jak w trzech prostych krokach sprowadzamy auta marzeń.
        </motion.p>

        {/* --- KROK 2: Siatka z krokami procesu --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {processSteps.map((step, index) => (
            <motion.div variants={itemVariants} key={index}>
              <ProcessStepCard
                stepNumber={`${index + 1}`}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            </motion.div>
          ))}
        </div>
        
        {/* --- KROK 3: Wyraźne wezwanie do działania --- */}
        <motion.div variants={itemVariants}>
          <Link
            href="/import-guide"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl text-lg hover:scale-105 transform"
          >
            Poznaj każdy szczegół procesu
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ImportProcess;