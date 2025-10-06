'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  page: number;
  totalPages: number;
}

const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', newPage.toString());
    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded-md ${i === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50">
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 mx-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
