'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TopBarContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

export const TopBarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <TopBarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </TopBarContext.Provider>
  );
};

export const useTopBar = () => {
  const context = useContext(TopBarContext);
  if (context === undefined) {
    throw new Error('useTopBar must be used within a TopBarProvider');
  }
  return context;
};
