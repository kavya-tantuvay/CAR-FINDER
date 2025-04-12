import { useMemo } from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Memoize page numbers to prevent recalculation on each render
  const pageNumbers = useMemo(() => {
    if (totalPages <= 0) return [];
    
    const pages = [];
    const maxVisiblePages = 5; // Number of page buttons to show
    
    // If fewer than maxVisiblePages, show all
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    // Always include first page, last page, current page, and pages around current
    pages.push(1); // First page
    
    // Pages around current
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis if needed before middle pages
    if (start > 2) {
      pages.push('...');
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed after middle pages
    if (end < totalPages - 1) {
      pages.push('...');
    }
    
    pages.push(totalPages); // Last page
    
    return pages;
  }, [currentPage, totalPages]);

  // Don't render pagination if there are no pages
  if (totalPages <= 0) {
    return null;
  }

  return (
    <nav aria-label="Pagination Navigation" className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Prev
      </button>
      
      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 py-1" aria-hidden="true">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white dark:bg-blue-500'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        aria-label="Go to next page"
        className="px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
      >
        Next
      </button>
    </nav>
  );
}