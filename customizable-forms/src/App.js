import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Shared/Footer';
import LanguageSwitcher from './components/Shared/LanguageSwitcher';


function App() {
  return ( 
    <Router>
      <div className="app-container">
      <LanguageSwitcher />
        <Navbar />
        <div className="content container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;