import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const FormDisplay = () => {
  const { id } = useParams(); // Get the template ID
  const [responses, setResponses] = useState({});
  const history = useHistory();

  const handleInputChange = (index, value) => {
    setResponses((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/forms`, { templateId: id, responses });
      alert('Form submitted successfully!');
      history.push(`/templates/${id}/results`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {Object.keys(responses).map((key, index) => (
          <Form.Group key={index}>
            <Form.Label>Question {index + 1}</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </Form.Group>
        ))}
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default FormDisplay;
