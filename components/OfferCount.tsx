'use client';

import { useEffect, useState } from 'react';

const OfferCount = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/car/count');
        const data = await res.json();
        setCount(data.count);
      } catch (error) {
        console.error('Failed to fetch offer count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (isLoading) {
    return <div className="h-8 w-36 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />;
  }

  if (count === null) {
    return null; 
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
      <span>Aktualnie w ofercie:</span>
      <span className="font-bold text-gray-800 dark:text-white">{count.toLocaleString('pl-PL')}</span>
      <span>pojazdów</span>
    </div>
  );
};

export default OfferCount;
