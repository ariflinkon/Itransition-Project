import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/main.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    api.get("/templates")
      .then(response => {
        setTemplates(response.data);
      })
      .catch(error => {
        console.error("Error fetching templates:", error);
      });
  }, []);
  
  const isAuthenticated = () => {
    return false; // Update this logic based on your authentication mechanism
  };

  const handleCardClick = (templateId) => {
    if (isAuthenticated()) {
      navigate(`/template/${templateId}`);
    } else {
      navigate('/login');
    }
  };

  const defaultTemplates = [
    { id: 0, title: 'Create from Scratch', icon: AddIcon },
  ];

  return (
    <Container className="home-page" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Templates Gallery
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {defaultTemplates.map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={3}>
            <Card
              onClick={() => handleCardClick(template.id)}
              sx={{
                cursor: 'pointer',
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                transition: 'border 0.3s ease',
                '&:hover': {
                  border: '1px solid #6a11cb'
                }
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 150,
                  backgroundColor: '#E3F2FD'
                }}
              >
                <template.icon fontSize="large" sx={{ color: '#0D47A1' }} />
              </CardContent>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontWeight: 'medium', color: '#0D47A1', mb: 1 }}
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