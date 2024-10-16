import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TemplatePage from './pages/TemplatePage';
import FormResultsPage from './pages/FormResultsPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import Navbar from './components/Shared/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Footer from './components/Shared/Footer';
import './i18n'; // For internationalization

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <Navbar />
      <div className="app-container p-4 min-vh-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates/:id" element={<TemplatePage />} />
          <Route path="/forms/:id/results" element={<FormResultsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;