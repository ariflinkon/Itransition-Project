import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Shared/Footer';
import LoginForm from './components/Auth/Login';
import RegisterForm from './components/Auth/Register';

function App() {

  return ( 
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;