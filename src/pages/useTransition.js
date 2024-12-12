import React, { useState, useTransition, useMemo } from "react";

// Simulate a large dataset
const generateData = () => Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
const allItems = generateData();

function PaginatedList() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const ITEMS_PER_PAGE = 20;

  // Memoize the filtered items to avoid re-computation
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => item.toLowerCase().includes(filter.toLowerCase()));
  }, [filter]);

  // Calculate the current page items
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Handle filtering
  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    startTransition(() => {
      setFilter(newFilter);
      setCurrentPage(1); // Reset to page 1 whenever the filter changes
    });
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    startTransition(() => {
      setCurrentPage(newPage);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Paginated Filtered List</h1>
      
      <input
        type="text"
        placeholder="Filter items..."
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      
      {isPending && <div>Updating list...</div>}

      <ul style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredItems.length / ITEMS_PER_PAGE)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default PaginatedList;
