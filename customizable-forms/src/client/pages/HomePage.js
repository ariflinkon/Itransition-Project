import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import auth from '../services/authService';
import formService from '../services/formService';
import Forms from '../components/FormBuilder/Forms';

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      console.error('User is not authenticated');
      navigate('/login'); // Redirect to login page
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createForm = () => {
    if (!user || !user.id) {
      console.error('User is not logged in');
      return;
    }

    const data = {
      name: formTitle,
      description: formDescription,
      createdBy: user.id,
    };

    if (data.name !== '') {
      formService.createForm(data).then(
        (result) => {
          navigate(`/form/${result._id}`);
        },
        (error) => {
          const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
          console.log(resMessage);
        }
      );
    }
  };


  const cancelAddForm = () => {
    handleClose();
    setFormTitle('');
    setFormDescription('');
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" align="left" gutterBottom sx={{ color: '#333', mb: 2 }}>
        Welcome, 
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            onClick={handleClickOpen}
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
              <AddIcon fontSize="large" sx={{ color: '#007BFF' }} />
            </CardContent>
            <CardContent>
              <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'medium', color: '#333', mb: 1 }}>
                Create a Form
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Form Creation Dialog */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Creating a new form. Add a name and description for the form if desired.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Form Name"
            type="text"
            fullWidth
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Form Description"
            type="text"
            fullWidth
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelAddForm} color="primary">
            Cancel
          </Button>
          <Button onClick={createForm} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{ marginTop: '10px' }}>
          <Forms userId={user ? user.id : ''} />
        </div>
    </Container>
  );
};

export default Dashboard;