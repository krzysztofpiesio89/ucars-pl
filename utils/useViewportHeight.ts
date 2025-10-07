'use client';

import { useEffect } from 'react';

const useViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh(); // Set initial value

    return () => window.removeEventListener('resize', setVh);
  }, []);
};

export default useViewportHeight;
