import React, { useState, useDeferredValue } from "react";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // This will render instantly, even if the user types quickly
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search..."
      />

      {/* This will only re-render after a delay if the user stops typing */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

function SearchResults({ query }) {
  // Simulate a time-consuming task (e.g., fetching or filtering data)
  return <div>Results for: {query}</div>;
}

export default SearchComponent;
