'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Komponenty Ikon SVG ---

const EyeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const GavelIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m14 13-7.5 7.5" />
        <path d="m18 9-1.5 1.5" />
        <path d="m12 15 6 6" />
        <path d="m3 3 7.5 7.5" />
        <path d="m15 12-1.5 1.5" />
        <path d="M7.5 20.5 3 16l6-6L13.5 14l-6 6Z" />
    </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);


// --- Dane do osi czasu ---

const steps = [
    {
        icon: EyeIcon,
        title: "Transparentność na każdym etapie",
        description: "Od pierwszego kontaktu po finalne dostarczenie samochodu, każda decyzja i każdy koszt są klarownie przedstawione. U nas nie ma ukrytych opłat ani niespodzianek — tylko pełna kontrola i pewność.",
        borderColor: "border-pink-500",
        imageUrl: "images/how-it-work/guard.webp"
    },
    {
        icon: ShieldCheckIcon,
        title: "Bezpieczeństwo i profesjonalizm",
        description: "Działamy zgodnie z najlepszymi praktykami, a każdy samochód przechodzi dokładną weryfikację. Dbamy o Twój interes tak, jakby był naszym własnym.",
        borderColor: "border-blue-500",
        imageUrl: "images/how-it-work/safety.webp"
    },
    {
        icon: GavelIcon,
        title: "Licytacje i sprowadzanie aut",
        description: "Umożliwiamy udział w amerykańskich licytacjach w pełni zdalnie, dając Ci dostęp do wyjątkowych okazji. Proces jest prosty, bezpieczny i w pełni transparentny.",
        borderColor: "border-pink-500",
        imageUrl: "images/how-it-work/import.webp"
    },
    {
        icon: StarIcon,
        title: "Ekskluzywne podejście dla wymagających",
        description: "Rozumiemy, że nasi klienci oczekują najwyższej jakości. Każdy projekt traktujemy indywidualnie, oferując wsparcie na każdym etapie. W UCARS każdy klient jest VIP-em.",
        borderColor: "border-blue-500",
        imageUrl: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1932&auto=format&fit=crop"
    }
];

// --- Definicje Animacji ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};


// --- Główny Komponent ---

const HowWeWorkPage = () => {
    return (
        <section className="w-full bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 py-20 md:py-28">
                {/* Nagłówek */}
                <motion.div
                    className="text-center mb-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-4">
                        Jak Pracujemy
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
                        W UCARS traktujemy import samochodów z USA jak sztukę — z precyzją, transparentnością i dbałością o każdy detal.
                    </p>
                </motion.div>

                {/* Sekcje z obrazami */}
                <motion.div
                    className="space-y-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            variants={itemVariants}
                        >
                            {/* Obraz */}
                            <motion.div 
                                className="w-full md:w-5/12"
                                whileHover={{ scale: 1.03 }}
                            >
                                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <img src={step.imageUrl} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
                                </div>
                            </motion.div>

                            {/* Treść */}
                            <div className="w-full md:w-7/12">
                                <div className="flex items-center mb-4">
                                    <div className={`w-12 h-12 bg-white dark:bg-slate-900 rounded-full border-4 ${step.borderColor} flex items-center justify-center mr-4 flex-shrink-0`}>
                                        <step.icon className="w-6 h-6 text-slate-800 dark:text-slate-200" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                                        {step.title}
                                    </h2>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-lg pl-16">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Wezwanie do Działania (CTA) */}
                <motion.div
                    className="text-center mt-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Gotowy na swoje wymarzone auto?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8">
                        Przeglądaj tysiące ofert na żywo i znajdź pojazd idealny dla siebie. Twoja przygoda zaczyna się tutaj.
                    </p>
                    <motion.a
                        href="/view-all"
                        className="inline-block bg-gradient-to-r from-blue-500 to-pink-500 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-transform duration-300 ease-in-out"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Zobacz Aukcje
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default HowWeWorkPage;

