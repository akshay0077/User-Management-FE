import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  // Function to render pagination items
  const renderPaginationItems = () => {
    return Array(pageCount)
      .fill(null)
      .map((_, index) => (
        <Pagination.Item
          key={index}
          active={page === index + 1}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ));
  };

  return (
    <>
      {pageCount > 0 && (
        <div className="pagination_div d-flex justify-content-end mx-5">
          <Pagination>
            <Pagination.Prev onClick={handlePrevious} />
            {renderPaginationItems()}
            <Pagination.Next onClick={handleNext} />
          </Pagination>
        </div>
      )}
    </>
  );
};

export default Paginations;
