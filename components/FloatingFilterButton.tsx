'use client';

import Image from 'next/image';

interface FloatingFilterButtonProps {
  onClick: () => void;
}

const FloatingFilterButton = ({ onClick }: FloatingFilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center z-30 bg-blue-500 dark:bg-gradient-radial from-slate-700 to-slate-900 border dark:border-zinc-600 shadow-lg hover:ring-4 hover:ring-cyan-400/30 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-400/25 dark:hover:border-cyan-300 dark:hover:shadow-cyan-300/25 transition-all duration-300 ease-out"
    >
      <Image src="/icons/filter.svg" alt="Filter" width={32} height={32} />
    </button>
  );
};

export default FloatingFilterButton;
