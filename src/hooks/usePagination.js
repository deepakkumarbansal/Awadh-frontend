import { useState, useEffect } from 'react';

const usePagination = (data, initialPostsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(initialPostsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPostPerPage(1);
      } else if (width < 768) {
        setPostPerPage(2);
      } else {
        setPostPerPage(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const totalPages = Math.ceil(data.length / postPerPage);
  const visibleData = data.slice(firstPostIndex, lastPostIndex);

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return {

    visibleData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
  };
};

export default usePagination;
