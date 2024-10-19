import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Button, Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import '.././styles/templatepage.css'; 

const TemplatePage = () => {
  const { id } = useParams(); // Getting template ID from URL
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch template details by ID
    const fetchTemplate = async () => {
      try {
        const response = await api.get(`/api/templates/${id}`);
        setTemplate(response.data);
      } catch (err) {
        setError('Error fetching template.');
      }
    };
    fetchTemplate();
  }, [id]);

  if (error) {
    return <Alert variant="danger" className="mt-4">{error}</Alert>;
  }

  if (!template) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="mt-5 template-page">
      <Card className="mb-5 p-4 shadow-sm">
        <Row>
          <Col>
            <h1 className="display-5">{template.title}</h1>
            <p className="lead text-muted">{template.description}</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="primary" href={`/fill-form/${template.id}`} size="lg">
              Fill Out Template
            </Button>
          </Col>
        </Row>
      </Card>

      <Card className="p-4 shadow-sm">
        <Row>
          <Col>
            <h2 className="mb-4">Questions</h2>
            {template.questions.length > 0 ? (
              template.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <strong className="fs-5">{index + 1}. {question.text}</strong>
                  <p className="text-muted">Type: {question.type}</p>
                </div>
              ))
            ) : (
              <Alert variant="warning">No questions available.</Alert>
            )}
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default TemplatePage;
