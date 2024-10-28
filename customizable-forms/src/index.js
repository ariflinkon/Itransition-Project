import React from 'react';
import ReactDOM from 'react-dom/client';
import './client/styles/main.scss';
import App from './client/App';
import { AuthProvider } from './client/components/Auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);