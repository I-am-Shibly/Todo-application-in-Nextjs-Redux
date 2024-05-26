export const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="text-blue-500 disabled:text-gray-400 transition-colors duration-200 hover:text-blue-700"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="text-blue-500 disabled:text-gray-400 transition-colors duration-200 hover:text-blue-700"
      >
        Next
      </button>
    </div>
  );
};
