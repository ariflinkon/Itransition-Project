import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { accessToken } = response.data;
      login(accessToken);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card border-0 rounded-4 shadow-lg custom-card">
            <div className="card-body p-5">
              <h3 className="card-title text-center mb-4 text-dark fw-bold">Welcome Back</h3>
              {error && <p className="text-danger text-center">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label text-muted fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label text-muted fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-pill shadow-sm"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-lg rounded-pill custom-btn shadow-sm">
                  Login
                </button>
              </form>
              <div className="text-center mt-4">
                <button className="btn btn-link text-decoration-none text-primary fw-bold" onClick={() => alert('Forgot password functionality')}>
                  Forgot your password?
                </button>
              </div>
              <div className="text-center mt-4">
                <span className="text-secondary">Don't have an account? </span>
                <a href="register" className="text-decoration-none text-primary fw-bold">
                  Register
                </a>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-outline-secondary w-100 btn-lg rounded-pill custom-google-btn">
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;