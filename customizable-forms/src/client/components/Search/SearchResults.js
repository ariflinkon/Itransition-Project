import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/api";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery().get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      api.get(`/search?query=${encodeURIComponent(query)}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results", error);
        });
    }
  }, [query]);

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      {results.length ? (
        results.map((template) => (
          <div key={template.id} className="search-result-item">
            <h2>{template.title}</h2>
            <p>{template.description}</p>
          </div>
        ))
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;
