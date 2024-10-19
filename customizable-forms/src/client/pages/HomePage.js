import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/main.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get("/api/templates");
        console.log("Full URL:", api.defaults.baseURL + "/api/templates");
        console.log("Response Data:", response.data); 
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        setError("Failed to load templates. Please try again later.");
      }
    };
  
    fetchTemplates();
  }, []);

  
  
  const isAuthenticated = () => {
    return true; // Update this logic based on your authentication mechanism
  };

  const handleCardClick = (templateId) => {
    if (templateId === 0) {
      navigate('/form-editor');
    } else if (isAuthenticated()) {
      navigate(`/templates/${templateId}`);
    } else {
      navigate('/login');
    }
  };
  const defaultTemplates = [
    { id: 0, title: 'Create a Form', icon: AddIcon },
  ];

  return (
    <Container className="home-page" sx={{ mt: 5 }}>
      <Typography variant="h6" align="left" gutterBottom sx={{ color: '#333', mb: 2 }}>
        Templates Gallery
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {defaultTemplates.concat(templates).map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={3}>
            <Card
              onClick={() => handleCardClick(template.id)}
              sx={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, border 0.3s ease',
                '&:hover': {
                  border: '1px solid #007BFF',
                  transform: 'scale(1.05)'
                }
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 150,
                  backgroundColor: '#F5F5F5'
                }}
              >
                {template.icon ? (
                  <template.icon fontSize="large" sx={{ color: '#007BFF' }} />
                ) : (
                  <Typography variant="h5" sx={{ color: '#007BFF' }}>
                    {template.title}
                  </Typography>
                )}
              </CardContent>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontWeight: 'medium', color: '#333', mb: 1 }}
                >
                  {template.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;