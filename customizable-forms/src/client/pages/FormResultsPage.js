// src/client/pages/FormResultsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormResults } from '../services/api';

const FormResultsPage = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    getFormResults(id).then(setResults);
  }, [id]);

  return (
    <div className="form-results-page p-5">
      <h1 className="text-2xl font-bold mb-4">Form Results</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id} className="mb-4">
              <h2 className="text-xl">{result.user}</h2>
              <p>{result.answers}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormResultsPage;
