import React from 'react';

const SearchResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;