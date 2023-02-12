import React, { useEffect, useState } from 'react';

// svg icons
//import sprite from "../styles/img/sprite.svg";

const Pagination = ({ perPage, total, onPageChange, currentPage }) => {
  const [page, setPage] = useState(currentPage);
  const pageCount = Math.ceil(total / perPage);

  // TODO - try calling onPageChange in useEffect instead of in the handle function
  const handlePrev = () => {
    setPage(page - 1);
    onPageChange(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
    onPageChange(page + 1);
  };
  return (
    <div className="pagination">
      <button
        className="btn btn-default-background btn-small pagination__button pagination__button-prev"
        onClick={handlePrev}
        disabled={page <= 1}
      >
        {/* <svg className="pagination__icon icon  icon-prev">
          <use href={sprite + "#icon-arrow-left2"} />
        </svg>{" "} */}
        Prev
      </button>
      <span className="pagination__text">
        {page} of {pageCount}
      </span>{' '}
      <button
        className="btn btn-default-background btn-small pagination__button pagination__button-next"
        onClick={handleNext}
        disabled={page >= pageCount}
      >
        Next
        {/* <svg className="pagination__icon  icon icon-next">
          <use href={sprite + "#icon-arrow-right2"} />
        </svg> */}
      </button>
    </div>
  );
};

export default Pagination;
