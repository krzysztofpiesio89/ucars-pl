'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', newPage.toString());
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const baseButtonClasses = "outline-none px-3 py-1.5 md:px-4 text-sm text-center flex items-center justify-center capitalize bg-blue-500 dark:bg-gradient-radial from-slate-700 to-slate-900 dark:text-slate-300 border dark:border-zinc-600 rounded-full hover:ring-2 hover:ring-cyan-400/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/25 dark:hover:border-cyan-300 dark:hover:shadow-cyan-300/25 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed";
  const activeButtonClasses = "ring-2 ring-cyan-400/50 border-cyan-400 shadow-lg shadow-cyan-400/30 dark:border-cyan-300 dark:shadow-cyan-300/30";
  const inactiveButtonClasses = "bg-gray-200 text-gray-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const ellipsis = <span key="ellipsis" className="px-2 py-1 mx-1">...</span>;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`${baseButtonClasses} ${i === page ? activeButtonClasses : inactiveButtonClasses}`}>
            {i}
          </button>
        );
      }
    } else {
      // Zawsze pokazuj pierwszą stronę
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`${baseButtonClasses} ${1 === page ? activeButtonClasses : inactiveButtonClasses}`}>
          {1}
        </button>
      );

      // Logika dla wielokropka na początku
      if (page > 3) {
        pageNumbers.push(ellipsis);
      }

      // Strony środkowe
      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`${baseButtonClasses} ${i === page ? activeButtonClasses : inactiveButtonClasses}`}>
            {i}
          </button>
        );
      }

      // Logika dla wielokropka na końcu
      if (page < totalPages - 2) {
        pageNumbers.push(ellipsis);
      }

      // Zawsze pokazuj ostatnią stronę
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`${baseButtonClasses} ${totalPages === page ? activeButtonClasses : inactiveButtonClasses}`}>
          {totalPages}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-12 space-x-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`${baseButtonClasses} ${inactiveButtonClasses}`}>
        &larr; Poprzednia
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`${baseButtonClasses} ${inactiveButtonClasses}`}>
        Następna &rarr;
      </button>
    </div>
  );
};

export default Pagination;
