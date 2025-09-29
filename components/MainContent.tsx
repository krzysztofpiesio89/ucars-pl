'use client';

import { useTopBar } from '@/context/TopBarContext';
import { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useTopBar();

  // h-16 for Navbar (4rem) + h-10 for TopBar (2.5rem) approx = 6.5rem. pt-28 is 7rem.
  // When closed, only Navbar height remains (4rem). pt-16 is 4rem.
  return (
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'pt-28' : 'pt-16'}`}>
      {children}
    </div>
  );
};

export default MainContent;
