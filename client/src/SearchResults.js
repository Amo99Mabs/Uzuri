import React from "react";

function SearchResults({ results }) {
  if (!results || results.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r._id}>
            <img src={r.imageURL} alt={r.name} width="80" />
            <div>
              <strong>{r.name}</strong>
              <p>{r.description}</p>
              <small>Score: {r.score.toFixed(3)}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
