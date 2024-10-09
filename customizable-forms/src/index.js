import React from 'react';
import ReactDOM from 'react-dom/client';
import './client/styles/index.css';
import './client/styles/main.css'; 
import App from './client/App';
import reportWebVitals from './client/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
