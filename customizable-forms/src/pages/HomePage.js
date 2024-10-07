import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/main.css'; 

const HomePage = () => {

  const templates = [
    { id: 0, title: 'Create from Scratch', image: null },
    { id: 1, title: 'Survey Form', image: 'path/to/survey-image.jpg' },
    { id: 2, title: 'Registration Form', image: 'path/to/registration-image.jpg' },
    { id: 3, title: 'Contact Form', image: 'path/to/contact-image.jpg' },
  ];

  const handleCardClick = (templateId) => {
    alert(`Card with ID ${templateId} clicked`);
  };

  return (
    <Container className="home-page" sx={{ mt: 5 }}>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {templates.map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={3}>
            <Card 
              onClick={() => handleCardClick(template.id)} 
              sx={{ 
                cursor: 'pointer', 
                boxShadow: '0px 1px 3px rgba(169, 169, 169, 0.7)', // Darker grey shadow
                transition: 'transform 0.3s ease', 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: '0px 4px 6px rgba(169, 169, 169, 0.7)' // Darker grey hover shadow
                }
              }}
            >
              {template.image ? (
                <CardMedia
                  component="img"
                  height="180"
                  image={template.image}
                  alt={template.title}
                  sx={{ borderBottom: '2px solid #0D47A1' }}
                />
              ) : (
                <CardContent 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 180, 
                    backgroundColor: '#E3F2FD'
                  }}
                >
                  <AddIcon fontSize="large" sx={{ color: '#0D47A1' }} />
                </CardContent>
              )}
              <CardContent>
                <Typography 
                  variant="subtitle1" // Changed from h6 to subtitle1 for smaller font size
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