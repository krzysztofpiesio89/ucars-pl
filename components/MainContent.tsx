'use client';

import { useTopBar } from '@/context/TopBarContext';
import { ReactNode } from 'react';

const MainContent = ({ children }: { children: ReactNode }) => {
  const { isTopBarVisible } = useTopBar();

  return (
    <div className={`transition-all duration-300 ease-in-out ${isTopBarVisible ? 'pt-28' : 'pt-16'} pb-20`}>
      {children}
    </div>
  );
};

export default MainContent;