// components/AboutUs.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Komponent ikony (bez zmian)
const FeatureIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-pink-900/50 text-blue-500 dark:text-pink-400 rounded-full flex items-center justify-center">
    {children}
  </div>
);

const AboutUs = () => {
  // Warianty animacji dla różnych elementów
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2, // Opóźnienie dla każdego kolejnego dziecka
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="about_us"
      className="max-w-[1440px] mx-auto py-16 md:py-24 px-4 md:px-16 light dark:dark"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center"
      >
        {/* Kolumna z obrazem */}
        <motion.div
          variants={imageVariants}
          whileHover={{ scale: 1.03, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative w-full h-[350px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl order-first lg:order-last"
        >
          <Image
            src="/images/car-import-process.webp"
            alt="Proces importu samochodu z USA"
            fill
            quality={95}
            className="object-cover"
          />
        </motion.div>

        {/* Kolumna z tekstem */}
        {/* POPRAWKA: Zmieniono 'div' na 'motion.div', aby umożliwić dziedziczenie animacji */}
        <motion.div
          variants={itemVariants} // Ten kontener też subtelnie się animuje
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
            className="text-lg text-slate-600 dark:text-slate-400 mb-8"
          >
            Jesteśmy zespołem pasjonatów motoryzacji...
          </motion.p>

          <ul className="space-y-6">
            {[
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: "Pasja i Doświadczenie",
                description: "Znamy rynek aut z USA od podszewki..."
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: "Pełna Transparentność",
                description: "U nas nie ma ukrytych kosztów..."
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1zM3 11h10" /></svg>,
                title: "Obsługa od A do Z",
                description: "Zajmujemy się wszystkim: transportem..."
              },
            ].map((feature, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {feature.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;