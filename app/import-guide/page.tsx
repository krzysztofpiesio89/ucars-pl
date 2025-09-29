"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- Wewnętrzne, stylizowane komponenty dla tej strony ---

// Komponent sekcji z animacją
const Section = ({ children }: { children: React.ReactNode }) => {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-12 md:mb-16"
    >
      {children}
    </motion.section>
  );
};

// Karta z informacją o opłacie teraz akceptuje ikonę
const CostCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <div className="bg-white/50 dark:bg-slate-800/50 p-6 rounded-xl border border-gray-200 dark:border-slate-700 backdrop-blur-sm h-full">
        <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 text-blue-600 dark:text-pink-400 w-7 h-7">{icon}</div>
            <h4 className="text-xl font-bold text-blue-600 dark:text-pink-400">{title}</h4>
        </div>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </div>
);


// --- Główny komponent strony ---

const ImportGuidePage = () => {
    // Definicje ikon
    const checkIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    const percentIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-8.5m-5.5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM19.5 20a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z" /></svg>;
    const shieldIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
    const calculatorIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM4.5 21V5.75A2.25 2.25 0 016.75 3.5h10.5a2.25 2.25 0 012.25 2.25v15.25a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 21z" /></svg>;
    const truckIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-17.25 4.5h16.5M6 12h12" /></svg>;

  return (
    <main className="relative overflow-hidden light dark:dark dark:bg-slate-900 backdrop-blur-3xl backdrop-filter text-slate-800 dark:text-slate-200 py-16 md:py-24">
       {/* Efekty świetlne tła, takie same jak na stronie głównej */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 dark:bg-gradient-radial from-blue-500/50 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 dark:bg-gradient-radial from-pink-500/40 to-transparent rounded-full blur-3xl animate-pulse animation-delay-3000" />

      <div className="relative max-w-4xl mx-auto px-4 z-10">

        {/* --- Nagłówek w stylu Hero --- */}
        <Section>
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-radial from-[#456efd] to-[#00377b,#017cd0] dark:from-amber-400 dark:to-orange-600">
            Przewodnik po Imporcie Aut z USA
          </h1>
          <p className="text-xl md:text-2xl text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            W uCars.pl wierzymy w pełną transparentność. Poniżej znajdziesz wszystkie informacje, które pomogą Ci podjąć świadomą decyzję.
          </p>
        </Section>

        {/* --- Dlaczego warto? --- */}
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#456efd] to-[#00377b] dark:from-pink-500 dark:to-violet-600">Dlaczego import z USA się opłaca?</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            Marzysz o wyjątkowym aucie z bogatym wyposażeniem, którego nie znajdziesz w Europie? Stany Zjednoczone to prawdziwa kopalnia motoryzacyjnych perełek. Samochody z rynku amerykańskiego często przewyższają europejskie odpowiedniki jakością i specyfikacją. Kluczowym argumentem jest jednak cena – oszczędności mogą sięgać nawet 40% w porównaniu do tych samych modeli dostępnych w Polsce.
          </p>
        </Section>

        {/* --- Jakie auta wybierać? --- */}
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#456efd] to-[#00377b] dark:from-pink-500 dark:to-violet-600">Jakie pojazdy warto importować?</h2>
           <div className="space-y-6">
                <CostCard
                    icon={checkIcon}
                    title="Auta luksusowe i sportowe"
                    description="Im wyższa wartość pojazdu, tym większe oszczędności. Import aut premium, takich jak Ford Mustang, Dodge Charger czy Chevrolet Camaro, jest najbardziej opłacalny."
                />
                 <CostCard
                    icon={checkIcon}
                    title="Pojazdy lekko uszkodzone"
                    description="Niewielka stłuczka w USA często kwalifikuje auto do sprzedaży przez ubezpieczalnię po bardzo atrakcyjnej cenie. Transparentna historia uszkodzeń eliminuje ryzyko ukrytych wad, a koszty naprawy w Polsce są znacznie niższe."
                />
                 <CostCard
                    icon={checkIcon}
                    title="Klasyki i auta zabytkowe"
                    description="Sprowadzenie pojazdu starszego niż 30 lat wiąże się ze zwolnieniem z cła i akcyzy, co czyni import klasyków niezwykle atrakcyjnym. To szansa na posiadanie unikalnego fragmentu historii motoryzacji."
                />
           </div>
        </Section>

        {/* --- Koszty --- */}
        <Section>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#456efd] to-[#00377b] dark:from-pink-500 dark:to-violet-600">Struktura kosztów importu</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                Na całkowity koszt sprowadzenia pojazdu składa się kilka kluczowych opłat. W uCars.pl dbamy o to, by cały proces był dla Ciebie w pełni przejrzysty.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CostCard icon={percentIcon} title="19% VAT (Niemcy)" description="Najczęstsza opcja odprawy celnej w porcie w Bremerhaven."/>
                <CostCard icon={shieldIcon} title="10% Cło" description="Standardowa stawka dla samochodów osobowych."/>
                <CostCard icon={calculatorIcon} title="Akcyza (3.1% lub 18.6%)" description="Zależna od pojemności silnika (do 2.0L lub powyżej)."/>
                <CostCard icon={truckIcon} title="Koszty dodatkowe" description="Obejmują opłaty aukcyjne, transport lądowy w USA, fracht morski oraz transport do Polski."/>
            </div>
        </Section>

        {/* --- Obrazek kobiety z autem --- */}
        <Section>
            <motion.div 
                className="relative flex justify-center items-end h-64 md:h-80 -mb-12 md:-mb-16 z-20"
                animate={{
                    translateY: ["0%", "-3%", "0%"],
                }}
                transition={{
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                 <Image
                    src="/images/ucars-eksluzywneauta.webp"
                    alt="Szczęśliwa kobieta z nowym samochodem z USA"
                    width={500}
                    height={320}
                    className="object-contain"
                />
            </motion.div>
        </Section>

        {/* --- Zakończenie i CTA --- */}
        <Section>
             <div className="relative text-center bg-white/50 dark:bg-slate-800/50 pt-20 p-8 rounded-2xl border border-gray-200 dark:border-slate-700 backdrop-blur-sm">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#456efd] to-[#00377b] dark:from-pink-500 dark:to-violet-600">Gotowy na swoje auto marzeń?</h2>
                <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                    Wiesz już wszystko, co potrzebne, by świadomie rozpocząć proces. Nasz zespół jest gotowy, aby Ci w tym pomóc.
                </p>
                <Link href="/#explore">
                    <button className="text-white bg-blue-500 dark:bg-pink-500 font-bold py-3 px-8 rounded-full hover:bg-blue-600 dark:hover:bg-pink-600 transition-colors duration-300 text-lg shadow-lg hover:shadow-xl">
                        Przejdź do aukcji
                    </button>
                </Link>
             </div>
        </Section>

      </div>
    </main>
  );
};

export default ImportGuidePage;

