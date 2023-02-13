import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const Pagination = ({ perPage, total, onPageChange, currentPage }) => {
  const [page, setPage] = useState(currentPage);
  const pageCount = Math.ceil(total / perPage);

  const handlePrev = () => {
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return (
    <div className="pagination">
      <button
        className="btn btn-default-background btn-small pagination__button pagination__button-prev"
        onClick={handlePrev}
        disabled={page <= 1}
      >
        <Icon size={20} icon="arrow-left2" className="icon" />
        Prev
      </button>
      <span className="pagination__text">
        {page} of {pageCount}
      </span>
      <button
        className="btn btn-default-background btn-small pagination__button pagination__button-next"
        onClick={handleNext}
        disabled={page >= pageCount}
      >
        Next
        <Icon size={20} icon="arrow-right2" className="icon" />
      </button>
    </div>
  );
};

export default Pagination;
