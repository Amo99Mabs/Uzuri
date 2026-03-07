import React, { useState } from "react";

function SearchResults({ results }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score");

  if (!results || results.length === 0) {
    return <p>No products found.</p>;
  }

  // Apply filter
  const filteredResults = filter === "all"
    ? results
    : results.filter((r) => r.category === filter);

  // Apply sorting
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="search-results">
      <h2>Search Results</h2>

      {/* Filter & Sort Controls */}
      <div className="controls">
        <label>
          Filter by category:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>

        <label>
          Sort by:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="score">Score</option>
            <option value="name">Name</option>
          </select>
        </label>
      </div>

      <ul>
        {sortedResults.map((r) => (
          <li key={r._id}>
            <img src={r.imageURL} alt={r.name} width="80" />
            <div>
              <strong>{r.name}</strong>
              <p>{r.description}</p>
              <small>Score: {r.score?.toFixed(3)}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;