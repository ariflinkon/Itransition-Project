import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DescriptionIcon from '@mui/icons-material/Description'; 
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from '../Search/SearchBar';
import SearchResults from '../Search/SearchResults';
import api from '../../services/api'; 
import { useAuth } from '../Auth/AuthContext';

const Navbar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userRole, setUserRole] = useState('User'); // Default role

  const handleSearch = async (query) => {
    try {
      const response = await api.get(`/api/init/search?query=${query}`); 
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setDialogOpen(false);
  };

  const handleDashboardClick = () => {
    if (userRole === 'User') {
      navigate('/user');
    } else if (userRole === 'Admin') {
      navigate('/admin');
    }
  };

  return (
    <AppBar position="static" color="default" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DescriptionIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            Customizable Forms
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', position: 'relative', mr:2 }}>
            <SearchBar onSearch={handleSearch} style={{ width: '500px' }} />
            {searchResults.length > 0 && (
              <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: 'background.paper', boxShadow: 1, zIndex: 1 }}>
                <SearchResults results={searchResults} />
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar alt="Profile" src="/static/images/avatar/commercial-avatar.jpg" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  sx={{ mt: 1, boxShadow: 3, borderRadius: 1 }}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                  <MenuItem onClick={handleSettingsClick}>Settings</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
            )}
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </Container>
      <Modal show={dialogOpen} onHide={handleDialogClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={() => handleRoleSelect('User')} className="me-2">User</Button>
          <Button variant="primary" onClick={() => handleRoleSelect('Admin')}>Admin</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDialogClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </AppBar>
  );
};

export default Navbar;