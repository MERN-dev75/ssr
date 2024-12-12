import React, { useState, useMemo } from 'react';

const LargeDatasetExample = () => {
  const [search, setSearch] = useState("");
  const [items] = useState(() => {
    // Simulate a large dataset
    return Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  });

  // Memoize filtered items
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) => item.toLowerCase().includes(search.toLowerCase()));
  }, [search, items]);

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items"
      />
      <ul>
        {filteredItems.slice(0, 10).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default LargeDatasetExample;
