import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const FormResultsPage = () => {
  const { id } = useParams(); // Template ID
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get(`/templates/${id}/results`);
        setResults(response.data);
      } catch (err) {
        setError('Error fetching results.');
      }
    };
    fetchResults();
  }, [id]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!results.length) {
    return <div>No results yet.</div>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Results for Template {id}</h1>
          {results.map((result, index) => (
            <div key={index} className="mb-4">
              <h4>Response {index + 1}</h4>
              {Object.entries(result.responses).map(([questionId, answer], idx) => (
                <div key={idx}>
                  <p>Question {questionId}: {answer}</p>
                </div>
              ))}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default FormResultsPage;
