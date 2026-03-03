import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/Search.css";

<form className="search-bar" onSubmit={handleSearch}>
  <input ... />
  <button type="submit">Search</button>
</form>

function SearchBar({ setSearchResults }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/search-ai", { query });
      setResults(res.data.results);
      navigate("/search");
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

 
  );
}

export default SearchBar;
