"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CarProps } from "@/types";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Zaktualizowany typ dla danych rozliczeniowych
interface BillingDetails {
  accountType: 'INDIVIDUAL' | 'BUSINESS';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  taxId?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country: string;
}

const AccountPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [favoriteCars, setFavoriteCars] = useState<CarProps[]>([]);
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    accountType: 'INDIVIDUAL',
    firstName: '',
    lastName: '',
    companyName: '',
    taxId: '',
    addressLine1: '',
    city: '',
    postalCode: '',
    country: 'Polska'
  });
  const [isLoading, setIsLoading] = useState(true);

  // Pobieranie danych po załadowaniu sesji
  useEffect(() => {
    if (status === 'authenticated' && session.user?.id) {
      const userId = session.user.id;
      
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [favRes, billRes] = await Promise.all([
            fetch(`/api/favorites?userId=${userId}`),
            fetch(`/api/user/${userId}/billing`)
          ]);

          const favData = await favRes.json();
          if (favRes.ok) {
            const cars = favData.map((fav: { car: CarProps }) => fav.car);
            setFavoriteCars(cars);
          }

          const billData = await billRes.json();
          if (billRes.ok && billData) setBillingDetails(billData);

        } catch (error) {
          toast.error("Nie udało się załadować danych konta.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [status, session]);
  
  // Przekierowanie, jeśli użytkownik nie jest zalogowany
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };
  
  const handleAccountTypeChange = (type: 'INDIVIDUAL' | 'BUSINESS') => {
    setBillingDetails(prev => ({ ...prev, accountType: type }));
  };

  const handleSaveBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    const promise = fetch(`/api/user/${session.user.id}/billing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(billingDetails),
    });

    toast.promise(promise, {
      loading: 'Zapisywanie danych...',
      success: 'Dane zostały pomyślnie zaktualizowane!',
      error: 'Nie udało się zapisać danych.',
    });
  };

  if (status === 'loading' || isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Ładowanie Twojego konta...</div>;
  }
  
  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <motion.main
      className="relative max-w-[1440px] mx-auto pt-24 md:pt-32 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8">
        Witaj, {session?.user?.name || 'Użytkowniku'}!
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Moje Licytacje</h2>
          <div className="bg-white dark:bg-slate-800/50 border dark:border-slate-700 rounded-2xl p-6">
            {favoriteCars.length > 0 ? (
              <ul className="space-y-4">
                {favoriteCars.map(car => (
                  <li key={car.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50">
                    <div className="flex items-center gap-4">
                      <Image src={car.imageUrl} alt={car.model} width={80} height={60} className="rounded-md object-cover"/>
                      <div>
                        <p className="font-semibold">{car.year} {car.make} {car.model}</p>
                        <p className="text-sm text-slate-500">LOT: {car.stock}</p>
                      </div>
                    </div>
                    <Link href={`/licytuj/${car.id}`}>
                      <button className="text-sm font-semibold text-blue-600 dark:text-pink-400">Przejdź</button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500">Nie masz jeszcze żadnych aut na liście do licytacji. Dodaj je z głównej strony!</p>
            )}
          </div>
        </div>

        <div>
           <h2 className="text-2xl font-bold mb-4">Dane i Kaucja</h2>
           <form onSubmit={handleSaveBilling} className="bg-white dark:bg-slate-800/50 border dark:border-slate-700 rounded-2xl p-6 space-y-4 mb-6">
              <h3 className="font-semibold text-lg">Twoje dane rozliczeniowe</h3>
              <p className="text-xs text-slate-500 -mt-2">Potrzebne do finalizacji transakcji.</p>
              
              {/* Przełącznik Typu Konta */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                <button type="button" onClick={() => handleAccountTypeChange('INDIVIDUAL')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${billingDetails.accountType === 'INDIVIDUAL' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500'}`}>
                  Osoba prywatna
                </button>
                <button type="button" onClick={() => handleAccountTypeChange('BUSINESS')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${billingDetails.accountType === 'BUSINESS' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500'}`}>
                  Firma
                </button>
              </div>

              {/* Pola dla Klienta Indywidualnego */}
              {billingDetails.accountType === 'INDIVIDUAL' && (
                <>
                  <input name="firstName" value={billingDetails.firstName || ''} onChange={handleInputChange} placeholder="Imię" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
                  <input name="lastName" value={billingDetails.lastName || ''} onChange={handleInputChange} placeholder="Nazwisko" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
                </>
              )}

              {/* Pola dla Klienta Biznesowego */}
              {billingDetails.accountType === 'BUSINESS' && (
                <>
                  <input name="companyName" value={billingDetails.companyName || ''} onChange={handleInputChange} placeholder="Nazwa firmy" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
                  <input name="taxId" value={billingDetails.taxId || ''} onChange={handleInputChange} placeholder="NIP" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
                </>
              )}

              {/* Wspólne pola adresowe */}
              <input name="addressLine1" value={billingDetails.addressLine1} onChange={handleInputChange} placeholder="Adres" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
              <input name="postalCode" value={billingDetails.postalCode} onChange={handleInputChange} placeholder="Kod pocztowy" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
              <input name="city" value={billingDetails.city} onChange={handleInputChange} placeholder="Miasto" required className="w-full bg-transparent border-b dark:border-slate-600 py-2 focus:outline-none"/>
              
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 dark:bg-pink-500 dark:hover:bg-pink-600 transition-colors">
                Zapisz Dane
              </button>
           </form>
           
           <div className="bg-white dark:bg-slate-800/50 border dark:border-slate-700 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">Status Kaucji</h3>
              <p className="text-2xl font-bold text-red-500 my-2">Nieopłacona</p>
              <p className="text-xs text-slate-500 mb-4">Po opłaceniu kaucji otrzymasz dane dostępowe do licytowania na stronie aukcyjnej.</p>
              <button className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition-colors">
                Opłać Kaucję Online (wkrótce)
              </button>
           </div>
        </div>
      </div>
    </motion.main>
  );
};

export default AccountPage;

