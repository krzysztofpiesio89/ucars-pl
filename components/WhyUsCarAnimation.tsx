'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- Komponenty Ikon SVG ---

const RocketIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.11S5.34 9.66 4.5 9.5" />
        <path d="m9 15 6-6" />
        <path d="M14.5 9.5c.66.84 2.3.89 3.11.05 1.26-1.5 2-5 2-5s-3.74.5-5 2c-.84.71-.89 2.3-.05 3.11Z" />
    </svg>
);

const PiggyBankIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1z" />
        <path d="M10.73 19.5c-4.43-1.47-5.73-6.68-4.26-11.11A6.87 6.87 0 0 1 12 4.07a6.87 6.87 0 0 1 5.53 4.32c1.47 4.43.17 9.64-4.26 11.11" />
        <path d="M5.5 14.5a3 3 0 0 0 3 3" />
        <path d="M19 12a3 3 0 1 1-6 0" />
    </svg>
);

const ArmchairIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 9V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M4 9V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M18 11H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
        <path d="M7 19v-2" /><path d="M17 19v-2" />
    </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);


// --- Dane Komponentu ---

const benefits = [
    { title: "Szybko", Icon: RocketIcon },
    { title: "Tanio", Icon: PiggyBankIcon },
    { title: "Wygodnie", Icon: ArmchairIcon },
    { title: "Bezpiecznie", Icon: ShieldCheckIcon }
];

const services = [
    "Pełna obsługa transportu",
    "Wszystkie formalności po naszej stronie",
    "Dostęp do zamkniętych aukcji w USA i Kanadzie",
    "Możliwość zlecenia licytacji z ceną maksymalną"
];

const testimonials = [
    {
        name: "Anna Nowak",
        location: "Kraków",
        quote: "Skorzystałam i jestem zachwycona! Wreszcie wszystko w jednym miejscu, a obsługa klienta na najwyższym poziomie. Polecam!"
    },
    {
        name: "Piotr Zieliński",
        location: "Gdańsk",
        quote: "Pełen profesjonalizm. Moje wymarzone auto dotarło pod dom bez żadnych problemów. Cały proces był transparentny i prostszy niż myślałem."
    }
];

// --- Definicje Animacji w stylu iOS ---

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: {
        y: 30,
        opacity: 0,
        filter: 'blur(8px)'
    },
    visible: {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.9,
            ease: "easeInOut"
        }
    }
};

// --- Główny Komponent ---

const WhyUCarsAnimation = () => {
    return (
        <section className="w-full py-20 bg-gray-50 dark:bg-slate-900">
            <motion.div
                className="container mx-auto px-6 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
                    variants={itemVariants}
                >
                    Dlaczego warto z <span className="text-blue-600">uCars.pl</span>?
                </motion.h2>

                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16"
                    variants={itemVariants}
                >
                    Importujemy samochody marzeń, dbając o każdy detal procesu. Twoja satysfakcja jest naszym priorytetem.
                </motion.p>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
                    variants={containerVariants}
                >
                    {benefits.map(({ title, Icon }) => (
                        <motion.div
                            key={title}
                            className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center border border-white/20"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        >
                            <Icon className="w-16 h-16 mb-4 text-blue-500" />
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                        </motion.div>
                    ))}
                </motion.div>
                
                <motion.div
                    className="text-left max-w-2xl mx-auto"
                    variants={itemVariants}
                >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Zapewniamy kompleksową obsługę:</h3>
                    <motion.ul 
                        className="space-y-4"
                        variants={containerVariants}
                    >
                        {services.map((service, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-white/20"
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                            >
                                <CheckCircleIcon className="w-7 h-7 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 dark:text-gray-300">{service}</span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.div>

                {/* NOWA SEKCJA TESTIMONIALS */}
                <motion.div
                    className="max-w-4xl mx-auto mt-20"
                    variants={itemVariants}
                >
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-10 text-center">Co mówią nasi klienci?</h3>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={containerVariants}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 flex flex-col"
                                variants={itemVariants}
                                whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                            >
                                <p className="text-gray-600 dark:text-gray-300 text-base italic mb-4 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div className="flex items-center mt-auto pt-4 border-t border-gray-200 dark:border-slate-700/50">
                                    <UserIcon className="w-10 h-10 text-gray-400 dark:text-slate-500 mr-4"/>
                                    <div>
                                        <p className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default WhyUCarsAnimation;

