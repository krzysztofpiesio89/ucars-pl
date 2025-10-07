'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface TopBarContextType {
  isTopBarVisible: boolean;
  toggleTopBar: () => void;
}

const TopBarContext = createContext<TopBarContextType | undefined>(undefined);

export const TopBarProvider = ({ children }: { children: ReactNode }) => {
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);

  const toggleTopBar = useCallback(() => {
    setIsTopBarVisible(prev => !prev);
  }, []);

  return (
    <TopBarContext.Provider value={{ isTopBarVisible, toggleTopBar }}>
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
