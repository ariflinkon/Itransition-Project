import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactsIcon from '@mui/icons-material/Contacts';
import '../styles/main.css'; 

const HomePage = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return false;
  };

  const handleCardClick = (templateId) => {
    if (isAuthenticated()) {
      navigate(`/template/${templateId}`);
    } else {
      navigate('/login');
    }
  };

  const templates = [
    { id: 0, title: 'Create from Scratch', icon: AddIcon },
    { id: 1, title: 'Survey Form', icon: AssessmentIcon },
    { id: 2, title: 'Registration Form', icon: AccountBoxIcon },
    { id: 3, title: 'Contact Form', icon: ContactsIcon },
  ];

  return (
    <Container className="home-page" sx={{ mt: 5 }}>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {templates.map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={3}>
            <Card 
              onClick={() => handleCardClick(template.id)}
              sx={{ 
                cursor: 'pointer', 
                border: '1px solid #e0e0e0', // Light border
                boxShadow: 'none', // Remove shadow
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