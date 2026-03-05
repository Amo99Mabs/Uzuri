import React, { useState } from "react";

function SearchResults({ results }) {
  const [page, setPage] = useState(1);
  const resultsPerPage = 10;

  if (!results || results.length === 0) {
    return <p>No products found.</p>;
  }

  const startIndex = (page - 1) * resultsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + resultsPerPage);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {paginatedResults.map((r) => (
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

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default SearchResults;