'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'USD' | 'PLN';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rate: number | null;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [rate, setRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/currency');
        if (!response.ok) {
          throw new Error('Failed to fetch currency rate');
        }
        const data = await response.json();
        setRate(data.rate);
      } catch (error) {
        console.error(error);
        // W przypadku błędu, można ustawić domyślny kurs
        setRate(4.0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRate();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};