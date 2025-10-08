'use client';

import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Komponent do animacji samej liczby (bez zmian)
const AnimatedNumber = ({ value }: { value: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? <CountUp end={value} duration={2.5} separator=" " /> : 0}
    </div>
  );
};

// Główny komponent
const OfferCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/car/count');
        if (!res.ok) {
          throw new Error(`Błąd serwera: ${res.status}`);
        }
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Nie udało się pobrać liczby ofert:', error);
        setCount(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  // Prosty, tekstowy loader na czas ładowania (bez zmian)
  if (isLoading) {
    return (
      <div className="flex items-baseline gap-3">
        <p className="text-5xl font-bold text-gray-500">...</p>
      </div>
    );
  }

  // Nie renderuj niczego, jeśli wystąpił błąd (bez zmian)
  if (count === null) {
    return null;
  }

  // Ostateczny wygląd z wprowadzonymi zmianami
  return (
    <div className="flex items-baseline gap-3">
      {/* 👇 TUTAJ WPROWADZONO ZMIANY 👇 */}
     
     <div className="flex flex-col items-center gap-1">
  {/* 1. Neonowa liczba z efektem poświaty */}
  <div className="text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] tabular-nums">
    <AnimatedNumber value={count} />
  </div>

  {/* 2. Napis w stylu iOS */}
  <p className="text-xl font-normal text-gray-500 dark:text-gray-400">
    Trwających aukcji!
  </p>
</div>

    </div>
  );
};

export default OfferCount;