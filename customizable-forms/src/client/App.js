import React from 'react';
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
/* import PrivateRoute from './components/util/PrivateRoute'; */
import FormEditor from './components/FormBuilder/FormEditor'
import UserView from './components/Responding/UserView';

import './i18n'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container p-4 min-vh-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/form/:formId" element={<FormEditor />} />
          <Route exact path="/s/:formId" element={<UserView />} />
          <Route path="/templates/:id" element={<TemplatePage />} />
          <Route path="/forms/:id/results" element={<FormResultsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />

          {/* <Route path="/form/:formId" element={<PrivateRoute><FormEditor /></PrivateRoute>} /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
