import React, { useState } from "react";
import axios from "axios";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/search-ai", { query });
      setResults(res.data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {results.map((r) => (
          <li key={r._id}>
            <strong>{r.name}</strong> — {r.description} (score: {r.score.toFixed(3)})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
